import { ReactNode, useState } from "react";
import { ModernSidebar } from "./ModernSidebar";
import { TopNavbar } from "./TopNavbar";

interface AdminLayoutProps {
  children: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function AdminLayout({ children, breadcrumbs }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
      {/* Modern Sidebar - Fixed Position */}
      <div className={`fixed top-0 left-0 z-40 h-full transition-transform duration-500 ${
        sidebarCollapsed ? '-translate-x-full' : 'translate-x-0'
      }`}>
        <ModernSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
      </div>

      {/* Overlay for mobile */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
      
      {/* Main Content Area */}
      <div className={`min-h-screen flex flex-col transition-all duration-500 ease-out ${
        sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-80'
      }`}>
        {/* Top Navigation */}
        <TopNavbar breadcrumbs={breadcrumbs} />
        
        {/* Main Content with Proper Scrolling */}
        <main className="flex-1 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(var(--color-primary), 0.1) 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, rgba(var(--color-accent), 0.1) 0%, transparent 50%)`
            }} />
          </div>
          
          {/* Content Container with Proper Scrolling */}
          <div className="relative z-10 min-h-full">
            {/* Content with backdrop blur */}
            <div className="bg-white/70 backdrop-blur-sm border-0 shadow-2xl shadow-black/5 min-h-full">
              {children}
            </div>
          </div>
        </main>

        {/* Sidebar Toggle Button for Mobile */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="fixed bottom-6 left-6 z-50 lg:hidden bg-primary text-white p-3 rounded-2xl shadow-xl hover:scale-110 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      
      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="w-14 h-14 bg-brand-primary rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center text-white hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}