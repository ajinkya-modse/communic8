import React from "react";

export default function MetricsSection() {
  return (
    <section id="metrics" className="metrics-section">
      <h3 className="metrics-heading">Numbers that make sense</h3>
      <p className="metrics-subheading">On an average, our clients grow qualified pipeline of 150-200 potential buyers in under 9 months.</p>
      <div className="metrics-grid">
        <div className="metric-item">
          <span className="metric-number">74%</span>
          <span className="metric-label">opportunity to deal conversion</span>
        </div>
        <div className="metric-item">
          <span className="metric-number">69%</span>
          <span className="metric-label">cheaper to create qualified pipeline</span>
        </div>
        <div className="metric-item">
          <span className="metric-number">79%</span>
          <span className="metric-label">increased business recall value</span>
        </div>
      </div>
    </section>
  );
}
