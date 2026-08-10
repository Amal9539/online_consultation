import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const user = await getCurrentUser(request);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const patients = await prisma.user.findMany({
      where: { role: "PATIENT" },
      select: { id: true, name: true, email: true, phone: true, age: true, gender: true, address: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ patients }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}