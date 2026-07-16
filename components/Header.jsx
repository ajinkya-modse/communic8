import React from "react";
import { CALENDLY_URL } from "../data/landingData";

export default function Header({ scrolled, mobileMenuOpen, setMobileMenuOpen, handleSmoothScroll }) {
  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <nav className={`navbar ${scrolled ? "scrolled" : ""} ${mobileMenuOpen ? "menu-open" : ""}`}>
        <div className="navbar-main">
          <div className="logo" role="button" aria-label="Home" onClick={(e) => handleSmoothScroll(e, "#hero")}>
            <img src="/assets/communic8-logo.png" alt="Communic8 Logo" className="logo-img" />
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
              Our Work
            </a>
            <a href="#founder" onClick={(e) => handleSmoothScroll(e, "#founder")} className="nav-link">
              Our Team
            </a>
          </div>
          
          <div className="nav-actions">
            <a 
              href={CALENDLY_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-cta"
            >
              Book a Call
            </a>
            
            <button 
              className={`hamburger-btn ${mobileMenuOpen ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        
        <div className="mobile-menu">
          <a href="#problems" onClick={(e) => handleSmoothScroll(e, "#problems")} className="mobile-nav-link">
            The Problems
          </a>
          <a href="#system" onClick={(e) => handleSmoothScroll(e, "#system")} className="mobile-nav-link">
            Our System
          </a>
          <a href="#services" onClick={(e) => handleSmoothScroll(e, "#services")} className="mobile-nav-link">
            Services
          </a>
          <a href="#playbook" onClick={(e) => handleSmoothScroll(e, "#playbook")} className="mobile-nav-link">
            Our Work
          </a>
          <a href="#founder" onClick={(e) => handleSmoothScroll(e, "#founder")} className="mobile-nav-link">
            Our Team
          </a>
          <a 
            href={CALENDLY_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mobile-btn-cta"
          >
            Book a Call
          </a>
        </div>
      </nav>
    </header>
  );
}
