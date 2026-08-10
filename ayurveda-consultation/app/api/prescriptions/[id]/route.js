import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";

export async function GET(request, { params }) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const id = Number(params.id);
    const prescription = await prisma.prescription.findUnique({ where: { id } });

    if (!prescription) return NextResponse.json({ message: "Prescription not found." }, { status: 404 });

    if (user.role !== "ADMIN" && prescription.patientId !== Number(user.userId)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    if (!prescription.pdfPath || !fs.existsSync(prescription.pdfPath)) {
      return NextResponse.json({ message: "Prescription PDF not found." }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(prescription.pdfPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="prescription-${id}.pdf"`,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    if (user.role !== "ADMIN") return NextResponse.json({ message: "Only admin can edit prescriptions." }, { status: 403 });

    const id = Number(params.id);
    const existing = await prisma.prescription.findUnique({ where: { id }, include: { patient: true } });
    if (!existing) return NextResponse.json({ message: "Prescription not found." }, { status: 404 });

    const { diagnosis, medicines, instructions } = await request.json();

    if (!medicines) {
      return NextResponse.json({ message: "Medicines are required." }, { status: 400 });
    }

    // Regenerate the PDF with the updated content
    const dir = path.join(process.cwd(), "prescriptions");
    fs.mkdirSync(dir, { recursive: true });

    const fileName = `prescription-${Date.now()}-${existing.patientId}.pdf`;
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
      doc.text(`Patient: ${existing.patient.name}`);
      doc.text(`Email: ${existing.patient.email}`);
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

    // Remove the old PDF file now that the new one is written
    if (existing.pdfPath && fs.existsSync(existing.pdfPath)) {
      try { fs.unlinkSync(existing.pdfPath); } catch {}
    }

    const updated = await prisma.prescription.update({
      where: { id },
      data: { diagnosis, medicines, instructions, pdfPath: filePath },
    });

    return NextResponse.json({ prescription: updated }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}