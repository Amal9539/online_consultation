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
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
    <main className="min-h-screen flex items-center justify-center bg-[#F8F5E9] px-4 py-10">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">
            Welcome Back
          </CardTitle>

          <CardDescription>
            Login to your ARAYAL account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* autoComplete="off" on the <form> itself, plus per-field overrides below,
              gives the best chance of stopping Chrome/Edge from auto-filling saved
              credentials into these fields. */}
          <form onSubmit={submit} className="space-y-6" autoComplete="off">
            {/* Error */}
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-600">
                  {error}
                </p>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
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
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">
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
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            {/* Register */}
            <p className="text-center text-sm text-gray-600">
              New patient?{" "}
              <Link
                href="/register"
                className="font-medium text-green-700 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}