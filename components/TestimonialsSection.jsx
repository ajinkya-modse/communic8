import React, { useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "../data/landingData";

export default function TestimonialsSection() {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVideoReady(true);
        observer.disconnect();
      }
    }, { rootMargin: "600px 0px" });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleTestimonialsScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.clientWidth;
    const card = e.target.querySelector('.testimony-card');
    const cardWidth = card ? card.getBoundingClientRect().width : width;
    const idx = Math.round(scrollLeft / (cardWidth + 12));
    setActiveTestimonialIdx(idx);
  };

  return (
    <section id="testimonials" className="testimonials-section" ref={sectionRef}>
      <div className="testimonials-bg-wrapper">
        {videoReady && (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="metadata"
            className="testimonials-bg-video"
          >
            <source src="/assets/new_video-optimized.mp4" type="video/mp4" />
          </video>
        )}
        <div className="testimonials-bg-overlay"></div>
      </div>
      <div className="testimonials-container">
        <h2 className="testimonials-title">What Founders Say</h2>
        <div className="testimonials-grid" onScroll={handleTestimonialsScroll}>
          {TESTIMONIALS.map((testimony, idx) => (
            <div key={idx} className="testimony-card">
              {testimony.image ? (
                <div className="testimony-img-wrapper">
                  <img src={testimony.image} alt={testimony.name} className="testimony-img" loading="lazy" decoding="async" />
                </div>
              ) : (
                <div className="testimony-img-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              )}
              <div className="testimony-content-box">
                <p className="testimony-quote">“{testimony.quote}”</p>
                <div className="testimony-author">
                  <span className="testimony-name">{testimony.name}</span>
                  <span className="testimony-role">{testimony.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic scroll indicators for testimonials on mobile viewports */}
        <div className="testimonials-dots-container">
          {TESTIMONIALS.map((_, i) => (
            <div 
              key={i} 
              className={`testimonials-dot ${activeTestimonialIdx === i ? 'active' : ''}`}
              onClick={() => {
                const grid = document.querySelector('.testimonials-grid');
                if (grid) {
                  const card = grid.querySelector('.testimony-card');
                  const cardWidth = card ? card.getBoundingClientRect().width : grid.clientWidth;
                  grid.scrollTo({
                    left: i * (cardWidth + 12),
                    behavior: 'smooth'
                  });
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
