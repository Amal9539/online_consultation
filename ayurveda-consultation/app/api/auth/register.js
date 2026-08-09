import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required." });
    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters." });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ message: "Email is already registered." });

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email: email.toLowerCase(), phone, password: hashed, role: "PATIENT" },
      select: { id: true, name: true, email: true, phone: true, role: true }
    });

    return res.status(201).json({ message: "Registration successful.", user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error." });
  }
}

