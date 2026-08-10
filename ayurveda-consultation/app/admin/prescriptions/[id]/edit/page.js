"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function EditPrescriptionPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ diagnosis: "", medicines: "", instructions: "" });
  const [patientLabel, setPatientLabel] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/prescriptions/${id}/data`)
      .then(r => r.json())
      .then(d => {
        if (d.prescription) {
          setForm({
            diagnosis: d.prescription.diagnosis || "",
            medicines: d.prescription.medicines || "",
            instructions: d.prescription.instructions || "",
          });
          setPatientLabel(`${d.prescription.patient?.name || ""} — ${d.prescription.patient?.email || ""}`);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const res = await fetch(`/api/prescriptions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) { setMessage(data.message || "Failed to update."); return; }
    setMessage("Prescription updated successfully.");
    setTimeout(() => router.push(`/admin/patients`), 1000);
  }

  if (loading) {
    return (
      <div className="md:flex">
        <AdminSidebar />
        <main className="min-w-0 flex-1 p-5 md:p-8">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="md:flex">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-5 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Edit Prescription</h1>
          <p className="text-muted-foreground">{patientLabel}</p>
        </div>
        <Card className="max-w-3xl">
          <CardHeader><CardTitle>Update Details</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={submit} className="grid gap-5">
              <div className="space-y-2">
                <Label>Diagnosis</Label>
                <Textarea value={form.diagnosis} onChange={e => setForm({ ...form, diagnosis: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Medicines / Treatment</Label>
                <Textarea value={form.medicines} onChange={e => setForm({ ...form, medicines: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Instructions</Label>
                <Textarea value={form.instructions} onChange={e => setForm({ ...form, instructions: e.target.value })} />
              </div>
              <Button disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
              {message && <p className="text-sm text-muted-foreground">{message}</p>}
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}