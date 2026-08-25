import React, { useRef, useEffect } from "react";
import { CASE_STUDIES } from "../data/landingData";

export default function PlaybookSection() {
  const playbookSliderRef = useRef(null);

  useEffect(() => {
    const slider = playbookSliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let marqueeFrameId;
    let speed = 0.8; // scroll speed (pixels per frame)

    const handleMouseDown = (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const handleMouseUp = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5; // Drag sensitivity multiplier
      slider.scrollLeft = scrollLeft - walk;
    };

    const handleTouchStart = (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleTouchEnd = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const handleTouchMove = (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseleave", handleMouseLeave);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mousemove", handleMouseMove);
    slider.addEventListener("touchstart", handleTouchStart, { passive: true });
    slider.addEventListener("touchend", handleTouchEnd, { passive: true });
    slider.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    slider.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Auto scroll animation frame loop
    const updateMarquee = () => {
      if (slider) {
        if (!isDown) {
          slider.scrollLeft += speed;
        }

        const halfWidth = slider.scrollWidth / 2;
        if (slider.scrollLeft >= halfWidth) {
          slider.scrollLeft -= halfWidth;
        } else if (slider.scrollLeft <= 0) {
          slider.scrollLeft += halfWidth;
        }
      }
      marqueeFrameId = requestAnimationFrame(updateMarquee);
    };

    marqueeFrameId = requestAnimationFrame(updateMarquee);

    return () => {
      cancelAnimationFrame(marqueeFrameId);
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mousemove", handleMouseMove);
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchend", handleTouchEnd);
      slider.removeEventListener("touchcancel", handleTouchEnd);
      slider.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <section id="playbook" className="playbook-section">
      {/* Frosted Blurry glow elements behind cards */}
      <div className="playbook-blur-orb orb-1"></div>
      <div className="playbook-blur-orb orb-2"></div>
      
      <h2 className="section-title">Our Work</h2>
      
      <div ref={playbookSliderRef} className="playbook-slider-container">
        <div className="playbook-slide-track">
          <div className="playbook-group">
            {CASE_STUDIES.map((study, idx) => {
              const isDark = idx % 2 === 0;
              return (
                <div key={idx} className={`playbook-card ${isDark ? "card-dark" : "card-light flex-reverse"}`}>
                  <div className="playbook-content">
                    <div className="playbook-header-group">
                      <span className="playbook-meta">{study.meta}</span>
                      <h3 className="playbook-card-title">{study.title}</h3>
                      <p className="playbook-text-desc">{study.desc}</p>
                      <p className="playbook-text-action">
                        <strong>The Solution:</strong> {study.action}
                      </p>
                    </div>
                    
                    <div className="playbook-results-group">
                      <div className="playbook-results">
                        <h4 className="results-heading">Key Results</h4>
                        <ul className="playbook-list">
                          {study.results.map((res, i) => (
                            <li key={i}>{res}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <p className="playbook-quote">{study.quote}</p>
                    
                    {isDark ? (
                      <div className="torn-edge-container right-edge">
                        <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                          <path d="M0,0 L20,10 L17,25 L20,45 L16,60 L19,80 L15,100 L20,120 L17,140 L20,165 L16,185 L19,210 L15,235 L20,260 L17,285 L20,310 L16,335 L19,360 L15,385 L20,410 L17,435 L20,460 L15,480 L20,500 L0,500 Z" fill="currentColor" />
                        </svg>
                      </div>
                    ) : (
                      <div className="torn-edge-container left-edge">
                        <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                          <path d="M20,0 L0,10 L3,25 L0,45 L4,60 L1,80 L5,100 L0,120 L3,140 L0,165 L4,185 L1,210 L5,235 L0,260 L3,285 L0,310 L4,335 L1,360 L5,385 L0,410 L3,435 L0,460 L5,480 L0,500 L20,500 Z" fill="currentColor" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="playbook-img-container">
                    {study.images && study.images.length > 0 ? (
                      study.images.length === 2 ? (
                        <div className="playbook-collage collage-2">
                          <img src={study.images[0]} alt={`${study.title} 1`} className="playbook-collage-half" loading="lazy" decoding="async" />
                          <img src={study.images[1]} alt={`${study.title} 2`} className="playbook-collage-half" loading="lazy" decoding="async" />
                        </div>
                      ) : study.images.length === 4 ? (
                        <div className="playbook-collage collage-4">
                          <img src={study.images[0]} alt={`${study.title} 1`} className="playbook-collage-sub" loading="lazy" decoding="async" />
                          <img src={study.images[1]} alt={`${study.title} 2`} className="playbook-collage-sub" loading="lazy" decoding="async" />
                          <img src={study.images[2]} alt={`${study.title} 3`} className="playbook-collage-sub" loading="lazy" decoding="async" />
                          <img src={study.images[3]} alt={`${study.title} 4`} className="playbook-collage-sub" loading="lazy" decoding="async" />
                        </div>
                      ) : (
                        <div className="playbook-collage">
                          <img src={study.images[0]} alt={`${study.title} 1`} className="playbook-collage-main" loading="lazy" decoding="async" />
                          <img src={study.images[1]} alt={`${study.title} 2`} className="playbook-collage-sub" loading="lazy" decoding="async" />
                          <img src={study.images[2]} alt={`${study.title} 3`} className="playbook-collage-sub" loading="lazy" decoding="async" />
                        </div>
                      )
                    ) : study.image ? (
                      <img src={study.image} alt={study.title} className="playbook-img" loading="lazy" decoding="async" />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="playbook-group">
            {CASE_STUDIES.map((study, idx) => {
              const isDark = idx % 2 === 0;
              return (
                <div key={`dup-${idx}`} className={`playbook-card ${isDark ? "card-dark" : "card-light flex-reverse"}`}>
                  <div className="playbook-content">
                    <div className="playbook-header-group">
                      <span className="playbook-meta">{study.meta}</span>
                      <h3 className="playbook-card-title">{study.title}</h3>
                      <p className="playbook-text-desc">{study.desc}</p>
                      <p className="playbook-text-action">
                        <strong>The Solution:</strong> {study.action}
                      </p>
                    </div>
                    
                    <div className="playbook-results-group">
                      <div className="playbook-results">
                        <h4 className="results-heading">Key Results</h4>
                        <ul className="playbook-list">
                          {study.results.map((res, i) => (
                            <li key={i}>{res}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <p className="playbook-quote">{study.quote}</p>
                    
                    {isDark ? (
                      <div className="torn-edge-container right-edge">
                        <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                          <path d="M0,0 L20,10 L17,25 L20,45 L16,60 L19,80 L15,100 L20,120 L17,140 L20,165 L16,185 L19,210 L15,235 L20,260 L17,285 L20,310 L16,335 L19,360 L15,385 L20,410 L17,435 L20,460 L15,480 L20,500 L0,500 Z" fill="currentColor" />
                        </svg>
                      </div>
                    ) : (
                      <div className="torn-edge-container left-edge">
                        <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                          <path d="M20,0 L0,10 L3,25 L0,45 L4,60 L1,80 L5,100 L0,120 L3,140 L0,165 L4,185 L1,210 L5,235 L0,260 L3,285 L0,310 L4,335 L1,360 L5,385 L0,410 L3,435 L0,460 L5,480 L0,500 L20,500 Z" fill="currentColor" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="playbook-img-container">
                    {study.images && study.images.length > 0 ? (
                      study.images.length === 2 ? (
                        <div className="playbook-collage collage-2">
                          <img src={study.images[0]} alt={`${study.title} 1`} className="playbook-collage-half" loading="lazy" decoding="async" />
                          <img src={study.images[1]} alt={`${study.title} 2`} className="playbook-collage-half" loading="lazy" decoding="async" />
                        </div>
                      ) : study.images.length === 4 ? (
                        <div className="playbook-collage collage-4">
                          <img src={study.images[0]} alt={`${study.title} 1`} className="playbook-collage-sub" loading="lazy" decoding="async" />
                          <img src={study.images[1]} alt={`${study.title} 2`} className="playbook-collage-sub" loading="lazy" decoding="async" />
                          <img src={study.images[2]} alt={`${study.title} 3`} className="playbook-collage-sub" loading="lazy" decoding="async" />
                          <img src={study.images[3]} alt={`${study.title} 4`} className="playbook-collage-sub" loading="lazy" decoding="async" />
                        </div>
                      ) : (
                        <div className="playbook-collage">
                          <img src={study.images[0]} alt={`${study.title} 1`} className="playbook-collage-main" loading="lazy" decoding="async" />
                          <img src={study.images[1]} alt={`${study.title} 2`} className="playbook-collage-sub" loading="lazy" decoding="async" />
                          <img src={study.images[2]} alt={`${study.title} 3`} className="playbook-collage-sub" loading="lazy" decoding="async" />
                        </div>
                      )
                    ) : study.image ? (
                      <img src={study.image} alt={study.title} className="playbook-img" loading="lazy" decoding="async" />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
