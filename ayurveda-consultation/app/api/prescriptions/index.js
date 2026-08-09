import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    if (req.method === "GET") {
      const prescriptions = await prisma.prescription.findMany({
        where: user.role === "ADMIN" ? {} : { patientId: Number(user.userId) },
        include: {
          patient: { select: { id: true, name: true, email: true } },
          createdBy: { select: { id: true, name: true } }
        },
        orderBy: { createdAt: "desc" }
      });

      return res.json({ prescriptions });
    }

    if (req.method === "POST") {
      if (user.role !== "ADMIN") return res.status(403).json({ message: "Only admin can create prescriptions." });

      const { patientId, diagnosis, medicines, instructions } = req.body;

      if (!patientId || !medicines) return res.status(400).json({ message: "Patient and medicines are required." });

      const patient = await prisma.user.findFirst({
        where: { id: Number(patientId), role: "PATIENT" }
      });

      if (!patient) return res.status(404).json({ message: "Patient not found." });

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
          pdfPath: filePath
        }
      });

      return res.status(201).json({ prescription });
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error." });
  }
}
