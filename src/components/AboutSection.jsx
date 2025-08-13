import { motion } from "framer-motion";
import { useMemo } from "react";

const AboutSection = ({ shouldReduceMotion }) => {
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

  const cardHover = useMemo(
    () =>
      shouldReduceMotion
        ? {}
        : {
            y: -20,
            scale: 1.05,
            rotateX: 5,
            transition: { duration: 0.2, ease: "easeOut" },
          },
    [shouldReduceMotion]
  );

  return (
    <div id="about" className="about-section">
      <div className="about-pattern" />

      <div className="about-container">
        <motion.div
          className="about-header"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp}>
            <span className="about-badge">About CodeForge</span>
          </motion.div>
          <motion.h2 className="about-title" variants={fadeInUp}>
            Crafting Digital
            <span className="about-title-gradient">Excellence</span>
          </motion.h2>
          <motion.p className="about-description" variants={fadeInUp}>
            Where innovation meets craftsmanship. We forge the future of
            technology through code, creativity, and boundless imagination.
          </motion.p>
        </motion.div>

        {/* Optimized Cards Grid */}
        <motion.div
          className="cards-grid"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Mission Card */}
          <motion.div
            className="card"
            variants={fadeInUp}
            whileHover={cardHover}
            whileTap={
              shouldReduceMotion
                ? {}
                : { scale: 0.98, transition: { duration: 0.1 } }
            }
          >
            <div className="card-icon card-icon-blue">
              <svg
                style={{ width: "24px", height: "24px", color: "white" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="card-title">Our Mission</h3>
            <p className="card-text">
              To empower developers and businesses with cutting-edge solutions
              that transform ideas into digital reality.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            className="card"
            variants={fadeInUp}
            whileHover={cardHover}
            whileTap={
              shouldReduceMotion
                ? {}
                : { scale: 0.98, transition: { duration: 0.1 } }
            }
          >
            <div className="card-icon card-icon-purple">
              <svg
                style={{ width: "24px", height: "24px", color: "white" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h3 className="card-title">Our Vision</h3>
            <p className="card-text">
              A world where technology seamlessly enhances human potential and
              creates meaningful connections.
            </p>
          </motion.div>

          {/* Values Card */}
          <motion.div
            className="card"
            variants={fadeInUp}
            whileHover={cardHover}
            whileTap={
              shouldReduceMotion
                ? {}
                : { scale: 0.98, transition: { duration: 0.1 } }
            }
          >
            <div className="card-icon card-icon-pink">
              <svg
                style={{ width: "24px", height: "24px", color: "white" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="card-title">Our Values</h3>
            <p className="card-text">
              Innovation, integrity, and excellence drive everything we do. We
              believe in building with purpose and passion.
            </p>
          </motion.div>
        </motion.div>

        {/* Quote Section - Optimized */}
        <motion.div
          className="quote-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.3 : 0.7,
            delay: shouldReduceMotion ? 0 : 0.2,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
        >
          <div className="quote-container">
            <svg
              className="quote-icon quote-icon-left"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
            </svg>
            <blockquote className="quote-text">
              "Code is poetry written in logic. At CodeForge, we craft verses
              that change the world."
            </blockquote>
            <svg
              className="quote-icon quote-icon-right"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
            </svg>
          </div>
          <motion.div
            className="quote-line"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0.3 : 0.8,
              delay: shouldReduceMotion ? 0 : 0.3,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          >
            <div className="quote-line-gradient" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
