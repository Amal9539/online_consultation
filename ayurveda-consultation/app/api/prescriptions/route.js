import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

// Force Node.js runtime — required for fs, pdfkit, and stream APIs
export const runtime = "nodejs";

/** Build the PDF and return a Buffer */
function generatePdfBuffer({ patient, diagnosis, medicines, instructions }) {
  return new Promise((resolve, reject) => {
    // Use no external font references — PDFKit's default font is always safe
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // Header
    doc.fontSize(22).text("ARAYAL", { align: "center", underline: false });
    doc.moveDown(0.5);
    doc.fontSize(14).text("Ayurveda Consultation Prescription", { align: "center" });
    doc.moveDown(0.5);
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // Patient info
    doc.fontSize(11);
    doc.text(`Doctor  : Dr. Princy`);
    doc.text(`Patient : ${patient.name}`);
    doc.text(`Email   : ${patient.email}`);
    doc.text(`Date    : ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}`);
    doc.moveDown();

    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // Diagnosis
    doc.fontSize(13).text("Diagnosis", { underline: true });
    doc.fontSize(11).text(diagnosis || "Not specified");
    doc.moveDown();

    // Medicines
    doc.fontSize(13).text("Medicines / Treatment", { underline: true });
    doc.fontSize(11).text(medicines);
    doc.moveDown();

    // Instructions
    doc.fontSize(13).text("Instructions", { underline: true });
    doc.fontSize(11).text(instructions || "Follow the doctor's instructions.");
    doc.moveDown(3);

    // Signature
    doc.fontSize(11).text("Dr. Princy");
    doc.text("Ayurveda Consultant, ARAYAL");

    doc.end();
  });
}

export async function GET(request) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const prescriptions = await prisma.prescription.findMany({
      where: user.role === "ADMIN" ? {} : { patientId: Number(user.userId) },
      include: {
        patient: { select: { id: true, name: true, email: true } },
        createdBy: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ prescriptions });
  } catch (e) {
    console.error("GET /api/prescriptions error:", e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    if (user.role !== "ADMIN") {
      return NextResponse.json({ message: "Only admin can create prescriptions." }, { status: 403 });
    }

    const { patientId, diagnosis, medicines, instructions } = await request.json();

    if (!patientId || !medicines) {
      return NextResponse.json({ message: "Patient and medicines are required." }, { status: 400 });
    }

    const patient = await prisma.user.findFirst({
      where: { id: Number(patientId), role: "PATIENT" },
    });

    if (!patient) {
      return NextResponse.json({ message: "Patient not found." }, { status: 404 });
    }

    // Generate PDF in memory
    const pdfBuffer = await generatePdfBuffer({ patient, diagnosis, medicines, instructions });

    // Save to disk
    const dir = path.join(process.cwd(), "prescriptions");
    fs.mkdirSync(dir, { recursive: true });
    const fileName = `prescription-${Date.now()}-${patient.id}.pdf`;
    const filePath = path.join(dir, fileName);
    fs.writeFileSync(filePath, pdfBuffer);

    // Save record to DB
    const prescription = await prisma.prescription.create({
      data: {
        patientId: patient.id,
        createdById: Number(user.userId),
        diagnosis: diagnosis || null,
        medicines,
        instructions: instructions || null,
        pdfPath: filePath,
      },
    });

    return NextResponse.json({ prescription }, { status: 201 });
  } catch (e) {
    console.error("POST /api/prescriptions error:", e);
    return NextResponse.json({ message: e.message || "Server error." }, { status: 500 });
  }
}
