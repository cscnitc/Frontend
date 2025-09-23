import React, { useState, useEffect } from 'react';
import { Shield, Calendar, Clock } from 'lucide-react';

const CTFPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isLive, setIsLive] = useState(false);

  // CTF start date: October 18, 2025
  const ctfStartDate = new Date('2025-10-17T00:00:00').getTime();
  const ctfEndDate = new Date('2025-10-18T23:59:59').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      
      if (now >= ctfStartDate && now <= ctfEndDate) {
        setIsLive(true);
        const distance = ctfEndDate - now;
        
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else if (now < ctfStartDate) {
        const distance = ctfStartDate - now;
        
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        // CTF has ended
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [ctfStartDate, ctfEndDate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-cyber-blue to-cyber-dark text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Matrix Background Effect */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-matrix-fade"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${Math.random() * 20 + 10}px`
              }}
            >
              {Math.random().toString(36).substring(2, 15)}
            </div>
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="mb-8">
            <Shield className="h-20 w-20 text-cyber-green mx-auto mb-4 animate-glow" />
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-cyber-green to-cyber-light-green bg-clip-text text-transparent animate-pulse-slow">
              TATHVA CTF
            </h1>
            <div className="flex items-center justify-center gap-4 text-cyber-green mb-8">
              <Calendar className="h-6 w-6" />
              <span className="text-xl font-mono">October 17-18</span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="glass-card p-8 mb-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">
              {isLive ? "ENDS IN" : "STARTS IN"}
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-cyber-green/10 border border-cyber-green rounded-lg p-4 mb-2">
                    <div className="text-4xl font-mono font-bold text-cyber-green">
                      {String(value).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-sm uppercase tracking-wide text-gray-400">
                    {unit}
                  </div>
                </div>
              ))}
            </div>
            {isLive && (
              <div className="mt-6">
                <div className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-full animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></div>
                  LIVE NOW
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTFPage;