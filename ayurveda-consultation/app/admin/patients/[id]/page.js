import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PatientDetailPage({ params }) {
  const user = await getCurrentUser({ cookies: cookies() });

  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  const id = Number(params.id);

  const patient = await prisma.user.findFirst({
    where: { id, role: "PATIENT" },
    select: {
      id: true, name: true, email: true, phone: true, age: true, gender: true, address: true, createdAt: true,
      reports: { orderBy: { createdAt: "desc" } },
      appointments: { orderBy: { date: "desc" }, include: { patient: { select: { id: true, name: true, email: true } } } },
      prescriptions: { orderBy: { createdAt: "desc" }, select: { id: true, diagnosis: true, medicines: true, instructions: true, pdfPath: true, createdAt: true } },
    },
  });

  if (!patient) {
    return (
      <div className="md:flex">
        <AdminSidebar />
        <main className="min-w-0 flex-1 p-5 md:p-8">
          <p className="text-sm text-muted-foreground">Patient not found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="md:flex">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-5 md:p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{patient.name}</h1>
          <p className="text-muted-foreground">{patient.email}</p>
        </div>

        <Card>
          <CardHeader><CardTitle>Patient Info</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            <p><strong>Phone:</strong> {patient.phone || "-"}</p>
            <p><strong>Age:</strong> {patient.age || "-"}</p>
            <p><strong>Gender:</strong> {patient.gender || "-"}</p>
            <p><strong>Address:</strong> {patient.address || "-"}</p>
            <p><strong>Registered:</strong> {new Date(patient.createdAt).toLocaleDateString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Appointments ({patient.appointments.length})</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {patient.appointments.length === 0 && <p className="text-sm text-muted-foreground">No appointments.</p>}
            {patient.appointments.map(a => (
              <div key={a.id} className="text-sm border-b pb-2">
                {new Date(a.date).toLocaleString()} — {a.status || "scheduled"}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Prescriptions ({patient.prescriptions.length})</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {patient.prescriptions.length === 0 && <p className="text-sm text-muted-foreground">No prescriptions.</p>}
            {patient.prescriptions.map(p => (
              <div key={p.id} className="text-sm border-b pb-2">
                <div className="flex items-center justify-between">
                  <p><strong>{p.diagnosis}</strong></p>
                  <div className="flex gap-3">
                    <a href={`/api/prescriptions/${p.id}`} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                      View PDF
                    </a>
                    <a href={`/admin/prescriptions/${p.id}/edit`} className="text-primary underline">
                      Edit
                    </a>
                  </div>
                </div>
                <p>{p.medicines}</p>
                <p className="text-muted-foreground">{p.instructions}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Reports ({patient.reports.length})</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {patient.reports.length === 0 && <p className="text-sm text-muted-foreground">No reports.</p>}
            {patient.reports.map(r => (
              <div key={r.id} className="flex items-center justify-between text-sm border-b pb-2">
                <span>{r.name || "Report"} — {new Date(r.createdAt).toLocaleDateString()}</span>
                <a href={`/api/reports/${r.id}`} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  View
                </a>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}