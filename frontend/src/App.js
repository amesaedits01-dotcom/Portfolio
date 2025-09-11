import React from 'react';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { I18nProvider } from './contexts/I18nContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoCarousel from './components/LogoCarousel';
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
          <LogoCarousel />
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