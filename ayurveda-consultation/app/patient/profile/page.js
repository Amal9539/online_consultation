// "use client";

// import { useEffect, useState } from "react";
// import PatientSidebar from "@/components/PatientSidebar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select } from "@/components/ui/select";

// export default function ProfilePage() {
//   const [form, setForm] = useState({ name: "", email: "", phone: "", age: "", gender: "", address: "" });
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetch("/api/profile").then(r => r.json()).then(d => d.user && setForm({
//       name: d.user.name || "", email: d.user.email || "", phone: d.user.phone || "",
//       age: d.user.age || "", gender: d.user.gender || "", address: d.user.address || ""
//     }));
//   }, []);

//   async function save(e) {
//     e.preventDefault();
//     const res = await fetch("/api/profile", {
//       method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form)
//     });
//     const data = await res.json();
//     setMessage(res.ok ? "Profile updated." : data.message || "Update failed.");
//   }

//   return (
//     <div className="md:flex">
//       <PatientSidebar />
//       <main className="min-w-0 flex-1 p-5 md:p-8">
//         <div className="mb-8"><h1 className="text-3xl font-bold">My Profile</h1><p className="text-muted-foreground">Manage your personal information.</p></div>
//         <Card className="max-w-2xl">
//           <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
//           <CardContent>
//             <form onSubmit={save} className="grid gap-5">
//               <Field label="Name" value={form.name} setValue={v => setForm({...form, name: v})} />
//               <Field label="Email" type="email" value={form.email} setValue={v => setForm({...form, email: v})} />
//               <Field label="Phone" value={form.phone} setValue={v => setForm({...form, phone: v})} />
//               <div className="grid gap-5 sm:grid-cols-2">
//                 <Field label="Age" type="number" value={form.age} setValue={v => setForm({...form, age: v})} />
//                 <div className="space-y-2"><Label>Gender</Label><Select value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></Select></div>
//               </div>
//               <div className="space-y-2"><Label>Address</Label><Textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})} /></div>
//               <Button>Save Changes</Button>
//               {message && <p className="text-sm text-muted-foreground">{message}</p>}
//             </form>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// }

// function Field({ label, type = "text", value, setValue }) {
//   return <div className="space-y-2"><Label>{label}</Label><Input type={type} value={value} onChange={e => setValue(e.target.value)} /></div>;
// }


"use client";

import { useEffect, useState } from "react";
import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Leaf, Check, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", age: "", gender: "", address: "" });
  const [status, setStatus] = useState("idle"); // idle | saving | saved | error

  useEffect(() => {
    fetch("/api/profile")
      .then(r => r.json())
      .then(d => d.user && setForm({
        name: d.user.name || "", email: d.user.email || "", phone: d.user.phone || "",
        age: d.user.age || "", gender: d.user.gender || "", address: d.user.address || ""
      }));
  }, []);

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  // plain click handler, no <form>/onSubmit involved, so there's nothing
  // for the browser to natively submit or scroll to
  async function save() {
    setStatus("saving");
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "saved" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="md:flex">
      <PatientSidebar />
      <main
  className="min-w-0 flex-1 px-6 pb-6 pt-3 md:px-12 md:pb-12 md:pt-5 "
  style={{
    background:
      "radial-gradient(circle at 15% 10%, rgba(196,136,31,0.07), transparent 45%), radial-gradient(circle at 85% 90%, rgba(63,90,63,0.08), transparent 45%), #FAF5E9",marginTop:"80px"
  }} 

      >
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-4 flex items-center gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: "#3F5A3F" }}
            >
              <Leaf className="h-7 w-7" style={{ color: "#FAF5E9" }} strokeWidth={1.75} />
            </div>
            <div>
              <h1
                className="text-4xl font-semibold tracking-tight"
                style={{ color: "#3A2E22", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                My Profile
              </h1>
              <p className="text-lg" style={{ color: "#6B5B4A" }}>
                Keep your details current for a personalized course of care.
              </p>
            </div>
          </div>

          {/* Card */}
          <Card
          className="relative mt-2 w-full overflow-hidden rounded-3xl border shadow-sm"           
           style={{ backgroundColor: "#FFFDF8", borderColor: "#E4D5B7" }}
          >
            <svg
              className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 opacity-[0.07]"
              viewBox="0 0 100 100"
              fill="none"
              stroke="#3F5A3F"
              strokeWidth="1.2"
            >
              <path d="M90 10 C 60 10, 20 40, 10 90" />
              <path d="M85 20 C 60 22, 30 45, 20 82" />
              <path d="M78 12 C 65 30, 55 45, 50 55" />
            </svg>

            <CardHeader className="border-b pb-4 pt-4" style={{ borderColor: "#EFE4CC" }}>
              <CardTitle
                className="text-2xl font-semibold"
                style={{ color: "#3A2E22", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Personal Information
              </CardTitle>
              <CardDescription className="text-base" style={{ color: "#8A7A67" }}>
                Shared only with your care team.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-8">
              {/* plain div, not a <form> — nothing here can trigger a native submit/scroll */}
              <div className="grid gap-8">
                <SectionLabel text="Identity" />
                <div className="grid gap-8 sm:grid-cols-2">
                  <Field label="Name" value={form.name} setValue={v => update("name", v)} />
                  <Field label="Email" type="email" value={form.email} setValue={v => update("email", v)} />
                </div>

                <SectionLabel text="Contact & Constitution" />
                <div className="grid gap-8 sm:grid-cols-3">
                  <Field label="Phone" value={form.phone} setValue={v => update("phone", v)} />
                  <Field label="Age" type="number" value={form.age} setValue={v => update("age", v)} />
                  <div className="space-y-2.5">
                    <Label className="text-base" style={{ color: "#3A2E22" }}>Gender</Label>
                    <Select
                      className="h-12 rounded-xl border text-base focus:ring-2"
                      style={{ borderColor: "#E4D5B7", backgroundColor: "#FFFDF8" }}
                      value={form.gender}
                      onChange={e => update("gender", e.target.value)}
                    >
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Select>
                  </div>
                </div>

                <SectionLabel text="Address" />
                <div className="space-y-2.5">
                  <Textarea
                    className="min-h-[120px] rounded-xl border text-base"
                    style={{ borderColor: "#E4D5B7", backgroundColor: "#FFFDF8" }}
                    value={form.address}
                    onChange={e => update("address", e.target.value)}
                    placeholder="Street, city, state, postal code"
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <Button
                    type="button"
                    onClick={save}
                    disabled={status === "saving"}
                    size="lg"
                    className="h-12 rounded-full px-8 text-base font-medium transition-colors disabled:opacity-70"
                    style={{ backgroundColor: "#3F5A3F", color: "#FAF5E9" }}
                  >
                    Save Changes
                  </Button>

                  {/* fixed-width slot: always reserves space, so the button/layout
                      never shifts or scrolls when the status text appears */}
                  <div className="flex w-36 items-center gap-2 text-sm" style={{ color: "#8A7A67" }}>
                    <StatusIndicator status={status} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function StatusIndicator({ status }) {
  if (status === "saving") {
    return (
      <>
        <Loader2 className="h-4 w-4 animate-spin" style={{ color: "#C4881F" }} />
        <span>Saving…</span>
      </>
    );
  }
  if (status === "saved") {
    return (
      <>
        <Check className="h-4 w-4" style={{ color: "#3F5A3F" }} />
        <span>Saved</span>
      </>
    );
  }
  if (status === "error") {
    return <span style={{ color: "#8C4A2F" }}>Couldn't save</span>;
  }
  return null; // idle: space is reserved but nothing renders
}

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3">
      <Leaf className="h-4 w-4 shrink-0" style={{ color: "#C4881F" }} strokeWidth={1.75} />
      <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "#8A7A67" }}>
        {text}
      </span>
      <div className="h-px flex-1" style={{ backgroundColor: "#EFE4CC" }} />
    </div>
  );
}

function Field({ label, type = "text", value, setValue }) {
  return (
    <div className="space-y-2.5">
      <Label className="text-base" style={{ color: "#3A2E22" }}>{label}</Label>
      <Input
        className="h-12 rounded-xl border text-base"
        style={{ borderColor: "#E4D5B7", backgroundColor: "#FFFDF8" }}
        type={type}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
}