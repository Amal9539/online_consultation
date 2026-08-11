
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
// Card,
// CardContent,
// CardDescription,
// CardHeader,
// CardTitle,
// } from "@/components/ui/card";

// export default function RegisterPage() {
// const router = useRouter();

// const [form, setForm] = useState({
// name: "",
// email: "",
// phone: "",
// password: "",
// confirmPassword: "",
// });

// const [error, setError] = useState("");
// const [loading, setLoading] = useState(false);

// function update(key, value) {
// setForm((previous) => ({
// ...previous,
// [key]: value,
// }));
// }

// async function submit(e) {
// e.preventDefault();
// setError("");


// if (!form.name || !form.email || !form.password) {
//   setError("Please fill in all required fields.");
//   return;
// }

// if (form.password !== form.confirmPassword) {
//   setError("Passwords do not match.");
//   return;
// }

// if (form.password.length < 6) {
//   setError("Password must be at least 6 characters.");
//   return;
// }

// setLoading(true);

// try {
//   const res = await fetch("/api/auth/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: form.name,
//       email: form.email,
//       phone: form.phone,
//       password: form.password,
//     }),
//   });

//   const contentType = res.headers.get("content-type") || "";

//   let data;

//   if (contentType.includes("application/json")) {
//     data = await res.json();
//   } else {
//     const text = await res.text();
//     console.error("API returned non-JSON response:", text);

//     throw new Error(
//       "Registration API returned an invalid response. Check your API route."
//     );
//   }

//   if (!res.ok) {
//     throw new Error(data.message || "Registration failed.");
//   }

//   router.push("/login");
// } catch (err) {
//   console.error("Registration error:", err);
//   setError(err.message || "Something went wrong.");
// } finally {
//   setLoading(false);
// }


// }

// return ( <main className="min-h-screen bg-[#f8f5e9] flex items-center justify-center px-4 py-12"> <Card className="w-full max-w-md shadow-lg"> <CardHeader className="text-center"> <CardTitle className="text-2xl">
// Create Patient Account </CardTitle>


//       <CardDescription>
//         Register to book an Ayurveda consultation.
//       </CardDescription>
//     </CardHeader>

//     <CardContent>
//       {error && (
//         <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           {error}
//         </div>
//       )}

//       <form onSubmit={submit} className="space-y-5">
//         <Field
//           label="Full Name"
//           value={form.name}
//           onChange={(value) => update("name", value)}
//           required
//         />

//         <Field
//           label="Email"
//           type="email"
//           value={form.email}
//           onChange={(value) => update("email", value)}
//           required
//         />

//         <Field
//           label="Phone"
//           type="tel"
//           value={form.phone}
//           onChange={(value) => update("phone", value)}
//         />

//         <Field
//           label="Password"
//           type="password"
//           value={form.password}
//           onChange={(value) => update("password", value)}
//           required
//         />

//         <Field
//           label="Confirm Password"
//           type="password"
//           value={form.confirmPassword}
//           onChange={(value) => update("confirmPassword", value)}
//           required
//         />

//         <Button
//           type="submit"
//           className="w-full"
//           disabled={loading}
//         >
//           {loading ? "Creating..." : "Create Account"}
//         </Button>
//       </form>

//       <p className="mt-6 text-center text-sm text-gray-600">
//         Already registered?{" "}
//         <Link
//           href="/login"
//           className="font-medium text-green-700 hover:underline"
//         >
//           Login
//         </Link>
//       </p>
//     </CardContent>
//   </Card>
// </main>


// );
// }

// function Field({
// label,
// type = "text",
// value,
// onChange,
// required = false,
// }) {
// return ( <div className="space-y-2"> <Label>{label}</Label>


//   <Input
//     type={type}
//     value={value}
//     onChange={(e) => onChange(e.target.value)}
//     required={required}
//   />
// </div>


// );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(key, value) {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  async function submit(e) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      const contentType = res.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.error("API returned non-JSON response:", text);

        throw new Error(
          "Registration API returned an invalid response. Check your API route."
        );
      }

      if (!res.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      router.push("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7EFE1] md:grid md:grid-cols-2">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Nunito+Sans:wght@400;500;600;700&display=swap");

        .font-display3 {
          font-family: "DM Serif Display", serif;
        }
        .font-body3 {
          font-family: "Nunito Sans", sans-serif;
        }
      `}</style>

      {/* LEFT — illustrated panel with hand-torn edge */}
      <div
        className="relative hidden bg-[#C1502E] md:block"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 4%, 97% 7%, 100% 11%, 98% 15%, 100% 19%, 96% 23%, 100% 27%, 97% 31%, 100% 35%, 98% 39%, 100% 43%, 96% 47%, 100% 51%, 97% 55%, 100% 59%, 98% 63%, 100% 67%, 96% 71%, 100% 75%, 97% 79%, 100% 83%, 98% 87%, 100% 91%, 96% 95%, 100% 100%, 0 100%)",
        }}
      >
        <ClayPanel />
      </div>

      {/* RIGHT — form */}
      <div className="font-body3 relative z-10 flex items-center justify-center px-6 py-16 sm:px-10">
        <div className="w-full max-w-sm">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#C1502E]">
            Ayurveda Clinic
          </p>

          <h1 className="font-display3 text-[2.3rem] leading-[1.15] text-[#2E2620]">
            Your journey to
            <br />
            wellness starts here
          </h1>

          <p className="mt-4 mb-8 text-[15px] leading-relaxed text-[#5E5245]">
            Register to book a consultation and receive a treatment
            plan suited to your constitution.
          </p>

          {error && (
            <div className="mb-6 rounded-lg border border-[#C1502E]/30 bg-[#C1502E]/[0.08] px-4 py-3 text-sm text-[#C1502E]">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <Field
              label="Full name"
              value={form.name}
              onChange={(value) => update("name", value)}
              required
            />

            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(value) => update("email", value)}
              required
            />

            <Field
              label="Phone"
              type="tel"
              value={form.phone}
              onChange={(value) => update("phone", value)}
            />

            <Field
              label="Password"
              type="password"
              value={form.password}
              onChange={(value) => update("password", value)}
              required
            />

            <Field
              label="Confirm password"
              type="password"
              value={form.confirmPassword}
              onChange={(value) => update("confirmPassword", value)}
              required
            />

            <Button
              type="submit"
              disabled={loading}
              className="mt-3 w-full rounded-tr-3xl rounded-bl-3xl bg-[#C1502E] py-6 text-[15px] font-bold tracking-wide text-[#F7EFE1] hover:bg-[#a8431f] disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Create account"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-[#5E5245]">
            Already registered?{" "}
            <Link
              href="/login"
              className="font-bold text-[#C1502E] hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

function Field({ label, type = "text", value, onChange, required = false }) {
  return (
    <div className="space-y-1.5">
      <Label className="font-body3 text-[13px] font-semibold text-[#5E5245]">
        {label}
        {required && <span className="ml-0.5 text-[#C1502E]">*</span>}
      </Label>

      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="rounded-lg border border-[#2E2620]/15 bg-white px-4 py-5 text-[#2E2620] shadow-none focus-visible:border-[#C1502E] focus-visible:ring-1 focus-visible:ring-[#C1502E]"
      />
    </div>
  );
}

function ClayPanel() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between p-12">
      {/* turmeric-speck texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="specks"
            x="0"
            y="0"
            width="34"
            height="34"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.4" fill="#E8A33D" />
            <circle cx="18" cy="12" r="1" fill="#F7EFE1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#specks)" />
      </svg>

      <div className="font-body3 relative z-10 text-[13px] font-semibold uppercase tracking-[0.3em] text-[#F7EFE1]/70">
        Rooted in Tradition
      </div>

      {/* hand-drawn kalasha (pot) illustration */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <svg
          viewBox="0 0 320 380"
          className="h-72 w-auto"
          aria-hidden="true"
        >
          {/* sun rays */}
          <g stroke="#E8A33D" strokeWidth="2.5" strokeLinecap="round" opacity="0.8">
            {[...Array(9)].map((_, i) => {
              const angle = (-140 + i * 20) * (Math.PI / 180);
              const r1 = 96;
              const r2 = 118;
              const cx = 160;
              const cy = 130;
              return (
                <line
                  key={i}
                  x1={cx + r1 * Math.cos(angle)}
                  y1={cy + r1 * Math.sin(angle)}
                  x2={cx + r2 * Math.cos(angle)}
                  y2={cy + r2 * Math.sin(angle)}
                />
              );
            })}
          </g>
          <circle cx="160" cy="130" r="58" fill="none" stroke="#F7EFE1" strokeWidth="1.5" opacity="0.5" />

          {/* pot (kalasha) */}
          <path
            d="M110 230 C 105 200, 118 185, 160 185 C 202 185, 215 200, 210 230 L 220 320 C 220 345, 195 358, 160 358 C 125 358, 100 345, 100 320 Z"
            fill="#F7EFE1"
            stroke="#2E2620"
            strokeWidth="2"
          />
          <ellipse cx="160" cy="185" rx="50" ry="10" fill="#E8A33D" stroke="#2E2620" strokeWidth="2" />
          <rect x="148" y="165" width="24" height="24" rx="3" fill="#F7EFE1" stroke="#2E2620" strokeWidth="2" />
          <path d="M108 262 C 140 270, 180 270, 212 262" fill="none" stroke="#2E2620" strokeWidth="1.5" opacity="0.5" />
          <path d="M104 296 C 140 306, 180 306, 216 296" fill="none" stroke="#2E2620" strokeWidth="1.5" opacity="0.5" />

          {/* herb sprigs */}
          <g stroke="#7C8B6F" strokeWidth="2.5" strokeLinecap="round" fill="none">
            <path d="M160 165 C 150 130, 130 110, 108 92" />
            <path d="M160 165 C 172 128, 195 108, 220 90" />
            <path d="M160 165 C 160 118, 160 95, 160 68" />
          </g>
          <g fill="#7C8B6F">
            {[
              [108, 92], [122, 112], [96, 78],
              [220, 90], [206, 108], [232, 76],
              [160, 68], [146, 84], [174, 84],
            ].map(([x, y], i) => (
              <ellipse
                key={i}
                cx={x}
                cy={y}
                rx="9"
                ry="4.5"
                transform={`rotate(${(i * 37) % 180} ${x} ${y})`}
              />
            ))}
          </g>
        </svg>
      </div>

      <blockquote className="font-display3 relative z-10 max-w-sm text-[1.55rem] italic leading-[1.35] text-[#F7EFE1]">
        "Ayurveda teaches us that we are a reflection of what surrounds
        us."
        <footer className="font-body3 mt-4 text-[12px] not-italic font-semibold uppercase tracking-[0.2em] text-[#F7EFE1]/50">
          Ayurvedic teaching
        </footer>
      </blockquote>
    </div>
  );
}