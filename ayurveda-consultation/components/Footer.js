import Link from "next/link";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="mb-3 flex items-center gap-2 text-xl font-bold">
            <Leaf className="h-6 w-6 text-green-400" />
            ARAYAL
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Ayurveda for a Healthier Life. Online consultation, diet guidance,
            lifestyle guidance, herbal treatment and follow-up care.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 font-semibold">Quick Links</h3>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/#faq" className="hover:text-white transition-colors">FAQs</Link></li>
            <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-4 font-semibold">Services</h3>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>Online Consultation</li>
            <li>Diet Consultation</li>
            <li>Lifestyle Guidance</li>
            <li>Herbal Treatment</li>
            <li>Digital Prescriptions</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 font-semibold">Contact</h3>
          <div className="space-y-3 text-sm text-slate-400">
            <p className="font-medium text-white">Dr. Princy</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-green-400" /> +91 XXX XXX XXXX</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-green-400" /> contact@arayal.com</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-green-400" /> Kerala, India</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-5 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} ARAYAL — Ayurveda for a Healthier Life. All rights reserved.
      </div>
    </footer>
  );
}
