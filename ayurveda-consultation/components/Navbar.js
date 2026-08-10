"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setChecked(true));
  }, [pathname]); // re-check auth whenever the route changes (e.g. after login redirect)

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/login");
    router.refresh();
  }

  const dashboardHref = user?.role === "ADMIN" ? "/admin/dashboard" : "/patient/dashboard";

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <Leaf className="h-6 w-6" />
          ARAYAL
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>

          {/* Avoid flashing the wrong state before the auth check resolves */}
          {checked && (
            user ? (
              <>
                <Link href={dashboardHref}>Dashboard</Link>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">
                  <Button>Book Consultation</Button>
                </Link>
              </>
            )
          )}
        </nav>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-white p-4 md:hidden">
          <nav className="container flex flex-col gap-4">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>

            {checked && (
              user ? (
                <>
                  <Link href={dashboardHref} onClick={() => setOpen(false)}>Dashboard</Link>
                  <button
                    className="text-left"
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
                  <Link href="/register" onClick={() => setOpen(false)}>Book Consultation</Link>
                </>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}