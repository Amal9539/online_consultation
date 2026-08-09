import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export default async function handler(req, res) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const id = Number(req.query.id);
    const appointment = await prisma.appointment.findUnique({ where: { id } });

    if (!appointment) return res.status(404).json({ message: "Appointment not found." });

    if (user.role !== "ADMIN" && appointment.patientId !== Number(user.userId)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (req.method === "GET") return res.json({ appointment });

    if (req.method === "PUT") {
      if (user.role !== "ADMIN") return res.status(403).json({ message: "Only admin can update appointments." });

      const { zoomLink, status } = req.body;
      const updated = await prisma.appointment.update({
        where: { id },
        data: {
          ...(zoomLink !== undefined ? { zoomLink } : {}),
          ...(status !== undefined ? { status } : {})
        }
      });

      return res.json({ appointment: updated });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error." });
  }
}
