"use client";

import { useEffect, useState } from "react";
import PrescriptionCard from "@/components/PrescriptionCard";

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetch("/api/prescriptions").then(r => r.json()).then(d => setPrescriptions(d.prescriptions || []));
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f6f9f4] w-full">
      <main className="p-5 md:p-8 w-full max-w-7xl xl:max-w-[1650px] mx-auto space-y-6">
        <div className="mb-8"><h1 className="text-3xl font-bold">My Prescriptions</h1><p className="text-muted-foreground">View and download your digital prescriptions.</p></div>
        <div className="grid gap-4">{prescriptions.map(p => <PrescriptionCard key={p.id} prescription={p} />)}</div>
        {!prescriptions.length && <p className="text-muted-foreground">No prescriptions available yet.</p>}
      </main>
    </div>
  );
}
