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
            <div className="footer-social">
              <motion.a
                href="#"
                className="social-link"
                whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                className="social-link"
                whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                className="social-link"
                whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                className="social-link"
                whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
            </div>
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
                <span>info@codeforge.dev</span>
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
                <span>+1 (555) 123-4567</span>
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
                <span>San Francisco, CA</span>
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
