"use client";

import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";

const INDUSTRY_LEADERS = [
  { first: "Alok", last: "Kanani", img: "/assets/customers/alok_kanani.jpg" },
  { first: "Amruta", last: "Kelkar", img: "/assets/customers/amruta_kelkar.jpg" },
  { first: "Dadasaheb", last: "Urhe", img: "/assets/customers/dadasaheb_urhe.jpg" },
  { first: "Jaidev", last: "Akkalkote", img: "/assets/customers/jaidev_akkalkote.jpg" },
  { first: "Kasiraj", last: "Ganapathy", img: "/assets/customers/kasiraj_ganapathy.png" },
  { first: "Mayur", last: "Mundra", img: "/assets/customers/mayur_mundra.jpg" },
  { first: "Ruchita", last: "Tanpure", img: "/assets/customers/ruchita_tanpure.jpg" }
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

const LINKEDIN_PROBLEMS = [
  {
    number: 1,
    title: "Perception Gap",
    desc: "Consistent visibility signals progress, stability, and forward movement before competitors define your narrative for you.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="problem-icon-svg">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    )
  },
  {
    number: 2,
    title: "Lost Credibility",
    desc: "Sharing insights, upgrades, and certifications reinforces competence before technical discussions even begin.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="problem-icon-svg">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="M9 11l2 2 4-4"></path>
      </svg>
    )
  },
  {
    number: 3,
    title: "Reduced Shortlisting",
    desc: "Regular presence improves recall, increasing the likelihood of being considered during vendor evaluation cycles.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="problem-icon-svg">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    )
  },
  {
    number: 4,
    title: "Capability Blindspot",
    desc: "Active thought leadership positions your company as progressive, attractive, and growth-oriented in value-buying environments.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="problem-icon-svg fill-svg">
        <path fill="currentColor" fillRule="nonzero" d="M244.633 367.493c5.17329,4.74809 7.99616,11.1025 8.43317,17.6459 0.437013,6.62607 -1.61813,13.4411 -6.20086,18.9333 4.41738,-3.51973 9.77965,-5.33865 15.2128,-5.49219 6.50795,-0.188979 13.134,2.01971 18.3191,6.53158 0.070867,0.0590558 0.30709,0.283468 0.685048,0.637803l-4.35832 4.67722 4.38194 -4.68903c0.188979,0.177168 0.354335,0.366146 0.519691,0.555125 4.93707,4.87801 7.46466,11.197 7.67726,17.6459 0.20079,5.84653 -1.51183,11.7757 -5.06699,16.7955 3.09453,-1.60632 6.49614,-2.50397 9.93319,-2.66932 6.03551,-0.30709 12.2482,1.61813 17.1734,5.72842 0.248035,0.20079 0.472447,0.40158 0.673237,0.578747 5.03156,4.50006 7.68907,10.5474 8.03159,16.76 0.342524,6.2363 -1.65356,12.6498 -5.96464,17.8112l-11.5868 13.9017c2.24412,1.35828 4.51187,2.752 6.79142,4.15753 23.6105,14.5514 50.0439,30.839 69.8158,7.21662l-47.6226 -35.8823 11.5749 -15.3427 51.2014 38.5871 4.59454 -1.07482 0.90946 -0.153545c6.48433,-0.874027 11.445,-3.33075 15.0238,-7.22844 2.91736,-3.18902 5.11424,-7.47647 6.63788,-12.7797l-64.737 -43.6423 10.76 -15.9451 67.6544 45.6147c7.97254,-2.05514 14.2206,-5.00794 18.7443,-8.85838 3.37799,-2.87011 5.84653,-6.3426 7.41741,-10.4293l-81.3435 -58.1936 11.1261 -15.638 84.8396 60.6976c5.31503,-0.0944894 9.87414,-1.67719 13.5238,-4.2284 3.25988,-2.27956 5.90558,-5.37408 7.81899,-8.92924 1.94884,-3.61422 3.11815,-7.66545 3.40162,-11.7875 0.389769,-5.69298 -0.897649,-11.445 -4.15753,-16.264 -1.16931,-0.425202 -2.26774,-1.08663 -3.21264,-1.96065 -27.461,-22.7483 -54.3432,-43.1934 -82.3947,-60.8984 -27.6145,-17.4097 -56.5164,-32.2917 -88.4775,-44.2683 -4.98431,0.165356 -9.29539,0.129923 -13.0277,0.0944894 -12.319,-0.118112 -15.1892,-0.141734 -24.3546,17.8231 -6.82686,13.3584 -15.7679,23.3625 -27.1893,28.8547 -10.8308,5.20873 -23.4334,6.18905 -38.0202,1.94884 -21.5908,-6.27173 -26.646,-11.4332 -22.8428,-24.5082 1.03938,-3.5906 3.00004,-7.09851 5.57487,-11.7049 0.673237,-1.20474 1.39372,-2.51578 3.1772,-5.85834 11.1852,-21.0593 20.953,-38.0202 30.5082,-51.603 -9.96863,-1.14568 -17.9884,-2.76381 -25.8546,-5.16148 -8.70483,-2.6457 -16.76,-6.09456 -26.7169,-10.8308l-68.5166 123.344 27.0594 27.9925 10.2993 -11.882c4.70085,-5.40952 11.1261,-8.55129 17.764,-9.17728 6.62607,-0.625992 13.4529,1.22836 18.9687,5.79928 0.106301,0.0826782 0.0472447,0.0472447 0.448824,0.40158 5.25597,4.55911 8.31506,10.8545 8.95287,17.3506 0.448824,4.52368 -0.271657,9.15366 -2.23231,13.3584l10.4647 -12.26 -0.0118112 -0.0118112c0.0590558,-0.070867 0.129923,-0.141734 0.188979,-0.212601l0 -0.0118112c0.141734,-0.165356 0.295279,-0.318902 0.460636,-0.472447 4.70085,-5.11424 11.0316,-7.90167 17.516,-8.31506 6.64969,-0.425202 13.4884,1.64175 18.9097,6.27173l0.0118112 -0.0118112c0.0826782,0.070867 0.153545,0.141734 0.224412,0.20079l0 0c0.177168,0.141734 0.330713,0.295279 0.484258,0.460636zm45.4376 140.258l-11.9765 14.3624c-0.188979,0.224412 -0.366146,0.437013 -0.543314,0.625992 -4.37013,4.88982 -10.3702,7.47647 -16.512,7.78356 -6.0237,0.295279 -12.2364,-1.61813 -17.1734,-5.74023 -0.236223,-0.20079 -0.460636,-0.389769 -0.661425,-0.566936 -5.03156,-4.51187 -7.70088,-10.5474 -8.04341,-16.7719 -0.259846,-4.72447 0.826782,-9.55524 3.25988,-13.8663l-1.27561 1.45277c-0.153545,0.188979 -0.0354335,0.0236223 -0.614181,0.649614 -4.80715,5.12605 -11.2797,7.75994 -17.8585,7.93711 -6.50795,0.188979 -13.1458,-2.01971 -18.3309,-6.53158l0.0118112 -0.0118112 0 0 -0.0118112 0.0118112c-0.129923,-0.118112 -0.259846,-0.236223 -0.389769,-0.366146 -0.118112,-0.106301 -0.212601,-0.20079 -0.30709,-0.283468l-0.0118112 0.0118112c-0.177168,-0.165356 -0.354335,-0.354335 -0.50788,-0.543314 -4.93707,-4.87801 -7.47647,-11.197 -7.68907,-17.6459 -0.141734,-4.45281 0.814971,-8.96468 2.8583,-13.075 -4.39375,3.76776 -9.80327,5.84653 -15.3309,6.20086 -6.63788,0.425202 -13.4765,-1.65356 -18.9097,-6.28354l-0.0118112 0.0118112c-0.070867,-0.0590558 -0.153545,-0.129923 -0.224412,-0.20079l0 0c-0.165356,-0.141734 -0.330713,-0.295279 -0.484258,-0.448824 -5.16148,-4.74809 -7.99616,-11.1143 -8.42136,-17.6459 -0.448824,-6.72056 1.65356,-13.6301 6.37803,-19.1577l3.64965 -4.28745c-4.08666,3.1772 -8.92924,5.04337 -13.8781,5.51582 -6.62607,0.625992 -13.4529,-1.24017 -18.9687,-5.79928l-0.0118112 0c-0.141734,-0.118112 -0.283468,-0.248035 -0.425202,-0.377957l-0.0236223 -0.0236223c-5.24416,-4.55911 -8.30325,-10.8545 -8.94105,-17.3506 -0.649614,-6.5552 1.15749,-13.323 5.63393,-18.7443l0 0c0.118112,-0.153545 0.248035,-0.295279 0.377957,-0.425202l0.0118112 -0.0118112 4.84258 -5.58668 -29.0319 -30.0476 -11.8112 20.2916 -0.0354335 0.070867 -0.165356 0.271657 -0.070867 0.0826782c-3.9095,6.42528 -10.0749,10.6419 -16.8782,12.2836 -6.74418,1.62994 -14.138,0.755915 -20.516,-2.9646l-0.070867 -0.070867 -0.283468 -0.165356 -0.0826782 -0.0472447 -37.3587 -22.6538c-6.51977,-3.95674 -10.7718,-10.1576 -12.449,-17.0081 -1.67719,-6.82686 -0.779537,-14.3151 3.01185,-20.8231l118.395 -203.341 0.0354335 -0.0826782 0.165356 -0.271657 0.070867 -0.070867c3.89769,-6.43709 10.0749,-10.6419 16.8782,-12.2836 6.74418,-1.62994 14.1262,-0.755915 20.516,2.9646l0.070867 0.0354335 0.283468 0.165356 0.070867 0.070867 37.3705 22.6656c6.50795,3.94493 10.7718,10.1458 12.449,16.9963 1.66537,6.83867 0.767726,14.3151 -3.02366,20.8349l-16.89 29.02c10.1458,4.8662 17.953,8.30325 25.7129,10.6655 9.33082,2.84649 19.3585,4.42919 34.3469,5.49219l-0.0354335 0.377957c35.7997,-38.8587 76.7017,-35.8233 184.526,-27.8153l5.16148 0.389769 -7.01583 -12.0592c-3.79139,-6.50795 -4.68903,-13.9962 -3.02366,-20.8231 1.67719,-6.85048 5.94102,-13.0513 12.449,-17.0081l37.3705 -22.6538 0.070867 -0.0826782 0.283468 -0.165356 0.070867 -0.0354335c6.38984,-3.72052 13.7718,-4.59454 20.516,-2.9646 6.80323,1.64175 12.9805,5.85834 16.8782,12.2836l0.070867 0.0826782 0.165356 0.271657 0.0354335 0.070867 118.395 203.341c3.79139,6.51977 4.68903,13.9962 3.01185,20.8231 -1.67719,6.86229 -5.92921,13.0513 -12.449,17.0081l-37.3587 22.6656 -0.0826782 0.0354335 -0.283468 0.165356 -0.070867 0.070867c-6.37803,3.72052 -13.7718,4.59454 -20.516,2.9646 -6.80323,-1.64175 -12.9687,-5.84653 -16.8782,-12.2836l-0.070867 -0.070867 -0.165356 -0.271657 -0.0354335 -0.0826782 -12.1655 -20.894 -24.9806 18.8979c4.48824,7.88986 6.25992,16.76 5.65755,25.4058 -0.460636,6.83867 -2.40948,13.5828 -5.65755,19.5947 -3.2835,6.08275 -7.92529,11.4686 -13.7482,15.5435 -5.90558,4.1221 -12.9214,6.85048 -20.8585,7.55915 -2.66932,7.47647 -7.09851,13.8427 -13.2758,19.1105 -6.75599,5.75204 -15.4844,10.0277 -26.1972,12.8151 -2.33861,8.4568 -6.0237,15.5435 -11.1497,21.142 -6.54339,7.14576 -15.1301,11.634 -25.9373,13.2285l-4.50006 1.05119c-29.8468,45.7447 -66.615,23.0908 -99.2611,2.97641 -3.10634,-1.91341 -6.17724,-3.8032 -9.14184,-5.56306zm-217.928 -146.636l118.336 -203.27c1.22836,-2.1142 1.52364,-4.51187 0.992138,-6.69693 -0.50788,-2.06695 -1.78349,-3.94493 -3.72052,-5.11424l-37.2879 -22.6184 -0.0118112 0.0236223 -0.283468 -0.165356 0.0118112 0c-1.98428,-1.12206 -4.25202,-1.39372 -6.31898,-0.885838 -2.0079,0.484258 -3.81501,1.67719 -4.93707,3.47248l0.0236223 0.0118112 -0.165356 0.271657 0 0 -118.348 203.258c-1.22836,2.1142 -1.52364,4.52368 -0.992138,6.69693 0.50788,2.07877 1.78349,3.94493 3.73233,5.12605l37.3705 22.6656 -0.0118112 0 0.129923 0.070867 0.0118112 -0.0236223c1.98428,1.16931 4.28745,1.44096 6.37803,0.933082 2.0079,-0.484258 3.81501,-1.67719 4.93707,-3.47248l-0.0118112 -0.0118112 0.153545 -0.271657 0.0118112 0zm392.485 -171.238c0.732292,0.755915 1.32285,1.62994 1.77168,2.58665l9.42531 16.6301 92.0326 158.092 0.0118112 0 0.153545 0.271657 -0.0118112 0.0118112c1.12206,1.7953 2.92917,2.98823 4.93707,3.47248 2.09058,0.50788 4.39375,0.236223 6.37803,-0.921271l0.0118112 0.0236223 0.129923 -0.0826782 -0.0118112 0 37.3705 -22.6656c1.94884,-1.16931 3.22445,-3.04728 3.73233,-5.11424 0.531503,-2.18507 0.236223,-4.59454 -0.992138,-6.69693l-118.348 -203.27 0 0 -0.165356 -0.271657 0.0236223 -0.0118112c-1.12206,-1.7953 -2.92917,-2.98823 -4.93707,-3.47248 -2.06695,-0.496069 -4.3347,-0.236223 -6.31898,0.885838l0.0118112 0 -0.283468 0.177168 -0.0118112 -0.0236223 -37.2879 22.6066c-1.93703,1.18112 -3.21264,3.04728 -3.72052,5.12605 -0.531503,2.17326 -0.236223,4.58273 0.992138,6.69693l15.1065 25.9491zm-335.366 200.802l0 0 0 0zm58.7724 -7.52371l0.0118112 0 -0.0118112 0z" />
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
    brutalFact: "Stop-start effort resets every time — like heating metal and never forging it."
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
          archDescVal = "A genuinely good factory the market cannot see. Right now, growth depends on old references and luck. The gap is real — but it is also the fastest one to fix, because you are starting with a clean slate and a strong product.";
          archClassVal = "verdict-risk";
        } else if (totalScoreVal <= 70) {
          archDescVal = "You have started — there is some clarity or some activity. But it is not consistent, and it is not compounding, so results stay unpredictable. You are leaving your best growth on the table not from lack of trying, but from lack of structure.";
          archClassVal = "verdict-bottleneck";
        } else {
          archDescVal = "You are ahead of most manufacturers — real clarity, real consistency, real results. Honestly, you may not need us yet. But even strong operators usually have one weak link (often credibility before the meeting, or linking spend to growth).";
          archClassVal = "verdict-ready";
        }

        const cPct = clarityVal / 40;
        const ePct = execVal / 30;
        const rPct = resVal / 30;
        let diagnosisVal = "Your growth process shows potential; let's dial in the missing components.";
        if (cPct >= 0.7 && ePct < 0.5) {
          diagnosisVal = "You know what to do — you're just not doing it consistently. Your gap is an execution engine, not more thinking.";
        } else if (ePct >= 0.7 && rPct < 0.5) {
          diagnosisVal = "You're working hard on marketing but it's not paying back — a classic sign of effort pointed at the wrong strategy.";
        } else if (cPct < 0.5 && rPct >= 0.6) {
          diagnosisVal = "Your results are coming from luck or old relationships, not a system. That is fragile — the day references slow down, so does growth.";
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
    archetypeDesc = "A genuinely good factory the market cannot see. Right now, growth depends on old references and luck. The gap is real — but it is also the fastest one to fix, because you are starting with a clean slate and a strong product. This is exactly the stage where structure changes everything.";
    archetypeNext = "this is worth a serious conversation. Book a Call.";
    archetypeClass = "verdict-risk";
  } else if (totalScore <= 70) {
    archetypeTitle = "The Inconsistent Effort";
    archetypeDesc = "You have started — there is some clarity or some activity. But it is not consistent, and it is not compounding, so results stay unpredictable. You are leaving your best growth on the table not from lack of trying, but from lack of structure. Small fixes here often unlock large jumps.";
    archetypeNext = "let's find where the leak is. Book a Call.";
    archetypeClass = "verdict-bottleneck";
  } else {
    archetypeTitle = "The Structured Grower";
    archetypeDesc = "You are ahead of most manufacturers — real clarity, real consistency, real results. Honestly, you may not need us yet. But even strong operators usually have one weak link (often credibility before the meeting, or linking spend to growth). If you want a sharp outside eye on that one gap, we're happy to talk. If not, take this result as a well-earned green flag.";
    archetypeClass = "verdict-ready";
  }

  const getSmartDiagnosis = () => {
    const cPct = clarityScore / 40;
    const ePct = executionScore / 30;
    const rPct = resultsScore / 30;

    if (cPct >= 0.7 && ePct < 0.5) {
      return "You know what to do — you're just not doing it consistently. Your gap is an execution engine, not more thinking.";
    }
    if (ePct >= 0.7 && rPct < 0.5) {
      return "You're working hard on marketing but it's not paying back — a classic sign of effort pointed at the wrong strategy.";
    }
    if (cPct < 0.5 && rPct >= 0.6) {
      return "Your results are coming from luck or old relationships, not a system. That is fragile — the day references slow down, so does growth.";
    }
    if (cPct < 0.5 && ePct < 0.5 && rPct < 0.5) {
      return "You're starting near-zero — which is actually good news. With a clean slate and a strong factory, structured marketing can move you fast.";
    }
    if (cPct >= 0.7 && ePct >= 0.7 && rPct >= 0.7) {
      return "You're a rare, well-run growth operation. Protect the consistency — and watch the one category that scored lowest.";
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
            <div className="logo" onClick={(e) => handleSmoothScroll(e, "#top")}>
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
        <section className="hero-section">
          <div className="hero-card">
            <div className="hero-bg-overlay"></div>
            <img src="/assets/hero_background.jpg" alt="Collaborative creative team" className="hero-bg-img" />
            <div className="hero-content">
              <h1 className="hero-title">Narratives for manufacturing leaders.</h1>
              <p className="hero-subtitle">We generate demand. You sign contracts.</p>
            </div>
          </div>
        </section>

        {/* Features / Publications Section */}
        <section className="features-section">
          <h3 className="features-title">F E A T U R E S</h3>
          <div className="logo-slider-container">
            <div className="logo-slide-track">
              <div className="logo-group">
                {/* TechCrunch Logo SVG */}
                <div className="brand-logo" aria-label="TechCrunch">
                  <svg viewBox="0 0 120 28" fill="currentColor">
                    <path d="M0 0h10.4v6.8H6.6v20.4H0V0zm15.4 6.8V0h21.4v6.8h-7.1v20.4h-6.8V6.8h-7.5zm19.8 0h6.8v20.4h-6.8V6.8zM42.2 0h10.4v6.8h-3.8v6.8h3.8v6.8h-3.8v6.8H42.2V0zm17 6.8V0h20.6v6.8h-6.7v20.4h-6.8V6.8h-7.1zM79.8 0h10.4v6.8H86.4v6.8h3.8v6.8H86.4v6.8H79.8V0zm17 0h10.4v6.8h-3.8v6.8h3.8v6.8h-3.8v6.8H96.8V0zm16.4 6.8V0h6.8v27.2h-6.8V6.8z"/>
                  </svg>
                </div>
                {/* Forbes Logo SVG */}
                <div className="brand-logo" aria-label="Forbes">
                  <svg viewBox="0 0 120 28" fill="currentColor">
                    <path d="M0 0h13.2v4.8H5.6v6h6.8v4.8H5.6v12h-5.6V0zm16.8 0h11.2v27.2H16.8V0zm5.6 4.8v17.6h0.2l5.4-17.6h-5.6zm11.2 0h11.2v27.2H33.6V0zm5.6 4.8v17.6h0.2l5.4-17.6h-5.6zm11.2 0h11.2V4.8H50.4V0h5.6v27.2h-5.6V4.8zM67.2 0h13.2v4.8h-7.6v6h6.8v4.8h-6.8v6.4h7.6v5.2H67.2V0zm16.8 0h11.2v27.2H84V0zm5.6 4.8v17.6h0.2l5.4-17.6H89.6z"/>
                  </svg>
                </div>
                {/* Wired Logo SVG */}
                <div className="brand-logo" aria-label="Wired">
                  <svg viewBox="0 0 120 28" fill="currentColor">
                    <path d="M0 0h5.6l4.2 16.8L14 0h5.6l4.2 16.8L28 0h5.6l-5.6 27.2h-5.6l-4.2-16.8-4.2 16.8H8.4L2.8 0h-2.8zM36.4 0h5.6v27.2h-5.6V0zm11.2 0h11.2c5.6 0 8.4 2.8 8.4 8.4 0 4.2-2.8 7-7 8.4l7 10.4h-5.6l-7-10.4h-3.8v10.4h-5.6V0zm5.6 4.8v6.8h5.6c2.8 0 4.2-1.4 4.2-3.4 0-2-1.4-3.4-4.2-3.4h-5.6zm19.6-4.8h13.2v4.8H78.4v6.4h9.8v4.8h-9.8v6.4h11.2v4.8H72.8V0zm19.6 0h9.8c8.4 0 12.6 4.2 12.6 13.6s-4.2 13.6-12.6 13.6h-9.8V0zm5.6 4.8v17.6h4.2c5.6 0 7-2.8 7-8.8s-1.4-8.8-7-8.8h-4.2z"/>
                  </svg>
                </div>
                {/* Fast Company Logo SVG */}
                <div className="brand-logo" aria-label="Fast Company">
                  <svg viewBox="0 0 150 28" fill="currentColor">
                    <path d="M0 0h15.4v5.6H5.6v5.6h9.8v5.6H5.6v10.4H0V0zm21 0h15.4v5.6h-9.8v5.6h9.8v5.6h-9.8v10.4H21V0zm42 5.6h-5.6v21.6H30.8V5.6h-5.6V0H63v5.6zm5.6 21.6V0h5.6v27.2h-5.6v-27.2zm14 0h11.2c5.6 0 8.4 2.8 8.4 8.4 0 4.2-2.8 7-7 8.4l7 10.4h-5.6l-7-10.4H88.2v10.4h-5.6V0zm5.6 5.6v6.8h5.6c2.8 0 4.2-1.4 4.2-3.4 0-2-1.4-3.4-4.2-3.4h-5.6zm19.6-5.6h15.4v5.6h-9.8v5.6h9.8v5.6h-9.8v10.4h-5.6V0zm21 0h5.6v27.2h-5.6V0zm14 0h5.6l4.2 16.8 4.2-16.8h5.6l-5.6 27.2h-5.6l-4.2-16.8-4.2 16.8h-5.6L142.8 0z"/>
                  </svg>
                </div>
                {/* Entrepreneur Logo SVG */}
                <div className="brand-logo" aria-label="Entrepreneur">
                  <svg viewBox="0 0 140 28" fill="currentColor">
                    <path d="M0 0h12v4.8H4.8v6h6.8v4.8H4.8v6.4h7.2v5.2H0V0zm16.8 11.2h11.2v16h-4.8v-16h-6.4V0h5.6v11.2zm11.2 0h11.2v16h-4.8v-16h-6.4V0h5.6v11.2zm11.2-11.2h11.2c4.8 0 7.2 2.4 7.2 7.2 0 3.6-2.4 6-6 7.2l6 9.6h-4.8l-6-9.6H44v9.6h-4.8V0zm4.8 4.8v5.6h5.6c2.4 0 3.6-1.2 3.6-2.8 0-1.6-1.2-2.8-3.6-2.8H44zm19.6-4.8H72v4.8h-7.6v6h6.8v4.8h-6.8v6.4h7.6v5.2H63.6V0zm16.8 0h11.2v27.2H80.4V0zm4.8 4.8v17.6h0.2l5.4-17.6h-5.6zm11.2 0h11.2V4.8h-5.6V0h5.6v27.2h-5.6V4.8zm11.2 0h11.2v27.2h-4.8V4.8h-6.4V0h5.6v4.8zm11.2-4.8h12v4.8h-7.2v6h6.8v4.8h-6.8v6.4h7.2v5.2h-12V0zm16.8 0h11.2v27.2h-4.8V4.8h-6.4V0h5.6v4.8z"/>
                  </svg>
                </div>
              </div>
              <div className="logo-group">
                {/* TechCrunch Logo SVG */}
                <div className="brand-logo" aria-label="TechCrunch">
                  <svg viewBox="0 0 120 28" fill="currentColor">
                    <path d="M0 0h10.4v6.8H6.6v20.4H0V0zm15.4 6.8V0h21.4v6.8h-7.1v20.4h-6.8V6.8h-7.5zm19.8 0h6.8v20.4h-6.8V6.8zM42.2 0h10.4v6.8h-3.8v6.8h3.8v6.8h-3.8v6.8H42.2V0zm17 6.8V0h20.6v6.8h-6.7v20.4h-6.8V6.8h-7.1zM79.8 0h10.4v6.8H86.4v6.8h3.8v6.8H86.4v6.8H79.8V0zm17 0h10.4v6.8h-3.8v6.8h3.8v6.8h-3.8v6.8H96.8V0zm16.4 6.8V0h6.8v27.2h-6.8V6.8z"/>
                  </svg>
                </div>
                {/* Forbes Logo SVG */}
                <div className="brand-logo" aria-label="Forbes">
                  <svg viewBox="0 0 120 28" fill="currentColor">
                    <path d="M0 0h13.2v4.8H5.6v6h6.8v4.8H5.6v12h-5.6V0zm16.8 0h11.2v27.2H16.8V0zm5.6 4.8v17.6h0.2l5.4-17.6h-5.6zm11.2 0h11.2v27.2H33.6V0zm5.6 4.8v17.6h0.2l5.4-17.6h-5.6zm11.2 0h11.2V4.8H50.4V0h5.6v27.2h-5.6V4.8zM67.2 0h13.2v4.8h-7.6v6h6.8v4.8h-6.8v6.4h7.6v5.2H67.2V0zm16.8 0h11.2v27.2H84V0zm5.6 4.8v17.6h0.2l5.4-17.6H89.6z"/>
                  </svg>
                </div>
                {/* Wired Logo SVG */}
                <div className="brand-logo" aria-label="Wired">
                  <svg viewBox="0 0 120 28" fill="currentColor">
                    <path d="M0 0h5.6l4.2 16.8L14 0h5.6l4.2 16.8L28 0h5.6l-5.6 27.2h-5.6l-4.2-16.8-4.2 16.8H8.4L2.8 0h-2.8zM36.4 0h5.6v27.2h-5.6V0zm11.2 0h11.2c5.6 0 8.4 2.8 8.4 8.4 0 4.2-2.8 7-7 8.4l7 10.4h-5.6l-7-10.4h-3.8v10.4h-5.6V0zm5.6 4.8v6.8h5.6c2.8 0 4.2-1.4 4.2-3.4 0-2-1.4-3.4-4.2-3.4h-5.6zm19.6-4.8h13.2v4.8H78.4v6.4h9.8v4.8h-9.8v6.4h11.2v4.8H72.8V0zm19.6 0h9.8c8.4 0 12.6 4.2 12.6 13.6s-4.2 13.6-12.6 13.6h-9.8V0zm5.6 4.8v17.6h4.2c5.6 0 7-2.8 7-8.8s-1.4-8.8-7-8.8h-4.2z"/>
                  </svg>
                </div>
                {/* Fast Company Logo SVG */}
                <div className="brand-logo" aria-label="Fast Company">
                  <svg viewBox="0 0 150 28" fill="currentColor">
                    <path d="M0 0h15.4v5.6H5.6v5.6h9.8v5.6H5.6v10.4H0V0zm21 0h15.4v5.6h-9.8v5.6h9.8v5.6h-9.8v10.4H21V0zm42 5.6h-5.6v21.6H30.8V5.6h-5.6V0H63v5.6zm5.6 21.6V0h5.6v27.2h-5.6v-27.2zm14 0h11.2c5.6 0 8.4 2.8 8.4 8.4 0 4.2-2.8 7-7 8.4l7 10.4h-5.6l-7-10.4H88.2v10.4h-5.6V0zm5.6 5.6v6.8h5.6c2.8 0 4.2-1.4 4.2-3.4 0-2-1.4-3.4-4.2-3.4h-5.6zm19.6-5.6h15.4v5.6h-9.8v5.6h9.8v5.6h-9.8v10.4h-5.6V0zm21 0h5.6v27.2h-5.6V0zm14 0h5.6l4.2 16.8 4.2-16.8h5.6l-5.6 27.2h-5.6l-4.2-16.8-4.2 16.8h-5.6L142.8 0z"/>
                  </svg>
                </div>
                {/* Entrepreneur Logo SVG */}
                <div className="brand-logo" aria-label="Entrepreneur">
                  <svg viewBox="0 0 140 28" fill="currentColor">
                    <path d="M0 0h12v4.8H4.8v6h6.8v4.8H4.8v6.4h7.2v5.2H0V0zm16.8 11.2h11.2v16h-4.8v-16h-6.4V0h5.6v11.2zm11.2 0h11.2v16h-4.8v-16h-6.4V0h5.6v11.2zm11.2-11.2h11.2c4.8 0 7.2 2.4 7.2 7.2 0 3.6-2.4 6-6 7.2l6 9.6h-4.8l-6-9.6H44v9.6h-4.8V0zm4.8 4.8v5.6h5.6c2.4 0 3.6-1.2 3.6-2.8 0-1.6-1.2-2.8-3.6-2.8H44zm19.6-4.8H72v4.8h-7.6v6h6.8v4.8h-6.8v6.4h7.6v5.2H63.6V0zm16.8 0h11.2v27.2H80.4V0zm4.8 4.8v17.6h0.2l5.4-17.6h-5.6zm11.2 0h11.2V4.8h-5.6V0h5.6v27.2h-5.6V4.8zm11.2 0h11.2v27.2h-4.8V4.8h-6.4V0h5.6v4.8zm11.2-4.8h12v4.8h-7.2v6h6.8v4.8h-6.8v6.4h7.2v5.2h-12V0zm16.8 0h11.2v27.2h-4.8V4.8h-6.4V0h5.6v4.8z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Leaders Slider Section */}
        <section className="leaders-section">
          <div className="leaders-container">
            <h3 className="leaders-title">Industry leaders we worked with</h3>
            <div className="leaders-slider-container">
              <div className="leaders-slide-track">
                {[...INDUSTRY_LEADERS, ...INDUSTRY_LEADERS, ...INDUSTRY_LEADERS, ...INDUSTRY_LEADERS].map((leader, index) => (
                  <div key={index} className="leader-item">
                    <img src={leader.img} alt={`${leader.first} ${leader.last}`} className="leader-avatar" />
                    <div className="leader-name-container">
                      <span className="leader-first-name">{leader.first}</span>
                      <span className="leader-last-name">{leader.last}</span>
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
              <h2 className="problems-subtitle">You run a busy factory. So why is growth still so hard?</h2>
              <p className="problems-intro-desc">
                After meeting hundreds of manufacturers (from a 500 sq. ft. tool room to plants spread across acres), we found the same key problems, again and again. Read them honestly. If even one sounds like your company, it is worth a conversation.
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
                If even one of these sounds like your company, you do not have a marketing problem. You have a structure problem. And structure is exactly what we build.
              </p>
              <a href="#consultation" className="btn-problems-cta">
                Book a GTM Readiness Conversation
              </a>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section id="system" className="system-section">
          <div className="system-container">
            <div className="system-header">
              <h2 className="system-title">Meet Buyers Where they are</h2>
              <p className="system-desc-text">
                To succeed today, Manufacturing leaders need to tailor their communication strategies to buyer Behaviour and focus on driving Profitable and capital efficient growth.
              </p>
            </div>
            <div className="system-roadmap">
              {/* Step 1 */}
              <div className="roadmap-item">
                <div className="roadmap-node">01</div>
                <div className="roadmap-card" style={{ transitionDelay: "0ms" }}>
                  <span className="roadmap-pillar">PILLAR 1</span>
                  <h3 className="roadmap-card-title">WE BRAINSTORM</h3>
                  <p className="roadmap-card-focus">Understanding your business before marketing it.</p>
                  <p className="roadmap-card-subtitle">What happens here</p>
                  <ul className="roadmap-card-list">
                    <li>Deep-dive sessions with founders and leadership.</li>
                    <li>Identify your strongest capabilities, differentiators, and success stories.</li>
                    <li>Map your ideal customers, industries, and growth opportunities.</li>
                    <li>Extract years of expertise that currently live only inside your team.</li>
                  </ul>
                </div>
              </div>

              {/* Step 2 */}
              <div className="roadmap-item">
                <div className="roadmap-node">02</div>
                <div className="roadmap-card" style={{ transitionDelay: "150ms" }}>
                  <span className="roadmap-pillar">PILLAR 2</span>
                  <h3 className="roadmap-card-title">WE ALIGN</h3>
                  <p className="roadmap-card-focus">Creating a clear growth and communication strategy.</p>
                  <p className="roadmap-card-subtitle">What happens here</p>
                  <ul className="roadmap-card-list">
                    <li>Define your positioning in the market.</li>
                    <li>Align content with business goals and sales objectives.</li>
                    <li>Build a LinkedIn and GTM roadmap tailored to your company.</li>
                    <li>Establish a consistent message across all customer touchpoints.</li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="roadmap-item">
                <div className="roadmap-node">03</div>
                <div className="roadmap-card" style={{ transitionDelay: "300ms" }}>
                  <span className="roadmap-pillar">PILLAR 3</span>
                  <h3 className="roadmap-card-title">WE CURATE</h3>
                  <p className="roadmap-card-focus">Turning expertise into visibility and opportunities.</p>
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
            <p className="services-subtitle">Durable-First B2B Manufacturing Growth Offerings</p>
            
            <div className="services-grid">
              {/* Card 1: GTM Standardization */}
              <div className="service-card" style={{ transitionDelay: "0ms" }}>
                <div>
                  <span className="service-badge-project">One-Time Project</span>
                  <h3 className="service-title-text">Go-To-Market (GTM) Standardization</h3>
                  <p className="service-focus-text">Making Your Factory Meeting-Ready in 30 Days</p>
                  <div className="service-body">
                    <p className="service-desc">
                      Standardizes your marketing and sales assets so you can present capabilities instantly to Tier 1 and OEM buyers.
                    </p>
                    <ul className="service-list">
                      <li>Custom Capabilities Deck (shop-floor focused)</li>
                      <li>High-Definition Corporate Video Walkthrough</li>
                      <li>Case Studies and Pitch Assets templates</li>
                    </ul>
                  </div>
                </div>
                <div className="service-footer">
                  <a href="#consultation" className="btn-service">Book a GTM Readiness Conversation</a>
                </div>
              </div>

              {/* Card 2: Reputation Management */}
              <div className="service-card recommended" style={{ transitionDelay: "150ms" }}>
                <div className="recommended-badge">Recommended default</div>
                <div>
                  <span className="service-badge-retainer">Ongoing Retainer</span>
                  <h3 className="service-title-text">Reputation Management</h3>
                  <p className="service-focus-text">Hands-Free Monthly Credibility Engine</p>
                  <div className="service-body">
                    <p className="service-desc">
                      Maintains constant market visibility and builds long-term authority among foreign buyers, procurement heads, and OEMs.
                    </p>
                    <ul className="service-list">
                      <li>B2B LinkedIn authority positioning</li>
                      <li>Continuous case studies and shop-floor storytelling</li>
                      <li>Active reach out and connection building</li>
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
                  <h3 className="service-title-text">Lead Nurturing</h3>
                  <p className="service-focus-text">Active Pipeline Building & Filtering</p>
                  <div className="service-body">
                    <p className="service-desc">
                      For operationally stable factories ready to handle new buyers. We run active nurturing campaigns and filter inquiries.
                    </p>
                    <ul className="service-list">
                      <li>End-to-end GTM campaign execution</li>
                      <li>Buyer inquiry pre-qualification and vetting</li>
                      <li>Direct pipeline hand-off to your sales desk</li>
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
              Score your marketing. Be brutally honest — this is for you.
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

        {/* Companies We Worked With Section */}
        <section className="companies-section">
          <div className="companies-container">
            <h3 className="companies-title">Companies we worked with</h3>
            
            {/* Slider 1: Right-to-Left */}
            <div className="companies-slider-container">
              <div className="companies-slide-track">
                {[...COMPANIES_LIST, ...COMPANIES_LIST, ...COMPANIES_LIST, ...COMPANIES_LIST].map((company, index) => (
                  <div key={index} className="company-logo" aria-label={company.name}>
                    <img src={company.logo} alt={company.name} className="company-logo-img" />
                  </div>
                ))}
              </div>
            </div>

            {/* Slider 2: Left-to-Right (Reverse) */}
            <div className="companies-slider-container reverse-slider" style={{ marginTop: "20px" }}>
              <div className="companies-slide-track-reverse">
                {[...COMPANIES_LIST_2, ...COMPANIES_LIST_2, ...COMPANIES_LIST_2, ...COMPANIES_LIST_2].map((company, index) => (
                  <div key={index} className="company-logo" aria-label={company.name}>
                    <img src={company.logo} alt={company.name} className="company-logo-img" />
                  </div>
                ))}
              </div>
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
