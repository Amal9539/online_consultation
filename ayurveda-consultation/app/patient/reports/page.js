// "use client";

// import { useEffect, useState } from "react";
// import PatientSidebar from "@/components/PatientSidebar";
// import ReportCard from "@/components/ReportCard";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function ReportsPage() {
//   const [reports, setReports] = useState([]);
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   async function load() {
//     const res = await fetch("/api/reports");
//     const data = await res.json();
//     setReports(data.reports || []);
//   }

//   useEffect(() => { load(); }, []);

//   async function upload(e) {
//     e.preventDefault();
//     if (!file) return;
//     setLoading(true); setMessage("");
//     const fd = new FormData();
//     fd.append("file", file);
//     try {
//       const res = await fetch("/api/reports", { method: "POST", body: fd });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Upload failed");
//       setMessage("Report uploaded successfully.");
//       setFile(null);
//       e.target.reset();
//       load();
//     } catch (err) { setMessage(err.message); }
//     finally { setLoading(false); }
//   }

//   return (
//     <div className="md:flex">
//       <PatientSidebar />
//       <main className="min-w-0 flex-1 p-5 md:p-8">
//         <div className="mb-8"><h1 className="text-3xl font-bold">Medical Reports</h1><p className="text-muted-foreground">Upload PDF or image medical reports.</p></div>
//         <Card className="max-w-2xl">
//           <CardHeader><CardTitle>Upload Report</CardTitle></CardHeader>
//           <CardContent>
//             <form onSubmit={upload} className="flex flex-col gap-4">
//               <div className="space-y-2"><Label>PDF / JPG / PNG</Label><Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setFile(e.target.files?.[0] || null)} required /></div>
//               <Button disabled={loading}>{loading ? "Uploading..." : "Upload Report"}</Button>
//               {message && <p className="text-sm text-muted-foreground">{message}</p>}
//             </form>
//           </CardContent>
//         </Card>
//         <section className="mt-8">
//           <h2 className="mb-4 text-xl font-semibold">Uploaded Reports</h2>
//           <div className="grid gap-4">{reports.map(r => <ReportCard key={r.id} report={r} />)}</div>
//         </section>
//       </main>
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import PatientSidebar from "@/components/PatientSidebar";
import ReportCard from "@/components/ReportCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, UploadCloud } from "lucide-react";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    const res = await fetch("/api/reports");
    const data = await res.json();
    setReports(data.reports || []);
  }

  useEffect(() => { load(); }, []);

  async function upload(e) {
    e.preventDefault();
    if (!file) return;
    setLoading(true); setMessage("");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/reports", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      setMessage("Report uploaded successfully.");
      setFile(null);
      e.target.reset();
      load();
    } catch (err) { setMessage(err.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="md:flex" style={{ background: "#FBF6EC" }}>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap");
        .font-display { font-family: "Fraunces", serif; }
        .font-body { font-family: "Inter", sans-serif; }
        .ayur-field input {
          border-color: rgba(43, 38, 32, 0.14) !important;
          background: #fff !important;
        }
        .ayur-field input:focus {
          border-color: #6b8f71 !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(107, 143, 113, 0.15) !important;
        }
        .ayur-upload {
          overflow: visible !important;
        }
        .ayur-upload input[type="file"] {
          display: flex;
          align-items: center;
          width: 100%;
          font-family: "Inter", sans-serif;
          font-size: 13px;
          color: #5b5347;
          white-space: nowrap;
        }
        .ayur-upload input[type="file"]::file-selector-button {
          flex-shrink: 0;
          margin-right: 12px;
          padding: 8px 18px;
          border-radius: 9999px;
          border: none;
          background: #3f5744;
          color: #fbf6ec;
          font-family: "Inter", sans-serif;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .ayur-upload input[type="file"]::file-selector-button:hover {
          background: #354a39;
        }
      `}</style>

      <PatientSidebar />

      <main className="min-w-0 flex-1 p-5 font-body md:p-10" style={{ color: "#2B2620" ,marginTop:"60px" }}>
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em]" style={{ color: "#B15A34" }}>
            Ayurveda Consultation
          </p>
          <h1 className="font-display mt-1 text-3xl md:text-[2.1rem]" style={{ color: "#3F5744" }}>
            Medical reports
          </h1>
          <p className="mt-2 text-[14px]" style={{ color: "#8A8171" }}>
            Upload PDF or image medical reports for your practitioner to review.
          </p>
        </div>

        <Card className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border-0 shadow-[0_1px_3px_rgba(43,38,32,0.06)]" style={{ background: "#FFFDF8" }}>
          <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #6B8F71, #E3A857, #D97B4F)" }} />

          <CardHeader className="pb-2">
            <CardTitle className="font-display flex items-center gap-2 text-xl font-normal" style={{ color: "#3F5744" }}>
              <UploadCloud size={20} strokeWidth={1.75} style={{ color: "#B15A34" }} />
              Upload report
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-2">
            <form onSubmit={upload} className="ayur-field flex flex-col gap-5">
              <div className="space-y-2">
                <Label className="font-body text-[13px] font-medium" style={{ color: "#5B5347" }}>
                  PDF / JPG / PNG
                </Label>
                <div
                  className="ayur-upload rounded-xl border border-dashed px-4 py-5"
                  style={{ borderColor: "rgba(63,87,68,0.28)", background: "rgba(107,143,113,0.05)" }}
                >
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    required
                    className="h-auto border-0 bg-transparent p-0 shadow-none"
                  />
                </div>
              </div>

              <Button
                disabled={loading}
                className="w-full rounded-full py-5 text-[14px] font-semibold disabled:opacity-60"
                style={{ background: "#3F5744", color: "#FBF6EC" }}
              >
                {loading ? "Uploading…" : "Upload report"}
              </Button>

              {message && (
                <p
                  className="rounded-xl px-4 py-3 text-[13px]"
                  style={{
                    background: message.includes("success") ? "rgba(107,143,113,0.12)" : "rgba(217,123,79,0.1)",
                    color: message.includes("success") ? "#3F5744" : "#a5502c",
                  }}
                >
                  {message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        <section className="mx-auto mt-10 max-w-2xl">
          <div className="mb-4 flex items-center gap-2">
            <FileText size={18} strokeWidth={1.75} style={{ color: "#3F5744" }} />
            <h2 className="font-display text-xl font-normal" style={{ color: "#3F5744" }}>
              Uploaded reports
            </h2>
          </div>

          {reports.length === 0 ? (
            <div
              className="rounded-2xl border px-6 py-10 text-center"
              style={{ borderColor: "rgba(43,38,32,0.1)", background: "#FFFDF8" }}
            >
              <p className="font-body text-[14px]" style={{ color: "#8A8171" }}>
                No reports uploaded yet. Your medical reports will appear here once added.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {reports.map((r) => (
                <ReportCard key={r.id} report={r} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}