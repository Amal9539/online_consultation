"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Video,
  Leaf,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileText,
  AlertCircle,
} from "lucide-react";

const consultationTypes = [
  {
    id: "General Ayurveda Consultation",
    title: "General Ayurveda Consultation",
    desc: "Complete Prakriti (constitution) assessment, root-cause diagnosis, and treatment plan.",
    icon: "🌿",
  },
  {
    id: "Diet Consultation",
    title: "Ayurvedic Diet & Nutrition",
    desc: "Customized diet plans aligned with your Dosha balance and digestive health.",
    icon: "🥗",
  },
  {
    id: "Lifestyle Guidance",
    title: "Dinacharya & Lifestyle Routines",
    desc: "Daily circadian rhythms, sleep restoration, and natural stress-relief habits.",
    icon: "🧘",
  },
  {
    id: "Herbal Treatment",
    title: "Traditional Herbal Treatment",
    desc: "Classical herbal decoctions (Kashayam), herbal powders, and natural remedies.",
    icon: "🌱",
  },
  {
    id: "Follow-up Consultation",
    title: "Follow-up Consultation",
    desc: "Review your ongoing healing progress and adjust medicinal prescriptions.",
    icon: "🔄",
  },
];

const timeWindows = [
  { label: "Morning Window", time: "09:00 AM – 12:00 PM", icon: "🌅" },
  { label: "Afternoon Window", time: "01:00 PM – 04:00 PM", icon: "☀️" },
  { label: "Evening Window", time: "05:00 PM – 08:00 PM", icon: "🌆" },
  { label: "Anytime", time: "Assigned by Doctor", icon: "⏱️" },
];

export default function BookAppointmentPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    consultationType: "General Ayurveda Consultation",
    date: "",
    preferredSlot: "Morning Window (09:00 AM – 12:00 PM)",
    reason: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Set default date to tomorrow
  useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    setForm((prev) => ({ ...prev, date: `${yyyy}-${mm}-${dd}` }));
  });

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consultationType: form.consultationType,
          date: form.date,
          preferredSlot: form.preferredSlot,
          time: form.preferredSlot, // Initial slot; Doctor will assign exact time
          reason: form.reason,
        }),
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

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f6f9f4] w-full">
      <main className="p-5 md:p-8 w-full max-w-7xl xl:max-w-[1650px] mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#18532f]">
            Online Consultation Booking
          </span>
          <h1 className="mt-2 font-serif text-3xl font-extrabold text-[#143d23]">
            Schedule Your Consultation
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Select your preferred consultation type and date. Dr. Princy will confirm your exact time slot and meeting link.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={submit} className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Form Inputs (7 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Consultation Type */}
            <div className="rounded-3xl border border-emerald-950/10 bg-white p-6 shadow-sm">
              <label className="block font-serif text-base font-bold text-[#143d23] mb-1">
                1. Select Consultation Program
              </label>
              <p className="text-xs text-slate-500 mb-4">
                Choose the focus area of your Ayurvedic consultation
              </p>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {consultationTypes.map((type) => {
                  const isSelected = form.consultationType === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setForm({ ...form, consultationType: type.id })}
                      className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                        isSelected
                          ? "border-[#18532f] bg-emerald-50/70 shadow-sm ring-1 ring-[#18532f]/20"
                          : "border-slate-200 hover:border-emerald-300 hover:bg-slate-50/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-2xl">{type.icon}</span>
                        {isSelected && (
                          <CheckCircle2 className="h-4 w-4 text-[#18532f]" />
                        )}
                      </div>
                      <h4 className="mt-2 font-bold text-sm text-[#143d23]">
                        {type.title}
                      </h4>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                        {type.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Preferred Date */}
            <div className="rounded-3xl border border-emerald-950/10 bg-white p-6 shadow-sm">
              <label className="block font-serif text-base font-bold text-[#143d23] mb-1">
                2. Choose Preferred Date
              </label>
              <p className="text-xs text-slate-500 mb-4">
                Select your convenient date for the consultation session
              </p>

              <div className="relative max-w-sm">
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-2xl border border-slate-300 py-3.5 px-4 text-sm text-slate-800 shadow-sm focus:border-[#18532f] focus:outline-none focus:ring-2 focus:ring-[#18532f]/20"
                />
              </div>
            </div>

            {/* 3. Preferred Time Window */}
            <div className="rounded-3xl border border-emerald-950/10 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <label className="font-serif text-base font-bold text-[#143d23]">
                  3. Preferred Time Window
                </label>
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-semibold text-amber-800">
                  Doctor Confirms Exact Time
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Tell us which part of the day works best. The doctor will assign the specific time slot.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                {timeWindows.map((slot) => {
                  const slotValue = `${slot.label} (${slot.time})`;
                  const isSelected = form.preferredSlot === slotValue;
                  return (
                    <div
                      key={slot.label}
                      onClick={() => setForm({ ...form, preferredSlot: slotValue })}
                      className={`cursor-pointer rounded-2xl border p-3.5 flex items-center justify-between transition-all ${
                        isSelected
                          ? "border-[#18532f] bg-emerald-50/70 shadow-sm ring-1 ring-[#18532f]/20"
                          : "border-slate-200 hover:border-emerald-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{slot.icon}</span>
                        <div>
                          <p className="text-xs font-bold text-[#143d23]">{slot.label}</p>
                          <p className="text-[11px] text-slate-500">{slot.time}</p>
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-[#18532f]" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Health Concerns / Reason */}
            <div className="rounded-3xl border border-emerald-950/10 bg-white p-6 shadow-sm">
              <label className="block font-serif text-base font-bold text-[#143d23] mb-1">
                4. Primary Health Concerns (Optional)
              </label>
              <p className="text-xs text-slate-500 mb-3">
                Briefly describe your symptoms, health history, or questions for Dr. Princy
              </p>
              <textarea
                rows={4}
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                placeholder="e.g. Digestive issues, joint stiffness, sleep trouble, or dietary guidance needed..."
                className="w-full rounded-2xl border border-slate-300 p-4 text-xs text-slate-800 shadow-sm focus:border-[#18532f] focus:outline-none focus:ring-2 focus:ring-[#18532f]/20"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#18532f] py-4 text-sm font-bold text-white shadow-lg shadow-[#18532f]/25 transition hover:bg-[#123e23] disabled:opacity-70"
            >
              <span>{loading ? "Submitting Request..." : "Request Appointment"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Right Column: Information & Doctor Card (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Doctor Info Card */}
            <div className="rounded-3xl border border-emerald-950/10 bg-white p-6 shadow-sm text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
                👩‍⚕️
              </div>
              <h3 className="mt-3 font-serif text-lg font-bold text-[#143d23]">
                Dr. Princy (BAMS)
              </h3>
              <p className="text-xs text-emerald-700 font-medium">Chief Ayurveda Consultant</p>
              <p className="mt-2 text-xs text-slate-500">
                10+ Years Experience · KMCT & Dubai Ayurveda Clinic
              </p>

              <div className="mt-5 border-t border-slate-100 pt-4 text-left space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-emerald-700 shrink-0" />
                  <span>High-definition video consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-emerald-700 shrink-0" />
                  <span>Digital PDF prescription after call</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-700 shrink-0" />
                  <span>Prakriti analysis & herbal diet plan</span>
                </div>
              </div>
            </div>

            {/* Appointment Process Note Card */}
            <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-[#ebf5e7] to-[#d8ebd1] p-6 shadow-sm">
              <div className="flex items-center gap-2 text-[#18532f] font-serif font-bold text-sm mb-2">
                <Clock className="h-4 w-4" />
                <span>Doctor Scheduling Note</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-700">
                Once submitted, Dr. Princy reviews your preferred date and assigns the exact consultation time slot.
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-700">
                You will see the confirmed time and Zoom meeting link in your <strong>Upcoming Appointments</strong> tab.
              </p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
