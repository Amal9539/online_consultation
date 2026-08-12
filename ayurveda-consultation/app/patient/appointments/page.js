// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import PatientSidebar from "@/components/PatientSidebar";
// import AppointmentCard from "@/components/AppointmentCard";
// import { Button } from "@/components/ui/button";

// export default function PatientAppointments() {
//   const [appointments, setAppointments] = useState([]);

//   async function load() {
//     const res = await fetch("/api/appointments");
//     const data = await res.json();
//     setAppointments(data.appointments || []);
//   }

//   useEffect(() => { load(); }, []);

//   return (
//     <div className="md:flex">
//       <PatientSidebar />
//       <main className="min-w-0 flex-1 p-5 md:p-8">
//         <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div><h1 className="text-3xl font-bold">My Appointments</h1><p className="text-muted-foreground">View your consultation schedule.</p></div>
//           <Link href="/patient/book-appointment"><Button>+ Book Appointment</Button></Link>
//         </div>
//         <div className="grid gap-4">
//           {appointments.map(a => <AppointmentCard key={a.id} appointment={a} />)}
//           {!appointments.length && <p className="text-muted-foreground">No appointments found.</p>}
//         </div>
//       </main>
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PatientSidebar from "@/components/PatientSidebar";
import AppointmentCard from "@/components/AppointmentCard";
import { Button } from "@/components/ui/button";
import { Leaf, Plus } from "lucide-react";

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
      <main
        className="min-w-0 flex-1 px-6 pb-6 pt-3 md:px-12 md:pb-12 md:pt-5"
        style={{
          background:
            "radial-gradient(circle at 15% 10%, rgba(196,136,31,0.07), transparent 45%), radial-gradient(circle at 85% 90%, rgba(63,90,63,0.08), transparent 45%), #FAF5E9",
        }}
      >
        <div className="mx-auto max-w-4xl" style={{ marginTop: "80px" }}>
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "#3F5A3F" }}
              >
                <Leaf className="h-7 w-7" style={{ color: "#FAF5E9" }} strokeWidth={1.75} />
              </div>
              <div>
                <h1
                  className="text-4xl font-semibold tracking-tight"
                  style={{ color: "#3A2E22", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  My Appointments
                </h1>
                <p className="text-lg" style={{ color: "#6B5B4A" }}>
                  Your consultation schedule, at a glance.
                </p>
              </div>
            </div>

            <Link href="/patient/book-appointment">
              <Button
                className="h-12 rounded-full px-6 text-base font-medium"
                style={{ backgroundColor: "#3F5A3F", color: "#FAF5E9" }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Appointments list */}
          {appointments.length > 0 ? (
            <div className="grid gap-4">
              {appointments.map(a => (
                <div
                  key={a.id}
                  className="overflow-hidden rounded-2xl border shadow-sm"
                  style={{ backgroundColor: "#FFFDF8", borderColor: "#E4D5B7" }}
                >
                  <AppointmentCard appointment={a} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border py-20 text-center"
      style={{ backgroundColor: "#FFFDF8", borderColor: "#E4D5B7" }}
    >
      <svg
        className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 opacity-[0.07]"
        viewBox="0 0 100 100"
        fill="none"
        stroke="#3F5A3F"
        strokeWidth="1.2"
      >
        <path d="M90 10 C 60 10, 20 40, 10 90" />
        <path d="M85 20 C 60 22, 30 45, 20 82" />
        <path d="M78 12 C 65 30, 55 45, 50 55" />
      </svg>

      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
        style={{ backgroundColor: "#F3E9D2" }}
      >
        <Leaf className="h-6 w-6" style={{ color: "#C4881F" }} strokeWidth={1.75} />
      </div>
      <h3
        className="text-xl font-semibold"
        style={{ color: "#3A2E22", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        No appointments yet
      </h3>
      <p className="mt-1 max-w-sm text-base" style={{ color: "#8A7A67" }}>
        Book a consultation to begin your course of care.
      </p>
      <Link href="/patient/book-appointment" className="mt-6">
        <Button
          className="h-11 rounded-full px-6 text-base font-medium"
          style={{ backgroundColor: "#3F5A3F", color: "#FAF5E9" }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Book Your First Appointment
        </Button>
      </Link>
    </div>
  );
}