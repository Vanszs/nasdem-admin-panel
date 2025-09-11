import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Image,
  Users,
  Home,
  Activity,
  Settings,
  ChevronDown,
  Building,
  Layers,
  MapPin,
  TreePine,
  Menu,
  X
} from "lucide-react";

import { SafeNavLink } from "./SafeNavLink";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Berita",
    url: "/news",
    icon: FileText,
  },
  {
    title: "Galeri",
    url: "/gallery",
    icon: Image,
  },
  {
    title: "Struktur",
    icon: Users,
    isCollapsible: true,
    subItems: [
      { title: "DPD", url: "/structure/dpd", icon: Building },
      { title: "Sayap", url: "/structure/sayap", icon: Layers },
      { title: "DPC", url: "/structure/dpc", icon: MapPin },
      { title: "DPRT", url: "/structure/dprt", icon: TreePine },
    ],
  },
  {
    title: "Landing Page",
    url: "/landing",
    icon: Home,
  },
  {
    title: "Audit Log",
    url: "/audit",
    icon: Activity,
  },
  {
    title: "Pengaturan",
    url: "/settings",
    icon: Settings,
  },
];

interface ModernSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function ModernSidebar({ isCollapsed = false, onToggle }: ModernSidebarProps) {
  const [openGroups, setOpenGroups] = useState<string[]>(["Struktur"]);
  
  // Safely get location, fallback if not in router context
  let currentPath = "/";
  try {
    const location = useLocation();
    currentPath = location.pathname;
  } catch {
    // Not in router context, use default
  }

  const isActive = (path: string) => currentPath === path;
  const isGroupActive = (subItems?: { url: string }[]) => 
    subItems?.some(item => isActive(item.url));
  
  const toggleGroup = (title: string) => {
    setOpenGroups(prev => 
      prev.includes(title) 
        ? prev.filter(g => g !== title)
        : [...prev, title]
    );
  };

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 mx-2 rounded-xl font-medium transition-all duration-300 ${
      isActive 
        ? "bg-brand-accent text-white shadow-brand-glow font-semibold" 
        : "text-white/90 hover:bg-white/10 hover:text-white hover:shadow-brand-soft"
    }`;

  return (
    <div className={`bg-brand-primary h-full flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } shadow-brand-large`}>
      {/* Header */}
      <div className="p-6 border-b border-white/10 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center shadow-brand-glow floating-element">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            {!isCollapsed && (
              <div className="space-y-1">
                <h2 className="font-bold text-white text-lg tracking-tight">NasDem</h2>
                <p className="text-white/70 text-sm font-medium">Sidoarjo</p>
              </div>
            )}
          </div>
          {onToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="text-white hover:bg-white/10 h-8 w-8"
            >
              {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="space-y-1">
          {!isCollapsed && (
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4 px-3">
              Menu Utama
            </p>
          )}
          
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.isCollapsible ? (
                <div>
                  <button
                    onClick={() => toggleGroup(item.title)}
                    className={`sidebar-nav-item w-full ${
                      isGroupActive(item.subItems)
                        ? "bg-brand-accent text-white shadow-brand-glow font-semibold"
                        : "text-white/90 hover:bg-white/10 hover:text-white hover:shadow-brand-soft"
                    } flex items-center gap-3 px-4 py-3 mx-2 rounded-xl font-medium transition-all duration-300`}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span className="font-medium">{item.title}</span>
                        <ChevronDown 
                          className={`ml-auto h-4 w-4 transition-transform duration-300 ${
                            openGroups.includes(item.title) ? 'rotate-180' : ''
                          }`} 
                        />
                      </>
                    )}
                  </button>
                  
                  {!isCollapsed && openGroups.includes(item.title) && (
                    <div className="mt-2 space-y-1 ml-4">
                      {item.subItems?.map((subItem) => (
                        <SafeNavLink
                          key={subItem.url}
                          to={subItem.url}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-6 py-2.5 mx-2 rounded-xl transition-all duration-300 ${
                              isActive
                                ? "bg-brand-accent text-white font-semibold shadow-brand-soft"
                                : "text-white/80 hover:bg-white/10 hover:text-white"
                            }`
                          }
                        >
                          <subItem.icon className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm font-medium">{subItem.title}</span>
                        </SafeNavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <SafeNavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `sidebar-nav-item ${getNavClassName({ isActive })}`
                  }
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium">{item.title}</span>}
                </SafeNavLink>
              )}
            </div>
          ))}
        </div>
        
        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/60 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}