import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export default async function handler(req, res) {
  try {
    const user = await getCurrentUser(req);
    if (!user || user.role !== "PATIENT") return res.status(403).json({ message: "Forbidden" });

    const id = Number(user.userId);

    const [profile, appointments, reports, prescriptions] = await Promise.all([
      prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true } }),
      prisma.appointment.findMany({ where: { patientId: id }, orderBy: { date: "desc" }, take: 10 }),
      prisma.medicalReport.findMany({ where: { patientId: id }, orderBy: { createdAt: "desc" }, take: 10 }),
      prisma.prescription.findMany({ where: { patientId: id }, orderBy: { createdAt: "desc" }, take: 10 })
    ]);

    res.json({ user: profile, appointments, reports, prescriptions });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error." });
  }
}
