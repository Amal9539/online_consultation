import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

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

    return NextResponse.json({ prescriptions }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    if (user.role !== "ADMIN") return NextResponse.json({ message: "Only admin can create prescriptions." }, { status: 403 });

    const { patientId, diagnosis, medicines, instructions } = await request.json();

    if (!patientId || !medicines) {
      return NextResponse.json({ message: "Patient and medicines are required." }, { status: 400 });
    }

    const patient = await prisma.user.findFirst({
      where: { id: Number(patientId), role: "PATIENT" },
    });

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

      doc.fontSize(14).text("Instructions");
      doc.fontSize(11).text(instructions || "Follow the doctor's instructions.");
      doc.moveDown(3);

      doc.text("Dr. Princy");
      doc.text("Ayurveda Consultant");

      doc.end();
    });

    const prescription = await prisma.prescription.create({
      data: {
        patientId: patient.id,
        createdById: Number(user.userId),
        diagnosis,
        medicines,
        instructions,
        pdfPath: filePath,
      },
    });

    return NextResponse.json({ prescription }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}