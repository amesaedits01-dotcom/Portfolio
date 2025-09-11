import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import './LogoCarousel.css';

const LogoCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const carouselRef = useRef(null);

  // Mock logo data - these would be B/W company logos
  const logos = [
    { id: 1, name: 'Google', url: 'https://logo.clearbit.com/google.com' },
    { id: 2, name: 'Amazon', url: 'https://logo.clearbit.com/amazon.com' },
    { id: 3, name: 'Apple', url: 'https://logo.clearbit.com/apple.com' },
    { id: 4, name: 'Netflix', url: 'https://logo.clearbit.com/netflix.com' },
    { id: 5, name: 'Meta', url: 'https://logo.clearbit.com/meta.com' }
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleCarousel = () => {
    setIsPaused(!isPaused);
  };

  const handleKeyPress = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <section className="logo-carousel-section">
      <div className="logo-carousel-container">
        <div 
          className={`logo-carousel ${isPaused || isReducedMotion ? 'paused' : ''}`}
          ref={carouselRef}
          role="img"
          aria-label="Trusted by leading companies"
        >
          <div className="logo-track">
            {/* Double the logos for seamless loop */}
            {[...logos, ...logos].map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="logo-item">
                <img 
                  src={logo.url}
                  alt={logo.name}
                  className="logo-image"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
        
        {!isReducedMotion && (
          <button
            className="carousel-control"
            onClick={toggleCarousel}
            onKeyPress={(e) => handleKeyPress(e, toggleCarousel)}
            aria-label={isPaused ? "Resume carousel" : "Pause carousel"}
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
          </button>
        )}
      </div>
    </section>
  );
};

export default LogoCarousel;