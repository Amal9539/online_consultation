// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import PatientSidebar from "@/components/PatientSidebar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select } from "@/components/ui/select";

// export default function BookAppointmentPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ date: "", time: "", consultationType: "Online Consultation", reason: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function submit(e) {
//     e.preventDefault();
//     setLoading(true); setError("");
//     try {
//       const res = await fetch("/api/appointments", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form)
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Booking failed");
//       router.push("/patient/appointments");
//     } catch (err) {
//       setError(err.message);
//     } finally { setLoading(false); }
//   }

//   return (
//     <div className="md:flex">
//       <PatientSidebar />
//       <main className="min-w-0 flex-1 p-5 md:p-8">
//         <div className="mb-8"><h1 className="text-3xl font-bold">Book Appointment</h1><p className="text-muted-foreground">Schedule your online Ayurveda consultation.</p></div>
//         <Card className="max-w-2xl">
//           <CardHeader><CardTitle>Appointment Details</CardTitle></CardHeader>
//           <CardContent>
//             {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}
//             <form onSubmit={submit} className="grid gap-5">
//               <div className="space-y-2"><Label>Consultation Type</Label><Select value={form.consultationType} onChange={e => setForm({...form, consultationType: e.target.value})}>
//                 <option>Online Consultation</option><option>Diet Consultation</option><option>Lifestyle Guidance</option><option>Follow-up Consultation</option>
//               </Select></div>
//               <div className="grid gap-5 sm:grid-cols-2">
//                 <div className="space-y-2"><Label>Date</Label><Input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required /></div>
//                 <div className="space-y-2"><Label>Time</Label><Input type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} required /></div>
//               </div>
//               <div className="space-y-2"><Label>Reason</Label><Textarea value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} placeholder="Describe the reason for consultation" /></div>
//               <Button disabled={loading}>{loading ? "Booking..." : "Book Appointment"}</Button>
//             </form>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export default function BookAppointmentPage() {
  const router = useRouter();
  const [form, setForm] = useState({ date: "", time: "", consultationType: "Online Consultation", reason: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");
      router.push("/patient/appointments");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "rounded-xl border px-4 py-2.5 text-[14px] shadow-none focus-visible:ring-2 focus-visible:ring-offset-0";

  return (
    <div className="md:flex" style={{ background: "#FBF6EC" }}>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap");
        .font-display {
          font-family: "Fraunces", serif;
        }
        .font-body {
          font-family: "Inter", sans-serif;
        }
        .ayur-field input,
        .ayur-field select,
        .ayur-field textarea {
          border-color: rgba(43, 38, 32, 0.14) !important;
          background: #fff !important;
        }
        .ayur-field input:focus,
        .ayur-field select:focus,
        .ayur-field textarea:focus {
          border-color: #6b8f71 !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(107, 143, 113, 0.15) !important;
        }
      `}</style>

      <PatientSidebar />

      <main className="min-w-0 flex-1 p-5 font-body md:p-10" style={{ color: "#2B2620" }}>
        <div className="mb-8">
          <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em]" style={{ color: "#B15A34" }}>
            Ayurveda Consultation
          </p>
          <h1 className="font-display mt-1 text-3xl md:text-[2.1rem]" style={{ color: "#3F5744" }}>
            Book appointment
          </h1>
          <p className="mt-2 text-[14px]" style={{ color: "#8A8171" }}>
            Schedule your online Ayurveda consultation with a practitioner matched to your needs.
          </p>
        </div>

        <Card className="max-w-2xl overflow-hidden rounded-2xl border-0 shadow-[0_1px_3px_rgba(43,38,32,0.06)]" style={{ background: "#FFFDF8" }}>
          <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #6B8F71, #E3A857, #D97B4F)" }} />

          <CardHeader className="pb-2">
            <CardTitle className="font-display text-xl font-normal" style={{ color: "#3F5744" }}>
              Appointment details
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-2">
            {error && (
              <div
                className="mb-5 rounded-xl px-4 py-3 text-sm"
                style={{ background: "rgba(217,123,79,0.1)", color: "#a5502c" }}
              >
                {error}
              </div>
            )}

            <form onSubmit={submit} className="ayur-field grid gap-5">
              <div className="space-y-2">
                <Label className="font-body text-[13px] font-medium" style={{ color: "#5B5347" }}>
                  Consultation type
                </Label>
                <Select
                  value={form.consultationType}
                  onChange={(e) => setForm({ ...form, consultationType: e.target.value })}
                  className={inputClass}
                >
                  <option>Online Consultation</option>
                  <option>Diet Consultation</option>
                  <option>Lifestyle Guidance</option>
                  <option>Follow-up Consultation</option>
                </Select>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="font-body text-[13px] font-medium" style={{ color: "#5B5347" }}>
                    Date
                  </Label>
                  <Input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-[13px] font-medium" style={{ color: "#5B5347" }}>
                    Time
                  </Label>
                  <Input
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-body text-[13px] font-medium" style={{ color: "#5B5347" }}>
                  Reason
                </Label>
                <Textarea
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  placeholder="Describe the reason for consultation"
                  className={`${inputClass} min-h-[110px] resize-none`}
                />
              </div>

              <Button
                disabled={loading}
                className="mt-1 w-full rounded-full py-5 text-[14px] font-semibold disabled:opacity-60"
                style={{ background: "#3F5744", color: "#FBF6EC" }}
              >
                {loading ? "Booking…" : "Book appointment"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}