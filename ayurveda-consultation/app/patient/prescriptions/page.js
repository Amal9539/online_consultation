"use client";

import { useEffect, useState } from "react";
import PatientSidebar from "@/components/PatientSidebar";
import PrescriptionCard from "@/components/PrescriptionCard";

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetch("/api/prescriptions").then(r => r.json()).then(d => setPrescriptions(d.prescriptions || []));
  }, []);

  return (
    <div className="md:flex">
      <PatientSidebar />
      <main className="min-w-0 flex-1 p-5 md:p-8">
        <div className="mb-8"><h1 className="text-3xl font-bold">My Prescriptions</h1><p className="text-muted-foreground">View and download your digital prescriptions.</p></div>
        <div className="grid gap-4">{prescriptions.map(p => <PrescriptionCard key={p.id} prescription={p} />)}</div>
        {!prescriptions.length && <p className="text-muted-foreground">No prescriptions available yet.</p>}
      </main>
    </div>
  );
}
