import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Image, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function GalleryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Responsive items per page - no need to scroll
  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1536) return 20; // 2xl screens
      if (window.innerWidth >= 1280) return 16; // xl screens  
      if (window.innerWidth >= 1024) return 12; // lg screens
      if (window.innerWidth >= 768) return 8;   // md screens
      return 6; // sm screens
    }
    return 12; // default
  };
  
  const [itemsPerPage] = useState(getItemsPerPage());
  
  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Galeri" }
  ];

  // Mock data untuk simulasi - no scroll needed
  const totalItems = itemsPerPage * 4; // Only show 4 pages max
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

        {/* Modern Pagination Controls untuk Galeri */}
        {totalItems > 0 && totalPages > 1 && (
          <div className="flex items-center justify-between pt-6">
            <div className="text-sm text-muted-foreground">
              Halaman {currentPage} dari {totalPages} ({totalItems} total media)
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-2 border-gray-200 hover:border-gray-300"
              >
                <ChevronLeft className="h-4 w-4" />
                Sebelumnya
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                  return page <= totalPages ? (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={`min-w-[40px] border-2 ${
                        page === currentPage 
                          ? 'bg-primary border-primary text-white' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {page}
                    </Button>
                  ) : null;
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-2 border-gray-200 hover:border-gray-300"
              >
                Selanjutnya
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}