import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Image } from "lucide-react";

export function GalleryPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Galeri" }
  ];

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Kelola Galeri</h1>
            <p className="text-muted-foreground">Upload dan organisir foto dan media</p>
          </div>
          <Button className="bg-brand-accent">
            <Upload className="mr-2 h-4 w-4" />
            Upload Media
          </Button>
        </div>

        <Card className="admin-card p-12 text-center">
          <Image className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Galeri Media</h3>
          <p className="text-muted-foreground">Unggah foto untuk mulai membangun galeri.</p>
        </Card>
      </div>
    </AdminLayout>
  );
}