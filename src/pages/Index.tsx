import { 
  FileText, 
  Image, 
  Users, 
  Calendar, 
  Eye, 
  TrendingUp,
  Clock,
  Archive 
} from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import heroImage from "@/assets/dashboard-hero.jpg";

const Index = () => {
  const breadcrumbs = [
    { label: "Dashboard" }
  ];

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="relative p-8">
            <h1 className="text-3xl font-bold mb-2">
              Selamat Datang di Admin CMS
            </h1>
            <p className="text-primary-foreground/90 text-lg mb-4">
              DPD Partai NasDem Kabupaten Sidoarjo
            </p>
            <p className="text-primary-foreground/80">
              Kelola konten, berita, galeri, dan struktur organisasi dengan mudah.
            </p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Berita"
            value={47}
            change={{ value: "8", type: "increase", period: "bulan ini" }}
            icon={FileText}
            description="23 published, 5 draft"
            color="primary"
          />
          <KPICard
            title="Berita Terbaca"
            value="12.4K"
            change={{ value: "15%", type: "increase", period: "minggu ini" }}
            icon={Eye}
            description="Pengunjung unik"
            color="success"
          />
          <KPICard
            title="Media Galeri"
            value={238}
            change={{ value: "24", type: "increase", period: "bulan ini" }}
            icon={Image}
            description="15 album aktif"
            color="info"
          />
          <KPICard
            title="Struktur Aktif"
            value={156}
            change={{ value: "3", type: "increase", period: "bulan ini" }}
            icon={Users}
            description="DPD, Sayap, DPC, DPRT"
            color="accent"
          />
        </div>

        {/* Secondary KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Berita Terjadwal"
            value={3}
            icon={Clock}
            description="Siap publikasi otomatis"
            color="warning"
          />
          <KPICard
            title="Draft Tersimpan"
            value={8}
            icon={Archive}
            description="Menunggu review"
            color="info"
          />
          <KPICard
            title="Aktivitas Hari Ini"
            value={15}
            change={{ value: "12", type: "increase" }}
            icon={TrendingUp}
            description="Pembaruan konten"
            color="success"
          />
          <KPICard
            title="Event Mendatang"
            value={2}
            icon={Calendar}
            description="7 hari ke depan"
            color="accent"
          />
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Index;
