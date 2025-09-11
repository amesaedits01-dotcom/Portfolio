import React from 'react';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { I18nProvider } from './contexts/I18nContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandCarousel from './components/BrandCarousel';
import YouTubeCarousel from './components/YouTubeCarousel';
import Projects from './components/Projects';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <div className="App">
          <Navbar />
          <Hero />
          <BrandCarousel />
          <YouTubeCarousel />
          <Projects />
          <FAQ />
          <Contact />
          <Footer />
        </div>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;