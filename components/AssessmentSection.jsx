import React, { useState, useEffect } from "react";
import { ASSESSMENT_QUESTIONS, CALENDLY_URL } from "../data/landingData";

export default function AssessmentSection() {
  const [assessmentStep, setAssessmentStep] = useState(0); // 0: Sliders, 1: Lead capture, 2: Results
  const [activeWizardStep, setActiveWizardStep] = useState(0); // 0: Clarity, 1: Execution, 2: Results
  const [assessmentAnswers, setAssessmentAnswers] = useState([5, 5, 5, 5, 5, 5, 5, 5, 5, 5]);
  const [leadData, setLeadData] = useState({ name: "", company: "", phone: "" });
  
  // States for Calendly redirection thank you and report download
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookedReportData, setBookedReportData] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState("");

  const loadHtml2Pdf = async () => {
    if (typeof window === "undefined") return null;
    if (window.html2pdf) return window.html2pdf;
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      script.onload = () => resolve(window.html2pdf);
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const generatePDF = async (scoreData) => {
    setDownloadProgress("Generating Report...");
    try {
      const html2pdf = await loadHtml2Pdf();
      if (!html2pdf) {
        setDownloadProgress("PDF engine failed to load");
        return;
      }
      const element = document.getElementById("gtm-pdf-template");
      if (!element) {
        setDownloadProgress("Report layout missing");
        return;
      }
      
      const opt = {
        margin:       0.3,
        filename:     `GTM-Readiness-Audit-Report.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#0c0c0e' },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      
      element.style.display = "block";
      await html2pdf().set(opt).from(element).save();
      element.style.display = "none";
      setDownloadProgress("Report downloaded!");
    } catch (err) {
      console.error("PDF generation error:", err);
      setDownloadProgress("Download failed, click to retry");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const isBooked = params.get("booked") === "true";
      
      if (isBooked) {
        const utmMedium = params.get("utm_medium") || "";
        const utmCampaign = params.get("utm_campaign") || "";
        const utmContent = params.get("utm_content") || "";
        const inviteeEmail = params.get("invitee_email") || "";
        const firstName = params.get("invitee_first_name") || "";
        const lastName = params.get("invitee_last_name") || "";
        const fullName = firstName ? `${firstName} ${lastName || ""}`.trim() : "Manufacturing Leader";

        // Parse total score
        const scoreMatch = utmMedium.match(/total_score_(\d+)/);
        const totalScoreVal = scoreMatch ? parseInt(scoreMatch[1], 10) : 70;

        // Parse category weights
        const clarityMatch = utmCampaign.match(/clarity_(\d+)/);
        const executionMatch = utmCampaign.match(/execution_(\d+)/);
        const resultsMatch = utmCampaign.match(/results_(\d+)/);

        const clarityVal = clarityMatch ? parseInt(clarityMatch[1], 10) : 25;
        const execVal = executionMatch ? parseInt(executionMatch[1], 10) : 20;
        const resVal = resultsMatch ? parseInt(resultsMatch[1], 10) : 25;

        // Parse standing archetype
        const archMatch = utmContent.match(/archetype_(.+)/);
        const archTitleVal = archMatch ? decodeURIComponent(archMatch[1]).replace(/_/g, " ") : "Structured Grower";

        let archDescVal = "";
        let archClassVal = "";

        if (totalScoreVal <= 40) {
          archDescVal = "A genuinely good factory the market cannot see. Right now, growth depends on old references and luck. The gap is real, but it is also the fastest one to fix, because you are starting with a clean slate and a strong product.";
          archClassVal = "verdict-risk";
        } else if (totalScoreVal <= 70) {
          archDescVal = "You have started. There is some clarity or some activity. But it is not consistent, and it is not compounding, so results stay unpredictable. You are leaving your best growth on the table not from lack of trying, but from lack of structure.";
          archClassVal = "verdict-bottleneck";
        } else {
          archDescVal = "You are ahead of most manufacturers, with real clarity, real consistency, and real results. Honestly, you may not need us yet. But even strong operators usually have one weak link (often credibility before the meeting, or linking spend to growth).";
          archClassVal = "verdict-ready";
        }

        const cPct = clarityVal / 40;
        const ePct = execVal / 30;
        const rPct = resVal / 30;
        let diagnosisVal = "Your growth process shows potential; let's dial in the missing components.";
        if (cPct >= 0.7 && ePct < 0.5) {
          diagnosisVal = "You know what to do, but you're just not doing it consistently. Your gap is an execution engine, not more thinking.";
        } else if (ePct >= 0.7 && rPct < 0.5) {
          diagnosisVal = "You're working hard on marketing but it's not paying back, which is a classic sign of effort pointed at the wrong strategy.";
        } else if (cPct < 0.5 && rPct >= 0.6) {
          diagnosisVal = "Your results are coming from luck or old relationships, not a system. That is fragile: the day references slow down, so does growth.";
        }

        const reportData = {
          fullName,
          email: inviteeEmail,
          score: totalScoreVal,
          clarity: clarityVal,
          execution: execVal,
          results: resVal,
          archetype: archTitleVal,
          description: archDescVal,
          class: archClassVal,
          diagnosis: diagnosisVal
        };

        setBookedReportData(reportData);
        setBookingConfirmed(true);
        
        // Auto trigger download
        setTimeout(() => {
          generatePDF(reportData);
        }, 1500);
      }
    }
  }, []);

  const handleSliderChange = (index, value) => {
    const updated = [...assessmentAnswers];
    updated[index] = parseInt(value, 10);
    setAssessmentAnswers(updated);
  };

  const resetAssessment = () => {
    setAssessmentAnswers([5, 5, 5, 5, 5, 5, 5, 5, 5, 5]);
    setLeadData({ name: "", company: "", phone: "" });
    setAssessmentStep(0);
    setActiveWizardStep(0);
  };

  const handleSlidersSubmit = () => {
    setAssessmentStep(2);
  };

  const totalScore = assessmentAnswers.reduce((sum, current) => sum + current, 0);
  const clarityScore = assessmentAnswers.slice(0, 4).reduce((sum, val) => sum + val, 0);
  const executionScore = assessmentAnswers.slice(4, 7).reduce((sum, val) => sum + val, 0);
  const resultsScore = assessmentAnswers.slice(7, 10).reduce((sum, val) => sum + val, 0);

  let archetypeTitle = "";
  let archetypeDesc = "";
  let archetypeNext = "";
  let archetypeClass = "";

  if (totalScore <= 40) {
    archetypeTitle = "The Invisible Factory";
    archetypeDesc = "A genuinely good factory the market cannot see. Right now, growth depends on old references and luck. The gap is real, but it is also the fastest one to fix, because you are starting with a clean slate and a strong product. This is exactly the stage where structure changes everything.";
    archetypeNext = "this is worth a serious conversation. Book a Call.";
    archetypeClass = "verdict-risk";
  } else if (totalScore <= 70) {
    archetypeTitle = "The Inconsistent Effort";
    archetypeDesc = "You have started. There is some clarity or some activity. But it is not consistent, and it is not compounding, so results stay unpredictable. You are leaving your best growth on the table not from lack of trying, but from lack of structure. Small fixes here often unlock large jumps.";
    archetypeNext = "Let's find where the leak is. Book a Call.";
    archetypeClass = "verdict-bottleneck";
  } else {
    archetypeTitle = "The Structured Grower";
    archetypeDesc = "You are ahead of most manufacturers, with real clarity, real consistency, and real results. Honestly, you may not need us yet. But even strong operators usually have one weak link (often credibility before the meeting, or linking spend to growth). If you want a sharp outside eye on that one gap, we're happy to talk. If not, take this result as a well-earned green flag.";
    archetypeClass = "verdict-ready";
  }

  const getSmartDiagnosis = () => {
    const cPct = clarityScore / 40;
    const ePct = executionScore / 30;
    const rPct = resultsScore / 30;

    if (cPct >= 0.7 && ePct < 0.5) {
      return "You know what to do, but you're just not doing it consistently. Your gap is an execution engine, not more thinking.";
    }
    if (ePct >= 0.7 && rPct < 0.5) {
      return "You're working hard on marketing but it's not paying back, which is a classic sign of effort pointed at the wrong strategy.";
    }
    if (cPct < 0.5 && rPct >= 0.6) {
      return "Your results are coming from luck or old relationships, not a system. That is fragile: the day references slow down, so does growth.";
    }
    if (cPct < 0.5 && ePct < 0.5 && rPct < 0.5) {
      return "You're starting near-zero, which is actually good news. With a clean slate and a strong factory, structured marketing can move you fast.";
    }
    if (cPct >= 0.7 && ePct >= 0.7 && rPct >= 0.7) {
      return "You're a rare, well-run growth operation. Protect the consistency, and watch the one category that scored lowest.";
    }

    const minPct = Math.min(cPct, ePct, rPct);
    if (minPct === cPct) {
      return "Your foundation needs work. Focus on GTM strategy, target definition, and clarifying your market-facing value proposition first.";
    } else if (minPct === ePct) {
      return "Your roadblock is consistency. Set up a regular weekly marketing cadence and assign clear ownership to maintain traction.";
    } else {
      return "Your efforts aren't converting into predictable pipeline. Review your positioning and B2B sales tools to build pre-trust credibility.";
    }
  };

  return (
    <>
      <section id="assessment" className="assessment-section">
        <div className="assessment-bg-wrapper">
          <img src="/assets/testimonials_bg_factory.jpg" alt="Assessment background" className="assessment-bg-img" loading="lazy" decoding="async" />
          <div className="assessment-bg-overlay"></div>
        </div>
        <div className="assessment-container">
          <h2 className="assessment-title">Map your current state in 2 minutes</h2>
          <p className="assessment-subtitle">
            Score your marketing. Be brutally honest; this is for you.
          </p>
          
          <div className="assessment-card-wrapper">
            {assessmentStep === 0 && (
              <div className="assessment-sliders-card">
                {/* Modern Apple Segmented Progress Bar */}
                <div className="apple-progress-tracker">
                  {[0, 1, 2].map((idx) => (
                    <div 
                      key={idx} 
                      className={`apple-progress-bar ${idx === activeWizardStep ? "active" : ""} ${idx < activeWizardStep ? "completed" : ""}`}
                    />
                  ))}
                </div>
                <div className="apple-progress-header">
                  <span className="apple-step-tag">Step {activeWizardStep + 1} of 3</span>
                  <h3 className="apple-step-title">
                    {activeWizardStep === 0 && "Strategic Clarity"}
                    {activeWizardStep === 1 && "Execution"}
                    {activeWizardStep === 2 && "Results"}
                  </h3>
                </div>

                {/* Block Content */}
                {["Strategic Clarity", "Execution", "Results"].map((blockName, blockIdx) => {
                  if (blockIdx !== activeWizardStep) return null;
                  const blockQuestions = ASSESSMENT_QUESTIONS.filter(q => q.block === blockName);
                  const blockDesc = blockQuestions[0]?.blockDesc || "";
                  
                  return (
                    <div key={blockName} className="assessment-block">
                      <p className="apple-step-desc">{blockDesc}</p>
                      
                      <div className="block-questions-list">
                        {blockQuestions.map((q) => {
                          const index = q.id - 1;
                          const score = assessmentAnswers[index];
                          
                          return (
                            <div key={q.id} className="assessment-question-item">
                              <div className="question-text-row">
                                <div className="question-left-side">
                                  <span className="question-index">0{q.id}</span>
                                  <p className="question-statement">{q.statement}</p>
                                </div>
                                <div className="slider-score-display">
                                  <span key={score} className="slider-score-val score-pulse-animate">{score}</span>
                                  <span className="slider-score-max">/10</span>
                                </div>
                              </div>
                              
                              <div className="slider-tactile-control">
                                <input 
                                  type="range" 
                                  min="0" 
                                  max="10" 
                                  step="1"
                                  value={score}
                                  onChange={(e) => handleSliderChange(index, e.target.value)}
                                  className="slider-range-input"
                                  style={{ '--value': `${score * 10}%` }}
                                />
                                
                                <div className="slider-ticks-row-apple">
                                  <span>0</span>
                                  <span>5</span>
                                  <span>10</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                
                {/* Wizard Step Navigation buttons */}
                <div className="wizard-navigation-actions">
                  {activeWizardStep > 0 && (
                    <button className="btn-wizard-prev" onClick={() => setActiveWizardStep(prev => prev - 1)}>
                      ← Back
                    </button>
                  )}
                  
                  {activeWizardStep < 2 ? (
                    <button className="btn-wizard-next" onClick={() => setActiveWizardStep(prev => prev + 1)}>
                      Continue to {activeWizardStep === 0 ? "Execution" : "Results"} →
                    </button>
                  ) : (
                    <button className="btn-wizard-submit" onClick={handleSlidersSubmit}>
                      Get My Growth Diagnosis →
                    </button>
                  )}
                </div>
              </div>
            )}

            {assessmentStep === 2 && (
              <div className="assessment-results-card">
                <div className="results-badge-bar">
                  <span className="results-badge-meta">GTM Audit Report</span>
                  <span className="results-badge-company">{leadData.company || "Your Company"}</span>
                </div>
                
                <div className="results-analytics-grid">
                  <div className="results-left-gauge-card">
                    <div className="radial-score-gauge">
                      <svg className="gauge-svg" viewBox="0 0 130 130">
                        <circle className="gauge-bg-ring" cx="65" cy="65" r="58"></circle>
                        <circle 
                          className="gauge-active-ring" 
                          cx="65" 
                          cy="65" 
                          r="58" 
                          strokeDasharray="364.4"
                          strokeDashoffset={364.4 - (364.4 * totalScore) / 100}
                        ></circle>
                      </svg>
                      <div className="gauge-numeric-overlay">
                        <span className="gauge-score-digits">{totalScore}</span>
                        <span className="gauge-score-out-of">/ 100</span>
                      </div>
                    </div>
                    
                    <div className={`archetype-standing-card ${archetypeClass}`}>
                      <span className="standing-small-title">Strategic Standing</span>
                      <h4 className="standing-badge-title">{archetypeTitle}</h4>
                    </div>
                  </div>
                  
                  <div className="results-right-kpis-card">
                    <h4 className="kpis-card-header">GTM Capability Weights</h4>
                    
                    <div className="kpi-metric-list">
                      <div className="kpi-metric-item">
                        <div className="kpi-metric-meta">
                          <span className="kpi-name">Strategic Clarity</span>
                          <span className="kpi-ratio"><strong>{clarityScore}</strong> / 40</span>
                        </div>
                        <div className="kpi-meter-track">
                          <div className="kpi-meter-fill fill-clarity" style={{ width: `${(clarityScore / 40) * 100}%` }}></div>
                        </div>
                      </div>
                      
                      <div className="kpi-metric-item">
                        <div className="kpi-metric-meta">
                          <span className="kpi-name">Execution Speed</span>
                          <span className="kpi-ratio"><strong>{executionScore}</strong> / 30</span>
                        </div>
                        <div className="kpi-meter-track">
                          <div className="kpi-meter-fill fill-execution" style={{ width: `${(executionScore / 30) * 100}%` }}></div>
                        </div>
                      </div>
                      
                      <div className="kpi-metric-item">
                        <div className="kpi-metric-meta">
                          <span className="kpi-name">Compounding Results</span>
                          <span className="kpi-ratio"><strong>{resultsScore}</strong> / 30</span>
                        </div>
                        <div className="kpi-meter-track">
                          <div className="kpi-meter-fill fill-results" style={{ width: `${(resultsScore / 30) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="results-expert-diagnosis-box">
                      <span className="expert-panel-tag">Consultant Diagnosis</span>
                      <p className="expert-panel-text">{getSmartDiagnosis()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="results-verdict-summary-card">
                  <h5 className="verdict-card-heading">Diagnostic Verdict</h5>
                  <p className="verdict-card-text">{archetypeDesc}</p>
                  
                  <div className="verdict-next-step-drawer">
                    <div className="next-step-badge-row">
                      <span className="next-step-circle-dot"></span>
                      <span className="next-step-badge-label">Recommended Path</span>
                    </div>
                    <p className="next-step-badge-instruction">{archetypeNext}</p>
                  </div>
                </div>
                
                <div className="results-dashboard-actions">
                  <button className="btn-dashboard-reset" onClick={resetAssessment}>
                    Retake Audit
                  </button>
                  <a 
                    href={`${CALENDLY_URL}?utm_source=gtm_audit&utm_medium=total_score_${totalScore}&utm_campaign=clarity_${clarityScore}_execution_${executionScore}_results_${resultsScore}&utm_content=archetype_${encodeURIComponent(archetypeTitle).replace(/%20/g, "_")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-dashboard-cta-call"
                  >
                    Book a Call
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Booking Confirmation modal */}
      {bookingConfirmed && bookedReportData && (
        <div className="booking-modal-overlay" data-lenis-prevent>
          <div className="booking-modal-content">
            <div className="modal-header">
              <span className="success-badge">✓ Booking Confirmed</span>
              <h3 className="modal-title">Your GTM Consultation is Booked!</h3>
              <p className="modal-desc">
                Thank you, <strong>{bookedReportData.fullName}</strong>. We look forward to meeting you.
              </p>
            </div>
            
            <div className="modal-report-box">
              <span className="report-box-title">Audit Report Summary</span>
              <div className="report-summary-flex">
                <div className="summary-circle">
                  <span className="circle-score">{bookedReportData.score}</span>
                  <span className="circle-lbl">GTM Score</span>
                </div>
                <div className="summary-details">
                  <h4 className="details-arch">{bookedReportData.archetype}</h4>
                  <p className="details-diag">{bookedReportData.diagnosis}</p>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn-modal-download" onClick={() => generatePDF(bookedReportData)}>
                {downloadProgress || "Download PDF Report ⭳"}
              </button>
              <button className="btn-modal-close" onClick={() => setBookingConfirmed(false)}>
                Go to Website
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden PDF template container */}
      {bookedReportData && (
        <div id="gtm-pdf-template" style={{
          display: "none",
          width: "700px",
          padding: "50px",
          background: "#0c0c0e",
          color: "#ffffff",
          fontFamily: "'Inter', sans-serif",
          boxSizing: "border-box"
        }}>
          <div style={{ borderBottom: "2px solid #c72a54", paddingBottom: "20px", marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1 style={{ fontSize: "24px", margin: "0", color: "#ffffff", fontWeight: "800", letterSpacing: "-0.5px" }}>COMMUNIC8</h1>
              <p style={{ fontSize: "12px", margin: "4px 0 0 0", color: "#c72a54", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>B2B GTM Readiness Diagnostic Report</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "11px", margin: "0", color: "#55555c" }}>Client: {bookedReportData.fullName}</p>
              <p style={{ fontSize: "11px", margin: "2px 0 0 0", color: "#55555c" }}>Email: {bookedReportData.email || "N/A"}</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "30px", marginBottom: "30px" }}>
            <div style={{ background: "#121215", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", padding: "30px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "100px", height: "100px", borderRadius: "50%", border: "6px solid #c72a54", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px" }}>
                <span style={{ fontSize: "36px", fontWeight: "800", color: "#ffffff" }}>{bookedReportData.score}</span>
              </div>
              <span style={{ fontSize: "10px", color: "#c72a54", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>GTM Score</span>
              <span style={{ fontSize: "13px", color: "#84cc16", fontWeight: "700", textAlign: "center" }}>{bookedReportData.archetype}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <h3 style={{ fontSize: "14px", margin: "0", fontWeight: "800", color: "#ffffff" }}>Capability Weights</h3>
              
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                  <span style={{ color: "#a0a0a5" }}>Strategic Clarity</span>
                  <span style={{ color: "#ffffff", fontWeight: "700" }}>{bookedReportData.clarity} / 40</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "#18181c", borderRadius: "3px" }}>
                  <div style={{ height: "100%", background: "#c72a54", borderRadius: "3px", width: `${(bookedReportData.clarity / 40) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                  <span style={{ color: "#a0a0a5" }}>Execution Speed</span>
                  <span style={{ color: "#ffffff", fontWeight: "700" }}>{bookedReportData.execution} / 30</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "#18181c", borderRadius: "3px" }}>
                  <div style={{ height: "100%", background: "#f59e0b", borderRadius: "3px", width: `${(bookedReportData.execution / 30) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                  <span style={{ color: "#a0a0a5" }}>Compounding Results</span>
                  <span style={{ color: "#ffffff", fontWeight: "700" }}>{bookedReportData.results} / 30</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "#18181c", borderRadius: "3px" }}>
                  <div style={{ height: "100%", background: "#10b981", borderRadius: "3px", width: `${(bookedReportData.results / 30) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: "#121215", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", padding: "20px", marginBottom: "25px" }}>
            <span style={{ fontSize: "10px", color: "#c72a54", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "6px" }}>Expert Diagnosis</span>
            <p style={{ fontSize: "12px", color: "#d1d1d6", margin: "0", lineHeight: "1.6" }}>{bookedReportData.diagnosis}</p>
          </div>

          <div style={{ background: "#121215", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", padding: "20px", marginBottom: "30px" }}>
            <span style={{ fontSize: "10px", color: "#c72a54", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "6px" }}>Diagnostic Verdict</span>
            <p style={{ fontSize: "12px", color: "#d1d1d6", margin: "0", lineHeight: "1.6" }}>{bookedReportData.description}</p>
          </div>

          <div style={{ borderTop: "1px solid #1c1c22", paddingTop: "15px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", color: "#c72a54", fontWeight: "700", margin: "0" }}>Your GTM Consultation is scheduled.</p>
            <p style={{ fontSize: "9px", color: "#55555c", margin: "4px 0 0 0" }}>© {new Date().getFullYear()} Communic8. All rights reserved.</p>
          </div>
        </div>
      )}
    </>
  );
}
