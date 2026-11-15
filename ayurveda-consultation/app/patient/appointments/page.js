"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PatientSidebar from "@/components/PatientSidebar";
import AppointmentCard from "@/components/AppointmentCard";
import { Button } from "@/components/ui/button";

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);

  async function load() {
    const res = await fetch("/api/appointments");
    const data = await res.json();
    setAppointments(data.appointments || []);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="md:flex">
      <PatientSidebar />
      <main className="min-w-0 flex-1 p-5 md:p-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div><h1 className="text-3xl font-bold">My Appointments</h1><p className="text-muted-foreground">View your consultation schedule.</p></div>
          <Link href="/patient/book-appointment"><Button>+ Book Appointment</Button></Link>
        </div>
        <div className="grid gap-4">
          {appointments.map(a => <AppointmentCard key={a.id} appointment={a} />)}
          {!appointments.length && <p className="text-muted-foreground">No appointments found.</p>}
        </div>
      </main>
    </div>
  );
}
