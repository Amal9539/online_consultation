"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export default function AdminPrescriptionsPage() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ patientId: "", diagnosis: "", medicines: "", instructions: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/patients").then(r => r.json()).then(d => setPatients(d.patients || []));
  }, []);

  async function submit(e) {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/prescriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (!res.ok) { setMessage(data.message || "Failed."); return; }
    setMessage("Prescription generated successfully. The PDF is now available to the patient.");
    setForm({ patientId: "", diagnosis: "", medicines: "", instructions: "" });
  }

  return (
    <div className="md:flex">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-5 md:p-8">
        <div className="mb-8"><h1 className="text-3xl font-bold">Prescriptions</h1><p className="text-muted-foreground">Generate digital prescriptions as PDF.</p></div>
        <Card className="max-w-3xl">
          <CardHeader><CardTitle>Create Prescription</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={submit} className="grid gap-5">
              <div className="space-y-2"><Label>Patient</Label><Select value={form.patientId} onChange={e => setForm({...form, patientId: e.target.value})} required><option value="">Select patient</option>{patients.map(p => <option key={p.id} value={p.id}>{p.name} — {p.email}</option>)}</Select></div>
              <div className="space-y-2"><Label>Diagnosis</Label><Textarea value={form.diagnosis} onChange={e => setForm({...form, diagnosis: e.target.value})} /></div>
              <div className="space-y-2"><Label>Medicines / Treatment</Label><Textarea value={form.medicines} onChange={e => setForm({...form, medicines: e.target.value})} required placeholder="Medicine name, dosage and duration" /></div>
              <div className="space-y-2"><Label>Instructions</Label><Textarea value={form.instructions} onChange={e => setForm({...form, instructions: e.target.value})} /></div>
              <Button>Generate Prescription PDF</Button>
              {message && <p className="text-sm text-muted-foreground">{message}</p>}
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
