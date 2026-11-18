import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Prisma needs Node.js runtime

export async function GET(request, { params }) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const id = Number(params.id);
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: { select: { id: true, name: true, email: true, phone: true } },
      },
    });

    if (!appointment) return NextResponse.json({ message: "Appointment not found." }, { status: 404 });

    if (user.role !== "ADMIN" && appointment.patientId !== Number(user.userId)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ appointment });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    if (user.role !== "ADMIN") return NextResponse.json({ message: "Only admin can update appointments." }, { status: 403 });

    const id = Number(params.id);
    const appointment = await prisma.appointment.findUnique({ where: { id } });
    if (!appointment) return NextResponse.json({ message: "Appointment not found." }, { status: 404 });

    const { zoomLink, status, time, date } = await request.json();

    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        ...(zoomLink !== undefined ? { zoomLink } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(time !== undefined ? { time } : {}),
        ...(date ? { date: new Date(date) } : {}),
      },
    });

    return NextResponse.json({ appointment: updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
