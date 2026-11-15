import Link from "next/link";
import { Leaf, CalendarCheck, HeartPulse, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <>
      <section className="hero-pattern py-20">
        <div className="container text-center">
          <p className="font-semibold text-primary">ABOUT ARAYAL</p>
          <h1 className="mt-3 text-5xl font-bold">Natural Healing Through Ayurveda</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">Personalized online Ayurveda consultation and wellness guidance.</p>
        </div>
      </section>

      <section className="container grid gap-12 py-20 md:grid-cols-2 md:items-center">
        <div className="flex h-96 items-center justify-center rounded-2xl bg-green-100 text-8xl">👩‍⚕️</div>
        <div>
          <div className="flex items-center gap-2 text-primary"><Leaf className="h-5 w-5" /> Ayurveda Consultant</div>
          <h2 className="mt-3 text-4xl font-bold">Dr. Princy</h2>
          <p className="mt-5 text-muted-foreground">Dr. Princy has 10 years of experience and works with KMCT and Dubai Ayurveda Clinic.</p>
          <p className="mt-3 text-muted-foreground">The consultation platform is designed to support online appointments, medical report uploads, video consultation access and digital prescriptions.</p>
          <Link href="/register" className="mt-7 inline-block"><Button>Book Consultation</Button></Link>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container grid gap-5 md:grid-cols-3">
          <Info icon={CalendarCheck} title="Appointments" text="Book online Ayurveda consultations." />
          <Info icon={HeartPulse} title="Patient Records" text="Keep reports and consultation history organized." />
          <Info icon={UserRound} title="Doctor Care" text="Doctor/admin can review patients and create prescriptions." />
        </div>
      </section>
    </>
  );
}

function Info({ icon: Icon, title, text }) {
  return <Card><CardContent className="p-6"><Icon className="h-8 w-8 text-primary" /><h3 className="mt-4 text-xl font-semibold">{title}</h3><p className="mt-2 text-muted-foreground">{text}</p></CardContent></Card>;
}
