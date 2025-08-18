import { motion } from "framer-motion";
import { useMemo } from "react";

const ServicesSection = ({ shouldReduceMotion, scrollToSection }) => {
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

  const services = [
    {
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
      iconClass: "service-icon-web",
      title: "Web Development",
      description:
        "Modern, responsive websites and web applications built with cutting-edge technologies and best practices.",
      features: [
        "React & Next.js",
        "TypeScript",
        "Performance Optimization",
        "SEO Ready",
      ],
    },
    {
      icon: "M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z",
      iconClass: "service-icon-mobile",
      title: "Mobile Applications",
      description:
        "Native and cross-platform mobile apps that deliver exceptional user experiences across all devices.",
      features: [
        "React Native",
        "iOS & Android",
        "Native Performance",
        "App Store Ready",
      ],
    },
    {
      icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10",
      iconClass: "service-icon-cloud",
      title: "Cloud Solutions",
      description:
        "Scalable cloud infrastructure and DevOps solutions that ensure reliability, security, and performance.",
      features: [
        "AWS & Azure",
        "Docker & Kubernetes",
        "CI/CD Pipelines",
        "Auto Scaling",
      ],
    },
    {
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
      iconClass: "service-icon-ai",
      title: "AI & Machine Learning",
      description:
        "Intelligent solutions powered by AI and machine learning to automate processes and unlock insights.",
      features: [
        "TensorFlow & PyTorch",
        "Computer Vision",
        "NLP & ChatBots",
        "Predictive Analytics",
      ],
    },
    {
      icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2a2 2 0 002-2V5a2 2 0 00-2-2z",
      iconClass: "service-icon-design",
      title: "UI/UX Design",
      description:
        "Beautiful, intuitive designs that create memorable user experiences and drive engagement.",
      features: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Design Systems",
      ],
    },
    {
      icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
      iconClass: "service-icon-ecommerce",
      title: "E-commerce Solutions",
      description:
        "Complete e-commerce platforms that drive sales and provide seamless shopping experiences.",
      features: [
        "Custom Stores",
        "Payment Integration",
        "Inventory Management",
        "Analytics & Reports",
      ],
    },
  ];

  return (
    <div id="services" className="services-section">
      <div className="services-pattern" />

      <div className="services-container">
        <motion.div
          className="services-header"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp}>
            <span className="services-badge">Our Services</span>
          </motion.div>
          <motion.h2 className="services-title" variants={fadeInUp}>
            Digital Solutions
            <span className="services-title-gradient">That Scale</span>
          </motion.h2>
          <motion.p className="services-description" variants={fadeInUp}>
            From concept to deployment, we deliver comprehensive digital
            solutions that drive growth and innovation for your business.
          </motion.p>
        </motion.div>

        {/* Optimized Services Grid */}
        <motion.div
          className="services-grid"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              className="service-card"
              variants={fadeInUp}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      y: -15,
                      scale: 1.03,
                      rotateX: 2,
                      transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? {}
                  : { scale: 0.98, transition: { duration: 0.1 } }
              }
            >
              <div className="service-card-glow" />
              <div className={`service-icon ${service.iconClass}`}>
                <svg
                  style={{ width: "28px", height: "28px", color: "white" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={service.icon}
                  />
                </svg>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-features">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="service-feature">
                    {feature}
                  </div>
                ))}
              </div>
              <div className="service-cta">
                <span>Learn More</span>
                <svg
                  style={{ width: "16px", height: "16px" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section - Optimized */}
        <motion.div
          className="services-cta-section"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.3 : 0.8,
            delay: shouldReduceMotion ? 0 : 0.2,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
        >
          <div className="services-cta-container">
            <h3 className="services-cta-title">
              Ready to Transform Your Ideas?
            </h3>
            <p className="services-cta-description">
              Let's discuss how we can bring your vision to life with our
              cutting-edge solutions.
            </p>
            <motion.button
              onClick={() => scrollToSection("#contact")}
              className="services-cta-button"
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
              <span>Get Started</span>
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesSection;
