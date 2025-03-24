import React from 'react';
import { Shield, Github, Twitter, Instagram, LinkedinIcon, ArrowUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (path === '/about') {
      navigate('/');
      setTimeout(() => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Delay to ensure the page is loaded
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-cyber-dark-blue pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Column 1 */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/csc-logo-white.png" 
                alt="Club Logo" 
                className="h-10 w-auto mr-2" 
              />
            </div>
            <p className="text-gray-400 mb-6">
              Empowering digital defenders and building a community of cybersecurity enthusiasts at NIT Calicut.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyber-green transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyber-green transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyber-green transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyber-green transition-colors">
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Column 2 */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavigation('/')} className="text-gray-400 hover:text-cyber-green transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/about')} className="text-gray-400 hover:text-cyber-green transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/events')} className="text-gray-400 hover:text-cyber-green transition-colors">Events</button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/projects')} className="text-gray-400 hover:text-cyber-green transition-colors">Projects</button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/team')} className="text-gray-400 hover:text-cyber-green transition-colors">Team</button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/resources')} className="text-gray-400 hover:text-cyber-green transition-colors">Resources</button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/contact')} className="text-gray-400 hover:text-cyber-green transition-colors">Contact</button>
              </li>
            </ul>
          </div>
          
          {/* Column 3 */}
          <div>
          <div>
  <h3 className="text-white font-bold mb-4 text-lg">Our Mission</h3>
  <p className="text-gray-400">
  Empower students with hands-on cybersecurity skills, promote ethical hacking, connect with industry experts, and contribute to open-source security while spreading cyber awareness.
  </p>
</div>



            <div className="flex items-bottom mt-5">
              <img
                src="/nitclogo.png"
                alt="Nitc logo"
                className="h-35 w-28 mr-2"
                ></img>
            </div>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} NITC Cybersecurity Club. All rights reserved.
          </p>
        </div>
      </div>
      
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute right-8 bottom-8 rounded-full bg-cyber-green p-3 text-cyber-blue hover:bg-cyber-light-green transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
};

export default Footer;
