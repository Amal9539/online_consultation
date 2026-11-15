import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const id = Number(params.id);
    const prescription = await prisma.prescription.findUnique({
      where: { id },
      include: { patient: { select: { id: true, name: true, email: true } } },
    });

    if (!prescription) return NextResponse.json({ message: "Prescription not found." }, { status: 404 });

    if (user.role !== "ADMIN" && prescription.patientId !== Number(user.userId)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ prescription }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}