// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { ArrowRight, CalendarCheck, Leaf, ShieldCheck, Video } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// const services = [
//   ["🌿", "Online Consultation", "Consult with Dr. Princy online from the comfort of your home."],
//   ["🥗", "Diet Consultation", "Receive personalized Ayurvedic diet guidance."],
//   ["🧘", "Lifestyle Guidance", "Build healthier routines with Ayurveda-based guidance."],
//   ["🌱", "Herbal Treatment", "Receive traditional herbal treatment guidance."],
//   ["🔄", "Follow-up Consultation", "Continue your wellness journey with follow-up care."]
// ];

// export default function HomePage() {
//   const [user, setUser] = useState(null);
//   const [checked, setChecked] = useState(false);

//   useEffect(() => {
//     fetch("/api/auth/me", { cache: "no-store" })
//       .then((r) => r.json())
//       .then((data) => setUser(data.user))
//       .catch(() => setUser(null))
//       .finally(() => setChecked(true));
//   }, []);

//   const dashboardHref = user?.role === "ADMIN" ? "/admin/dashboard" : "/patient/dashboard";

//   return (
//     <>
//       <section className="hero-pattern">
//         <div className="container grid min-h-[620px] items-center gap-12 py-20 md:grid-cols-2">
//           <div>
//             <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
//               <Leaf className="h-4 w-4" /> Trusted Ayurveda Consultation
//             </div>
//             <h1 className="max-w-3xl text-5xl font-bold tracking-tight md:text-7xl">
//               Heal Naturally with ARAYAL
//             </h1>
//             <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
//               Experience personalized online Ayurveda consultation with Dr. Princy.
//               Discover holistic healing, lifestyle guidance, and natural wellness
//               from the comfort of your home.
//             </p>
//             <div className="mt-8 flex flex-wrap gap-3">
//               {checked && (
//                 user ? (
//                   <Link href={dashboardHref}>
//                     <Button size="lg">Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Button>
//                   </Link>
//                 ) : (
//                   <Link href="/register">
//                     <Button size="lg">Book Consultation <ArrowRight className="ml-2 h-4 w-4" /></Button>
//                   </Link>
//                 )
//               )}
//               <Link href="/about"><Button size="lg" variant="outline">Learn More</Button></Link>
//             </div>
//           </div>

//           <Card className="overflow-hidden">
//             <CardContent className="p-0">
//               <div className="flex h-[420px] items-center justify-center bg-green-100 text-8xl">👩‍⚕️</div>
//               <div className="p-6">
//                 <p className="text-sm font-semibold text-primary">Ayurveda Consultant</p>
//                 <h2 className="mt-1 text-2xl font-bold">Dr. Princy</h2>
//                 <p className="mt-2 text-muted-foreground">10 years of experience · KMCT · Dubai Ayurveda Clinic</p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </section>

//       <section className="container py-20">
//         <div className="mx-auto max-w-2xl text-center">
//           <p className="font-semibold text-primary">OUR SERVICES</p>
//           <h2 className="mt-2 text-4xl font-bold">Personalized Ayurveda Care</h2>
//           <p className="mt-4 text-muted-foreground">Simple digital access to the services described in the consultation proposal.</p>
//         </div>

//         <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
//           {services.map(([icon, title, description]) => (
//             <Card key={title} className="transition hover:-translate-y-1">
//               <CardContent className="p-6">
//                 <div className="text-4xl">{icon}</div>
//                 <h3 className="mt-4 text-xl font-semibold">{title}</h3>
//                 <p className="mt-2 text-muted-foreground">{description}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </section>

//       <section className="bg-white py-20">
//         <div className="container">
//           <div className="grid gap-6 md:grid-cols-3">
//             <Feature icon={ShieldCheck} title="Secure Accounts" text="Separate patient and doctor/admin access." />
//             <Feature icon={CalendarCheck} title="Easy Booking" text="Book and manage online consultation appointments." />
//             <Feature icon={Video} title="Video Consultation" text="Doctor can add a Zoom meeting link for the appointment." />
//           </div>
//         </div>
//       </section>

//       {checked && !user && (
//         <section className="container py-20 text-center">
//           <h2 className="text-4xl font-bold">Start Your Consultation</h2>
//           <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
//             Register as a patient, book your appointment, attend the consultation,
//             and access your digital prescription.
//           </p>
//           <Link href="/register" className="mt-7 inline-block"><Button size="lg">Create Patient Account</Button></Link>
//         </section>
//       )}
//     </>
//   );
// }

// function Feature({ icon: Icon, title, text }) {
//   return (
//     <Card>
//       <CardContent className="p-6">
//         <Icon className="h-9 w-9 text-primary" />
//         <h3 className="mt-4 text-lg font-semibold">{title}</h3>
//         <p className="mt-2 text-sm text-muted-foreground">{text}</p>
//       </CardContent>
//     </Card>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Fraunces, Work_Sans } from "next/font/google";
import { ArrowRight, CalendarCheck, ShieldCheck, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const services = [
  { mark: "🌿", title: "Online Consultation", text: "Talk with Dr. Princy from wherever you are." },
  { mark: "🥗", title: "Diet Consultation", text: "Get an eating plan built around your constitution." },
  { mark: "🧘", title: "Lifestyle Guidance", text: "Build daily routines rooted in Ayurvedic principle." },
  { mark: "🌱", title: "Herbal Treatment", text: "Receive herb guidance suited to your imbalance." },
  { mark: "🔄", title: "Follow-up Consultation", text: "Check in and adjust your plan as you heal." },
];

/** Tiled leaf-mark pattern used as a stand-in for photography — no image files needed. */
function LeafPattern({ className = "", tone = "dark" }) {
  const color = tone === "dark" ? "#F6EFE2" : "#2F4B3C";
  const positions = [
    [10, 12], [55, 8], [85, 30], [25, 40], [65, 45],
    [5, 65], [45, 70], [80, 75], [20, 90], [60, 95],
  ];
  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      {positions.map(([x, y], i) => (
        <LeafMark
          key={i}
          className="absolute h-10 w-10"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            color,
            opacity: tone === "dark" ? 0.14 : 0.5,
            transform: `rotate(${(i * 47) % 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function LeafMark({ className = "", style }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} style={style}>
      <path
        d="M24 4C12 8 6 18 8 30c1 6 6 11 12 12 8-14 10-26 4-38Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 30C18 22 22 14 24 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/** Hand-drawn-feeling vein divider between sections. */
function LeafDivider() {
  return (
    <div className="relative h-16 w-full overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="h-full w-full text-[#2F4B3C]/25">
        <path
          d="M0 30c150-24 300 24 450 6s300-30 450-8 240 26 300 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {[120, 340, 560, 780, 1000].map((x) => (
          <path key={x} d={`M${x} 22 q10 10 0 20 M${x} 22 q-10 10 0 20`} stroke="currentColor" strokeWidth="1" />
        ))}
      </svg>
    </div>
  );
}

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setChecked(true));
  }, []);

  const dashboardHref = user?.role === "ADMIN" ? "/admin/dashboard" : "/patient/dashboard";

  return (
    <div className={`${display.variable} ${body.variable}`} style={{ fontFamily: "var(--font-body)" }}>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#F6EFE2]">
        {/* faint botanical texture */}
        <svg
          className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] text-[#2F4B3C]/[0.06]"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path d="M24 4C12 8 6 18 8 30c1 6 6 11 12 12 8-14 10-26 4-38Z" fill="currentColor" />
        </svg>

        <div className="container relative grid gap-14 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C98A2C]/40 bg-[#C98A2C]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#8A5A17]">
              <LeafMark className="h-3.5 w-3.5" />
              Ayurveda Consultation, Online
            </div>

            <h1
              className="max-w-xl text-5xl leading-[1.05] text-[#2B241C] md:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Heal naturally,
              <br />
              <em className="not-italic text-[#2F4B3C]">guided by Ayurveda.</em>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#5B5142]">
              Personalized Ayurvedic consultation with Dr. Princy — diet, herbs, and
              daily routine built around how your body actually works.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              {checked &&
                (user ? (
                  <Link href={dashboardHref}>
                    <Button
                      size="lg"
                      className="rounded-full bg-[#2F4B3C] px-7 text-[#F6EFE2] hover:bg-[#26392F]"
                    >
                      Go to dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="rounded-full bg-[#2F4B3C] px-7 text-[#F6EFE2] hover:bg-[#26392F]"
                    >
                      Book a consultation <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ))}
              <Link
                href="/about"
                className="text-sm font-semibold text-[#2B241C] underline decoration-[#C98A2C] decoration-2 underline-offset-4"
              >
                Learn more
              </Link>
            </div>
          </div>

          {/* Portrait card, organic frame */}
          <div className="relative mx-auto w-full max-w-sm md:mx-0 md:justify-self-end">
            <div
              className="absolute -inset-3 -rotate-2 rounded-[2.5rem] bg-[#C98A2C]/15"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-[#2F4B3C]/10 bg-white shadow-[0_20px_50px_-20px_rgba(43,36,28,0.35)]">
              <div className="relative h-[380px] w-full overflow-hidden bg-[#EDE3CF]">
                <img
                  src="/images/princy.jpeg"
                  alt="Herbs being ground in a traditional mortar and pestle"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B241C]/40 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C98A2C]">
                  Ayurveda Consultant
                </p>
                <h2 className="mt-1 text-2xl text-[#2B241C]" style={{ fontFamily: "var(--font-display)" }}>
                  Dr. Princy
                </h2>
                <p className="mt-1 text-sm text-[#5B5142]">
                  10 years of practice · KMCT · Dubai Ayurveda Clinic
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LeafDivider />

      {/* SERVICES — apothecary specimen labels */}
      <section className="container py-6 pb-20">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C98A2C]">Our Services</p>
          <h2 className="mt-3 text-4xl text-[#2B241C]" style={{ fontFamily: "var(--font-display)" }}>
            Personalized Ayurveda care
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-3">
          {[
            ["https://images.unsplash.com/photo-1569936906148-06de87cb0681?auto=format&fit=crop&w=500&q=70", "Fresh medicinal leaf"],
            ["https://images.unsplash.com/photo-1516715043227-1cdf27bcd09a?auto=format&fit=crop&w=500&q=70", "Turmeric powder"],
            ["https://images.unsplash.com/photo-1495461199391-8c39ab674295?auto=format&fit=crop&w=500&q=70", "Ginger root and spice"],
          ].map(([src, alt]) => (
            <div key={src} className="aspect-square overflow-hidden rounded-2xl border border-[#2F4B3C]/10">
              <img src={src} alt={alt} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group relative rounded-sm border border-[#2F4B3C]/15 bg-[#FBF8F1] px-6 pb-6 pt-8 shadow-[0_1px_0_rgba(43,36,28,0.06)] transition-transform hover:-translate-y-1"
              style={{ transform: i % 2 ? "rotate(0.6deg)" : "rotate(-0.6deg)" }}
            >
              {/* twine tab */}
              <span className="absolute -top-3 left-6 h-6 w-6 rounded-full border-2 border-[#8FA894]/50 bg-[#F6EFE2]" />
              <div className="flex items-center gap-3">
                <span className="text-3xl">{s.mark}</span>
                <h3 className="text-lg font-semibold text-[#2B241C]">{s.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#5B5142]">{s.text}</p>
              <span className="mt-4 block h-px w-10 bg-[#C98A2C]/50" />
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES over a herb-photo backdrop */}
      <section className="relative overflow-hidden bg-[#2F4B3C] py-20 text-[#F6EFE2]">
        <img
          src="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1600&q=70"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="container relative grid gap-10 md:grid-cols-3">
          <Feature icon={ShieldCheck} title="Secure accounts" text="Separate, protected access for patients and staff." />
          <Feature icon={CalendarCheck} title="Easy booking" text="Book and manage your appointments in a few taps." />
          <Feature icon={Video} title="Video consultation" text="Join by Zoom link, sent ahead of your appointment." />
        </div>
      </section>

      {checked && !user && (
        <section className="bg-[#F6EFE2] py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C98A2C]">Get Started</p>
          <h2 className="mx-auto mt-3 max-w-lg text-4xl text-[#2B241C]" style={{ fontFamily: "var(--font-display)" }}>
            Start your consultation
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[#5B5142]">
            Register, book your appointment, meet Dr. Princy, and get your digital
            prescription — all in one place.
          </p>
          <Link href="/register" className="mt-8 inline-block">
            <Button size="lg" className="rounded-full bg-[#2F4B3C] px-8 text-[#F6EFE2] hover:bg-[#26392F]">
              Create patient account
            </Button>
          </Link>
        </section>
      )}
    </div>
  );
}

function Feature({ icon: Icon, title, text }) {
  return (
    <div className="rounded-sm border border-[#F6EFE2]/15 bg-white/5 p-6 backdrop-blur-sm">
      <Icon className="h-8 w-8 text-[#C98A2C]" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-[#F6EFE2]/75">{text}</p>
    </div>
  );
}