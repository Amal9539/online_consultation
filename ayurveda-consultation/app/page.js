import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck,
  Leaf,
  ShieldCheck,
  Video,
  Heart,
  MessageCircleQuestion,
  Phone,
  Mail,
  MapPin,
  Stethoscope,
  Pill,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const highlights = [
  { icon: Stethoscope, title: "Expert Ayurvedic Doctors", text: "Consult certified specialists" },
  { icon: Video, title: "Online Consultation", text: "Video / Audio / Chat" },
  { icon: Heart, title: "Personalized Treatment", text: "Get custom advice" },
  { icon: ShieldCheck, title: "Safe & Secure", text: "Your health, our priority" },
];

const steps = [
  { num: "1", icon: CalendarCheck, title: "Book Appointment", text: "Choose your preferred date and time" },
  { num: "2", icon: Video, title: "Consult Doctor", text: "Discuss your health concerns online" },
  { num: "3", icon: Pill, title: "Get Treatment Plan", text: "Receive personalized Ayurvedic advice" },
];

const services = [
  { icon: "🌿", title: "Online Consultation", text: "Consult with Dr. Princy online from the comfort of your home." },
  { icon: "🥗", title: "Diet Consultation", text: "Receive personalized Ayurvedic diet guidance." },
  { icon: "🧘", title: "Lifestyle Guidance", text: "Build healthier routines with Ayurveda-based guidance." },
  { icon: "🌱", title: "Herbal Treatment", text: "Receive traditional herbal treatment guidance." },
  { icon: "🔄", title: "Follow-up Care", text: "Continue your wellness journey with follow-up consultations." },
  { icon: "📋", title: "Digital Prescriptions", text: "Get your prescriptions delivered digitally as PDF." },
];

const faqs = [
  { q: "What is Ayurveda?", a: "Ayurveda is an ancient Indian system of medicine that focuses on holistic healing through natural remedies, diet, and lifestyle changes." },
  { q: "How does online consultation work?", a: "Book an appointment, connect with Dr. Princy via video call, and receive personalized treatment plans and digital prescriptions." },
  { q: "Is online Ayurveda consultation effective?", a: "Yes! Online consultations provide the same quality of care. Dr. Princy can assess your condition, recommend treatments, and provide follow-up care remotely." },
  { q: "How do I receive my prescription?", a: "After your consultation, Dr. Princy will generate a digital prescription (PDF) that you can view and download from your patient dashboard." },
  { q: "Can I upload my medical reports?", a: "Yes, you can upload medical reports (PDF, JPG, PNG) through your patient dashboard for the doctor to review before or during your consultation." },
];

export default function HomePage() {
  return (
    <>
      {/* ============ HERO SECTION ============ */}
      <section className="hero-pattern relative overflow-hidden">
        <div className="container grid min-h-[560px] items-center gap-10 py-16 md:grid-cols-2">
          <div className="relative z-10">
            <p className="mb-3 font-serif text-lg italic text-primary">
              Ancient Wisdom… Modern Care…
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Ayurveda Online
              <br />
              <span className="text-primary">Consultation</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Get expert Ayurvedic advice from the comfort of your home. Live
              consultation, personalized treatment and holistic wellness.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register">
                <Button size="lg" className="rounded-full gap-2 shadow-lg shadow-primary/25">
                  Book Consultation <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="rounded-full">
                  Know More
                </Button>
              </Link>
            </div>
          </div>

          {/* Doctor card */}
          <div className="relative hidden md:flex justify-center">
            <Card className="w-full max-w-sm overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="relative h-[340px] bg-gradient-to-br from-green-100 to-green-50">
                  <Image
                    src="/images/princy.jpeg"
                    alt="Dr. Princy - Ayurveda Consultant"
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Ayurveda Consultant
                  </p>
                  <h2 className="mt-1 text-2xl font-bold">Dr. Princy</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    10 years of experience · KMCT · Dubai Ayurveda Clinic
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ============ HIGHLIGHTS BAR ============ */}
      <section className="relative -mt-8 z-20">
        <div className="container">
          <div className="grid grid-cols-2 gap-3 rounded-2xl border bg-white p-4 shadow-lg md:grid-cols-4 md:p-6">
            {highlights.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-center gap-3 p-2">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">{title}</p>
                  <p className="text-xs text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="container py-20">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-bold md:text-4xl">How It Works?</h2>
          <p className="mt-3 text-muted-foreground">
            Get Ayurvedic consultation in just a few simple steps
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Steps */}
          <div className="flex flex-col justify-center gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="flex items-start gap-5">
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow">
                    {step.num}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.text}</p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="ml-auto hidden h-5 w-5 text-muted-foreground/40 md:block" />
                )}
              </div>
            ))}
          </div>

          {/* CTA card */}
          <Card className="overflow-hidden bg-gradient-to-br from-green-700 to-green-900 text-white">
            <CardContent className="flex h-full flex-col justify-center p-8 md:p-10">
              <h3 className="text-3xl font-bold italic leading-tight md:text-4xl">
                Live Healthy
                <br />
                Naturally
              </h3>
              <p className="mt-4 text-green-100">
                Experience the timeless benefits of Ayurveda for a healthier life.
              </p>
              <Link href="/register" className="mt-6 inline-block">
                <Button size="lg" className="rounded-full bg-white text-green-800 hover:bg-green-50 gap-2 shadow-lg">
                  Start Your Consultation <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="bg-gradient-to-b from-white to-green-50/50 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold uppercase tracking-wider text-primary">Our Services</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Personalized Ayurveda Care</h2>
            <p className="mt-4 text-muted-foreground">
              Simple digital access to holistic Ayurveda healing services.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon, title, text }) => (
              <Card key={title} className="group transition-all hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="text-4xl">{icon}</div>
                  <h3 className="mt-4 text-lg font-semibold group-hover:text-primary transition-colors">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT DOCTOR ============ */}
      <section className="container py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="aspect-square overflow-hidden rounded-3xl bg-green-100 shadow-xl">
              <Image
                src="/images/princy.jpeg"
                alt="Dr. Princy"
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 rounded-2xl bg-primary p-4 text-white shadow-lg">
              <p className="text-2xl font-bold">10+</p>
              <p className="text-xs">Years Experience</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Leaf className="h-5 w-5" /> <span className="text-sm font-semibold uppercase tracking-wider">Ayurveda Consultant</span>
            </div>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Dr. Princy</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Dr. Princy has over 10 years of experience in Ayurvedic medicine and has worked with
              prestigious institutions including KMCT and Dubai Ayurveda Clinic.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              The consultation platform supports online appointments, medical report uploads,
              video consultation access and digital prescriptions — all designed for your convenience.
            </p>
            <Link href="/register" className="mt-7 inline-block">
              <Button size="lg" className="rounded-full gap-2">
                Book Consultation <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FAQs ============ */}
      <section id="faq" className="bg-white py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <MessageCircleQuestion className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-3 text-muted-foreground">
              Everything you need to know about our Ayurveda consultation services.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {faqs.map(({ q, a }, i) => (
              <details key={i} className="group rounded-xl border bg-white transition-shadow open:shadow-md">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 font-medium">
                  {q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-4 text-sm leading-relaxed text-muted-foreground">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="container py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-semibold uppercase tracking-wider text-primary">Get In Touch</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Contact Us</h2>
            <p className="mt-4 text-muted-foreground">
              Have questions about our services? Reach out to us and we&apos;ll be happy to help.
            </p>
            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+91 XXX XXX XXXX</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">contact@arayal.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Kerala, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="flex flex-col items-center justify-center p-10 text-center">
              <div className="mb-4 text-6xl">🌿</div>
              <h3 className="text-2xl font-bold">Ready to Start Your Journey?</h3>
              <p className="mt-3 text-muted-foreground">
                Register as a patient, book your appointment, attend the consultation,
                and access your digital prescription.
              </p>
              <Link href="/register" className="mt-7">
                <Button size="lg" className="rounded-full gap-2 shadow-lg shadow-primary/25">
                  Create Patient Account <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ============ AYURVEDA QUOTE ============ */}
      <section className="bg-gradient-to-r from-green-800 to-green-900 py-14 text-center text-white">
        <div className="container">
          <Leaf className="mx-auto mb-4 h-8 w-8 text-green-300" />
          <blockquote className="mx-auto max-w-2xl text-xl font-medium italic md:text-2xl">
            &ldquo;Ayurveda is not just a medicine, it&apos;s a way of life.&rdquo;
          </blockquote>
          <p className="mt-4 text-green-300">— Ancient Ayurvedic Wisdom</p>
        </div>
      </section>
    </>
  );
}
