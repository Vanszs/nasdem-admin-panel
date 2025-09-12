import { 
  FileText, 
  Image, 
  Users, 
  Calendar, 
  Eye, 
  TrendingUp,
  Clock,
  Archive,
  Sparkles 
} from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/dashboard-hero.jpg";

const Index = () => {
  const breadcrumbs = [
    { label: "Dashboard" }
  ];

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Modern Hero Section with Glassmorphism */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-accent text-white shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_transparent_0%,_rgba(255,255,255,0.1)_50%,_transparent_100%)]" />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          {/* Floating Elements */}
          <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-white/10 to-accent/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-br from-accent/10 to-white/10 rounded-full blur-xl animate-pulse delay-1000" />
          
          <div className="relative p-10 lg:p-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <Sparkles className="h-6 w-6" />
              </div>
              <Badge className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                v2.0 Modern
              </Badge>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text">
              Selamat Datang di Admin Panel
            </h1>
            <p className="text-white/90 text-xl mb-2 font-medium">
              DPD Partai NasDem Kabupaten Sidoarjo
            </p>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              Kelola konten, berita, galeri, dan struktur organisasi dengan antarmuka modern yang intuitive dan powerful.
            </p>
            
            {/* Quick Stats */}
            <div className="mt-8 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/80">Sistem Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span className="text-white/80">Database Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                <span className="text-white/80">Auto Backup Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary KPI Grid */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Overview Statistik</h2>
            <p className="text-muted-foreground">Ringkasan performa dan aktivitas sistem real-time</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard
              title="Total Berita"
              value={47}
              change={{ value: "8", type: "increase", period: "bulan ini" }}
              icon={FileText}
              description="23 published, 5 draft"
              color="primary"
              className="hover:scale-[1.02]"
            />
            <KPICard
              title="Berita Terbaca"
              value="12.4K"
              change={{ value: "15%", type: "increase", period: "minggu ini" }}
              icon={Eye}
              description="Pengunjung unik"
              color="success"
              className="hover:scale-[1.02]"
            />
            <KPICard
              title="Media Galeri"
              value={238}
              change={{ value: "24", type: "increase", period: "bulan ini" }}
              icon={Image}
              description="15 album aktif"
              color="info"
              className="hover:scale-[1.02]"
            />
            <KPICard
              title="Struktur Aktif"
              value={156}
              change={{ value: "3", type: "increase", period: "bulan ini" }}
              icon={Users}
              description="DPD, Sayap, DPC, DPRT"
              color="accent"
              className="hover:scale-[1.02]"
            />
          </div>

          {/* Secondary Metrics */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Aktivitas & Jadwal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard
                title="Berita Terjadwal"
                value={3}
                icon={Clock}
                description="Siap publikasi otomatis"
                color="warning"
                className="hover:scale-[1.02]"
              />
              <KPICard
                title="Draft Tersimpan"
                value={8}
                icon={Archive}
                description="Menunggu review"
                color="info"
                className="hover:scale-[1.02]"
              />
              <KPICard
                title="Aktivitas Hari Ini"
                value={15}
                change={{ value: "12", type: "increase" }}
                icon={TrendingUp}
                description="Pembaruan konten"
                color="success"
                className="hover:scale-[1.02]"
              />
              <KPICard
                title="Event Mendatang"
                value={2}
                icon={Calendar}
                description="7 hari ke depan"
                color="accent"
                className="hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Dashboard Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full" />
                  Aktivitas Terbaru
                </h3>
                <RecentActivity />
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-accent to-primary rounded-full" />
                  Quick Actions
                </h3>
                <QuickActions />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Index;
