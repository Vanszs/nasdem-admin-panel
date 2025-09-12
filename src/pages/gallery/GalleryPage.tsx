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
      <div className="space-y-6">
        {/* Header Section with Border */}
        <div className="bg-white/70 backdrop-blur-sm border-2 border-gray-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Kelola Galeri</h1>
              <p className="text-muted-foreground">Upload dan organisir foto dan media</p>
            </div>
            <Button className="bg-brand-accent border-2 border-brand-accent/20 hover:border-brand-accent/40 transition-all duration-300">
              <Upload className="mr-2 h-4 w-4" />
              Upload Media
            </Button>
          </div>
        </div>

        {/* Main Content Card with Enhanced Border */}
        <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-200/80 hover:border-gray-300/90 shadow-lg hover:shadow-xl transition-all duration-300 p-12 text-center">
          <Image className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4 p-2 border-2 border-dashed border-gray-300/60 rounded-2xl" />
          <h3 className="text-lg font-semibold mb-2">Galeri Media</h3>
          <p className="text-muted-foreground">Unggah foto untuk mulai membangun galeri.</p>
        </Card>
      </div>
    </AdminLayout>
  );
}