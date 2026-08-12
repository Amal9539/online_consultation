// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import AdminSidebar from "@/components/AdminSidebar";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// export default function AdminPatientsPage() {
//   const [patients, setPatients] = useState([]);

//   useEffect(() => {
//     fetch("/api/patients").then(r => r.json()).then(d => setPatients(d.patients || []));
//   }, []);

//   return (
//     <div className="md:flex">
//       <AdminSidebar />
//       <main className="min-w-0 flex-1 p-5 md:p-8">
//         <div className="mb-8"><h1 className="text-3xl font-bold">Patients</h1><p className="text-muted-foreground">View registered patients and their records.</p></div>
//         <Card><CardContent className="p-0">
//           <Table>
//             <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
//             <TableBody>
//               {patients.map(p => <TableRow key={p.id}>
//                 <TableCell className="font-medium">{p.name}</TableCell>
//                 <TableCell>{p.email}</TableCell>
//                 <TableCell>{p.phone || "-"}</TableCell>
//                 <TableCell><Link href={`/admin/patients/${p.id}`}><Button size="sm" variant="outline">View</Button></Link></TableCell>
//               </TableRow>)}
//             </TableBody>
//           </Table>
//           {!patients.length && <p className="p-6 text-sm text-muted-foreground">No patients found.</p>}
//         </CardContent></Card>
//       </main>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Mail, Phone, Search, ArrowRight, Leaf } from "lucide-react";

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/patients").then(r => r.json()).then(d => setPatients(d.patients || []));
  }, []);

  const filtered = patients.filter((p) =>
    [p.name, p.email, p.phone].join(" ").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="md:flex min-h-screen bg-[#f7f3e9]">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-5 pt-28 md:p-8 md:pt-28">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-orange-700">
              <Leaf className="h-3.5 w-3.5" />
              Patient Records
            </p>
            <h1 className="mt-2 font-serif text-3xl font-bold text-stone-800">Patients</h1>
            <p className="mt-1 text-stone-500">
              {filtered.length} {filtered.length === 1 ? "patient" : "patients"} registered
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search patients..."
              className="rounded-full border-stone-300 bg-white pl-10 focus-visible:ring-emerald-700"
            />
          </div>
        </div>

        {/* Patient list */}
        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((p) => (
              <Link key={p.id} href={`/admin/patients/${p.id}`}>
                <div className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white/70 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-700/30 hover:shadow-md md:p-5">
                  {/* Initials avatar */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-700 to-emerald-800 font-serif text-lg font-semibold text-white">
                    {getInitials(p.name)}
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-base font-semibold text-stone-800">
                      {p.name}
                    </p>
                    <div className="mt-1 flex flex-col gap-1 text-sm text-stone-500 sm:flex-row sm:items-center sm:gap-4">
                      <span className="flex items-center gap-1.5 truncate">
                        <Mail className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                        <span className="truncate">{p.email}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                        {p.phone || "Not provided"}
                      </span>
                    </div>
                  </div>

                  {/* View affordance */}
                  <div className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-emerald-700 sm:flex">
                    View file
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="shrink-0 rounded-full border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white sm:hidden"
                  >
                    View
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-stone-300 bg-white/50 p-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <Users className="h-6 w-6" />
            </div>
            <p className="font-serif text-lg text-stone-700">
              {query ? "No matching patients" : "No patients found"}
            </p>
            <p className="text-sm text-stone-500">
              {query ? "Try a different name, email, or phone number." : "Registered patients will appear here."}
            </p>
          </div>
        )}
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