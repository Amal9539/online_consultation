import Link from "next/link";
import Image from "next/image";
import {
  Leaf,
  CalendarCheck,
  HeartPulse,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  GraduationCap,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#fbf8f2] text-[#162f1e]">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf7ee] via-[#f4f8f0] to-[#edf5e9] py-16 md:py-24">
        <div className="container relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#18532f] border border-emerald-200">
            <Leaf className="h-3.5 w-3.5" />
            <span>Traditional Wisdom · Modern Care</span>
          </span>
          <h1 className="mt-4 font-serif text-4xl font-extrabold text-[#143d23] sm:text-5xl md:text-6xl">
            Natural Healing Through Ayurveda
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Arayal Ayurveda bridges time-tested Kerala Ayurvedic traditions with modern virtual healthcare, providing personalized diagnosis and natural treatment plans directly to your home.
          </p>
        </div>
      </section>

      {/* 2. Doctor Profile Section */}
      <section className="container py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Doctor Image */}
          <div className="relative mx-auto w-full max-w-md lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-2 border-emerald-950/10 shadow-2xl">
              <Image
                src="/images/doctor-banner.jpg"
                alt="Dr. Princy BAMS - Ayurveda Consultant"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>
            {/* Experience badge */}
            <div className="absolute -bottom-5 -right-5 rounded-2xl bg-[#18532f] p-4 text-white shadow-xl flex items-center gap-3">
              <Award className="h-8 w-8 text-amber-300" />
              <div>
                <p className="text-xl font-bold leading-none font-serif">10+ Years</p>
                <p className="text-[11px] text-emerald-200 uppercase tracking-wider mt-0.5">Clinical Practice</p>
              </div>
            </div>
          </div>

          {/* Doctor Bio */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#18532f] border border-emerald-200">
              <Stethoscope className="h-3.5 w-3.5 text-emerald-700" />
              <span>Chief Ayurveda Consultant</span>
            </div>

            <h2 className="font-serif text-3xl font-extrabold text-[#143d23] sm:text-4xl">
              Dr. Princy (BAMS)
            </h2>

            <p className="text-base text-emerald-900/90 font-medium leading-relaxed">
              Practicing Classical Ayurveda with clinical stints at esteemed institutions including <strong>KMCT Ayurveda Medical College & Hospital</strong> and <strong>Dubai Ayurveda Clinic</strong>.
            </p>

            <p className="text-sm leading-relaxed text-slate-600">
              Dr. Princy specializes in constitutional Prakriti diagnosis, lifestyle disorder management, digestive health (Agni rejuvenation), chronic stress restoration, and holistic herbal therapeutics. Her approach focuses on eliminating the root cause of imbalance rather than temporarily suppressing symptoms.
            </p>

            {/* Key Qualifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="rounded-2xl border border-emerald-950/10 bg-white p-4 shadow-sm flex items-start gap-3">
                <GraduationCap className="h-5 w-5 text-[#18532f] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#143d23]">BAMS Graduate</h4>
                  <p className="text-[11px] text-slate-500">Bachelor of Ayurvedic Medicine & Surgery</p>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-950/10 bg-white p-4 shadow-sm flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-[#18532f] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#143d23]">Global Consultation</h4>
                  <p className="text-[11px] text-slate-500">Patients across India, UAE, and overseas</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/register">
                <button className="flex items-center gap-2 rounded-full bg-[#18532f] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#18532f]/25 hover:bg-[#123e23] transition-all">
                  <span>Schedule Consultation with Dr. Princy</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Three Pillars of Ayurveda */}
      <section className="border-t border-emerald-950/10 bg-white py-16 md:py-24">
        <div className="container space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#18532f]">
              Core Principles
            </span>
            <h2 className="mt-3 font-serif text-3xl font-extrabold text-[#143d23] sm:text-4xl">
              The Three Pillars of Healing
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Classical Ayurvedic healing operates through harmony of Ahara (Diet), Vihara (Lifestyle), and Aushadha (Herbs).
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-emerald-950/10 bg-[#faf8f3] p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dfeed9] text-2xl mb-5">
                🥗
              </div>
              <h3 className="font-serif text-xl font-bold text-[#143d23]">
                1. Ahara (Dietetics)
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                &ldquo;When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need.&rdquo; We tailor nutritious, seasonal food choices to balance your unique Dosha.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-950/10 bg-[#faf8f3] p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dfeed9] text-2xl mb-5">
                🧘
              </div>
              <h3 className="font-serif text-xl font-bold text-[#143d23]">
                2. Vihara (Lifestyle)
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Establishing harmonious Dinacharya (daily rituals), restorative sleep hygiene, and mindful breathing practices that protect longevity and vital Ojas.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-950/10 bg-[#faf8f3] p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dfeed9] text-2xl mb-5">
                🌿
              </div>
              <h3 className="font-serif text-xl font-bold text-[#143d23]">
                3. Aushadha (Herbal Care)
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Targeted classical herbal decoctions (Kashayam), herbal medicated oils (Tailam), and botanical formulations prescribed strictly based on your clinical assessment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
