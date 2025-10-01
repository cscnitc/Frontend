
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
  registerLink?: string;

}

const EventsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const events: Event[] = [
    {
      id: 1,
      title: "Cryptography & Cryptanalysis",
      date: "September 27, 2025",
      time: "10:00 AM - 12:30 PM",
      location: "SSL, IT Complex",
      type: "workshop",
      description: "The cryptography session, conducted jointly with MathSoc, will cover mathematical fundamentals of cryptography, classical and modern attacks, and introduce advanced topics such as zero-knowledge proofs.",
      isUpcoming: false,
      registerLink: "https://forms.gle/PspgVsBMcg7bYkFL9"

    },
    {
      id: 2,
      title: "Introduction to Reverse Engineering",
      date: "September 27, 2025",
      time: "1:30 PM - 4:00 PM",
      location: "SSL, IT Complex",
      type: "workshop",
      description: "The reverse engineering session will cover both static and dynamic analysis techniques, and conclude with a brief overview of anti-mitigation approaches.",
      isUpcoming: false,
      registerLink: "https://forms.gle/PspgVsBMcg7bYkFL9"

    },
    {
      id: 3,
      title: "Ethical Hacking with Flipper Zero",
      date: "April 12, 2025",
      time: "10:00 AM",
      location: "SSL, IT Lab Complex",
      type: "workshop",
      description: "Hands-on Flipper Zero workshop by Bhaskar Pal featuring ethical hacking demos, cybersecurity insights, and activity points.",

      isUpcoming: false,
      registerLink: ""

    }, 


  ];
  const isEventUpcoming = (date: string, time: string) => {
    const eventDateTime = new Date(`${date} ${time}`);
    const now = new Date();
    return eventDateTime > now;
  };

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

  const filteredEvents = events.filter(event => {
    const upcoming = isEventUpcoming(event.date, event.time);
    return activeTab === 'upcoming' ? upcoming : !upcoming;
  });


  return (
    <section id="events" className="py-20 bg-cyber-blue">
      <div className="section-container">
        <h2 className="section-title">Events & Workshops</h2>

        <div className="mb-8">
          <div className="inline-flex rounded-md border border-gray-700 p-1">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'upcoming'
                ? 'bg-cyber-green text-cyber-blue'
                : 'text-gray-300 hover:text-white'
                }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'past'
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

                  {isEventUpcoming(event.date, event.time) && event.registerLink && (
                    <div className="sm:w-1/4 flex sm:justify-end mt-4 sm:mt-0">
                      <a
                        href={event.registerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-cyber-green/10 border border-cyber-green text-cyber-green rounded-md flex items-center transition-colors hover:bg-cyber-green hover:text-cyber-blue"
                      >
                        Register <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
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
