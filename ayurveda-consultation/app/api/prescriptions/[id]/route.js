import fs from "fs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

// Force Node.js runtime — required for fs
export const runtime = "nodejs";

export async function GET(request, { params }) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const id = Number(params.id);
    const prescription = await prisma.prescription.findUnique({ where: { id } });

    if (!prescription) return NextResponse.json({ message: "Prescription not found." }, { status: 404 });

    if (user.role !== "ADMIN" && prescription.patientId !== Number(user.userId)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    if (!prescription.pdfPath || !fs.existsSync(prescription.pdfPath)) {
      return NextResponse.json({ message: "Prescription PDF not found." }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(prescription.pdfPath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="prescription-${id}.pdf"`,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
