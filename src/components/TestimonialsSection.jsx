import { motion } from "framer-motion";
import { useMemo } from "react";

const TestimonialsSection = ({ shouldReduceMotion }) => {
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

  const testimonials = [
    {
      name: "Medsaad",
      // position: "CEO, TechStart Inc.",
      // company: "TechStart",
      avatar: "MS",
      rating: 5,
      testimonial:
        "CodeForge built us a lightning-fast bot that finds new SOL tokens before anyone else and sends them straight to our Telegram.",
      project: "Crypto Monitor Bot",
    },
    {
      name: "Dirk Ahlemeyer",
      // position: "CTO, InnovateLabs",
      // company: "InnovateLabs",
      avatar: "DA",
      rating: 5,
      testimonial:
        "CodeForge built my OnlyGoodReviews, a platform where businesses sign up to collect reviews and showcase only the best ones with ease. ",
      project: "Web Application",
    },
    {
      name: "Jullien Pouget",
      // position: "Founder, GreenTech Solutions",
      // company: "GreenTech",
      avatar: "JP",
      rating: 5,
      testimonial:
        "CodeForge built AbuBeast, a cutting-edge Web3 trading platform with multi-chain support, automated trading, advanced analytics, and real-time portfolio management.",
      project: "Web Application + Trading Engine",
    },
    {
      name: "Kas",
      // position: "Product Manager, CloudFlow",
      // company: "CloudFlow",
      avatar: "K",
      rating: 5,
      testimonial:
        "CodeForge built the Tech Revisor Automation Suite, a powerful MERN-based CRM + ERP with no-code workflow automation, AI assistant, and full AWS deployment.",
      project: "ERP System",
    },
    {
      name: "Phillip Johnson",
      // position: "Creative Director, DesignStudio",
      // company: "DesignStudio",
      avatar: "PJ",
      rating: 5,
      testimonial:
        "A bot to scrape the data and contact info of political candidates in the US, and then adding them to a database for easy access and outreach.",
      project: "Lead Generation Pipeline",
    },
    {
      name: "Maratib Lashari",
      // position: "E-commerce Director, RetailPlus",
      // company: "RetailPlus",
      avatar: "ML",
      rating: 5,
      testimonial:
        "CodeForge built PBS’s Next.js portfolio site, showcasing their projects, services, and story with engaging design plus contact and property alert features.",
      project: "PBS NYC",
    },
  ];

  return (
    <div className="testimonials-section">
      <div className="testimonials-pattern" />

      <div className="testimonials-container">
        <motion.div
          className="testimonials-header"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp}>
            <span className="testimonials-badge">Client Stories</span>
          </motion.div>
          <motion.h2 className="testimonials-title" variants={fadeInUp}>
            What Our Clients
            <span className="testimonials-title-gradient">Say About Us</span>
          </motion.h2>
          <motion.p className="testimonials-description" variants={fadeInUp}>
            Hear from the innovators, entrepreneurs, and visionaries who have
            trusted CodeForge to bring their ideas to life.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="testimonials-grid"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              className="testimonial-card"
              variants={fadeInUp}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      y: -10,
                      scale: 1.02,
                      rotateX: 2,
                      transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? {}
                  : { scale: 0.98, transition: { duration: 0.1 } }
              }
            >
              <div className="testimonial-card-glow" />

              {/* Rating Stars */}
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, starIndex) => (
                  <motion.svg
                    key={starIndex}
                    className="testimonial-star"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.1 + starIndex * 0.1,
                      duration: 0.3,
                    }}
                    viewport={{ once: true }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="testimonial-text">
                "{testimonial.testimonial}"
              </blockquote>

              {/* Project Tag */}
              <div className="testimonial-project">
                <svg
                  className="testimonial-project-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                <span>{testimonial.project}</span>
              </div>

              {/* Client Info */}
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  <div className="testimonial-avatar-bg">
                    <span className="testimonial-avatar-text">
                      {testimonial.avatar}
                    </span>
                  </div>
                </div>
                <div className="testimonial-author-info">
                  <h4 className="testimonial-author-name">
                    {testimonial.name}
                  </h4>
                  <p className="testimonial-author-position">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials CTA */}
        <motion.div
          className="testimonials-cta-section"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.3 : 0.8,
            delay: shouldReduceMotion ? 0 : 0.2,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
        >
          <div className="testimonials-cta-container">
            <h3 className="testimonials-cta-title">
              Ready to Join Our Success Stories?
            </h3>
            <p className="testimonials-cta-description">
              Let's create something amazing together and add your story to our
              collection of successful projects.
            </p>
            <motion.button
              className="testimonials-cta-button"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0.2 : 0.5,
                delay: shouldReduceMotion ? 0 : 0.3,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(255, 127, 0, 0.3)",
                      transition: { duration: 0.3 },
                    }
              }
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <span>Start Your Project</span>
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
