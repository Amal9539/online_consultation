"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PrescriptionCard from "@/components/PrescriptionCard";
import { Pill, Leaf, PlusCircle, Sparkles } from "lucide-react";

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/prescriptions")
      .then((r) => r.json())
      .then((d) => {
        setPrescriptions(d.prescriptions || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f6f9f4] w-full">
      <main className="p-5 md:p-8 w-full max-w-7xl xl:max-w-[1650px] mx-auto space-y-6">
        {/* Ayurvedic Header Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-900/10 bg-gradient-to-r from-[#edf6ea] via-[#e2efe0] to-[#d4ebd0] p-6 sm:p-8 shadow-sm">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#18532f] border border-emerald-200">
              <Pill className="h-3.5 w-3.5" />
              <span>Ayurvedic Aushadha & Treatment Plans</span>
            </span>
            <h1 className="mt-3 font-serif text-3xl font-extrabold text-[#143d23]">
              Consultation History & Prescriptions
            </h1>
            <p className="mt-1 text-sm text-slate-700">
              Access and download your digital prescriptions, herbal dosage guides (Kashayam, Arishta, Churna), and dietary recommendations issued by Dr. Princy.
            </p>
          </div>
        </div>

        {/* Prescriptions Grid */}
        <div className="space-y-4">
          {prescriptions.map((p) => (
            <PrescriptionCard key={p.id} prescription={p} />
          ))}

          {!prescriptions.length && !loading && (
            <div className="rounded-3xl border border-dashed border-emerald-200 bg-white p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf4ec] text-[#18532f] mb-4">
                <Leaf className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#143d23]">
                No Prescriptions Issued Yet
              </h3>
              <p className="mt-2 text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                After your live consultation with Dr. Princy, your custom herbal treatment plan, dosages, and dietary advice will appear here for instant PDF download.
              </p>
              <Link href="/patient/book-appointment" className="mt-5 inline-block">
                <button className="flex items-center gap-2 rounded-full bg-[#18532f] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#123e23] transition-all">
                  <PlusCircle className="h-4 w-4" />
                  <span>Schedule Consultation</span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
