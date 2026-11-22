"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Leaf,
  ShieldCheck,
  Heart,
  ArrowRight,
  Check,
  KeyRound,
  X,
  Phone,
  Mail,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotIdentifier, setForgotIdentifier] = useState("");
  const [forgotStep, setForgotStep] = useState(1); // 1: enter email/phone, 2: enter new password
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // Save user info
      localStorage.setItem("user", JSON.stringify(data.user));

      // Navigate based on user role
      if (data.user.role === "PATIENT") {
        window.location.href = "/patient/dashboard";
      } else if (data.user.role === "ADMIN") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/patient/dashboard";
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Handle Forgot Password Step 1: verify user exists
  async function handleForgotLookup(e) {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");
    setForgotLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: forgotIdentifier }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Account not found");

      setForgotStep(2);
      setForgotSuccess(data.message);
    } catch (err) {
      setForgotError(err.message);
    } finally {
      setForgotLoading(false);
    }
  }

  // Handle Forgot Password Step 2: save new password
  async function handleForgotReset(e) {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");
    setForgotLoading(true);

    if (newPassword !== confirmNewPassword) {
      setForgotError("Passwords do not match");
      setForgotLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: forgotIdentifier,
          newPassword,
          confirmPassword: confirmNewPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to reset password");

      setForgotSuccess("Password reset successfully! Please login with your new password.");
      setTimeout(() => {
        setShowForgotModal(false);
        setForgotStep(1);
        setForgotIdentifier("");
        setNewPassword("");
        setConfirmNewPassword("");
        setForgotSuccess("");
      }, 2000);
    } catch (err) {
      setForgotError(err.message);
    } finally {
      setForgotLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f5f8f3] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Outer Card Container */}
      <div className="w-full max-w-6xl xl:max-w-7xl overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-2xl grid lg:grid-cols-12">
        {/* ======================================================== */}
        {/* LEFT COLUMN: HERBAL BRANDING (Exact Reference Image)     */}
        {/* ======================================================== */}
        <div className="relative hidden lg:flex lg:col-span-6 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#ebf5e7] via-[#e2efe0] to-[#cfe4cb] p-10 text-[#143d23]">
          {/* Top Logo & Taglines */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <Image
                src="/images/arayal-logo-clean.png"
                alt="Arayal Ayurveda"
                width={170}
                height={60}
                priority
                className="h-14 w-auto object-contain"
              />
            </div>

            <div className="mt-8">
              <p className="font-serif text-2xl font-semibold italic text-[#18532f]">
                Ancient Wisdom...
                <br />
                Modern Care...
              </p>
              <p className="mt-3 max-w-sm text-sm text-slate-700 leading-relaxed">
                Consult with trusted Ayurvedic experts from the comfort of your home.
              </p>
            </div>
          </div>

          {/* Center Herbal Setup Visual from Reference */}
          <div className="relative z-10 my-6">
            <div className="relative h-56 w-full overflow-hidden rounded-2xl shadow-lg border border-white/60">
              <Image
                src="/images/login-herbal-bg.jpg"
                alt="Ayurveda Herbal Mortar & Pestle"
                fill
                priority
                className="object-cover"
                sizes="500px"
              />
            </div>
          </div>

          {/* Bottom 3 Feature Pills with Arrows (Matching Reference Image) */}
          <div className="relative z-10 grid grid-cols-3 gap-2 text-center text-xs">
            {/* 1. Natural Healing */}
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dbeee1] text-[#1c5c36] shadow-sm mb-1.5">
                <Leaf className="h-5 w-5" />
              </div>
              <p className="font-bold text-[#143d23]">Natural</p>
              <p className="text-[10px] text-slate-600">Healing</p>
            </div>

            {/* 2. Expert Doctors */}
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dbeee1] text-[#1c5c36] shadow-sm mb-1.5">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="font-bold text-[#143d23]">Expert</p>
              <p className="text-[10px] text-slate-600">Doctors</p>
            </div>

            {/* 3. Better Wellness */}
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dbeee1] text-[#1c5c36] shadow-sm mb-1.5">
                <Heart className="h-5 w-5" />
              </div>
              <p className="font-bold text-[#143d23]">Better</p>
              <p className="text-[10px] text-slate-600">Wellness</p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: LOGIN FORM (Exact Reference Image Card)    */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 flex flex-col justify-center p-8 sm:p-12 lg:p-14 bg-white">
          <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="text-center sm:text-left mb-8">
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-[#143d23]">
                Welcome Back!
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Login to continue your wellness journey
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-5 rounded-2xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-700 flex items-center gap-2">
                <span className="font-bold">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={submit} className="space-y-4">
              {/* Input 1: Email or Mobile Number */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-emerald-800/60">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email Address or Mobile Number"
                  required
                  className="w-full rounded-2xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 shadow-sm transition-all focus:border-[#1c5c36] focus:outline-none focus:ring-2 focus:ring-[#1c5c36]/20"
                />
              </div>

              {/* Input 2: Password with Eye Toggle */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-emerald-800/60">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Password"
                  required
                  className="w-full rounded-2xl border border-slate-300 bg-white py-3.5 pl-12 pr-12 text-sm text-slate-800 placeholder-slate-400 shadow-sm transition-all focus:border-[#1c5c36] focus:outline-none focus:ring-2 focus:ring-[#1c5c36]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#1c5c36] focus:ring-[#1c5c36]"
                  />
                  <span>Remember Me</span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(true);
                    setForgotError("");
                    setForgotSuccess("");
                  }}
                  className="font-semibold text-[#1c5c36] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button (Large Green Pill matching reference) */}
              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#14532d] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#14532d]/25 transition hover:bg-[#0f4022] hover:shadow-xl disabled:opacity-70"
              >
                <LogIn className="h-4 w-4" />
                <span>{loading ? "Logging in..." : "Login"}</span>
              </button>
            </form>

            {/* Don't have an account? Register Here */}
            <div className="mt-8 text-center text-xs text-slate-600">
              <span>Don&apos;t have an account? </span>
              <Link href="/register" className="font-bold text-[#14532d] hover:underline">
                Register Here
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* FORGOT PASSWORD MODAL (Full functionality as requested)  */}
      {/* ======================================================== */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in">
          <div className="w-full max-w-md rounded-3xl border border-emerald-950/10 bg-white p-6 sm:p-8 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-emerald-950/5 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-[#1c5c36]">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#143d23]">
                    Reset Password
                  </h3>
                  <p className="text-xs text-slate-500">
                    {forgotStep === 1 ? "Verify your registered account" : "Set your new password"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowForgotModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Alerts */}
            {forgotError && (
              <div className="mt-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700">
                {forgotError}
              </div>
            )}
            {forgotSuccess && (
              <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800">
                {forgotSuccess}
              </div>
            )}

            {/* Step 1: Account Lookup */}
            {forgotStep === 1 ? (
              <form onSubmit={handleForgotLookup} className="mt-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">
                    Registered Email or Phone
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={forgotIdentifier}
                      onChange={(e) => setForgotIdentifier(e.target.value)}
                      placeholder="e.g. name@example.com or 9846000000"
                      required
                      className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-xs text-slate-800 focus:border-[#1c5c36] focus:outline-none focus:ring-1 focus:ring-[#1c5c36]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="flex-1 rounded-full border border-slate-300 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="flex-1 rounded-full bg-[#1c5c36] py-2.5 text-xs font-semibold text-white shadow-md hover:bg-[#154629] disabled:opacity-70"
                  >
                    {forgotLoading ? "Verifying..." : "Continue"}
                  </button>
                </div>
              </form>
            ) : (
              /* Step 2: Set New Password */
              <form onSubmit={handleForgotReset} className="mt-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">
                    New Password (min 6 chars)
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    minLength={6}
                    className="w-full rounded-xl border border-slate-300 py-3 px-4 text-xs text-slate-800 focus:border-[#1c5c36] focus:outline-none focus:ring-1 focus:ring-[#1c5c36]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    minLength={6}
                    className="w-full rounded-xl border border-slate-300 py-3 px-4 text-xs text-slate-800 focus:border-[#1c5c36] focus:outline-none focus:ring-1 focus:ring-[#1c5c36]"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setForgotStep(1)}
                    className="flex-1 rounded-full border border-slate-300 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="flex-1 rounded-full bg-[#1c5c36] py-2.5 text-xs font-semibold text-white shadow-md hover:bg-[#154629] disabled:opacity-70"
                  >
                    {forgotLoading ? "Resetting..." : "Save Password"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
