import React, { useState } from "react";

export default function Footer({ handleSmoothScroll }) {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="footer">
        <div className="footer-grid-container">
          <div className="footer-column brand-col">
            <div className="footer-brand">
              <img src="/assets/communic8-logo.png" alt="Communic8 Logo" className="footer-brand-logo" />
            </div>
            <p className="footer-tagline">Installing defined marketing and GTM processes for Indian Manufacturing MSMEs.</p>
            <div className="footer-socials">
              <a 
                href="https://www.instagram.com/communic8_digital/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-icon-link" 
                aria-label="Communic8 Instagram"
              >
                <svg viewBox="0 0 24 24" className="footer-social-svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/99936379/admin/dashboard/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-icon-link" 
                aria-label="Communic8 LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="footer-social-svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
            <button className="btn-privacy-link" onClick={() => setPrivacyOpen(true)}>
              Privacy Policy
            </button>
          </div>
          
          <div className="footer-column links-col">
            <h4 className="footer-col-title">Our Services</h4>
            <ul className="footer-services-list">
              <li>
                <a href="#services" onClick={(e) => handleSmoothScroll(e, "#services")}>
                  Go-To-Market (GTM) Execution
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleSmoothScroll(e, "#services")}>
                  Reputation Management
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleSmoothScroll(e, "#services")}>
                  Lead Nurturing
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-column address-col">
            <h4 className="footer-col-title">Pune Office</h4>
            <p className="footer-address-text">
              Office no.601, Brand Square, Kunal Icon Rd, near Kunjir chowk, Roseland Residency, Pimple Saudagar, Pimpri-Chinchwad, Pune, Maharashtra 411027
            </p>
            
            <h4 className="footer-col-title second-title">Nasik Office (Reg.)</h4>
            <p className="footer-address-text">
              Enabling Fundamentals Private Limited, 607/0227/32/01, B/H BYTCO FACTORY, GANDHARVA NAGARI, NASHIK ROAD, Nashik, Maharashtra 422101
            </p>
          </div>
          
          <div className="footer-column contact-col">
            <h4 className="footer-col-title">Get in Touch</h4>
            <p className="footer-contact-item">
              <span className="contact-label">Email:</span>
              <a href="mailto:connect@communic8.digital" className="contact-link">connect@communic8.digital</a>
            </p>
            <p className="footer-contact-item">
              <span className="contact-label">Phone:</span>
              <a href="tel:+918080003164" className="contact-link">+91 808-000-3164</a>
            </p>
          </div>
        </div>
        
        <div className="footer-bottom-divider"></div>
        
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} COMMUNIC8. All rights reserved.</p>
          <div className="footer-links">
            <a href="#problems" onClick={(e) => handleSmoothScroll(e, "#problems")}>The Problems</a>
            <a href="#system" onClick={(e) => handleSmoothScroll(e, "#system")}>Our System</a>
            <a href="#services" onClick={(e) => handleSmoothScroll(e, "#services")}>Services</a>
            <a href="#playbook" onClick={(e) => handleSmoothScroll(e, "#playbook")}>Our Work</a>
            <a href="#founder" onClick={(e) => handleSmoothScroll(e, "#founder")}>Our Team</a>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {privacyOpen && (
        <div className="privacy-modal-overlay">
          <div className="privacy-modal-content">
            <div className="privacy-modal-header">
              <h3>Privacy Policy</h3>
              <button className="btn-privacy-close-top" onClick={() => setPrivacyOpen(false)} aria-label="Close Modal">×</button>
            </div>
            <div className="privacy-modal-body" data-lenis-prevent>
              <h4>01. Who We Are</h4>
              <p>Communic8 (referred to as "we," "us," or "the Company") operates to provide communication solutions while ensuring the privacy and security of personal data.</p>
              
              <h4>02. Information We Collect</h4>
              <p><strong>(A) Personal Data Provided by You</strong></p>
              <p>We collect personal data when you:</p>
              <ul>
                <li>Register for our services.</li>
                <li>Contact us via forms, email, or phone.</li>
                <li>Apply for job vacancies.</li>
              </ul>
              <p>Examples of data collected:</p>
              <ul>
                <li>Name, email address, phone number, and company details.</li>
                <li>Preferences for receiving marketing communications.</li>
              </ul>
              
              <h4>03. How We Use Your Data</h4>
              <p>We use your data to:</p>
              <ul>
                <li>Provide and improve our services.</li>
                <li>Respond to your inquiries or support requests.</li>
                <li>Personalize your user experience.</li>
                <li>Send marketing and promotional communications (with your consent).</li>
                <li>Comply with legal obligations.</li>
              </ul>
              
              <h4>04. Sharing Your Data</h4>
              <p>We do not sell or rent your personal data. However, we may share data:</p>
              <ul>
                <li>With service providers and partners to enhance our services.</li>
                <li>To comply with legal or regulatory obligations.</li>
                <li>During business transfers (e.g., mergers or acquisitions).</li>
              </ul>
              
              <h4>05. Data Retention</h4>
              <p>We retain personal data only as long as necessary to fulfill the purposes outlined in this policy or comply with legal requirements.</p>
              
              <h4>06. Cookies and Tracking Technologies</h4>
              <p>We use cookies to:</p>
              <ul>
                <li>Enhance website functionality.</li>
                <li>Understand user behavior and improve services.</li>
                <li>Provide targeted advertisements.</li>
              </ul>
              <p>You can manage cookie preferences in your browser settings.</p>
              
              <h4>07. Your Rights</h4>
              <p>Under applicable laws, you have the right to:</p>
              <ul>
                <li>Access, correct, or delete your personal data.</li>
                <li>Object to data processing.</li>
                <li>Withdraw consent for marketing communications.</li>
                <li>Request data portability.</li>
              </ul>
              <p>To exercise these rights, contact us at <strong>connect@communic8.digital</strong>.</p>
              
              <h4>08. Data Security</h4>
              <p>We implement robust security measures, including encryption and firewalls, to protect your data. However, no online system is entirely secure, and we encourage users to take precautions when sharing personal information.</p>
              
              <h4>09. Children’s Privacy</h4>
              <p>Our services are not directed at children under 16. We do not knowingly collect data from children.</p>
              
              <h4>10. Changes to This Privacy Policy</h4>
              <p>We may update this Privacy Policy periodically. Significant changes will be communicated via email or a notice on our website.</p>
              
              <h4>11. Contact Us</h4>
              <p>For questions or concerns about this Privacy Policy, please contact:</p>
              <p>
                <strong>Communic8</strong><br />
                Enabling Fundamentals Private Limited, 607/0227/32/01, B/H BYTCO FACTORY, GANDHARVA NAGARI, NASHIK ROAD, Nashik, Maharashtra, 422101
              </p>
              <p>
                Email: <strong>connect@communic8.digital</strong><br />
                Phone: <strong>+91 808-000-3164</strong>
              </p>
            </div>
            <div className="privacy-modal-footer">
              <button className="btn-privacy-close" onClick={() => setPrivacyOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
