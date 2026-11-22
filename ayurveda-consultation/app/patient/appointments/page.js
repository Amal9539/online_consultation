"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppointmentCard from "@/components/AppointmentCard";
import { Calendar, PlusCircle, ArrowRight } from "lucide-react";

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      setAppointments(data.appointments || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f6f9f4] w-full">
      <main className="p-5 md:p-8 w-full max-w-7xl xl:max-w-[1650px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-emerald-950/10 pb-6">
          <div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#18532f]">
              Consultation Schedule
            </span>
            <h1 className="mt-2 font-serif text-3xl font-extrabold text-[#143d23]">
              My Appointments
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Track your scheduled sessions, assigned times, and access video meeting links.
            </p>
          </div>

          <Link href="/patient/book-appointment">
            <button className="flex items-center gap-2 rounded-full bg-[#18532f] px-6 py-3 text-xs font-bold text-white shadow-md shadow-[#18532f]/20 hover:bg-[#123e23] transition-all">
              <PlusCircle className="h-4 w-4" />
              <span>Book New Appointment</span>
            </button>
          </Link>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {appointments.map((a) => (
            <AppointmentCard key={a.id} appointment={a} />
          ))}

          {!appointments.length && !loading && (
            <div className="rounded-3xl border border-dashed border-emerald-200 bg-white p-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-emerald-400 mb-3" />
              <h3 className="font-serif text-lg font-bold text-[#143d23]">
                No Appointments Scheduled Yet
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                Schedule your consultation with Dr. Princy to receive personalized Ayurvedic diagnosis and diet advice.
              </p>
              <Link href="/patient/book-appointment" className="mt-5 inline-block">
                <button className="flex items-center gap-2 rounded-full bg-[#18532f] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#123e23]">
                  <span>Book Appointment Now</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
