import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export default async function handler(req, res) {
  try {
    const user = await getCurrentUser(req);
    if (!user || user.role !== "ADMIN") return res.status(403).json({ message: "Forbidden" });

    if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

    const { appointmentId, zoomLink } = req.body;
    if (!appointmentId || !zoomLink) return res.status(400).json({ message: "Appointment and Zoom link are required." });

    const appointment = await prisma.appointment.update({
      where: { id: Number(appointmentId) },
      data: { zoomLink }
    });

    res.json({ appointment });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error." });
  }
}
