
import React, { useState } from 'react';
import { Book, BookOpen, FileText, Link, ExternalLink, Download } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'guide' | 'tool' | 'course' | 'article';
  link: string;
  isExternal: boolean;
}

const ResourcesSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  
  const resources: Resource[] = [
    {
      id: 1,
      title: "Web Application Security Guide",
      description: "Comprehensive guide on securing web applications, covering common vulnerabilities and best practices.",
      type: "guide",
      link: "#",
      isExternal: false
    },
    {
      id: 2,
      title: "Malware Analysis Toolkit",
      description: "Collection of tools and utilities for analyzing malicious software and understanding attack vectors.",
      type: "tool",
      link: "https://github.com/nitcsec/malware-toolkit",
      isExternal: true
    },
    {
      id: 3,
      title: "CTF Roadmap for Beginners",
      description: "Step-by-step learning path for those interested in participating in Capture the Flag competitions.",
      type: "guide",
      link: "#",
      isExternal: false
    },
    {
      id: 4,
      title: "Intro to Cryptography",
      description: "Beginner-friendly course on cryptographic algorithms, protocols, and their applications in security.",
      type: "course",
      link: "#",
      isExternal: false
    },
    {
      id: 5,
      title: "Network Defense Strategies",
      description: "Article on effective strategies and tools for defending networks against common attack vectors.",
      type: "article",
      link: "#",
      isExternal: false
    },
    {
      id: 6,
      title: "Vulnerability Scanner",
      description: "Open-source tool for identifying vulnerabilities in web applications and network services.",
      type: "tool",
      link: "https://github.com/nitcsec/vulnscan",
      isExternal: true
    }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'guide':
        return <Book className="h-5 w-5 text-cyber-green" />;
      case 'tool':
        return <FileText className="h-5 w-5 text-cyber-green" />;
      case 'course':
        return <BookOpen className="h-5 w-5 text-cyber-green" />;
      case 'article':
        return <Link className="h-5 w-5 text-cyber-green" />;
      default:
        return <Link className="h-5 w-5 text-cyber-green" />;
    }
  };

  const filteredResources = selectedType === 'all' 
    ? resources 
    : resources.filter(resource => resource.type === selectedType);

  return (
    <section id="resources" className="py-20 bg-cyber-blue">
      <div className="section-container">
        <h2 className="section-title">CyberGuide</h2>
        <p className="text-gray-300 mb-8 max-w-3xl">
          Access our curated cybersecurity resources, learning materials, tools, and guides to enhance your knowledge and skills.
        </p>
        
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedType === 'all'
                ? 'bg-cyber-green text-cyber-blue'
                : 'bg-cyber-blue/50 text-gray-300 hover:text-white'
            }`}
          >
            All Resources
          </button>
          
          <button
            onClick={() => setSelectedType('guide')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedType === 'guide'
                ? 'bg-cyber-green text-cyber-blue'
                : 'bg-cyber-blue/50 text-gray-300 hover:text-white'
            }`}
          >
            Guides
          </button>
          
          <button
            onClick={() => setSelectedType('tool')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedType === 'tool'
                ? 'bg-cyber-green text-cyber-blue'
                : 'bg-cyber-blue/50 text-gray-300 hover:text-white'
            }`}
          >
            Tools
          </button>
          
          <button
            onClick={() => setSelectedType('course')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedType === 'course'
                ? 'bg-cyber-green text-cyber-blue'
                : 'bg-cyber-blue/50 text-gray-300 hover:text-white'
            }`}
          >
            Courses
          </button>
          
          <button
            onClick={() => setSelectedType('article')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedType === 'article'
                ? 'bg-cyber-green text-cyber-blue'
                : 'bg-cyber-blue/50 text-gray-300 hover:text-white'
            }`}
          >
            Articles
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div 
              key={resource.id} 
              className="glass-card p-6 rounded-xl flex flex-col h-full card-hover"
            >
              <div className="flex items-center gap-2 mb-3">
                {getResourceIcon(resource.type)}
                <span className="text-xs uppercase tracking-wider text-cyber-green">
                  {resource.type}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-white">{resource.title}</h3>
              <p className="text-gray-300 mb-4 flex-grow">{resource.description}</p>
              
              <a 
                href={resource.link} 
                target={resource.isExternal ? "_blank" : "_self"} 
                rel={resource.isExternal ? "noopener noreferrer" : ""}
                className="inline-flex items-center text-cyber-green hover:text-cyber-light-green transition-colors mt-auto"
              >
                {resource.isExternal ? (
                  <>
                    <ExternalLink className="h-4 w-4 mr-1" /> View Resource
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-1" /> Download Resource
                  </>
                )}
              </a>
            </div>
          ))}
        </div>
        
        {filteredResources.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-400">No resources available in this category.</p>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <div className="glass-card p-6 inline-block">
            <h4 className="text-xl font-bold mb-3 text-white">Weekly Cybersecurity Challenge</h4>
            <p className="text-gray-300 mb-4">
              Test your skills with our weekly challenges! New challenges are posted every Monday.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center px-6 py-3 border border-cyber-green text-cyber-green rounded-md hover:bg-cyber-green/10 transition-colors"
            >
              View This Week's Challenge
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
