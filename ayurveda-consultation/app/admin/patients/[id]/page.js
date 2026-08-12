// import { prisma } from "@/lib/prisma";
// import { getCurrentUser } from "@/lib/auth";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import AdminSidebar from "@/components/AdminSidebar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default async function PatientDetailPage({ params }) {
//   const user = await getCurrentUser({ cookies: cookies() });

//   if (!user || user.role !== "ADMIN") {
//     redirect("/login");
//   }

//   const id = Number(params.id);

//   const patient = await prisma.user.findFirst({
//     where: { id, role: "PATIENT" },
//     select: {
//       id: true, name: true, email: true, phone: true, age: true, gender: true, address: true, createdAt: true,
//       reports: { orderBy: { createdAt: "desc" } },
//       appointments: { orderBy: { date: "desc" }, include: { patient: { select: { id: true, name: true, email: true } } } },
//       prescriptions: { orderBy: { createdAt: "desc" }, select: { id: true, diagnosis: true, medicines: true, instructions: true, pdfPath: true, createdAt: true } },
//     },
//   });

//   if (!patient) {
//     return (
//       <div className="md:flex">
//         <AdminSidebar />
//         <main className="min-w-0 flex-1 p-5 md:p-8">
//           <p className="text-sm text-muted-foreground">Patient not found.</p>
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div className="md:flex">
//       <AdminSidebar />
//       <main className="min-w-0 flex-1 p-5 md:p-8 space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold">{patient.name}</h1>
//           <p className="text-muted-foreground">{patient.email}</p>
//         </div>

//         <Card>
//           <CardHeader><CardTitle>Patient Info</CardTitle></CardHeader>
//           <CardContent className="text-sm space-y-1">
//             <p><strong>Phone:</strong> {patient.phone || "-"}</p>
//             <p><strong>Age:</strong> {patient.age || "-"}</p>
//             <p><strong>Gender:</strong> {patient.gender || "-"}</p>
//             <p><strong>Address:</strong> {patient.address || "-"}</p>
//             <p><strong>Registered:</strong> {new Date(patient.createdAt).toLocaleDateString()}</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader><CardTitle>Appointments ({patient.appointments.length})</CardTitle></CardHeader>
//           <CardContent className="space-y-2">
//             {patient.appointments.length === 0 && <p className="text-sm text-muted-foreground">No appointments.</p>}
//             {patient.appointments.map(a => (
//               <div key={a.id} className="text-sm border-b pb-2">
//                 {new Date(a.date).toLocaleString()} — {a.status || "scheduled"}
//               </div>
//             ))}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader><CardTitle>Prescriptions ({patient.prescriptions.length})</CardTitle></CardHeader>
//           <CardContent className="space-y-2">
//             {patient.prescriptions.length === 0 && <p className="text-sm text-muted-foreground">No prescriptions.</p>}
//             {patient.prescriptions.map(p => (
//               <div key={p.id} className="text-sm border-b pb-2">
//                 <div className="flex items-center justify-between">
//                   <p><strong>{p.diagnosis}</strong></p>
//                   <div className="flex gap-3">
//                     <a href={`/api/prescriptions/${p.id}`} target="_blank" rel="noopener noreferrer" className="text-primary underline">
//                       View PDF
//                     </a>
//                     <a href={`/admin/prescriptions/${p.id}/edit`} className="text-primary underline">
//                       Edit
//                     </a>
//                   </div>
//                 </div>
//                 <p>{p.medicines}</p>
//                 <p className="text-muted-foreground">{p.instructions}</p>
//               </div>
//             ))}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader><CardTitle>Reports ({patient.reports.length})</CardTitle></CardHeader>
//           <CardContent className="space-y-2">
//             {patient.reports.length === 0 && <p className="text-sm text-muted-foreground">No reports.</p>}
//             {patient.reports.map(r => (
//               <div key={r.id} className="flex items-center justify-between text-sm border-b pb-2">
//                 <span>{r.name || "Report"} — {new Date(r.createdAt).toLocaleDateString()}</span>
//                 <a href={`/api/reports/${r.id}`} target="_blank" rel="noopener noreferrer" className="text-primary underline">
//                   View
//                 </a>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// }


import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Phone,
  Cake,
  MapPin,
  Calendar,
  FileText,
  ClipboardList,
  Leaf,
  Pencil,
  ExternalLink,
} from "lucide-react";

export default async function PatientDetailPage({ params }) {
  const user = await getCurrentUser({ cookies: cookies() });

  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  const id = Number(params.id);

  const patient = await prisma.user.findFirst({
    where: { id, role: "PATIENT" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      age: true,
      gender: true,
      address: true,
      createdAt: true,
      reports: { orderBy: { createdAt: "desc" } },
      appointments: {
        orderBy: { date: "desc" },
        include: { patient: { select: { id: true, name: true, email: true } } },
      },
      prescriptions: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          diagnosis: true,
          medicines: true,
          instructions: true,
          pdfPath: true,
          createdAt: true,
        },
      },
    },
  });

  if (!patient) {
    return (
      <div className="md:flex min-h-screen bg-[#f7f3e9]">
        <AdminSidebar />
        <main className="min-w-0 flex-1 p-5 pt-28 md:p-8 md:pt-28">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-stone-300 bg-white/50 p-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <User className="h-6 w-6" />
            </div>
            <p className="font-serif text-lg text-stone-700">Patient not found</p>
          </div>
        </main>
      </div>
    );
  }

  const initials = patient.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="md:flex min-h-screen bg-[#f7f3e9]">
      <AdminSidebar />
      <main className="min-w-0 flex-1 space-y-6 p-5 pt-28 md:p-8 md:pt-28">
        {/* Profile header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-700 p-6 text-white shadow-md md:p-8">
          <Leaf className="absolute -right-4 -top-4 h-32 w-32 rotate-12 text-white/10" />
          <div className="relative flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/15 font-serif text-2xl font-semibold backdrop-blur">
              {initials}
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-200">
                Patient Record
              </p>
              <h1 className="mt-1 font-serif text-2xl font-bold md:text-3xl">{patient.name}</h1>
              <p className="mt-0.5 text-emerald-100">{patient.email}</p>
            </div>
          </div>
        </div>

        {/* Patient Info */}
        <Card className="border-emerald-900/10 bg-white/80 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-stone-800">
              <User className="h-4 w-4 text-emerald-700" />
              Patient Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 text-sm sm:grid-cols-2">
              <InfoItem icon={Phone} label="Phone" value={patient.phone || "-"} />
              <InfoItem icon={Cake} label="Age" value={patient.age || "-"} />
              <InfoItem icon={User} label="Gender" value={patient.gender || "-"} />
              <InfoItem icon={MapPin} label="Address" value={patient.address || "-"} />
              <InfoItem
                icon={Calendar}
                label="Registered"
                value={new Date(patient.createdAt).toLocaleDateString()}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appointments */}
        <Card className="border-emerald-900/10 bg-white/80 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-stone-800">
              <Calendar className="h-4 w-4 text-emerald-700" />
              Appointments
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                {patient.appointments.length}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {patient.appointments.length === 0 && <EmptyRow text="No appointments." />}
            {patient.appointments.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between rounded-xl border border-stone-200 bg-white/60 px-4 py-3 text-sm text-stone-700"
              >
                <span>{new Date(a.date).toLocaleString()}</span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium capitalize text-emerald-700">
                  {a.status || "scheduled"}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Prescriptions */}
        <Card className="border-emerald-900/10 bg-white/80 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-stone-800">
              <ClipboardList className="h-4 w-4 text-emerald-700" />
              Prescriptions
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                {patient.prescriptions.length}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {patient.prescriptions.length === 0 && <EmptyRow text="No prescriptions." />}
            {patient.prescriptions.map((p) => (
              <div key={p.id} className="rounded-xl border border-stone-200 bg-white/60 p-4 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-serif font-semibold text-stone-800">{p.diagnosis}</p>
                  <div className="flex shrink-0 gap-3">
                    <a
                      href={`/api/prescriptions/${p.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-emerald-700 hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View PDF
                    </a>
                    <a
                      href={`/admin/prescriptions/${p.id}/edit`}
                      className="flex items-center gap-1 text-orange-700 hover:underline"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </a>
                  </div>
                </div>
                <p className="mt-2 text-stone-600">{p.medicines}</p>
                <p className="mt-1 text-stone-500">{p.instructions}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Reports */}
        <Card className="border-emerald-900/10 bg-white/80 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-stone-800">
              <FileText className="h-4 w-4 text-emerald-700" />
              Reports
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                {patient.reports.length}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {patient.reports.length === 0 && <EmptyRow text="No reports." />}
            {patient.reports.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between rounded-xl border border-stone-200 bg-white/60 px-4 py-3 text-sm text-stone-700"
              >
                <span>
                  {r.name || "Report"} — {new Date(r.createdAt).toLocaleDateString()}
                </span>
                <a
                  href={`/api/reports/${r.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-emerald-700 hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View
                </a>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xs text-stone-500">{label}</p>
        <p className="font-medium text-stone-800">{value}</p>
      </div>
    </div>
  );
}

function EmptyRow({ text }) {
  return (
    <div className="rounded-xl border border-dashed border-stone-300 bg-white/40 px-4 py-6 text-center text-sm text-stone-500">
      {text}
    </div>
  );
}