import React, { useState, useEffect } from "react";
// import axios from "axios"; // Commented out - not needed for dummy data
import { Github, Linkedin, Mail } from "lucide-react";

interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  role: string;
  specialization: string;
  email?: string;
  linkedin?: string;
  github?: string;
  profilePicture?: string;
}

const TeamSection: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Commented out backend API call
    /*
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/team-members?populate=*");

        // Transform API response to match TeamMember interface
        const formattedMembers: TeamMember[] = response.data.data.map((member: any) => ({
          id: member.id,
          documentId: member.documentId,
          name: member.Name,
          role: member.Role,
          specialization: member.Specialization,
          email: member.Email,
          linkedin: member.LinkedIn,
          github: member.Github,
          profilePicture: member.Profile_Picture?.url
            ? `http://localhost:1337${member.Profile_Picture.url}`
            : "https://via.placeholder.com/200", // Fallback image
        }));

        setMembers(formattedMembers);
      } catch (err) {
        setError("Failed to load members");
        console.error(err);
      }
    };

    fetchMembers();
    */

    // Using dummy data instead of API call
    const dummyMembers: TeamMember[] = [
      {
        id: 1,
        documentId: "member1",
        name: "Alex Johnson",
        role: "Club President",
        specialization: "Ethical Hacking & Penetration Testing",
        email: "alex.johnson@example.com",
        linkedin: "https://linkedin.com/in/alexjohnson",
        github: "https://github.com/alexjohnson",
        profilePicture: "https://via.placeholder.com/200/0066CC/FFFFFF?text=AJ"
      },
      {
        id: 2,
        documentId: "member2",
        name: "Sarah Chen",
        role: "Vice President",
        specialization: "Digital Forensics & Incident Response",
        email: "sarah.chen@example.com",
        linkedin: "https://linkedin.com/in/sarahchen",
        github: "https://github.com/sarahchen",
        profilePicture: "https://via.placeholder.com/200/00CC66/FFFFFF?text=SC"
      },
      {
        id: 3,
        documentId: "member3",
        name: "Mike Rodriguez",
        role: "Technical Lead",
        specialization: "Network Security & Malware Analysis",
        email: "mike.rodriguez@example.com",
        linkedin: "https://linkedin.com/in/mikerodriguez",
        github: "https://github.com/mikerodriguez",
        profilePicture: "https://via.placeholder.com/200/CC6600/FFFFFF?text=MR"
      }
    ];

    // Simulate loading delay (optional)
    setTimeout(() => {
      setMembers(dummyMembers);
    }, 500);
  }, []);

  const mail = `https://mail.google.com/mail/?view=cm&fs=1&to=`

  return (
    <section id="team" className="py-20 bg-cyber-blue">
      <div className="section-container">
        <h2 className="section-title">Our Team</h2>
        <p className="text-gray-300 mb-10 max-w-3xl">
          Meet the passionate cybersecurity enthusiasts who lead our club initiatives, organize events, and drive our community forward.
        </p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div key={member.id} className="glass-card overflow-hidden rounded-xl card-hover">
              <div className="relative h-60 mb-4 overflow-hidden">
                <img
                  src="/place.png"
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-blue/90 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-cyber-green font-medium">{member.role}</p>
                </div>
              </div>

              <div className="p-4">
                <p className="text-gray-300 text-sm mb-4">
                  <span className="text-white font-medium">Specialization:</span> {member.specialization}
                </p>

                <div className="flex justify-start space-x-4 mt-2">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-cyber-green transition-colors"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}

                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-cyber-green transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}

                  {member.email && (
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${member.email}`}
                      className="text-gray-400 hover:text-cyber-green transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;