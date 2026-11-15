import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

<<<<<<< HEAD
export const runtime = "nodejs"; // Prisma needs Node.js runtime


=======
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
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
<<<<<<< HEAD
        id: true,
        name: true,
        email: true,
        phone: true,
        age: true,
        gender: true,
        address: true,
        createdAt: true,
        reports: { orderBy: { createdAt: "desc" } },
        appointments: {
          orderBy: { date: "desc" },
          include: { patient: { select: { id: true, name: true, email: true } } },
        },
        prescriptions: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            diagnosis: true,
            medicines: true,
            instructions: true,
            pdfPath: true,
            createdAt: true,
          },
        },
=======
        id: true, name: true, email: true, phone: true, age: true, gender: true, address: true, createdAt: true,
        reports: { orderBy: { createdAt: "desc" } },
        appointments: { orderBy: { date: "desc" }, include: { patient: { select: { id: true, name: true, email: true } } } },
        prescriptions: { orderBy: { createdAt: "desc" }, select: { id: true, diagnosis: true, medicines: true, instructions: true, pdfPath: true, createdAt: true } },
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
      },
    });

    if (!patient) return NextResponse.json({ message: "Patient not found." }, { status: 404 });

<<<<<<< HEAD
    return NextResponse.json({ patient });
=======
    return NextResponse.json({ patient }, { status: 200 });
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
