"use client";

import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";

const PROBLEMS = [
  {
    number: 1,
    title: "Marketing is not treated as a real business function",
    reality: "Production, quality, and maintenance have daily reviews and owners. Marketing happens \"whenever there is time.\" Without ownership, growth is left to chance.",
    costs: [
      "Growth is accidental, driven only by old references.",
      "Invisibility costs an estimated 20–30% of annual enquiries."
    ],
    wayForward: "Run marketing like a production line—with an owner and a target."
  },
  {
    number: 2,
    title: "You have a process for everything, except marketing",
    reality: "You have SOPs for machine setups and dispatch. Yet, the single function responsible for bringing in customers runs with no system.",
    costs: [
      "Capabilities built over decades remain invisible to buyers.",
      "Stop-and-start efforts waste past spend without compounding."
    ],
    wayForward: "Standardize marketing just like a machining process."
  },
  {
    number: 3,
    title: "You have never been shown what GTM really is",
    reality: "Marketing isn't random posting. A proper Go-to-Market (GTM) system is a structured engine that delivers your value to target buyers consistently.",
    costs: [
      "You compete on price because you aren't positioned on value.",
      "Winning clients takes 2–3x more effort than a structured GTM model."
    ],
    wayForward: "Stop chasing customers. Build a system that brings them to you."
  },
  {
    number: 4,
    title: "Generic agencies have misguided you",
    reality: "B2C agencies apply retail social media strategies to industrial setups. When they fail, manufacturers conclude that marketing doesn't work.",
    costs: [
      "Wasted budget on consumer likes that don't translate to B2B orders.",
      "Lost years while competitors quietly build industry authority."
    ],
    wayForward: "Selling precision components requires shop-floor understanding."
  },
  {
    number: 5,
    title: "Chasing the cheapest option is costing you the most",
    reality: "Negotiating on the shop floor is healthy; buying cheap marketing is self-sabotage. Substandard work damages your brand and forces you to pay twice.",
    costs: [
      "Low-quality output that repels premium buyers.",
      "Huge opportunity cost: one lost contract can equal 10 years of retainers."
    ],
    wayForward: "The real question is the cost of remaining invisible."
  },
  {
    number: 6,
    title: "Your market presence is in part-time, untrained hands",
    reality: "With no dedicated owner, marketing lands on whoever is free—like an admin or HR. Your primary growth driver is treated as a sideline task.",
    costs: [
      "Inconsistent, cheap messaging tells buyers you aren't premium.",
      "Untrained staff are set up to fail, leading to wasted time."
    ],
    wayForward: "You wouldn't let an untrained operator run your CNC. Treat your brand similarly."
  },
  {
    number: 7,
    title: "You know LinkedIn and GTM matter, but something holds you back",
    reality: "Knowing you need a digital presence is easy; starting is hard. Firefighting on the plant floor keeps you from taking the first step.",
    costs: [
      "The gap between you and active competitors widens every week.",
      "Competitors build relationships with your potential buyers in the silence."
    ],
    wayForward: "We remove the friction. We set it up and run it for you."
  },
  {
    number: 8,
    title: "Full of ideas, but firefighting kills execution",
    reality: "Promoters have great ideas, but operational breakdowns, labor issues, and payment follow-ups kill execution. Firefighting always wins.",
    costs: [
      "Owner is trapped working in the factory instead of on it.",
      "Competitors execute the ideas you left on the backburner."
    ],
    wayForward: "You bring the vision; we provide the execution engine."
  },
  {
    number: 9,
    title: "No structure, no consistency, no link to your goals",
    reality: "Marketing in short bursts followed by months of silence resets progress. Without alignment with your business plan, it remains a pure expense.",
    costs: [
      "Wasted energy—like heating metal and letting it cool repeatedly.",
      "Missing out on compounding: steady effort yields 10x the pipeline."
    ],
    wayForward: "We build the structure that makes consistency automatic."
  }
];

const DIAGNOSTIC_QUESTIONS = [
  {
    category: "Capabilities Deck Status",
    text: "How do you present your manufacturing capabilities to prospects?",
    options: [
      { text: "We explain our toolroom from scratch on every call.", score: 0 },
      { text: "We have an old PPT, but it needs constant explanation.", score: 1 },
      { text: "We have a standardized deck built for Tier 1 / OEM buyer audits.", score: 2 }
    ]
  },
  {
    category: "Factory Walkthrough Video",
    text: "What visual proof do you have of your shop floor capacity?",
    options: [
      { text: "No video, or raw smartphone clips of machines.", score: 0 },
      { text: "We have a generic video, but it lacks capacity or quality control details.", score: 1 },
      { text: "We have a professional HD walkthrough showcasing machines and capacity.", score: 2 }
    ]
  },
  {
    category: "LinkedIn & Visibility",
    text: "How active is your market visibility among procurement decision-makers?",
    options: [
      { text: "We do not post, or only share festival wishes and generic news.", score: 0 },
      { text: "We post occasionally, but it is inconsistent and has no structure.", score: 1 },
      { text: "We showcase shop-floor metrics, capabilities, and B2B cases weekly.", score: 2 }
    ]
  },
  {
    category: "CRM & Contact Data",
    text: "How do you track Tier 1 OEMs and active procurement managers?",
    options: [
      { text: "Procurement contacts are stored in email threads and notebooks.", score: 0 },
      { text: "Excel spreadsheets that are updated occasionally.", score: 1 },
      { text: "Structured CRM mapping target OEMs and active procurement managers.", score: 2 }
    ]
  },
  {
    category: "Growth Review Cadence",
    text: "How is your marketing and GTM process monitored?",
    options: [
      { text: "We review production and quality, but never review marketing.", score: 0 },
      { text: "Monthly or quarterly reviews, but without structured metrics.", score: 1 },
      { text: "Weekly growth and GTM reviews matching shop-floor governance.", score: 2 }
    ]
  }
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const lenisRef = useRef(null);
  const playbookSliderRef = useRef(null);
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState([]);

  useEffect(() => {
    // Initialize Lenis smooth scroll for weighted momentum scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

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
      ...document.querySelectorAll(".metric-item"),
      ...document.querySelectorAll(".problem-card"),
      ...document.querySelectorAll(".service-card"),
      ...document.querySelectorAll(".roadmap-card"),
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

    // Playbook/Case Studies slider drag-to-scroll & auto-scroll
    const slider = playbookSliderRef.current;
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

    if (slider) {
      slider.addEventListener("mousedown", handleMouseDown);
      slider.addEventListener("mouseleave", handleMouseLeave);
      slider.addEventListener("mouseup", handleMouseUp);
      slider.addEventListener("mousemove", handleMouseMove);

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
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      lenis.destroy();
      if (slider) {
        slider.removeEventListener("mousedown", handleMouseDown);
        slider.removeEventListener("mouseleave", handleMouseLeave);
        slider.removeEventListener("mouseup", handleMouseUp);
        slider.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(marqueeFrameId);
    };
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement && lenisRef.current) {
      const navbar = document.querySelector(".navbar");
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      lenisRef.current.scrollTo(targetElement, {
        offset: -(navbarHeight + 20),
        duration: 1.4,
      });
    } else if (targetElement) {
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

  const handleAnswerSelect = (score) => {
    const updatedAnswers = [...assessmentAnswers];
    updatedAnswers[assessmentStep] = score;
    setAssessmentAnswers(updatedAnswers);
    
    // Auto transition with small visual confirmation delay
    setTimeout(() => {
      setAssessmentStep((prev) => prev + 1);
    }, 200);
  };
  
  const resetAssessment = () => {
    setAssessmentAnswers([]);
    setAssessmentStep(0);
  };
  
  // Calculate result if step is 5
  const totalScore = assessmentAnswers.reduce((sum, current) => sum + current, 0);
  
  let verdictTitle = "";
  let verdictDesc = "";
  let verdictNext = "";
  let verdictClass = "";
  
  if (totalScore <= 3) {
    verdictTitle = "Ad-Hoc Tier (High Risk)";
    verdictDesc = "Relying entirely on raw referrals. Invisible to foreign procurement heads.";
    verdictNext = "Build core GTM assets in the next 30 days.";
    verdictClass = "verdict-risk";
  } else if (totalScore <= 7) {
    verdictTitle = "Standardized Tier (Growth Bottleneck)";
    verdictDesc = "Basic assets exist, but lack a systematic month-on-month pipeline.";
    verdictNext = "Install the Reputation Engine for monthly B2B visibility.";
    verdictClass = "verdict-bottleneck";
  } else {
    verdictTitle = "Scalable Tier (GTM Ready)";
    verdictDesc = "High operational readiness. Ready to capture and pre-qualify inbound inquiries.";
    verdictNext = "Scale B2B campaigns and filter inquiries.";
    verdictClass = "verdict-ready";
  }

  return (
    <>
      {/* Navigation */}
      <header className="header">
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
          <div className="logo">
            COMMUNIC8<span className="dot">.</span>
          </div>
          <div className="nav-links">
            <a href="#problems" onClick={(e) => handleSmoothScroll(e, "#problems")} className="nav-link">
              The Problems
            </a>
            <a href="#system" onClick={(e) => handleSmoothScroll(e, "#system")} className="nav-link">
              Our System
            </a>
            <a href="#services" onClick={(e) => handleSmoothScroll(e, "#services")} className="nav-link">
              Services
            </a>
            <a href="#playbook" onClick={(e) => handleSmoothScroll(e, "#playbook")} className="nav-link">
              Case Studies
            </a>
            <a href="#assessment" onClick={(e) => handleSmoothScroll(e, "#assessment")} className="nav-link">
              Diagnostic
            </a>
            <a href="#metrics" onClick={(e) => handleSmoothScroll(e, "#metrics")} className="nav-link">
              Metrics
            </a>
          </div>
          <a href="#consultation" onClick={(e) => handleSmoothScroll(e, "#consultation")} className="btn-cta">
            Book a GTM Readiness Conversation
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
              <h1 className="hero-title">Communic8 helps Indian manufacturing MSMEs stay consistent in their growth journey.</h1>
              <p className="hero-subtitle">You have a process for everything on your shop floor. Marketing shouldn't be the exception.</p>
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

        {/* Problems Section */}
        <section id="problems" className="problems-section">
          <div className="problems-container">
            <div className="problems-intro">
              <h2 className="problems-subtitle">You run a tight factory. So why is growth still so hard?</h2>
              <p className="problems-intro-desc">
                After meeting hundreds of manufacturers — from a 500 sq. ft. tool room to plants spread across acres — we found the same 9 problems, again and again. Read them honestly. If even 3 sound like your company, it is worth a conversation.
              </p>
            </div>

            <div className="problems-grid">
              {PROBLEMS.map((problem) => (
                <div key={problem.number} className="problem-card">
                  <span className="problem-num">{String(problem.number).padStart(2, "0")}</span>
                  <div>
                    <h3 className="problem-title">{problem.title}</h3>
                    <p className="problem-reality">{problem.reality}</p>
                    <div className="problem-cost-container">
                      <h4 className="problem-cost-header">Silent cost:</h4>
                      <ul className="problem-cost-list">
                        {problem.costs.map((cost, idx) => (
                          <li key={idx}>{cost}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="problem-way-forward">{problem.wayForward}</p>
                </div>
              ))}
            </div>

            <div className="problems-outro">
              <p className="problems-outro-text">
                If even 3 of these 9 sound like your company — you do not have a marketing problem. You have a structure problem. And structure is exactly what we build.
              </p>
              <a href="#consultation" className="btn-problems-cta">
                Book a GTM Readiness Conversation
              </a>
            </div>
          </div>
        </section>

        {/* The System We Install Section */}
        <section id="system" className="system-section">
          <div className="system-container">
            <h2 className="system-title">The System We Install</h2>
            <div className="system-roadmap">
              {/* Step 1 */}
              <div className="roadmap-item">
                <div className="roadmap-node">01</div>
                <div className="roadmap-card" style={{ transitionDelay: "0ms" }}>
                  <span className="roadmap-pillar">Pillar 1</span>
                  <h3 className="roadmap-card-title">GTM Standardization</h3>
                  <p className="roadmap-card-focus">Phase 1: Meeting-Ready in 30 Days</p>
                  <ul className="roadmap-card-list">
                    <li>Standardized Capabilities Deck (no more explaining your toolroom from scratch).</li>
                    <li>High-definition Factory Walkthrough video.</li>
                    <li>Credibility sheets and case studies tailored for Tier 1 / OEM buyers.</li>
                  </ul>
                </div>
              </div>

              {/* Step 2 */}
              <div className="roadmap-item">
                <div className="roadmap-node">02</div>
                <div className="roadmap-card" style={{ transitionDelay: "150ms" }}>
                  <span className="roadmap-pillar">Pillar 2</span>
                  <h3 className="roadmap-card-title">The Reputation Engine</h3>
                  <p className="roadmap-card-focus">Phase 2: Monthly Visibility Retainer</p>
                  <ul className="roadmap-card-list">
                    <li>Industry-specific authority positioning on LinkedIn.</li>
                    <li>Continuous B2B content marketing showcasing shop-floor capabilities.</li>
                    <li>Regular communication reaching foreign buyers and procurement heads.</li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="roadmap-item">
                <div className="roadmap-node">03</div>
                <div className="roadmap-card" style={{ transitionDelay: "300ms" }}>
                  <span className="roadmap-pillar">Pillar 3</span>
                  <h3 className="roadmap-card-title">The Review & Cadence</h3>
                  <p className="roadmap-card-focus">Phase 3: Governance & Structure</p>
                  <ul className="roadmap-card-list">
                    <li>Weekly reviews matching your production and quality meetings.</li>
                    <li>Alignment with your Annual Business Plan and 5-year growth goals.</li>
                    <li>Direct hand-off of inquiries to your sales desk.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services & Retainers Section */}
        <section id="services" className="services-section">
          <div className="services-container">
            <h2 className="services-title">Services & Retainers</h2>
            <p className="services-subtitle">Durable-First B2B Manufacturing Growth Offerings</p>
            
            <div className="services-grid">
              {/* Card 1: GTM Standardization */}
              <div className="service-card" style={{ transitionDelay: "0ms" }}>
                <div>
                  <span className="service-badge-project">One-Time Project</span>
                  <h3 className="service-title-text">Go-To-Market (GTM) Standardization</h3>
                  <p className="service-focus-text">Making Your Factory Meeting-Ready in 30 Days</p>
                  <div className="service-body">
                    <p className="service-desc">
                      Standardizes your marketing and sales assets so you can present capabilities instantly to Tier 1 and OEM buyers.
                    </p>
                    <ul className="service-list">
                      <li>Custom Capabilities Deck (shop-floor focused)</li>
                      <li>High-Definition Corporate Video Walkthrough</li>
                      <li>Case Studies and Pitch Assets templates</li>
                    </ul>
                  </div>
                </div>
                <div className="service-footer">
                  <a href="#consultation" className="btn-service">Book a GTM Readiness Conversation</a>
                </div>
              </div>

              {/* Card 2: Reputation Management */}
              <div className="service-card recommended" style={{ transitionDelay: "150ms" }}>
                <div className="recommended-badge">Recommended default</div>
                <div>
                  <span className="service-badge-retainer">Ongoing Retainer</span>
                  <h3 className="service-title-text">Reputation Management</h3>
                  <p className="service-focus-text">Hands-Free Monthly Credibility Engine</p>
                  <div className="service-body">
                    <p className="service-desc">
                      Maintains constant market visibility and builds long-term authority among foreign buyers, procurement heads, and OEMs.
                    </p>
                    <ul className="service-list">
                      <li>B2B LinkedIn authority positioning</li>
                      <li>Continuous case studies and shop-floor storytelling</li>
                      <li>Active reach out and connection building</li>
                    </ul>
                  </div>
                </div>
                <div className="service-footer">
                  <a href="#consultation" className="btn-service btn-recommended">Install the Reputation Engine</a>
                </div>
              </div>

              {/* Card 3: Lead Nurturing */}
              <div className="service-card screened" style={{ transitionDelay: "300ms" }}>
                <div className="screened-lock-badge">Invitation & Review Only</div>
                <div>
                  <span className="service-badge-premium">Premium Retainer</span>
                  <h3 className="service-title-text">Lead Nurturing</h3>
                  <p className="service-focus-text">Active Pipeline Building & Filtering</p>
                  <div className="service-body">
                    <p className="service-desc">
                      For operationally stable factories ready to handle new buyers. We run active nurturing campaigns and filter inquiries.
                    </p>
                    <ul className="service-list">
                      <li>End-to-end GTM campaign execution</li>
                      <li>Buyer inquiry pre-qualification and vetting</li>
                      <li>Direct pipeline hand-off to your sales desk</li>
                    </ul>
                  </div>
                </div>
                <div className="service-footer">
                  <span className="service-lock-note">Requires Operational Readiness Review</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Playbook / Initiatives Section */}
        <section id="playbook" className="playbook-section">
          {/* Frosted Blurry glow elements behind cards */}
          <div className="playbook-blur-orb orb-1"></div>
          <div className="playbook-blur-orb orb-2"></div>
          
          <h2 className="section-title">Case Studies &amp; Testimonials</h2>
          
          <div ref={playbookSliderRef} className="playbook-slider-container">
            <div className="playbook-slide-track">
              <div className="playbook-group">
                {/* Case Study 1 */}
                <div className="playbook-card card-dark">
                  <div className="playbook-content">
                    <h3 className="playbook-card-title">Case Study: Pune MSME</h3>
                    <ul className="playbook-list">
                      <li>
                        <strong className="list-head">The Action:</strong> 
                        Standardised GTM assets and installed the Reputation Engine for a precision-machining manufacturer.
                      </li>
                      <li>
                        <strong className="list-head">OEM Reach:</strong> 
                        4,500+ high-intent procurement decision-makers reached.
                      </li>
                      <li>
                        <strong className="list-head">Positive Interest:</strong> 
                        250+ active business interests and meeting requests.
                      </li>
                      <li>
                        <strong className="list-head">Assets Delivered:</strong> 
                        Meeting-ready capabilities decks and repeatable GTM assets.
                      </li>
                    </ul>
                    {/* Torn Edge on Right */}
                    <div className="torn-edge-container right-edge">
                      <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                        <path d="M0,0 L20,10 L17,25 L20,45 L16,60 L19,80 L15,100 L20,120 L17,140 L20,165 L16,185 L19,210 L15,235 L20,260 L17,285 L20,310 L16,335 L19,360 L15,385 L20,410 L17,435 L20,460 L15,480 L20,500 L0,500 Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <div className="playbook-img-container">
                    <img src="/assets/playbook_copywriting.jpg" alt="Factory CNC machine operating" className="playbook-img" />
                  </div>
                </div>

                {/* Testimonial 1 */}
                <div className="playbook-card card-light flex-reverse">
                  <div className="playbook-img-container">
                    <img src="/assets/playbook_outreach.jpg" alt="Sanjay D., Managing Director" className="playbook-img" />
                  </div>
                  <div className="playbook-content">
                    {/* Torn Edge on Left */}
                    <div className="torn-edge-container left-edge">
                      <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                        <path d="M20,0 L0,10 L3,25 L0,45 L4,60 L1,80 L5,100 L0,120 L3,140 L0,165 L4,185 L1,210 L5,235 L0,260 L3,285 L0,310 L4,335 L1,360 L5,385 L0,410 L3,435 L0,460 L5,480 L0,500 L20,500 Z" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="roadmap-pillar" style={{ display: 'block', marginBottom: '8px' }}>Precision Auto Components, Pune</span>
                    <h3 className="playbook-card-title">Sanjay D. (MD)</h3>
                    <p className="roadmap-card-focus" style={{ fontSize: '1.05rem', color: '#1a1a1a', lineHeight: '1.6', marginTop: '16px' }}>
                      "Before Communic8, we were invisible to foreign buyers. Ajinkya understood our shop floor. The GTM deck and walkthrough video they built did more than 5 years of cold sales chasing."
                    </p>
                  </div>
                </div>

                {/* Case Study 2 */}
                <div className="playbook-card card-dark">
                  <div className="playbook-content">
                    <h3 className="playbook-card-title">Case Study: Chennai Stamping</h3>
                    <ul className="playbook-list">
                      <li>
                        <strong className="list-head">The Action:</strong> 
                        Produced a high-definition factory walkthrough video and implemented a LinkedIn visibility program.
                      </li>
                      <li>
                        <strong className="list-head">Buyer Inquiries:</strong> 
                        Secured direct RFQs from Tier 1 procurement managers within 90 days.
                      </li>
                      <li>
                        <strong className="list-head">Market Positioning:</strong> 
                        Established brand authority for sheet-metal stamping capabilities.
                      </li>
                      <li>
                        <strong className="list-head">Visible Proof:</strong> 
                        Showcased deep toolroom and quality control setups to global OEMs.
                      </li>
                    </ul>
                    {/* Torn Edge on Right */}
                    <div className="torn-edge-container right-edge">
                      <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                        <path d="M0,0 L20,10 L17,25 L20,45 L16,60 L19,80 L15,100 L20,120 L17,140 L20,165 L16,185 L19,210 L15,235 L20,260 L17,285 L20,310 L16,335 L19,360 L15,385 L20,410 L17,435 L20,460 L15,480 L20,500 L0,500 Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <div className="playbook-img-container">
                    <img src="/assets/playbook_authority.jpg" alt="Factory stamping floor" className="playbook-img" />
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div className="playbook-card card-light flex-reverse">
                  <div className="playbook-img-container">
                    <img src="/assets/playbook_advocacy.jpg" alt="Rajesh K., Director" className="playbook-img" />
                  </div>
                  <div className="playbook-content">
                    {/* Torn Edge on Left */}
                    <div className="torn-edge-container left-edge">
                      <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                        <path d="M20,0 L0,10 L3,25 L0,45 L4,60 L1,80 L5,100 L0,120 L3,140 L0,165 L4,185 L1,210 L5,235 L0,260 L3,285 L0,310 L4,335 L1,360 L5,385 L0,410 L3,435 L0,460 L5,480 L0,500 L20,500 Z" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="roadmap-pillar" style={{ display: 'block', marginBottom: '8px' }}>Chennai Stamping Pvt Ltd</span>
                    <h3 className="playbook-card-title">Rajesh K. (Director)</h3>
                    <p className="roadmap-card-focus" style={{ fontSize: '1.05rem', color: '#1a1a1a', lineHeight: '1.6', marginTop: '16px' }}>
                      "We tried generic digital agencies that wanted us to do reels. Communic8 installed a process. Our LinkedIn is now as consistent as our production line."
                    </p>
                  </div>
                </div>
              </div>

              <div className="playbook-group">
                {/* Case Study 1 (Duplicate) */}
                <div className="playbook-card card-dark">
                  <div className="playbook-content">
                    <h3 className="playbook-card-title">Case Study: Pune MSME</h3>
                    <ul className="playbook-list">
                      <li>
                        <strong className="list-head">The Action:</strong> 
                        Standardised GTM assets and installed the Reputation Engine for a precision-machining manufacturer.
                      </li>
                      <li>
                        <strong className="list-head">OEM Reach:</strong> 
                        4,500+ high-intent procurement decision-makers reached.
                      </li>
                      <li>
                        <strong className="list-head">Positive Interest:</strong> 
                        250+ active business interests and meeting requests.
                      </li>
                      <li>
                        <strong className="list-head">Assets Delivered:</strong> 
                        Meeting-ready capabilities decks and repeatable GTM assets.
                      </li>
                    </ul>
                    {/* Torn Edge on Right */}
                    <div className="torn-edge-container right-edge">
                      <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                        <path d="M0,0 L20,10 L17,25 L20,45 L16,60 L19,80 L15,100 L20,120 L17,140 L20,165 L16,185 L19,210 L15,235 L20,260 L17,285 L20,310 L16,335 L19,360 L15,385 L20,410 L17,435 L20,460 L15,480 L20,500 L0,500 Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <div className="playbook-img-container">
                    <img src="/assets/playbook_copywriting.jpg" alt="Factory CNC machine operating" className="playbook-img" />
                  </div>
                </div>

                {/* Testimonial 1 (Duplicate) */}
                <div className="playbook-card card-light flex-reverse">
                  <div className="playbook-img-container">
                    <img src="/assets/playbook_outreach.jpg" alt="Sanjay D., Managing Director" className="playbook-img" />
                  </div>
                  <div className="playbook-content">
                    {/* Torn Edge on Left */}
                    <div className="torn-edge-container left-edge">
                      <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                        <path d="M20,0 L0,10 L3,25 L0,45 L4,60 L1,80 L5,100 L0,120 L3,140 L0,165 L4,185 L1,210 L5,235 L0,260 L3,285 L0,310 L4,335 L1,360 L5,385 L0,410 L3,435 L0,460 L5,480 L0,500 L20,500 Z" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="roadmap-pillar" style={{ display: 'block', marginBottom: '8px' }}>Precision Auto Components, Pune</span>
                    <h3 className="playbook-card-title">Sanjay D. (MD)</h3>
                    <p className="roadmap-card-focus" style={{ fontSize: '1.05rem', color: '#1a1a1a', lineHeight: '1.6', marginTop: '16px' }}>
                      "Before Communic8, we were invisible to foreign buyers. Ajinkya understood our shop floor. The GTM deck and walkthrough video they built did more than 5 years of cold sales chasing."
                    </p>
                  </div>
                </div>

                {/* Case Study 2 (Duplicate) */}
                <div className="playbook-card card-dark">
                  <div className="playbook-content">
                    <h3 className="playbook-card-title">Case Study: Chennai Stamping</h3>
                    <ul className="playbook-list">
                      <li>
                        <strong className="list-head">The Action:</strong> 
                        Produced a high-definition factory walkthrough video and implemented a LinkedIn visibility program.
                      </li>
                      <li>
                        <strong className="list-head">Buyer Inquiries:</strong> 
                        Secured direct RFQs from Tier 1 procurement managers within 90 days.
                      </li>
                      <li>
                        <strong className="list-head">Market Positioning:</strong> 
                        Established brand authority for sheet-metal stamping capabilities.
                      </li>
                      <li>
                        <strong className="list-head">Visible Proof:</strong> 
                        Showcased deep toolroom and quality control setups to global OEMs.
                      </li>
                    </ul>
                    {/* Torn Edge on Right */}
                    <div className="torn-edge-container right-edge">
                      <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                        <path d="M0,0 L20,10 L17,25 L20,45 L16,60 L19,80 L15,100 L20,120 L17,140 L20,165 L16,185 L19,210 L15,235 L20,260 L17,285 L20,310 L16,335 L19,360 L15,385 L20,410 L17,435 L20,460 L15,480 L20,500 L0,500 Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <div className="playbook-img-container">
                    <img src="/assets/playbook_authority.jpg" alt="Factory stamping floor" className="playbook-img" />
                  </div>
                </div>

                {/* Testimonial 2 (Duplicate) */}
                <div className="playbook-card card-light flex-reverse">
                  <div className="playbook-img-container">
                    <img src="/assets/playbook_advocacy.jpg" alt="Rajesh K., Director" className="playbook-img" />
                  </div>
                  <div className="playbook-content">
                    {/* Torn Edge on Left */}
                    <div className="torn-edge-container left-edge">
                      <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                        <path d="M20,0 L0,10 L3,25 L0,45 L4,60 L1,80 L5,100 L0,120 L3,140 L0,165 L4,185 L1,210 L5,235 L0,260 L3,285 L0,310 L4,335 L1,360 L5,385 L0,410 L3,435 L0,460 L5,480 L0,500 L20,500 Z" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="roadmap-pillar" style={{ display: 'block', marginBottom: '8px' }}>Chennai Stamping Pvt Ltd</span>
                    <h3 className="playbook-card-title">Rajesh K. (Director)</h3>
                    <p className="roadmap-card-focus" style={{ fontSize: '1.05rem', color: '#1a1a1a', lineHeight: '1.6', marginTop: '16px' }}>
                      "We tried generic digital agencies that wanted us to do reels. Communic8 installed a process. Our LinkedIn is now as consistent as our production line."
                    </p>
                  </div>
                </div>
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

        {/* Interactive GTM Assessment Section */}
        <section id="assessment" className="assessment-section">
          <div className="assessment-container">
            <h2 className="assessment-title">GTM Readiness Assessment</h2>
            <p className="assessment-subtitle">
              Is your B2B manufacturing firm ready to scale its GTM? Take the 60-second diagnostic check.
            </p>
            
            <div className="assessment-card-wrapper">
              {assessmentStep < 5 ? (
                <div className="diagnostic-wizard-card">
                  <div className="wizard-progress">
                    <span className="progress-step">Question {assessmentStep + 1} of 5</span>
                    <div className="progress-track">
                      <div className="progress-bar" style={{ width: `${(assessmentStep + 1) * 20}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="wizard-content">
                    <span className="question-category">{DIAGNOSTIC_QUESTIONS[assessmentStep].category}</span>
                    <h3 className="question-text">{DIAGNOSTIC_QUESTIONS[assessmentStep].text}</h3>
                    
                    <div className="options-list">
                      {DIAGNOSTIC_QUESTIONS[assessmentStep].options.map((opt, index) => {
                        const optionLabels = ["A", "B", "C"];
                        const isSelected = assessmentAnswers[assessmentStep] === opt.score;
                        return (
                          <button
                            key={index}
                            className={`option-btn ${isSelected ? "selected" : ""}`}
                            onClick={() => handleAnswerSelect(opt.score)}
                          >
                            <span className="option-letter">{optionLabels[index]}</span>
                            <span className="option-text">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  {assessmentStep > 0 && (
                    <button className="btn-back" onClick={() => setAssessmentStep((prev) => prev - 1)}>
                      ← Back to previous question
                    </button>
                  )}
                </div>
              ) : (
                <div className="diagnostic-result-card">
                  <div className="result-header">
                    <span className="result-label">Your Diagnostic Report</span>
                    <h3 className="result-score">GTM Score: {totalScore} <span className="score-total">/ 10</span></h3>
                  </div>
                  
                  <div className={`result-verdict-box ${verdictClass}`}>
                    <h4 className="verdict-tier-title">{verdictTitle}</h4>
                    <p className="verdict-description">{verdictDesc}</p>
                    
                    <div className="verdict-recommendation">
                      <span className="recommendation-label">Recommended Next Step:</span>
                      <p className="recommendation-text">{verdictNext}</p>
                    </div>
                  </div>
                  
                  <div className="result-actions">
                    <a
                      href="#consultation"
                      onClick={(e) => handleSmoothScroll(e, "#consultation")}
                      className="btn-result-cta"
                    >
                      Book a GTM Readiness Conversation
                    </a>
                    <button className="btn-retake" onClick={resetAssessment}>
                      Retake Assessment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Founder Bio / Consultation Section */}
        <section id="consultation" className="bio-section">
          <div className="bio-card">
            <div className="bio-img-container">
              <img src="/assets/team_portrait.jpg" alt="Ajinkya — Founder of Communic8" className="bio-img" />
            </div>
            <div className="bio-content">
              <h2 className="bio-name">Ajinkya</h2>
              <h3 className="bio-title">Built by an operations head who ran 4 plants — not a digital marketer.</h3>
              <p className="bio-description">
                Installing a growth process requires shop-floor discipline, not creative theories. After 16 years working hands-on in factories—climbing from helper to tool room, then plant head to operations head, and scaling a workforce from 135 to over 850 people across 4 plants—I built Communic8 to install the missing marketing process in B2B manufacturing. We don't talk vanity metrics; we build durable, structured market visibility that translates directly to industrial growth.
              </p>
              <a href="#consultation" className="btn-consultation">Book a GTM Readiness Conversation</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2026 COMMUNIC8. All rights reserved.</p>
          <div className="footer-links">
            <a href="#problems" onClick={(e) => handleSmoothScroll(e, "#problems")}>The Problems</a>
            <a href="#system" onClick={(e) => handleSmoothScroll(e, "#system")}>Our System</a>
            <a href="#services" onClick={(e) => handleSmoothScroll(e, "#services")}>Services</a>
            <a href="#playbook" onClick={(e) => handleSmoothScroll(e, "#playbook")}>Case Studies</a>
            <a href="#assessment" onClick={(e) => handleSmoothScroll(e, "#assessment")}>Diagnostic</a>
            <a href="#metrics" onClick={(e) => handleSmoothScroll(e, "#metrics")}>Metrics</a>
          </div>
        </div>
      </footer>
    </>
  );
}
