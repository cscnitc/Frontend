import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Added to check route
  const navigate = useNavigate();

  const isHeroSection = location.pathname === '/'; // Transparent only in Hero Section

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isHeroSection ? "bg-transparent" : "bg-cyber-dark-blue/95 backdrop-blur-md shadow-md"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/csc-logo-white.png" alt="Club Logo" className="h-9 w-auto mr-2" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-7">
            {[{ name: "Home", path: "/" }, { name: "About", path: "/about" }, 
              { name: "Events", path: "/events" }, { name: "Projects", path: "/projects" },
              { name: "Team", path: "/team" }, { name: "Resources", path: "/resources" }, 
              { name: "Contact", path: "/contact" }].map(({ name, path }) => (
              <button
                key={name}
                onClick={() => handleNavigation(path)}
                className="text-sm font-medium text-gray-300 hover:text-cyber-green transition-colors uppercase tracking-wider"
              >
                {name}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center text-cyber-green focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-14 z-40 transform transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="bg-cyber-dark-blue/95 backdrop-blur-md h-full flex flex-col pt-5">
          {[{ name: "Home", path: "/" }, { name: "About", path: "/about" }, 
            { name: "Events", path: "/events" }, { name: "Projects", path: "/projects" },
            { name: "Team", path: "/team" }, { name: "Resources", path: "/resources" }, 
            { name: "Contact", path: "/contact" }].map(({ name, path }) => (
            <button
              key={name}
              onClick={() => handleNavigation(path)}
              className="px-8 py-4 text-left text-base font-medium border-b border-gray-800 text-gray-300 hover:text-cyber-green hover:bg-cyber-blue/30 transition-colors"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
