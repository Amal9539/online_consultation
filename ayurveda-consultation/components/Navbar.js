"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  User,
  UserPlus,
  LogOut,
  ChevronDown,
  Shield,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Sparkles,
  ExternalLink,
  LayoutDashboard,
  Users,
  CalendarDays,
  Pill,
  FolderHeart,
  Globe,
  Stethoscope,
  Leaf,
  CalendarPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarDrawerOpen, setSidebarDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const dropdownRef = useRef(null);

  // Sync user state from localStorage and verify with API
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {}

    // Verify session and fetch full profile details
    fetch("/api/profile")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not logged in");
      })
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          setProfileData(data.user);
          try {
            localStorage.setItem("user", JSON.stringify(data.user));
          } catch {}
        }
      })
      .catch(() => {
        // Not authenticated on server
      });
  }, [pathname]);

  // Close drawers & dropdowns on navigation change
  useEffect(() => {
    setSidebarDrawerOpen(false);
    setMobileMenuOpen(false);
    setShowUserDetails(false);
  }, [pathname]);

  // Close user details dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDetails(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch {}
    setUser(null);
    setProfileData(null);
    setShowUserDetails(false);
    setSidebarDrawerOpen(false);
    window.location.href = "/";
  }

  const isLoggedIn = !!user;

  // Determine where logo links to
  const logoHref = !isLoggedIn
    ? "/"
    : user?.role === "ADMIN"
    ? "/admin/dashboard"
    : "/patient/dashboard";

  // Public Navigation Links (Image 1 reference)
  const publicNavLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/#consultation", label: "Consultation" },
    { href: "/#benefits", label: "Our Benefits" },
    { href: "/#faq", label: "FAQs" },
    { href: "/#contact", label: "Contact" },
  ];

  // Doctor Navigation items
  const doctorNavLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/patients", label: "Patients", icon: Users },
    { href: "/admin/appointments", label: "Appointments", icon: CalendarDays },
    { href: "/admin/prescriptions", label: "Prescriptions", icon: Pill },
    { href: "/", label: "Website", icon: Globe },
  ];

  // Patient Navigation items
  const patientNavLinks = [
    { href: "/patient/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/patient/book-appointment", label: "Book Consultation", icon: CalendarPlus },
    { href: "/patient/appointments", label: "My Appointments", icon: CalendarDays },
    { href: "/patient/reports", label: "Health Records", icon: FolderHeart },
    { href: "/patient/prescriptions", label: "Consultation History", icon: Pill },
    { href: "/patient/profile", label: "Profile Settings", icon: User },
    { href: "/", label: "Website", icon: Globe },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-emerald-950/10 bg-[#fdfbf7]/95 backdrop-blur-md transition-all">
        <div className="w-full px-4 sm:px-6 md:px-8 flex h-20 items-center justify-between">
          {/* Left: Hamburger (Left-to-Right Drawer Trigger) + Brand Logo on left-most side */}
          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <button
                onClick={() => setSidebarDrawerOpen(!sidebarDrawerOpen)}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-900/15 bg-emerald-50 text-[#143d23] hover:bg-emerald-100 hover:border-emerald-700 transition-all shadow-sm"
                aria-label="Toggle Navigation Sidebar"
                title={user?.role === "ADMIN" ? "Doctor Menu (Open Sidebar)" : "Menu (Open Sidebar)"}
              >
                <Menu className="h-5 w-5" />
              </button>
            )}

            {/* Logo */}
            <Link href={logoHref} className="group flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <Image
                  src="/images/arayal-logo-clean.png"
                  alt="Arayal Ayurveda"
                  width={150}
                  height={52}
                  priority
                  className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </div>
            </Link>
          </div>

          {/* ========================================================= */}
          {/* STATE 1: NOT LOGGED IN (Public Visitors)                 */}
          {/* ========================================================= */}
          {!isLoggedIn ? (
            <>
              {/* Desktop Nav Links */}
              <nav className="hidden items-center gap-1 lg:flex">
                {publicNavLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[#1c5c36] text-white shadow-sm"
                          : "text-[#1c3c26] hover:bg-emerald-50 hover:text-[#1c5c36]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Login & Register Buttons (Pill styling matching Image 1) */}
              <div className="hidden items-center gap-3 sm:flex">
                <Link href="/login">
                  <button className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-[#1c5c36] hover:text-[#1c5c36]">
                    <User className="h-4 w-4" />
                    <span>Login</span>
                  </button>
                </Link>
                <Link href="/register">
                  <button className="flex items-center gap-2 rounded-full bg-[#1c5c36] px-5 py-2 text-sm font-medium text-white shadow-md shadow-[#1c5c36]/20 transition hover:bg-[#154629]">
                    <UserPlus className="h-4 w-4" />
                    <span>Register</span>
                  </button>
                </Link>
              </div>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-900/10 text-[#1c3c26] hover:bg-emerald-50 lg:hidden"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </>
          ) : (
            /* ========================================================= */
            /* STATE 2: LOGGED IN (User requirements applied!)           */
            /* - REMOVE: Home, About, Consultation, Book Consultation,   */
            /*   Login, Register                                         */
            /* - ONLY NEED: Name, Logout button, and User Icon button    */
            /* - Clicking user icon opens User Details                   */
            /* ========================================================= */
            <div className="flex items-center gap-3 md:gap-5">
              {/* User Name */}
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold text-[#143d23]">
                  {user?.name || (user?.role === "ADMIN" ? "Dr. Princy" : "Patient")}
                </p>
                <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-700">
                  {user?.role === "ADMIN" ? "Doctor / Consultant" : "Patient"}
                </p>
              </div>

              {/* User Icon Button with Dropdown Trigger */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowUserDetails(!showUserDetails)}
                  className={`group flex items-center gap-2 rounded-full border border-emerald-700/20 bg-emerald-50/70 p-1.5 pr-2.5 transition-all hover:border-emerald-600 hover:bg-emerald-100 ${
                    showUserDetails ? "ring-2 ring-[#1c5c36]/30 bg-emerald-100" : ""
                  }`}
                  aria-label="View user profile details"
                  title="Click to view details"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1c5c36] text-sm font-bold text-white shadow-sm transition-transform group-hover:scale-105">
                    {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-emerald-800 transition-transform duration-200 ${
                      showUserDetails ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* USER DETAILS FLOATING CARD (Opens on click) */}
                {showUserDetails && (
                  <div className="absolute right-0 top-full mt-3 w-80 rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-2xl ring-1 ring-black/5 animate-in">
                    {/* Header with Avatar & Name */}
                    <div className="flex items-start justify-between border-b border-emerald-950/10 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#1c5c36] to-[#0f361f] text-lg font-bold text-white shadow-md">
                          {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-bold text-slate-900">{user?.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                            <Shield className="h-3 w-3" />
                            {user?.role}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowUserDetails(false)}
                        className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Detailed User Information */}
                    <div className="my-4 space-y-2.5 text-xs">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
                        {user?.role === "ADMIN" ? "Doctor Information" : "Patient Information"}
                      </p>

                      <div className="flex items-center justify-between rounded-lg bg-emerald-50/50 p-2 text-slate-700">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Phone className="h-3.5 w-3.5 text-emerald-600" /> Phone
                        </span>
                        <span className="font-medium text-slate-900">
                          {profileData?.phone || "Not provided"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-lg bg-emerald-50/50 p-2 text-slate-700">
                          <span className="text-muted-foreground">Age</span>
                          <p className="font-medium text-slate-900">
                            {profileData?.age ? `${profileData.age} yrs` : "—"}
                          </p>
                        </div>
                        <div className="rounded-lg bg-emerald-50/50 p-2 text-slate-700">
                          <span className="text-muted-foreground">Gender</span>
                          <p className="font-medium text-slate-900">
                            {profileData?.gender || "—"}
                          </p>
                        </div>
                      </div>

                      {profileData?.address && (
                        <div className="rounded-lg bg-emerald-50/50 p-2 text-slate-700">
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 text-emerald-600" /> Address
                          </span>
                          <p className="mt-0.5 font-medium text-slate-900 truncate">
                            {profileData.address}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Quick Action Links */}
                    <div className="space-y-1.5 border-t border-emerald-950/10 pt-3">
                      <Link
                        href={user?.role === "ADMIN" ? "/admin/dashboard" : "/patient/dashboard"}
                        onClick={() => setShowUserDetails(false)}
                        className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#1c5c36] hover:bg-emerald-50"
                      >
                        <span>Open Dashboard</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>

                      {user?.role === "PATIENT" && (
                        <Link
                          href="/patient/profile"
                          onClick={() => setShowUserDetails(false)}
                          className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
                        >
                          <span>Edit Profile Settings</span>
                          <User className="h-3.5 w-3.5" />
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                      >
                        <span>Logout</span>
                        <LogOut className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Dedicated Logout Button (Prominently visible as requested!) */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50/60 px-4 py-2 text-xs font-semibold text-rose-700 transition-all hover:border-rose-300 hover:bg-rose-100"
                title="Logout from account"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer (For Public Visitors) */}
        {!isLoggedIn && mobileMenuOpen && (
          <div className="border-t border-emerald-900/10 bg-[#fdfbf7] p-5 lg:hidden">
            <nav className="flex flex-col gap-2">
              {publicNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium ${
                    pathname === link.href
                      ? "bg-[#1c5c36] text-white"
                      : "text-slate-800 hover:bg-emerald-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-200 pt-3">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full rounded-full border border-slate-300 bg-white py-2.5 text-sm font-medium text-slate-800">
                    Login
                  </button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full rounded-full bg-[#1c5c36] py-2.5 text-sm font-medium text-white">
                    Register
                  </button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* NEW SIDE BAR: COMES IN FROM LEFT TO RIGHT (Exact User Request!)           */}
      {/* - Triggered by Hamburger Button                                           */}
      {/* - Slides in smoothly from left to right (translate-x-0)                   */}
      {/* - Translucent background overlay to dismiss                              */}
      {/* ========================================================================= */}
      {isLoggedIn && (
        <>
          {/* Backdrop Overlay */}
          <div
            onClick={() => setSidebarDrawerOpen(false)}
            className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              sidebarDrawerOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          />

          {/* Left-to-Right Off-Canvas Sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#073319] text-white p-6 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out border-r border-emerald-900/40 ${
              sidebarDrawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div>
              {/* Drawer Top Header: Logo + Close Button */}
              <div className="flex items-center justify-between border-b border-emerald-900/40 pb-5">
                <Link
                  href={logoHref}
                  onClick={() => setSidebarDrawerOpen(false)}
                  className="flex items-center gap-2"
                >
                  <Image
                    src="/images/arayal-logo-clean.png"
                    alt="Arayal"
                    width={140}
                    height={48}
                    className="h-10 w-auto object-contain brightness-125"
                  />
                </Link>

                <button
                  onClick={() => setSidebarDrawerOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-900/50 text-emerald-200 hover:bg-emerald-800 hover:text-white transition-colors"
                  aria-label="Close sidebar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* User/Doctor Badge */}
              <div className="my-5 rounded-2xl bg-emerald-900/40 border border-emerald-800/40 p-3.5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#18532f] to-[#0c311a] text-white font-bold text-sm shadow-md">
                  {user?.role === "ADMIN" ? (
                    <Stethoscope className="h-5 w-5 text-emerald-300" />
                  ) : (
                    user?.name?.charAt(0).toUpperCase() || <User className="h-5 w-5" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-white">
                    {user?.name || "Dr. Princy"}
                  </p>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                    {user?.role === "ADMIN" ? "Doctor / Admin Panel" : "Patient Portal"}
                  </span>
                </div>
              </div>

              {/* Navigation Items (Doctor or Patient) */}
              <nav className="space-y-1.5">
                {(user?.role === "ADMIN" ? doctorNavLinks : patientNavLinks).map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/admin/dashboard" || item.href === "/patient/dashboard" || item.href === "/"
                      ? pathname === item.href
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setSidebarDrawerOpen(false)}
                      className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-xs font-medium transition-all ${
                        isActive
                          ? "bg-[#18532f] text-white shadow-md shadow-emerald-950/40 font-semibold border-l-4 border-emerald-400"
                          : "text-emerald-100/80 hover:bg-[#0f4423] hover:text-white"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${isActive ? "text-emerald-300" : "text-emerald-400/80"}`}
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-xs font-medium text-emerald-200/70 transition-all hover:bg-rose-950/40 hover:text-rose-300 mt-2"
                >
                  <LogOut className="h-4 w-4 text-emerald-400/80" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>

            {/* Drawer Bottom Tagline */}
            <div className="border-t border-emerald-900/40 pt-5 text-center">
              <div className="mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-900/40 text-emerald-400">
                <Leaf className="h-3.5 w-3.5" />
              </div>
              <p className="font-serif text-[11px] italic tracking-wide text-emerald-300/80">
                Stay Healthy... Live Naturally...
              </p>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
