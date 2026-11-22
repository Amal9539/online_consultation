"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import ReportCard from "@/components/ReportCard";
import AppointmentCard from "@/components/AppointmentCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Trash2,
  AlertTriangle,
  Mail,
  Phone,
  User,
  Calendar,
  FileText,
  Pill,
} from "lucide-react";

export default function PatientDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/patients/${id}`)
        .then((r) => r.json())
        .then(setData)
        .catch(console.error);
    }
  }, [id]);

  async function handleDelete() {
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/patients/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete patient");
      router.push("/admin/patients");
    } catch (err) {
      alert(err.message);
      setDeleteLoading(false);
    }
  }

  if (!data) return <div className="p-8 text-center text-slate-500">Loading patient details...</div>;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f6f9f4] w-full">
      <main className="p-5 md:p-8 w-full max-w-7xl xl:max-w-[1650px] mx-auto space-y-6">
        {/* Back Link & Header */}
        <div>
          <Link
            href="/admin/patients"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#18532f] hover:underline mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Patients</span>
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-emerald-950/10 pb-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#18532f] text-xl font-bold text-white shadow-md">
                {data.patient.name ? data.patient.name.charAt(0).toUpperCase() : "P"}
              </div>
              <div>
                <h1 className="font-serif text-3xl font-extrabold text-[#143d23]">
                  {data.patient.name}
                </h1>
                <p className="text-xs text-slate-500">{data.patient.email}</p>
              </div>
            </div>

            {/* Delete Patient Button */}
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50/80 px-4 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 hover:border-rose-300 transition-all shadow-sm"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete Patient</span>
            </button>
          </div>
        </div>

        {/* Patient Profile Info Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Card 1: Details */}
          <div className="rounded-3xl border border-emerald-950/10 bg-white p-6 shadow-sm space-y-3">
            <h3 className="font-serif text-base font-bold text-[#143d23] border-b border-slate-100 pb-3">
              Patient Information
            </h3>
            <div className="space-y-2.5 text-xs">
              <Info label="Phone" value={data.patient.phone} />
              <Info label="Age" value={data.patient.age ? `${data.patient.age} years` : null} />
              <Info label="Gender" value={data.patient.gender} />
              <Info label="Address" value={data.patient.address} />
              <Info label="Registered Since" value={data.patient.createdAt ? new Date(data.patient.createdAt).toLocaleDateString() : null} />
            </div>
          </div>

          {/* Card 2: Medical Reports */}
          <div className="rounded-3xl border border-emerald-950/10 bg-white p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif text-base font-bold text-[#143d23]">
                Uploaded Medical Reports
              </h3>
              <span className="text-xs font-bold text-emerald-800">
                {data.patient.reports?.length || 0} File(s)
              </span>
            </div>
            <div className="space-y-3">
              {data.patient.reports?.map((r) => (
                <ReportCard key={r.id} report={r} />
              ))}
              {!data.patient.reports?.length && (
                <p className="text-xs text-slate-400 italic py-4 text-center">
                  No medical reports uploaded by this patient.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Appointment History */}
        <div className="rounded-3xl border border-emerald-950/10 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-serif text-base font-bold text-[#143d23]">
              Consultation & Appointment History
            </h3>
            <span className="text-xs font-bold text-emerald-800">
              {data.patient.appointments?.length || 0} Total
            </span>
          </div>

          <div className="space-y-3">
            {data.patient.appointments?.map((a) => (
              <AppointmentCard key={a.id} appointment={a} />
            ))}
            {!data.patient.appointments?.length && (
              <p className="text-xs text-slate-400 italic py-4 text-center">
                No past appointment records.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in">
          <div className="w-full max-w-md rounded-3xl border border-rose-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Delete Patient Record?
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Are you sure you want to permanently delete patient{" "}
                  <strong className="text-slate-900">{data.patient.name}</strong>?
                </p>
                <p className="mt-1 text-[11px] text-rose-600 font-medium">
                  ⚠️ All associated appointments, prescriptions, and reports will also be permanently deleted.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleteLoading}
                className="rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex items-center gap-1.5 rounded-full bg-rose-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-rose-700 transition-all disabled:opacity-70"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>{deleteLoading ? "Deleting..." : "Confirm Delete"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-2">
      <span className="text-slate-500 font-medium">{label}</span>
      <span className="font-bold text-slate-900">{value || "—"}</span>
    </div>
  );
}
