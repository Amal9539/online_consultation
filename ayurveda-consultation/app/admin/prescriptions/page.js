// "use client";

// import { useEffect, useState } from "react";
// import AdminSidebar from "@/components/AdminSidebar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select } from "@/components/ui/select";

// export default function AdminPrescriptionsPage() {
//   const [patients, setPatients] = useState([]);
//   const [form, setForm] = useState({ patientId: "", diagnosis: "", medicines: "", diet: "", instructions: "" });
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetch("/api/patients").then(r => r.json()).then(d => setPatients(d.patients || []));
//   }, []);

//   async function submit(e) {
//     e.preventDefault();
//     setMessage("");
//     const res = await fetch("/api/prescriptions", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form)
//     });
//     const data = await res.json();
//     if (!res.ok) { setMessage(data.message || "Failed."); return; }
//     setMessage("Prescription generated successfully. The PDF is now available to the patient.");
//     setForm({ patientId: "", diagnosis: "", medicines: "", diet: "", instructions: "" });
//   }

//   return (
//     <div className="md:flex">
//       <AdminSidebar />
//       <main className="min-w-0 flex-1 p-5 md:p-8">
//         <div className="mb-8"><h1 className="text-3xl font-bold">Prescriptions</h1><p className="text-muted-foreground">Generate digital prescriptions as PDF.</p></div>
//         <Card className="max-w-3xl">
//           <CardHeader><CardTitle>Create Prescription</CardTitle></CardHeader>
//           <CardContent>
//             <form onSubmit={submit} className="grid gap-5">
//               <div className="space-y-2"><Label>Patient</Label><Select value={form.patientId} onChange={e => setForm({...form, patientId: e.target.value})} required><option value="">Select patient</option>{patients.map(p => <option key={p.id} value={p.id}>{p.name} — {p.email}</option>)}</Select></div>
//               <div className="space-y-2"><Label>Diagnosis</Label><Textarea value={form.diagnosis} onChange={e => setForm({...form, diagnosis: e.target.value})} /></div>
//               <div className="space-y-2"><Label>Medicines / Treatment</Label><Textarea value={form.medicines} onChange={e => setForm({...form, medicines: e.target.value})} required placeholder="Medicine name, dosage and duration" /></div>
//               <div className="space-y-2"><Label>Diet / Pathya-Apathya</Label><Textarea value={form.diet} onChange={e => setForm({...form, diet: e.target.value})} placeholder="Foods to include and avoid (e.g. Avoid: cold, oily, spicy food. Include: warm, light, freshly cooked meals)" /></div>
//               <div className="space-y-2"><Label>Instructions</Label><Textarea value={form.instructions} onChange={e => setForm({...form, instructions: e.target.value})} /></div>
//               <Button>Generate Prescription PDF</Button>
//               {message && <p className="text-sm text-muted-foreground">{message}</p>}
//             </form>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Leaf, CheckCircle2, AlertCircle, Loader2, Sprout } from "lucide-react";

export default function AdminPrescriptionsPage() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ patientId: "", diagnosis: "", medicines: "", diet: "", instructions: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/patients").then((r) => r.json()).then((d) => setPatients(d.patients || []));
  }, []);

  async function submit(e) {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSaving(true);
    const res = await fetch("/api/prescriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setError(true);
      setMessage(data.message || "Failed.");
      return;
    }
    setMessage("Prescription generated successfully. The PDF is now available to the patient.");
    setForm({ patientId: "", diagnosis: "", medicines: "", diet: "", instructions: "" });
  }

  return (
    <div className="md:flex min-h-screen bg-[#f2ece0]">
      <AdminSidebar />
      <main className="flex min-w-0 flex-1 justify-center p-5 pt-28 md:p-8 md:pt-28">
        <div className="w-full max-w-4xl">
          {/* Prescription pad document */}
          <div className="overflow-hidden rounded-[2rem] border border-stone-300/60 bg-[#fdfaf3] shadow-xl">
            {/* Header stamp */}
            <div className="relative border-b-2 border-dashed border-emerald-700/30 bg-emerald-800 px-8 py-6 text-center text-white">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                <Leaf className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                Ayurveda Consultation
              </p>
              <h1 className="mt-1 font-serif text-2xl font-bold">Create Prescription</h1>
              <p className="mt-1 text-sm text-emerald-100">Generate a digital prescription as PDF</p>
            </div>

            {/* Form body */}
            <form onSubmit={submit} className="space-y-7 px-8 py-8 md:px-12">
              {/* Patient - full width */}
              <div>
                <label className="mb-2 block font-serif text-sm font-semibold text-stone-700">
                  Patient <span className="ml-1 text-orange-600">*</span>
                </label>
                <Select
                  value={form.patientId}
                  onChange={(e) => setForm({ ...form, patientId: e.target.value })}
                  required
                  className="rounded-xl border-stone-300 bg-white focus-visible:ring-emerald-700"
                >
                  <option value="">Select patient</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.email}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Row 1: Diagnosis + Medicines */}
              <div className="grid gap-7 md:grid-cols-2">
                <Field
                  label="Diagnosis"
                  value={form.diagnosis}
                  onChange={(v) => setForm({ ...form, diagnosis: v })}
                  placeholder="e.g. Vata-Pitta imbalance"
                />
                <Field
                  label="Medicines / Treatment"
                  value={form.medicines}
                  onChange={(v) => setForm({ ...form, medicines: v })}
                  placeholder="Medicine name, dosage and duration"
                  required
                />
              </div>

              {/* Row 2: Diet + Instructions */}
              <div className="grid gap-7 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-1.5 font-serif text-sm font-semibold text-stone-700">
                    <Sprout className="h-3.5 w-3.5 text-emerald-700" />
                    Diet / Pathya-Apathya
                  </label>
                  <Textarea
                    value={form.diet}
                    onChange={(e) => setForm({ ...form, diet: e.target.value })}
                    placeholder="Foods to include and avoid (e.g. Avoid: cold, oily, spicy food. Include: warm, light, freshly cooked meals)"
                    className="min-h-[110px] resize-none rounded-xl border-0 border-b-2 border-stone-300 bg-transparent px-0 shadow-none focus-visible:border-emerald-700 focus-visible:ring-0"
                  />
                </div>
                <Field
                  label="Instructions"
                  value={form.instructions}
                  onChange={(v) => setForm({ ...form, instructions: v })}
                  placeholder="General care instructions"
                  minHeight="min-h-[110px]"
                />
              </div>

              <div className="border-t border-dashed border-stone-300 pt-6">
                <Button
                  disabled={saving}
                  className="w-full rounded-full bg-emerald-700 py-6 text-base hover:bg-emerald-800 disabled:opacity-60"
                >
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </span>
                  ) : (
                    "Generate Prescription PDF"
                  )}
                </Button>

                {message && (
                  <div
                    className={`mt-4 flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-center text-sm ${
                      error
                        ? "border-red-200 bg-red-50 text-red-700"
                        : "border-emerald-200 bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {error ? (
                      <AlertCircle className="h-4 w-4 shrink-0" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                    )}
                    {message}
                  </div>
                )}
              </div>
            </form>
          </div>

          <p className="mt-4 text-center text-xs text-stone-400">
            Rooted in tradition · Personalized for your constitution
          </p>
        </div>
      </main>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, required, minHeight = "min-h-[90px]" }) {
  return (
    <div>
      <label className="mb-2 block font-serif text-sm font-semibold text-stone-700">
        {label}
        {required && <span className="ml-1 text-orange-600">*</span>}
      </label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`${minHeight} resize-none rounded-xl border-0 border-b-2 border-stone-300 bg-transparent px-0 shadow-none focus-visible:border-emerald-700 focus-visible:ring-0`}
      />
    </div>
  );
}