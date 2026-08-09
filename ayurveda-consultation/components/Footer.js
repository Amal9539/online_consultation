import { Leaf, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xl font-bold">
            <Leaf className="h-6 w-6" />
            ARAYAL
          </div>
          <p className="text-sm text-slate-300">
            Online Ayurveda consultation, diet guidance, lifestyle guidance,
            herbal treatment and follow-up care.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Services</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>Online Consultation</li>
            <li>Diet Consultation</li>
            <li>Lifestyle Guidance</li>
            <li>Herbal Treatment</li>
            <li>Follow-up Consultation</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Contact</h3>
          <div className="space-y-3 text-sm text-slate-300">
            <p>Dr. Princy</p>
            <p className="flex gap-2"><Phone className="h-4 w-4" /> Ayurveda Consultant</p>
            <p className="flex gap-2"><Mail className="h-4 w-4" /> Online Consultation</p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 py-5 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} ARAYAL. All rights reserved.
      </div>
    </footer>
  );
}
