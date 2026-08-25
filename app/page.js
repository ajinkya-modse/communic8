"use client";

import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { CALENDLY_URL } from "../data/landingData";

import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import LeadersSection from "../components/LeadersSection";
import ProblemsSection from "../components/ProblemsSection";
import SystemSection from "../components/SystemSection";
import ServicesSection from "../components/ServicesSection";
import PlaybookSection from "../components/PlaybookSection";
import TestimonialsSection from "../components/TestimonialsSection";
import MetricsSection from "../components/MetricsSection";
import AssessmentSection from "../components/AssessmentSection";
import BioSection from "../components/BioSection";
import GallerySection from "../components/GallerySection";
import Footer from "../components/Footer";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenisRef = useRef(null);

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

    // Run animations scan after mount rendering tick
    const animationTimeout = setTimeout(() => {
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
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(animationTimeout);
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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

  return (
    <>
      <Header 
        scrolled={scrolled} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        handleSmoothScroll={handleSmoothScroll} 
      />

      <main>
        <HeroSection />
        <FeaturesSection />
        <LeadersSection />
        <ProblemsSection />
        <SystemSection />
        <ServicesSection />
        <PlaybookSection />
        <TestimonialsSection />
        <MetricsSection />
        <AssessmentSection />
        <BioSection />
        <GallerySection />
      </main>

      <Footer handleSmoothScroll={handleSmoothScroll} />
    </>
  );
}
