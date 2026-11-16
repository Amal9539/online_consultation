import Link from "next/link";
import { ArrowRight, CalendarCheck, Leaf, ShieldCheck, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  ["🌿", "Online Consultation", "Consult with Dr. Princy online from the comfort of your home."],
  ["🥗", "Diet Consultation", "Receive personalized Ayurvedic diet guidance."],
  ["🧘", "Lifestyle Guidance", "Build healthier routines with Ayurveda-based guidance."],
  ["🌱", "Herbal Treatment", "Receive traditional herbal treatment guidance."],
  ["🔄", "Follow-up Consultation", "Continue your wellness journey with follow-up care."]
];

export default function HomePage() {
  return (
    <>
      <section className="hero-pattern">
        <div className="container grid min-h-[620px] items-center gap-12 py-20 md:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
              <Leaf className="h-4 w-4" /> Trusted Ayurveda Consultation
            </div>
            <h1 className="max-w-3xl text-5xl font-bold tracking-tight md:text-7xl">
              Heal Naturally with ARAYAL
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Experience personalized online Ayurveda consultation with Dr. Princy.
              Discover holistic healing, lifestyle guidance, and natural wellness
              from the comfort of your home.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register"><Button size="lg">Book Consultation <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              <Link href="/about"><Button size="lg" variant="outline">Learn More</Button></Link>
            </div>
          </div>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex h-[420px] items-center justify-center bg-green-100 text-8xl">👩‍⚕️</div>
              <div className="p-6">
                <p className="text-sm font-semibold text-primary">Ayurveda Consultant</p>
                <h2 className="mt-1 text-2xl font-bold">Dr. Princy</h2>
                <p className="mt-2 text-muted-foreground">10 years of experience · KMCT · Dubai Ayurveda Clinic</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold text-primary">OUR SERVICES</p>
          <h2 className="mt-2 text-4xl font-bold">Personalized Ayurveda Care</h2>
          <p className="mt-4 text-muted-foreground">Simple digital access to the services described in the consultation proposal.</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([icon, title, description]) => (
            <Card key={title} className="transition hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="text-4xl">{icon}</div>
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            <Feature icon={ShieldCheck} title="Secure Accounts" text="Separate patient and doctor/admin access." />
            <Feature icon={CalendarCheck} title="Easy Booking" text="Book and manage online consultation appointments." />
            <Feature icon={Video} title="Video Consultation" text="Doctor can add a Zoom meeting link for the appointment." />
          </div>
        </div>
      </section>

      <section className="container py-20 text-center">
        <h2 className="text-4xl font-bold">Start Your Consultation</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Register as a patient, book your appointment, attend the consultation,
          and access your digital prescription.
        </p>
        <Link href="/register" className="mt-7 inline-block"><Button size="lg">Create Patient Account</Button></Link>
      </section>
    </>
  );
}

function Feature({ icon: Icon, title, text }) {
  return (
    <Card>
      <CardContent className="p-6">
        <Icon className="h-9 w-9 text-primary" />
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      </CardContent>
    </Card>
  );
}
