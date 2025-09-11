import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { Play } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('reels');
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRefs = useRef({});

  // Mock project data - 6 projects per category
  const projectCategories = {
    reels: Array.from({ length: 6 }, (_, i) => ({
      id: `reel-${i + 1}`,
      title: `Reel ${i + 1}`,
      poster: `https://picsum.photos/270/480?random=${i + 10}`,
      videoUrl: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
      alt: `Reel project ${i + 1}`
    })),
    videosUI: Array.from({ length: 6 }, (_, i) => ({
      id: `ui-${i + 1}`,
      title: `UI Video ${i + 1}`,
      poster: `https://picsum.photos/270/480?random=${i + 20}`,
      videoUrl: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4`,
      alt: `UI video project ${i + 1}`
    })),
    videosProduct: Array.from({ length: 6 }, (_, i) => ({
      id: `product-${i + 1}`,
      title: `Product Video ${i + 1}`,
      poster: `https://picsum.photos/270/480?random=${i + 30}`,
      videoUrl: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4`,
      alt: `Product video project ${i + 1}`
    })),
    logoReveal: Array.from({ length: 6 }, (_, i) => ({
      id: `logo-${i + 1}`,
      title: `Logo Reveal ${i + 1}`,
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

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="projects-title">{t('projects.title')}</h2>
        
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
              <div className="projects-grid">
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
                        aria-label={`Play ${project.title}`}
                      >
                        <Play size={24} />
                      </button>
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;