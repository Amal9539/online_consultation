import { CalendarDays, Clock, Video, User, Leaf, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AppointmentCard({ appointment }) {
  const canJoin = appointment.status === "SCHEDULED" && appointment.zoomLink;
  const isPendingLink = appointment.status === "SCHEDULED" && !appointment.zoomLink;

  const meetingUrl = appointment.zoomLink
    ? /^https?:\/\//.test(appointment.zoomLink)
      ? appointment.zoomLink
      : `https://${appointment.zoomLink}`
    : null;

  return (
    <Card className="overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-sm hover:shadow-md transition-all">
      <div className="border-b border-emerald-900/10 bg-gradient-to-r from-[#f2f8ef] to-[#e7f3e4] px-6 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 font-semibold text-[#18532f]">
          <Leaf className="h-3.5 w-3.5" />
          <span>Ayurvedic Video Consultation</span>
        </div>
        <span
          className={`rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
            appointment.status === "SCHEDULED"
              ? "bg-emerald-100 text-emerald-800"
              : appointment.status === "COMPLETED"
              ? "bg-amber-100 text-amber-900"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {appointment.status}
        </span>
      </div>

      <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-emerald-800">Session #{appointment.id}</span>
            <span>·</span>
            <span className="flex items-center gap-1 text-slate-600">
              <Stethoscope className="h-3.5 w-3.5 text-emerald-700" />
              Dr. Princy (BAMS) · KMCT & Dubai Clinic
            </span>
          </div>

          <h3 className="font-serif text-lg font-bold text-[#143d23]">
            {appointment.consultationType}
          </h3>

          <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-700">
            <span className="flex items-center gap-1.5 font-medium rounded-xl bg-emerald-50/80 px-3 py-1.5 border border-emerald-100">
              <CalendarDays className="h-4 w-4 text-[#18532f]" />
              {new Date(appointment.date).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5 font-medium rounded-xl bg-amber-50/80 px-3 py-1.5 border border-amber-200/60">
              <Clock className="h-4 w-4 text-amber-800" />
              <span className="text-amber-900">Time: </span>
              <strong className="text-[#143d23]">
                {appointment.time || "Assigned by Dr. Princy prior to call"}
              </strong>
            </span>
          </div>

          {appointment.reason && (
            <p className="mt-2 text-xs text-slate-600 italic bg-[#faf8f3] p-2.5 rounded-xl border border-emerald-950/5">
              <span className="font-semibold text-[#18532f] not-italic">Health Focus: </span>
              {appointment.reason}
            </p>
          )}
        </div>

        <div className="shrink-0 flex items-center gap-2">
          {canJoin ? (
            <a href={meetingUrl} target="_blank" rel="noopener noreferrer">
              <button className="flex items-center gap-2 rounded-full bg-[#18532f] px-6 py-3 text-xs font-bold text-white shadow-lg shadow-[#18532f]/25 hover:bg-[#123e23] transition-all">
                <Video className="h-4 w-4" />
                <span>Join Video Consultation</span>
              </button>
            </a>
          ) : isPendingLink ? (
            <div className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800 border border-emerald-200 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Doctor Link Pending</span>
            </div>
          ) : (
            <span className="text-xs text-slate-400 font-medium">{appointment.status}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
