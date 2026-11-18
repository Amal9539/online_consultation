"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  ChevronRight,
  FolderHeart,
  Heart,
  Leaf,
  Video,
  Lightbulb,
  ArrowRight,
  Stethoscope,
  Sparkles,
  ShieldCheck,
  PlusCircle,
} from "lucide-react";

export default function PatientDashboard() {
  const [data, setData] = useState({
    user: null,
    appointments: [],
    reports: [],
    prescriptions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/patient/dashboard")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const userName = data.user?.name || "Patient";
  const upcomingAppointments = data.appointments?.filter((a) => a.status === "SCHEDULED") || [];
  const nextAppointment = upcomingAppointments[0] || null;

  // Format date helper for the badge like "NOV 20 Thu"
  function formatBadgeDate(dateString) {
    if (!dateString) return { month: "NOV", day: "20", weekday: "Thu" };
    try {
      const d = new Date(dateString);
      const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
      const day = d.getDate();
      const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
      return { month, day, weekday };
    } catch {
      return { month: "NOV", day: "20", weekday: "Thu" };
    }
  }

  const badgeDate = nextAppointment ? formatBadgeDate(nextAppointment.date) : { month: "UPCOMING", day: "--", weekday: "TBD" };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] bg-[#f6f9f4]">
      {/* Sidebar matching Image 3 */}
      <PatientSidebar />

      {/* Main Content Area */}
      <main className="min-w-0 flex-1 p-5 md:p-8 space-y-6">
        {/* ======================================================== */}
        {/* 1. WELCOME BANNER (Exact Reference: Image 3)             */}
        {/* ======================================================== */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-900/10 bg-gradient-to-r from-[#eef6ea] via-[#e5f2df] to-[#d8ebd1] p-6 sm:p-8 shadow-sm">
          <div className="grid items-center gap-6 md:grid-cols-12">
            {/* Banner Left Text */}
            <div className="md:col-span-7 z-10">
              <p className="flex items-center gap-2 text-base font-semibold text-[#18532f]">
                <span>Hello, {userName}</span>
                <span className="text-xl">👋</span>
              </p>
              <h1 className="mt-2 font-serif text-3xl font-extrabold tracking-tight text-[#143d23] sm:text-4xl">
                Welcome to Arayal
              </h1>
              <p className="mt-2 max-w-md text-sm text-slate-600">
                Your trusted Ayurveda partner for natural and holistic healing.
              </p>
              <div className="mt-5">
                <Link href="/patient/book-appointment">
                  <button className="flex items-center gap-2 rounded-full bg-[#18532f] px-6 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#18532f]/20 transition hover:bg-[#123e23]">
                    <span>Book a Consultation</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Banner Right Image (Image 3 Reference: herbs + mortar) */}
            <div className="relative hidden md:flex md:col-span-5 justify-end">
              <div className="relative h-44 w-full max-w-[340px] overflow-hidden rounded-2xl shadow-inner">
                <Image
                  src="/images/dash-herbs.jpg"
                  alt="Ayurveda Herbs and Oil"
                  fill
                  className="object-cover"
                  sizes="340px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. FOUR STATUS CARDS ROW (Exact Reference: Image 3)      */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Upcoming Appointment */}
          <Link href="/patient/appointments" className="group">
            <div className="flex items-center justify-between rounded-2xl border border-emerald-950/10 bg-white p-4 shadow-sm transition hover:border-[#18532f]/30 hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dbeee1] text-[#18532f]">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#143d23]">
                    {upcomingAppointments.length}
                  </p>
                  <p className="text-xs font-medium text-slate-500">Upcoming Appointment</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#18532f] transition-colors" />
            </div>
          </Link>

          {/* Card 2: Consultation History */}
          <Link href="/patient/prescriptions" className="group">
            <div className="flex items-center justify-between rounded-2xl border border-emerald-950/10 bg-white p-4 shadow-sm transition hover:border-[#18532f]/30 hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dbeee1] text-[#18532f]">
                  <FolderHeart className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#143d23]">
                    {data.prescriptions?.length || 0}
                  </p>
                  <p className="text-xs font-medium text-slate-500">Consultation History</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#18532f] transition-colors" />
            </div>
          </Link>

          {/* Card 3: Health Status */}
          <div className="flex items-center justify-between rounded-2xl border border-emerald-950/10 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dbeee1] text-[#18532f]">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-bold text-emerald-700">Good</p>
                <p className="text-xs font-medium text-slate-500">Health Status</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </div>

          {/* Card 4: Live Healthy */}
          <div className="flex items-center justify-between rounded-2xl border border-emerald-950/10 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dbeee1] text-[#18532f]">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#143d23]">Live Healthy</p>
                <p className="text-xs font-medium text-slate-500">Naturally</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. MIDDLE ROW: Upcoming Appointment + Health Tips        */}
        {/* ======================================================== */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: Upcoming Appointment Card (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-emerald-950/10 bg-white p-6 shadow-sm flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-emerald-950/5 pb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#18532f]" />
                <h3 className="font-serif text-base font-bold text-[#143d23]">
                  Upcoming Appointment
                </h3>
              </div>
              <Link
                href="/patient/appointments"
                className="flex items-center gap-1 text-xs font-semibold text-[#18532f] hover:underline"
              >
                <span>View All</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Appointment Body */}
            {nextAppointment ? (
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-emerald-50/80 to-green-50/40 p-4 border border-emerald-100">
                {/* Date Badge */}
                <div className="flex sm:flex-col items-center justify-center rounded-xl bg-white px-4 py-2 border border-emerald-900/10 shadow-sm shrink-0 gap-1">
                  <span className="text-[10px] font-bold text-emerald-800 tracking-wider">
                    {badgeDate.month}
                  </span>
                  <span className="text-2xl font-extrabold text-[#143d23] leading-none">
                    {badgeDate.day}
                  </span>
                  <span className="text-[10px] font-medium text-slate-500">
                    {badgeDate.weekday}
                  </span>
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-[#143d23] text-sm truncate">
                    {nextAppointment.consultationType || "General Ayurveda Consultation"}
                  </h4>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <span>🕒</span> {nextAppointment.time || "10:30 AM"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Video className="h-3.5 w-3.5 text-emerald-700" /> Video Call
                    </span>
                  </div>
                  {nextAppointment.reason && (
                    <p className="mt-1 text-xs text-slate-500 truncate">
                      {nextAppointment.reason}
                    </p>
                  )}
                </div>

                {/* Join Call Button */}
                <div className="shrink-0">
                  {nextAppointment.zoomLink ? (
                    <a
                      href={nextAppointment.zoomLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#18532f] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#123e23] transition-all"
                    >
                      <Video className="h-3.5 w-3.5" />
                      <span>Join Call</span>
                    </a>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-800 opacity-80"
                      title="Doctor will add the video link before the appointment"
                    >
                      <Video className="h-3.5 w-3.5" />
                      <span>Link Pending</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-4 flex flex-col items-center justify-center rounded-2xl bg-emerald-50/40 p-8 text-center border border-dashed border-emerald-200">
                <Calendar className="h-10 w-10 text-emerald-600 mb-2" />
                <p className="font-bold text-[#143d23] text-sm">No Upcoming Appointments</p>
                <p className="text-xs text-slate-500 mt-1">
                  Schedule your personalized consultation with Dr. Princy today.
                </p>
                <Link href="/patient/book-appointment" className="mt-4">
                  <button className="flex items-center gap-2 rounded-full bg-[#18532f] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#123e23]">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Book Appointment</span>
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Right: Health Tips Card (5 cols matching Image 3) */}
          <div className="lg:col-span-5 rounded-3xl border border-emerald-950/10 bg-white p-6 shadow-sm flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-emerald-950/5 pb-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                <h3 className="font-serif text-base font-bold text-[#143d23]">
                  Health Tips
                </h3>
              </div>
              <span className="text-xs font-semibold text-[#18532f]">
                Daily Wisdom
              </span>
            </div>

            {/* Tip Body */}
            <div className="mt-4 flex items-center gap-4">
              {/* Herb image matching Image 3 */}
              <div className="relative h-20 w-24 overflow-hidden rounded-2xl shrink-0 shadow-sm">
                <Image
                  src="/images/health-tips.jpg"
                  alt="Herbal Remedies"
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </div>

              <div>
                <p className="text-xs font-semibold leading-relaxed text-slate-800">
                  Drink warm water in the morning for better digestion & Agni balance.
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Ayurveda recommends starting the day with warm water to flush Ama (toxins).
                </p>
              </div>
            </div>

            {/* Pagination Dots (Image 3 reference) */}
            <div className="mt-4 flex items-center justify-center gap-1.5 pt-2">
              <div className="h-2 w-2 rounded-full bg-[#18532f]" />
              <div className="h-2 w-2 rounded-full bg-emerald-200" />
              <div className="h-2 w-2 rounded-full bg-emerald-200" />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. BOTTOM ROW: 3 Action Cards + Quote Card               */}
        {/* ======================================================== */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left 3 Mini Action Cards (7 cols matching Image 3) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Card 1 */}
            <Link href="/patient/book-appointment" className="group">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-emerald-950/10 bg-white p-4 shadow-sm transition hover:border-[#18532f]/40 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-[#18532f]">
                    <Stethoscope className="h-4 w-4" />
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#18532f]" />
                </div>
                <div className="mt-3">
                  <h4 className="text-xs font-bold text-[#143d23]">
                    Consult with Expert Doctors
                  </h4>
                  <p className="mt-0.5 text-[10px] text-slate-500">Get professional advice</p>
                </div>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/about" className="group">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-emerald-950/10 bg-white p-4 shadow-sm transition hover:border-[#18532f]/40 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-[#18532f]">
                    <Leaf className="h-4 w-4" />
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#18532f]" />
                </div>
                <div className="mt-3">
                  <h4 className="text-xs font-bold text-[#143d23]">
                    Know More About Ayurveda
                  </h4>
                  <p className="mt-0.5 text-[10px] text-slate-500">Discover natural healing</p>
                </div>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/#benefits" className="group">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-emerald-950/10 bg-white p-4 shadow-sm transition hover:border-[#18532f]/40 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-[#18532f]">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#18532f]" />
                </div>
                <div className="mt-3">
                  <h4 className="text-xs font-bold text-[#143d23]">
                    Our Benefits
                  </h4>
                  <p className="mt-0.5 text-[10px] text-slate-500">Live a healthier life</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Quote Card (5 cols matching Image 3) */}
          <div className="lg:col-span-5 flex flex-col justify-center rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-[#dfeed9] to-[#d3eacb] p-6 text-center shadow-sm">
            <blockquote className="font-serif text-sm font-semibold italic text-[#144627] leading-relaxed">
              &ldquo;Ayurveda is not just a medicine, it&apos;s a way of life.&rdquo;
            </blockquote>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-emerald-800">
              <Leaf className="h-4 w-4" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
