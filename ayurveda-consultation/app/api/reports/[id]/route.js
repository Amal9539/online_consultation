import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid report ID." }, { status: 400 });
    }

    const report = await prisma.medicalReport.findUnique({ where: { id } });
    if (!report) return NextResponse.json({ message: "Not found" }, { status: 404 });

    // High security: IDOR access protection
    if (user.role !== "ADMIN" && report.patientId !== Number(user.userId)) {
      return NextResponse.json({ message: "Access forbidden." }, { status: 403 });
    }

    // High security: Path traversal prevention
    const uploadBaseDir = path.resolve(process.cwd(), "uploads", "reports");
    const safePath = path.resolve(report.path);

    if (!safePath.startsWith(uploadBaseDir) && !safePath.startsWith(process.cwd())) {
      return NextResponse.json({ message: "Access denied." }, { status: 403 });
    }

    if (!fs.existsSync(safePath)) {
      return NextResponse.json({ message: "File not found on storage." }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(safePath);
    const sanitizedFilename = (report.name || "medical-report")
      .replace(/[^a-zA-Z0-9._-]/g, "_");

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": report.mimeType || "application/octet-stream",
        "Content-Disposition": `inline; filename="${sanitizedFilename}"`,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (e) {
    console.error("REPORT DOWNLOAD ERROR:", e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
