import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const reports = await prisma.medicalReport.findMany({
      where: user.role === "ADMIN" ? {} : { patientId: Number(user.userId) },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ reports }, { status: 200 });
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
      return NextResponse.json({ message: "Only patients can upload reports." }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ message: "No file uploaded." }, { status: 400 });
    }

    const allowed = ["application/pdf", "image/jpeg", "image/png"];
    const mime = file.type || "application/octet-stream";

    if (!allowed.includes(mime)) {
      return NextResponse.json({ message: "Only PDF, JPG and PNG files are allowed." }, { status: 400 });
    }

    const maxBytes = Number(process.env.MAX_FILE_SIZE_MB || 10) * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json({ message: "File too large." }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "uploads", "reports");
    fs.mkdirSync(uploadDir, { recursive: true });

    const ext = path.extname(file.name) || (mime === "application/pdf" ? ".pdf" : mime === "image/png" ? ".png" : ".jpg");
    const storedName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    const filePath = path.join(uploadDir, storedName);

    const bytes = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, bytes);

    const report = await prisma.medicalReport.create({
      data: {
        patientId: Number(user.userId),
        name: file.name || storedName,
        storedName,
        path: filePath,
        mimeType: mime,
        size: file.size,
        type: mime === "application/pdf" ? "PDF" : "IMAGE",
      },
    });

    return NextResponse.json({ report }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Upload/server error." }, { status: 500 });
  }
}