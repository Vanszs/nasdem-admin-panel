import { Plus } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { NewsTable } from "@/components/news/NewsTable";
import { SafeLink } from "@/components/layout/SafeLink";

export function NewsListPage() {
  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Berita" }
  ];

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Kelola Berita</h1>
            <p className="text-muted-foreground">
              Buat, edit, dan kelola artikel untuk publikasi website.
            </p>
          </div>
          <SafeLink to="/news/create">
            <Button className="bg-brand-accent focus-ring">
              <Plus className="mr-2 h-4 w-4" />
              Tulis Berita Baru
            </Button>
          </SafeLink>
        </div>
        
        <NewsTable />
      </div>
    </AdminLayout>
  );
}