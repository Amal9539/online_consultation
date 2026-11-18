"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Leaf, Mail, Phone, MapPin, Heart, ShieldCheck, ArrowRight } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on dashboard pages to keep dashboard full-screen like Image 3
  const isDashboard = pathname?.startsWith("/patient") || pathname?.startsWith("/admin");
  if (isDashboard) {
    return null;
  }

  return (
    <footer className="border-t border-emerald-950/20 bg-[#0a2314] text-white">
      {/* Top Banner */}
      <div className="border-b border-emerald-900/40 bg-[#06180d] py-10">
        <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-900/60 text-emerald-300">
              <Leaf className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xl font-bold font-serif tracking-wide text-emerald-100">
                Begin Your Natural Healing Journey Today
              </p>
              <p className="text-sm text-emerald-400/80">
                Personalized Ayurveda consultation with Dr. Princy from KMCT & Dubai Ayurveda Clinic.
              </p>
            </div>
          </div>
          <Link href="/register">
            <button className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400">
              <span>Book Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Image
              src="/images/arayal-logo-clean.png"
              alt="Arayal Ayurveda"
              width={140}
              height={48}
              className="h-10 w-auto brightness-200"
            />
          </div>
          <p className="text-sm leading-relaxed text-emerald-200/70">
            Ayurveda for a Healthier Life. Experience the holistic benefits of
            classical Ayurveda treatments, dietetics, and lifestyle guidance from home.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Certified & Experienced Ayurveda Care</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-emerald-300">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm text-emerald-200/80">
            <li>
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition hover:text-white">
                About Dr. Princy
              </Link>
            </li>
            <li>
              <Link href="/#consultation" className="transition hover:text-white">
                Consultation Services
              </Link>
            </li>
            <li>
              <Link href="/#benefits" className="transition hover:text-white">
                Our Benefits
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="transition hover:text-white">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="transition hover:text-white">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-emerald-300">
            Services
          </h4>
          <ul className="space-y-2.5 text-sm text-emerald-200/80">
            <li>🌿 Online Video Consultation</li>
            <li>🥗 Personalized Diet & Nutrition</li>
            <li>🧘 Ayurvedic Lifestyle Routines</li>
            <li>🌱 Herbal Prescription & Medicine</li>
            <li>📋 Digital PDF Prescriptions</li>
            <li>🔄 Follow-up Care & Monitoring</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div id="footer-contact">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-emerald-300">
            Contact
          </h4>
          <div className="space-y-3 text-sm text-emerald-200/80">
            <p className="font-semibold text-white">Dr. Princy (BAMS)</p>
            <p className="text-xs text-emerald-300">Ayurveda Consultant · 10+ Years Experience</p>
            <p className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-emerald-400" />
              <span>+91 98460 00000</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-emerald-400" />
              <span>consultation@arayal.com</span>
            </p>
            <p className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span>KMCT & Dubai Ayurveda Clinic / Kerala</span>
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-emerald-900/50 py-6 text-center text-xs text-emerald-300/60">
        <p>© {new Date().getFullYear()} ARAYAL — Ayurveda for a Healthier Life. All rights reserved.</p>
      </div>
    </footer>
  );
}
