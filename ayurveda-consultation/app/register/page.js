// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// export default function RegisterPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function submit(e) {
//     e.preventDefault();
//     setError("");
//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: form.name,
//           email: form.email,
//           phone: form.phone,
//           password: form.password
//         })
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Registration failed");
//       router.push("/login");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const update = (key, value) => setForm({ ...form, [key]: value });

//   return (
//     <main className="container flex min-h-[calc(100vh-128px)] items-center justify-center py-12">
//       <Card className="w-full max-w-lg">
//         <CardHeader>
//           <CardTitle className="text-2xl">Create Patient Account</CardTitle>
//           <CardDescription>Register to book an Ayurveda consultation.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}
//           <form onSubmit={submit} className="grid gap-5">
//             <Field label="Full Name" value={form.name} onChange={v => update("name", v)} required />
//             <Field label="Email" type="email" value={form.email} onChange={v => update("email", v)} required />
//             <Field label="Phone" value={form.phone} onChange={v => update("phone", v)} />
//             <Field label="Password" type="password" value={form.password} onChange={v => update("password", v)} required />
//             <Field label="Confirm Password" type="password" value={form.confirmPassword} onChange={v => update("confirmPassword", v)} required />
//             <Button disabled={loading}>{loading ? "Creating..." : "Create Account"}</Button>
//           </form>
//           <p className="mt-5 text-center text-sm text-muted-foreground">
//             Already registered? <Link href="/login" className="font-medium text-primary">Login</Link>
//           </p>
//         </CardContent>
//       </Card>
//     </main>
//   );
// }

// function Field({ label, type = "text", value, onChange, required }) {
//   return (
//     <div className="space-y-2">
//       <Label>{label}</Label>
//       <Input type={type} value={value} onChange={e => onChange(e.target.value)} required={required} />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
Card,
CardContent,
CardDescription,
CardHeader,
CardTitle,
} from "@/components/ui/card";

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

return ( <main className="min-h-screen bg-[#f8f5e9] flex items-center justify-center px-4 py-12"> <Card className="w-full max-w-md shadow-lg"> <CardHeader className="text-center"> <CardTitle className="text-2xl">
Create Patient Account </CardTitle>


      <CardDescription>
        Register to book an Ayurveda consultation.
      </CardDescription>
    </CardHeader>

    <CardContent>
      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-5">
        <Field
          label="Full Name"
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
          label="Confirm Password"
          type="password"
          value={form.confirmPassword}
          onChange={(value) => update("confirmPassword", value)}
          required
        />

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already registered?{" "}
        <Link
          href="/login"
          className="font-medium text-green-700 hover:underline"
        >
          Login
        </Link>
      </p>
    </CardContent>
  </Card>
</main>


);
}

function Field({
label,
type = "text",
value,
onChange,
required = false,
}) {
return ( <div className="space-y-2"> <Label>{label}</Label>


  <Input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    required={required}
  />
</div>


);
}
