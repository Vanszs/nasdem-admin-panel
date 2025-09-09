import { useState } from "react";
import { Search, Bell, User, LogOut, Settings, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TopNavbarProps {
  breadcrumbs?: { label: string; href?: string }[];
}

export function TopNavbar({ breadcrumbs = [] }: TopNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { isMobile } = useSidebar();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement global search
    console.log("Search:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 glass-panel shadow-[var(--shadow-soft)]">
      <div className="flex h-18 items-center gap-6 px-6 lg:px-8">
        {/* Mobile Menu & Sidebar Trigger */}
        <div className="flex items-center gap-2">
          <SidebarTrigger className="lg:hidden" />
          {!isMobile && <SidebarTrigger className="hidden lg:flex" />}
        </div>

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {crumb.href && index < breadcrumbs.length - 1 ? (
                      <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Global Search */}
        <form onSubmit={handleSearch} className="hidden lg:block">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
            <Input
              type="search"
              placeholder="Cari berita, galeri, struktur... (⌘K)"
              className="w-[350px] h-11 pl-11 pr-4 bg-background/50 border-border/40 rounded-2xl focus-ring backdrop-blur-sm shadow-[var(--shadow-soft)] smooth-transition focus:shadow-[var(--shadow-medium)] focus:bg-background/80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Search Button for Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden focus-ring h-11 w-11 rounded-2xl hover:bg-accent/10 smooth-transition"
          onClick={() => {
            // TODO: Open search modal on mobile
          }}
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative focus-ring h-11 w-11 rounded-2xl hover:bg-accent/10 smooth-transition floating-element">
              <Bell className="h-5 w-5" />
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-gradient-to-r from-accent to-accent/90 text-accent-foreground shadow-[var(--shadow-glow)] border-0 animate-pulse"
                variant="secondary"
              >
                3
              </Badge>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 glass-panel border-border/40 shadow-[var(--shadow-large)]">
            <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="space-y-1">
              <div className="flex items-start gap-3 p-3 text-sm hover:bg-muted rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Berita baru dipublikasi</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    "Program Pembangunan Infrastruktur" telah dipublikasi
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">2 jam yang lalu</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 text-sm hover:bg-muted rounded-lg">
                <div className="w-2 h-2 bg-muted rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Upload galeri berhasil</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    5 foto kegiatan berhasil diunggah
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">4 jam yang lalu</p>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-12 w-auto px-3 focus-ring rounded-2xl hover:bg-accent/10 smooth-transition floating-element">
              <Avatar className="h-9 w-9 ring-2 ring-accent/20 ring-offset-2 ring-offset-background">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start ml-3">
                <span className="text-sm font-semibold text-foreground">Admin User</span>
                <span className="text-xs text-muted-foreground font-medium">Super Admin</span>
              </div>
              <ChevronDown className="h-4 w-4 ml-2 smooth-transition" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 glass-panel border-border/40 shadow-[var(--shadow-large)]">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@nasdems.idoarjo.id
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="focus-ring">
              <User className="mr-2 h-4 w-4" />
              <span>Profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="focus-ring">
              <Settings className="mr-2 h-4 w-4" />
              <span>Pengaturan</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus-ring">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Keluar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}