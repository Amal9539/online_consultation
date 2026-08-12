// "use client";

// import { useEffect, useState } from "react";
// import AdminSidebar from "@/components/AdminSidebar";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function AdminAppointments() {
//   const [appointments, setAppointments] = useState([]);
//   const [links, setLinks] = useState({});
//   const [message, setMessage] = useState("");

//   async function load() {
//     const res = await fetch("/api/appointments");
//     const data = await res.json();
//     setAppointments(data.appointments || []);
//   }

//   useEffect(() => { load(); }, []);

//   async function save(id) {
//     const res = await fetch(`/api/appointments/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ zoomLink: links[id] || "" })
//     });
//     const data = await res.json();
//     setMessage(res.ok ? "Zoom link saved." : data.message || "Update failed.");
//     load();
//   }

//   return (
//     <div className="md:flex">
//       <AdminSidebar />
//       <main className="min-w-0 flex-1 p-5 md:p-8">
//         <div className="mb-8"><h1 className="text-3xl font-bold">Appointments</h1><p className="text-muted-foreground">View appointments and add the Zoom consultation link.</p></div>
//         {message && <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700">{message}</div>}
//         <div className="grid gap-4">
//           {appointments.map(a => (
//             <Card key={a.id}>
//               <CardContent className="grid gap-5 p-5 lg:grid-cols-2">
//                 <div>
//                   <p className="text-sm text-primary">Patient</p>
//                   <h3 className="text-xl font-semibold">{a.patient.name}</h3>
//                   <p className="mt-2 text-sm text-muted-foreground">{a.patient.email}</p>
//                   <p className="mt-2 text-sm">{a.consultationType}</p>
//                   <p className="text-sm">{new Date(a.date).toLocaleDateString()} · {a.time}</p>
//                   <p className="mt-2 text-sm text-muted-foreground">{a.reason || "No reason provided."}</p>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="space-y-2"><Label>Zoom Meeting Link</Label><Input value={links[a.id] ?? a.zoomLink ?? ""} onChange={e => setLinks({...links, [a.id]: e.target.value})} placeholder="https://zoom.us/..." /></div>
//                   <Button onClick={() => save(a.id)}>Save Zoom Link</Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//           {!appointments.length && <p className="text-muted-foreground">No appointments found.</p>}
//         </div>
//       </main>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Mail, Video, Leaf, CheckCircle2 } from "lucide-react";

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
    <div className="md:flex min-h-screen bg-[#f7f3e9]">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-5 pt-28 md:p-8 md:pt-28">
        <div className="mb-8">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
            <Leaf className="h-3.5 w-3.5" />
            Consultation Schedule
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-stone-800">Appointments</h1>
          <p className="mt-1 text-stone-500">View appointments and add the Zoom consultation link.</p>
        </div>

        {message && (
          <div className="mb-6 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            {message}
          </div>
        )}

        <div className="grid gap-4">
          {appointments.map((a) => (
            <Card key={a.id} className="border-emerald-900/10 bg-white/80 shadow-sm">
              <CardContent className="grid gap-6 p-6 lg:grid-cols-2">
                {/* Patient info */}
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-700 to-emerald-800 font-serif text-sm font-semibold text-white">
                      {getInitials(a.patient.name)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Patient</p>
                      <h3 className="font-serif text-lg font-semibold text-stone-800">{a.patient.name}</h3>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-stone-600">
                    <p className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                      {a.patient.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Video className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                      {a.consultationType}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                      {new Date(a.date).toLocaleDateString()}
                      <Clock className="ml-2 h-3.5 w-3.5 shrink-0 text-stone-400" />
                      {a.time}
                    </p>
                  </div>

                  <div className="mt-4 rounded-xl border border-dashed border-stone-300 bg-white/50 p-3 text-sm text-stone-500">
                    {a.reason || "No reason provided."}
                  </div>
                </div>

                {/* Zoom link section */}
                <div className="flex flex-col justify-center space-y-3 rounded-2xl bg-emerald-50/50 p-5">
                  <Label className="flex items-center gap-1.5 text-stone-700">
                    <Video className="h-3.5 w-3.5 text-emerald-700" />
                    Zoom Meeting Link
                  </Label>
                  <Input
                    value={links[a.id] ?? a.zoomLink ?? ""}
                    onChange={(e) => setLinks({ ...links, [a.id]: e.target.value })}
                    placeholder="https://zoom.us/..."
                    className="rounded-full border-stone-300 bg-white focus-visible:ring-emerald-700"
                  />
                  <Button
                    onClick={() => save(a.id)}
                    className="rounded-full bg-emerald-700 hover:bg-emerald-800"
                  >
                    Save Zoom Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {!appointments.length && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-stone-300 bg-white/50 p-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <Calendar className="h-6 w-6" />
              </div>
              <p className="font-serif text-lg text-stone-700">No appointments found</p>
              <p className="text-sm text-stone-500">Scheduled consultations will appear here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}