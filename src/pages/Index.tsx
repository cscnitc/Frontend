import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import EventsSection from '../components/EventsSection';
import ProjectsSection from '../components/ProjectsSection';
import TeamSection from '../components/TeamSection';
import ResourcesSection from '../components/ResourcesSection';
import ContactSection from '../components/ContactSection';

const Index = () => {
  // Add scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-page-transition');
      
      elements.forEach((el) => {
        if (el instanceof HTMLElement) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.85) {
            el.classList.remove('opacity-0');
          }
        }
      });
    };

    // Run once on mount
    setTimeout(handleScroll, 100);

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-cyber-blue">
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <ProjectsSection />
      <TeamSection />
      <ResourcesSection />
      <ContactSection />
    </main>
  );
};

export default Index;
