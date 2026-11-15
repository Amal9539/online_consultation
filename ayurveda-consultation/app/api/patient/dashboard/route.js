import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

<<<<<<< HEAD
export const runtime = "nodejs"; // Prisma and bcrypt need Node.js runtime


=======
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
export async function GET(request) {
  try {
    const user = await getCurrentUser(request);
    if (!user || user.role !== "PATIENT") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const id = Number(user.userId);

    const [profile, appointments, reports, prescriptions] = await Promise.all([
      prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true } }),
      prisma.appointment.findMany({ where: { patientId: id }, orderBy: { date: "desc" }, take: 10 }),
      prisma.medicalReport.findMany({ where: { patientId: id }, orderBy: { createdAt: "desc" }, take: 10 }),
      prisma.prescription.findMany({ where: { patientId: id }, orderBy: { createdAt: "desc" }, take: 10 }),
    ]);

<<<<<<< HEAD
    return NextResponse.json({ user: profile, appointments, reports, prescriptions });
=======
    return NextResponse.json({ user: profile, appointments, reports, prescriptions }, { status: 200 });
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
