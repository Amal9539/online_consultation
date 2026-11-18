"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Check for logged-in user
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, [pathname]);

  // Fetch profile details when dropdown is opened
  useEffect(() => {
    if (dropdown && !profileData) {
      fetch("/api/profile")
        .then((r) => r.json())
        .then((d) => d.user && setProfileData(d.user))
        .catch(() => {});
    }
  }, [dropdown, profileData]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setProfileData(null);
    window.location.href = "/";
  }

  const isLoggedIn = !!user;

  // Don't show main navbar on admin/patient dashboard pages (they have their own sidebar)
  const isDashboard = pathname?.startsWith("/admin") || pathname?.startsWith("/patient");

  // === LOGGED-IN NAVBAR (for dashboard pages) ===
  if (isLoggedIn && isDashboard) {
    return (
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/arayal-logo.jpg" alt="Arayal" width={140} height={44} className="h-11 w-auto rounded-lg bg-black p-1" />
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm font-medium text-foreground sm:block">
              {user.name}
            </span>

            {/* User icon dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-1.5 rounded-full border-2 border-primary/20 bg-green-50 p-1.5 transition hover:border-primary/40 hover:bg-green-100"
                aria-label="User menu"
              >
                <User className="h-5 w-5 text-primary" />
                <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${dropdown ? "rotate-180" : ""}`} />
              </button>

              {dropdown && (
                <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border bg-white p-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User info */}
                  <div className="mb-3 flex items-center gap-3 border-b pb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold">
                      {user.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{user.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                      <span className="mt-0.5 inline-block rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-800">
                        {user.role}
                      </span>
                    </div>
                  </div>

                  {/* Profile details */}
                  {profileData && (
                    <div className="mb-3 space-y-1.5 border-b pb-3 text-sm">
                      {profileData.phone && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Phone</span>
                          <span className="font-medium">{profileData.phone}</span>
                        </div>
                      )}
                      {profileData.age && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Age</span>
                          <span className="font-medium">{profileData.age}</span>
                        </div>
                      )}
                      {profileData.gender && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Gender</span>
                          <span className="font-medium">{profileData.gender}</span>
                        </div>
                      )}
                      {profileData.address && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Address</span>
                          <span className="text-right font-medium max-w-[160px] truncate">{profileData.address}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Profile link */}
                  {user.role === "PATIENT" && (
                    <Link
                      href="/patient/profile"
                      onClick={() => setDropdown(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition hover:bg-green-50"
                    >
                      <User className="h-4 w-4" /> Edit Profile
                    </Link>
                  )}

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }

  // === PUBLIC NAVBAR (not logged in, or on public pages) ===
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/#faq", label: "FAQs" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/arayal-logo.jpg" alt="Arayal" width={120} height={40} className="h-10 w-auto rounded" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                pathname === link.href
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-green-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <>
              <span className="text-sm font-medium">{user.name}</span>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="flex items-center gap-1.5 rounded-full border-2 border-primary/20 bg-green-50 p-1.5 transition hover:border-primary/40"
                >
                  <User className="h-5 w-5 text-primary" />
                  <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${dropdown ? "rotate-180" : ""}`} />
                </button>
                {dropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border bg-white p-2 shadow-xl">
                    <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" className="rounded-full gap-2">
                  <User className="h-4 w-4" /> Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="rounded-full gap-2">
                  <User className="h-4 w-4" /> Register
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t bg-white p-4 md:hidden">
          <nav className="container flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium ${
                  pathname === link.href ? "bg-primary text-white" : "hover:bg-green-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2" />
            {isLoggedIn ? (
              <button
                onClick={() => { setOpen(false); handleLogout(); }}
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-green-50">Login</Link>
                <Link href="/register" onClick={() => setOpen(false)} className="rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-white">Register</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
