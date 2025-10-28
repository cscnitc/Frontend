import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Users, Zap, Award, ExternalLink } from "lucide-react";

const CTFPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isLive, setIsLive] = useState(false);

  // CTF start and end dates (October 31, 2025, 9PM IST to November 1, 2025, 9AM IST)
  // IST is UTC+5:30, so converting to UTC for consistency
  const ctfStartDate = new Date("2025-10-31T15:30:00Z").getTime(); // 9 PM IST
  const ctfEndDate = new Date("2025-11-01T03:30:00Z").getTime(); // 9 AM IST next day

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();

      if (now >= ctfStartDate && now <= ctfEndDate) {
        setIsLive(true);
        const distance = ctfEndDate - now;
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else if (now < ctfStartDate) {
        const distance = ctfStartDate - now;
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        // CTF ended
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [ctfStartDate, ctfEndDate]);

  return (
    <div className="bg-cyber-blue">
      <section className="relative py-12 sm:py-20">
        {/* Static overlay instead of animated matrix */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

        <div className="py-20 relative max-w-6xl mx-auto px-4 text-center">
          <div className="mb-8">
            {/* nitcCTF Logo Image */}
            <div className="h-96 w-96 sm:h-80 sm:w-80 mx-auto mb-6 flex items-center justify-center">
              <img 
                src="/nitc-ctf.png" 
                alt="nitcCTF Logo" 
                className="h-full w-full object-contain"
              />
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 text-cyber-green">
              nitcCTF
            </h1>
            <div className="flex items-center justify-center gap-2 sm:gap-4 text-cyber-green mb-8">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-lg sm:text-xl font-mono">
                October 31 - November 1
              </span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="glass-card p-4 sm:p-8 mb-8 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">
              {isLive ? "ENDS IN" : "STARTS IN"}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-cyber-green/10 border border-cyber-green rounded-lg p-3 sm:p-4 mb-2">
                    <div className="text-2xl sm:text-4xl font-mono font-bold text-cyber-green">
                      {String(value).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm uppercase tracking-wide text-gray-400">
                    {unit}
                  </div>
                </div>
              ))}
            </div>

            {isLive && (
              <div className="mt-6">
                <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  LIVE NOW
                </div>
              </div>
            )}
          </div>

          {/* Registration Section */}
          <div className="mt-8 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center text-cyber-green">Registration</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://forms.gle/N4jNG7fpJrv421yZA"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 border-2 border-cyber-green/30 hover:border-cyber-green transition-all duration-300 flex items-center justify-between group"
              >
                <div className="text-left">
                  <h4 className="text-lg font-bold text-cyber-green mb-1">NITC Students</h4>
                  <p className="text-xs text-gray-400">Register as NITC student</p>
                </div>
                <ExternalLink className="h-5 w-5 text-cyber-green group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://forms.gle/uyjt9nwp2aLq8a427"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 border-2 border-cyber-green/30 hover:border-cyber-green transition-all duration-300 flex items-center justify-between group"
              >
                <div className="text-left">
                  <h4 className="text-lg font-bold text-cyber-green mb-1">Non-NITC Students</h4>
                  <p className="text-xs text-gray-400">Register as external student</p>
                </div>
                <ExternalLink className="h-5 w-5 text-cyber-green group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* About the CTF */}
          <div className="max-w-4xl mx-auto mt-12 text-left">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* CITRA Logo Image */}
              <div className="flex items-center justify-center md:col-span-1">
                <div className="w-64 h-64 flex items-center justify-center">
                  <img 
                    src="/citra.png" 
                    alt="CITRA NIT Calicut Logo" 
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <p className="text-gray-300 leading-relaxed">
                  As a part of the Cyber Security Awareness month, the Cyber Security Club of NIT Calicut, together with the Center for Information Technology Research & Automation (CITRA) presents <span className="text-cyber-green font-bold">nitcCTF</span> - a 12 hour long Capture the Flag competition, in a jeopardy format, featuring challenges covering reverse engineering, cryptography, binary exploitation, forensics, web exploitation, AI, and others.
                </p>
              </div>
            </div>

            {/* Event Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-5 w-5 text-cyber-green" />
                  <h4 className="text-lg font-bold text-cyber-green">Competition Schedule</h4>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  <strong>Date:</strong> October 31, Friday, 9PM to November 1, Saturday, 9AM (IST)<br/>
                  <strong>Duration:</strong> 12 hours
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-5 w-5 text-cyber-green" />
                  <h4 className="text-lg font-bold text-cyber-green">Venue</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  NIT Calicut (Physical venue required)
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-5 w-5 text-cyber-green" />
                  <h4 className="text-lg font-bold text-cyber-green">Eligibility & Format</h4>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  <strong>Participation:</strong> Undergraduate and postgraduate students from any college<br/>
                  <strong>Teams:</strong> Individually or in teams of 2
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-5 w-5 text-cyber-green" />
                  <h4 className="text-lg font-bold text-cyber-green">Registration</h4>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  <strong>Fee:</strong> INR 100 per person (INR 200 for team of 2)<br/>
                  <strong>Deadline:</strong> Thursday, October 30th, 11:59PM IST
                </p>
              </div>
            </div>

            {/* Important Notes */}
            <div className="glass-card p-6 border-l-4 border-cyber-green">
              <div className="flex items-start gap-3 mb-4">
                <Award className="h-5 w-5 text-cyber-green flex-shrink-0 mt-1" />
                <h4 className="text-lg font-bold text-cyber-green">Rules & Important Notes</h4>
              </div>
              <ul className="text-gray-300 text-sm space-y-3 ml-8">
                <li>• <strong>Physical Presence:</strong> Please register if and only if you will be able to come for the competition at the physical venue at NIT Calicut</li>
                <li>• <strong>Challenge Categories:</strong> Reverse Engineering, Cryptography, Binary Exploitation, Forensics, Web Exploitation, AI, and more</li>
                <li>• <strong>No Unauthorized Hacking:</strong> No hacking the CTF infrastructure or other players' systems</li>
                <li>• <strong>Writeup Submission:</strong> All participants must submit writeups within one hour after the CTF ends, by 10:00 AM</li>
                <li>• <strong>LLM Usage:</strong> Use of Large Language Models (LLMs) are allowed</li>
                <li>• <strong>No Cheating:</strong> Do not share flags with other teams and do not copy flags from others</li>
                <li>• <strong>Respectful Conduct:</strong> No rude behavior or arguing with organizers. You are expected to behave cordially with everyone</li>
                <li>• <strong>Venue Cleanliness:</strong> Please keep the venue clean</li>
                <li>• <strong>Mess Facilities:</strong> Participants can avail mess facilities at NIT Calicut for breakfast on a payment basis</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTFPage;
