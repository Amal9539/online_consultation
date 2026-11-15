"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, CalendarDays, Pill, Home } from "lucide-react";

const links = [
  ["/admin/dashboard", "Dashboard", LayoutDashboard],
  ["/admin/patients", "Patients", Users],
  ["/admin/appointments", "Appointments", CalendarDays],
  ["/admin/prescriptions", "Prescriptions", Pill]
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 bg-slate-950 p-4 text-white md:min-h-[calc(100vh-64px)] md:w-64">
      <div className="mb-5 text-lg font-bold">DOCTOR / ADMIN</div>
      <nav className="grid gap-1">
        {links.map(([href, label, Icon]) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
              pathname === href ? "bg-primary text-white" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
        <Link href="/" className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800">
          <Home className="h-4 w-4" /> Website
        </Link>
      </nav>
    </aside>
  );
}
