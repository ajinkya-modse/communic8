import React from "react";
import { INDUSTRY_LEADERS } from "../data/landingData";

export default function LeadersSection() {
  return (
    <section className="leaders-section">
      <div className="leaders-container">
        <h3 className="leaders-title">Manufacturing leaders we worked with.</h3>
        <div className="leaders-slider-container">
          <div className="leaders-slide-track">
            {[...INDUSTRY_LEADERS, ...INDUSTRY_LEADERS, ...INDUSTRY_LEADERS, ...INDUSTRY_LEADERS].map((leader, index) => (
              <div key={index} className="leader-item">
                <div className="leader-avatar-wrapper">
                  <img 
                    src={leader.img} 
                    alt={leader.name} 
                    className={`leader-avatar-img avatar-${leader.avatarClass}`} 
                  />
                </div>
                <div className="leader-name-container">
                  <span className="leader-full-name">{leader.name}</span>
                  <span className="leader-specialty">{leader.specialty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
