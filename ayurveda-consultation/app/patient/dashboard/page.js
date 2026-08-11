// // "use client";

// // import { useEffect, useState } from "react";
// // import Link from "next/link";
// // import PatientSidebar from "@/components/PatientSidebar";
// // import AppointmentCard from "@/components/AppointmentCard";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";

// // export default function PatientDashboard() {
// //   const [data, setData] = useState({ user: null, appointments: [], reports: [], prescriptions: [] });

// //   useEffect(() => {
// //     fetch("/api/patient/dashboard").then(r => r.json()).then(setData).catch(() => {});
// //   }, []);

// //   return (
// //     <div className="md:flex">
// //       <PatientSidebar />
// //       <main className="min-w-0 flex-1 p-5 md:p-8">
// //         <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
// //           <div>
// //             <p className="text-sm font-medium text-primary">PATIENT DASHBOARD</p>
// //             <h1 className="text-3xl font-bold">Welcome{data.user ? `, ${data.user.name}` : ""}</h1>
// //             <p className="mt-1 text-muted-foreground">Manage your consultations and health records.</p>
// //           </div>
// //           <Link href="/patient/book-appointment"><Button>+ Book Appointment</Button></Link>
// //         </div>

// //         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
// //           <Stat title="Appointments" value={data.appointments.length} />
// //           <Stat title="Reports" value={data.reports.length} />
// //           <Stat title="Prescriptions" value={data.prescriptions.length} />
// //           <Stat title="Upcoming" value={data.appointments.filter(a => a.status === "SCHEDULED").length} />
// //         </div>

// //         <section className="mt-8">
// //           <div className="mb-4 flex items-center justify-between">
// //             <h2 className="text-xl font-semibold">Recent Appointments</h2>
// //             <Link href="/patient/appointments" className="text-sm font-medium text-primary">View all</Link>
// //           </div>
// //           <div className="grid gap-4">
// //             {data.appointments.length ? data.appointments.slice(0, 3).map(a => <AppointmentCard key={a.id} appointment={a} />) : (
// //               <Card><CardContent className="p-6 text-sm text-muted-foreground">No appointments yet.</CardContent></Card>
// //             )}
// //           </div>
// //         </section>
// //       </main>
// //     </div>
// //   );
// // }

// // function Stat({ title, value }) {
// //   return (
// //     <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">{title}</p><p className="mt-1 text-3xl font-bold">{value}</p></CardContent></Card>
// //   );
// // }



// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import PatientSidebar from "@/components/PatientSidebar";
// import { Button } from "@/components/ui/button";

// export default function PatientDashboard() {
//   const [data, setData] = useState({ user: null, appointments: [], reports: [], prescriptions: [] });

//   useEffect(() => {
//     fetch("/api/patient/dashboard").then(r => r.json()).then(setData).catch(() => {});
//   }, []);

//   const upcoming = data.appointments.filter(a => a.status === "SCHEDULED");
//   const nextVisit = upcoming[0];

//   return (
//     <div className="md:flex" style={{ background: "#EFE7D3" }}>
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
//         .font-display { font-family: 'Fraunces', serif; }
//         .font-body { font-family: 'IBM Plex Sans', sans-serif; }
//         .font-mono { font-family: 'IBM Plex Mono', monospace; }
//         .ticket-stub {
//           position: relative;
//           background: #9B3D3D;
//           color: #EFE7D3;
//           border-radius: 4px;
//         }
//         .ticket-stub::before,
//         .ticket-stub::after {
//           content: "";
//           position: absolute;
//           width: 18px;
//           height: 18px;
//           background: #EFE7D3;
//           border-radius: 50%;
//           top: 50%;
//           transform: translateY(-50%);
//         }
//         .ticket-stub::before { left: -9px; }
//         .ticket-stub::after { right: -9px; }
//         .perforation {
//           border-left: 2px dashed rgba(239,231,211,0.4);
//         }
//         .ledger-row + .ledger-row {
//           border-top: 1px solid rgba(43,38,32,0.12);
//         }
//       `}</style>

//       <PatientSidebar />

//       <main className="min-w-0 flex-1 p-5 md:p-10 font-body" style={{ color: "#2B2620" }}>

//         {/* Header */}
//         <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
//           <div>
//             <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: "#9B3D3D" }}>
//               Patient Record
//             </p>
//             <h1 className="font-display text-4xl mt-1" style={{ color: "#1F2E22" }}>
//               Welcome{data.user ? `, ${data.user.name}` : ""}
//             </h1>
//             <p className="mt-2 text-sm" style={{ color: "#5A5142" }}>
//               Your consultations, reports and prescriptions, in one record.
//             </p>
//           </div>
//           <Link href="/patient/book-appointment">
//             <Button
//               className="font-body"
//               style={{ background: "#1F2E22", color: "#EFE7D3", borderRadius: "4px" }}
//             >
//               + Book Appointment
//             </Button>
//           </Link>
//         </div>

//         <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
//           {/* Left column */}
//           <div>
//             {/* Ledger strip */}
//             <div
//               className="mb-8 flex flex-wrap items-stretch overflow-hidden rounded-md"
//               style={{ background: "#1F2E22" }}
//             >
//               <LedgerStat label="Appointments" value={data.appointments.length} />
//               <LedgerStat label="Reports" value={data.reports.length} first={false} />
//               <LedgerStat label="Prescriptions" value={data.prescriptions.length} />
//               <LedgerStat label="Upcoming" value={upcoming.length} last />
//             </div>

//             {/* Recent appointments — ledger list */}
//             <section>
//               <div className="mb-3 flex items-center justify-between">
//                 <h2 className="font-display text-xl" style={{ color: "#1F2E22" }}>
//                   Recent Appointments
//                 </h2>
//                 <Link
//                   href="/patient/appointments"
//                   className="font-mono text-xs tracking-wide uppercase"
//                   style={{ color: "#9B3D3D" }}
//                 >
//                   View all →
//                 </Link>
//               </div>

//               <div
//                 className="rounded-md border overflow-hidden"
//                 style={{ borderColor: "rgba(43,38,32,0.15)", background: "#F7F2E4" }}
//               >
//                 {data.appointments.length ? (
//                   data.appointments.slice(0, 5).map(a => (
//                     <div
//                       key={a.id}
//                       className="ledger-row flex items-center justify-between gap-4 px-5 py-4"
//                     >
//                       <div>
//                         <p className="font-body text-sm font-medium">
//                           {a.doctorName || "Dr. Princy"}
//                         </p>
//                         <p className="font-mono text-xs mt-0.5" style={{ color: "#5A5142" }}>
//                           {a.date ? new Date(a.date).toLocaleDateString() : "—"}
//                           {a.time ? ` · ${a.time}` : ""}
//                         </p>
//                       </div>
//                       <span
//                         className="font-mono text-[11px] uppercase tracking-wide px-2 py-1 rounded"
//                         style={{
//                           background:
//                             a.status === "SCHEDULED" ? "rgba(155,61,61,0.1)" : "rgba(43,38,32,0.08)",
//                           color: a.status === "SCHEDULED" ? "#9B3D3D" : "#5A5142",
//                         }}
//                       >
//                         {a.status}
//                       </span>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="px-5 py-8 text-sm text-center" style={{ color: "#5A5142" }}>
//                     No appointments yet — your record starts when you book one.
//                   </div>
//                 )}
//               </div>
//             </section>
//           </div>

//           {/* Right column — next visit stub + quick links */}
//           <div className="space-y-6">
//             <div>
//               <p className="font-mono text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#5A5142" }}>
//                 Next Visit
//               </p>
//               {nextVisit ? (
//                 <div className="ticket-stub flex items-center">
//                   <div className="flex-1 px-5 py-5">
//                     <p className="font-display text-lg">{nextVisit.doctorName || "Dr. Princy"}</p>
//                     <p className="font-mono text-xs mt-1 opacity-80">
//                       {new Date(nextVisit.date).toLocaleDateString(undefined, {
//                         weekday: "short",
//                         day: "numeric",
//                         month: "short",
//                       })}
//                       {nextVisit.time ? ` · ${nextVisit.time}` : ""}
//                     </p>
//                   </div>
//                   <div className="perforation h-full px-3 flex items-center">
//                     <span className="font-mono text-[10px] [writing-mode:vertical-rl] tracking-widest opacity-70">
//                       ARAYAL
//                     </span>
//                   </div>
//                 </div>
//               ) : (
//                 <div
//                   className="rounded-md border border-dashed px-5 py-6 text-sm text-center"
//                   style={{ borderColor: "rgba(43,38,32,0.2)", color: "#5A5142" }}
//                 >
//                   No upcoming visit booked.
//                 </div>
//               )}
//             </div>

//             <div className="rounded-md p-5" style={{ background: "#F7F2E4", border: "1px solid rgba(43,38,32,0.12)" }}>
//               <p className="font-display text-base mb-3" style={{ color: "#1F2E22" }}>
//                 Quick Access
//               </p>
//               <div className="flex flex-col gap-2">
//                 <Link href="/patient/prescriptions" className="text-sm font-body hover:underline" style={{ color: "#2E3A55" }}>
//                   View prescriptions
//                 </Link>
//                 <Link href="/patient/reports" className="text-sm font-body hover:underline" style={{ color: "#2E3A55" }}>
//                   View reports
//                 </Link>
//                 <Link href="/patient/appointments" className="text-sm font-body hover:underline" style={{ color: "#2E3A55" }}>
//                   Manage appointments
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// function LedgerStat({ label, value, first, last }) {
//   return (
//     <div
//       className="flex-1 min-w-[130px] px-6 py-5"
//       style={{
//         borderLeft: first === false ? "1px solid rgba(239,231,211,0.15)" : "none",
//         borderRight: last ? "none" : "1px solid rgba(239,231,211,0.15)",
//       }}
//     >
//       <p className="font-mono text-3xl" style={{ color: "#EFE7D3" }}>
//         {value}
//       </p>
//       <p className="font-mono text-[11px] tracking-[0.15em] uppercase mt-1" style={{ color: "#C99A2E" }}>
//         {label}
//       </p>
//     </div>
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
    <div className="md:flex" style={{ background: "#FBF6EC" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <PatientSidebar />

      <main className="min-w-0 flex-1 p-5 md:p-10 font-body" style={{ color: "#2B2620" }}>

        {/* Hero banner */}
        <div
          className="relative mb-8 overflow-hidden rounded-[28px] px-7 py-9 md:px-10 md:py-11"
          style={{ background: "#6B8F71" }}
        >
          <svg
            className="pointer-events-none absolute -right-6 -top-10 h-56 w-56 opacity-25 md:h-72 md:w-72"
            viewBox="0 0 300 300"
            aria-hidden="true"
          >
            <g fill="none" stroke="#FBF6EC" strokeWidth="2">
              <path d="M150 280 C150 210, 150 140, 150 30" />
              {[...Array(6)].map((_, i) => {
                const y = 240 - i * 40;
                const len = 60 - i * 3;
                return (
                  <g key={i}>
                    <path d={`M150 ${y} C ${150 - len * 0.5} ${y - 8}, ${150 - len} ${y - 30}, ${150 - len * 0.8} ${y - 50}`} />
                    <path d={`M150 ${y} C ${150 + len * 0.5} ${y - 8}, ${150 + len} ${y - 30}, ${150 + len * 0.8} ${y - 50}`} />
                  </g>
                );
              })}
            </g>
          </svg>

          <div className="relative z-10">
            <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em]" style={{ color: "#E7F0E4" }}>
              Patient dashboard
            </p>
            <h1 className="font-display mt-2 text-3xl md:text-[2.3rem]" style={{ color: "#FBF6EC" }}>
              Welcome{data.user ? `, ${data.user.name}` : ""}
            </h1>
            <p className="mt-2 max-w-md text-[14px] leading-relaxed" style={{ color: "#E7F0E4" }}>
              Your consultations, reports and prescriptions, gathered in one calm place.
            </p>

            <Link href="/patient/book-appointment">
              <Button
                className="font-body mt-6 rounded-full px-6 py-5 text-[14px] font-semibold"
                style={{ background: "#FBF6EC", color: "#3F5744" }}
              >
                + Book appointment
              </Button>
            </Link>
          </div>
        </div>

        {/* Stat cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Appointments" value={data.appointments.length} icon="calendar" accent="#6B8F71" tint="#EAF1E7" />
          <StatCard label="Reports" value={data.reports.length} icon="document" accent="#3E6E8E" tint="#E7EEF3" />
          <StatCard label="Prescriptions" value={data.prescriptions.length} icon="leaf" accent="#D97B4F" tint="#FBEAE0" />
          <StatCard label="Upcoming" value={upcoming.length} icon="clock" accent="#C6902B" tint="#F8EFDD" />
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Left column — appointment cards */}
          <section>
            <div className="mb-4 flex h-9 items-center justify-between">
              <h2 className="font-display text-xl" style={{ color: "#3F5744" }}>
                Recent appointments
              </h2>
              <Link
                href="/patient/appointments"
                className="font-body text-[13px] font-semibold"
                style={{ color: "#D97B4F" }}
              >
                View all →
              </Link>
            </div>

            {data.appointments.length ? (
              <div className="space-y-3">
                {data.appointments.slice(0, 5).map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4 shadow-[0_1px_3px_rgba(43,38,32,0.06)]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-[15px] font-semibold"
                        style={{ background: "#EAF1E7", color: "#3F5744" }}
                      >
                        {(a.doctorName || "Dr. Princy")
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="font-body truncate text-[14px] font-semibold">
                          {a.doctorName || "Dr. Princy"}
                        </p>
                        <p className="font-body text-[12px]" style={{ color: "#8A8171" }}>
                          {a.date ? new Date(a.date).toLocaleDateString() : "—"}
                          {a.time ? ` · ${a.time}` : ""}
                        </p>
                      </div>
                    </div>

                    <span
                      className="font-body shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
                      style={{
                        background: a.status === "SCHEDULED" ? "#F8EFDD" : "#F1EEE6",
                        color: a.status === "SCHEDULED" ? "#8C6412" : "#5B5347",
                      }}
                    >
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-white px-5 py-10 text-center text-sm shadow-[0_1px_3px_rgba(43,38,32,0.06)]" style={{ color: "#8A8171" }}>
                No appointments yet — your record starts when you book one.
              </div>
            )}
          </section>

          {/* Right column — next visit + quick access */}
          <div className="space-y-6">
            <div>
              <div className="mb-4 flex h-9 items-center">
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#8A8171" }}>
                  Next visit
                </p>
              </div>

              {nextVisit ? (
                <div
                  className="relative overflow-hidden rounded-2xl px-6 py-6"
                  style={{ background: "#3F5744" }}
                >
                  <svg
                    className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 opacity-20"
                    viewBox="0 0 100 100"
                    aria-hidden="true"
                  >
                    <circle cx="50" cy="50" r="49" fill="none" stroke="#FBF6EC" strokeWidth="1.5" />
                    <circle cx="50" cy="50" r="34" fill="none" stroke="#FBF6EC" strokeWidth="1" />
                  </svg>

                  <p className="font-display relative z-10 text-lg" style={{ color: "#FBF6EC" }}>
                    {nextVisit.doctorName || "Dr. Princy"}
                  </p>
                  <p className="font-body relative z-10 mt-1 text-[13px]" style={{ color: "#CFE0D0" }}>
                    {new Date(nextVisit.date).toLocaleDateString(undefined, {
                      weekday: "long",
                      day: "numeric",
                      month: "short",
                    })}
                    {nextVisit.time ? ` · ${nextVisit.time}` : ""}
                  </p>
                </div>
              ) : (
                <div
                  className="rounded-2xl border border-dashed px-5 py-8 text-center text-sm"
                  style={{ borderColor: "rgba(63,87,68,0.3)", color: "#8A8171" }}
                >
                  No upcoming visit booked.
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Quick access — full width row */}
        <div className="mt-8 rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(43,38,32,0.06)] md:p-6">
          <p className="font-display mb-4 text-base" style={{ color: "#3F5744" }}>
            Quick access
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <QuickLink href="/patient/prescriptions" label="Prescriptions" icon="pill" accent="#D97B4F" tint="#FBEAE0" />
            <QuickLink href="/patient/reports" label="Reports" icon="document" accent="#3E6E8E" tint="#E7EEF3" />
            <QuickLink href="/patient/appointments" label="Appointments" icon="calendar" accent="#6B8F71" tint="#EAF1E7" />
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, accent, tint }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(43,38,32,0.06)]">
      <div
        className="mb-3 flex h-9 w-9 items-center justify-center rounded-full"
        style={{ background: tint }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
      </div>
      <p className="font-display text-2xl" style={{ color: "#2B2620" }}>
        {value}
      </p>
      <p className="font-body mt-0.5 text-[12px] font-medium" style={{ color: "#8A8171" }}>
        {label}
      </p>
    </div>
  );
}

function QuickLink({ href, label, icon, accent, tint }) {
  const icons = {
    pill: (
      <path d="M4.5 13.5 13.5 4.5a4.5 4.5 0 1 1 6 6l-9 9a4.5 4.5 0 1 1-6-6Z M8 10l6 6" />
    ),
    document: (
      <path d="M6 2.5h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z M14 2.5v4h4 M8.5 12h7 M8.5 15.5h7" />
    ),
    calendar: (
      <path d="M4 6.5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-13Z M4 10.5h16 M8 3v4 M16 3v4" />
    ),
  };

  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border px-4 py-4 transition-colors hover:bg-[#FBF6EC]"
      style={{ borderColor: "rgba(43,38,32,0.08)" }}
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
        style={{ background: tint }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {icons[icon]}
        </svg>
      </span>

      <span className="font-body flex-1 text-[14px] font-medium" style={{ color: "#2B2620" }}>
        {label}
      </span>

      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 text-[#B8AF9E] transition-transform group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
    </Link>
  );
}