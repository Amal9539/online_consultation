"use client";

import { useEffect, useState } from "react";
import ReportCard from "@/components/ReportCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderHeart, UploadCloud, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    try {
      const res = await fetch("/api/reports");
      const data = await res.json();
      setReports(data.reports || []);
    } catch {}
  }

  useEffect(() => {
    load();
  }, []);

  async function upload(e) {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setMessage("");
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/reports", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to upload.");
      setMessage("Medical report uploaded successfully for Dr. Princy's review.");
      setFile(null);
      e.target.reset();
      load();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f6f9f4] w-full">
      <main className="p-5 md:p-8 w-full max-w-7xl xl:max-w-[1650px] mx-auto space-y-8">
        {/* Ayurvedic Header Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-900/10 bg-gradient-to-r from-[#edf6ea] via-[#e2efe0] to-[#d4ebd0] p-6 sm:p-8 shadow-sm">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#18532f] border border-emerald-200">
              <FolderHeart className="h-3.5 w-3.5" />
              <span>Diagnostic & Clinical History</span>
            </span>
            <h1 className="mt-3 font-serif text-3xl font-extrabold text-[#143d23]">
              Health Records & Medical Reports
            </h1>
            <p className="mt-1 text-sm text-slate-700">
              Upload your lab investigations, blood tests, or previous medical summaries to help Dr. Princy assess your health history prior to consultation.
            </p>
          </div>
        </div>

        {/* Upload Card */}
        <div className="rounded-3xl border border-emerald-950/10 bg-white p-6 sm:p-8 shadow-sm">
          <div className="mb-4">
            <h3 className="font-serif text-lg font-bold text-[#143d23]">
              Upload New Medical Document
            </h3>
            <p className="text-xs text-slate-500">
              Supported formats: PDF, JPG, PNG (Max 10MB)
            </p>
          </div>

          <form onSubmit={upload} className="space-y-4">
            <div className="rounded-2xl border-2 border-dashed border-emerald-200 bg-[#fbfdfa] p-6 text-center hover:border-[#18532f] transition-colors">
              <UploadCloud className="mx-auto h-10 w-10 text-emerald-600 mb-2" />
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
                className="text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-100 file:text-[#18532f] hover:file:bg-emerald-200 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                disabled={loading || !file}
                className="flex items-center gap-2 rounded-full bg-[#18532f] px-6 py-3 text-xs font-bold text-white shadow-md shadow-[#18532f]/20 hover:bg-[#123e23] disabled:opacity-50 transition-all"
              >
                <span>{loading ? "Uploading Document..." : "Upload Medical Record"}</span>
              </button>

              {message && (
                <p className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>{message}</span>
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Uploaded Reports Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-950/10 pb-3">
            <h2 className="font-serif text-xl font-bold text-[#143d23]">
              Uploaded Medical Files ({reports.length})
            </h2>
          </div>

          <div className="grid gap-4">
            {reports.map((r) => (
              <ReportCard key={r.id} report={r} />
            ))}
          </div>

          {!reports.length && (
            <div className="rounded-3xl border border-dashed border-emerald-200 bg-white p-10 text-center text-xs text-slate-500">
              No medical records uploaded yet. You can upload previous blood tests, scans, or discharge summaries anytime.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
