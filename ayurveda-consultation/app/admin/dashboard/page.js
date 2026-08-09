"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ patients: 0, appointments: 0, upcoming: 0, prescriptions: 0 });

  useEffect(() => {
    fetch("/api/admin/dashboard").then(r => r.json()).then(setStats).catch(() => {});
  }, []);

  return (
    <div className="md:flex">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-5 md:p-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">DOCTOR / ADMIN</p>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage patients, appointments and prescriptions.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat title="Patients" value={stats.patients} />
          <Stat title="Appointments" value={stats.appointments} />
          <Stat title="Upcoming" value={stats.upcoming} />
          <Stat title="Prescriptions" value={stats.prescriptions} />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Action href="/admin/patients" title="Manage Patients" text="View patient details and reports." />
          <Action href="/admin/appointments" title="Appointments" text="View appointments and add Zoom links." />
          <Action href="/admin/prescriptions" title="Prescriptions" text="Create and generate patient prescriptions." />
        </div>
      </main>
    </div>
  );
}

function Stat({ title, value }) {
  return <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">{title}</p><p className="mt-1 text-3xl font-bold">{value}</p></CardContent></Card>;
}
function Action({ href, title, text }) {
  return <Card><CardContent className="p-6"><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{text}</p><Link href={href} className="mt-4 inline-block"><Button variant="outline">Open</Button></Link></CardContent></Card>;
}
