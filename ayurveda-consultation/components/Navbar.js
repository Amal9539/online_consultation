// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { Menu, X, Leaf } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export default function Navbar() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [checked, setChecked] = useState(false);

//   useEffect(() => {
//     fetch("/api/auth/me", { credentials: "include" })
//       .then((r) => r.json())
//       .then((data) => setUser(data.user))
//       .catch(() => setUser(null))
//       .finally(() => setChecked(true));
//   }, [pathname]); // re-check auth whenever the route changes (e.g. after login redirect)

//   async function handleLogout() {
//     await fetch("/api/auth/logout", { method: "POST" });
//     setUser(null);
//     router.push("/login");
//     router.refresh();
//   }

//   const dashboardHref = user?.role === "ADMIN" ? "/admin/dashboard" : "/patient/dashboard";

//   return (
//     <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
//       <div className="container flex h-16 items-center justify-between">
//         <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
//           <Leaf className="h-6 w-6" />
//           ARAYAL
//         </Link>

//         <nav className="hidden items-center gap-6 md:flex">
//           <Link href="/">Home</Link>
//           <Link href="/about">About</Link>

//           {/* Avoid flashing the wrong state before the auth check resolves */}
//           {checked && (
//             user ? (
//               <>
//                 <Link href={dashboardHref}>Dashboard</Link>
//                 <Button variant="outline" onClick={handleLogout}>
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Link href="/login">Login</Link>
//                 <Link href="/register">
//                   <Button>Book Consultation</Button>
//                 </Link>
//               </>
//             )
//           )}
//         </nav>

//         <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
//           {open ? <X /> : <Menu />}
//         </button>
//       </div>

//       {open && (
//         <div className="border-t bg-white p-4 md:hidden">
//           <nav className="container flex flex-col gap-4">
//             <Link href="/" onClick={() => setOpen(false)}>Home</Link>
//             <Link href="/about" onClick={() => setOpen(false)}>About</Link>

//             {checked && (
//               user ? (
//                 <>
//                   <Link href={dashboardHref} onClick={() => setOpen(false)}>Dashboard</Link>
//                   <button
//                     className="text-left"
//                     onClick={() => {
//                       setOpen(false);
//                       handleLogout();
//                     }}
//                   >
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
//                   <Link href="/register" onClick={() => setOpen(false)}>Book Consultation</Link>
//                 </>
//               )
//             )}
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }



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
  }, [pathname]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/login");
    router.refresh();
  }

  const dashboardHref = user?.role === "ADMIN" ? "/admin/dashboard" : "/patient/dashboard";

  // Pages that render a fixed sidebar (w-64 = 256px)
  const hasSidebar = pathname.startsWith("/admin") || pathname.startsWith("/patient");

  return (
    <header
      className={`fixed top-4 right-4 z-50 ${
        hasSidebar ? "left-4 md:left-[272px]" : "left-4"
      }`}
    >
      <div className="flex h-16 items-center justify-between rounded-full bg-white/95 px-8 shadow-lg backdrop-blur">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-emerald-700">
          <Leaf className="h-6 w-6" />
          ARAYAL
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className={`text-sm font-medium ${
              pathname === "/" ? "border-b-2 border-emerald-700 text-gray-900" : "text-gray-700 hover:text-emerald-700"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium ${
              pathname === "/about" ? "border-b-2 border-emerald-700 text-gray-900" : "text-gray-700 hover:text-emerald-700"
            }`}
          >
            About
          </Link>

          {checked && (
            user ? (
              <>
                <Link href={dashboardHref} className="text-sm font-medium text-gray-700 hover:text-emerald-700">
                  Dashboard
                </Link>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="rounded-full border-emerald-700 text-emerald-700 hover:bg-emerald-50"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-emerald-700">
                  Login
                </Link>
                <Link href="/register">
                  <Button className="rounded-full bg-emerald-700 hover:bg-emerald-800">
                    Book Consultation
                  </Button>
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
        <div className="mt-2 rounded-3xl border bg-white p-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-4">
            <Link href="/" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-700">
              Home
            </Link>
            <Link href="/about" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-700">
              About
            </Link>

            {checked && (
              user ? (
                <>
                  <Link href={dashboardHref} onClick={() => setOpen(false)} className="text-sm font-medium text-gray-700">
                    Dashboard
                  </Link>
                  <button
                    className="text-left text-sm font-medium text-gray-700"
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
                  <Link href="/login" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-700">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-emerald-700 px-4 py-2 text-center text-sm font-semibold text-white"
                  >
                    Book Consultation
                  </Link>
                </>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}