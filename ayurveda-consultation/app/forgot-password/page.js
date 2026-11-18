"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { KeyRound, ArrowLeft, Mail, CheckCircle2, Lock } from "lucide-react";

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("");
  const [step, setStep] = useState(1);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleLookup(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Account not found");

      setStep(2);
      setSuccess("Account verified. Please enter your new password.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier,
          newPassword,
          confirmPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to reset password");

      setSuccess("Password updated successfully! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f5f8f3] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-emerald-950/10 bg-white p-8 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dbeee1] text-[#1c5c36]">
            <KeyRound className="h-7 w-7" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#143d23]">
            Forgot Password?
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            {step === 1
              ? "Enter your registered email or phone to reset your password"
              : "Create a new strong password for your account"}
          </p>
        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800">
            {success}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleLookup} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 block">
                Email Address or Mobile Number
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. name@example.com or 9846000000"
                  required
                  className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-xs text-slate-800 focus:border-[#1c5c36] focus:outline-none focus:ring-1 focus:ring-[#1c5c36]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#1c5c36] py-3 text-xs font-bold text-white shadow-md hover:bg-[#154629] transition-all disabled:opacity-70"
            >
              {loading ? "Checking..." : "Continue"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 block">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 6 characters)"
                required
                minLength={6}
                className="w-full rounded-xl border border-slate-300 py-3 px-4 text-xs text-slate-800 focus:border-[#1c5c36] focus:outline-none focus:ring-1 focus:ring-[#1c5c36]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 block">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                required
                minLength={6}
                className="w-full rounded-xl border border-slate-300 py-3 px-4 text-xs text-slate-800 focus:border-[#1c5c36] focus:outline-none focus:ring-1 focus:ring-[#1c5c36]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#1c5c36] py-3 text-xs font-bold text-white shadow-md hover:bg-[#154629] transition-all disabled:opacity-70"
            >
              {loading ? "Updating..." : "Reset & Save Password"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center border-t border-slate-100 pt-4">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1c5c36] hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
