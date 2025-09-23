import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Shield, Lock, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<{ x: number; y: number; z: number }[]>([]);
  const matrixRef = useRef<{ x: number; y: number; speed: number; char: string }[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  
  const typewriterTexts = [
    'INITIALIZING SECURITY PROTOCOLS...',
    'SCANNING FOR VULNERABILITIES...',
    'ACCESS GRANTED: WELCOME DEFENDER',
    'NIT CALICUT CYBERSECURITY CLUB'
  ];

  // Typewriter effect
  useEffect(() => {
    setIsLoaded(true);
    const text = typewriterTexts[typewriterIndex];
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (charIndex < text.length) {
        setCurrentText(text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setTimeout(() => {
          if (typewriterIndex < typewriterTexts.length - 1) {
            setTypewriterIndex(prev => prev + 1);
            setCurrentText('');
          }
        }, 2000);
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [typewriterIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Initialize stars
      const numStars = Math.floor(canvas.width * canvas.height / 1500);
      starsRef.current = Array.from({ length: numStars }, () => ({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width
      }));

      // Initialize matrix rain
      const columns = Math.floor(canvas.width / 20);
      matrixRef.current = Array.from({ length: columns }, (_, i) => ({
        x: i * 20,
        y: Math.random() * canvas.height,
        speed: Math.random() * 3 + 1,
        char: String.fromCharCode(0x30A0 + Math.random() * 96)
      }));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.016; // Roughly 60fps
      
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0A192F');
      gradient.addColorStop(0.5, '#0E2748');
      gradient.addColorStop(1, '#111111');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated grid
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.1)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        const offset = Math.sin(time + x * 0.01) * 5;
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        const offset = Math.cos(time + y * 0.01) * 3;
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(canvas.width, y + offset);
        ctx.stroke();
      }

      // Draw matrix rain effect
      ctx.font = '12px monospace';
      matrixRef.current.forEach(drop => {
        ctx.fillStyle = `rgba(0, 255, 65, ${Math.random() * 0.5 + 0.3})`;
        ctx.fillText(drop.char, drop.x, drop.y);
        
        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -20;
          drop.char = String.fromCharCode(0x30A0 + Math.random() * 96);
        }
      });

      // Draw enhanced starfield
      const speed = 2;
      ctx.shadowColor = '#00FF41';
      
      starsRef.current.forEach(star => {
        star.z -= speed;
        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
          star.z = canvas.width;
        }

        const scale = canvas.width / star.z;
        const x = star.x * scale + canvas.width / 2;
        const y = star.y * scale + canvas.height / 2;

        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          const radius = Math.max(0.5, 1.5 * scale);
          const opacity = Math.min(1, scale * 2);
          
          // Create star trail effect
          const trailLength = 8;
          for (let i = 0; i < trailLength; i++) {
            const trailScale = canvas.width / (star.z + i * speed);
            const trailX = star.x * trailScale + canvas.width / 2;
            const trailY = star.y * trailScale + canvas.height / 2;
            const trailOpacity = opacity * (1 - i / trailLength) * 0.3;
            
            ctx.fillStyle = `rgba(0, 255, 65, ${trailOpacity})`;
            ctx.shadowBlur = 3;
            ctx.beginPath();
            ctx.arc(trailX, trailY, radius * 0.5, 0, 2 * Math.PI);
            ctx.fill();
          }

          // Main star
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.shadowBlur = 5;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fill();
        }
      });

      // Draw scanning lines
      ctx.strokeStyle = `rgba(0, 255, 65, ${0.3 + Math.sin(time * 3) * 0.2})`;
      ctx.lineWidth = 2;
      const scanY = (Math.sin(time * 0.5) * 0.5 + 0.5) * canvas.height;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(canvas.width, scanY);
      ctx.stroke();

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);
   const navigate = useNavigate();

  const handleGetInvolvedClick = () => {
    navigate('/events');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-blue">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
        aria-hidden="true"
      />
      
      {/* Floating security icons */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <Shield className="absolute top-1/4 left-1/4 w-8 h-8 text-cyber-green/30 animate-float" 
               style={{ animationDelay: '0s' }} />
        <Lock className="absolute top-1/3 right-1/4 w-6 h-6 text-cyber-green/20 animate-float" 
              style={{ animationDelay: '1s' }} />
        <Eye className="absolute bottom-1/3 left-1/3 w-7 h-7 text-cyber-green/25 animate-float" 
             style={{ animationDelay: '2s' }} />
      </div>

      {/* Glitch overlay effect */}
      <div className="absolute inset-0 z-5 pointer-events-none opacity-10">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-cyber-green to-transparent 
                        animate-pulse transform -skew-x-12 translate-x-full"
             style={{ animation: 'pulse 4s ease-in-out infinite' }}>
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Typewriter text */}
          <div className="h-8 mb-6">
            <h2 className="text-cyber-green text-sm md:text-base font-mono tracking-widest uppercase">
              {currentText}
              <span className="animate-pulse">|</span>
            </h2>
          </div>
          
          {/* Main heading with redesigned smaller size and creative effects */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 md:mb-8
                         transform transition-all duration-1000 delay-500"
             >
            Empowering Digital{' '}
            <span className="text-cyber-green ">Defenders</span>
          </h1>
          
          {/* Subtitle with matrix effect */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 md:mb-12
                        transform transition-all duration-1000 delay-700
                        hover:text-cyber-light-green transition-colors">
            Where curiosity meets security, and knowledge breeds resilience.
          </p>
          
          {/* Enhanced buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6
                          transform transition-all duration-1000 delay-1000">
            <button 
              onClick={handleGetInvolvedClick}
              className="group px-8 py-4 bg-cyber-green text-cyber-blue font-medium rounded-lg
                        inline-flex items-center hover:bg-cyber-light-green 
                        transition-all duration-300 transform hover:scale-105
                        hover:shadow-lg hover:shadow-cyber-green/25
                        border-2 border-transparent hover:border-cyber-green/50
                        relative overflow-hidden"
            >
              <span className="relative z-10">Get Involved</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
            
            <button 
             onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 border-2 border-cyber-green text-cyber-green font-medium rounded-lg
                        hover:bg-cyber-green/10 transition-all duration-300 transform hover:scale-105
                        hover:shadow-lg hover:shadow-cyber-green/25 relative overflow-hidden"
            >
              <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 bg-cyber-green/5 scale-x-0 group-hover:scale-x-100
                            transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>

        {/* Security badge */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full border-4 border-cyber-green/20
                        animate-spin-slow opacity-30"
             style={{ animation: 'spin 20s linear infinite' }}>
          <div className="absolute inset-4 rounded-full border-2 border-cyber-green/40"></div>
          <div className="absolute inset-8 rounded-full border border-cyber-green/60"></div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <button 
          onClick={scrollToAbout}
          className="group flex flex-col items-center text-gray-400 hover:text-cyber-green 
                    transition-all duration-300 transform hover:scale-110"
          aria-label="Scroll down"
        >
          <span className="text-xs font-mono mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
            EXPLORE
          </span>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" 
                 className="h-6 w-6 animate-bounce" 
                 fill="none" 
                 viewBox="0 0 24 24" 
                 stroke="currentColor">
              <path strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <div className="absolute inset-0 bg-cyber-green/20 rounded-full scale-150 
                          opacity-0 group-hover:opacity-100 animate-ping"></div>
          </div>
        </button>
      </div>

      {/* Data stream lines */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-5">
        {[...Array(3)].map((_, i) => (
          <div key={i} 
               className="absolute w-px bg-gradient-to-b from-transparent via-cyber-green/30 to-transparent"
               style={{
                 height: '100%',
                 left: `${20 + i * 30}%`,
                 animation: `pulse 3s ease-in-out infinite ${i * 1}s`
               }}>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;