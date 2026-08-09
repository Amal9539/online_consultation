import Link from "next/link";
import { Download, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PrescriptionCard({ prescription }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center">
        <Pill className="h-8 w-8 text-primary" />
        <div className="flex-1">
          <h3 className="font-semibold">Prescription #{prescription.id}</h3>
          <p className="text-sm text-muted-foreground">
            {new Date(prescription.createdAt).toLocaleDateString()}
          </p>
          <p className="mt-1 text-sm">{prescription.diagnosis || "Ayurveda treatment"}</p>
        </div>
        <Link href={`/api/prescriptions/${prescription.id}`} target="_blank">
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> PDF</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
