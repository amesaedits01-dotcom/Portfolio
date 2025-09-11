import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('reels');
  const [playingVideo, setPlayingVideo] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRefs = useRef({});
  const mobileCarouselRef = useRef(null);

  // Mock project data - 8 projects per category for 2x4 grid
  const projectCategories = {
    reels: Array.from({ length: 8 }, (_, i) => ({
      id: `reel-${i + 1}`,
      poster: `https://picsum.photos/270/480?random=${i + 10}`,
      videoUrl: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
      alt: `Reel project ${i + 1}`
    })),
    videosUI: Array.from({ length: 8 }, (_, i) => ({
      id: `ui-${i + 1}`,
      poster: `https://picsum.photos/270/480?random=${i + 20}`,
      videoUrl: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4`,
      alt: `UI video project ${i + 1}`
    })),
    videosProduct: Array.from({ length: 8 }, (_, i) => ({
      id: `product-${i + 1}`,
      poster: `https://picsum.photos/270/480?random=${i + 30}`,
      videoUrl: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4`,
      alt: `Product video project ${i + 1}`
    })),
    logoReveal: Array.from({ length: 8 }, (_, i) => ({
      id: `logo-${i + 1}`,
      poster: `https://picsum.photos/270/480?random=${i + 40}`,
      videoUrl: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4`,
      alt: `Logo reveal project ${i + 1}`
    }))
  };

  const categories = [
    { key: 'reels', label: t('projects.categories.reels') },
    { key: 'videosUI', label: t('projects.categories.videosUI') },
    { key: 'videosProduct', label: t('projects.categories.videosProduct') },
    { key: 'logoReveal', label: t('projects.categories.logoReveal') }
  ];

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    setCurrentSlide(0);
    // Stop any playing video when switching tabs
    if (playingVideo) {
      const video = videoRefs.current[playingVideo];
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      setPlayingVideo(null);
    }
  };

  const handlePlayVideo = (projectId) => {
    const video = videoRefs.current[projectId];
    if (video) {
      if (playingVideo && playingVideo !== projectId) {
        // Pause other playing video
        const prevVideo = videoRefs.current[playingVideo];
        if (prevVideo) {
          prevVideo.pause();
          prevVideo.currentTime = 0;
        }
      }
      
      if (video.paused) {
        video.play();
        setPlayingVideo(projectId);
      } else {
        video.pause();
        setPlayingVideo(null);
      }
    }
  };

  const handleVideoEnd = (projectId) => {
    if (playingVideo === projectId) {
      setPlayingVideo(null);
    }
  };

  const handleKeyPress = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  // Mobile carousel navigation
  const nextSlide = () => {
    const maxSlides = projectCategories[activeTab].length - 1;
    setCurrentSlide(prev => prev >= maxSlides ? 0 : prev + 1);
  };

  const prevSlide = () => {
    const maxSlides = projectCategories[activeTab].length - 1;
    setCurrentSlide(prev => prev <= 0 ? maxSlides : prev - 1);
  };

  // Touch handling for mobile swipe
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="projects-title" data-i18n="projects.title">{t('projects.title')}</h2>
        
        <div className="projects-tabs" role="tablist">
          {categories.map((category) => (
            <button
              key={category.key}
              className={`tab-button ${activeTab === category.key ? 'active' : ''}`}
              onClick={() => handleTabClick(category.key)}
              onKeyPress={(e) => handleKeyPress(e, () => handleTabClick(category.key))}
              role="tab"
              aria-selected={activeTab === category.key}
              aria-controls={`panel-${category.key}`}
              data-i18n={`projects.categories.${category.key}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="projects-content">
          {categories.map((category) => (
            <div
              key={category.key}
              id={`panel-${category.key}`}
              className={`tab-panel ${activeTab === category.key ? 'active' : ''}`}
              role="tabpanel"
              aria-labelledby={`tab-${category.key}`}
            >
              {/* Desktop: 2x4 Grid */}
              <div className="projects-grid desktop-grid">
                {projectCategories[category.key].map((project) => (
                  <div key={project.id} className="project-card">
                    <div className="project-media">
                      <img
                        src={project.poster}
                        alt={project.alt}
                        className="project-poster"
                        loading="lazy"
                        decoding="async"
                      />
                      <video
                        ref={(el) => {
                          if (el) videoRefs.current[project.id] = el;
                        }}
                        src={project.videoUrl}
                        className="project-video"
                        preload="none"
                        onEnded={() => handleVideoEnd(project.id)}
                        playsInline
                        muted
                      />
                      <button
                        className={`play-button ${playingVideo === project.id ? 'playing' : ''}`}
                        onClick={() => handlePlayVideo(project.id)}
                        onKeyPress={(e) => handleKeyPress(e, () => handlePlayVideo(project.id))}
                        aria-label={`Play video ${project.id}`}
                      >
                        <Play size={24} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile: Swipeable Carousel */}
              <div 
                className="projects-carousel mobile-carousel"
                ref={mobileCarouselRef}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div 
                  className="carousel-track"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {projectCategories[category.key].map((project) => (
                    <div key={project.id} className="project-card carousel-slide">
                      <div className="project-media">
                        <img
                          src={project.poster}
                          alt={project.alt}
                          className="project-poster"
                          loading="lazy"
                          decoding="async"
                        />
                        <video
                          ref={(el) => {
                            if (el) videoRefs.current[`mobile-${project.id}`] = el;
                          }}
                          src={project.videoUrl}
                          className="project-video"
                          preload="none"
                          onEnded={() => handleVideoEnd(`mobile-${project.id}`)}
                          playsInline
                          muted
                        />
                        <button
                          className={`play-button ${playingVideo === `mobile-${project.id}` ? 'playing' : ''}`}
                          onClick={() => handlePlayVideo(`mobile-${project.id}`)}
                          onKeyPress={(e) => handleKeyPress(e, () => handlePlayVideo(`mobile-${project.id}`))}
                          aria-label={`Play video ${project.id}`}
                        >
                          <Play size={24} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  className="carousel-nav prev" 
                  onClick={prevSlide}
                  onKeyPress={(e) => handleKeyPress(e, prevSlide)}
                  aria-label="Previous video"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  className="carousel-nav next" 
                  onClick={nextSlide}
                  onKeyPress={(e) => handleKeyPress(e, nextSlide)}
                  aria-label="Next video"
                >
                  <ChevronRight size={24} />
                </button>

                <div className="carousel-indicators">
                  {projectCategories[category.key].map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => setCurrentSlide(index)}
                      onKeyPress={(e) => handleKeyPress(e, () => setCurrentSlide(index))}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;