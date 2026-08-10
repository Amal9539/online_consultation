import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

async function loadAppointment(request, params) {
  const user = await getCurrentUser(request);
  if (!user) return { error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) };

  const id = Number(params.id);
  const appointment = await prisma.appointment.findUnique({ where: { id } });

  if (!appointment) return { error: NextResponse.json({ message: "Appointment not found." }, { status: 404 }) };

  if (user.role !== "ADMIN" && appointment.patientId !== Number(user.userId)) {
    return { error: NextResponse.json({ message: "Forbidden" }, { status: 403 }) };
  }

  return { user, appointment };
}

export async function GET(request, { params }) {
  try {
    const { error, appointment } = await loadAppointment(request, params);
    if (error) return error;

    return NextResponse.json({ appointment }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { error, user, appointment } = await loadAppointment(request, params);
    if (error) return error;

    if (user.role !== "ADMIN") {
      return NextResponse.json({ message: "Only admin can update appointments." }, { status: 403 });
    }

    const { zoomLink, status } = await request.json();

    const updated = await prisma.appointment.update({
      where: { id: appointment.id },
      data: {
        ...(zoomLink !== undefined ? { zoomLink } : {}),
        ...(status !== undefined ? { status } : {}),
      },
    });

    return NextResponse.json({ appointment: updated }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}