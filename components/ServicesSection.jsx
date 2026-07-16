import React, { useState } from "react";
import { CALENDLY_URL } from "../data/landingData";

export default function ServicesSection() {
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);

  const handleServicesScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.clientWidth;
    const card = e.target.querySelector('.service-card');
    const cardWidth = card ? card.getBoundingClientRect().width : width;
    const idx = Math.round(scrollLeft / (cardWidth + 16));
    setActiveServiceIdx(idx);
  };

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <h2 className="services-title">Services & Retainers</h2>
        
        <div className="services-grid" onScroll={handleServicesScroll}>
          {/* Card 1: GTM Execution */}
          <div className="service-card recommended" style={{ transitionDelay: "0ms" }}>
            <div>
              <span className="service-badge-project">One-Time Project</span>
              <h3 className="service-title-text">Go-To-Market (GTM) Execution</h3>
              <p className="service-focus-text">End-to-end Sales Readiness in 45 Days.</p>
              <div className="service-body">
                <p className="service-desc">
                  GTM Standardization creates ready-to-use sales assets that present your capability, process, people, and proof in one complete story. Every sales meeting delivers the same impact, whether you're in the room or not.
                </p>
                <ul className="service-list">
                  <li>Buyers see your full capability, not just part of it.</li>
                  <li>De-skill your sales and follow-up process.</li>
                  <li>Prove your factory without saying a word.</li>
                  <li>Keep every meeting and follow-up consistent.</li>
                  <li>Look as good as or better than your competitors.</li>
                </ul>
              </div>
            </div>
            <div className="service-footer">
              <a 
                href={CALENDLY_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-service btn-recommended"
              >
                Book a GTM Readiness Conversation
              </a>
            </div>
          </div>

          {/* Card 2: Reputation Management */}
          <div className="service-card recommended" style={{ transitionDelay: "150ms" }}>
            <div>
              <span className="service-badge-retainer">Ongoing Retainer</span>
              <h3 className="service-title-text">Reputation Management</h3>
              <p className="service-focus-text">Stay Visible & Credible Every Month</p>
              <div className="service-body">
                <p className="service-desc">
                  The market forgets what it doesn't see. Reputation Management keeps your business consistently visible and credible, so buyers and global partners see your factory at its best, whether or not you ever make a sales call.
                </p>
                <ul className="service-list">
                  <li>Stay visible so buyers remember you.</li>
                  <li>Build trust before the first call.</li>
                  <li>Grow your reputation without taking your time.</li>
                  <li>Look world-class to global buyers.</li>
                  <li>Compound results every month.</li>
                  <li>Works even if you never chase leads.</li>
                </ul>
              </div>
            </div>
            <div className="service-footer">
              <a 
                href={CALENDLY_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-service btn-recommended"
              >
                Install the Reputation Engine
              </a>
            </div>
          </div>

          {/* Card 3: Lead Nurturing */}
          <div className="service-card screened" style={{ transitionDelay: "300ms" }}>
            <div className="screened-lock-badge">Invitation & Review Only</div>
            <div>
              <span className="service-badge-premium">Premium Retainer</span>
              <h3 className="service-title-text">Lead Nurturing (Premium - by Readiness)</h3>
              <p className="service-focus-text">Turn the Right Buyers into Business Conversations</p>
              <div className="service-body">
                <p className="service-desc">
                  Once your credibility is built, we connect and nurture the right decision-makers on LinkedIn so qualified buyers are ready to talk. Available only for businesses ready to handle the demand.
                </p>
                <ul className="service-list">
                  <li>Reach the right decision-makers.</li>
                  <li>Warm buyers instead of cold prospects.</li>
                  <li>Generate inbound-style meetings.</li>
                  <li>Fill your pipeline with qualified conversations.</li>
                  <li>Offered only when you're ready to service demand.</li>
                  <li>Performs best with strong reputation.</li>
                </ul>
              </div>
            </div>
            <div className="service-footer">
              <span className="service-lock-note">Requires Operational Readiness Review</span>
            </div>
          </div>
        </div>

        {/* Dynamic scroll indicators for mobile viewports */}
        <div className="services-dots-container">
          {[0, 1, 2].map((i) => (
            <div 
              key={i} 
              className={`services-dot ${activeServiceIdx === i ? 'active' : ''}`}
              onClick={() => {
                const grid = document.querySelector('.services-grid');
                if (grid) {
                  const card = grid.querySelector('.service-card');
                  const cardWidth = card ? card.getBoundingClientRect().width : grid.clientWidth;
                  grid.scrollTo({
                    left: i * (cardWidth + 16),
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
