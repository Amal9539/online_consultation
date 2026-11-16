"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("/api/patients").then(r => r.json()).then(d => setPatients(d.patients || []));
  }, []);

  return (
    <div className="md:flex">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-5 md:p-8">
        <div className="mb-8"><h1 className="text-3xl font-bold">Patients</h1><p className="text-muted-foreground">View registered patients and their records.</p></div>
        <Card><CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
            <TableBody>
              {patients.map(p => <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>{p.email}</TableCell>
                <TableCell>{p.phone || "-"}</TableCell>
                <TableCell><Link href={`/admin/patients/${p.id}`}><Button size="sm" variant="outline">View</Button></Link></TableCell>
              </TableRow>)}
            </TableBody>
          </Table>
          {!patients.length && <p className="p-6 text-sm text-muted-foreground">No patients found.</p>}
        </CardContent></Card>
      </main>
    </div>
  );
}
