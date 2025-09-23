import React, { useState, useEffect } from "react";
import { Shield, Calendar } from "lucide-react";

const CTFPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isLive, setIsLive] = useState(false);

  // CTF start and end dates
  const ctfStartDate = new Date("2025-10-17T00:00:00").getTime();
  const ctfEndDate = new Date("2025-10-18T23:59:59").getTime();

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
    <div className="min-h-screen  bg-cyber-blue">
      <section className="relative py-12 sm:py-20">
        {/* Static overlay instead of animated matrix */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

        <div className="py-20 relative max-w-6xl mx-auto px-4 text-center">
          <div className="mb-8">
            <Shield className="h-16 w-16 sm:h-20 sm:w-20 text-cyber-green mx-auto mb-4" />
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 text-cyber-green">
              TATHVA CTF
            </h1>
            <div className="flex items-center justify-center gap-2 sm:gap-4 text-cyber-green mb-8">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-lg sm:text-xl font-mono">
                October 17-18
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
        </div>
      </section>
    </div>
  );
};

export default CTFPage;
