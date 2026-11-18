import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck,
  Leaf,
  ShieldCheck,
  Video,
  Heart,
  Stethoscope,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  CheckCircle2,
  Clock,
  Award,
  FileText,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "ARAYAL — Ayurveda Online Consultation | Dr. Princy",
  description:
    "Get expert Ayurvedic advice from the comfort of your home with Dr. Princy. Live consultation, personalized treatment, and holistic wellness.",
};

const floatingHighlights = [
  {
    icon: Stethoscope,
    title: "Expert Ayurvedic Doctors",
    subtitle: "Consult certified specialists",
  },
  {
    icon: Video,
    title: "Online Consultation",
    subtitle: "Video / Audio / Chat",
  },
  {
    icon: Heart,
    title: "Personalized Treatment",
    subtitle: "Get custom advice",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    subtitle: "Your health, our priority",
  },
];

const howItWorksSteps = [
  {
    number: "1",
    icon: CalendarCheck,
    title: "Book Appointment",
    desc: "Choose your preferred date and time",
  },
  {
    number: "2",
    icon: Video,
    title: "Consult Doctor",
    desc: "Discuss your health concerns online",
  },
  {
    number: "3",
    icon: Leaf,
    title: "Get Treatment Plan",
    desc: "Receive personalized Ayurvedic advice",
  },
];

const consultationServices = [
  {
    badge: "Most Popular",
    icon: "🌿",
    title: "General Ayurveda Consultation",
    desc: "Comprehensive Prakriti analysis, diagnosis of root causes, and holistic health recommendations for mind and body.",
    duration: "30-45 mins",
  },
  {
    badge: "Personalized",
    icon: "🥗",
    title: "Ayurvedic Diet & Nutrition",
    desc: "Customized diet plans tailored to your Dosha balance (Vata, Pitta, Kapha) to treat digestive issues, weight, and fatigue.",
    duration: "30 mins",
  },
  {
    badge: "Lifestyle",
    icon: "🧘",
    title: "Dinacharya & Lifestyle Guidance",
    desc: "Daily and seasonal routines, yoga therapy, and sleep cycle restoration tailored to your body type.",
    duration: "30 mins",
  },
  {
    badge: "Herbal Care",
    icon: "🌱",
    title: "Traditional Herbal Treatment",
    desc: "Prescriptions for classical Ayurvedic formulations, herbal decoctions (Kashayam), and natural supplements.",
    duration: "30 mins",
  },
  {
    badge: "Continuous",
    icon: "🔄",
    title: "Follow-up Consultation",
    desc: "Evaluate your recovery progress, adjust medicinal dosages, and fine-tune your ongoing wellness regimen.",
    duration: "20-30 mins",
  },
  {
    badge: "Instant PDF",
    icon: "📋",
    title: "Digital Prescription & Reports",
    desc: "Direct access to downloadable PDF prescriptions and secure medical report uploads in your patient portal.",
    duration: "Always available",
  },
];

const faqs = [
  {
    q: "How does the online Ayurveda consultation work?",
    a: "Booking is simple: choose a convenient date and time, share your health symptoms or upload prior medical reports, and connect with Dr. Princy over a private, high-definition video call. After the session, your customized prescription PDF will be uploaded to your patient dashboard.",
  },
  {
    q: "Is an online Ayurvedic consultation as effective as in-person?",
    a: "Yes! Ayurveda places immense importance on detailed patient history (Prashna Pariksha), symptom inspection, lifestyle evaluation, and dietary habits. Dr. Princy conducts in-depth assessments to recommend authentic herbal formulations, home remedies, and diet corrections.",
  },
  {
    q: "How do I access my prescription and medicines?",
    a: "Immediately following your consultation, Dr. Princy generates an official digital prescription that includes diagnosis, prescribed Ayurvedic medicines, exact dosages, and diet instructions. You can view or download the PDF at any time from your patient dashboard.",
  },
  {
    q: "Can I upload previous blood tests or medical reports?",
    a: "Absolutely. Our patient portal includes a dedicated Health Records section where you can safely upload PDFs, JPGs, or PNGs of your lab tests, previous prescriptions, and scan reports before the consultation.",
  },
  {
    q: "Who is Dr. Princy and what are her qualifications?",
    a: "Dr. Princy (BAMS) is a senior Ayurvedic physician with over 10 years of clinical experience. She has practiced extensively with KMCT Ayurveda Hospital and Dubai Ayurveda Clinic, treating chronic lifestyle disorders, digestive ailments, skin conditions, and joint health.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#fbf8f1] text-[#1b2f21]">
      {/* ============================================================ */}
      {/* 1. HERO SECTION (Exact Reference: Image 1)                   */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf8f1] via-[#f5f8ef] to-[#edf4e8] pb-16 pt-10 md:pb-24 md:pt-14">
        {/* Soft decorative background glows */}
        <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-lime-200/20 blur-3xl" />

        <div className="container relative z-10 grid items-center gap-10 lg:grid-cols-12">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 xl:col-span-6">
            {/* Tagline */}
            <p className="mb-3 font-serif text-lg font-medium italic text-[#256a40] md:text-xl">
              Ancient Wisdom... Modern Care...
            </p>

            {/* Headline */}
            <h1 className="font-serif text-4xl font-extrabold leading-[1.15] tracking-tight text-[#143d23] sm:text-5xl md:text-6xl">
              Ayurveda Online
              <br />
              <span className="text-[#1c5c36]">Consultation</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Get expert Ayurvedic advice from the comfort of your home. Live
              consultation, personalized treatment and holistic wellness.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/register">
                <button className="flex items-center gap-2 rounded-full bg-[#1c5c36] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#1c5c36]/25 transition hover:bg-[#154629] hover:shadow-xl">
                  <span>Book Consultation</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link href="/about">
                <button className="flex items-center gap-2 rounded-full border border-[#1c5c36] bg-white/80 px-7 py-3.5 text-base font-semibold text-[#1c5c36] backdrop-blur-sm transition hover:bg-[#1c5c36] hover:text-white">
                  <span>Know More</span>
                </button>
              </Link>
            </div>

            {/* Quick credentials tag */}
            <div className="mt-8 flex items-center gap-3 text-xs font-medium text-emerald-900/80">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                ✓
              </span>
              <span>10+ Years Experience · KMCT · Dubai Ayurveda Clinic</span>
            </div>
          </div>

          {/* Hero Right Visual (Doctor with herbs and laptop from Image 1) */}
          <div className="relative flex justify-center lg:col-span-6 xl:col-span-6">
            <div className="relative w-full max-w-[560px]">
              {/* Soft background aura */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-emerald-100/80 to-amber-100/50 shadow-inner" />

              {/* Main Illustration Container */}
              <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/40 shadow-2xl backdrop-blur-sm">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/doctor-banner.jpg"
                    alt="Dr. Princy Ayurveda Consultation"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 560px"
                  />
                </div>

                {/* Bottom doctor credential overlay */}
                <div className="flex items-center justify-between border-t border-emerald-950/10 bg-white/95 p-4 backdrop-blur-md">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#1c5c36]">
                      Chief Ayurveda Consultant
                    </span>
                    <h3 className="text-lg font-bold text-[#143d23]">Dr. Princy (BAMS)</h3>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                    <span>Certified Expert</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. FLOATING 4-FEATURE STRIP (Exact Reference: Image 1)       */}
      {/* ============================================================ */}
      <section className="relative z-20 -mt-8 sm:-mt-10">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 rounded-3xl border border-emerald-950/10 bg-white p-5 shadow-xl sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
            {floatingHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-center gap-4 rounded-2xl p-2 transition hover:bg-emerald-50/60"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#dbeee1] text-[#1c5c36]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold leading-snug text-[#143d23]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500">{item.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. "HOW IT WORKS?" SECTION (Exact Reference: Image 1)       */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28">
        <div className="container">
          {/* Section Header */}
          <div className="mb-14">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#143d23] sm:text-4xl">
              How It Works?
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Get Ayurvedic consultation in just a few simple steps
            </p>
          </div>

          <div className="grid items-stretch gap-8 lg:grid-cols-12">
            {/* Steps (Left column - 7 cols) */}
            <div className="flex flex-col justify-center gap-6 lg:col-span-7">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {howItWorksSteps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.number}
                      className="group relative flex flex-col items-center rounded-3xl border border-emerald-950/10 bg-white p-6 text-center shadow-md transition-all hover:-translate-y-1 hover:border-[#1c5c36]/40 hover:shadow-xl"
                    >
                      {/* Step Circle with badge */}
                      <div className="relative mb-5">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#dbeee1] text-[#1c5c36] transition-transform group-hover:scale-105">
                          <Icon className="h-9 w-9" />
                        </div>
                        {/* Number Badge */}
                        <div className="absolute -top-1 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#1c5c36] text-xs font-bold text-white shadow-md">
                          {step.number}
                        </div>
                      </div>

                      <h4 className="font-serif text-base font-bold text-[#143d23]">
                        {step.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-slate-500">
                        {step.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Assurance Note */}
              <div className="flex items-center gap-3 rounded-2xl bg-emerald-50/80 p-4 text-xs font-medium text-emerald-900 border border-emerald-100">
                <Sparkles className="h-4 w-4 shrink-0 text-[#1c5c36]" />
                <span>
                  Consultations are conducted online via Zoom or direct link. No app downloads required.
                </span>
              </div>
            </div>

            {/* "Live Healthy Naturally" Card (Right column - 5 cols matching Image 1) */}
            <div className="lg:col-span-5">
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-[#dcecd6] via-[#e5f1df] to-[#cbe4c3] p-8 shadow-xl">
                <div>
                  <h3 className="font-serif text-3xl font-extrabold leading-tight text-[#144627] md:text-4xl">
                    Live Healthy
                    <br />
                    Naturally
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-emerald-900/80">
                    Experience the timeless benefits of Ayurveda for a healthier, balanced life.
                  </p>

                  <div className="mt-6">
                    <Link href="/register">
                      <button className="flex items-center gap-2 rounded-full bg-[#144627] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0c311a]">
                        <span>Start Your Consultation</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Herbal Bowl Image (Extracted from reference Image 1) */}
                <div className="relative mt-6 h-48 w-full overflow-hidden rounded-2xl shadow-md">
                  <Image
                    src="/images/herbal-bowl.jpg"
                    alt="Ayurvedic Herbs and Natural Oils"
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. CONSULTATION SERVICES (Anchor: #consultation)            */}
      {/* ============================================================ */}
      <section id="consultation" className="border-t border-emerald-950/10 bg-white py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1c5c36]">
              Our Consultation Programs
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#143d23] sm:text-4xl">
              Holistic Ayurveda Care For Every Need
            </h2>
            <p className="mt-3 text-slate-600">
              Personalized guidance focused on root-cause healing through natural medicines, diet, and lifestyle.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {consultationServices.map((service) => (
              <Card
                key={service.title}
                className="group flex flex-col justify-between rounded-3xl border border-emerald-950/10 bg-[#fdfbf7] p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#1c5c36]/40 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{service.icon}</span>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800">
                      {service.badge}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-bold text-[#143d23] group-hover:text-[#1c5c36]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-emerald-950/10 pt-4">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Clock className="h-3.5 w-3.5 text-emerald-600" />
                    {service.duration}
                  </span>
                  <Link href="/register">
                    <button className="flex items-center gap-1 text-xs font-bold text-[#1c5c36] hover:underline">
                      <span>Book Now</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. OUR BENEFITS SECTION (Anchor: #benefits)                  */}
      {/* ============================================================ */}
      <section id="benefits" className="bg-gradient-to-b from-[#fbf8f1] to-[#edf4e8] py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1c5c36]">
              Why Choose Arayal
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#143d23] sm:text-4xl">
              Authentic Ayurveda With Modern Convenience
            </h2>
            <p className="mt-3 text-slate-600">
              Discover why patients in India and abroad trust Arayal for their health journey.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-emerald-950/10 bg-white p-7 shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-[#1c5c36]">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-serif text-lg font-bold text-[#143d23]">
                10+ Years Experience
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Direct consultation with Dr. Princy with proven clinical expertise across KMCT and Dubai.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-950/10 bg-white p-7 shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-[#1c5c36]">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-serif text-lg font-bold text-[#143d23]">
                100% Natural Healing
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Classical herbal formulas, nutrition science, and gentle home remedies with zero chemicals.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-950/10 bg-white p-7 shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-[#1c5c36]">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-serif text-lg font-bold text-[#143d23]">
                Digital PDF Prescriptions
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Clear, legible electronic prescriptions with medicine names, timings, and dietary dos and don’ts.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-950/10 bg-white p-7 shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-[#1c5c36]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-serif text-lg font-bold text-[#143d23]">
                Strict Privacy
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Your medical records, reports, and consultation discussions remain 100% confidential and secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. DOCTOR PROFILE SPOTLIGHT                                  */}
      {/* ============================================================ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container grid items-center gap-12 lg:grid-cols-12">
          {/* Doctor Image */}
          <div className="flex justify-center lg:col-span-5">
            <div className="relative w-full max-w-sm">
              <div className="overflow-hidden rounded-3xl border-4 border-emerald-100 bg-emerald-50 shadow-2xl">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/images/princy.jpeg"
                    alt="Dr. Princy BAMS Ayurveda Consultant"
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                </div>
              </div>
              {/* Experience badge */}
              <div className="absolute -bottom-4 -right-4 rounded-2xl bg-[#1c5c36] p-4 text-white shadow-xl">
                <p className="text-2xl font-bold font-serif">10+ Yrs</p>
                <p className="text-[11px] uppercase tracking-wider text-emerald-200">Experience</p>
              </div>
            </div>
          </div>

          {/* Doctor Details */}
          <div className="lg:col-span-7">
            <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1c5c36]">
              Meet Your Consultant
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#143d23] sm:text-4xl">
              Dr. Princy (BAMS)
            </h2>
            <p className="mt-1 text-sm font-semibold text-emerald-700">
              Senior Ayurveda Physician & Holistic Wellness Specialist
            </p>

            <p className="mt-5 leading-relaxed text-slate-600">
              Dr. Princy graduated in Ayurvedic Medicine & Surgery (BAMS) and has served patients
              for over a decade. Her clinical journey includes senior consultancies with prestigious
              centers such as KMCT Ayurveda Medical College & Hospital and Dubai Ayurveda Clinic.
            </p>

            <p className="mt-3 leading-relaxed text-slate-600">
              She combines authentic Charaka and Sushruta Samhita principles with pragmatic modern
              lifestyle adjustments, helping patients overcome chronic ailments naturally.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-emerald-950/10 pt-6 sm:grid-cols-3">
              <div>
                <p className="text-xs text-slate-500">Specialization</p>
                <p className="text-sm font-bold text-[#143d23]">Prakriti & Dosha</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Languages</p>
                <p className="text-sm font-bold text-[#143d23]">English, Malayalam, Hindi</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Consultation</p>
                <p className="text-sm font-bold text-[#143d23]">Video & Audio Call</p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link href="/register">
                <button className="flex items-center gap-2 rounded-full bg-[#1c5c36] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#154629]">
                  <span>Book Consultation With Dr. Princy</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. FAQS SECTION (Anchor: #faq)                               */}
      {/* ============================================================ */}
      <section id="faq" className="border-t border-emerald-950/10 bg-[#fdfbf7] py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1c5c36]">
              Got Questions?
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#143d23] sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-slate-600">
              Everything you need to know about the consultation process.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-emerald-950/10 bg-white p-5 transition-all open:shadow-md"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-base font-bold text-[#143d23]">
                  <span>{faq.q}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-emerald-700 transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-4 border-t border-emerald-950/5 pt-3 text-sm leading-relaxed text-slate-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. CONTACT SECTION (Anchor: #contact)                        */}
      {/* ============================================================ */}
      <section id="contact" className="border-t border-emerald-950/10 bg-white py-20 md:py-28">
        <div className="container grid items-center gap-12 lg:grid-cols-12">
          {/* Contact Details */}
          <div className="lg:col-span-6">
            <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1c5c36]">
              Reach Out
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#143d23] sm:text-4xl">
              We&apos;re Here To Assist Your Healing
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              Have questions prior to booking or need help with appointment slots? Contact our team anytime.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4 rounded-2xl border border-emerald-950/5 bg-[#fdfbf7] p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-[#1c5c36]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Call / WhatsApp</p>
                  <p className="font-bold text-[#143d23]">+91 98460 00000</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-emerald-950/5 bg-[#fdfbf7] p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-[#1c5c36]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email Inquiries</p>
                  <p className="font-bold text-[#143d23]">consultation@arayal.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-emerald-950/5 bg-[#fdfbf7] p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-[#1c5c36]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Center Locations</p>
                  <p className="font-bold text-[#143d23]">KMCT Calicut, Kerala & Dubai UAE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Consultation CTA Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-[#eaf3e6] to-[#d8ebd1] p-8 shadow-xl md:p-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-[#1c5c36]">
                <Leaf className="h-3.5 w-3.5" />
                <span>Simple 3-Step Process</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#143d23] sm:text-3xl">
                Ready to Experience True Ayurveda?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Register as a patient in 1 minute, select your consultation slot, and receive
                individualized care from Dr. Princy.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/register" className="flex-1">
                  <button className="w-full rounded-full bg-[#1c5c36] py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#154629]">
                    Create Free Account
                  </button>
                </Link>
                <Link href="/login" className="flex-1">
                  <button className="w-full rounded-full border border-[#1c5c36] bg-white py-3.5 text-sm font-semibold text-[#1c5c36] transition hover:bg-emerald-50">
                    Existing Patient Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. AYURVEDIC QUOTE STRIP                                     */}
      {/* ============================================================ */}
      <section className="bg-[#0f361f] py-14 text-center text-white">
        <div className="container">
          <Leaf className="mx-auto mb-3 h-8 w-8 text-emerald-400" />
          <blockquote className="mx-auto max-w-2xl font-serif text-xl font-medium italic text-emerald-100 sm:text-2xl">
            &ldquo;Ayurveda is not just a medicine, it&apos;s a way of life.&rdquo;
          </blockquote>
          <p className="mt-3 text-xs uppercase tracking-widest text-emerald-400">
            Ancient Ayurvedic Wisdom
          </p>
        </div>
      </section>
    </div>
  );
}
