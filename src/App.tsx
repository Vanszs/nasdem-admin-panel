import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { NewsListPage } from "./pages/news/NewsListPage";
import { GalleryPage } from "./pages/gallery/GalleryPage";
import { StructurePage } from "./pages/structure/StructurePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/news" element={<NewsListPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/structure/dpd" element={<StructurePage />} />
          <Route path="/structure/sayap" element={<StructurePage />} />
          <Route path="/structure/dpc" element={<StructurePage />} />
          <Route path="/structure/dprt" element={<StructurePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
