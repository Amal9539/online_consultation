"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Leaf,
  ShieldCheck,
  Heart,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Field validation rules
  const isNameValid = form.name.trim().length >= 2;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(form.email.trim());

  const cleanPhoneDigits = form.phone.replace(/[^0-9]/g, "");
  const isPhoneValid =
    form.phone.trim() === "" ||
    (cleanPhoneDigits.length >= 7 && cleanPhoneDigits.length <= 15);

  const hasMinLength = form.password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(form.password);
  const hasNumber = /[0-9]/.test(form.password);
  const isPasswordValid = hasMinLength && hasLetter && hasNumber;

  const isConfirmValid =
    form.confirmPassword.length > 0 &&
    form.password === form.confirmPassword;

  const isFormValid =
    isNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isPasswordValid &&
    isConfirmValid &&
    agreeTerms;

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setServerError("");
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");
    setServerSuccess("");

    // Mark all fields as touched for instant validation visibility
    setTouched({
      name: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });

    if (!isNameValid) {
      setServerError("Please enter your full name (at least 2 characters).");
      return;
    }

    if (!isEmailValid) {
      setServerError("Please enter a valid email address (e.g. name@domain.com).");
      return;
    }

    if (!isPasswordValid) {
      setServerError(
        "Password must be at least 8 characters long and contain both letters and numbers."
      );
      return;
    }

    if (!isConfirmValid) {
      setServerError("Passwords do not match. Please verify your password.");
      return;
    }

    if (!agreeTerms) {
      setServerError("Please accept the Terms & Privacy Policy to register.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim() || null,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed. Please try again.");
      }

      setServerSuccess(
        "Account created successfully! Redirecting you to login..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      setServerError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f5f8f3] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Outer Card Container */}
      <div className="w-full max-w-6xl xl:max-w-7xl overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-2xl grid lg:grid-cols-12">
        {/* ======================================================== */}
        {/* LEFT COLUMN: HERBAL BRANDING (Ayurvedic Theme)           */}
        {/* ======================================================== */}
        <div className="relative hidden lg:flex lg:col-span-5 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#ebf5e7] via-[#e2efe0] to-[#cfe4cb] p-10 text-[#143d23]">
          {/* Top Logo & Taglines */}
          <div className="relative z-10">
            <Link href="/" className="inline-block">
              <Image
                src="/images/arayal-logo-clean.png"
                alt="Arayal Ayurveda"
                width={170}
                height={60}
                priority
                className="h-14 w-auto object-contain"
              />
            </Link>

            <div className="mt-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#18532f] border border-emerald-200">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Ayurveda for Life</span>
              </span>
              <p className="mt-4 font-serif text-2xl font-semibold italic text-[#18532f]">
                Ancient Wisdom...
                <br />
                Modern Care...
              </p>
              <p className="mt-2 text-xs text-slate-700 leading-relaxed max-w-sm">
                Create your patient account to book live video consultations, access certified herbal prescriptions, and consult with <strong>Dr. Princy (BAMS)</strong>.
              </p>
            </div>
          </div>

          {/* Center Herbal Setup Visual */}
          <div className="relative z-10 my-6">
            <div className="relative h-48 w-full overflow-hidden rounded-2xl shadow-lg border border-white/60">
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

          {/* Bottom 3 Feature Badges */}
          <div className="relative z-10 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dbeee1] text-[#1c5c36] shadow-sm mb-1.5">
                <Leaf className="h-5 w-5" />
              </div>
              <p className="font-bold text-[#143d23]">Natural</p>
              <p className="text-[10px] text-slate-600">Healing</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dbeee1] text-[#1c5c36] shadow-sm mb-1.5">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="font-bold text-[#143d23]">Expert</p>
              <p className="text-[10px] text-slate-600">Doctors</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dbeee1] text-[#1c5c36] shadow-sm mb-1.5">
                <Heart className="h-5 w-5" />
              </div>
              <p className="font-bold text-[#143d23]">Holistic</p>
              <p className="text-[10px] text-slate-600">Wellness</p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: REGISTRATION FORM WITH VALIDATION          */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          <div className="max-w-xl mx-auto w-full">
            {/* Header */}
            <div className="text-left mb-6">
              <h1 className="font-serif text-3xl font-extrabold text-[#143d23]">
                Create Patient Account
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                Register to consult certified Ayurvedic doctors and receive personalized healing
              </p>
            </div>

            {/* Server Error Alert */}
            {serverError && (
              <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700 flex items-start gap-3 shadow-sm">
                <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
                <div>
                  <p className="font-bold">Registration Alert</p>
                  <p className="mt-0.5 leading-relaxed">{serverError}</p>
                </div>
              </div>
            )}

            {/* Server Success Alert */}
            {serverSuccess && (
              <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-800 flex items-start gap-3 shadow-sm">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-bold">Success!</p>
                  <p className="mt-0.5 leading-relaxed">{serverSuccess}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* 1. Full Name */}
              <div>
                <label className="text-xs font-bold text-[#143d23] mb-1.5 flex items-center justify-between">
                  <span>Full Name *</span>
                  {touched.name && (
                    <span className="text-[10px]">
                      {isNameValid ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Valid
                        </span>
                      ) : (
                        <span className="text-rose-600 flex items-center gap-1">
                          <XCircle className="h-3 w-3" /> At least 2 characters
                        </span>
                      )}
                    </span>
                  )}
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    placeholder="e.g. Amal Kumar"
                    required
                    className={`w-full rounded-2xl border py-3 pl-11 pr-4 text-xs text-slate-800 shadow-sm transition-all focus:outline-none focus:ring-2 ${
                      touched.name && !isNameValid
                        ? "border-rose-300 bg-rose-50/30 focus:border-rose-500 focus:ring-rose-200"
                        : "border-slate-300 focus:border-[#1c5c36] focus:ring-[#1c5c36]/20 bg-white"
                    }`}
                  />
                </div>
              </div>

              {/* 2. Email Address */}
              <div>
                <label className="text-xs font-bold text-[#143d23] mb-1.5 flex items-center justify-between">
                  <span>Email Address *</span>
                  {touched.email && (
                    <span className="text-[10px]">
                      {isEmailValid ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Valid email
                        </span>
                      ) : (
                        <span className="text-rose-600 flex items-center gap-1">
                          <XCircle className="h-3 w-3" /> Valid email required
                        </span>
                      )}
                    </span>
                  )}
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    placeholder="name@example.com"
                    required
                    className={`w-full rounded-2xl border py-3 pl-11 pr-4 text-xs text-slate-800 shadow-sm transition-all focus:outline-none focus:ring-2 ${
                      touched.email && !isEmailValid
                        ? "border-rose-300 bg-rose-50/30 focus:border-rose-500 focus:ring-rose-200"
                        : "border-slate-300 focus:border-[#1c5c36] focus:ring-[#1c5c36]/20 bg-white"
                    }`}
                  />
                </div>
              </div>

              {/* 3. Phone Number */}
              <div>
                <label className="text-xs font-bold text-[#143d23] mb-1.5 flex items-center justify-between">
                  <span>Mobile Phone Number (Optional)</span>
                  {form.phone && touched.phone && (
                    <span className="text-[10px]">
                      {isPhoneValid ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Valid format
                        </span>
                      ) : (
                        <span className="text-rose-600 flex items-center gap-1">
                          <XCircle className="h-3 w-3" /> 7 to 15 digits
                        </span>
                      )}
                    </span>
                  )}
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <Phone className="h-4 w-4" />
                  </div>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    placeholder="e.g. 9846000000"
                    className="w-full rounded-2xl border border-slate-300 py-3 pl-11 pr-4 text-xs text-slate-800 shadow-sm focus:border-[#1c5c36] focus:outline-none focus:ring-2 focus:ring-[#1c5c36]/20 bg-white"
                  />
                </div>
              </div>

              {/* 4. Password */}
              <div>
                <label className="text-xs font-bold text-[#143d23] mb-1.5 flex items-center justify-between">
                  <span>Create Password *</span>
                  {touched.password && (
                    <span className="text-[10px]">
                      {isPasswordValid ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Strong password
                        </span>
                      ) : (
                        <span className="text-amber-700">Check criteria below</span>
                      )}
                    </span>
                  )}
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    onBlur={() => handleBlur("password")}
                    placeholder="Enter at least 8 characters"
                    required
                    className={`w-full rounded-2xl border py-3 pl-11 pr-11 text-xs text-slate-800 shadow-sm transition-all focus:outline-none focus:ring-2 ${
                      touched.password && !isPasswordValid
                        ? "border-amber-400 bg-amber-50/20 focus:border-amber-600 focus:ring-amber-200"
                        : "border-slate-300 focus:border-[#1c5c36] focus:ring-[#1c5c36]/20 bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Password Criteria Real-Time Checklist */}
                <div className="mt-2 grid grid-cols-3 gap-1.5 text-[10px]">
                  <span
                    className={`flex items-center gap-1 ${
                      hasMinLength ? "text-emerald-700 font-bold" : "text-slate-400"
                    }`}
                  >
                    {hasMinLength ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300 ml-1 mr-0.5" />
                    )}
                    8+ characters
                  </span>
                  <span
                    className={`flex items-center gap-1 ${
                      hasLetter ? "text-emerald-700 font-bold" : "text-slate-400"
                    }`}
                  >
                    {hasLetter ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300 ml-1 mr-0.5" />
                    )}
                    Contains letters
                  </span>
                  <span
                    className={`flex items-center gap-1 ${
                      hasNumber ? "text-emerald-700 font-bold" : "text-slate-400"
                    }`}
                  >
                    {hasNumber ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300 ml-1 mr-0.5" />
                    )}
                    Contains numbers
                  </span>
                </div>
              </div>

              {/* 5. Confirm Password */}
              <div>
                <label className="text-xs font-bold text-[#143d23] mb-1.5 flex items-center justify-between">
                  <span>Confirm Password *</span>
                  {touched.confirmPassword && (
                    <span className="text-[10px]">
                      {isConfirmValid ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Passwords match
                        </span>
                      ) : (
                        <span className="text-rose-600 flex items-center gap-1">
                          <XCircle className="h-3 w-3" /> Does not match
                        </span>
                      )}
                    </span>
                  )}
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => update("confirmPassword", e.target.value)}
                    onBlur={() => handleBlur("confirmPassword")}
                    placeholder="Re-enter password to confirm"
                    required
                    className={`w-full rounded-2xl border py-3 pl-11 pr-11 text-xs text-slate-800 shadow-sm transition-all focus:outline-none focus:ring-2 ${
                      touched.confirmPassword && !isConfirmValid
                        ? "border-rose-300 bg-rose-50/30 focus:border-rose-500 focus:ring-rose-200"
                        : "border-slate-300 focus:border-[#1c5c36] focus:ring-[#1c5c36]/20 bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms & Conditions Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#1c5c36] focus:ring-[#1c5c36] cursor-pointer"
                />
                <label
                  htmlFor="agreeTerms"
                  className="text-xs text-slate-600 select-none cursor-pointer"
                >
                  I agree to the Ayurvedic consultation{" "}
                  <span className="font-semibold text-[#1c5c36]">
                    Terms & Privacy Policy
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#1c5c36] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1c5c36]/25 transition hover:bg-[#154629] hover:shadow-xl disabled:opacity-60 cursor-pointer mt-2"
              >
                <span>{loading ? "Creating Patient Account..." : "Create Account"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Bottom Login Link */}
            <p className="mt-6 text-center text-xs text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-[#1c5c36] hover:underline"
              >
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
