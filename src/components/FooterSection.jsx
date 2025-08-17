import { motion } from "framer-motion";
import { useMemo } from "react";

const FooterSection = ({ shouldReduceMotion, scrollToSection }) => {
  // Memoized animation variants for performance
  const fadeInUp = useMemo(
    () => ({
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: shouldReduceMotion ? 0.3 : 0.8, ease: "easeOut" },
    }),
    [shouldReduceMotion]
  );

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <motion.div
            className="footer-brand"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h3 className="footer-logo">CODEFORGE</h3>
            <p className="footer-tagline">
              Forging the future of technology through code, creativity, and
              boundless imagination.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="footer-links"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-link-list">
              <button
                onClick={() => scrollToSection("#about")}
                className="footer-link"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("#services")}
                className="footer-link"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("#contact")}
                className="footer-link"
              >
                Contact
              </button>
              <a href="#" className="footer-link">
                Portfolio
              </a>
              <a href="#" className="footer-link">
                Blog
              </a>
              <a href="#" className="footer-link">
                Careers
              </a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            className="footer-links"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h4 className="footer-heading">Services</h4>
            <div className="footer-link-list">
              <a href="#" className="footer-link">
                Web Development
              </a>
              <a href="#" className="footer-link">
                Mobile Apps
              </a>
              <a href="#" className="footer-link">
                Cloud Solutions
              </a>
              <a href="#" className="footer-link">
                AI & ML
              </a>
              <a href="#" className="footer-link">
                UI/UX Design
              </a>
              <a href="#" className="footer-link">
                E-commerce
              </a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="footer-contact"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h4 className="footer-heading">Get In Touch</h4>
            <div className="footer-contact-info">
              <div className="contact-item">
                <svg
                  className="contact-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>info@thecodeforge.dev</span>
              </div>
              <div className="contact-item">
                <svg
                  className="contact-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+92 317 4007365</span>
              </div>
              <div className="contact-item">
                <svg
                  className="contact-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>NSTP, Islamabad</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.3 : 0.6,
            delay: shouldReduceMotion ? 0 : 0.2,
          }}
          viewport={{ once: true }}
        >
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>
                &copy; {new Date().getFullYear()} CodeForge. All rights
                reserved.
              </p>
            </div>
            <div className="footer-legal">
              <a href="#" className="legal-link">
                Privacy Policy
              </a>
              <span className="legal-separator">|</span>
              <a href="#" className="legal-link">
                Terms of Service
              </a>
              <span className="legal-separator">|</span>
              <a href="#" className="legal-link">
                Cookie Policy
              </a>
            </div>
          </div>
          <div className="footer-made-with">
            <p>Made by the Team CodeForge</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
