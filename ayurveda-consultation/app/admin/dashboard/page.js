"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import {
  Users,
  CalendarDays,
  Pill,
  Clock,
  ArrowRight,
  Stethoscope,
  Sparkles,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    appointments: 0,
    upcoming: 0,
    prescriptions: 0,
  });

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f6f9f4] w-full">
      <main className="p-5 md:p-8 w-full max-w-7xl xl:max-w-[1650px] mx-auto space-y-6">
        {/* Banner */}
        <div className="rounded-3xl border border-emerald-900/10 bg-gradient-to-r from-[#eef6ea] to-[#d8ebd1] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#18532f]">
            <Stethoscope className="h-4 w-4" />
            <span>Doctor & Chief Consultant Portal</span>
          </div>
          <h1 className="mt-2 font-serif text-3xl font-extrabold text-[#143d23] sm:text-4xl">
            Welcome, Dr. Princy
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Monitor consultation requests, assign appointment slots, manage patient records, and generate digital prescriptions.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Registered Patients"
            value={stats.patients}
            icon={Users}
            href="/admin/patients"
          />
          <StatCard
            title="Total Appointments"
            value={stats.appointments}
            icon={CalendarDays}
            href="/admin/appointments"
          />
          <StatCard
            title="Upcoming Scheduled"
            value={stats.upcoming}
            icon={Clock}
            href="/admin/appointments"
            highlight
          />
          <StatCard
            title="Prescriptions Issued"
            value={stats.prescriptions}
            icon={Pill}
            href="/admin/prescriptions"
          />
        </div>

        {/* 3 Quick Action Cards */}
        <div className="grid gap-6 md:grid-cols-3 pt-2">
          <ActionCard
            href="/admin/patients"
            title="Manage Patients"
            text="View registered patients, inspect uploaded medical reports, and delete inactive profiles."
            btn="Open Patients"
            icon={Users}
          />
          <ActionCard
            href="/admin/appointments"
            title="Appointments & Zoom"
            text="Review consultation requests, assign exact time slots, and provide video call meeting links."
            btn="Manage Schedule"
            icon={CalendarDays}
          />
          <ActionCard
            href="/admin/prescriptions"
            title="Generate Prescriptions"
            text="Create official digital prescriptions with dosages, directions, and instant PDF generation."
            btn="Create Prescription"
            icon={Pill}
          />
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, href, highlight }) {
  return (
    <Link href={href} className="group">
      <div
        className={`flex items-center justify-between rounded-2xl border p-5 shadow-sm transition hover:shadow-md ${
          highlight
            ? "border-emerald-300 bg-emerald-50/70"
            : "border-emerald-950/10 bg-white hover:border-[#18532f]/30"
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dbeee1] text-[#18532f]">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-[#143d23]">{value}</p>
            <p className="text-xs font-medium text-slate-500">{title}</p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#18532f] transition-colors" />
      </div>
    </Link>
  );
}

function ActionCard({ href, title, text, btn, icon: Icon }) {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-emerald-950/10 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dbeee1] text-[#18532f] mb-4">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-serif text-lg font-bold text-[#143d23]">{title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-600">{text}</p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100">
        <Link href={href}>
          <button className="flex items-center gap-2 text-xs font-bold text-[#18532f] hover:underline">
            <span>{btn}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </Link>
      </div>
    </div>
  );
}
