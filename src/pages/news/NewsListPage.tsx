import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { NewsTable } from "@/components/news/NewsTable";

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
          <Link to="/news/create">
            <Button className="bg-brand-accent focus-ring">
              <Plus className="mr-2 h-4 w-4" />
              Tulis Berita Baru
            </Button>
          </Link>
        </div>
        
        <NewsTable />
      </div>
    </AdminLayout>
  );
}