import Link from "next/link";
import { FileText, ExternalLink, Eye, FolderHeart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ReportCard({ report }) {
  const formattedDate = new Date(report.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const fileSize = Math.round(report.size / 1024);

  return (
    <Card className="rounded-3xl border border-emerald-950/10 bg-white shadow-sm transition hover:shadow-md hover:border-emerald-600/30">
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5f2e3] text-[#18532f] shrink-0">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-[#143d23]">{report.name}</h4>
            <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
              <span>Uploaded {formattedDate}</span>
              <span>·</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                {fileSize} KB
              </span>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <Link
            href={`/api/reports?id=${report.id}`}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-800/20 bg-emerald-50 px-4 py-2 text-xs font-semibold text-[#18532f] transition hover:bg-emerald-100"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>View Document</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
