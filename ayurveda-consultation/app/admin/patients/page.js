"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import {
  Users,
  Search,
  Eye,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Mail,
  Phone,
  User,
  X,
} from "lucide-react";

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null); // patient to delete
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  async function loadPatients() {
    setLoading(true);
    try {
      const res = await fetch("/api/patients");
      const d = await res.json();
      setPatients(d.patients || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPatients();
  }, []);

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch(`/api/patients/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete patient");

      setMessage({ text: data.message || "Patient deleted successfully", type: "success" });
      setDeleteTarget(null);
      loadPatients();
    } catch (err) {
      setMessage({ text: err.message || "Error deleting patient", type: "error" });
    } finally {
      setDeleteLoading(false);
    }
  }

  const filteredPatients = patients.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.email?.toLowerCase().includes(q) ||
      p.phone?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f6f9f4]">
      <main className="p-5 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-emerald-950/10 pb-6">
          <div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#18532f]">
              Patient Directory
            </span>
            <h1 className="mt-2 font-serif text-3xl font-extrabold text-[#143d23]">
              Registered Patients
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              View registered patient profiles, medical reports, consultation histories, and manage accounts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-2xl border border-emerald-200 bg-white px-4 py-2 text-xs font-bold text-[#143d23] shadow-sm">
              Total Patients: {patients.length}
            </span>
          </div>
        </div>

        {/* Feedback Alert */}
        {message.text && (
          <div
            className={`rounded-2xl p-4 text-xs font-semibold flex items-center justify-between gap-2 ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {message.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
              )}
              <span>{message.text}</span>
            </div>
            <button
              onClick={() => setMessage({ text: "", type: "" })}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email or phone..."
              className="w-full rounded-full border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs text-slate-800 shadow-sm focus:border-[#18532f] focus:outline-none"
            />
          </div>
        </div>

        {/* Patients Table Card */}
        <div className="overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 bg-emerald-50/50 text-[11px] font-bold uppercase tracking-wider text-emerald-900">
                <tr>
                  <th className="px-6 py-4">Patient Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-emerald-50/30 transition-colors">
                    {/* Name */}
                    <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18532f] text-xs font-bold text-white shadow-sm shrink-0">
                        {p.name ? p.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-bold text-[#143d23] text-sm">{p.name}</p>
                        <span className="text-[10px] text-slate-400 font-normal">ID #{p.id}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        {p.email}
                      </span>
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4 text-slate-600">
                      {p.phone ? (
                        <span className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-slate-400" />
                          {p.phone}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Not provided</span>
                      )}
                    </td>

                    {/* Joined Date */}
                    <td className="px-6 py-4 text-slate-500">
                      {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—"}
                    </td>

                    {/* Actions: View & Delete */}
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        {/* View Button */}
                        <Link href={`/admin/patients/${p.id}`}>
                          <button
                            className="flex items-center gap-1 rounded-full border border-emerald-600 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#18532f] hover:bg-emerald-50 transition-all shadow-sm"
                            title="View patient history and reports"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>View</span>
                          </button>
                        </Link>

                        {/* Delete Button (Requested feature!) */}
                        <button
                          onClick={() => setDeleteTarget(p)}
                          className="flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50/70 px-3.5 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 hover:border-rose-300 transition-all shadow-sm"
                          title="Delete patient and related records"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!filteredPatients.length && !loading && (
            <div className="p-12 text-center text-slate-400">
              <Users className="mx-auto h-12 w-12 text-slate-300 mb-3" />
              <p className="font-bold text-slate-700">No patients found</p>
              <p className="text-xs text-slate-400 mt-1">
                {search ? "No matching patients for your search criteria." : "No registered patients yet."}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* ======================================================== */}
      {/* CONFIRM DELETE MODAL                                      */}
      {/* ======================================================== */}
      {deleteTarget && (
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
                  <strong className="text-slate-900">{deleteTarget.name}</strong> ({deleteTarget.email})?
                </p>
                <p className="mt-1 text-[11px] text-rose-600 font-medium">
                  ⚠️ This will permanently remove all associated appointments, prescriptions, and uploaded medical reports.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deleteLoading}
                className="rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
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
