
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix rain animation
    const characters = '01'.split('');
    const fontSize = 12;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    // Initial position of raindrops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const drawMatrix = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(10, 25, 47, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF41';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Move drop down
        drops[i]++;

        // Reset drop position
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }
    };

    // Animation loop
    const interval = setInterval(drawMatrix, 40);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

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
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-cyber-green text-cyber-blue font-medium rounded-md inline-flex items-center hover:bg-cyber-light-green transition-colors duration-300"
            >
              Get Involved <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            
            <button 
              onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
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
