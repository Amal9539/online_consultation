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
    maxFileSize: Number(process.env.MAX_FILE_SIZE_MB || 10) * 1024 * 1024,
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

        // High security IDOR check
        if (user.role !== "ADMIN" && report.patientId !== Number(user.userId)) {
          return res.status(403).end();
        }

        const safeUploadDir = path.resolve(process.cwd(), "uploads", "reports");
        const resolvedPath = path.resolve(report.path);
        if (!resolvedPath.startsWith(safeUploadDir) && !resolvedPath.startsWith(process.cwd())) {
          return res.status(403).end();
        }

        if (!fs.existsSync(resolvedPath)) {
          return res.status(404).end();
        }

        const safeName = (report.name || "medical-report").replace(/[^a-zA-Z0-9._-]/g, "_");
        res.setHeader("Content-Type", report.mimeType);
        res.setHeader("Content-Disposition", `inline; filename="${safeName}"`);
        res.setHeader("X-Content-Type-Options", "nosniff");
        return fs.createReadStream(resolvedPath).pipe(res);
      }

      const reports = await prisma.medicalReport.findMany({
        where: user.role === "ADMIN" ? {} : { patientId: Number(user.userId) },
        orderBy: { createdAt: "desc" },
      });

      return res.json({ reports });
    }

    if (req.method === "POST") {
      if (user.role !== "PATIENT") {
        return res.status(403).json({ message: "Only patients can upload reports." });
      }

      const { files } = await parseForm(req);
      const uploaded = Array.isArray(files.file) ? files.file[0] : files.file;

      if (!uploaded) return res.status(400).json({ message: "No file uploaded." });

      const mime = uploaded.mimetype || "application/octet-stream";
      const allowedMimes = ["application/pdf", "image/jpeg", "image/png"];
      const allowedExts = [".pdf", ".jpg", ".jpeg", ".png"];

      const rawExt = path.extname(uploaded.originalFilename || "").toLowerCase();

      // High security: Validate both MIME type and file extension
      if (!allowedMimes.includes(mime) || !allowedExts.includes(rawExt)) {
        try { fs.unlinkSync(uploaded.filepath); } catch {}
        return res.status(400).json({ message: "High security policy: Only PDF, JPG, and PNG documents are allowed." });
      }

      const safeOriginalName = path.basename(uploaded.originalFilename || "medical-record")
        .replace(/[^a-zA-Z0-9._-]/g, "_");

      const report = await prisma.medicalReport.create({
        data: {
          patientId: Number(user.userId),
          name: safeOriginalName,
          storedName: path.basename(uploaded.filepath),
          path: uploaded.filepath,
          mimeType: mime,
          size: uploaded.size,
          type: mime === "application/pdf" ? "PDF" : "IMAGE",
        },
      });

      return res.status(201).json({ report });
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (e) {
    console.error("REPORT HANDLER ERROR:", e);
    res.status(500).json({ message: "Upload/server error." });
  }
}
