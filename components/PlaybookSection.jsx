import React, { useRef, useEffect, useState } from "react";
import { CASE_STUDIES } from "../data/landingData";

function CaseStudyCollage({ study, className = "", images }) {
  const collageImages = images || study.images;

  if (collageImages && collageImages.length > 0) {
    if (collageImages.length === 2) {
      return (
        <div className={`playbook-collage collage-2 ${className}`.trim()}>
          <img src={collageImages[0]} alt={`${study.title} 1`} className="playbook-collage-half" loading="lazy" decoding="async" />
          <img src={collageImages[1]} alt={`${study.title} 2`} className="playbook-collage-half" loading="lazy" decoding="async" />
        </div>
      );
    }
    if (collageImages.length === 4) {
      return (
        <div className={`playbook-collage collage-4 ${className}`.trim()}>
          <img src={collageImages[0]} alt={`${study.title} 1`} className="playbook-collage-sub" loading="lazy" decoding="async" />
          <img src={collageImages[1]} alt={`${study.title} 2`} className="playbook-collage-sub" loading="lazy" decoding="async" />
          <img src={collageImages[2]} alt={`${study.title} 3`} className="playbook-collage-sub" loading="lazy" decoding="async" />
          <img src={collageImages[3]} alt={`${study.title} 4`} className="playbook-collage-sub" loading="lazy" decoding="async" />
        </div>
      );
    }
    return (
      <div className={`playbook-collage ${className}`.trim()}>
        <img src={collageImages[0]} alt={`${study.title} 1`} className="playbook-collage-main" loading="lazy" decoding="async" />
        <img src={collageImages[1]} alt={`${study.title} 2`} className="playbook-collage-sub" loading="lazy" decoding="async" />
        <img src={collageImages[2]} alt={`${study.title} 3`} className="playbook-collage-sub" loading="lazy" decoding="async" />
      </div>
    );
  }
  if (study.image) {
    return <img src={study.image} alt={study.title} className="playbook-img" loading="lazy" decoding="async" />;
  }
  return null;
}

function formatMetricLabel(text) {
  return text.replace(/\s+/g, " ").trim().replace(/^./, (c) => c.toUpperCase()).slice(0, 24);
}

function parseResultToMetric(result) {
  let match = result.match(/^(.+?\s+up)\s+(\d+(?:\.\d+)?%|\d+x|\d+)$/i);
  if (match) return { value: match[2], label: formatMetricLabel(match[1]) };

  match = result.match(/^(.+?)\s+(\d+(?:\.\d+)?%)$/);
  if (match) return { value: match[2], label: formatMetricLabel(match[1]) };

  match = result.match(/^(\d+\+)\s+(.+)$/i);
  if (match) return { value: match[1], label: formatMetricLabel(match[2]) };

  match = result.match(/^Specified in (\d+)\s+(.+)$/i);
  if (match) return { value: match[1], label: formatMetricLabel(match[2]) };

  match = result.match(/^[^:]+:\s*[\d.]+%\s+to\s+(\d+(?:\.\d+)?%)$/i);
  if (match) {
    const label = result.split(":")[0].trim();
    return { value: match[1], label: formatMetricLabel(label) };
  }

  match = result.match(/^(\d+)\s+new\s+(.+?)(?:\s+\(|$)/i);
  if (match) return { value: match[1], label: formatMetricLabel(`New ${match[2]}`) };

  match = result.match(/^(.+?\s+improved)\s+(\d+(?:\.\d+)?%)$/i);
  if (match) return { value: match[2], label: formatMetricLabel(match[1]) };

  match = result.match(/^Sales cycle shortened (\d+%)$/i);
  if (match) return { value: match[1], label: "Sales cycle cut" };

  match = result.match(/^Conversions up (\d+%)$/i);
  if (match) return { value: match[1], label: "Conversions up" };

  match = result.match(/^(\d+)\s+(RFQs?.+)$/i);
  if (match) return { value: match[1], label: match[2] };

  match = result.match(/(\d+(?:\.\d+)?%|\d+\+|\d+x)/);
  if (match) {
    const label = result.replace(match[1], "").replace(/^[\s:,-]+|[\s:,-]+$/g, "").slice(0, 22);
    return { value: match[1], label: label || "Result" };
  }
  return null;
}

function scoreMetric(metric, original) {
  let score = 0;
  if (/%/.test(metric.value)) score += 10;
  if (/\+/.test(metric.value)) score += 8;
  if (/x/i.test(original)) score += 7;
  if (/^\d+$/.test(metric.value)) score += 5;
  if (/revenue|conversion|enquir/i.test(original)) score += 3;
  return score;
}

function extractMetrics(results, max = 3) {
  return results
    .map((result) => {
      const metric = parseResultToMetric(result);
      if (!metric) return null;
      return { ...metric, score: scoreMetric(metric, result) };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map(({ value, label }) => ({ value, label }));
}

function getCompanyInfo(meta) {
  const parts = meta.split("·").map((p) => p.trim());
  const revenue = parts.find((p) => p.includes("₹"));
  const years = parts.find((p) => /\d+\+?\s*[Yy]ears?/.test(p));
  const formattedYears = years ? years.replace(/\+/g, "").replace(/years/i, "years") : null;
  return [revenue, formattedYears].filter(Boolean).join(" · ");
}

function PlaybookCard({ study, idx, isDark }) {
  return (
    <div className={`playbook-card ${isDark ? "card-dark" : "card-light flex-reverse"}`}>
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
        <CaseStudyCollage study={study} />
      </div>
    </div>
  );
}

function MobileAccordionCard({ study, idx, isOpen, onToggle, isRevealed, revealDelay = 0 }) {
  const metrics = study.mobileMetrics || extractMetrics(study.results);
  const companyInfo = getCompanyInfo(study.meta);

  return (
    <article
      className={`playbook-mobile-card ${isOpen ? "is-open" : ""} ${isRevealed ? "is-revealed" : ""}`}
      style={isRevealed ? { animationDelay: `${revealDelay}ms` } : undefined}
    >
      <button
        type="button"
        className="playbook-mobile-card-toggle"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className={`playbook-mobile-img-container${study.mobileImages ? " playbook-mobile-img-container--duo" : ""}`}>
          <CaseStudyCollage study={study} images={study.mobileImages} />
        </div>

        <div className="playbook-mobile-card-body">
          <div className="playbook-mobile-card-header">
            <span className="playbook-mobile-tag">{study.title}</span>
            <span className={`playbook-mobile-chevron ${isOpen ? "is-open" : ""}`} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <blockquote className="playbook-mobile-quote">{study.quote}</blockquote>

          {companyInfo && <p className="playbook-mobile-company">{companyInfo}</p>}

          {metrics.length > 0 && (
            <div
              className="playbook-mobile-metrics"
              style={{ gridTemplateColumns: `repeat(${Math.min(metrics.length, 3)}, 1fr)` }}
            >
              {metrics.map((metric, i) => (
                <div key={i} className="playbook-mobile-metric">
                  <span className="playbook-mobile-metric-value">{metric.value}</span>
                  <span className="playbook-mobile-metric-label">{metric.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </button>

      <div className={`playbook-mobile-expanded ${isOpen ? "is-open" : ""}`}>
        <div className="playbook-mobile-expanded-inner">
          <div className="playbook-mobile-detail">
            <h4 className="playbook-mobile-detail-heading">The Problem</h4>
            <p className="playbook-mobile-detail-text">{study.desc}</p>
          </div>
          <div className="playbook-mobile-detail">
            <h4 className="playbook-mobile-detail-heading">What We Did</h4>
            <p className="playbook-mobile-detail-text">{study.action}</p>
          </div>
          <div className="playbook-mobile-detail">
            <h4 className="playbook-mobile-detail-heading">Results</h4>
            <ul className="playbook-mobile-results-list">
              {study.results.map((res, i) => (
                <li key={i}>
                  <span className="playbook-mobile-result-arrow" aria-hidden="true">↑</span>
                  {res}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function PlaybookSection() {
  const playbookSliderRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showAllStories, setShowAllStories] = useState(false);

  useEffect(() => {
    const slider = playbookSliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let marqueeFrameId;
    const speed = 0.8;

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
      const walk = (x - startX) * 1.5;
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

  const handleToggle = (idx) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  const handleShowMore = () => {
    setShowAllStories(true);
  };

  return (
    <section id="playbook" className="playbook-section">
      <div className="playbook-blur-orb orb-1"></div>
      <div className="playbook-blur-orb orb-2"></div>

      <h2 className="section-title">Our Work</h2>

      {/* Desktop: horizontal marquee slider */}
      <div ref={playbookSliderRef} className="playbook-slider-container playbook-desktop">
        <div className="playbook-slide-track">
          <div className="playbook-group">
            {CASE_STUDIES.map((study, idx) => (
              <PlaybookCard key={idx} study={study} idx={idx} isDark={idx % 2 === 0} />
            ))}
          </div>
          <div className="playbook-group">
            {CASE_STUDIES.map((study, idx) => (
              <PlaybookCard key={`dup-${idx}`} study={study} idx={idx} isDark={idx % 2 === 0} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical accordion cards */}
      <div className="playbook-mobile">
        {CASE_STUDIES.map((study, idx) => {
          const isHidden = !showAllStories && idx >= 3;
          if (isHidden) return null;

          return (
            <MobileAccordionCard
              key={idx}
              study={study}
              idx={idx}
              isOpen={expandedIndex === idx}
              onToggle={() => handleToggle(idx)}
              isRevealed={showAllStories && idx >= 3}
              revealDelay={showAllStories && idx >= 3 ? (idx - 3) * 80 : 0}
            />
          );
        })}

        {!showAllStories && (
          <button type="button" className="playbook-show-more" onClick={handleShowMore}>
            See 3 more stories
          </button>
        )}
      </div>
    </section>
  );
}
