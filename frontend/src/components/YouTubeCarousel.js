import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import './YouTubeCarousel.css';

const YouTubeCarousel = () => {
  const { t } = useI18n();
  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const carouselRef = useRef(null);

  // YouTube channels data - configurable in schema.json
  // Profile pictures are placeholder URLs - replace with actual channel avatars
  const youtubeChannels = [
    { 
      id: 1, 
      name: 'MrBeast', 
      profileUrl: 'https://yt3.ggpht.com/ytc/AKedOLSxHONhKnrxh8qRNjUFEBLd8Y7UJEGDZmVZQg=s88-c-k-c0x00ffffff-no-rj',
      subscribers: '112M',
      handle: '@MrBeast'
    },
    { 
      id: 2, 
      name: 'PewDiePie', 
      profileUrl: 'https://yt3.ggpht.com/5oUY3tashyxfqsjO5SGhjT4dus8FkN9CsAHwXWISFrdPYii1FudD4ICtLfuCw6-THJsJbgoY=s88-c-k-c0x00ffffff-no-rj',
      subscribers: '111M',
      handle: '@PewDiePie'
    },
    { 
      id: 3, 
      name: 'Dude Perfect', 
      profileUrl: 'https://yt3.ggpht.com/ytc/AKedOLT8kJ3HZJKXSgZy6QHojDHXz1oW0S9bKqY_6w=s88-c-k-c0x00ffffff-no-rj',
      subscribers: '59.1M',
      handle: '@DudePerfect'
    },
    { 
      id: 4, 
      name: 'Markiplier', 
      profileUrl: 'https://yt3.ggpht.com/ytc/AKedOLTDmbRCsXYxKWLKfmBpQw0JBnDLKJQKjGkPOg=s88-c-k-c0x00ffffff-no-rj',
      subscribers: '35.8M',
      handle: '@Markiplier'
    },
    { 
      id: 5, 
      name: 'Casey Neistat', 
      profileUrl: 'https://yt3.ggpht.com/ytc/AKedOLSsBVxCiexv-CXNfBJ5N8TkiSTwbKZnG2CUhQ=s88-c-k-c0x00ffffff-no-rj',
      subscribers: '12.4M',
      handle: '@CaseyNeistat'
    },
    { 
      id: 6, 
      name: 'Peter McKinnon', 
      profileUrl: 'https://yt3.ggpht.com/ytc/AKedOLTRCfqbW6x9YKvkfzKQSDkBuHGtKRX5FkVBCw=s88-c-k-c0x00ffffff-no-rj',
      subscribers: '5.12M',
      handle: '@PeterMcKinnon'
    },
    { 
      id: 7, 
      name: 'MKBHD', 
      profileUrl: 'https://yt3.ggpht.com/lkH37D3Oq90ZqbR5KhYGp6h2y0YZl7skmG2oLm8OgKQYGpwGM-zVZ1L5i7TuZBNzB8NJOA=s88-c-k-c0x00ffffff-no-rj',
      subscribers: '18.3M',
      handle: '@MKBHD'
    },
    { 
      id: 8, 
      name: 'Emma Chamberlain', 
      profileUrl: 'https://yt3.ggpht.com/ytc/AKedOLQhL3cTOCWXq6GySszXNKKGUKqR5T2T8UrZAw=s88-c-k-c0x00ffffff-no-rj',
      subscribers: '11.9M',
      handle: '@EmmaChamberlain'
    }
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
    <section className="youtube-carousel-section" aria-label={t('carousel.followedBy')}>
      <div className="youtube-carousel-container">
        <h2 className="carousel-title" data-i18n="carousel.followedBy">
          {t('carousel.followedBy')}
        </h2>
        
        <div 
          className={`youtube-carousel ${isPaused || isReducedMotion ? 'paused' : ''}`}
          ref={carouselRef}
          role="img"
          aria-label="Followed by top creators"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="youtube-track">
            {/* Triple the channels for seamless infinite loop */}
            {[...youtubeChannels, ...youtubeChannels, ...youtubeChannels].map((channel, index) => (
              <div key={`${channel.id}-${index}`} className="youtube-item">
                <div className="channel-avatar">
                  <img 
                    src={channel.profileUrl}
                    alt={`${channel.name} profile`}
                    className="channel-image"
                    loading="lazy"
                  />
                </div>
                <div className="channel-info">
                  <div className="channel-name">{channel.name}</div>
                  <div className="subscriber-count">{channel.subscribers} subscribers</div>
                </div>
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

export default YouTubeCarousel;