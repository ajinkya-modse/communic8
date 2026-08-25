import React, { useState } from "react";
import { CALENDLY_URL } from "../data/landingData";

export default function Footer({ handleSmoothScroll }) {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="footer" id="footer">
        <div className="footer-panel">
          <div className="footer-grid-container">
            <div className="footer-column brand-col">
              <h2 className="footer-statement">Make every<br />growth move<br /><em>count.</em></h2>
              <p className="footer-copyright">© {new Date().getFullYear()} Communic8. All rights reserved.</p>
            </div>

            <nav className="footer-column links-col" aria-label="Services">
            <h3 className="footer-col-title">Navigation</h3>
            <ul className="footer-services-list">
              <li><a href="#problems" onClick={(e) => handleSmoothScroll(e, "#problems")}>The Problems</a></li>
              <li><a href="#system" onClick={(e) => handleSmoothScroll(e, "#system")}>Our System</a></li>
              <li><a href="#services" onClick={(e) => handleSmoothScroll(e, "#services")}>Services</a></li>
              <li><a href="#playbook" onClick={(e) => handleSmoothScroll(e, "#playbook")}>Our Work</a></li>
            </ul>
            </nav>

          <nav className="footer-column footer-explore" aria-label="Support">
            <h3 className="footer-col-title">Support</h3>
            <ul className="footer-services-list">
              <li><a href="#founder" onClick={(e) => handleSmoothScroll(e, "#founder")}>Our Team</a></li>
              <li><a href="mailto:connect@communic8.digital">Contact us</a></li>
              <li><button className="btn-privacy-link" onClick={() => setPrivacyOpen(true)}>Privacy Policy</button></li>
            </ul>
          </nav>

            <div className="footer-column address-col">
              <h3 className="footer-col-title">Our offices</h3>
              <div className="footer-office">
                <span className="footer-office-city">Pune</span>
                <p className="footer-address-text">Office no. 601, Brand Square, Kunal Icon Rd, near Kunjir chowk, Pimple Saudagar, Pune, Maharashtra 411027</p>
              </div>
              <div className="footer-office">
                <span className="footer-office-city">Nashik <small>(Registered)</small></span>
                <p className="footer-address-text">Enabling Fundamentals Private Limited, Gandharva Nagari, Nashik Road, Nashik, Maharashtra 422101</p>
              </div>
            </div>

            <div className="footer-column contact-col">
              <h3 className="footer-col-title">Ready when you are</h3>
              <p className="footer-cta-copy">Turn your marketing into a predictable revenue engine.</p>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="footer-cta-link">
                Book a strategy call <span aria-hidden="true">↗</span>
              </a>
              <div className="footer-direct-contact">
                <a href="mailto:connect@communic8.digital">connect@communic8.digital</a>
                <a href="tel:+918080003164">+91 808-000-3164</a>
              </div>
              <div className="footer-socials" aria-label="Follow Communic8">
                <a href="https://www.instagram.com/communic8_digital/" target="_blank" rel="noopener noreferrer" className="footer-social-icon-link" aria-label="Communic8 Instagram">IG</a>
                <a href="https://www.linkedin.com/company/99936379/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="footer-social-icon-link" aria-label="Communic8 LinkedIn">in</a>
              </div>
            </div>
          </div>

          <div className="footer-large-logo" aria-hidden="true">
            <img src="/assets/communic8-logo.png" alt="" />
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
