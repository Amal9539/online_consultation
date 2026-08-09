import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export default async function handler(req, res) {
  try {
    const user = await getCurrentUser(req);
    if (!user || user.role !== "ADMIN") return res.status(403).json({ message: "Forbidden" });

    const patients = await prisma.user.findMany({
      where: { role: "PATIENT" },
      select: { id: true, name: true, email: true, phone: true, age: true, gender: true, address: true, createdAt: true },
      orderBy: { createdAt: "desc" }
    });

    res.json({ patients });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error." });
  }
}
