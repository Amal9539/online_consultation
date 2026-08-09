"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export default function BookAppointmentPage() {
  const router = useRouter();
  const [form, setForm] = useState({ date: "", time: "", consultationType: "Online Consultation", reason: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");
      router.push("/patient/appointments");
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  return (
    <div className="md:flex">
      <PatientSidebar />
      <main className="min-w-0 flex-1 p-5 md:p-8">
        <div className="mb-8"><h1 className="text-3xl font-bold">Book Appointment</h1><p className="text-muted-foreground">Schedule your online Ayurveda consultation.</p></div>
        <Card className="max-w-2xl">
          <CardHeader><CardTitle>Appointment Details</CardTitle></CardHeader>
          <CardContent>
            {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}
            <form onSubmit={submit} className="grid gap-5">
              <div className="space-y-2"><Label>Consultation Type</Label><Select value={form.consultationType} onChange={e => setForm({...form, consultationType: e.target.value})}>
                <option>Online Consultation</option><option>Diet Consultation</option><option>Lifestyle Guidance</option><option>Follow-up Consultation</option>
              </Select></div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2"><Label>Date</Label><Input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required /></div>
                <div className="space-y-2"><Label>Time</Label><Input type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} required /></div>
              </div>
              <div className="space-y-2"><Label>Reason</Label><Textarea value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} placeholder="Describe the reason for consultation" /></div>
              <Button disabled={loading}>{loading ? "Booking..." : "Book Appointment"}</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
