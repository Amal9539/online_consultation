"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import {
  Calendar,
  Clock,
  Video,
  User,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Save,
  Search,
  Filter,
} from "lucide-react";

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [editForms, setEditForms] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      const list = data.appointments || [];
      setAppointments(list);

      // Initialize edit forms with current values
      const initial = {};
      list.forEach((a) => {
        const yyyy = new Date(a.date).toISOString().split("T")[0];
        initial[a.id] = {
          date: yyyy,
          time: a.time || "10:30 AM",
          zoomLink: a.zoomLink || "",
          status: a.status || "SCHEDULED",
        };
      });
      setEditForms(initial);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function handleFormChange(id, field, value) {
    setEditForms((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  }

  async function saveAppointment(id) {
    setMessage({ text: "", type: "" });
    const formData = editForms[id];
    if (!formData) return;

    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: formData.date,
          time: formData.time,
          zoomLink: formData.zoomLink,
          status: formData.status,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      setMessage({ text: `Appointment #${id} updated successfully!`, type: "success" });
      load();
    } catch (err) {
      setMessage({ text: err.message || "Failed to update appointment", type: "error" });
    }
  }

  // Filter & search
  const filteredAppointments = appointments.filter((a) => {
    const matchesFilter = filter === "ALL" || a.status === filter;
    const matchesSearch =
      !search ||
      a.patient?.name?.toLowerCase().includes(search.toLowerCase()) ||
      a.patient?.email?.toLowerCase().includes(search.toLowerCase()) ||
      a.consultationType?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f6f9f4]">
      <main className="p-5 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-emerald-950/10 pb-6">
          <div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#18532f]">
              Doctor Scheduling Panel
            </span>
            <h1 className="mt-2 font-serif text-3xl font-extrabold text-[#143d23]">
              Manage & Assign Consultations
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Assign exact consultation time slots, update dates, and provide Zoom video call links.
            </p>
          </div>

          {/* Status Counter */}
          <div className="flex items-center gap-2">
            <span className="rounded-2xl border border-emerald-200 bg-white px-4 py-2 text-xs font-semibold text-[#143d23] shadow-sm">
              Total: {appointments.length}
            </span>
            <span className="rounded-2xl bg-emerald-100 px-4 py-2 text-xs font-bold text-emerald-800 shadow-sm">
              Scheduled: {appointments.filter((a) => a.status === "SCHEDULED").length}
            </span>
          </div>
        </div>

        {/* Global Feedback Alert */}
        {message.text && (
          <div
            className={`rounded-2xl p-4 text-xs font-semibold flex items-center gap-2 ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Status filter pills */}
          <div className="flex items-center gap-2">
            {["ALL", "SCHEDULED", "COMPLETED", "CANCELLED"].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                  filter === st
                    ? "bg-[#18532f] text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-300"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-xs w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="h-3.5 w-3.5" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patient name, email..."
              className="w-full rounded-full border border-slate-300 bg-white py-2 pl-9 pr-4 text-xs text-slate-800 shadow-sm focus:border-[#18532f] focus:outline-none"
            />
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.map((a) => {
            const form = editForms[a.id] || {};
            const isScheduled = a.status === "SCHEDULED";

            return (
              <div
                key={a.id}
                className="rounded-3xl border border-emerald-950/10 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="grid gap-6 lg:grid-cols-12">
                  {/* Left Column: Patient & Booking Request Info (6 cols) */}
                  <div className="lg:col-span-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase text-emerald-800">
                        Appointment #{a.id}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          a.status === "SCHEDULED"
                            ? "bg-green-100 text-green-800"
                            : a.status === "COMPLETED"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {a.status}
                      </span>
                    </div>

                    {/* Patient Name */}
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#143d23] flex items-center gap-2">
                        <User className="h-4 w-4 text-[#18532f]" />
                        <span>{a.patient?.name}</span>
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5 text-slate-400" />
                          {a.patient?.email}
                        </span>
                        {a.patient?.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5 text-slate-400" />
                            {a.patient?.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Consultation Type & Patient's Requested Slot */}
                    <div className="rounded-2xl bg-emerald-50/60 p-3.5 border border-emerald-100/80 text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-500">Program:</span>
                        <span className="font-bold text-[#143d23]">{a.consultationType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-500">Current Slot:</span>
                        <span className="font-bold text-emerald-800">{a.time || "Not assigned"}</span>
                      </div>
                      {a.reason && (
                        <div className="pt-1 border-t border-emerald-100">
                          <span className="font-medium text-slate-500">Patient Note: </span>
                          <span className="text-slate-700 italic">{a.reason}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Doctor Assignment & Zoom Control (6 cols) */}
                  <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-[#fbfdfa] p-4 space-y-3.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#18532f] flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Doctor Scheduling & Link</span>
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Date Input */}
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 mb-1 block">
                          Consultation Date
                        </label>
                        <input
                          type="date"
                          value={form.date || ""}
                          onChange={(e) => handleFormChange(a.id, "date", e.target.value)}
                          className="w-full rounded-xl border border-slate-300 py-2 px-3 text-xs text-slate-800 focus:border-[#18532f] focus:outline-none"
                        />
                      </div>

                      {/* Time Input (Doctor can enter e.g. 10:30 AM or pick time) */}
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 mb-1 block">
                          Assign Exact Time
                        </label>
                        <input
                          type="text"
                          value={form.time || ""}
                          onChange={(e) => handleFormChange(a.id, "time", e.target.value)}
                          placeholder="e.g. 10:30 AM, 04:00 PM"
                          className="w-full rounded-xl border border-slate-300 py-2 px-3 text-xs text-slate-800 focus:border-[#18532f] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Quick Time Selector Buttons */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      <span className="text-[10px] text-slate-400 font-medium mr-1">Quick Slots:</span>
                      {["09:30 AM", "10:30 AM", "11:30 AM", "03:00 PM", "04:30 PM", "06:00 PM"].map((quickTime) => (
                        <button
                          key={quickTime}
                          type="button"
                          onClick={() => handleFormChange(a.id, "time", quickTime)}
                          className="rounded-lg bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                        >
                          {quickTime}
                        </button>
                      ))}
                    </div>

                    {/* Zoom / Video Link */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-semibold text-slate-600">
                          Zoom / Video Consultation Link
                        </label>
                        {form.zoomLink && (
                          <a
                            href={form.zoomLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1 hover:underline"
                          >
                            <span>Test Link</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <input
                        type="url"
                        value={form.zoomLink || ""}
                        onChange={(e) => handleFormChange(a.id, "zoomLink", e.target.value)}
                        placeholder="https://zoom.us/j/123456789 or Google Meet"
                        className="w-full rounded-xl border border-slate-300 py-2 px-3 text-xs text-slate-800 focus:border-[#18532f] focus:outline-none"
                      />
                    </div>

                    {/* Status & Save Button */}
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <select
                        value={form.status || "SCHEDULED"}
                        onChange={(e) => handleFormChange(a.id, "status", e.target.value)}
                        className="rounded-xl border border-slate-300 py-2 px-3 text-xs text-slate-800 bg-white focus:border-[#18532f] focus:outline-none"
                      >
                        <option value="SCHEDULED">SCHEDULED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => saveAppointment(a.id)}
                        className="flex items-center gap-1.5 rounded-full bg-[#18532f] px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#123e23] transition-all"
                      >
                        <Save className="h-3.5 w-3.5" />
                        <span>Update & Confirm</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {!filteredAppointments.length && !loading && (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-slate-300 mb-3" />
              <p className="font-bold text-slate-700">No appointments found</p>
              <p className="text-xs text-slate-400 mt-1">
                Appointments requested by patients will appear here for time assignment and meeting links.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
