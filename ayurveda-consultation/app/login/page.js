// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";

// export default function LoginPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   function handleChange(e) {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   async function submit(e) {
//     e.preventDefault();

//     setError("");
//     setLoading(true);

//     // DEBUG: confirm exactly what's being submitted before it's sent.
//     // Remove this once the login issue is confirmed fixed.
//     console.log("DEBUG email:", JSON.stringify(form.email));
//     console.log("DEBUG password:", JSON.stringify(form.password));
//     console.log("DEBUG password length:", form.password.length);

//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: form.email.trim().toLowerCase(),
//           password: form.password,
//         }),
//       });

//       console.log("STATUS:", res.status);

//       const text = await res.text();

//       console.log("RAW RESPONSE:", text);

//       let data;

//       try {
//         data = JSON.parse(text);
//       } catch (jsonError) {
//         console.error("NOT JSON:", text);

//         throw new Error(
//           "Server returned an invalid response. Please check the login API."
//         );
//       }

//       if (!res.ok) {
//         throw new Error(data.message || "Invalid email or password.");
//       }

//       console.log("LOGIN SUCCESS:", data);

//       // Login successful — route based on role instead of a hardcoded /dashboard
//       if (data.user?.role === "ADMIN") {
//         router.push("/admin/dashboard");
//       } else {
//         router.push("/patient/dashboard");
//       }
//       router.refresh();
//     } catch (err) {
//       console.error("LOGIN ERROR:", err);

//       setError(
//         err instanceof Error
//           ? err.message
//           : "Something went wrong. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-[#F8F5E9] px-4 py-10">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader className="space-y-2 text-center">
//           <CardTitle className="text-3xl font-bold">
//             Welcome Back
//           </CardTitle>

//           <CardDescription>
//             Login to your ARAYAL account.
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           {/* autoComplete="off" on the <form> itself, plus per-field overrides below,
//               gives the best chance of stopping Chrome/Edge from auto-filling saved
//               credentials into these fields. */}
//           <form onSubmit={submit} className="space-y-6" autoComplete="off">
//             {/* Error */}
//             {error && (
//               <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3">
//                 <p className="text-sm text-red-600">
//                   {error}
//                 </p>
//               </div>
//             )}

//             {/* Email */}
//             <div className="space-y-2">
//               <Label htmlFor="email">
//                 Email
//               </Label>

//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//                 disabled={loading}
//                 autoComplete="off"
//               />
//             </div>

//             {/* Password */}
//             <div className="space-y-2">
//               <Label htmlFor="password">
//                 Password
//               </Label>

//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//                 disabled={loading}
//                 autoComplete="new-password"
//               />
//             </div>

//             {/* Login Button */}
//             <Button
//               type="submit"
//               className="w-full"
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </Button>

//             {/* Register */}
//             <p className="text-center text-sm text-gray-600">
//               New patient?{" "}
//               <Link
//                 href="/register"
//                 className="font-medium text-green-700 hover:underline"
//               >
//                 Create an account
//               </Link>
//             </p>
//           </form>
//         </CardContent>
//       </Card>
//     </main>
//   );
// }




"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function submit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    // DEBUG: confirm exactly what's being submitted before it's sent.
    // Remove this once the login issue is confirmed fixed.
    console.log("DEBUG email:", JSON.stringify(form.email));
    console.log("DEBUG password:", JSON.stringify(form.password));
    console.log("DEBUG password length:", form.password.length);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }),
      });

      console.log("STATUS:", res.status);

      const text = await res.text();

      console.log("RAW RESPONSE:", text);

      let data;

      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error("NOT JSON:", text);

        throw new Error(
          "Server returned an invalid response. Please check the login API."
        );
      }

      if (!res.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }

      console.log("LOGIN SUCCESS:", data);

      // Login successful — route based on role instead of a hardcoded /dashboard
      if (data.user?.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/patient/dashboard");
      }
      router.refresh();
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-10">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Work+Sans:wght@400;500;600&display=swap");

        .font-display {
          font-family: "Fraunces", serif;
        }
        .font-body {
          font-family: "Work Sans", sans-serif;
        }
      `}</style>

      {/* background photo — replace src with your own licensed image */}
      <img
        src="/images/ayurveda-hero.jpg"
        alt="Ayurvedic herbs and preparation"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* duotone color wash so the photo matches the palette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(42,64,52,0.90) 0%, rgba(42,64,52,0.78) 55%, rgba(201,144,44,0.45) 100%)",
          mixBlendMode: "multiply",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[#1C2B22]/45" />

      {/* fine grain */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08] mix-blend-overlay"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1.5" fill="#C6902B" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* card */}
      <div className="font-body relative z-10 w-full max-w-md rounded-sm bg-[#FBF6EC] px-8 py-10 shadow-xl sm:px-10">
        <div className="mb-8 text-center">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[#B15A34]">
            Ayurveda Wellness Center
          </p>

          <h1 className="font-display text-[2rem] leading-[1.15] text-[#2B2620]">
            Welcome back
          </h1>

          <div className="mx-auto mt-4 h-px w-14 bg-[#C6902B]" />

          <p className="mt-4 text-[15px] leading-relaxed text-[#5B5347]">
            Log in to your ARAYAL account.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-5" autoComplete="off">
          {error && (
            <div className="rounded-sm border border-[#B15A34]/30 bg-[#B15A34]/[0.06] px-4 py-3">
              <p className="text-sm text-[#8C4527]">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="font-body text-[13px] font-medium text-[#5B5347]"
            >
              Email
            </Label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={loading}
              autoComplete="off"
              className="rounded-none border-0 border-b border-[#2B2620]/20 bg-transparent px-0 py-2 text-[#2B2620] shadow-none focus-visible:border-[#2A4034] focus-visible:ring-0"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="font-body text-[13px] font-medium text-[#5B5347]"
            >
              Password
            </Label>

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={loading}
              autoComplete="new-password"
              className="rounded-none border-0 border-b border-[#2B2620]/20 bg-transparent px-0 py-2 text-[#2B2620] shadow-none focus-visible:border-[#2A4034] focus-visible:ring-0"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-sm bg-[#2A4034] py-5 text-[15px] font-medium tracking-wide text-[#FBF6EC] hover:bg-[#243729] disabled:opacity-60"
          >
            {loading ? "Logging in…" : "Log in"}
          </Button>

          <p className="text-center text-sm text-[#5B5347]">
            New patient?{" "}
            <Link
              href="/register"
              className="font-medium text-[#8C4527] hover:underline"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}