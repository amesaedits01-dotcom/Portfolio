import React, { createContext, useContext, useState, useEffect } from 'react';

const I18nContext = createContext();

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

// Mock translations - will be loaded from JSON files
const translations = {
  es: {
    nav: {
      projects: "Proyectos",
      contact: "Contacto"
    },
    hero: {
      title: "Libera tu creatividad",
      subtitle: "Motion graphics que convierten vistas en leads",
      microcopy: "Unleash the creativity — take your brand to the next level.",
      projectsBtn: "Proyectos",
      scheduleBtn: "Agenda llamada"
    },
    projects: {
      title: "Proyectos",
      categories: {
        reels: "Reels",
        videosUI: "Videos UI", 
        videosProduct: "Videos Producto",
        logoReveal: "Logo Reveal"
      }
    },
    faq: {
      title: "Preguntas Frecuentes",
      q1: {
        question: "¿Qué tipo de proyectos editas?",
        answer: "Edito reels, anuncios verticales 9:16, videos de producto, videos UI y piezas de motion graphics para redes y web. Trabajo tanto contenido corto (15–60s) como piezas más largas (hasta 10 min), siempre orientadas a conversión y storytelling."
      },
      q2: {
        question: "¿Cuánto tiempo tardas en entregar un proyecto?",
        answer: "Varía según el tipo, duración y complejidad. Un reel simple puede entregarse en pocos días; piezas con motion graphics y múltiples revisiones requieren más tiempo. Confirmo el plazo exacto al recibir tu brief."
      },
      q3: {
        question: "¿Qué necesito enviarte para empezar?",
        answer: "Un brief con objetivo y referencias; los videos/crudos (.mp4/.mov); logos/vectoriales; tipografías (si aplica); guion o timestamps y recursos (música/licencias). Si falta algo, te envío una checklist para facilitar el envío."
      },
      q4: {
        question: "¿Qué formatos y entregables incluyes?",
        answer: "Entrega estándar: master .mp4 (web-ready), versiones vertical/horizontal si aplica y archivos SRT de subtítulos si se solicitan. Puedo preparar además mini-clips para thumbnails o adaptaciones por plataforma."
      },
      q5: {
        question: "¿Incluyes revisiones en tus entregas?",
        answer: "Sí. Incluyo 2 rondas de revisiones en el precio base (ajustes de ritmo, color y micro-edits). Cambios mayores o reestructuraciones se cotizan aparte."
      }
    },
    cta: {
      text: "Your competitors are already posting. Why wait?",
      subtitle: "Creemos contenido que convierte"
    },
    contact: {
      title: "Contacto",
      form: {
        name: "Nombre",
        email: "Email",
        message: "Mensaje",
        submit: "Enviar"
      }
    },
    footer: {
      copyright: "© 2025 Ariel Mesa. Todos los derechos reservados."
    }
  },
  en: {
    nav: {
      projects: "Projects",
      contact: "Contact"
    },
    hero: {
      title: "Unleash your creativity",
      subtitle: "Motion graphics that convert views into leads",
      microcopy: "Unleash the creativity — take your brand to the next level.",
      projectsBtn: "Projects",
      scheduleBtn: "Schedule call"
    },
    projects: {
      title: "Projects",
      categories: {
        reels: "Reels",
        videosUI: "UI Videos",
        videosProduct: "Product Videos", 
        logoReveal: "Logo Reveal"
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      q1: {
        question: "What types of projects do you edit?",
        answer: "I edit reels, vertical ads (9:16), product videos, UI videos and motion graphics for social and web. I handle short-form (15–60s) and longer pieces (up to 10 min), always focused on conversion and storytelling."
      },
      q2: {
        question: "How long does delivery take?",
        answer: "It depends on type, duration and complexity. A simple reel can be delivered in a few days; motion-graphics-heavy projects take longer. I confirm exact timing after receiving your brief."
      },
      q3: {
        question: "What do I need to send to start?",
        answer: "A brief with objectives and references; raw video files (.mp4/.mov); logos/vector files; fonts (if applicable); a script or timestamps; music/licenses. If something's missing, I'll provide a checklist."
      },
      q4: {
        question: "What formats and deliverables do you include?",
        answer: "Standard delivery: master .mp4 (web-ready), vertical/horizontal versions if needed, and SRT subtitle files on request. I can also prepare mini-clips for thumbnails or platform-specific adaptations."
      },
      q5: {
        question: "Do you include revisions?",
        answer: "Yes — 2 rounds of revisions included in the base price (rhythm, color, micro-edits). Major restructures are charged separately."
      }
    },
    cta: {
      text: "Your competitors are already posting. Why wait?",
      subtitle: "We create content that converts"
    },
    contact: {
      title: "Contact",
      form: {
        name: "Name",
        email: "Email", 
        message: "Message",
        submit: "Send"
      }
    },
    footer: {
      copyright: "© 2025 Ariel Mesa. All rights reserved."
    }
  }
};

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'es';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <I18nContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};