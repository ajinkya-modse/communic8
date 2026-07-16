import React, { useState, useEffect } from "react";
import { HERO_WORDS, HERO_COMPANIES } from "../data/landingData";

export default function HeroSection() {
  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const [heroWordFading, setHeroWordFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroWordFading(true);
      setTimeout(() => {
        setHeroWordIndex((prev) => (prev + 1) % HERO_WORDS.length);
        setHeroWordFading(false);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-card">
        <div className="hero-bg-overlay"></div>
        <video 
          src="/assets/hero_video.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-bg-video" 
        />
        <div className="hero-content">
          <h1 className="hero-title">
            <span className={`dynamic-word ${heroWordFading ? "fade-out" : "fade-in"}`}>
              {HERO_WORDS[heroWordIndex]}
            </span> for manufacturers.
          </h1>
          <p className="hero-subtitle">We generate demand. You sign contracts.</p>
          
          <div className="hero-credibility">
            <span>135+ Clients</span>
            <span className="divider">|</span>
            <span>819+ Projects</span>
            <span className="divider">|</span>
            <span>16+ years expertise</span>
          </div>
        </div>

        {/* Customer Logo Slider (Dench style) */}
        <div className="hero-logos-slider">
          <p className="hero-logos-title">Trusted by some of the reputed companies..</p>
          <div className="hero-logos-track-container">
            <div className="hero-logos-track">
              {[...HERO_COMPANIES, ...HERO_COMPANIES, ...HERO_COMPANIES, ...HERO_COMPANIES].map((company, index) => (
                <div key={index} className="hero-logo-item" aria-label={company.name}>
                  <img src={company.logo} alt={company.name} className="hero-logo-img" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
