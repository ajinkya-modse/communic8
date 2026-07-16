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
              <p style={{ fontWeight: "600", marginTop: "12px" }}>- AJ</p>
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
