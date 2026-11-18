import { CalendarDays, Clock, Video, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    <Card className="rounded-3xl border border-emerald-950/10 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                appointment.status === "SCHEDULED"
                  ? "bg-emerald-100 text-emerald-800"
                  : appointment.status === "COMPLETED"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {appointment.status}
            </span>
            <span className="text-xs text-slate-400">Appointment #{appointment.id}</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-[#143d23]">
            {appointment.consultationType}
          </h3>
          <p className="text-xs font-semibold text-emerald-700">Dr. Princy (Ayurveda Consultant)</p>

          <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <CalendarDays className="h-4 w-4 text-emerald-700" />
              {new Date(appointment.date).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="h-4 w-4 text-emerald-700" />
              <span>Assigned Time: </span>
              <strong className="text-[#143d23]">{appointment.time || "Pending Doctor Assignment"}</strong>
            </span>
          </div>

          {appointment.reason && (
            <p className="mt-1 text-xs text-slate-500 italic">
              Note: {appointment.reason}
            </p>
          )}
        </div>

        <div className="shrink-0 flex items-center gap-2">
          {canJoin ? (
            <a href={meetingUrl} target="_blank" rel="noopener noreferrer">
              <button className="flex items-center gap-2 rounded-full bg-[#18532f] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#123e23] transition-all">
                <Video className="h-4 w-4" />
                <span>Join Video Call</span>
              </button>
            </a>
          ) : isPendingLink ? (
            <div className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800 border border-emerald-200">
              Video Link Pending
            </div>
          ) : (
            <span className="text-xs text-slate-400 font-medium">{appointment.status}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
