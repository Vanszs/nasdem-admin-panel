import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Plus } from "lucide-react";

export function StructurePage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Struktur" },
    { label: "DPD" }
  ];

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Struktur DPD</h1>
            <p className="text-muted-foreground">Kelola pengurus DPD Partai NasDem Sidoarjo</p>
          </div>
          <Button className="bg-brand-accent">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Pengurus
          </Button>
        </div>

        <Card className="admin-card p-12 text-center">
          <Users className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Struktur Organisasi</h3>
          <p className="text-muted-foreground">Tambahkan entri BPH untuk menampilkan di landing page.</p>
        </Card>
      </div>
    </AdminLayout>
  );
}