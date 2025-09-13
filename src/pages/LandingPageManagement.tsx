import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Home, 
  Upload, 
  Image, 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Users,
  Target,
  Calendar,
  TrendingUp,
  Play,
  Pause,
  Settings,
  Eye,
  Camera,
  MapPin,
  Phone,
  Mail,
  Clock
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  isActive: boolean;
  order: number;
}

interface AboutSection {
  id: string;
  title: string;
  content: string;
  image: string;
  lastUpdated: string;
}

interface Program {
  id: string;
  title: string;
  description: string;
  status: "Berlangsung" | "Selesai" | "Tertunda" | "Perencanaan";
  target: string;
  progress: number;
  timeline: string;
  details: string[];
  achievements: string[];
  category: string;
  budget?: string;
  coordinator?: string;
}

interface ContactInfo {
  id: string;
  type: "address" | "phone" | "email" | "socialMedia" | "workingHours";
  label: string;
  value: string;
  icon: string;
  isActive: boolean;
}

// Mock Data
const mockBanners: HeroBanner[] = [
  {
    id: "1",
    title: "Selamat Datang di DPD NasDem Sidoarjo",
    subtitle: "Bersama membangun Sidoarjo yang lebih baik untuk generasi mendatang",
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=1200&h=600&fit=crop",
    isActive: true,
    order: 1
  },
  {
    id: "2", 
    title: "Komitmen Untuk Rakyat",
    subtitle: "Mewujudkan pemerintahan yang bersih, transparan, dan melayani rakyat",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop",
    isActive: true,
    order: 2
  }
];

const mockAbout: AboutSection = {
  id: "1",
  title: "Tentang Kami",
  content: "DPD Partai NasDem Kabupaten Sidoarjo berkomitmen untuk mewujudkan visi restorasi Indonesia menuju negara yang berdaulat, adil, dan makmur. Kami hadir sebagai wadah aspirasi masyarakat Sidoarjo untuk membangun daerah yang lebih baik.",
  image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
  lastUpdated: "2024-01-15"
};

const mockPrograms: Program[] = [
  {
    id: "1",
    title: "Pendidikan Inklusif",
    description: "Program komprehensif untuk meningkatkan akses pendidikan berkualitas bagi seluruh masyarakat Sidoarjo",
    status: "Berlangsung",
    target: "1000 penerima beasiswa",
    progress: 75,
    timeline: "2024-2026",
    category: "Pendidikan",
    budget: "5 Miliar",
    coordinator: "Dr. Ahmad Muhaimin",
    details: [
      "Fasilitasi beasiswa PIP/KIP untuk siswa kurang mampu",
      "Pelatihan keterampilan digital untuk generasi muda", 
      "Program literasi untuk orang dewasa",
      "Beasiswa kuliah untuk mahasiswa berprestasi"
    ],
    achievements: [
      "750 siswa mendapat beasiswa",
      "15 pusat belajar digital didirikan",
      "200 orang dewasa lulus program literasi"
    ]
  },
  {
    id: "2",
    title: "Bantuan Pangan Berkelanjutan",
    description: "Program ketahanan pangan untuk masyarakat kurang mampu dengan distribusi beras dan sembako",
    status: "Berlangsung", 
    target: "5000 keluarga penerima",
    progress: 60,
    timeline: "2024-2025",
    category: "Sosial",
    budget: "3 Miliar",
    coordinator: "Hj. Siti Aminah",
    details: [
      "Distribusi beras berkualitas setiap bulan",
      "Paket sembako lengkap untuk keluarga prasejahtera",
      "Program gizi untuk balita dan ibu hamil",
      "Pelatihan budidaya sayuran rumahan"
    ],
    achievements: [
      "3000 keluarga telah menerima bantuan",
      "709 ton beras didistribusikan",
      "150 kebun rumahan dibuat"
    ]
  }
];

const mockContacts: ContactInfo[] = [
  {
    id: "1",
    type: "address",
    label: "Alamat Kantor",
    value: "Jl. Raya Sidoarjo No. 123, Sidoarjo, Jawa Timur 61215",
    icon: "MapPin",
    isActive: true
  },
  {
    id: "2", 
    type: "phone",
    label: "Telepon",
    value: "(031) 8945678",
    icon: "Phone", 
    isActive: true
  },
  {
    id: "3",
    type: "email", 
    label: "Email",
    value: "info@nasdems.id",
    icon: "Mail",
    isActive: true
  },
  {
    id: "4",
    type: "workingHours",
    label: "Jam Operasional",
    value: "Senin - Jumat: 08:00 - 16:00 WIB",
    icon: "Clock",
    isActive: true
  }
];

export function LandingPageManagement() {
  const [banners, setBanners] = useState<HeroBanner[]>(mockBanners);
  const [about, setAbout] = useState<AboutSection>(mockAbout);
  const [programs, setPrograms] = useState<Program[]>(mockPrograms);
  const [contacts, setContacts] = useState<ContactInfo[]>(mockContacts);
  
  const [isBannerDialogOpen, setIsBannerDialogOpen] = useState(false);
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false);
  const [isProgramDialogOpen, setIsProgramDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  
  const [editingBanner, setEditingBanner] = useState<HeroBanner | null>(null);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [editingContact, setEditingContact] = useState<ContactInfo | null>(null);
  
  const [bannerForm, setBannerForm] = useState({
    title: "",
    subtitle: "",
    image: "",
    isActive: true,
    order: 1
  });
  
  const [programForm, setProgramForm] = useState({
    title: "",
    description: "",
    status: "Perencanaan" as Program["status"],
    target: "",
    progress: 0,
    timeline: "",
    category: "",
    budget: "",
    coordinator: "",
    details: "",
    achievements: ""
  });
  
  const [contactForm, setContactForm] = useState({
    type: "address" as ContactInfo["type"],
    label: "",
    value: "",
    icon: "MapPin",
    isActive: true
  });
  
  const { toast } = useToast();

  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Landing Page" }
  ];

  const statusConfig = {
    "Berlangsung": { 
      className: "text-white border-2",
      style: { backgroundColor: 'var(--color-success)', borderColor: 'var(--color-success)' }
    },
    "Selesai": { 
      className: "text-white border-2",
      style: { backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)' }
    },
    "Tertunda": { 
      className: "text-white border-2", 
      style: { backgroundColor: 'var(--color-warning)', borderColor: 'var(--color-warning)' }
    },
    "Perencanaan": { 
      className: "text-white border-2",
      style: { backgroundColor: 'var(--color-info)', borderColor: 'var(--color-info)' }
    }
  };

  const handleBannerSubmit = () => {
    if (!bannerForm.title || !bannerForm.subtitle) {
      toast({
        title: "Error",
        description: "Judul dan subtitle wajib diisi",
        variant: "destructive"
      });
      return;
    }

    if (editingBanner) {
      setBanners(prev => prev.map(banner => 
        banner.id === editingBanner.id 
          ? { ...banner, ...bannerForm }
          : banner
      ));
      toast({
        title: "Berhasil",
        description: "Banner berhasil diperbarui",
      });
    } else {
      const newBanner: HeroBanner = {
        id: Date.now().toString(),
        ...bannerForm
      };
      setBanners(prev => [...prev, newBanner]);
      toast({
        title: "Berhasil",
        description: "Banner berhasil ditambahkan",
      });
    }

    setIsBannerDialogOpen(false);
    setEditingBanner(null);
    setBannerForm({
      title: "",
      subtitle: "",
      image: "",
      isActive: true,
      order: 1
    });
  };

  const handleProgramSubmit = () => {
    if (!programForm.title || !programForm.description) {
      toast({
        title: "Error", 
        description: "Judul dan deskripsi wajib diisi",
        variant: "destructive"
      });
      return;
    }

    const programData = {
      ...programForm,
      details: programForm.details.split('\n').filter(Boolean),
      achievements: programForm.achievements.split('\n').filter(Boolean)
    };

    if (editingProgram) {
      setPrograms(prev => prev.map(program => 
        program.id === editingProgram.id 
          ? { ...program, ...programData }
          : program
      ));
      toast({
        title: "Berhasil",
        description: "Program berhasil diperbarui",
      });
    } else {
      const newProgram: Program = {
        id: Date.now().toString(),
        ...programData
      };
      setPrograms(prev => [...prev, newProgram]);
      toast({
        title: "Berhasil", 
        description: "Program berhasil ditambahkan",
      });
    }

    setIsProgramDialogOpen(false);
    setEditingProgram(null);
    setProgramForm({
      title: "",
      description: "",
      status: "Perencanaan",
      target: "",
      progress: 0,
      timeline: "",
      category: "",
      budget: "",
      coordinator: "",
      details: "",
      achievements: ""
    });
  };

  const handleContactSubmit = () => {
    if (!contactForm.label || !contactForm.value) {
      toast({
        title: "Error",
        description: "Label dan nilai wajib diisi",
        variant: "destructive"
      });
      return;
    }

    if (editingContact) {
      setContacts(prev => prev.map(contact => 
        contact.id === editingContact.id 
          ? { ...contact, ...contactForm }
          : contact
      ));
      toast({
        title: "Berhasil",
        description: "Kontak berhasil diperbarui",
      });
    } else {
      const newContact: ContactInfo = {
        id: Date.now().toString(),
        ...contactForm
      };
      setContacts(prev => [...prev, newContact]);
      toast({
        title: "Berhasil",
        description: "Kontak berhasil ditambahkan",
      });
    }

    setIsContactDialogOpen(false);
    setEditingContact(null);
    setContactForm({
      type: "address",
      label: "",
      value: "",
      icon: "MapPin",
      isActive: true
    });
  };

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header */}
        <div 
          className="backdrop-blur-sm border-2 border-gray-300/80 rounded-2xl p-6 shadow-lg"
          style={{ backgroundColor: 'var(--color-surface)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                Kelola Landing Page
              </h1>
              <p style={{ color: 'var(--color-muted)' }}>
                Kelola konten dan tampilan halaman landing page website
              </p>
            </div>
            <Button 
              style={{ 
                backgroundColor: 'var(--color-accent)', 
                color: 'white',
                border: '2px solid var(--color-accent)',
                borderRadius: '0.75rem'
              }}
              className="hover:opacity-90 focus-ring transition-all duration-300 font-medium"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview Landing Page
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 border-2 border-gray-200">
            <TabsTrigger value="hero">Hero Banner</TabsTrigger>
            <TabsTrigger value="about">Tentang Kami</TabsTrigger>
            <TabsTrigger value="programs">Program Kerja</TabsTrigger>
            <TabsTrigger value="contact">Kontak</TabsTrigger>
          </TabsList>

          {/* Hero Banner Tab */}
          <TabsContent value="hero">
            <Card className="border-2 border-gray-300/80 shadow-lg" style={{ backgroundColor: 'var(--color-surface)' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                    <Image className="h-5 w-5" />
                    Hero Banner ({banners.length})
                  </CardTitle>
                  <Dialog open={isBannerDialogOpen} onOpenChange={setIsBannerDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        style={{ 
                          backgroundColor: 'var(--color-accent)', 
                          color: 'white',
                          border: '2px solid var(--color-accent)',
                          borderRadius: '0.75rem'
                        }}
                        className="hover:opacity-90 transition-all duration-300"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Banner
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl border-2 border-gray-300/80">
                      <DialogHeader>
                        <DialogTitle>
                          {editingBanner ? "Edit Banner" : "Tambah Banner Baru"}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="grid grid-cols-1 gap-4 py-4">
                        <div>
                          <Label htmlFor="title">Judul *</Label>
                          <Input
                            id="title"
                            value={bannerForm.title}
                            onChange={(e) => setBannerForm(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Masukkan judul banner"
                            className="border-2 border-gray-200 hover:border-gray-300"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="subtitle">Subtitle *</Label>
                          <Textarea
                            id="subtitle"
                            value={bannerForm.subtitle}
                            onChange={(e) => setBannerForm(prev => ({ ...prev, subtitle: e.target.value }))}
                            placeholder="Masukkan subtitle banner"
                            className="border-2 border-gray-200 hover:border-gray-300"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="image">URL Gambar</Label>
                          <Input
                            id="image"
                            value={bannerForm.image}
                            onChange={(e) => setBannerForm(prev => ({ ...prev, image: e.target.value }))}
                            placeholder="https://example.com/image.jpg"
                            className="border-2 border-gray-200 hover:border-gray-300"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="order">Urutan</Label>
                            <Input
                              id="order"
                              type="number"
                              min="1"
                              value={bannerForm.order}
                              onChange={(e) => setBannerForm(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                              className="border-2 border-gray-200 hover:border-gray-300"
                            />
                          </div>
                          
                          <div className="flex items-center space-x-2 pt-6">
                            <input
                              type="checkbox"
                              id="isActive"
                              checked={bannerForm.isActive}
                              onChange={(e) => setBannerForm(prev => ({ ...prev, isActive: e.target.checked }))}
                              className="rounded border-2"
                            />
                            <Label htmlFor="isActive">Aktif</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsBannerDialogOpen(false)}>
                          Batal
                        </Button>
                        <Button onClick={handleBannerSubmit}>
                          {editingBanner ? "Perbarui" : "Tambah"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {banners.map((banner) => (
                    <div key={banner.id} className="relative group">
                      <div className="border-2 border-gray-200 hover:border-primary/50 rounded-lg overflow-hidden transition-all duration-300">
                        <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center">
                          {banner.image ? (
                            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                          ) : (
                            <Camera className="h-12 w-12 text-gray-400" />
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-sm line-clamp-1">{banner.title}</h3>
                            <Badge 
                              className={banner.isActive ? "text-white border-2" : "text-white border-2"}
                              style={banner.isActive ? 
                                { backgroundColor: 'var(--color-success)', borderColor: 'var(--color-success)' } :
                                { backgroundColor: 'var(--color-muted)', borderColor: 'var(--color-muted)' }
                              }
                            >
                              {banner.isActive ? 'Aktif' : 'Nonaktif'}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                            {banner.subtitle}
                          </p>
                          <div className="text-xs text-muted-foreground">
                            Urutan: {banner.order}
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="secondary" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="border-2 border-gray-200">
                            <DropdownMenuItem onClick={() => {
                              setEditingBanner(banner);
                              setBannerForm(banner);
                              setIsBannerDialogOpen(true);
                            }}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => {
                                setBanners(prev => prev.filter(b => b.id !== banner.id));
                                toast({
                                  title: "Berhasil",
                                  description: "Banner berhasil dihapus",
                                });
                              }}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <Card className="border-2 border-gray-300/80 shadow-lg" style={{ backgroundColor: 'var(--color-surface)' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                    <Users className="h-5 w-5" />
                    Section Tentang Kami
                  </CardTitle>
                  <Dialog open={isAboutDialogOpen} onOpenChange={setIsAboutDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        style={{ 
                          backgroundColor: 'var(--color-accent)', 
                          color: 'white',
                          border: '2px solid var(--color-accent)',
                          borderRadius: '0.75rem'
                        }}
                        className="hover:opacity-90 transition-all duration-300"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Konten
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl border-2 border-gray-300/80">
                      <DialogHeader>
                        <DialogTitle>Edit Section Tentang Kami</DialogTitle>
                      </DialogHeader>
                      
                      <div className="grid grid-cols-1 gap-4 py-4">
                        <div>
                          <Label htmlFor="aboutTitle">Judul</Label>
                          <Input
                            id="aboutTitle"
                            value={about.title}
                            onChange={(e) => setAbout(prev => ({ ...prev, title: e.target.value }))}
                            className="border-2 border-gray-200 hover:border-gray-300"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="aboutContent">Konten</Label>
                          <Textarea
                            id="aboutContent"
                            value={about.content}
                            onChange={(e) => setAbout(prev => ({ ...prev, content: e.target.value }))}
                            rows={6}
                            className="border-2 border-gray-200 hover:border-gray-300"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="aboutImage">URL Gambar</Label>
                          <Input
                            id="aboutImage"
                            value={about.image}
                            onChange={(e) => setAbout(prev => ({ ...prev, image: e.target.value }))}
                            placeholder="https://example.com/image.jpg"
                            className="border-2 border-gray-200 hover:border-gray-300"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAboutDialogOpen(false)}>
                          Batal
                        </Button>
                        <Button onClick={() => {
                          setAbout(prev => ({ ...prev, lastUpdated: new Date().toISOString().split('T')[0] }));
                          setIsAboutDialogOpen(false);
                          toast({
                            title: "Berhasil",
                            description: "Section Tentang Kami berhasil diperbarui",
                          });
                        }}>
                          Simpan
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
                        {about.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {about.content}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Terakhir diupdate: {new Date(about.lastUpdated).toLocaleDateString('id-ID')}
                    </div>
                  </div>
                  <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    {about.image ? (
                      <img src={about.image} alt={about.title} className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Programs Tab */}
          <TabsContent value="programs">
            <Card className="border-2 border-gray-300/80 shadow-lg" style={{ backgroundColor: 'var(--color-surface)' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                    <Target className="h-5 w-5" />
                    Program Kerja ({programs.length})
                  </CardTitle>
                  <Dialog open={isProgramDialogOpen} onOpenChange={setIsProgramDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        style={{ 
                          backgroundColor: 'var(--color-accent)', 
                          color: 'white',
                          border: '2px solid var(--color-accent)',
                          borderRadius: '0.75rem'
                        }}
                        className="hover:opacity-90 transition-all duration-300"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Program
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl border-2 border-gray-300/80 max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {editingProgram ? "Edit Program" : "Tambah Program Baru"}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        <div>
                          <Label htmlFor="programTitle">Judul Program *</Label>
                          <Input
                            id="programTitle"
                            value={programForm.title}
                            onChange={(e) => setProgramForm(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Nama program"
                            className="border-2 border-gray-200 hover:border-gray-300"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="programCategory">Kategori</Label>
                          <Input
                            id="programCategory"
                            value={programForm.category}
                            onChange={(e) => setProgramForm(prev => ({ ...prev, category: e.target.value }))}
                            placeholder="Contoh: Pendidikan, Sosial, Kesehatan"
                            className="border-2 border-gray-200 hover:border-gray-300"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <Label htmlFor="programDescription">Deskripsi *</Label>
                          <Textarea
                            id="programDescription"
                            value={programForm.description}
                            onChange={(e) => setProgramForm(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Deskripsi program"
                            className="border-2 border-gray-200 hover:border-gray-300"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="programStatus">Status</Label>
                          <Select value={programForm.status} onValueChange={(value) => setProgramForm(prev => ({ ...prev, status: value as Program["status"] }))}>
                            <SelectTrigger className="border-2 border-gray-200 hover:border-gray-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Perencanaan">Perencanaan</SelectItem>
                              <SelectItem value="Berlangsung">Berlangsung</SelectItem>
                              <SelectItem value="Selesai">Selesai</SelectItem>
                              <SelectItem value="Tertunda">Tertunda</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="programProgress">Progress (%)</Label>
                          <Input
                            id="programProgress"
                            type="number"
                            min="0"
                            max="100"
                            value={programForm.progress}
                            onChange={(e) => setProgramForm(prev => ({ ...prev, progress: parseInt(e.target.value) || 0 }))}
                            className="border-2 border-gray-200 hover:border-gray-300"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="programTarget">Target</Label>
                          <Input
                            id="programTarget"
                            value={programForm.target}
                            onChange={(e) => setProgramForm(prev => ({ ...prev, target: e.target.value }))}
                            placeholder="Contoh: 1000 penerima beasiswa"
                            className="border-2 border-gray-200 hover:border-gray-300"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="programTimeline">Timeline</Label>
                          <Input
                            id="programTimeline"
                            value={programForm.timeline}
                            onChange={(e) => setProgramForm(prev => ({ ...prev, timeline: e.target.value }))}
                            placeholder="Contoh: 2024-2026"
                            className="border-2 border-gray-200 hover:border-gray-300"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="programBudget">Budget</Label>
                          <Input
                            id="programBudget"
                            value={programForm.budget}
                            onChange={(e) => setProgramForm(prev => ({ ...prev, budget: e.target.value }))}
                            placeholder="Contoh: 5 Miliar"
                            className="border-2 border-gray-200 hover:border-gray-300"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="programCoordinator">Koordinator</Label>
                          <Input
                            id="programCoordinator"
                            value={programForm.coordinator}
                            onChange={(e) => setProgramForm(prev => ({ ...prev, coordinator: e.target.value }))}
                            placeholder="Nama koordinator program"
                            className="border-2 border-gray-200 hover:border-gray-300"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <Label htmlFor="programDetails">Detail Program (pisahkan dengan baris baru)</Label>
                          <Textarea
                            id="programDetails"
                            value={programForm.details}
                            onChange={(e) => setProgramForm(prev => ({ ...prev, details: e.target.value }))}
                            placeholder="Detail program, satu per baris"
                            rows={4}
                            className="border-2 border-gray-200 hover:border-gray-300"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <Label htmlFor="programAchievements">Capaian Terkini (pisahkan dengan baris baru)</Label>
                          <Textarea
                            id="programAchievements"
                            value={programForm.achievements}
                            onChange={(e) => setProgramForm(prev => ({ ...prev, achievements: e.target.value }))}
                            placeholder="Capaian yang sudah dicapai, satu per baris"
                            rows={4}
                            className="border-2 border-gray-200 hover:border-gray-300"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsProgramDialogOpen(false)}>
                          Batal
                        </Button>
                        <Button onClick={handleProgramSubmit}>
                          {editingProgram ? "Perbarui" : "Tambah"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {programs.map((program) => (
                    <div key={program.id} className="border-2 border-gray-200 hover:border-primary/50 rounded-lg p-6 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold" style={{ color: 'var(--color-primary)' }}>
                              {program.title}
                            </h3>
                            <Badge 
                              className={statusConfig[program.status].className}
                              style={statusConfig[program.status].style}
                            >
                              {program.status}
                            </Badge>
                            {program.category && (
                              <Badge variant="outline" className="border-2 border-gray-300">
                                {program.category}
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-4">{program.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            {program.target && (
                              <div className="flex items-center gap-2">
                                <Target className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
                                <div>
                                  <div className="text-xs" style={{ color: 'var(--color-muted)' }}>Target</div>
                                  <div className="text-sm font-medium">{program.target}</div>
                                </div>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4" style={{ color: 'var(--color-success)' }} />
                              <div>
                                <div className="text-xs" style={{ color: 'var(--color-muted)' }}>Progress</div>
                                <div className="text-sm font-medium">{program.progress}% tercapai</div>
                              </div>
                            </div>
                            
                            {program.timeline && (
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" style={{ color: 'var(--color-info)' }} />
                                <div>
                                  <div className="text-xs" style={{ color: 'var(--color-muted)' }}>Timeline</div>
                                  <div className="text-sm font-medium">{program.timeline}</div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="mb-4">
                            <Progress value={program.progress} className="h-2" />
                          </div>
                          
                          {(program.coordinator || program.budget) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                              {program.coordinator && (
                                <div>
                                  <span style={{ color: 'var(--color-muted)' }}>Koordinator: </span>
                                  <span className="font-medium">{program.coordinator}</span>
                                </div>
                              )}
                              {program.budget && (
                                <div>
                                  <span style={{ color: 'var(--color-muted)' }}>Budget: </span>
                                  <span className="font-medium">{program.budget}</span>
                                </div>
                              )}
                            </div>
                          )}
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {program.details.length > 0 && (
                              <div>
                                <h4 className="font-medium mb-2" style={{ color: 'var(--color-primary)' }}>Detail Program:</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                  {program.details.map((detail, index) => (
                                    <li key={index}>• {detail}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {program.achievements.length > 0 && (
                              <div>
                                <h4 className="font-medium mb-2" style={{ color: 'var(--color-success)' }}>Capaian Terkini:</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                  {program.achievements.map((achievement, index) => (
                                    <li key={index}>• {achievement}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="border-2 border-gray-200">
                            <DropdownMenuItem onClick={() => {
                              setEditingProgram(program);
                              setProgramForm({
                                title: program.title,
                                description: program.description,
                                status: program.status,
                                target: program.target,
                                progress: program.progress,
                                timeline: program.timeline,
                                category: program.category,
                                budget: program.budget || "",
                                coordinator: program.coordinator || "",
                                details: program.details.join('\n'),
                                achievements: program.achievements.join('\n')
                              });
                              setIsProgramDialogOpen(true);
                            }}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => {
                                setPrograms(prev => prev.filter(p => p.id !== program.id));
                                toast({
                                  title: "Berhasil",
                                  description: "Program berhasil dihapus",
                                });
                              }}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <Card className="border-2 border-gray-300/80 shadow-lg" style={{ backgroundColor: 'var(--color-surface)' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                    <Phone className="h-5 w-5" />
                    Informasi Kontak ({contacts.length})
                  </CardTitle>
                  <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        style={{ 
                          backgroundColor: 'var(--color-accent)', 
                          color: 'white',
                          border: '2px solid var(--color-accent)',
                          borderRadius: '0.75rem'
                        }}
                        className="hover:opacity-90 transition-all duration-300"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Kontak
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl border-2 border-gray-300/80">
                      <DialogHeader>
                        <DialogTitle>
                          {editingContact ? "Edit Kontak" : "Tambah Kontak Baru"}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="grid grid-cols-1 gap-4 py-4">
                        <div>
                          <Label htmlFor="contactType">Tipe Kontak</Label>
                          <Select value={contactForm.type} onValueChange={(value) => setContactForm(prev => ({ ...prev, type: value as ContactInfo["type"] }))}>
                            <SelectTrigger className="border-2 border-gray-200 hover:border-gray-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="address">Alamat</SelectItem>
                              <SelectItem value="phone">Telepon</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="socialMedia">Media Sosial</SelectItem>
                              <SelectItem value="workingHours">Jam Operasional</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="contactLabel">Label *</Label>
                          <Input
                            id="contactLabel"
                            value={contactForm.label}
                            onChange={(e) => setContactForm(prev => ({ ...prev, label: e.target.value }))}
                            placeholder="Contoh: Telepon Kantor"
                            className="border-2 border-gray-200 hover:border-gray-300"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="contactValue">Nilai *</Label>
                          <Input
                            id="contactValue"
                            value={contactForm.value}
                            onChange={(e) => setContactForm(prev => ({ ...prev, value: e.target.value }))}
                            placeholder="Contoh: (031) 8945678"
                            className="border-2 border-gray-200 hover:border-gray-300"
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="contactActive"
                            checked={contactForm.isActive}
                            onChange={(e) => setContactForm(prev => ({ ...prev, isActive: e.target.checked }))}
                            className="rounded border-2"
                          />
                          <Label htmlFor="contactActive">Tampilkan di Landing Page</Label>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsContactDialogOpen(false)}>
                          Batal
                        </Button>
                        <Button onClick={handleContactSubmit}>
                          {editingContact ? "Perbarui" : "Tambah"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Label</TableHead>
                      <TableHead>Nilai</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <Badge variant="outline" className="border-2 border-gray-300">
                            {contact.type === 'address' && 'Alamat'}
                            {contact.type === 'phone' && 'Telepon'}
                            {contact.type === 'email' && 'Email'}
                            {contact.type === 'socialMedia' && 'Sosial Media'}
                            {contact.type === 'workingHours' && 'Jam Operasional'}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{contact.label}</TableCell>
                        <TableCell className="max-w-xs truncate">{contact.value}</TableCell>
                        <TableCell>
                          <Badge 
                            className={contact.isActive ? "text-white border-2" : "text-white border-2"}
                            style={contact.isActive ? 
                              { backgroundColor: 'var(--color-success)', borderColor: 'var(--color-success)' } :
                              { backgroundColor: 'var(--color-muted)', borderColor: 'var(--color-muted)' }
                            }
                          >
                            {contact.isActive ? 'Aktif' : 'Nonaktif'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="border-2 border-gray-200">
                              <DropdownMenuItem onClick={() => {
                                setEditingContact(contact);
                                setContactForm(contact);
                                setIsContactDialogOpen(true);
                              }}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => {
                                  setContacts(prev => prev.filter(c => c.id !== contact.id));
                                  toast({
                                    title: "Berhasil",
                                    description: "Kontak berhasil dihapus",
                                  });
                                }}
                                className="text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Hapus
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
