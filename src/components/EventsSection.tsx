
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, Flag, Code, ShieldCheck } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'ctf' | 'workshop' | 'talk';
  description: string;
  isUpcoming: boolean;
}

const EventsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  
  const events: Event[] = [
    {
      id: 1,
      title: "Secure Coding Championship",
      date: "November 15, 2023",
      time: "10:00 AM - 5:00 PM",
      location: "Computer Center",
      type: "ctf",
      description: "A day-long CTF event focused on secure coding practices and identifying vulnerabilities in web applications.",
      isUpcoming: true
    },
    {
      id: 2,
      title: "Web Penetration Testing Workshop",
      date: "November 25, 2023",
      time: "2:00 PM - 4:00 PM",
      location: "Lecture Hall Complex",
      type: "workshop",
      description: "Hands-on workshop covering essential web penetration testing techniques, tools, and methodologies.",
      isUpcoming: true
    },
    {
      id: 3,
      title: "Cybersecurity in Critical Infrastructure",
      date: "December 5, 2023",
      time: "3:00 PM - 5:00 PM",
      location: "Online (Zoom)",
      type: "talk",
      description: "Guest lecture by industry expert on securing critical infrastructure from cyber threats.",
      isUpcoming: true
    },
    {
      id: 4,
      title: "Network Defense Challenge",
      date: "October 10, 2023",
      time: "9:00 AM - 6:00 PM",
      location: "Computer Labs",
      type: "ctf",
      description: "Participants defended a simulated network against active attacks while maintaining services.",
      isUpcoming: false
    },
    {
      id: 5,
      title: "Cryptography Basics Workshop",
      date: "September 20, 2023",
      time: "2:00 PM - 4:00 PM",
      location: "Lecture Hall 3",
      type: "workshop",
      description: "Introduction to cryptographic concepts, algorithms, and their applications in security.",
      isUpcoming: false
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'ctf':
        return <Flag className="h-5 w-5 text-cyber-green" />;
      case 'workshop':
        return <Code className="h-5 w-5 text-cyber-green" />;
      case 'talk':
        return <ShieldCheck className="h-5 w-5 text-cyber-green" />;
      default:
        return <Calendar className="h-5 w-5 text-cyber-green" />;
    }
  };

  const filteredEvents = events.filter(event => 
    activeTab === 'upcoming' ? event.isUpcoming : !event.isUpcoming
  );

  return (
    <section id="events" className="py-20 bg-cyber-blue">
      <div className="section-container">
        <h2 className="section-title">Events & Workshops</h2>
        
        <div className="mb-8">
          <div className="inline-flex rounded-md border border-gray-700 p-1">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-cyber-green text-cyber-blue'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'past'
                  ? 'bg-cyber-green text-cyber-blue'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>
        
        <div className="space-y-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div 
                key={event.id} 
                className="glass-card p-6 transition-all duration-300 hover:border-cyber-green/30 card-hover"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="sm:w-3/4">
                    <div className="flex items-center gap-2 mb-1">
                      {getEventIcon(event.type)}
                      <span className="text-xs uppercase tracking-wider text-cyber-green">
                        {event.type === 'ctf' ? 'CTF Competition' : 
                         event.type === 'workshop' ? 'Workshop' : 'Guest Talk'}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-300 mb-4">{event.description}</p>
                    
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center text-gray-300 text-sm">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-gray-300 text-sm">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-gray-300 text-sm">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                  
                  {event.isUpcoming && (
                    <div className="sm:w-1/4 flex sm:justify-end mt-4 sm:mt-0">
                      <button className="px-4 py-2 bg-cyber-green/10 border border-cyber-green text-cyber-green rounded-md flex items-center transition-colors hover:bg-cyber-green hover:text-cyber-blue">
                        Register <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400">No {activeTab} events at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
