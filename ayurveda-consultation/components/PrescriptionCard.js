import Link from "next/link";
import { Download, FileText, Leaf, Sparkles, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PrescriptionCard({ prescription }) {
  const formattedDate = new Date(prescription.createdAt).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-sm transition hover:shadow-md hover:border-emerald-600/30">
      <div className="border-b border-emerald-900/10 bg-gradient-to-r from-[#eef6ea] to-[#e4f1e0] px-6 py-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 font-semibold text-[#18532f]">
          <Leaf className="h-4 w-4 text-[#18532f]" />
          <span>Ayurvedic Prescription Chit #{prescription.id}</span>
        </div>
        <span className="rounded-full bg-emerald-100/90 px-3 py-0.5 font-medium text-emerald-800">
          {formattedDate}
        </span>
      </div>

      <CardContent className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold">
            <Stethoscope className="h-4 w-4" />
            <span>Prescribed by Dr. Princy (BAMS) · KMCT & Dubai Clinic</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-[#143d23]">
            Diagnosis: {prescription.diagnosis || "General Ayurvedic Wellness & Dosha Balancing"}
          </h3>

          {prescription.medicines && (
            <p className="text-xs text-slate-600 line-clamp-2">
              <strong className="text-[#18532f]">Formulations: </strong>
              {prescription.medicines}
            </p>
          )}

          {prescription.dietAdvice && (
            <p className="text-xs text-slate-500 italic">
              <strong className="text-emerald-800 not-italic">Pathya / Diet: </strong>
              {prescription.dietAdvice}
            </p>
          )}
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <Link
            href={`/api/prescriptions/${prescription.id}`}
            target="_blank"
            className="flex items-center gap-2 rounded-full bg-[#18532f] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#18532f]/20 transition hover:bg-[#123e23]"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download PDF Prescription</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
