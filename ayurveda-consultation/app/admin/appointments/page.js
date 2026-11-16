"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [links, setLinks] = useState({});
  const [message, setMessage] = useState("");

  async function load() {
    const res = await fetch("/api/appointments");
    const data = await res.json();
    setAppointments(data.appointments || []);
  }

  useEffect(() => { load(); }, []);

  async function save(id) {
    const res = await fetch(`/api/appointments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ zoomLink: links[id] || "" })
    });
    const data = await res.json();
    setMessage(res.ok ? "Zoom link saved." : data.message || "Update failed.");
    load();
  }

  return (
    <div className="md:flex">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-5 md:p-8">
        <div className="mb-8"><h1 className="text-3xl font-bold">Appointments</h1><p className="text-muted-foreground">View appointments and add the Zoom consultation link.</p></div>
        {message && <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700">{message}</div>}
        <div className="grid gap-4">
          {appointments.map(a => (
            <Card key={a.id}>
              <CardContent className="grid gap-5 p-5 lg:grid-cols-2">
                <div>
                  <p className="text-sm text-primary">Patient</p>
                  <h3 className="text-xl font-semibold">{a.patient.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{a.patient.email}</p>
                  <p className="mt-2 text-sm">{a.consultationType}</p>
                  <p className="text-sm">{new Date(a.date).toLocaleDateString()} · {a.time}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{a.reason || "No reason provided."}</p>
                </div>
                <div className="space-y-3">
                  <div className="space-y-2"><Label>Zoom Meeting Link</Label><Input value={links[a.id] ?? a.zoomLink ?? ""} onChange={e => setLinks({...links, [a.id]: e.target.value})} placeholder="https://zoom.us/..." /></div>
                  <Button onClick={() => save(a.id)}>Save Zoom Link</Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {!appointments.length && <p className="text-muted-foreground">No appointments found.</p>}
        </div>
      </main>
    </div>
  );
}
