import React from "react";
import { LINKEDIN_PROBLEMS, CALENDLY_URL } from "../data/landingData";

export default function ProblemsSection() {
  return (
    <section id="problems" className="problems-section">
      <div className="problems-container">
        <div className="problems-intro">
          <h2 className="problems-subtitle">
            You run a busy factory. <br className="desktop-only" />
            <span>So why is <span className="problems-highlight">growth still so hard?</span></span>
          </h2>
          <p className="problems-intro-desc">
            After working with hundreds of manufacturers (from a 500 sq. ft. tool room to plants spread across acres), we found the same key problems, again and again. If even one sounds like your company, it is worth a conversation.
          </p>
        </div>

        <div className="problems-grid">
          {LINKEDIN_PROBLEMS.map((problem) => (
            <div key={problem.number} className="problem-card">
              <div className="problem-icon-container">
                {problem.icon}
              </div>
              <div className="problem-info">
                <h3 className="problem-title">{problem.title}</h3>
                <p className="problem-desc">{problem.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="problems-outro">
          <p className="problems-outro-text">
            If even one of these sounds familiar, <br className="desktop-only" />
            you need a standard process for marketing and communication. <br className="desktop-only" />
            And this process is exactly what we build.
          </p>
          <a 
            href={CALENDLY_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-problems-cta"
          >
            Let’s Fix this! Book a Call
          </a>
        </div>
      </div>
    </section>
  );
}
