import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useI18n } from '../contexts/I18nContext';
import { Globe, Sun, Moon, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleKeyPress = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <button 
            className="brand-text"
            onClick={() => scrollToSection('home')}
            onKeyPress={(e) => handleKeyPress(e, () => scrollToSection('home'))}
            aria-label="Go to home"
          >
            AM
          </button>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <button 
            className="nav-link"
            onClick={() => scrollToSection('home')}
            onKeyPress={(e) => handleKeyPress(e, () => scrollToSection('home'))}
            data-i18n="nav.home"
          >
            {t('nav.home')}
          </button>
          <button 
            className="nav-link"
            onClick={() => scrollToSection('projects')}
            onKeyPress={(e) => handleKeyPress(e, () => scrollToSection('projects'))}
            data-i18n="nav.projects"
          >
            {t('nav.projects')}
          </button>
          <button 
            className="nav-link"
            onClick={() => scrollToSection('faq')}
            onKeyPress={(e) => handleKeyPress(e, () => scrollToSection('faq'))}
            data-i18n="nav.faq"
          >
            {t('nav.faq')}
          </button>
          <button 
            className="nav-link"
            onClick={() => scrollToSection('contact')}
            onKeyPress={(e) => handleKeyPress(e, () => scrollToSection('contact'))}
            data-i18n="nav.contact"
          >
            {t('nav.contact')}
          </button>
        </div>

        <div className="navbar-controls">
          <div className="language-selector">
            <Globe className="globe-icon" size={18} />
            <button
              className={`lang-btn ${language === 'es' ? 'active' : ''}`}
              onClick={() => changeLanguage('es')}
              onKeyPress={(e) => handleKeyPress(e, () => changeLanguage('es'))}
              aria-label="Cambiar a español"
            >
              ES
            </button>
            <span className="lang-divider">|</span>
            <button
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => changeLanguage('en')}
              onKeyPress={(e) => handleKeyPress(e, () => changeLanguage('en'))}
              aria-label="Change to English"
            >
              EN
            </button>
          </div>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            onKeyPress={(e) => handleKeyPress(e, toggleTheme)}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onKeyPress={(e) => handleKeyPress(e, () => setIsMenuOpen(!isMenuOpen))}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;