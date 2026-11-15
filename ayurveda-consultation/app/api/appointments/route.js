import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const where = user.role === "ADMIN" ? {} : { patientId: Number(user.userId) };

    const appointments = await prisma.appointment.findMany({
      where,
      include: { patient: { select: { id: true, name: true, email: true, phone: true } } },
      orderBy: { date: "desc" }
    });

    return NextResponse.json({ appointments });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (user.role !== "PATIENT") {
      return NextResponse.json({ message: "Only patients can book appointments." }, { status: 403 });
    }

    const { date, time, consultationType, reason } = await request.json();

    if (!date || !time || !consultationType) {
      return NextResponse.json({ message: "Date, time and consultation type are required." }, { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientId: Number(user.userId),
        consultationType,
        date: new Date(date),
        time,
        reason
      }
    });

    return NextResponse.json({ appointment }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}