"use client";

import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [playbookProgress, setPlaybookProgress] = useState(0);
  const playbookTrackRef = useRef(null);

  const handlePlaybookScroll = () => {
    const track = playbookTrackRef.current;
    if (track) {
      const totalScroll = track.scrollWidth - track.clientWidth;
      if (totalScroll > 0) {
        const progress = (track.scrollLeft / totalScroll) * 100;
        setPlaybookProgress(progress);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Intersection Observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -80px 0px",
      threshold: 0.15,
    };

    const revealCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);

    const animateTargets = [
      ...document.querySelectorAll(".founder-card"),
      ...document.querySelectorAll(".playbook-card"),
      ...document.querySelectorAll(".metric-item"),
      document.querySelector(".bio-card"),
      document.querySelector(".section-title"),
      document.querySelector(".metrics-heading"),
    ];

    animateTargets.forEach((target) => {
      if (target) {
        target.classList.add("scroll-animate");
        observer.observe(target);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navbar = document.querySelector(".navbar");
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        (navbarHeight + 20);

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Navigation */}
      <header className="header">
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
          <div className="logo">
            COMMUNIC8<span className="dot">.</span>
          </div>
          <div className="nav-links">
            <a href="#playbook" onClick={(e) => handleSmoothScroll(e, "#playbook")} className="nav-link">
              Playbook
            </a>
            <a href="#founders" onClick={(e) => handleSmoothScroll(e, "#founders")} className="nav-link">
              Founders
            </a>
            <a href="#metrics" onClick={(e) => handleSmoothScroll(e, "#metrics")} className="nav-link">
              Metrics
            </a>
          </div>
          <a href="#consultation" onClick={(e) => handleSmoothScroll(e, "#consultation")} className="btn-cta">
            Book Your Strategy Call
          </a>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-card">
            <div className="hero-bg-overlay"></div>
            <img src="/assets/hero_background.jpg" alt="Collaborative creative team" className="hero-bg-img" />
            <div className="hero-content">
              <h1 className="hero-title">LinkedIn Growth and Personal Branding ?</h1>
              <p className="hero-subtitle">Communic8 is your team!</p>
            </div>
          </div>
        </section>

        {/* Features / Publications Section */}
        <section className="features-section">
          <h3 className="features-title">F E A T U R E S</h3>
          <div className="logo-slider-container">
            <div className="logo-slide-track">
              <div className="logo-group">
                {/* TechCrunch Logo SVG */}
                <div className="brand-logo" aria-label="TechCrunch">
                  <svg viewBox="0 0 120 28" fill="currentColor">
                    <path d="M0 0h10.4v6.8H6.6v20.4H0V0zm15.4 6.8V0h21.4v6.8h-7.1v20.4h-6.8V6.8h-7.5zm19.8 0h6.8v20.4h-6.8V6.8zM42.2 0h10.4v6.8h-3.8v6.8h3.8v6.8h-3.8v6.8H42.2V0zm17 6.8V0h20.6v6.8h-6.7v20.4h-6.8V6.8h-7.1zM79.8 0h10.4v6.8H86.4v6.8h3.8v6.8H86.4v6.8H79.8V0zm17 0h10.4v6.8h-3.8v6.8h3.8v6.8h-3.8v6.8H96.8V0zm16.4 6.8V0h6.8v27.2h-6.8V6.8z"/>
                  </svg>
                </div>
                {/* Forbes Logo SVG */}
                <div className="brand-logo" aria-label="Forbes">
                  <svg viewBox="0 0 120 28" fill="currentColor">
                    <path d="M0 0h13.2v4.8H5.6v6h6.8v4.8H5.6v12h-5.6V0zm16.8 0h11.2v27.2H16.8V0zm5.6 4.8v17.6h0.2l5.4-17.6h-5.6zm11.2 0h11.2v27.2H33.6V0zm5.6 4.8v17.6h0.2l5.4-17.6h-5.6zm11.2 0h11.2V4.8H50.4V0h5.6v27.2h-5.6V4.8zM67.2 0h13.2v4.8h-7.6v6h6.8v4.8h-6.8v6.4h7.6v5.2H67.2V0zm16.8 0h11.2v27.2H84V0zm5.6 4.8v17.6h0.2l5.4-17.6H89.6z"/>
                  </svg>
                </div>
                {/* Wired Logo SVG */}
                <div className="brand-logo" aria-label="Wired">
                  <svg viewBox="0 0 120 28" fill="currentColor">
                    <path d="M0 0h5.6l4.2 16.8L14 0h5.6l4.2 16.8L28 0h5.6l-5.6 27.2h-5.6l-4.2-16.8-4.2 16.8H8.4L2.8 0h-2.8zM36.4 0h5.6v27.2h-5.6V0zm11.2 0h11.2c5.6 0 8.4 2.8 8.4 8.4 0 4.2-2.8 7-7 8.4l7 10.4h-5.6l-7-10.4h-3.8v10.4h-5.6V0zm5.6 4.8v6.8h5.6c2.8 0 4.2-1.4 4.2-3.4 0-2-1.4-3.4-4.2-3.4h-5.6zm19.6-4.8h13.2v4.8H78.4v6.4h9.8v4.8h-9.8v6.4h11.2v4.8H72.8V0zm19.6 0h9.8c8.4 0 12.6 4.2 12.6 13.6s-4.2 13.6-12.6 13.6h-9.8V0zm5.6 4.8v17.6h4.2c5.6 0 7-2.8 7-8.8s-1.4-8.8-7-8.8h-4.2z"/>
                  </svg>
                </div>
                {/* Fast Company Logo SVG */}
                <div className="brand-logo" aria-label="Fast Company">
                  <svg viewBox="0 0 150 28" fill="currentColor">
                    <path d="M0 0h15.4v5.6H5.6v5.6h9.8v5.6H5.6v10.4H0V0zm21 0h15.4v5.6h-9.8v5.6h9.8v5.6h-9.8v10.4H21V0zm42 5.6h-5.6v21.6H30.8V5.6h-5.6V0H63v5.6zm5.6 21.6V0h5.6v27.2h-5.6v-27.2zm14 0h11.2c5.6 0 8.4 2.8 8.4 8.4 0 4.2-2.8 7-7 8.4l7 10.4h-5.6l-7-10.4H88.2v10.4h-5.6V0zm5.6 5.6v6.8h5.6c2.8 0 4.2-1.4 4.2-3.4 0-2-1.4-3.4-4.2-3.4h-5.6zm19.6-5.6h15.4v5.6h-9.8v5.6h9.8v5.6h-9.8v10.4h-5.6V0zm21 0h5.6v27.2h-5.6V0zm14 0h5.6l4.2 16.8 4.2-16.8h5.6l-5.6 27.2h-5.6l-4.2-16.8-4.2 16.8h-5.6L142.8 0z"/>
                  </svg>
                </div>
                {/* Entrepreneur Logo SVG */}
                <div className="brand-logo" aria-label="Entrepreneur">
                  <svg viewBox="0 0 140 28" fill="currentColor">
                    <path d="M0 0h12v4.8H4.8v6h6.8v4.8H4.8v6.4h7.2v5.2H0V0zm16.8 11.2h11.2v16h-4.8v-16h-6.4V0h5.6v11.2zm11.2 0h11.2v16h-4.8v-16h-6.4V0h5.6v11.2zm11.2-11.2h11.2c4.8 0 7.2 2.4 7.2 7.2 0 3.6-2.4 6-6 7.2l6 9.6h-4.8l-6-9.6H44v9.6h-4.8V0zm4.8 4.8v5.6h5.6c2.4 0 3.6-1.2 3.6-2.8 0-1.6-1.2-2.8-3.6-2.8H44zm19.6-4.8H72v4.8h-7.6v6h6.8v4.8h-6.8v6.4h7.6v5.2H63.6V0zm16.8 0h11.2v27.2H80.4V0zm4.8 4.8v17.6h0.2l5.4-17.6h-5.6zm11.2 0h11.2V4.8h-5.6V0h5.6v27.2h-5.6V4.8zm11.2 0h11.2v27.2h-4.8V4.8h-6.4V0h5.6v4.8zm11.2-4.8h12v4.8h-7.2v6h6.8v4.8h-6.8v6.4h7.2v5.2h-12V0zm16.8 0h11.2v27.2h-4.8V4.8h-6.4V0h5.6v4.8z"/>
                  </svg>
                </div>
              </div>
              <div className="logo-group">
                {/* TechCrunch Logo SVG */}
                <div className="brand-logo" aria-label="TechCrunch">
                  <svg viewBox="0 0 120 28" fill="currentColor">
                    <path d="M0 0h10.4v6.8H6.6v20.4H0V0zm15.4 6.8V0h21.4v6.8h-7.1v20.4h-6.8V6.8h-7.5zm19.8 0h6.8v20.4h-6.8V6.8zM42.2 0h10.4v6.8h-3.8v6.8h3.8v6.8h-3.8v6.8H42.2V0zm17 6.8V0h20.6v6.8h-6.7v20.4h-6.8V6.8h-7.1zM79.8 0h10.4v6.8H86.4v6.8h3.8v6.8H86.4v6.8H79.8V0zm17 0h10.4v6.8h-3.8v6.8h3.8v6.8h-3.8v6.8H96.8V0zm16.4 6.8V0h6.8v27.2h-6.8V6.8z"/>
                  </svg>
                </div>
                {/* Forbes Logo SVG */}
                <div className="brand-logo" aria-label="Forbes">
                  <svg viewBox="0 0 120 28" fill="currentColor">
                    <path d="M0 0h13.2v4.8H5.6v6h6.8v4.8H5.6v12h-5.6V0zm16.8 0h11.2v27.2H16.8V0zm5.6 4.8v17.6h0.2l5.4-17.6h-5.6zm11.2 0h11.2v27.2H33.6V0zm5.6 4.8v17.6h0.2l5.4-17.6h-5.6zm11.2 0h11.2V4.8H50.4V0h5.6v27.2h-5.6V4.8zM67.2 0h13.2v4.8h-7.6v6h6.8v4.8h-6.8v6.4h7.6v5.2H67.2V0zm16.8 0h11.2v27.2H84V0zm5.6 4.8v17.6h0.2l5.4-17.6H89.6z"/>
                  </svg>
                </div>
                {/* Wired Logo SVG */}
                <div className="brand-logo" aria-label="Wired">
                  <svg viewBox="0 0 120 28" fill="currentColor">
                    <path d="M0 0h5.6l4.2 16.8L14 0h5.6l4.2 16.8L28 0h5.6l-5.6 27.2h-5.6l-4.2-16.8-4.2 16.8H8.4L2.8 0h-2.8zM36.4 0h5.6v27.2h-5.6V0zm11.2 0h11.2c5.6 0 8.4 2.8 8.4 8.4 0 4.2-2.8 7-7 8.4l7 10.4h-5.6l-7-10.4h-3.8v10.4h-5.6V0zm5.6 4.8v6.8h5.6c2.8 0 4.2-1.4 4.2-3.4 0-2-1.4-3.4-4.2-3.4h-5.6zm19.6-4.8h13.2v4.8H78.4v6.4h9.8v4.8h-9.8v6.4h11.2v4.8H72.8V0zm19.6 0h9.8c8.4 0 12.6 4.2 12.6 13.6s-4.2 13.6-12.6 13.6h-9.8V0zm5.6 4.8v17.6h4.2c5.6 0 7-2.8 7-8.8s-1.4-8.8-7-8.8h-4.2z"/>
                  </svg>
                </div>
                {/* Fast Company Logo SVG */}
                <div className="brand-logo" aria-label="Fast Company">
                  <svg viewBox="0 0 150 28" fill="currentColor">
                    <path d="M0 0h15.4v5.6H5.6v5.6h9.8v5.6H5.6v10.4H0V0zm21 0h15.4v5.6h-9.8v5.6h9.8v5.6h-9.8v10.4H21V0zm42 5.6h-5.6v21.6H30.8V5.6h-5.6V0H63v5.6zm5.6 21.6V0h5.6v27.2h-5.6v-27.2zm14 0h11.2c5.6 0 8.4 2.8 8.4 8.4 0 4.2-2.8 7-7 8.4l7 10.4h-5.6l-7-10.4H88.2v10.4h-5.6V0zm5.6 5.6v6.8h5.6c2.8 0 4.2-1.4 4.2-3.4 0-2-1.4-3.4-4.2-3.4h-5.6zm19.6-5.6h15.4v5.6h-9.8v5.6h9.8v5.6h-9.8v10.4h-5.6V0zm21 0h5.6v27.2h-5.6V0zm14 0h5.6l4.2 16.8 4.2-16.8h5.6l-5.6 27.2h-5.6l-4.2-16.8-4.2 16.8h-5.6L142.8 0z"/>
                  </svg>
                </div>
                {/* Entrepreneur Logo SVG */}
                <div className="brand-logo" aria-label="Entrepreneur">
                  <svg viewBox="0 0 140 28" fill="currentColor">
                    <path d="M0 0h12v4.8H4.8v6h6.8v4.8H4.8v6.4h7.2v5.2H0V0zm16.8 11.2h11.2v16h-4.8v-16h-6.4V0h5.6v11.2zm11.2 0h11.2v16h-4.8v-16h-6.4V0h5.6v11.2zm11.2-11.2h11.2c4.8 0 7.2 2.4 7.2 7.2 0 3.6-2.4 6-6 7.2l6 9.6h-4.8l-6-9.6H44v9.6h-4.8V0zm4.8 4.8v5.6h5.6c2.4 0 3.6-1.2 3.6-2.8 0-1.6-1.2-2.8-3.6-2.8H44zm19.6-4.8H72v4.8h-7.6v6h6.8v4.8h-6.8v6.4h7.6v5.2H63.6V0zm16.8 0h11.2v27.2H80.4V0zm4.8 4.8v17.6h0.2l5.4-17.6h-5.6zm11.2 0h11.2V4.8h-5.6V0h5.6v27.2h-5.6V4.8zm11.2 0h11.2v27.2h-4.8V4.8h-6.4V0h5.6v4.8zm11.2-4.8h12v4.8h-7.2v6h6.8v4.8h-6.8v6.4h7.2v5.2h-12V0zm16.8 0h11.2v27.2h-4.8V4.8h-6.4V0h5.6v4.8z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section id="founders" className="founders-section">
          <h3 className="founders-heading">Founders we've scaled</h3>
          <div className="founders-slider-container">
            <div className="founders-slide-track">
              <div className="founders-group">
                <div className="founder-card">
                  <img src="/assets/founder_1.jpg" alt="Sarah Jenkins" className="founder-avatar" />
                  <div className="founder-info">
                    <span className="founder-name">Sarah Jenkins</span>
                    <span className="founder-title">Co-Founder, SaaSify</span>
                  </div>
                </div>
                <div className="founder-card">
                  <img src="/assets/founder_2.jpg" alt="Alex Rivera" className="founder-avatar" />
                  <div className="founder-info">
                    <span className="founder-name">Alex Rivera</span>
                    <span className="founder-title">CEO, FinFlow</span>
                  </div>
                </div>
                <div className="founder-card">
                  <img src="/assets/founder_3.jpg" alt="Elena Rostova" className="founder-avatar" />
                  <div className="founder-info">
                    <span className="founder-name">Elena Rostova</span>
                    <span className="founder-title">Founder, Edurise</span>
                  </div>
                </div>
                <div className="founder-card">
                  <img src="/assets/founder_4.jpg" alt="Marcus Vance" className="founder-avatar" />
                  <div className="founder-info">
                    <span className="founder-name">Marcus Vance</span>
                    <span className="founder-title">Partner, Apex Capital</span>
                  </div>
                </div>
                <div className="founder-card">
                  <img src="/assets/founder_5.jpg" alt="David Chen" className="founder-avatar" />
                  <div className="founder-info">
                    <span className="founder-name">David Chen</span>
                    <span className="founder-title">CEO, HealthSync</span>
                  </div>
                </div>
              </div>
              <div className="founders-group">
                <div className="founder-card">
                  <img src="/assets/founder_1.jpg" alt="Sarah Jenkins" className="founder-avatar" />
                  <div className="founder-info">
                    <span className="founder-name">Sarah Jenkins</span>
                    <span className="founder-title">Co-Founder, SaaSify</span>
                  </div>
                </div>
                <div className="founder-card">
                  <img src="/assets/founder_2.jpg" alt="Alex Rivera" className="founder-avatar" />
                  <div className="founder-info">
                    <span className="founder-name">Alex Rivera</span>
                    <span className="founder-title">CEO, FinFlow</span>
                  </div>
                </div>
                <div className="founder-card">
                  <img src="/assets/founder_3.jpg" alt="Elena Rostova" className="founder-avatar" />
                  <div className="founder-info">
                    <span className="founder-name">Elena Rostova</span>
                    <span className="founder-title">Founder, Edurise</span>
                  </div>
                </div>
                <div className="founder-card">
                  <img src="/assets/founder_4.jpg" alt="Marcus Vance" className="founder-avatar" />
                  <div className="founder-info">
                    <span className="founder-name">Marcus Vance</span>
                    <span className="founder-title">Partner, Apex Capital</span>
                  </div>
                </div>
                <div className="founder-card">
                  <img src="/assets/founder_5.jpg" alt="David Chen" className="founder-avatar" />
                  <div className="founder-info">
                    <span className="founder-name">David Chen</span>
                    <span className="founder-title">CEO, HealthSync</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Playbook / Initiatives Section */}
        <section id="playbook" className="playbook-section">
          <h2 className="section-title">Our playbook.</h2>

          {/* Custom Scroll Progress Bar */}
          <div className="playbook-progress-container">
            <div className="playbook-progress-bar">
              <div 
                className="playbook-progress-fill" 
                style={{ width: `${playbookProgress}%` }}
              ></div>
            </div>
          </div>
          
          <div 
            ref={playbookTrackRef}
            onScroll={handlePlaybookScroll}
            className="playbook-track"
          >
            {/* Playbook Card 1 */}
            <div className="playbook-card">
              <div className="playbook-content">
                <h3 className="playbook-card-title">Personal Branding &amp; Copywriting</h3>
                <ul className="playbook-list">
                  <li>
                    <strong className="list-head">Content Strategy &amp; Tone:</strong> 
                    Tailored voice matching your industry authority.
                  </li>
                  <li>
                    <strong className="list-head">Daily Ghostwriting:</strong> 
                    5 high-impact text and carousel posts per week.
                  </li>
                  <li>
                    <strong className="list-head">Profile Optimization:</strong> 
                    Professional banner, headline, and about section.
                  </li>
                  <li>
                    <strong className="list-head">Strategic Engagement:</strong> 
                    High-value commenting on target accounts.
                  </li>
                </ul>
              </div>
              <div className="playbook-img-container">
                <img src="/assets/playbook_copywriting.jpg" alt="Copywriting work on laptop" className="playbook-img" />
              </div>
            </div>

            {/* Playbook Card 2 */}
            <div className="playbook-card">
              <div className="playbook-content">
                <h3 className="playbook-card-title">Lead Generation &amp; Outreach</h3>
                <ul className="playbook-list">
                  <li>
                    <strong className="list-head">Targeted Outreach:</strong> 
                    Direct messaging campaigns with 20%+ response rates.
                  </li>
                  <li>
                    <strong className="list-head">ICP Connection Building:</strong> 
                    Growing your network with 500+ prospects monthly.
                  </li>
                  <li>
                    <strong className="list-head">Inbound Funnel Setup:</strong> 
                    Capturing profile views and converting them to leads.
                  </li>
                  <li>
                    <strong className="list-head">Analytics Dashboard:</strong> 
                    Weekly reporting on pipeline and performance.
                  </li>
                </ul>
              </div>
              <div className="playbook-img-container">
                <img src="/assets/playbook_outreach.jpg" alt="Business professionals shaking hands" className="playbook-img" />
              </div>
            </div>

            {/* Playbook Card 3 */}
            <div className="playbook-card">
              <div className="playbook-content">
                <h3 className="playbook-card-title">Executive Ghostwriting &amp; Authority</h3>
                <ul className="playbook-list">
                  <li>
                    <strong className="list-head">Thought Leadership Strategy:</strong> 
                    Positioning you as the go-to authority in your niche.
                  </li>
                  <li>
                    <strong className="list-head">Deep-Dive Carousels:</strong> 
                    Beautiful, high-yield PDF slides with 10k+ average views.
                  </li>
                  <li>
                    <strong className="list-head">PR &amp; Newsjacking:</strong> 
                    Turning breaking industry trends into viral commentary.
                  </li>
                  <li>
                    <strong className="list-head">Newsletter Integration:</strong> 
                    Funneling profile views into email subscribers.
                  </li>
                </ul>
              </div>
              <div className="playbook-img-container">
                <img src="/assets/playbook_authority.jpg" alt="Executive presenting ideas" className="playbook-img" />
              </div>
            </div>

            {/* Playbook Card 4 */}
            <div className="playbook-card">
              <div className="playbook-content">
                <h3 className="playbook-card-title">Corporate Advocacy &amp; Training</h3>
                <ul className="playbook-list">
                  <li>
                    <strong className="list-head">Employee Advocacy Programs:</strong> 
                    Turning your team into brand ambassadors on LinkedIn.
                  </li>
                  <li>
                    <strong className="list-head">Executive Cohorts:</strong> 
                    Training your leadership team to write and share insights.
                  </li>
                  <li>
                    <strong className="list-head">LinkedIn Workshops:</strong> 
                    Interactive virtual masterclasses for your staff.
                  </li>
                  <li>
                    <strong className="list-head">Brand Governance:</strong> 
                    Setting corporate templates, guidelines, and compliance.
                  </li>
                </ul>
              </div>
              <div className="playbook-img-container">
                <img src="/assets/playbook_advocacy.jpg" alt="Corporate training workshop" className="playbook-img" />
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section id="metrics" className="metrics-section">
          <h3 className="metrics-heading">Metrics that change companies.</h3>
          <div className="metrics-grid">
            <div className="metric-item">
              <span className="metric-number">50M+</span>
              <span className="metric-label">Views Generated</span>
            </div>
            <div className="metric-item">
              <span className="metric-number">120k+</span>
              <span className="metric-label">Followers Gained</span>
            </div>
            <div className="metric-item">
              <span className="metric-number">$8M+</span>
              <span className="metric-label">Client Pipeline Created</span>
            </div>
            <div className="metric-item">
              <span className="metric-number">45+</span>
              <span className="metric-label">Founders Scaled</span>
            </div>
            <div className="metric-item">
              <span className="metric-number">15+</span>
              <span className="metric-label">Industries Dominated</span>
            </div>
            <div className="metric-item">
              <span className="metric-number">94%</span>
              <span className="metric-label">Client Retention Rate</span>
            </div>
          </div>
        </section>

        {/* Founder Bio / Consultation Section */}
        <section id="consultation" className="bio-section">
          <div className="bio-card">
            <div className="bio-img-container">
              <img src="/assets/team_portrait.jpg" alt="Marcus Vance portrait" className="bio-img" />
            </div>
            <div className="bio-content">
              <h2 className="bio-name">Marcus Vance (@marcus_vance)</h2>
              <h3 className="bio-title">LinkedIn Growth Strategist</h3>
              <p className="bio-description">
                We help high-growth founders, CEOs, and corporate executives build dominant personal brands on LinkedIn. By combining expert content ghostwriting with targeted outbound prospecting and high-conversion profile funnel architecture, we turn your online presence into a robust, organic lead pipeline.
              </p>
              <a href="#booking" className="btn-consultation">Book a Discovery Call</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2026 COMMUNIC8. All rights reserved.</p>
          <div className="footer-links">
            <a href="#playbook" onClick={(e) => handleSmoothScroll(e, "#playbook")}>Playbook</a>
            <a href="#founders" onClick={(e) => handleSmoothScroll(e, "#founders")}>Founders</a>
            <a href="#metrics" onClick={(e) => handleSmoothScroll(e, "#metrics")}>Metrics</a>
          </div>
        </div>
      </footer>
    </>
  );
}
