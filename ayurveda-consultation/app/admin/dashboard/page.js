// // "use client";

// // import { useEffect, useState } from "react";
// // import Link from "next/link";
// // import AdminSidebar from "@/components/AdminSidebar";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";

// // export default function AdminDashboard() {
// //   const [stats, setStats] = useState({ patients: 0, appointments: 0, upcoming: 0, prescriptions: 0 });

// //   useEffect(() => {
// //     fetch("/api/admin/dashboard").then(r => r.json()).then(setStats).catch(() => {});
// //   }, []);

// //   return (
// //     <div className="md:flex">
// //       <AdminSidebar />
// //       <main className="min-w-0 flex-1 p-5 md:p-8">
// //         <div className="mb-8">
// //           <p className="text-sm font-medium text-primary">DOCTOR / ADMIN</p>
// //           <h1 className="text-3xl font-bold">Dashboard</h1>
// //           <p className="text-muted-foreground">Manage patients, appointments and prescriptions.</p>
// //         </div>

// //         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
// //           <Stat title="Patients" value={stats.patients} />
// //           <Stat title="Appointments" value={stats.appointments} />
// //           <Stat title="Upcoming" value={stats.upcoming} />
// //           <Stat title="Prescriptions" value={stats.prescriptions} />
// //         </div>

// //         <div className="mt-8 grid gap-4 md:grid-cols-3">
// //           <Action href="/admin/patients" title="Manage Patients" text="View patient details and reports." />
// //           <Action href="/admin/appointments" title="Appointments" text="View appointments and add Zoom links." />
// //           <Action href="/admin/prescriptions" title="Prescriptions" text="Create and generate patient prescriptions." />
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// // function Stat({ title, value }) {
// //   return <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">{title}</p><p className="mt-1 text-3xl font-bold">{value}</p></CardContent></Card>;
// // }
// // function Action({ href, title, text }) {
// //   return <Card><CardContent className="p-6"><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{text}</p><Link href={href} className="mt-4 inline-block"><Button variant="outline">Open</Button></Link></CardContent></Card>;
// // }




// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import AdminSidebar from "@/components/AdminSidebar";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Users, Calendar, Clock, FileText, Leaf, ArrowRight } from "lucide-react";

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({ patients: 0, appointments: 0, upcoming: 0, prescriptions: 0 });

//   useEffect(() => {
//     fetch("/api/admin/dashboard").then(r => r.json()).then(setStats).catch(() => {});
//   }, []);

//   return (
//     <div className="md:flex min-h-screen bg-[#f7f3e9]">
//       <AdminSidebar />
//       <main className="min-w-0 flex-1 p-5 md:p-8">
//         <div className="mb-8">
//           <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
//             <Leaf className="h-3.5 w-3.5" />
//             Doctor / Admin
//           </p>
//           <h1 className="mt-2 font-serif text-3xl font-bold text-stone-800">Dashboard</h1>
//           <p className="mt-1 text-stone-500">Manage patients, appointments and prescriptions.</p>
//         </div>

//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           <Stat icon={Users} title="Patients" value={stats.patients} />
//           <Stat icon={Calendar} title="Appointments" value={stats.appointments} />
//           <Stat icon={Clock} title="Upcoming" value={stats.upcoming} />
//           <Stat icon={FileText} title="Prescriptions" value={stats.prescriptions} />
//         </div>

//         <div className="mt-8 grid gap-4 md:grid-cols-3">
//           <Action
//             href="/admin/patients"
//             title="Manage Patients"
//             text="View patient details and reports."
//           />
//           <Action
//             href="/admin/appointments"
//             title="Appointments"
//             text="View appointments and add Zoom links."
//           />
//           <Action
//             href="/admin/prescriptions"
//             title="Prescriptions"
//             text="Create and generate patient prescriptions."
//           />
//         </div>
//       </main>
//     </div>
//   );
// }

// function Stat({ icon: Icon, title, value }) {
//   return (
//     <Card className="border-emerald-900/10 bg-white/80 shadow-sm">
//       <CardContent className="flex items-center gap-4 p-5">
//         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
//           <Icon className="h-5 w-5" />
//         </div>
//         <div>
//           <p className="text-sm text-stone-500">{title}</p>
//           <p className="mt-0.5 text-3xl font-bold text-stone-800">{value}</p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function Action({ href, title, text }) {
//   return (
//     <Card className="group border-emerald-900/10 bg-white/80 shadow-sm transition-shadow hover:shadow-md">
//       <CardContent className="p-6">
//         <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-600">
//           <Leaf className="h-4 w-4" />
//         </div>
//         <h3 className="font-serif text-lg font-semibold text-stone-800">{title}</h3>
//         <p className="mt-2 text-sm text-stone-500">{text}</p>
//         <Link href={href} className="mt-4 inline-block">
//           <Button
//             variant="outline"
//             className="gap-2 rounded-full border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white"
//           >
//             Open
//             <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
//           </Button>
//         </Link>
//       </CardContent>
//     </Card>
//   );
// }










"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Clock, FileText, Leaf, ArrowRight, Sparkles } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ patients: 0, appointments: 0, upcoming: 0, prescriptions: 0 });

  useEffect(() => {
    fetch("/api/admin/dashboard").then(r => r.json()).then(setStats).catch(() => {});
  }, []);

  return (
    <div className="md:flex min-h-screen bg-[#f7f3e9]">
      <AdminSidebar />

      <main className="min-w-0 flex-1 p-5 pt-28 md:p-8 md:pt-28">
        {/* Welcome banner */}
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-700 p-6 text-white shadow-md md:p-8">
          <Leaf className="absolute -right-4 -top-4 h-32 w-32 rotate-12 text-white/10" />
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-200">
            <Sparkles className="h-3.5 w-3.5" />
            Doctor / Admin
          </p>
          <h1 className="relative mt-2 font-serif text-3xl font-bold md:text-4xl">Namaste, Doctor</h1>
          <p className="relative mt-2 max-w-xl text-emerald-100">
            Manage patients, appointments and prescriptions — all rooted in the balance of Ayurveda.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={Users} title="Patients" value={stats.patients} />
          <Stat icon={Calendar} title="Appointments" value={stats.appointments} />
          <Stat icon={Clock} title="Upcoming" value={stats.upcoming} />
          <Stat icon={FileText} title="Prescriptions" value={stats.prescriptions} />
        </div>

        {/* Quick actions */}
        <div className="mt-10">
          <h2 className="mb-4 font-serif text-xl font-semibold text-stone-800">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Action
              href="/admin/patients"
              title="Manage Patients"
              text="View patient details and reports."
            />
            <Action
              href="/admin/appointments"
              title="Appointments"
              text="View appointments and add Zoom links."
            />
            <Action
              href="/admin/prescriptions"
              title="Prescriptions"
              text="Create and generate patient prescriptions."
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function Stat({ icon: Icon, title, value }) {
  return (
    <Card className="border-emerald-900/10 bg-white/80 shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-stone-500">{title}</p>
          <p className="mt-0.5 text-3xl font-bold text-stone-800">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Action({ href, title, text }) {
  return (
    <Card className="group border-emerald-900/10 bg-white/80 shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-600">
          <Leaf className="h-4 w-4" />
        </div>
        <h3 className="font-serif text-lg font-semibold text-stone-800">{title}</h3>
        <p className="mt-2 text-sm text-stone-500">{text}</p>
        <Link href={href} className="mt-4 inline-block">
          <Button
            variant="outline"
            className="gap-2 rounded-full border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white"
          >
            Open
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}