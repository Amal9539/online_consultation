// "use client";

// import { useEffect, useState } from "react";
// import PatientSidebar from "@/components/PatientSidebar";
// import PrescriptionCard from "@/components/PrescriptionCard";

// export default function PrescriptionsPage() {
//   const [prescriptions, setPrescriptions] = useState([]);

//   useEffect(() => {
//     fetch("/api/prescriptions").then(r => r.json()).then(d => setPrescriptions(d.prescriptions || []));
//   }, []);

//   return (
//     <div className="md:flex">
//       <PatientSidebar />
//       <main className="min-w-0 flex-1 p-5 md:p-8">
//         <div className="mb-8"><h1 className="text-3xl font-bold">My Prescriptions</h1><p className="text-muted-foreground">View and download your digital prescriptions.</p></div>
//         <div className="grid gap-4">{prescriptions.map(p => <PrescriptionCard key={p.id} prescription={p} />)}</div>
//         {!prescriptions.length && <p className="text-muted-foreground">No prescriptions available yet.</p>}
//       </main>
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import PatientSidebar from "@/components/PatientSidebar";
import PrescriptionCard from "@/components/PrescriptionCard";
import { ScrollText, PillBottle } from "lucide-react";

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetch("/api/prescriptions").then(r => r.json()).then(d => setPrescriptions(d.prescriptions || []));
  }, []);

  return (
    <div className="md:flex" style={{ background: "#FBF6EC" }}>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap");
        .font-display { font-family: "Fraunces", serif; }
        .font-body { font-family: "Inter", sans-serif; }
      `}</style>

      <PatientSidebar />

      <main className="min-w-0 flex-1 p-5 font-body md:p-10" style={{ color: "#2B2620", marginTop: "60px" }}>
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="font-body text-[20px] font-semibold uppercase tracking-[0.25em]" style={{ color: "#B15A34" }}>
            Ayurveda Consultation
          </p>
          <h1 className="font-display mt-1 text-3xl md:text-[2.1rem]" style={{ color: "#3F5744" }}>
            My prescriptions
          </h1>
          <p className="mt-2 text-[14px]" style={{ color: "#8A8171" }}>
            View and download your digital prescriptions.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="mb-4 flex items-center gap-2">
            <ScrollText size={18} strokeWidth={1.75} style={{ color: "#3F5744" }} />
            <h2 className="font-display text-xl font-normal" style={{ color: "#3F5744" }}>
              Your prescriptions
            </h2>
          </div>

          {prescriptions.length === 0 ? (
            <div
              className="flex flex-col items-center gap-3 rounded-2xl border px-6 py-12 text-center"
              style={{ borderColor: "rgba(43,38,32,0.1)", background: "#FFFDF8" }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: "rgba(107,143,113,0.12)" }}
              >
                <PillBottle size={22} strokeWidth={1.75} style={{ color: "#6B8F71" }} />
              </div>
              <p className="font-body text-[14px]" style={{ color: "#8A8171" }}>
                No prescriptions available yet. Your practitioner's prescriptions will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {prescriptions.map((p) => (
                <div
                  key={p.id}
                  className="overflow-hidden rounded-2xl border-0 shadow-[0_1px_3px_rgba(43,38,32,0.06)]"
                  style={{ background: "#FFFDF8" }}
                >
                  <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #6B8F71, #E3A857, #D97B4F)" }} />
                  <div className="p-1">
                    <PrescriptionCard prescription={p} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}