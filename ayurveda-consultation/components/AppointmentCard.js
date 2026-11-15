import { CalendarDays, Clock, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function getMeetingUrl(appointment) {
  const link =
    appointment.zoomLink ||
    `https://meet.jit.si/arayal-consultation-${appointment.id}`;
  return /^https?:\/\//.test(link) ? link : `https://${link}`;
}

export default function AppointmentCard({ appointment }) {
  const canJoin = appointment.status === "SCHEDULED";

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <Badge variant={appointment.status === "SCHEDULED" ? "default" : "secondary"}>
            {appointment.status}
          </Badge>
          <h3 className="mt-2 font-semibold">{appointment.consultationType}</h3>
          <p className="text-sm text-muted-foreground">Dr. Princy</p>
          <div className="mt-2 flex flex-wrap gap-4 text-sm">
            <span className="flex gap-1">
              <CalendarDays className="h-4 w-4" />
              {new Date(appointment.date).toLocaleDateString()}
            </span>
            <span className="flex gap-1">
              <Clock className="h-4 w-4" />
              {appointment.time}
            </span>
          </div>
        </div>

        {canJoin && (
          <a href="https://us05web.zoom.us/myhome" target="_blank" rel="noopener noreferrer">
            <Button>
              <Video className="mr-2 h-4 w-4" /> Join Consultation
            </Button>
          </a>
        )}
      </CardContent>
    </Card>
  );
}