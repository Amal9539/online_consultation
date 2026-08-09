import fs from "fs";
import path from "path";
import formidable from "formidable";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const config = {
  api: { bodyParser: false }
};

function parseForm(req) {
  const uploadDir = path.join(process.cwd(), "uploads", "reports");
  fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: Number(process.env.MAX_FILE_SIZE_MB || 10) * 1024 * 1024
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    if (req.method === "GET") {
      if (req.query.id) {
        const report = await prisma.medicalReport.findUnique({ where: { id: Number(req.query.id) } });
        if (!report) return res.status(404).end();

        if (user.role !== "ADMIN" && report.patientId !== Number(user.userId)) return res.status(403).end();

        res.setHeader("Content-Type", report.mimeType);
        res.setHeader("Content-Disposition", `inline; filename="${report.name.replace(/"/g, "")}"`);
        return fs.createReadStream(report.path).pipe(res);
      }

      const reports = await prisma.medicalReport.findMany({
        where: user.role === "ADMIN" ? {} : { patientId: Number(user.userId) },
        orderBy: { createdAt: "desc" }
      });

      return res.json({ reports });
    }

    if (req.method === "POST") {
      if (user.role !== "PATIENT") return res.status(403).json({ message: "Only patients can upload reports." });

      const { files } = await parseForm(req);
      const uploaded = Array.isArray(files.file) ? files.file[0] : files.file;

      if (!uploaded) return res.status(400).json({ message: "No file uploaded." });

      const mime = uploaded.mimetype || "application/octet-stream";
      const allowed = ["application/pdf", "image/jpeg", "image/png"];

      if (!allowed.includes(mime)) {
        fs.unlinkSync(uploaded.filepath);
        return res.status(400).json({ message: "Only PDF, JPG and PNG files are allowed." });
      }

      const report = await prisma.medicalReport.create({
        data: {
          patientId: Number(user.userId),
          name: uploaded.originalFilename || path.basename(uploaded.filepath),
          storedName: path.basename(uploaded.filepath),
          path: uploaded.filepath,
          mimeType: mime,
          size: uploaded.size,
          type: mime === "application/pdf" ? "PDF" : "IMAGE"
        }
      });

      return res.status(201).json({ report });
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Upload/server error." });
  }
}
