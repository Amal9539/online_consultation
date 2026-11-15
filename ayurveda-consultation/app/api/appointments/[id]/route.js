import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

<<<<<<< HEAD
export const runtime = "nodejs"; // Prisma needs Node.js runtime


export async function GET(request, { params }) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const id = Number(params.id);
    const appointment = await prisma.appointment.findUnique({ where: { id } });

    if (!appointment) return NextResponse.json({ message: "Appointment not found." }, { status: 404 });

    if (user.role !== "ADMIN" && appointment.patientId !== Number(user.userId)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ appointment });
=======
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
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
<<<<<<< HEAD
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    if (user.role !== "ADMIN") return NextResponse.json({ message: "Only admin can update appointments." }, { status: 403 });

    const id = Number(params.id);
    const appointment = await prisma.appointment.findUnique({ where: { id } });
    if (!appointment) return NextResponse.json({ message: "Appointment not found." }, { status: 404 });

    const { zoomLink, status } = await request.json();
    const updated = await prisma.appointment.update({
      where: { id },
=======
    const { error, user, appointment } = await loadAppointment(request, params);
    if (error) return error;

    if (user.role !== "ADMIN") {
      return NextResponse.json({ message: "Only admin can update appointments." }, { status: 403 });
    }

    const { zoomLink, status } = await request.json();

    const updated = await prisma.appointment.update({
      where: { id: appointment.id },
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
      data: {
        ...(zoomLink !== undefined ? { zoomLink } : {}),
        ...(status !== undefined ? { status } : {}),
      },
    });

<<<<<<< HEAD
    return NextResponse.json({ appointment: updated });
=======
    return NextResponse.json({ appointment: updated }, { status: 200 });
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
