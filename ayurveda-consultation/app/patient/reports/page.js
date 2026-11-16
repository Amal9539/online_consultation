"use client";

import { useEffect, useState } from "react";
import PatientSidebar from "@/components/PatientSidebar";
import ReportCard from "@/components/ReportCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className="md:flex">
      <PatientSidebar />
      <main className="min-w-0 flex-1 p-5 md:p-8">
        <div className="mb-8"><h1 className="text-3xl font-bold">Medical Reports</h1><p className="text-muted-foreground">Upload PDF or image medical reports.</p></div>
        <Card className="max-w-2xl">
          <CardHeader><CardTitle>Upload Report</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={upload} className="flex flex-col gap-4">
              <div className="space-y-2"><Label>PDF / JPG / PNG</Label><Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setFile(e.target.files?.[0] || null)} required /></div>
              <Button disabled={loading}>{loading ? "Uploading..." : "Upload Report"}</Button>
              {message && <p className="text-sm text-muted-foreground">{message}</p>}
            </form>
          </CardContent>
        </Card>
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Uploaded Reports</h2>
          <div className="grid gap-4">{reports.map(r => <ReportCard key={r.id} report={r} />)}</div>
        </section>
      </main>
    </div>
  );
}
