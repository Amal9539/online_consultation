import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export default async function handler(req, res) {
  try {
    const user = await getCurrentUser(req);
    if (!user || user.role !== "ADMIN") return res.status(403).json({ message: "Forbidden" });

    const id = Number(req.query.id);

    const patient = await prisma.user.findFirst({
      where: { id, role: "PATIENT" },
      select: {
        id: true, name: true, email: true, phone: true, age: true, gender: true, address: true, createdAt: true,
        reports: { orderBy: { createdAt: "desc" } },
        appointments: { orderBy: { date: "desc" }, include: { patient: { select: { id: true, name: true, email: true } } } },
        prescriptions: { orderBy: { createdAt: "desc" }, select: { id: true, diagnosis: true, medicines: true, instructions: true, pdfPath: true, createdAt: true } }
      }
    });

    if (!patient) return res.status(404).json({ message: "Patient not found." });

    res.json({ patient });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error." });
  }
}
