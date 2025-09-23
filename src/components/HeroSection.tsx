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
        }, 1500);
        clearInterval(typeInterval);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [typewriterIndex]);

  // Optimized canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Fewer stars
      const numStars = Math.floor(canvas.width * canvas.height / 4000);
      starsRef.current = Array.from({ length: numStars }, () => ({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width
      }));

      // Fewer matrix columns
      const columns = Math.floor(canvas.width / 30);
      matrixRef.current = Array.from({ length: columns }, (_, i) => ({
        x: i * 30,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 0.5,
        char: String.fromCharCode(0x30A0 + Math.random() * 96)
      }));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.016;

      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0A192F');
      gradient.addColorStop(0.5, '#0E2748');
      gradient.addColorStop(1, '#111111');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Simple grid
      ctx.strokeStyle = 'rgba(0,255,65,0.05)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        const offset = Math.sin(time + x * 0.01) * 3;
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        const offset = Math.cos(time + y * 0.01) * 2;
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(canvas.width, y + offset);
        ctx.stroke();
      }

      // Matrix rain
      ctx.font = '12px monospace';
      matrixRef.current.forEach(drop => {
        ctx.fillStyle = `rgba(0,255,65,${Math.random() * 0.4 + 0.3})`;
        ctx.fillText(drop.char, drop.x, drop.y);
        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -20;
          drop.char = String.fromCharCode(0x30A0 + Math.random() * 96);
        }
      });

      // Stars (simple, one-layer trail)
      const speed = 1.5;
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
          ctx.fillStyle = `rgba(0,255,65,${Math.min(1, scale * 1.5)})`;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.5, 1 * scale), 0, 2 * Math.PI);
          ctx.fill();
        }
      });

      // Scanning line
      ctx.strokeStyle = `rgba(0,255,65,${0.3 + Math.sin(time * 3) * 0.15})`;
      ctx.lineWidth = 2;
      const scanY = (Math.sin(time * 0.5) * 0.5 + 0.5) * canvas.height;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(canvas.width, scanY);
      ctx.stroke();

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
  const scrollToAbout = () => console.log('Scroll to about section');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-blue">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden="true" />
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-cyber-green text-sm md:text-base font-mono tracking-widest uppercase h-8 mb-6">
            {currentText}<span className="animate-pulse">|</span>
          </h2>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 md:mb-8">
            Empowering Digital <span className="text-cyber-green">Defenders</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 md:mb-12">
            Where curiosity meets security, and knowledge breeds resilience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button onClick={handleGetInvolvedClick} className="group px-8 py-4 bg-cyber-green text-cyber-blue rounded-lg 
                   hover:bg-cyber-light-green transition-transform duration-300 
                   transform hover:scale-105 inline-flex items-center">
                    
  <span>Get Involved</span>
  <ArrowRight className="ml-2 h-5 w-5" />
</button>

            <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="group px-8 py-4 border-2 border-cyber-green text-cyber-green rounded-lg hover:bg-cyber-green/10 transition-transform duration-300 transform hover:scale-105">
              <span>Learn More</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
