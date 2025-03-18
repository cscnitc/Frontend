import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<{ x: number; y: number; z: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Recalculate stars on resize
      const numStars = Math.floor(canvas.width * canvas.height / 1000);
      starsRef.current = Array.from({ length: numStars }, () => ({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width
      }));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawStarfield = () => {
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ffffff';

      const speed = 1.5;

      for (const star of starsRef.current) {
        star.z -= speed;
        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
          star.z = canvas.width;
        }

        const scale = canvas.width / star.z;
        const x = star.x * scale + canvas.width / 2;
        const y = star.y * scale + canvas.height / 2;

        const radius = Math.max(0.5, 1.5 * scale); // Bigger as they approach
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
      }

      requestAnimationFrame(drawStarfield);
    };

    drawStarfield();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const navigate = useNavigate();

  const handleGetInvolvedClick = () => {
    navigate('/events');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
        aria-hidden="true"
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-page-transition opacity-0">
          <h2 className="text-cyber-green text-lg md:text-xl mb-3 font-mono tracking-widest">
            NIT CALICUT CYBERSECURITY CLUB
          </h2>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 md:mb-8">
            Empowering Digital <br /> <span className="green-glow-text">Defenders</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 md:mb-12">
            Where curiosity meets security, and knowledge breeds resilience.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button 
              onClick={handleGetInvolvedClick}
              className="px-6 py-3 bg-cyber-green text-cyber-blue font-medium rounded-md inline-flex items-center hover:bg-cyber-light-green transition-colors duration-300"
            >
              Get Involved <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 border border-cyber-green text-cyber-green font-medium rounded-md hover:bg-cyber-green/10 transition-colors duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-gray-400 hover:text-cyber-green transition-colors"
          aria-label="Scroll down"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
