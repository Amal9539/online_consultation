import Link from "next/link";
import { FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ReportCard({ report }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <FileText className="h-8 w-8 text-primary" />
        <div className="flex-1">
          <h3 className="font-medium">{report.name}</h3>
          <p className="text-sm text-muted-foreground">
            {new Date(report.createdAt).toLocaleDateString()} · {Math.round(report.size / 1024)} KB
          </p>
        </div>
<<<<<<< HEAD
        <Link href={`/api/reports?id=${report.id}`} target="_blank">
=======
        <Link href={`/api/reports/${report.id}`} target="_blank">
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
          <Button variant="outline"><ExternalLink className="mr-2 h-4 w-4" /> View</Button>
        </Link>
      </CardContent>
    </Card>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
