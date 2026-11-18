"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Pill, FileText, CheckCircle2, AlertCircle, ArrowRight, User } from "lucide-react";

export default function AdminPrescriptionsPage() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ patientId: "", diagnosis: "", medicines: "", instructions: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/patients")
      .then((r) => r.json())
      .then((d) => setPatients(d.patients || []));
  }, []);

  async function submit(e) {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setLoading(true);

    try {
      const res = await fetch("/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to generate prescription");

      setMessage({
        text: "Prescription PDF generated successfully! It is now accessible in the patient's dashboard.",
        type: "success",
      });
      setForm({ patientId: "", diagnosis: "", medicines: "", instructions: "" });
    } catch (err) {
      setMessage({ text: err.message || "Failed to generate prescription", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f6f9f4]">
      <main className="p-5 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-emerald-950/10 pb-6">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#18532f]">
            Prescription Generator
          </span>
          <h1 className="mt-2 font-serif text-3xl font-extrabold text-[#143d23]">
            Create Digital Prescription
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Prescribe classical Ayurvedic medicines, dietary regimens, and generate an official PDF for the patient.
          </p>
        </div>

        {/* Feedback Message */}
        {message.text && (
          <div
            className={`rounded-2xl p-4 text-xs font-semibold flex items-center gap-2 ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Prescription Form Card */}
        <div className="max-w-3xl rounded-3xl border border-emerald-950/10 bg-white p-6 sm:p-8 shadow-sm">
          <form onSubmit={submit} className="space-y-5">
            {/* 1. Patient Selector */}
            <div>
              <label className="text-xs font-bold text-[#143d23] mb-1.5 block">
                Select Patient *
              </label>
              <select
                value={form.patientId}
                onChange={(e) => setForm({ ...form, patientId: e.target.value })}
                required
                className="w-full rounded-2xl border border-slate-300 bg-white py-3 px-4 text-xs text-slate-800 focus:border-[#18532f] focus:outline-none"
              >
                <option value="">-- Choose Registered Patient --</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.email} {p.phone ? `(${p.phone})` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Diagnosis */}
            <div>
              <label className="text-xs font-bold text-[#143d23] mb-1.5 block">
                Clinical Diagnosis / Dosha Imbalance
              </label>
              <textarea
                rows={2}
                value={form.diagnosis}
                onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
                placeholder="e.g. Vata-Pitta imbalance, digestive sluggishness (Mandagni), joint stiffness..."
                className="w-full rounded-2xl border border-slate-300 p-4 text-xs text-slate-800 focus:border-[#18532f] focus:outline-none"
              />
            </div>

            {/* 3. Medicines & Treatment */}
            <div>
              <label className="text-xs font-bold text-[#143d23] mb-1.5 block">
                Medicines / Formulations & Dosages *
              </label>
              <textarea
                rows={4}
                value={form.medicines}
                onChange={(e) => setForm({ ...form, medicines: e.target.value })}
                required
                placeholder="1. Triphala Churna - 1 tsp with warm water at bedtime&#10;2. Dashamularishta - 15ml twice daily after food&#10;3. Ashwagandha tablet - 1 tablet twice daily"
                className="w-full rounded-2xl border border-slate-300 p-4 text-xs text-slate-800 focus:border-[#18532f] focus:outline-none"
              />
            </div>

            {/* 4. Instructions / Dietary Guidelines */}
            <div>
              <label className="text-xs font-bold text-[#143d23] mb-1.5 block">
                Dietary & Lifestyle Instructions
              </label>
              <textarea
                rows={3}
                value={form.instructions}
                onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                placeholder="Avoid cold/oily foods. Drink warm water. Sleep before 10:30 PM. 20-min daily pranayama."
                className="w-full rounded-2xl border border-slate-300 p-4 text-xs text-slate-800 focus:border-[#18532f] focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-full bg-[#18532f] px-7 py-3 text-xs font-bold text-white shadow-md hover:bg-[#123e23] transition-all disabled:opacity-70"
            >
              <FileText className="h-4 w-4" />
              <span>{loading ? "Generating PDF..." : "Generate Prescription PDF"}</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
