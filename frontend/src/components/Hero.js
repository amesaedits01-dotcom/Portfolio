import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { Play } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const { t } = useI18n();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Particle system
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particles.current = [];
      const numParticles = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 50);
      
      for (let i = 0; i < numParticles; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 6 + 4, // Larger particles (4-10px)
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          parallaxLayer: Math.random() * 3 // 3 parallax layers
        });
      }
    };

    initParticles();

    // Mouse parallax handler
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      mouse.current.y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      if (isPaused) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle) => {
        // Apply parallax effect based on mouse position
        const parallaxStrength = (particle.parallaxLayer + 1) * 10;
        const offsetX = mouse.current.x * parallaxStrength;
        const offsetY = mouse.current.y * parallaxStrength;

        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with parallax offset
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim() || '#ffffff';
        ctx.beginPath();
        ctx.arc(
          particle.x + offsetX,
          particle.y + offsetY,
          particle.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isReducedMotion, isPaused]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleParticles = () => {
    setIsPaused(!isPaused);
  };

  return (
    <section className="hero" ref={containerRef}>
      {!isReducedMotion && (
        <>
          <canvas 
            ref={canvasRef}
            className="hero-canvas"
            aria-hidden="true"
          />
          <button 
            className="particle-toggle"
            onClick={toggleParticles}
            aria-label={isPaused ? "Resume particles" : "Pause particles"}
          >
            {isPaused ? <Play size={16} /> : "||"}
          </button>
        </>
      )}
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">{t('hero.title')}</h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
          <p className="hero-microcopy">{t('hero.microcopy')}</p>
        </div>
        
        <div className="hero-buttons">
          <button 
            className="hero-btn primary"
            onClick={() => scrollToSection('projects')}
          >
            {t('hero.projectsBtn')}
          </button>
          <button 
            className="hero-btn secondary"
            onClick={() => window.open('https://calendly.com/arielmesa', '_blank')}
          >
            {t('hero.scheduleBtn')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;