import { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { 
  MoreHorizontal, 
  Pin, 
  Edit, 
  Copy, 
  Archive, 
  Trash2,
  Eye,
  Calendar,
  Filter,
  SortAsc,
  FileText,
  Plus
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SafeLink } from "@/components/layout/SafeLink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PinConfirmDialog } from "./PinConfirmDialog";
import { useToast } from "@/hooks/use-toast";
import { News } from "@/types";

// Mock data
const mockNews: News[] = [
  {
    id: "1",
    title: "Program Pembangunan Infrastruktur Sidoarjo 2024",
    slug: "program-pembangunan-infrastruktur-sidoarjo-2024",
    summary: "Rencana pembangunan infrastruktur untuk mendukung kemajuan Kabupaten Sidoarjo",
    content: "Lorem ipsum dolor sit amet...",
    coverUrl: "/placeholder-news-1.jpg",
    tags: ["infrastruktur", "pembangunan"],
    status: "PUBLISHED",
    publishedAt: "2024-01-15T10:00:00Z",
    author: "Admin User",
    pinned: true,
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2", 
    title: "Rapat Koordinasi DPD Partai NasDem Januari 2024",
    slug: "rapat-koordinasi-dpd-januari-2024",
    summary: "Koordinasi program kerja dan evaluasi tahun sebelumnya",
    content: "Lorem ipsum dolor sit amet...",
    tags: ["rapat", "koordinasi"],
    status: "PUBLISHED",
    publishedAt: "2024-01-10T14:00:00Z",
    author: "Editor User",
    pinned: false,
    createdAt: "2024-01-10T12:00:00Z",
    updatedAt: "2024-01-10T14:00:00Z",
  },
  {
    id: "3",
    title: "Sosialisasi Program Pendidikan Gratis",
    slug: "sosialisasi-program-pendidikan-gratis",
    summary: "Program bantuan pendidikan untuk masyarakat kurang mampu",
    content: "Lorem ipsum dolor sit amet...",
    tags: ["pendidikan", "sosialisasi"],
    status: "DRAFT",
    author: "Writer User",
    pinned: false,
    createdAt: "2024-01-08T16:00:00Z",
    updatedAt: "2024-01-08T16:00:00Z",
  },
  {
    id: "4",
    title: "Kegiatan Bakti Sosial Ramadan 2024",
    slug: "bakti-sosial-ramadan-2024",
    summary: "Kegiatan berbagi untuk masyarakat kurang mampu",
    content: "Lorem ipsum dolor sit amet...",
    tags: ["bakti sosial", "ramadan"],
    status: "SCHEDULED",
    scheduledAt: "2024-03-15T07:00:00Z",
    author: "Admin User",
    pinned: false,
    createdAt: "2024-01-05T10:00:00Z",
    updatedAt: "2024-01-05T10:00:00Z",
  },
];

const statusConfig = {
  DRAFT: { label: "Draft", className: "status-draft" },
  SCHEDULED: { label: "Terjadwal", className: "status-scheduled" },
  PUBLISHED: { label: "Published", className: "status-published" },
  ARCHIVED: { label: "Diarsip", className: "status-archived" },
};

export function NewsTable() {
  const [news, setNews] = useState<News[]>(mockNews);
  const [selectedNews, setSelectedNews] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [pinDialogOpen, setPinDialogOpen] = useState(false);
  const [pendingPinNews, setPendingPinNews] = useState<News | null>(null);
  const { toast } = useToast();

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const currentPinned = news.find(item => item.pinned);

  const handlePin = (newsItem: News) => {
    if (newsItem.pinned) {
      // Unpin current news
      setNews(prev => prev.map(item => 
        item.id === newsItem.id ? { ...item, pinned: false } : item
      ));
      toast({
        title: "Pin dicabut",
        description: `Berita "${newsItem.title}" tidak lagi di-pin.`,
      });
    } else {
      // Check if there's already a pinned news
      if (currentPinned) {
        setPendingPinNews(newsItem);
        setPinDialogOpen(true);
      } else {
        // No current pinned, directly pin this news
        setNews(prev => prev.map(item => 
          item.id === newsItem.id ? { ...item, pinned: true } : item
        ));
        toast({
          title: "Berita di-pin",
          description: `"${newsItem.title}" sekarang menjadi berita utama.`,
        });
      }
    }
  };

  const confirmPin = () => {
    if (pendingPinNews) {
      setNews(prev => prev.map(item => ({
        ...item,
        pinned: item.id === pendingPinNews.id
      })));
      
      toast({
        title: "Berita dipromosikan sebagai Pinned",
        description: `"${pendingPinNews.title}" sekarang menjadi berita utama. Pin sebelumnya telah dilepas.`,
      });
      
      setPendingPinNews(null);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedNews(checked ? filteredNews.map(item => item.id) : []);
  };

  const handleSelectItem = (newsId: string, checked: boolean) => {
    setSelectedNews(prev => 
      checked 
        ? [...prev, newsId]
        : prev.filter(id => id !== newsId)
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Filters Section with Border */}
      <div className="bg-white/50 border-2 border-gray-200/60 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Cari berita atau penulis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus-ring border-2 border-gray-200/60 hover:border-gray-300/80"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px] focus-ring border-2 border-gray-200/60 hover:border-gray-300/80">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="SCHEDULED">Terjadwal</SelectItem>
            <SelectItem value="PUBLISHED">Published</SelectItem>
            <SelectItem value="ARCHIVED">Diarsip</SelectItem>
          </SelectContent>
        </Select>
        </div>
      </div>

      {/* Table Section with Border */}
      <div className="bg-white/80 border-2 border-gray-200/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedNews.length === filteredNews.length && filteredNews.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                  Judul <SortAsc className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="w-12">Pin</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNews.map((newsItem) => (
              <TableRow key={newsItem.id} className="group">
                <TableCell>
                  <Checkbox
                    checked={selectedNews.includes(newsItem.id)}
                    onCheckedChange={(checked) => 
                      handleSelectItem(newsItem.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <SafeLink 
                      to={`/news/${newsItem.id}`}
                      className="font-medium hover:text-accent smooth-transition"
                    >
                      {newsItem.title}
                    </SafeLink>
                    {newsItem.summary && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {newsItem.summary}
                      </p>
                    )}
                    {newsItem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {newsItem.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {newsItem.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{newsItem.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusConfig[newsItem.status].className}>
                    {statusConfig[newsItem.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {newsItem.author.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{newsItem.author}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm space-y-1">
                    {newsItem.status === "PUBLISHED" && newsItem.publishedAt && (
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3 text-muted-foreground" />
                        {format(new Date(newsItem.publishedAt), "dd MMM yyyy", { locale: id })}
                      </div>
                    )}
                    {newsItem.status === "SCHEDULED" && newsItem.scheduledAt && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {format(new Date(newsItem.scheduledAt), "dd MMM yyyy", { locale: id })}
                      </div>
                    )}
                    <div className="text-muted-foreground">
                      Dibuat: {format(new Date(newsItem.createdAt), "dd MMM yyyy", { locale: id })}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handlePin(newsItem)}
                    className={`h-8 w-8 ${
                      newsItem.pinned 
                        ? "text-accent bg-accent/10" 
                        : "text-muted-foreground hover:text-accent"
                    } focus-ring`}
                  >
                    <Pin className={`h-4 w-4 ${newsItem.pinned ? "fill-current" : ""}`} />
                  </Button>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 focus-ring">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Menu aksi</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <SafeLink to={`/news/${newsItem.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </SafeLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplikat
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="mr-2 h-4 w-4" />
                        Arsip
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
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
        
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">Belum ada berita</h3>
            <p className="text-muted-foreground mt-2">
              {searchTerm || statusFilter !== "all" 
                ? "Tidak ada berita yang cocok dengan filter Anda."
                : "Mulai publikasi pertama Anda."
              }
            </p>
            {!searchTerm && statusFilter === "all" && (
              <SafeLink to="/news/create">
                <Button className="mt-4 bg-brand-accent">
                  <Plus className="mr-2 h-4 w-4" />
                  Tulis Berita Pertama
                </Button>
              </SafeLink>
            )}
          </div>
        )}
      </div>

      {/* Pin Confirmation Dialog */}
      <PinConfirmDialog
        open={pinDialogOpen}
        onOpenChange={setPinDialogOpen}
        currentPinnedTitle={currentPinned?.title}
        newTitle={pendingPinNews?.title || ""}
        onConfirm={confirmPin}
      />
    </div>
  );
}