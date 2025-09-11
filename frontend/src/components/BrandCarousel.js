import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import './BrandCarousel.css';

const BrandCarousel = () => {
  const { t } = useI18n();
  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const carouselRef = useRef(null);

  // Brand logos data - configurable in schema.json
  const brands = [
    { id: 1, name: 'Google', url: 'https://logo.clearbit.com/google.com' },
    { id: 2, name: 'Amazon', url: 'https://logo.clearbit.com/amazon.com' },
    { id: 3, name: 'Apple', url: 'https://logo.clearbit.com/apple.com' },
    { id: 4, name: 'Netflix', url: 'https://logo.clearbit.com/netflix.com' },
    { id: 5, name: 'Meta', url: 'https://logo.clearbit.com/meta.com' },
    { id: 6, name: 'Microsoft', url: 'https://logo.clearbit.com/microsoft.com' },
    { id: 7, name: 'Adobe', url: 'https://logo.clearbit.com/adobe.com' },
    { id: 8, name: 'Tesla', url: 'https://logo.clearbit.com/tesla.com' }
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

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section className="brand-carousel-section" aria-label={t('carousel.trustedBy')}>
      <div className="brand-carousel-container">
        <h2 className="carousel-title" data-i18n="carousel.trustedBy">
          {t('carousel.trustedBy')}
        </h2>
        
        <div 
          className={`brand-carousel ${isPaused || isReducedMotion ? 'paused' : ''}`}
          ref={carouselRef}
          role="img"
          aria-label="Trusted by leading companies"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="brand-track">
            {/* Triple the brands for seamless infinite loop */}
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div key={`${brand.id}-${index}`} className="brand-item">
                <img 
                  src={brand.url}
                  alt={brand.name}
                  className="brand-image"
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

export default BrandCarousel;