import fs from "fs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export default async function handler(req, res) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const id = Number(req.query.id);
    const prescription = await prisma.prescription.findUnique({ where: { id } });

    if (!prescription) return res.status(404).json({ message: "Prescription not found." });

    if (user.role !== "ADMIN" && prescription.patientId !== Number(user.userId)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (!prescription.pdfPath || !fs.existsSync(prescription.pdfPath)) {
      return res.status(404).json({ message: "Prescription PDF not found." });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="prescription-${id}.pdf"`);
    fs.createReadStream(prescription.pdfPath).pipe(res);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error." });
  }
}
