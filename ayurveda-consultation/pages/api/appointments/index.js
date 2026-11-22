import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { sanitizeInput } from "@/lib/security";

export default async function handler(req, res) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    if (req.method === "GET") {
      const where = user.role === "ADMIN" ? {} : { patientId: Number(user.userId) };

      const appointments = await prisma.appointment.findMany({
        where,
        include: { patient: { select: { id: true, name: true, email: true, phone: true } } },
        orderBy: { date: "desc" },
      });

      return res.json({ appointments });
    }

    if (req.method === "POST") {
      if (user.role !== "PATIENT") {
        return res.status(403).json({ message: "Only patients can book appointments." });
      }

      const { date, time, preferredSlot, consultationType, reason } = req.body;
      if (!date || !consultationType) {
        return res.status(400).json({ message: "Preferred date and consultation type are required." });
      }

      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: "Invalid appointment date format." });
      }

      // High security: Sanitize text fields against XSS
      const cleanType = sanitizeInput(consultationType);
      const cleanReason = reason ? sanitizeInput(reason) : null;
      const assignedTime = sanitizeInput(time || preferredSlot || "Pending Doctor Assignment");

      const appointment = await prisma.appointment.create({
        data: {
          patientId: Number(user.userId),
          consultationType: cleanType,
          date: parsedDate,
          time: assignedTime,
          reason: cleanReason,
          status: "SCHEDULED",
        },
      });

      return res.status(201).json({ appointment });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (e) {
    console.error("APPOINTMENT API ERROR:", e);
    res.status(500).json({ message: "Server error." });
  }
}
