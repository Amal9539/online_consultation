import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Prisma and bcrypt need Node.js runtime


export async function POST(request) {
  try {
    const user = await getCurrentUser(request);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { appointmentId, zoomLink } = await request.json();

    if (!appointmentId || !zoomLink) {
      return NextResponse.json({ message: "Appointment and Zoom link are required." }, { status: 400 });
    }

    const appointment = await prisma.appointment.update({
      where: { id: Number(appointmentId) },
      data: { zoomLink },
    });

    return NextResponse.json({ appointment });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
