import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Prisma and bcrypt need Node.js runtime


export async function GET(request) {
  try {
    const user = await getCurrentUser(request);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const [patients, appointments, upcoming, prescriptions] = await Promise.all([
      prisma.user.count({ where: { role: "PATIENT" } }),
      prisma.appointment.count(),
      prisma.appointment.count({ where: { status: "SCHEDULED" } }),
      prisma.prescription.count(),
    ]);

    return NextResponse.json({ patients, appointments, upcoming, prescriptions });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
