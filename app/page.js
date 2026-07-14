"use client";

import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";

const INDUSTRY_LEADERS = [
  { name: "Mrs. Ruchita T", specialty: "Specialty Engineering Tools", img: "/assets/customers/ruchita_tanpure.jpg", avatarClass: "ruchita" },
  { name: "Mr. Alok K", specialty: "Powder Metallurgy", img: "/assets/customers/alok_kanani.jpg", avatarClass: "alok" },
  { name: "Amruta K.", specialty: "Test Equipment Manufacturing", img: "/assets/customers/amruta_kelkar.jpg", avatarClass: "amruta" },
  { name: "Dadasaheb U.", specialty: "Heavy Engineering", img: "/assets/customers/dadasaheb_urhe.jpg", avatarClass: "dadasaheb" },
  { name: "Jaidev A.", specialty: "Sheet Metal Fabrication", img: "/assets/customers/jaidev_akkalkote.jpg", avatarClass: "jaidev" },
  { name: "Kasiraj G.", specialty: "Pressure Vessels Manufacturing", img: "/assets/customers/kasiraj_ganapathy.png", avatarClass: "kasiraj" },
  { name: "Mayur M.", specialty: "Green Channel Supplier", img: "/assets/customers/mayur_mundra.jpg", avatarClass: "mayur" }
];

const SUPPORTERS = [
  { name: "Shantanu Deshpande", title: "Founder, Bombay Shaving Co.", img: "/assets/founder_1.jpg" },
  { name: "Nikhil Kamath", title: "Co-founder, Zerodha", img: "/assets/founder_2.jpg" },
  { name: "Abhi & Niyu", title: "Content Creators & Educators", img: "/assets/founder_3.jpg" },
  { name: "Sakshi Malik", title: "Olympic Medalist & Entrepreneur", img: "/assets/founder_4.jpg" },
  { name: "Ayesha Khan", title: "B2B Tech Investor", img: "/assets/founder_5.jpg" },
  { name: "Kunal Shah", title: "Founder, CRED", img: "/assets/supporter_6.jpg" },
  { name: "Nandan Nilekani", title: "Co-founder, Infosys", img: "/assets/supporter_7.jpg" },
  { name: "Kiran Mazumdar-Shaw", title: "Executive Chairperson, Biocon", img: "/assets/supporter_8.jpg" },
  { name: "Ritesh Agarwal", title: "Founder, OYO Rooms", img: "/assets/supporter_9.jpg" }
];

const LEADERSHIP = [
  { name: "Rajesh Kumar", title: "Operations Director", img: "/assets/employee_1.jpg" },
  { name: "Sneha Sharma", title: "Head of Marketing", img: "/assets/employee_2.jpg" },
  { name: "Amit Patel", title: "Lead Copywriter", img: "/assets/employee_3.jpg" }
];

const COMPANIES_LIST = [
  { name: "Technoshell", logo: "/assets/logos/technoshell.png" },
  { name: "Kinetic", logo: "/assets/logos/kinetic.png" },
  { name: "Normex", logo: "/assets/logos/normex.png" },
  { name: "AROM", logo: "/assets/logos/arom.png" },
  { name: "Sahhyadri", logo: "/assets/logos/sahhyadri.png" },
  { name: "R&D", logo: "/assets/logos/rd.png" },
  { name: "Ferrites India", logo: "/assets/logos/ferrites-india.png" },
  { name: "Deadalus", logo: "/assets/logos/deadalus.png" },
  { name: "Naicon", logo: "/assets/logos/naicon.png" },
  { name: "NMD", logo: "/assets/logos/nmd.png" }
];

const COMPANIES_LIST_2 = [
  { name: "Sonalika", logo: "/assets/logos/sonalika.png" },
  { name: "Airseal", logo: "/assets/logos/airseal.png" },
  { name: "SPAN", logo: "/assets/logos/span.png" },
  { name: "Kalpajit", logo: "/assets/logos/kalpajit.png" },
  { name: "Abhijeet", logo: "/assets/logos/abhijeet.png" },
  { name: "Parth Valves", logo: "/assets/logos/parth-valves.png" },
  { name: "Dehu", logo: "/assets/logos/dehu.png" },
  { name: "Icon", logo: "/assets/logos/icon.png" },
  { name: "SPRUCE", logo: "/assets/logos/spruce.png" }
];

const HERO_WORDS = ["Narratives", "Content", "Business"];

const HERO_COMPANIES = [
  { name: "Sonalika", logo: "/assets/logos/sonalika.png" },
  { name: "Technoshell", logo: "/assets/logos/technoshell.png" },
  { name: "NMD", logo: "/assets/logos/nmd.png" },
  { name: "Abhijeet", logo: "/assets/logos/abhijeet.png" },
  { name: "Dehu", logo: "/assets/logos/dehu.png" },
  { name: "Kinetic", logo: "/assets/logos/kinetic.png" },
  { name: "Kalpajit", logo: "/assets/logos/kalpajit.png" },
  { name: "Aeropower", logo: "/assets/logos/aeropower.svg" },
  { name: "AROM", logo: "/assets/logos/arom.png" },
  { name: "Peritus", logo: "/assets/logos/peritus.svg" }
];


const LINKEDIN_PROBLEMS = [
  {
    number: 1,
    title: "Perception Gap",
    desc: "When you stay silent, the market assumes you've stopped growing. The competitor who stays visible wins the order before you even get a chance.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="problem-icon-svg">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
        <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
        <line x1="2" y1="2" x2="22" y2="22"></line>
      </svg>
    )
  },
  {
    number: 2,
    title: "Lost Credibility",
    desc: "Decision-makers check you online before they call. If they find no visibility or proof, they doubt your capability before the first meeting.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="problem-icon-svg">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="M12 9a1.5 1.5 0 1 1 1.5 1.5c-.75 0-1.5.5-1.5 1.5"></path>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    )
  },
  {
    number: 3,
    title: "Missed Enquiries",
    desc: "Buyers shortlist the vendors they remember. If you're not visible, you're not remembered, and you never receive the RFQ.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="problem-icon-svg">
        <polyline points="3 6 4.5 7.5 7 5"></polyline>
        <line x1="11" y1="6" x2="21" y2="6"></line>
        <polyline points="3 12 4.5 13.5 7 11"></polyline>
        <line x1="11" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="17" x2="6" y2="20"></line>
        <line x1="6" y1="17" x2="3" y2="20"></line>
        <line x1="11" y1="18.5" x2="21" y2="18.5" strokeDasharray="3 3"></line>
      </svg>
    )
  },
  {
    number: 4,
    title: "Unseen Capability",
    desc: "If you don't show your strengths, buyers assume you're outdated. In a value-driven market, they choose the company that looks progressive, even when yours is actually better.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="problem-icon-svg">
        <polygon points="12 3 3 20 21 20" strokeWidth="1.5"></polygon>
        <line x1="1" y1="12" x2="23" y2="12" strokeWidth="2" strokeDasharray="1 2"></line>
      </svg>
    )
  }
];

const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    block: "Strategic Clarity",
    blockDesc: "How clear is your growth thinking?",
    category: "Strategic Clarity",
    statement: "Marketing runs as a defined function with clear ownership.",
    brutalFact: "No owner → no growth. A function nobody owns is a function that never improves."
  },
  {
    id: 2,
    block: "Strategic Clarity",
    blockDesc: "How clear is your growth thinking?",
    category: "Strategic Clarity",
    statement: "I have a written, deliberate go-to-market strategy.",
    brutalFact: "No GTM → you talk to everyone and reach no one. Effort scatters without a strategy."
  },
  {
    id: 3,
    block: "Strategic Clarity",
    blockDesc: "How clear is your growth thinking?",
    category: "Strategic Clarity",
    statement: "I know precisely which customers I want to win.",
    brutalFact: "Unclear target → wasted effort on wrong buyers, while the right ones go to competitors."
  },
  {
    id: 4,
    block: "Strategic Clarity",
    blockDesc: "How clear is your growth thinking?",
    category: "Strategic Clarity",
    statement: "My full factory capability is visible to the market.",
    brutalFact: "Hidden capability → you compete on price, not on the 20–30 years of skill you built."
  },
  {
    id: 5,
    block: "Execution",
    blockDesc: "How consistently do you act on it?",
    category: "Execution",
    statement: "We market consistently every week, without long silences.",
    brutalFact: "Stop-start effort resets every time, like heating metal and never forging it."
  },
  {
    id: 6,
    block: "Execution",
    blockDesc: "How consistently do you act on it?",
    category: "Execution",
    statement: "A skilled, dedicated person owns our marketing execution.",
    brutalFact: "Untrained part-time hand → your market face looks unserious to serious buyers."
  },
  {
    id: 7,
    block: "Execution",
    blockDesc: "How consistently do you act on it?",
    category: "Execution",
    statement: "Our sales team enters meetings with capability-proving tools.",
    brutalFact: "No sales tools → your team can't prove capability in the first 5 minutes that decide the deal."
  },
  {
    id: 8,
    block: "Results",
    blockDesc: "What is it actually producing?",
    category: "Results",
    statement: "New enquiries arrive predictably, month after month.",
    brutalFact: "No predictable enquiries → growth is luck, and one slow customer becomes a crisis."
  },
  {
    id: 9,
    block: "Results",
    blockDesc: "What is it actually producing?",
    category: "Results",
    statement: "Buyers trust our credibility before the first call.",
    brutalFact: "No pre-trust → every meeting starts from zero, and buyers pick whoever looks credible."
  },
  {
    id: 10,
    block: "Results",
    blockDesc: "What is it actually producing?",
    category: "Results",
    statement: "Our marketing spend clearly drives measurable growth.",
    brutalFact: "Spend not linked to growth → marketing stays an 'expense', never an investment."
  }
];

const CALENDLY_URL = "https://calendly.com/ajinkya-communic8/gtm-readiness";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenisRef = useRef(null);
  const playbookSliderRef = useRef(null);
  const [assessmentStep, setAssessmentStep] = useState(0); // 0: Sliders, 1: Lead capture (skipped), 2: Results
  const [activeWizardStep, setActiveWizardStep] = useState(0); // 0: Clarity, 1: Execution, 2: Results
  const [assessmentAnswers, setAssessmentAnswers] = useState([5, 5, 5, 5, 5, 5, 5, 5, 5, 5]);
  const [leadData, setLeadData] = useState({ name: "", company: "", phone: "" });
  
  // States for Calendly redirection thank you and report download
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookedReportData, setBookedReportData] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState("");
  const [activeBioTab, setActiveBioTab] = useState("founder");

  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const [heroWordFading, setHeroWordFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroWordFading(true);
      setTimeout(() => {
        setHeroWordIndex((prev) => (prev + 1) % HERO_WORDS.length);
        setHeroWordFading(false);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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

    // Playbook/Case Studies slider drag-to-scroll & auto-scroll
    const slider = playbookSliderRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;
    let marqueeFrameId;
    let speed = 0.8; // scroll speed (pixels per frame)

    const handleMouseDown = (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const handleMouseUp = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5; // Drag sensitivity multiplier
      slider.scrollLeft = scrollLeft - walk;
    };

    if (slider) {
      slider.addEventListener("mousedown", handleMouseDown);
      slider.addEventListener("mouseleave", handleMouseLeave);
      slider.addEventListener("mouseup", handleMouseUp);
      slider.addEventListener("mousemove", handleMouseMove);

      // Auto scroll animation frame loop
      const updateMarquee = () => {
        if (slider) {
          if (!isDown) {
            slider.scrollLeft += speed;
          }

          const halfWidth = slider.scrollWidth / 2;
          if (slider.scrollLeft >= halfWidth) {
            slider.scrollLeft -= halfWidth;
          } else if (slider.scrollLeft <= 0) {
            slider.scrollLeft += halfWidth;
          }
        }
        marqueeFrameId = requestAnimationFrame(updateMarquee);
      };

      marqueeFrameId = requestAnimationFrame(updateMarquee);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      lenis.destroy();
      if (slider) {
        slider.removeEventListener("mousedown", handleMouseDown);
        slider.removeEventListener("mouseleave", handleMouseLeave);
        slider.removeEventListener("mouseup", handleMouseUp);
        slider.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(marqueeFrameId);
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

  const getSliderRatingLabel = (score) => {
    if (score <= 2) return { text: "Critical Gap", class: "rating-critical" };
    if (score <= 4) return { text: "Weakness", class: "rating-weakness" };
    if (score <= 6) return { text: "Average", class: "rating-average" };
    if (score <= 8) return { text: "Healthy", class: "rating-healthy" };
    return { text: "Industry Leader", class: "rating-leader" };
  };

  const handleSlidersSubmit = () => {
    setAssessmentStep(2);
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (leadData.name && leadData.company && leadData.phone) {
      setAssessmentStep(2);
    }
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
    archetypeNext = "let's find where the leak is. Book a Call.";
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
      {/* Navigation */}
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
                Case Studies
              </a>
              <a href="#founder" onClick={(e) => handleSmoothScroll(e, "#founder")} className="nav-link">
                Our Team
              </a>
            </div>
            
            <div className="nav-actions">
              <a href="#consultation" onClick={(e) => handleSmoothScroll(e, "#consultation")} className="btn-cta">
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
              Case Studies
            </a>
            <a href="#founder" onClick={(e) => handleSmoothScroll(e, "#founder")} className="mobile-nav-link">
              Our Team
            </a>
            <a href="#consultation" onClick={(e) => handleSmoothScroll(e, "#consultation")} className="mobile-btn-cta">
              Book a Call
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero" className="hero-section">
          <div className="hero-card">
            <div className="hero-bg-overlay"></div>
            <video 
              src="/assets/hero_video.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="hero-bg-video" 
            />
            <div className="hero-content">
              <h1 className="hero-title">
                <span className={`dynamic-word ${heroWordFading ? "fade-out" : "fade-in"}`}>
                  {HERO_WORDS[heroWordIndex]}
                </span> for manufacturers.
              </h1>
              <p className="hero-subtitle">We generate demand. You sign contracts.</p>
              
              <div className="hero-credibility">
                <span>135+ Clients</span>
                <span className="divider">|</span>
                <span>819+ Projects</span>
                <span className="divider">|</span>
                <span>16+ years expertise</span>
              </div>
            </div>

            {/* Customer Logo Slider (Dench style) */}
            <div className="hero-logos-slider">
              <p className="hero-logos-title">Trusted by some of the reputed companies..</p>
              <div className="hero-logos-track-container">
                <div className="hero-logos-track">
                  {[...HERO_COMPANIES, ...HERO_COMPANIES, ...HERO_COMPANIES, ...HERO_COMPANIES].map((company, index) => (
                    <div key={index} className="hero-logo-item" aria-label={company.name}>
                      <img src={company.logo} alt={company.name} className="hero-logo-img" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Publications Section - Hidden for now */}
        {/*
        <section className="features-section">
          <h3 className="features-title">F E A T U R E S</h3>
          <div className="logo-slider-container">
            <div className="logo-slide-track">
              <div className="logo-group">
                <div className="brand-logo" aria-label="TechCrunch">
                  <svg viewBox="0 0 120 28" fill="currentColor">
                    <path d="M0 0h10.4v6.8H6.6v20.4H0V0zm15.4 6.8V0h21.4v6.8h-7.1v20.4h-6.8V6.8h-7.5zm19.8 0h6.8v20.4h-6.8V6.8zM42.2 0h10.4v6.8h-3.8v6.8h3.8v6.8h-3.8v6.8H42.2V0zm17 6.8V0h20.6v6.8h-6.7v20.4h-6.8V6.8h-7.1zM79.8 0h10.4v6.8H86.4v6.8h3.8v6.8H86.4v6.8H79.8V0zm17 0h10.4v6.8h-3.8v6.8h3.8v6.8h-3.8v6.8H96.8V0zm16.4 6.8V0h6.8v27.2h-6.8V6.8z"/>
                  </svg>
                </div>
                <div className="brand-logo" aria-label="Forbes">
                  <svg viewBox="0 0 120 28" fill="currentColor">
                    <path d="M0 0h13.2v4.8H5.6v6h6.8v4.8H5.6v12h-5.6V0zm16.8 0h11.2v27.2H16.8V0zm5.6 4.8v17.6h0.2l5.4-17.6h-5.6zm11.2 0h11.2v27.2H33.6V0zm5.6 4.8v17.6h0.2l5.4-17.6h-5.6zm11.2 0h11.2V4.8H50.4V0h5.6v27.2h-5.6V4.8zM67.2 0h13.2v4.8h-7.6v6h6.8v4.8h-6.8v6.4h7.6v5.2H67.2V0zm16.8 0h11.2v27.2H84V0zm5.6 4.8v17.6h0.2l5.4-17.6H89.6z"/>
                  </svg>
                </div>
                <div className="brand-logo" aria-label="Wired">
                  <svg viewBox="0 0 120 28" fill="currentColor">
                    <path d="M0 0h5.6l4.2 16.8L14 0h5.6l4.2 16.8L28 0h5.6l-5.6 27.2h-5.6l-4.2-16.8-4.2 16.8H8.4L2.8 0h-2.8zM36.4 0h5.6v27.2h-5.6V0zm11.2 0h11.2c5.6 0 8.4 2.8 8.4 8.4 0 4.2-2.8 7-7 8.4l7 10.4h-5.6l-7-10.4h-3.8v10.4h-5.6V0zm5.6 4.8v6.8h5.6c2.8 0 4.2-1.4 4.2-3.4 0-2-1.4-3.4-4.2-3.4h-5.6zm19.6-4.8h13.2v4.8H78.4v6.4h9.8v4.8h-9.8v6.4h11.2v4.8H72.8V0zm19.6 0h9.8c8.4 0 12.6 4.2 12.6 13.6s-4.2 13.6-12.6 13.6h-9.8V0zm5.6 4.8v17.6h4.2c5.6 0 7-2.8 7-8.8s-1.4-8.8-7-8.8h-4.2z"/>
                  </svg>
                </div>
                <div className="brand-logo" aria-label="Fast Company">
                  <svg viewBox="0 0 150 28" fill="currentColor">
                    <path d="M0 0h15.4v5.6H5.6v5.6h9.8v5.6H5.6v10.4H0V0zm21 0h15.4v5.6h-9.8v5.6h9.8v5.6h-9.8v10.4H21V0zm42 5.6h-5.6v21.6H30.8V5.6h-5.6V0H63v5.6zm5.6 21.6V0h5.6v27.2h-5.6v-27.2zm14 0h11.2c5.6 0 8.4 2.8 8.4 8.4 0 4.2-2.8 7-7 8.4l7 10.4h-5.6l-7-10.4H88.2v10.4h-5.6V0zm5.6 5.6v6.8h5.6c2.8 0 4.2-1.4 4.2-3.4 0-2-1.4-3.4-4.2-3.4h-5.6zm19.6-5.6h15.4v5.6h-9.8v5.6h9.8v5.6h-9.8v10.4h-5.6V0zm21 0h5.6v27.2h-5.6V0zm14 0h5.6l4.2 16.8 4.2-16.8h5.6l-5.6 27.2h-5.6l-4.2-16.8-4.2 16.8h-5.6L142.8 0z"/>
                  </svg>
                </div>
                <div className="brand-logo" aria-label="Entrepreneur">
                  <svg viewBox="0 0 140 28" fill="currentColor">
                    <path d="M0 0h12v4.8H4.8v6h6.8v4.8H4.8v6.4h7.2v5.2H0V0zm16.8 11.2h11.2v16h-4.8v-16h-6.4V0h5.6v11.2zm11.2 0h11.2v16h-4.8v-16h-6.4V0h5.6v11.2zm11.2-11.2h11.2c4.8 0 7.2 2.4 7.2 7.2 0 3.6-2.4 6-6 7.2l6 9.6h-4.8l-6-9.6H44v9.6h-4.8V0zm4.8 4.8v5.6h5.6c2.4 0 3.6-1.2 3.6-2.8 0-1.6-1.2-2.8-3.6-2.8H44zm19.6-4.8H72v4.8h-7.6v6h6.8v4.8h-6.8v6.4h7.6v5.2H63.6V0zm16.8 0h11.2v27.2H80.4V0zm4.8 4.8v17.6h0.2l5.4-17.6h-5.6zm11.2 0h11.2V4.8h-5.6V0h5.6v27.2h-5.6V4.8zm11.2 0h11.2v27.2h-4.8V4.8h-6.4V0h5.6v4.8zm11.2-4.8h12v4.8h-7.2v6h6.8v4.8h-6.8v6.4h7.2v5.2h-12V0zm16.8 0h11.2v27.2h-4.8V4.8h-6.4V0h5.6v4.8z"/>
                  </svg>
                </div>
              </div>
              <div className="logo-group">
                <div className="brand-logo" aria-label="TechCrunch">
                  <svg viewBox="0 0 120 28" fill="currentColor">
                    <path d="M0 0h10.4v6.8H6.6v20.4H0V0zm15.4 6.8V0h21.4v6.8h-7.1v20.4h-6.8V6.8h-7.5zm19.8 0h6.8v20.4h-6.8V6.8zM42.2 0h10.4v6.8h-3.8v6.8h3.8v6.8h-3.8v6.8H42.2V0zm17 6.8V0h20.6v6.8h-6.7v20.4h-6.8V6.8h-7.1zM79.8 0h10.4v6.8H86.4v6.8h3.8v6.8H86.4v6.8H79.8V0zm17 0h10.4v6.8h-3.8v6.8h3.8v6.8h-3.8v6.8H96.8V0zm16.4 6.8V0h6.8v27.2h-6.8V6.8z"/>
                  </svg>
                </div>
                <div className="brand-logo" aria-label="Forbes">
                  <svg viewBox="0 0 120 28" fill="currentColor">
                    <path d="M0 0h13.2v4.8H5.6v6h6.8v4.8H5.6v12h-5.6V0zm16.8 0h11.2v27.2H16.8V0zm5.6 4.8v17.6h0.2l5.4-17.6h-5.6zm11.2 0h11.2v27.2H33.6V0zm5.6 4.8v17.6h0.2l5.4-17.6h-5.6zm11.2 0h11.2V4.8H50.4V0h5.6v27.2h-5.6V4.8zM67.2 0h13.2v4.8h-7.6v6h6.8v4.8h-6.8v6.4h7.6v5.2H67.2V0zm16.8 0h11.2v27.2H84V0zm5.6 4.8v17.6h0.2l5.4-17.6H89.6z"/>
                  </svg>
                </div>
                <div className="brand-logo" aria-label="Wired">
                  <svg viewBox="0 0 120 28" fill="currentColor">
                    <path d="M0 0h5.6l4.2 16.8L14 0h5.6l4.2 16.8L28 0h5.6l-5.6 27.2h-5.6l-4.2-16.8-4.2 16.8H8.4L2.8 0h-2.8zM36.4 0h5.6v27.2h-5.6V0zm11.2 0h11.2c5.6 0 8.4 2.8 8.4 8.4 0 4.2-2.8 7-7 8.4l7 10.4h-5.6l-7-10.4h-3.8v10.4h-5.6V0zm5.6 4.8v6.8h5.6c2.8 0 4.2-1.4 4.2-3.4 0-2-1.4-3.4-4.2-3.4h-5.6zm19.6-4.8h13.2v4.8H78.4v6.4h9.8v4.8h-9.8v6.4h11.2v4.8H72.8V0zm19.6 0h9.8c8.4 0 12.6 4.2 12.6 13.6s-4.2 13.6-12.6 13.6h-9.8V0zm5.6 4.8v17.6h4.2c5.6 0 7-2.8 7-8.8s-1.4-8.8-7-8.8h-4.2z"/>
                  </svg>
                </div>
                <div className="brand-logo" aria-label="Fast Company">
                  <svg viewBox="0 0 150 28" fill="currentColor">
                    <path d="M0 0h15.4v5.6H5.6v5.6h9.8v5.6H5.6v10.4H0V0zm21 0h15.4v5.6h-9.8v5.6h9.8v5.6h-9.8v10.4H21V0zm42 5.6h-5.6v21.6H30.8V5.6h-5.6V0H63v5.6zm5.6 21.6V0h5.6v27.2h-5.6v-27.2zm14 0h11.2c5.6 0 8.4 2.8 8.4 8.4 0 4.2-2.8 7-7 8.4l7 10.4h-5.6l-7-10.4H88.2v10.4h-5.6V0zm5.6 5.6v6.8h5.6c2.8 0 4.2-1.4 4.2-3.4 0-2-1.4-3.4-4.2-3.4h-5.6zm19.6-5.6h15.4v5.6h-9.8v5.6h9.8v5.6h-9.8v10.4h-5.6V0zm21 0h5.6v27.2h-5.6V0zm14 0h5.6l4.2 16.8 4.2-16.8h5.6l-5.6 27.2h-5.6l-4.2-16.8-4.2 16.8h-5.6L142.8 0z"/>
                  </svg>
                </div>
                <div className="brand-logo" aria-label="Entrepreneur">
                  <svg viewBox="0 0 140 28" fill="currentColor">
                    <path d="M0 0h12v4.8H4.8v6h6.8v4.8H4.8v6.4h7.2v5.2H0V0zm16.8 11.2h11.2v16h-4.8v-16h-6.4V0h5.6v11.2zm11.2 0h11.2v16h-4.8v-16h-6.4V0h5.6v11.2zm11.2-11.2h11.2c4.8 0 7.2 2.4 7.2 7.2 0 3.6-2.4 6-6 7.2l6 9.6h-4.8l-6-9.6H44v9.6h-4.8V0zm4.8 4.8v5.6h5.6c2.4 0 3.6-1.2 3.6-2.8 0-1.6-1.2-2.8-3.6-2.8H44zm19.6-4.8H72v4.8h-7.6v6h6.8v4.8h-6.8v6.4h7.6v5.2H63.6V0zm16.8 0h11.2v27.2H80.4V0zm4.8 4.8v17.6h0.2l5.4-17.6h-5.6zm11.2 0h11.2V4.8h-5.6V0h5.6v27.2h-5.6V4.8zm11.2 0h11.2v27.2h-4.8V4.8h-6.4V0h5.6v4.8zm11.2-4.8h12v4.8h-7.2v6h6.8v4.8h-6.8v6.4h7.2v5.2h-12V0zm16.8 0h11.2v27.2h-4.8V4.8h-6.4V0h5.6v4.8z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
        */}

        {/* Industry Leaders Slider Section */}
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

        {/* Problems Section */}
        <section id="problems" className="problems-section">
          <div className="problems-container">
            <div className="problems-intro">
              <h2 className="problems-subtitle">
                You run a busy factory.<br />
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
                  <h3 className="problem-title">{problem.title}</h3>
                  <p className="problem-desc">{problem.desc}</p>
                </div>
              ))}
            </div>

            <div className="problems-outro">
              <p className="problems-outro-text">
                If even one of these sounds familiar, <br />
                you need a standard process for marketing and communication. <br />
                And this process is exactly what we build.
              </p>
              <a href="#consultation" className="btn-problems-cta">
                Let’s Fix this! Book a Call
              </a>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
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

        {/* Services & Retainers Section */}
        <section id="services" className="services-section">
          <div className="services-container">
            <h2 className="services-title">Services & Retainers</h2>
            
            <div className="services-grid">
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
                  <a href="#consultation" className="btn-service btn-recommended">Book a GTM Readiness Conversation</a>
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
                  <a href="#consultation" className="btn-service btn-recommended">Install the Reputation Engine</a>
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
          </div>
        </section>

        {/* Playbook / Initiatives Section */}
        <section id="playbook" className="playbook-section">
          {/* Frosted Blurry glow elements behind cards */}
          <div className="playbook-blur-orb orb-1"></div>
          <div className="playbook-blur-orb orb-2"></div>
          
          <h2 className="section-title">Case Studies &amp; Testimonials</h2>
          
          <div ref={playbookSliderRef} className="playbook-slider-container">
            <div className="playbook-slide-track">
              <div className="playbook-group">
                {/* Case Study 1 */}
                <div className="playbook-card card-dark">
                  <div className="playbook-content">
                    <h3 className="playbook-card-title">Case Study: Pune MSME</h3>
                    <ul className="playbook-list">
                      <li>
                        <strong className="list-head">The Action:</strong> 
                        Standardised GTM assets and installed the Reputation Engine for a precision-machining manufacturer.
                      </li>
                      <li>
                        <strong className="list-head">OEM Reach:</strong> 
                        4,500+ high-intent procurement decision-makers reached.
                      </li>
                      <li>
                        <strong className="list-head">Positive Interest:</strong> 
                        250+ active business interests and meeting requests.
                      </li>
                      <li>
                        <strong className="list-head">Assets Delivered:</strong> 
                        Meeting-ready capabilities decks and repeatable GTM assets.
                      </li>
                    </ul>
                    {/* Torn Edge on Right */}
                    <div className="torn-edge-container right-edge">
                      <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                        <path d="M0,0 L20,10 L17,25 L20,45 L16,60 L19,80 L15,100 L20,120 L17,140 L20,165 L16,185 L19,210 L15,235 L20,260 L17,285 L20,310 L16,335 L19,360 L15,385 L20,410 L17,435 L20,460 L15,480 L20,500 L0,500 Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <div className="playbook-img-container">
                    <img src="/assets/playbook_copywriting.jpg" alt="Factory CNC machine operating" className="playbook-img" />
                  </div>
                </div>

                {/* Testimonial 1 */}
                <div className="playbook-card card-light flex-reverse">
                  <div className="playbook-img-container">
                    <img src="/assets/playbook_outreach.jpg" alt="Sanjay D., Managing Director" className="playbook-img" />
                  </div>
                  <div className="playbook-content">
                    {/* Torn Edge on Left */}
                    <div className="torn-edge-container left-edge">
                      <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                        <path d="M20,0 L0,10 L3,25 L0,45 L4,60 L1,80 L5,100 L0,120 L3,140 L0,165 L4,185 L1,210 L5,235 L0,260 L3,285 L0,310 L4,335 L1,360 L5,385 L0,410 L3,435 L0,460 L5,480 L0,500 L20,500 Z" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="roadmap-pillar" style={{ display: 'block', marginBottom: '8px' }}>Precision Auto Components, Pune</span>
                    <h3 className="playbook-card-title">Sanjay D. (MD)</h3>
                    <p className="roadmap-card-focus" style={{ fontSize: '1.05rem', color: '#1a1a1a', lineHeight: '1.6', marginTop: '16px' }}>
                      "Before Communic8, we were invisible to foreign buyers. Ajinkya understood our shop floor. The GTM deck and walkthrough video they built did more than 5 years of cold sales chasing."
                    </p>
                  </div>
                </div>

                {/* Case Study 2 */}
                <div className="playbook-card card-dark">
                  <div className="playbook-content">
                    <h3 className="playbook-card-title">Case Study: Chennai Stamping</h3>
                    <ul className="playbook-list">
                      <li>
                        <strong className="list-head">The Action:</strong> 
                        Produced a high-definition factory walkthrough video and implemented a LinkedIn visibility program.
                      </li>
                      <li>
                        <strong className="list-head">Buyer Inquiries:</strong> 
                        Secured direct RFQs from Tier 1 procurement managers within 90 days.
                      </li>
                      <li>
                        <strong className="list-head">Market Positioning:</strong> 
                        Established brand authority for sheet-metal stamping capabilities.
                      </li>
                      <li>
                        <strong className="list-head">Visible Proof:</strong> 
                        Showcased deep toolroom and quality control setups to global OEMs.
                      </li>
                    </ul>
                    {/* Torn Edge on Right */}
                    <div className="torn-edge-container right-edge">
                      <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                        <path d="M0,0 L20,10 L17,25 L20,45 L16,60 L19,80 L15,100 L20,120 L17,140 L20,165 L16,185 L19,210 L15,235 L20,260 L17,285 L20,310 L16,335 L19,360 L15,385 L20,410 L17,435 L20,460 L15,480 L20,500 L0,500 Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <div className="playbook-img-container">
                    <img src="/assets/playbook_authority.jpg" alt="Factory stamping floor" className="playbook-img" />
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div className="playbook-card card-light flex-reverse">
                  <div className="playbook-img-container">
                    <img src="/assets/playbook_advocacy.jpg" alt="Rajesh K., Director" className="playbook-img" />
                  </div>
                  <div className="playbook-content">
                    {/* Torn Edge on Left */}
                    <div className="torn-edge-container left-edge">
                      <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                        <path d="M20,0 L0,10 L3,25 L0,45 L4,60 L1,80 L5,100 L0,120 L3,140 L0,165 L4,185 L1,210 L5,235 L0,260 L3,285 L0,310 L4,335 L1,360 L5,385 L0,410 L3,435 L0,460 L5,480 L0,500 L20,500 Z" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="roadmap-pillar" style={{ display: 'block', marginBottom: '8px' }}>Chennai Stamping Pvt Ltd</span>
                    <h3 className="playbook-card-title">Rajesh K. (Director)</h3>
                    <p className="roadmap-card-focus" style={{ fontSize: '1.05rem', color: '#1a1a1a', lineHeight: '1.6', marginTop: '16px' }}>
                      "We tried generic digital agencies that wanted us to do reels. Communic8 installed a process. Our LinkedIn is now as consistent as our production line."
                    </p>
                  </div>
                </div>
              </div>

              <div className="playbook-group">
                {/* Case Study 1 (Duplicate) */}
                <div className="playbook-card card-dark">
                  <div className="playbook-content">
                    <h3 className="playbook-card-title">Case Study: Pune MSME</h3>
                    <ul className="playbook-list">
                      <li>
                        <strong className="list-head">The Action:</strong> 
                        Standardised GTM assets and installed the Reputation Engine for a precision-machining manufacturer.
                      </li>
                      <li>
                        <strong className="list-head">OEM Reach:</strong> 
                        4,500+ high-intent procurement decision-makers reached.
                      </li>
                      <li>
                        <strong className="list-head">Positive Interest:</strong> 
                        250+ active business interests and meeting requests.
                      </li>
                      <li>
                        <strong className="list-head">Assets Delivered:</strong> 
                        Meeting-ready capabilities decks and repeatable GTM assets.
                      </li>
                    </ul>
                    {/* Torn Edge on Right */}
                    <div className="torn-edge-container right-edge">
                      <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                        <path d="M0,0 L20,10 L17,25 L20,45 L16,60 L19,80 L15,100 L20,120 L17,140 L20,165 L16,185 L19,210 L15,235 L20,260 L17,285 L20,310 L16,335 L19,360 L15,385 L20,410 L17,435 L20,460 L15,480 L20,500 L0,500 Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <div className="playbook-img-container">
                    <img src="/assets/playbook_copywriting.jpg" alt="Factory CNC machine operating" className="playbook-img" />
                  </div>
                </div>

                {/* Testimonial 1 (Duplicate) */}
                <div className="playbook-card card-light flex-reverse">
                  <div className="playbook-img-container">
                    <img src="/assets/playbook_outreach.jpg" alt="Sanjay D., Managing Director" className="playbook-img" />
                  </div>
                  <div className="playbook-content">
                    {/* Torn Edge on Left */}
                    <div className="torn-edge-container left-edge">
                      <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                        <path d="M20,0 L0,10 L3,25 L0,45 L4,60 L1,80 L5,100 L0,120 L3,140 L0,165 L4,185 L1,210 L5,235 L0,260 L3,285 L0,310 L4,335 L1,360 L5,385 L0,410 L3,435 L0,460 L5,480 L0,500 L20,500 Z" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="roadmap-pillar" style={{ display: 'block', marginBottom: '8px' }}>Precision Auto Components, Pune</span>
                    <h3 className="playbook-card-title">Sanjay D. (MD)</h3>
                    <p className="roadmap-card-focus" style={{ fontSize: '1.05rem', color: '#1a1a1a', lineHeight: '1.6', marginTop: '16px' }}>
                      "Before Communic8, we were invisible to foreign buyers. Ajinkya understood our shop floor. The GTM deck and walkthrough video they built did more than 5 years of cold sales chasing."
                    </p>
                  </div>
                </div>

                {/* Case Study 2 (Duplicate) */}
                <div className="playbook-card card-dark">
                  <div className="playbook-content">
                    <h3 className="playbook-card-title">Case Study: Chennai Stamping</h3>
                    <ul className="playbook-list">
                      <li>
                        <strong className="list-head">The Action:</strong> 
                        Produced a high-definition factory walkthrough video and implemented a LinkedIn visibility program.
                      </li>
                      <li>
                        <strong className="list-head">Buyer Inquiries:</strong> 
                        Secured direct RFQs from Tier 1 procurement managers within 90 days.
                      </li>
                      <li>
                        <strong className="list-head">Market Positioning:</strong> 
                        Established brand authority for sheet-metal stamping capabilities.
                      </li>
                      <li>
                        <strong className="list-head">Visible Proof:</strong> 
                        Showcased deep toolroom and quality control setups to global OEMs.
                      </li>
                    </ul>
                    {/* Torn Edge on Right */}
                    <div className="torn-edge-container right-edge">
                      <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                        <path d="M0,0 L20,10 L17,25 L20,45 L16,60 L19,80 L15,100 L20,120 L17,140 L20,165 L16,185 L19,210 L15,235 L20,260 L17,285 L20,310 L16,335 L19,360 L15,385 L20,410 L17,435 L20,460 L15,480 L20,500 L0,500 Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <div className="playbook-img-container">
                    <img src="/assets/playbook_authority.jpg" alt="Factory stamping floor" className="playbook-img" />
                  </div>
                </div>

                {/* Testimonial 2 (Duplicate) */}
                <div className="playbook-card card-light flex-reverse">
                  <div className="playbook-img-container">
                    <img src="/assets/playbook_advocacy.jpg" alt="Rajesh K., Director" className="playbook-img" />
                  </div>
                  <div className="playbook-content">
                    {/* Torn Edge on Left */}
                    <div className="torn-edge-container left-edge">
                      <svg className="torn-edge" viewBox="0 0 20 500" preserveAspectRatio="none">
                        <path d="M20,0 L0,10 L3,25 L0,45 L4,60 L1,80 L5,100 L0,120 L3,140 L0,165 L4,185 L1,210 L5,235 L0,260 L3,285 L0,310 L4,335 L1,360 L5,385 L0,410 L3,435 L0,460 L5,480 L0,500 L20,500 Z" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="roadmap-pillar" style={{ display: 'block', marginBottom: '8px' }}>Chennai Stamping Pvt Ltd</span>
                    <h3 className="playbook-card-title">Rajesh K. (Director)</h3>
                    <p className="roadmap-card-focus" style={{ fontSize: '1.05rem', color: '#1a1a1a', lineHeight: '1.6', marginTop: '16px' }}>
                      "We tried generic digital agencies that wanted us to do reels. Communic8 installed a process. Our LinkedIn is now as consistent as our production line."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
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

        {/* Interactive GTM Assessment Section */}
        <section id="assessment" className="assessment-section">
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
                                    <span>Not true</span>
                                    <span>Neutral</span>
                                    <span>Very true</span>
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

              {assessmentStep === 1 && (
                <div className="assessment-lead-card">
                  <div className="lead-header-info">
                    <span className="lead-meta-tag">Final Step</span>
                    <h3 className="lead-main-title">Unlock Your B2B Diagnostic Report</h3>
                    <p className="lead-main-desc">
                      We are preparing your custom GTM report and capability breakdown. Provide your details to complete the diagnosis.
                    </p>
                  </div>
                  
                  <form onSubmit={handleLeadSubmit} className="lead-dashboard-form">
                    <div className="input-field-group">
                      <input 
                        id="lead-name"
                        type="text" 
                        required
                        placeholder=" "
                        value={leadData.name}
                        onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                        className="dashboard-input"
                      />
                      <label htmlFor="lead-name" className="dashboard-label">Your Name</label>
                    </div>
                    
                    <div className="input-field-group">
                      <input 
                        id="lead-company"
                        type="text" 
                        required
                        placeholder=" "
                        value={leadData.company}
                        onChange={(e) => setLeadData({ ...leadData, company: e.target.value })}
                        className="dashboard-input"
                      />
                      <label htmlFor="lead-company" className="dashboard-label">Company / Factory Name</label>
                    </div>
                    
                    <div className="input-field-group">
                      <input 
                        id="lead-phone"
                        type="tel" 
                        required
                        placeholder=" "
                        value={leadData.phone}
                        onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                        className="dashboard-input"
                      />
                      <label htmlFor="lead-phone" className="dashboard-label">Phone / WhatsApp Number</label>
                    </div>
                    
                    <div className="checkbox-consent-row">
                      <div className="consent-check-container">
                        <input 
                          id="consent-check"
                          type="checkbox" 
                          defaultChecked
                          required
                          className="consent-checkbox-input"
                        />
                        <div className="checkbox-box-custom"></div>
                      </div>
                      <label htmlFor="consent-check" className="consent-label-text">
                        I agree to receive a PDF copy of this GTM report via WhatsApp/Email.
                      </label>
                    </div>
                    
                    <div className="lead-actions-row">
                      <button type="submit" className="btn-dashboard-submit">
                        Reveal Diagnostic Results →
                      </button>
                      <button type="button" className="btn-dashboard-cancel" onClick={() => setAssessmentStep(0)}>
                        Back to Sliders
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {assessmentStep === 2 && (
                <div className="assessment-results-card">
                  <div className="results-badge-bar">
                    <span className="results-badge-meta">GTM Audit Report</span>
                    <span className="results-badge-company">{leadData.company}</span>
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



        {/* Founder Bio / Consultation Section */}
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
              Our Supporters
            </button>
            <button 
              className={`bio-tab-btn ${activeBioTab === "leadership" ? "active" : ""}`}
              onClick={() => setActiveBioTab("leadership")}
            >
              Leadership
            </button>
          </div>

          {activeBioTab === "founder" && (
            <div className="bio-card tab-content-animate">
              <div className="bio-img-container">
                <img src="/assets/founder_image.jpg" alt="Ajinkya, Founder of Communic8" className="bio-img" />
              </div>
              <div className="bio-content">
                <h2 className="bio-name">Ajinkya</h2>
                <h3 className="bio-title">Built by an operations head who ran 4 plants, not a digital marketer.</h3>
                <p className="bio-description">
                  Installing a growth process requires shop-floor discipline, not creative theories. After 16 years working hands-on in factories, climbing from helper to tool room, then plant head to operations head, and scaling a workforce from 135 to over 850 people across 4 plants, I built Communic8 to install the missing marketing process in B2B manufacturing. We don't talk vanity metrics; we build durable, structured market visibility that translates directly to industrial growth.
                </p>
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
                      <img src={employee.img} alt={employee.name} className="supporter-img" />
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

          <div className="bio-outro tab-content-animate">
            <p className="bio-outro-sub">You have a well defined system for everything on you shop floors..</p>
            <h4 className="bio-outro-headline">Why should marketing be left out?</h4>
            <a href="#consultation" className="btn-consultation">Book a GTM Readiness Conversation</a>
          </div>
        </section>
        {/* Booking Confirmation modal */}
        {bookingConfirmed && bookedReportData && (
          <div className="booking-modal-overlay">
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
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2026 COMMUNIC8. All rights reserved.</p>
          <div className="footer-links">
            <a href="#problems" onClick={(e) => handleSmoothScroll(e, "#problems")}>The Problems</a>
            <a href="#system" onClick={(e) => handleSmoothScroll(e, "#system")}>Our System</a>
            <a href="#services" onClick={(e) => handleSmoothScroll(e, "#services")}>Services</a>
            <a href="#playbook" onClick={(e) => handleSmoothScroll(e, "#playbook")}>Case Studies</a>
            <a href="#founder" onClick={(e) => handleSmoothScroll(e, "#founder")}>Our Team</a>
          </div>
        </div>
      </footer>
    </>
  );
}
