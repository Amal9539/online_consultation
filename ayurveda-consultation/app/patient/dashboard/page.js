// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import PatientSidebar from "@/components/PatientSidebar";
// import AppointmentCard from "@/components/AppointmentCard";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// export default function PatientDashboard() {
//   const [data, setData] = useState({ user: null, appointments: [], reports: [], prescriptions: [] });

//   useEffect(() => {
//     fetch("/api/patient/dashboard").then(r => r.json()).then(setData).catch(() => {});
//   }, []);

//   return (
//     <div className="md:flex">
//       <PatientSidebar />
//       <main className="min-w-0 flex-1 p-5 md:p-8">
//         <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <p className="text-sm font-medium text-primary">PATIENT DASHBOARD</p>
//             <h1 className="text-3xl font-bold">Welcome{data.user ? `, ${data.user.name}` : ""}</h1>
//             <p className="mt-1 text-muted-foreground">Manage your consultations and health records.</p>
//           </div>
//           <Link href="/patient/book-appointment"><Button>+ Book Appointment</Button></Link>
//         </div>

//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           <Stat title="Appointments" value={data.appointments.length} />
//           <Stat title="Reports" value={data.reports.length} />
//           <Stat title="Prescriptions" value={data.prescriptions.length} />
//           <Stat title="Upcoming" value={data.appointments.filter(a => a.status === "SCHEDULED").length} />
//         </div>

//         <section className="mt-8">
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="text-xl font-semibold">Recent Appointments</h2>
//             <Link href="/patient/appointments" className="text-sm font-medium text-primary">View all</Link>
//           </div>
//           <div className="grid gap-4">
//             {data.appointments.length ? data.appointments.slice(0, 3).map(a => <AppointmentCard key={a.id} appointment={a} />) : (
//               <Card><CardContent className="p-6 text-sm text-muted-foreground">No appointments yet.</CardContent></Card>
//             )}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// function Stat({ title, value }) {
//   return (
//     <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">{title}</p><p className="mt-1 text-3xl font-bold">{value}</p></CardContent></Card>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PatientSidebar from "@/components/PatientSidebar";
import { Button } from "@/components/ui/button";

export default function PatientDashboard() {
  const [data, setData] = useState({ user: null, appointments: [], reports: [], prescriptions: [] });

  useEffect(() => {
    fetch("/api/patient/dashboard").then(r => r.json()).then(setData).catch(() => {});
  }, []);

  const upcoming = data.appointments.filter(a => a.status === "SCHEDULED");
  const nextVisit = upcoming[0];

  return (
    <div className="md:flex" style={{ background: "#EFE7D3" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'IBM Plex Sans', sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        .ticket-stub {
          position: relative;
          background: #9B3D3D;
          color: #EFE7D3;
          border-radius: 4px;
        }
        .ticket-stub::before,
        .ticket-stub::after {
          content: "";
          position: absolute;
          width: 18px;
          height: 18px;
          background: #EFE7D3;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
        }
        .ticket-stub::before { left: -9px; }
        .ticket-stub::after { right: -9px; }
        .perforation {
          border-left: 2px dashed rgba(239,231,211,0.4);
        }
        .ledger-row + .ledger-row {
          border-top: 1px solid rgba(43,38,32,0.12);
        }
      `}</style>

      <PatientSidebar />

      <main className="min-w-0 flex-1 p-5 md:p-10 font-body" style={{ color: "#2B2620" }}>

        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: "#9B3D3D" }}>
              Patient Record
            </p>
            <h1 className="font-display text-4xl mt-1" style={{ color: "#1F2E22" }}>
              Welcome{data.user ? `, ${data.user.name}` : ""}
            </h1>
            <p className="mt-2 text-sm" style={{ color: "#5A5142" }}>
              Your consultations, reports and prescriptions, in one record.
            </p>
          </div>
          <Link href="/patient/book-appointment">
            <Button
              className="font-body"
              style={{ background: "#1F2E22", color: "#EFE7D3", borderRadius: "4px" }}
            >
              + Book Appointment
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Left column */}
          <div>
            {/* Ledger strip */}
            <div
              className="mb-8 flex flex-wrap items-stretch overflow-hidden rounded-md"
              style={{ background: "#1F2E22" }}
            >
              <LedgerStat label="Appointments" value={data.appointments.length} />
              <LedgerStat label="Reports" value={data.reports.length} first={false} />
              <LedgerStat label="Prescriptions" value={data.prescriptions.length} />
              <LedgerStat label="Upcoming" value={upcoming.length} last />
            </div>

            {/* Recent appointments — ledger list */}
            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-xl" style={{ color: "#1F2E22" }}>
                  Recent Appointments
                </h2>
                <Link
                  href="/patient/appointments"
                  className="font-mono text-xs tracking-wide uppercase"
                  style={{ color: "#9B3D3D" }}
                >
                  View all →
                </Link>
              </div>

              <div
                className="rounded-md border overflow-hidden"
                style={{ borderColor: "rgba(43,38,32,0.15)", background: "#F7F2E4" }}
              >
                {data.appointments.length ? (
                  data.appointments.slice(0, 5).map(a => (
                    <div
                      key={a.id}
                      className="ledger-row flex items-center justify-between gap-4 px-5 py-4"
                    >
                      <div>
                        <p className="font-body text-sm font-medium">
                          {a.doctorName || "Dr. Princy"}
                        </p>
                        <p className="font-mono text-xs mt-0.5" style={{ color: "#5A5142" }}>
                          {a.date ? new Date(a.date).toLocaleDateString() : "—"}
                          {a.time ? ` · ${a.time}` : ""}
                        </p>
                      </div>
                      <span
                        className="font-mono text-[11px] uppercase tracking-wide px-2 py-1 rounded"
                        style={{
                          background:
                            a.status === "SCHEDULED" ? "rgba(155,61,61,0.1)" : "rgba(43,38,32,0.08)",
                          color: a.status === "SCHEDULED" ? "#9B3D3D" : "#5A5142",
                        }}
                      >
                        {a.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="px-5 py-8 text-sm text-center" style={{ color: "#5A5142" }}>
                    No appointments yet — your record starts when you book one.
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right column — next visit stub + quick links */}
          <div className="space-y-6">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#5A5142" }}>
                Next Visit
              </p>
              {nextVisit ? (
                <div className="ticket-stub flex items-center">
                  <div className="flex-1 px-5 py-5">
                    <p className="font-display text-lg">{nextVisit.doctorName || "Dr. Princy"}</p>
                    <p className="font-mono text-xs mt-1 opacity-80">
                      {new Date(nextVisit.date).toLocaleDateString(undefined, {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })}
                      {nextVisit.time ? ` · ${nextVisit.time}` : ""}
                    </p>
                  </div>
                  <div className="perforation h-full px-3 flex items-center">
                    <span className="font-mono text-[10px] [writing-mode:vertical-rl] tracking-widest opacity-70">
                      ARAYAL
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  className="rounded-md border border-dashed px-5 py-6 text-sm text-center"
                  style={{ borderColor: "rgba(43,38,32,0.2)", color: "#5A5142" }}
                >
                  No upcoming visit booked.
                </div>
              )}
            </div>

            <div className="rounded-md p-5" style={{ background: "#F7F2E4", border: "1px solid rgba(43,38,32,0.12)" }}>
              <p className="font-display text-base mb-3" style={{ color: "#1F2E22" }}>
                Quick Access
              </p>
              <div className="flex flex-col gap-2">
                <Link href="/patient/prescriptions" className="text-sm font-body hover:underline" style={{ color: "#2E3A55" }}>
                  View prescriptions
                </Link>
                <Link href="/patient/reports" className="text-sm font-body hover:underline" style={{ color: "#2E3A55" }}>
                  View reports
                </Link>
                <Link href="/patient/appointments" className="text-sm font-body hover:underline" style={{ color: "#2E3A55" }}>
                  Manage appointments
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function LedgerStat({ label, value, first, last }) {
  return (
    <div
      className="flex-1 min-w-[130px] px-6 py-5"
      style={{
        borderLeft: first === false ? "1px solid rgba(239,231,211,0.15)" : "none",
        borderRight: last ? "none" : "1px solid rgba(239,231,211,0.15)",
      }}
    >
      <p className="font-mono text-3xl" style={{ color: "#EFE7D3" }}>
        {value}
      </p>
      <p className="font-mono text-[11px] tracking-[0.15em] uppercase mt-1" style={{ color: "#C99A2E" }}>
        {label}
      </p>
    </div>
  );
}