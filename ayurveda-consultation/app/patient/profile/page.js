"use client";

import { useEffect, useState } from "react";
import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export default function ProfilePage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", age: "", gender: "", address: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/profile").then(r => r.json()).then(d => d.user && setForm({
      name: d.user.name || "", email: d.user.email || "", phone: d.user.phone || "",
      age: d.user.age || "", gender: d.user.gender || "", address: d.user.address || ""
    }));
  }, []);

  async function save(e) {
    e.preventDefault();
    const res = await fetch("/api/profile", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form)
    });
    const data = await res.json();
    setMessage(res.ok ? "Profile updated." : data.message || "Update failed.");
  }

  return (
    <div className="md:flex">
      <PatientSidebar />
      <main className="min-w-0 flex-1 p-5 md:p-8">
        <div className="mb-8"><h1 className="text-3xl font-bold">My Profile</h1><p className="text-muted-foreground">Manage your personal information.</p></div>
        <Card className="max-w-2xl">
          <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={save} className="grid gap-5">
              <Field label="Name" value={form.name} setValue={v => setForm({...form, name: v})} />
              <Field label="Email" type="email" value={form.email} setValue={v => setForm({...form, email: v})} />
              <Field label="Phone" value={form.phone} setValue={v => setForm({...form, phone: v})} />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Age" type="number" value={form.age} setValue={v => setForm({...form, age: v})} />
                <div className="space-y-2"><Label>Gender</Label><Select value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></Select></div>
              </div>
              <div className="space-y-2"><Label>Address</Label><Textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})} /></div>
              <Button>Save Changes</Button>
              {message && <p className="text-sm text-muted-foreground">{message}</p>}
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function Field({ label, type = "text", value, setValue }) {
  return <div className="space-y-2"><Label>{label}</Label><Input type={type} value={value} onChange={e => setValue(e.target.value)} /></div>;
}
