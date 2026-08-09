import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export default async function handler(req, res) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    if (req.method === "GET") {
      const where = user.role === "ADMIN" ? {} : { patientId: Number(user.userId) };

      const appointments = await prisma.appointment.findMany({
        where,
        include: { patient: { select: { id: true, name: true, email: true, phone: true } } },
        orderBy: { date: "desc" }
      });

      return res.json({ appointments });
    }

    if (req.method === "POST") {
      if (user.role !== "PATIENT") return res.status(403).json({ message: "Only patients can book appointments." });

      const { date, time, consultationType, reason } = req.body;
      if (!date || !time || !consultationType) return res.status(400).json({ message: "Date, time and consultation type are required." });

      const appointment = await prisma.appointment.create({
        data: {
          patientId: Number(user.userId),
          consultationType,
          date: new Date(date),
          time,
          reason
        }
      });

      return res.status(201).json({ appointment });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error." });
  }
}
