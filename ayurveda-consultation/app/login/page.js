"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(form),
});

console.log("STATUS:", res.status);

const text = await res.text();

console.log("RAW RESPONSE:", text);

let data;

try {
  data = JSON.parse(text);
} catch (error) {
  console.error("NOT JSON:", text);
  throw new Error("API returned HTML instead of JSON");
}

if (!res.ok) {
  throw new Error(data.message || "Login failed");
}

console.log("LOGIN SUCCESS:", data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container flex min-h-[calc(100vh-128px)] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Login to your ARAYAL account.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}
          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
            </div>
            <Button className="w-full" disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
          </form>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            New patient? <Link href="/register" className="font-medium text-primary">Create an account</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
