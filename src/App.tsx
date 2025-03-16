import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EventsSection from './components/EventsSection';
import ProjectsSection from './components/ProjectsSection';
import TeamSection from './components/TeamSection';
import ResourcesSection from './components/ResourcesSection';
import ContactSection from './components/ContactSection';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar /> {/* Navbar is always visible */}
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/events" element={<EventsSection />} />
          <Route path="/projects" element={<ProjectsSection />} />
          <Route path="/team" element={<TeamSection />} />
          <Route path="/resources" element={<ResourcesSection />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer /> {/* Footer is always visible */}
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
