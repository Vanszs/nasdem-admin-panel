import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { NewsListPage } from "./pages/news/NewsListPage";
import { NewsFormPage } from "./pages/news/NewsFormPage";
import { GalleryPage } from "./pages/gallery/GalleryPage";
import { MediaUploadPage } from "./pages/gallery/MediaUploadPage";
import { StructurePage } from "./pages/structure/StructurePage";
import { MemberListPage } from "./pages/members/MemberListPage";
import LandingPageManagement from "./pages/LandingPageManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<LandingPageManagement />} />
          <Route path="/news" element={<NewsListPage />} />
          <Route path="/news/create" element={<NewsFormPage />} />
          <Route path="/news/:type" element={<NewsFormPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/gallery/upload" element={<MediaUploadPage />} />
          <Route path="/structure/dpd" element={<StructurePage />} />
          <Route path="/structure/sayap" element={<StructurePage />} />
          <Route path="/structure/dpc" element={<StructurePage />} />
          <Route path="/structure/dprt" element={<StructurePage />} />
          <Route path="/members" element={<MemberListPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
