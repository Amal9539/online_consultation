import fs from "fs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const report = await prisma.medicalReport.findUnique({ where: { id: Number(params.id) } });
    if (!report) return NextResponse.json({ message: "Not found" }, { status: 404 });

    if (user.role !== "ADMIN" && report.patientId !== Number(user.userId)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const fileBuffer = fs.readFileSync(report.path);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": report.mimeType,
        "Content-Disposition": `inline; filename="${report.name.replace(/"/g, "")}"`,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}