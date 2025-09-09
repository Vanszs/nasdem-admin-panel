import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Image,
  Users,
  Home,
  UserCheck,
  Activity,
  Settings,
  ChevronDown,
  Building,
  Layers,
  MapPin,
  TreePine
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SafeNavLink } from "./SafeNavLink";

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
    title: "Users & Roles", 
    url: "/users",
    icon: UserCheck,
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

export function AppSidebar() {
  const { state } = useSidebar();
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
    isActive 
      ? "bg-accent text-accent-foreground font-medium" 
      : "text-sidebar-foreground hover:bg-accent/10 hover:text-accent";

  return (
    <Sidebar className="bg-primary border-r-0">
      <SidebarContent>
        {/* Logo Section */}
        <div className="p-6 border-b border-primary-foreground/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">N</span>
            </div>
            {state === "expanded" && (
              <div>
                <h2 className="font-semibold text-primary-foreground text-sm">NasDem</h2>
                <p className="text-primary-foreground/70 text-xs">Sidoarjo</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary-foreground/70 text-xs font-medium uppercase tracking-wider">
            Menu Utama
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.isCollapsible ? (
                    <Collapsible
                      open={openGroups.includes(item.title)}
                      onOpenChange={() => toggleGroup(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={`${
                            isGroupActive(item.subItems)
                              ? "bg-accent text-accent-foreground"
                              : "text-primary-foreground hover:bg-accent/10 hover:text-accent"
                          } smooth-transition`}
                        >
                          <item.icon className="h-4 w-4" />
                          {state === "expanded" && (
                            <>
                              <span>{item.title}</span>
                              <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200" />
                            </>
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {state === "expanded" && (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.url}>
                                <SidebarMenuSubButton asChild>
                                  <SafeNavLink
                                    to={subItem.url}
                                    className={({ isActive }) =>
                                      `flex items-center gap-2 smooth-transition ${
                                        isActive
                                          ? "bg-accent text-accent-foreground font-medium"
                                          : "text-primary-foreground/80 hover:bg-accent/10 hover:text-accent"
                                      }`
                                    }
                                  >
                                    <subItem.icon className="h-3 w-3" />
                                    <span className="text-sm">{subItem.title}</span>
                                  </SafeNavLink>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <SafeNavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `flex items-center gap-3 smooth-transition ${getNavClassName({ isActive })}`
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        {state === "expanded" && <span>{item.title}</span>}
                      </SafeNavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}