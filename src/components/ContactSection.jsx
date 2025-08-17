import { motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { getApiUrl, API_CONFIG } from '../config/api.js';

const ContactSection = ({ shouldReduceMotion }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoized animation variants for performance
  const fadeInUp = useMemo(
    () => ({
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: shouldReduceMotion ? 0.3 : 0.8, ease: "easeOut" },
    }),
    [shouldReduceMotion]
  );

  const staggerContainer = useMemo(
    () => ({
      animate: {
        transition: {
          staggerChildren: shouldReduceMotion ? 0.05 : 0.1,
        },
      },
    }),
    [shouldReduceMotion]
  );

  // Form handlers
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.CONTACT), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to send message');
        }

        // Success - Reset form
        setFormData({ name: "", email: "", project: "" });
        alert(
          "🎉 Message sent successfully!\n\n" +
          "✅ Admin notification sent\n" +
          "✅ Confirmation email sent to you\n" +
          "✅ We'll respond within 24 hours\n\n" +
          "Thank you for choosing CodeForge!"
        );

      } catch (error) {
        console.error("Email sending failed:", error);
        alert(
          "❌ Failed to send message.\n\n" +
          "Please try again or contact us directly at:\n" +
          "info@thecodeforge.dev"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  ); return (
    <div id="contact" className="bg-white contact-section">
      <div className="contact-container">
        <motion.div
          className="contact-header"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp}>
            <span className="contact-badge">Get In Touch</span>
          </motion.div>
          <motion.h2 className="contact-title" variants={fadeInUp}>
            Let's Create Something
            <span className="contact-title-gradient">Amazing Together</span>
          </motion.h2>
          <motion.p className="contact-description" variants={fadeInUp}>
            Ready to transform your ideas into reality? Share your vision with
            us and let's bring it to life.
          </motion.p>
        </motion.div>

        <motion.div
          className="contact-content"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Contact Form */}
          <motion.div className="contact-form-container" variants={fadeInUp}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="project" className="form-label">
                  Project Description
                </label>
                <textarea
                  id="project"
                  name="project"
                  className="form-textarea"
                  placeholder="Tell us about your project, ideas, or how we can help you..."
                  rows="6"
                  value={formData.project}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="contact-submit-btn"
                disabled={isSubmitting}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg
                      style={{ width: "20px", height: "20px" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div className="contact-info" variants={fadeInUp}>
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3>Email Us</h3>
              <p>info@codeforge.dev</p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3>Response Time</h3>
              <p>Within 24 hours</p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3>Project Start</h3>
              <p>2-3 business days</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
