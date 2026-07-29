import React, { useState } from "react";
import { SUPPORTERS, LEADERSHIP, TEAM, CALENDLY_URL } from "../data/landingData";

export default function BioSection() {
  const [activeBioTab, setActiveBioTab] = useState("founder");

  return (
    <section id="founder" className="bio-section">
      <div id="consultation" />
      
      <div className="bio-tabs-container">
        <button 
          className={`bio-tab-btn ${activeBioTab === "founder" ? "active" : ""}`}
          onClick={() => setActiveBioTab("founder")}
        >
          Founder
        </button>
        <button 
          className={`bio-tab-btn ${activeBioTab === "supporters" ? "active" : ""}`}
          onClick={() => setActiveBioTab("supporters")}
        >
          Supporters
        </button>
        <button 
          className={`bio-tab-btn ${activeBioTab === "leadership" ? "active" : ""}`}
          onClick={() => setActiveBioTab("leadership")}
        >
          Leadership
        </button>
        <button 
          className={`bio-tab-btn ${activeBioTab === "team" ? "active" : ""}`}
          onClick={() => setActiveBioTab("team")}
        >
          Team
        </button>
      </div>

      {activeBioTab === "founder" && (
        <div className="bio-card tab-content-animate">
          <div className="bio-img-container">
            <img src="/assets/founder_image.jpg" alt="Ajinkya, Founder of Communic8" className="bio-img" />
          </div>
          <div className="bio-content">
            <h3 className="bio-title">Hello connections! I'm Ajinkya (AJ)</h3>
            <div className="bio-description">
              <p>For over a decade I've lived the shop floor... running TOC, Lean and TPS on real factory floors, and learning from the best: ABB, Schneider, Forbes Marshall, Godrej and more.</p>
              <p>Accidentally, something bothered me;</p>
              <p>Manufacturers have a process for everything; except marketing.</p>
              <p>It gets handed to whoever's free, done in bursts, never treated as a real function. So real manufacturers with 20-30 years of capability stay invisible, struggle competing on price instead of value.</p>
              <p>That's why I built Communic8 - a marketing agency working exclusively for the manufacturing ecosystem. We handle Go-to Market Execution, global customer acquisition and reputation management, and we get into your shoes before we do any marketing. No templates. Just honest work in your customers' language.</p>
              <p>If marketing is your weak spot, let's connect !</p>
              <div className="founder-signature-social">
                <span className="founder-signature">- AJ</span>
                <a 
                  href="https://www.linkedin.com/in/ajinkya-modse/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="founder-social-link"
                  aria-label="Founder LinkedIn Profile"
                >
                  <svg viewBox="0 0 24 24" className="founder-social-icon">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeBioTab === "supporters" && (
        <div className="supporters-grid-container tab-content-animate">
          <h2 className="section-tab-title">Our Supporters</h2>
          <div className="supporters-grid">
            {SUPPORTERS.map((supporter, idx) => (
              <div key={idx} className="supporter-card">
                <div className="supporter-img-container">
                  <img src={supporter.img} alt={supporter.name} className="supporter-img" />
                </div>
                <div className="supporter-info">
                  <h4 className="supporter-name">{supporter.name}</h4>
                  <p className="supporter-title">{supporter.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeBioTab === "leadership" && (
        <div className="supporters-grid-container tab-content-animate">
          <h2 className="section-tab-title">Our Leadership</h2>
          <div className="supporters-grid leadership-grid">
            {LEADERSHIP.map((employee, idx) => (
              <div key={idx} className="supporter-card">
                <div className="supporter-img-container">
                  <img src={employee.img} alt={employee.name} className="supporter-img" style={employee.imgStyle} />
                </div>
                <div className="supporter-info">
                  <h4 className="supporter-name">{employee.name}</h4>
                  <p className="supporter-title">{employee.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeBioTab === "team" && (
        <div className="supporters-grid-container tab-content-animate">
          <h2 className="section-tab-title">Our Team</h2>
          <div className="supporters-grid leadership-grid">
            {TEAM.map((member, idx) => (
              <div key={idx} className="supporter-card">
                <div className="supporter-img-container">
                  {member.img ? (
                    <img src={member.img} alt={member.name} className="supporter-img" style={member.imgStyle} />
                  ) : (
                    <div className="supporter-img-placeholder">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="supporter-info">
                  <h4 className="supporter-name">{member.name}</h4>
                  <p className="supporter-title">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bio-outro tab-content-animate">
        <p className="bio-outro-sub">You have a well defined system for everything on you shop floors..</p>
        <h4 className="bio-outro-headline">Why should marketing be left out?</h4>
        <a 
          href={CALENDLY_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-consultation"
        >
          Book a GTM Readiness Conversation
        </a>
      </div>
    </section>
  );
}
