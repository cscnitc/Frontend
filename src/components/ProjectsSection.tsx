import React from 'react';
import { Globe, Github, Lock, Code, Shield, Database, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  github?: string;
  demo?: string;
}

const ProjectsSection: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "SecureNet Scanner",
      description: "An automated network vulnerability scanner with detailed reporting and remediation recommendations.",
      tags: ["Python", "Network Security", "Vulnerability Assessment"],
      icon: <Globe className="h-8 w-8 text-cyber-green" />,
      github: "https://github.com/nitcsec/securenet",
      demo: "#"
    },
    {
      id: 2,
      title: "CipherGuard",
      description: "End-to-end encrypted messaging application with military-grade encryption and zero knowledge architecture.",
      tags: ["React", "Node.js", "Cryptography"],
      icon: <Lock className="h-8 w-8 text-cyber-green" />,
      github: "https://github.com/nitcsec/cipherguard"
    },
    {
      id: 3,
      title: "WebVulnLab",
      description: "Deliberately vulnerable web application for practicing common web security exploits in a controlled environment.",
      tags: ["Web Security", "PHP", "JavaScript"],
      icon: <Code className="h-8 w-8 text-cyber-green" />,
      github: "https://github.com/nitcsec/webvulnlab",
      demo: "#"
    },
    {
      id: 4,
      title: "PenTest Framework",
      description: "Comprehensive penetration testing framework with automated reconnaissance, scanning, and exploitation modules.",
      tags: ["Python", "Bash", "Penetration Testing"],
      icon: <Shield className="h-8 w-8 text-cyber-green" />,
      github: "https://github.com/nitcsec/pentestfw"
    },
    {
      id: 5,
      title: "OSINT Toolkit",
      description: "Collection of open-source intelligence gathering tools for digital forensics investigations.",
      tags: ["OSINT", "Python", "Data Mining"],
      icon: <Database className="h-8 w-8 text-cyber-green" />,
      github: "https://github.com/nitcsec/osinttoolkit"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-cyber-blue">
      <div className="section-container">
        <h2 className="section-title">Projects & Research</h2>
        <p className="text-gray-300 mb-10 max-w-3xl">
          Our club members work on innovative cybersecurity tools, frameworks, and research initiatives. Here are some of our featured projects:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="glass-card p-6 flex flex-col h-full card-hover"
            >
              <div className="mb-4">
                {project.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
              
              <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-cyber-green/10 text-cyber-green px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4 mt-auto pt-2">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-cyber-green transition-colors"
                  >
                    <Github className="h-5 w-5 mr-1" />
                    Code
                  </a>
                )}
                
                {project.demo && (
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-cyber-green transition-colors"
                  >
                    <ExternalLink className="h-5 w-5 mr-1" />
                    Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="https://github.com/nitcsec" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-cyber-green text-cyber-green rounded-md hover:bg-cyber-green/10 transition-colors"
          >
            <Github className="mr-2 h-5 w-5" />
            Visit Our GitHub Organization
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
