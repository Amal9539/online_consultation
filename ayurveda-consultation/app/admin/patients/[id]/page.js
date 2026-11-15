"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import ReportCard from "@/components/ReportCard";
import AppointmentCard from "@/components/AppointmentCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PatientDetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) fetch(`/api/patients/${id}`).then(r => r.json()).then(setData);
  }, [id]);

  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <div className="md:flex">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-5 md:p-8">
        <div className="mb-8"><h1 className="text-3xl font-bold">{data.patient.name}</h1><p className="text-muted-foreground">{data.patient.email}</p></div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card><CardHeader><CardTitle>Patient Information</CardTitle></CardHeader><CardContent className="space-y-3 text-sm">
            <Info label="Phone" value={data.patient.phone} />
            <Info label="Age" value={data.patient.age} />
            <Info label="Gender" value={data.patient.gender} />
            <Info label="Address" value={data.patient.address} />
          </CardContent></Card>

          <Card><CardHeader><CardTitle>Medical Reports</CardTitle></CardHeader><CardContent className="grid gap-3">
            {data.patient.reports.map(r => <ReportCard key={r.id} report={r} />)}
            {!data.patient.reports.length && <p className="text-sm text-muted-foreground">No reports.</p>}
          </CardContent></Card>
        </div>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Appointment History</h2>
          <div className="grid gap-4">{data.patient.appointments.map(a => <AppointmentCard key={a.id} appointment={a} />)}</div>
        </section>
      </main>
    </div>
  );
}

function Info({ label, value }) {
  return <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">{label}</span><strong>{value || "-"}</strong></div>;
}
