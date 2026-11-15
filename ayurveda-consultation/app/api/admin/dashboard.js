import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export default async function handler(req, res) {
  try {
    const user = await getCurrentUser(req);
    if (!user || user.role !== "ADMIN") return res.status(403).json({ message: "Forbidden" });

    const [patients, appointments, upcoming, prescriptions] = await Promise.all([
      prisma.user.count({ where: { role: "PATIENT" } }),
      prisma.appointment.count(),
      prisma.appointment.count({ where: { status: "SCHEDULED" } }),
      prisma.prescription.count()
    ]);

    res.json({ patients, appointments, upcoming, prescriptions });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error." });
  }
}
