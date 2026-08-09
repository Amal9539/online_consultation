import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export default async function handler(req, res) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    if (req.method === "GET") {
      const profile = await prisma.user.findUnique({
        where: { id: Number(user.userId) },
        select: { id: true, name: true, email: true, phone: true, age: true, gender: true, address: true, role: true }
      });
      return res.json({ user: profile });
    }

    if (req.method === "PUT") {
      const { name, phone, age, gender, address } = req.body;
      const profile = await prisma.user.update({
        where: { id: Number(user.userId) },
        data: {
          name,
          phone,
          age: age ? Number(age) : null,
          gender,
          address
        },
        select: { id: true, name: true, email: true, phone: true, age: true, gender: true, address: true, role: true }
      });
      return res.json({ user: profile });
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error." });
  }
}
