import React from "react";

export default function SystemSection() {
  return (
    <section id="system" className="system-section">
      <div className="system-bg-wrapper">
        <img src="/assets/factory_interior.jpg" alt="Factory interior background" className="system-bg-img" />
        <div className="system-bg-overlay"></div>
      </div>
      <div className="system-container">
        <div className="system-header">
          <h2 className="system-title">Meet Buyers Where they are</h2>
          <p className="system-desc-text">
            To succeed, manufacturers must tailor their <span className="system-text-highlight">communication strategies to Buyer Behaviour</span> and focus on driving <span className="system-text-highlight">Profitable and Capital Efficient Growth</span>.
          </p>
        </div>
        <div className="system-roadmap">
          {/* Step 1 */}
          <div className="roadmap-item">
            <div className="roadmap-node">01</div>
            <div className="roadmap-card" style={{ transitionDelay: "0ms" }}>
              <h3 className="roadmap-card-title">We Listen</h3>
              <p className="roadmap-card-focus">We sit with you to understand your business</p>
              <p className="roadmap-card-subtitle">What happens here</p>
              <ul className="roadmap-card-list">
                <li>Deep-dive sessions with founders, 2nd generation, leadership & shopfloor team.</li>
                <li>Understand your strongest capabilities, differentiators, and success stories.</li>
                <li>Map your ideal customers, industries, and growth opportunities.</li>
                <li>Extract years of expertise that currently live only inside your factory.</li>
              </ul>
            </div>
          </div>

          {/* Step 2 */}
          <div className="roadmap-item">
            <div className="roadmap-node">02</div>
            <div className="roadmap-card" style={{ transitionDelay: "150ms" }}>
              <h3 className="roadmap-card-title">We Plan</h3>
              <p className="roadmap-card-focus">Finally, we build a custom marketing process made only for you</p>
              <p className="roadmap-card-subtitle">What happens here</p>
              <ul className="roadmap-card-list">
                <li>Define positioning in your niche target market.</li>
                <li>Find your core capabilities, Uniqueness , engineering-technology edge</li>
                <li>Align content with business goals and sales objectives.</li>
                <li>Find the real reason a customer should choose you over anyone else.</li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="roadmap-item">
            <div className="roadmap-node">03</div>
            <div className="roadmap-card" style={{ transitionDelay: "300ms" }}>
              <h3 className="roadmap-card-title">We Execute</h3>
              <p className="roadmap-card-focus">Finally, we effectively implement the process for you.</p>
              <p className="roadmap-card-subtitle">What happens here</p>
              <ul className="roadmap-card-list">
                <li>Create industry-focused content that showcases your capabilities.</li>
                <li>Build authority with buyers, partners, and decision-makers.</li>
                <li>Maintain consistent market presence throughout the year.</li>
                <li>Generate meaningful conversations that support business growth.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
