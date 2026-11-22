"use client";

import { useEffect, useState } from "react";
import { User, CheckCircle2, Shield, Leaf } from "lucide-react";

export default function ProfilePage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", age: "", gender: "", address: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((d) =>
        setForm({
          name: d.user?.name || "",
          email: d.user?.email || "",
          phone: d.user?.phone || "",
          age: d.user?.age || "",
          gender: d.user?.gender || "",
          address: d.user?.address || "",
        })
      )
      .catch(() => {});
  }, []);

  async function save(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage(res.ok ? "Profile settings updated successfully." : data.message || "Update failed.");
    } catch {
      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f6f9f4] w-full">
      <main className="p-5 md:p-8 w-full max-w-7xl xl:max-w-[1650px] mx-auto space-y-8">
        {/* Ayurvedic Header Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-900/10 bg-gradient-to-r from-[#edf6ea] via-[#e2efe0] to-[#d4ebd0] p-6 sm:p-8 shadow-sm">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#18532f] border border-emerald-200">
              <User className="h-3.5 w-3.5" />
              <span>Patient Account & Prakriti Profile</span>
            </span>
            <h1 className="mt-3 font-serif text-3xl font-extrabold text-[#143d23]">
              Personal Profile & Health Info
            </h1>
            <p className="mt-1 text-sm text-slate-700">
              Keep your contact information, age, and address accurate so Dr. Princy can prepare appropriate dosages and follow-ups.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="w-full max-w-4xl rounded-3xl border border-emerald-950/10 bg-white p-6 sm:p-8 shadow-sm">
          <form onSubmit={save} className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Full Name"
                value={form.name}
                setValue={(v) => setForm({ ...form, name: v })}
                required
              />
              <Field
                label="Email Address"
                type="email"
                value={form.email}
                setValue={(v) => setForm({ ...form, email: v })}
                required
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <Field
                label="Phone Number"
                value={form.phone}
                setValue={(v) => setForm({ ...form, phone: v })}
              />
              <Field
                label="Age (Years)"
                type="number"
                value={form.age}
                setValue={(v) => setForm({ ...form, age: v })}
              />
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#143d23]">Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 py-3 px-4 text-xs text-slate-800 shadow-sm focus:border-[#18532f] focus:outline-none focus:ring-2 focus:ring-[#18532f]/20 bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#143d23]">Residential Address</label>
              <textarea
                rows={3}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Street address, city, state, postal code..."
                className="w-full rounded-2xl border border-slate-300 p-4 text-xs text-slate-800 shadow-sm focus:border-[#18532f] focus:outline-none focus:ring-2 focus:ring-[#18532f]/20"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-full bg-[#18532f] px-7 py-3 text-xs font-bold text-white shadow-md shadow-[#18532f]/20 hover:bg-[#123e23] disabled:opacity-50 transition-all"
              >
                <span>{loading ? "Saving Changes..." : "Save Profile Details"}</span>
              </button>

              {message && (
                <p className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>{message}</span>
                </p>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

function Field({ label, type = "text", value, setValue, required = false }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-[#143d23]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        className="w-full rounded-2xl border border-slate-300 py-3 px-4 text-xs text-slate-800 shadow-sm focus:border-[#18532f] focus:outline-none focus:ring-2 focus:ring-[#18532f]/20 bg-white"
      />
    </div>
  );
}
