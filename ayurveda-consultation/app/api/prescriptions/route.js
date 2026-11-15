import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
<<<<<<< HEAD
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
=======
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d

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

<<<<<<< HEAD
    return NextResponse.json({ prescriptions });
  } catch (e) {
    console.error("GET /api/prescriptions error:", e);
=======
    return NextResponse.json({ prescriptions }, { status: 200 });
  } catch (e) {
    console.error(e);
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
<<<<<<< HEAD
    if (user.role !== "ADMIN") {
      return NextResponse.json({ message: "Only admin can create prescriptions." }, { status: 403 });
    }

    const { patientId, diagnosis, medicines, instructions } = await request.json();
=======
    if (user.role !== "ADMIN") return NextResponse.json({ message: "Only admin can create prescriptions." }, { status: 403 });

    const { patientId, diagnosis, medicines, diet, instructions } = await request.json();
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d

    if (!patientId || !medicines) {
      return NextResponse.json({ message: "Patient and medicines are required." }, { status: 400 });
    }

    const patient = await prisma.user.findFirst({
      where: { id: Number(patientId), role: "PATIENT" },
    });

<<<<<<< HEAD
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
=======
    if (!patient) return NextResponse.json({ message: "Patient not found." }, { status: 404 });

    const dir = path.join(process.cwd(), "prescriptions");
    fs.mkdirSync(dir, { recursive: true });

    const fileName = `prescription-${Date.now()}-${patient.id}.pdf`;
    const filePath = path.join(dir, fileName);

    await new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filePath);
      stream.on("finish", resolve);
      stream.on("error", reject);
      doc.pipe(stream);

      doc.fontSize(22).text("ARAYAL", { align: "center" });
      doc.moveDown();
      doc.fontSize(16).text("Ayurveda Consultation Prescription", { align: "center" });
      doc.moveDown(2);

      doc.fontSize(12).text(`Doctor: Dr. Princy`);
      doc.text(`Patient: ${patient.name}`);
      doc.text(`Email: ${patient.email}`);
      doc.text(`Date: ${new Date().toLocaleDateString()}`);
      doc.moveDown();

      doc.fontSize(14).text("Diagnosis");
      doc.fontSize(11).text(diagnosis || "Not specified");
      doc.moveDown();

      doc.fontSize(14).text("Medicines / Treatment");
      doc.fontSize(11).text(medicines);
      doc.moveDown();

      doc.fontSize(14).text("Diet / Pathya-Apathya");
      doc.fontSize(11).text(diet || "Not specified");
      doc.moveDown();

      doc.fontSize(14).text("Instructions");
      doc.fontSize(11).text(instructions || "Follow the doctor's instructions.");
      doc.moveDown(3);

      doc.text("Dr. Princy");
      doc.text("Ayurveda Consultant");

      doc.end();
    });

>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
    const prescription = await prisma.prescription.create({
      data: {
        patientId: patient.id,
        createdById: Number(user.userId),
<<<<<<< HEAD
        diagnosis: diagnosis || null,
        medicines,
        instructions: instructions || null,
=======
        diagnosis,
        medicines,
        diet,
        instructions,
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
        pdfPath: filePath,
      },
    });

    return NextResponse.json({ prescription }, { status: 201 });
  } catch (e) {
<<<<<<< HEAD
    console.error("POST /api/prescriptions error:", e);
    return NextResponse.json({ message: e.message || "Server error." }, { status: 500 });
  }
}
=======
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
