"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PatientSidebar from "@/components/PatientSidebar";
import AppointmentCard from "@/components/AppointmentCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PatientDashboard() {
  const [data, setData] = useState({ user: null, appointments: [], reports: [], prescriptions: [] });

  useEffect(() => {
    fetch("/api/patient/dashboard").then(r => r.json()).then(setData).catch(() => {});
  }, []);

  return (
    <div className="md:flex">
      <PatientSidebar />
      <main className="min-w-0 flex-1 p-5 md:p-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">PATIENT DASHBOARD</p>
            <h1 className="text-3xl font-bold">Welcome{data.user ? `, ${data.user.name}` : ""}</h1>
            <p className="mt-1 text-muted-foreground">Manage your consultations and health records.</p>
          </div>
          <Link href="/patient/book-appointment"><Button>+ Book Appointment</Button></Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat title="Appointments" value={data.appointments.length} />
          <Stat title="Reports" value={data.reports.length} />
          <Stat title="Prescriptions" value={data.prescriptions.length} />
          <Stat title="Upcoming" value={data.appointments.filter(a => a.status === "SCHEDULED").length} />
        </div>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Appointments</h2>
            <Link href="/patient/appointments" className="text-sm font-medium text-primary">View all</Link>
          </div>
          <div className="grid gap-4">
            {data.appointments.length ? data.appointments.slice(0, 3).map(a => <AppointmentCard key={a.id} appointment={a} />) : (
              <Card><CardContent className="p-6 text-sm text-muted-foreground">No appointments yet.</CardContent></Card>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">{title}</p><p className="mt-1 text-3xl font-bold">{value}</p></CardContent></Card>
  );
}
