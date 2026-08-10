import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const user = await getCurrentUser(request);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const id = Number(params.id);

    const patient = await prisma.user.findFirst({
      where: { id, role: "PATIENT" },
      select: {
        id: true, name: true, email: true, phone: true, age: true, gender: true, address: true, createdAt: true,
        reports: { orderBy: { createdAt: "desc" } },
        appointments: { orderBy: { date: "desc" }, include: { patient: { select: { id: true, name: true, email: true } } } },
        prescriptions: { orderBy: { createdAt: "desc" }, select: { id: true, diagnosis: true, medicines: true, instructions: true, pdfPath: true, createdAt: true } },
      },
    });

    if (!patient) return NextResponse.json({ message: "Patient not found." }, { status: 404 });

    return NextResponse.json({ patient }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}