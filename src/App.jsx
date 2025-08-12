import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Lenis from "lenis";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const shouldReduceMotion = useReducedMotion(); // reduce motion
  const { scrollY } = useScroll();
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  console.log("🚀 ~ App ~ isMobile:", isMobile);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const typingTimeoutRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const lenisRef = useRef(null);

  const words = useMemo(() => ["WEBSITES", "AUTOMATION SCRIPTS", "APPS"], []);

  // Mobile detection hook
  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(
          userAgent
        );
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Optimized scroll effects with springs for smoother animation with Lenis
  const heroOpacity = useSpring(useTransform(scrollY, [0, 200], [1, 0]), {
    damping: 40,
    stiffness: 300,
    restDelta: 0.001,
  });
  const heroY = useSpring(useTransform(scrollY, [0, 400], [0, -200]), {
    damping: 40,
    stiffness: 300,
    restDelta: 0.001,
  });

  // Optimized typing animation with proper cleanup
  useEffect(() => {
    const currentWord = words[currentWordIndex];

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (isTyping) {
      if (typedText.length < currentWord.length) {
        typingTimeoutRef.current = setTimeout(
          () => {
            setTypedText(currentWord.slice(0, typedText.length + 1));
          },
          shouldReduceMotion ? 20 : 50
        );
      } else {
        typingTimeoutRef.current = setTimeout(
          () => {
            setIsTyping(false);
          },
          shouldReduceMotion ? 500 : 1500
        );
      }
    } else {
      if (typedText.length > 0) {
        typingTimeoutRef.current = setTimeout(
          () => {
            setTypedText(typedText.slice(0, -1));
          },
          shouldReduceMotion ? 20 : 50
        );
      } else {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsTyping(true);
      }
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [typedText, currentWordIndex, isTyping, words, shouldReduceMotion]);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    if (shouldReduceMotion) return; // Skip smooth scrolling if user prefers reduced motion

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Animation frame loop for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, [shouldReduceMotion]);

  // Optimized scroll management with Lenis integration
  useEffect(() => {
    // Disable scrolling initially
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
    document.body.style.overflow = "hidden";

    // Enable scrolling after hero animations complete
    const enableScrollTimeout = setTimeout(
      () => {
        if (lenisRef.current) {
          lenisRef.current.start();
        }
        document.body.style.overflow = "auto";
        setScrollEnabled(true);
        setShowScrollIndicator(true);

        // Hide scroll indicator after delay
        scrollTimeoutRef.current = setTimeout(() => {
          setShowScrollIndicator(false);
        }, 3000);
      },
      shouldReduceMotion ? 2000 : 5800
    );

    return () => {
      clearTimeout(enableScrollTimeout);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.start();
      }
      document.body.style.overflow = "auto";
    };
  }, [shouldReduceMotion]);

  // Throttled scroll indicator hide with Lenis integration
  useEffect(() => {
    let isThrottled = false;

    const handleScroll = (latest) => {
      if (!isThrottled && latest > 10) {
        setShowScrollIndicator(false);
        isThrottled = true;
      }
    };

    // Handle scroll events from both Framer Motion and Lenis
    const unsubscribe = scrollY.on("change", handleScroll);

    // Also listen to Lenis scroll events for better integration
    const handleLenisScroll = () => {
      if (lenisRef.current && lenisRef.current.scroll > 10) {
        setShowScrollIndicator(false);
      }
    };

    if (lenisRef.current) {
      lenisRef.current.on("scroll", handleLenisScroll);
    }

    return () => {
      unsubscribe();
      if (lenisRef.current) {
        lenisRef.current.off("scroll", handleLenisScroll);
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [scrollY]);

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

  // Smooth scroll to section function using Lenis
  const scrollToSection = useCallback((selector) => {
    if (lenisRef.current) {
      // Special case for landing video - scroll to top
      if (selector === "#landing-video") {
        lenisRef.current.scrollTo(0, {
          duration: 2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        return;
      }

      const element = document.querySelector(selector);
      if (element) {
        lenisRef.current.scrollTo(element, {
          duration: 2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }
  }, []);

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
        // Send email using EmailJS (client-side email service)
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Reset form
          setFormData({ name: "", email: "", project: "" });
          alert("Message sent successfully! We'll get back to you soon.");
        } else {
          throw new Error("Failed to send message");
        }
      } catch (error) {
        console.error("Error sending message:", error);
        alert(
          "Failed to send message. Please try again or contact us directly."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  return (
    <>
      {/* Sleek Navigation Bar - Optimized animations */}
      <motion.nav
        className="navbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: shouldReduceMotion ? 1 : 6.5,
          duration: shouldReduceMotion ? 0.3 : 1.0,
          ease: "easeOut",
        }}
      >
        <div style={{ position: "relative" }}>
          <div className="navbar-blur" />
          <div className="nav-content">
            <div className="nav-inner">
              <motion.button
                className="cursor-pointer logo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: shouldReduceMotion ? 1.2 : 7,
                  duration: shouldReduceMotion ? 0.3 : 0.8,
                }}
                onClick={() => scrollToSection("#landing-video")}
              >
                CODEFORGE
              </motion.button>
              <motion.div
                className="nav-links"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: shouldReduceMotion ? 1.4 : 7.2,
                  duration: shouldReduceMotion ? 0.3 : 0.8,
                }}
              >
                <button
                  onClick={() => scrollToSection("#services")}
                  className="nav-link"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("#about")}
                  className="nav-link"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("#contact")}
                  className="nav-link"
                >
                  Contact
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>{" "}
      {/* Video Background */}
      <video
        className="video-background"
        autoPlay
        muted
        loop
        playsInline
        id="landing-video"
        key={isMobile ? "mobile" : "desktop"} // Force re-render when device type changes
      >
        <source
          src={isMobile ? "/landing-page-mobile.mp4" : "/landing-page.webm"}
          type={isMobile ? "video/mp4" : "video/webm"}
        />
        <source src="/landing-page.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Hero Content - Optimized animations */}
      <div className="hero-container">
        <motion.div
          className="hero-content"
          style={{
            opacity: heroOpacity,
            y: heroY,
            willChange: scrollEnabled ? "transform, opacity" : "auto",
          }}
        >
          <motion.h1
            className="hero-title text-white drop-shadow-2xl shadow-black/80 text-stroke"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: shouldReduceMotion ? 0.5 : 3.5,
              duration: shouldReduceMotion ? 0.5 : 1.2,
              ease: [0.23, 1, 0.32, 1],
            }}
            // style={{
            //   textShadow:
            //     "0 0 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7), 2px 2px 8px rgba(0,0,0,1)",
            // }}
          >
            CODEFORGE
          </motion.h1>
          <motion.p
            className="hero-subtitle text-white/95 drop-shadow-xl shadow-black/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: shouldReduceMotion ? 0.8 : 4.8,
              duration: shouldReduceMotion ? 0.5 : 1.0,
              ease: [0.23, 1, 0.32, 1],
            }}
            // style={{
            //   textShadow:
            //     "0 0 15px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.6), 1px 1px 6px rgba(0,0,0,0.9)",
            // }}
          >
            Your ideas forged into{" "}
            <span
              className="typing-text text-orange-400 font-semibold drop-shadow-lg"
              style={{
                textShadow:
                  "0 0 20px rgba(255,127,0,0.8), 0 0 40px rgba(255,127,0,0.4), 2px 2px 8px rgba(0,0,0,1)",
              }}
            >
              {typedText}
            </span>
            <span
              className="typing-cursor text-orange-400"
              style={{
                textShadow:
                  "0 0 15px rgba(255,127,0,0.8), 2px 2px 6px rgba(0,0,0,1)",
              }}
            >
              |
            </span>
          </motion.p>
        </motion.div>

        {/* Scroll Indicator - Optimized animations */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: showScrollIndicator ? 1 : 0,
            y: showScrollIndicator ? 0 : 20,
          }}
          transition={{
            duration: shouldReduceMotion ? 0.3 : 0.8,
            ease: "easeOut",
          }}
        >
          <motion.div
            className="scroll-indicator-content"
            animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
            transition={{
              repeat: shouldReduceMotion ? 0 : Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            <div
              className="scroll-text text-white/90 drop-shadow-lg font-medium"
              style={{
                textShadow:
                  "0 0 10px rgba(0,0,0,0.8), 1px 1px 4px rgba(0,0,0,1)",
              }}
            >
              Scroll
            </div>
            <motion.div
              className="scroll-mouse"
              initial={{ opacity: 0.7 }}
              animate={shouldReduceMotion ? {} : { opacity: [0.7, 1, 0.7] }}
              transition={{
                repeat: shouldReduceMotion ? 0 : Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="scroll-dot"
                animate={shouldReduceMotion ? {} : { y: [0, 12, 0] }}
                transition={{
                  repeat: shouldReduceMotion ? 0 : Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <motion.svg
              style={{
                width: "16px",
                height: "16px",
                color: "rgba(255, 255, 255, 0.5)",
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={shouldReduceMotion ? {} : { y: [0, 4, 0] }}
              transition={{
                repeat: shouldReduceMotion ? 0 : Infinity,
                duration: 2,
                ease: "easeInOut",
                delay: 0.2,
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>
      {/* About Us Section - Optimized animations */}
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
      {/* Services Section - Optimized animations */}
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
            {[
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
            ].map((service) => (
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
      {/* Testimonials Section - Optimized animations */}
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
            {[
              {
                name: "Sarah Chen",
                position: "CEO, TechStart Inc.",
                company: "TechStart",
                avatar: "SC",
                rating: 5,
                testimonial:
                  "CodeForge transformed our vision into a stunning web application that exceeded all expectations. Their attention to detail and innovative approach helped us launch ahead of schedule.",
                project: "E-commerce Platform",
              },
              {
                name: "Marcus Rodriguez",
                position: "CTO, InnovateLabs",
                company: "InnovateLabs",
                avatar: "MR",
                rating: 5,
                testimonial:
                  "Working with CodeForge was a game-changer. They delivered a robust mobile app that perfectly captured our brand identity and user experience goals.",
                project: "Mobile Application",
              },
              {
                name: "Emily Watson",
                position: "Founder, GreenTech Solutions",
                company: "GreenTech",
                avatar: "EW",
                rating: 5,
                testimonial:
                  "The team's expertise in AI and machine learning helped us create solutions we never thought possible. Truly exceptional work and communication throughout.",
                project: "AI-Powered Analytics",
              },
              {
                name: "David Kim",
                position: "Product Manager, CloudFlow",
                company: "CloudFlow",
                avatar: "DK",
                rating: 5,
                testimonial:
                  "CodeForge's cloud infrastructure solutions scaled our business seamlessly. Their DevOps expertise saved us months of development time.",
                project: "Cloud Migration",
              },
              {
                name: "Jessica Taylor",
                position: "Creative Director, DesignStudio",
                company: "DesignStudio",
                avatar: "JT",
                rating: 5,
                testimonial:
                  "The UI/UX design work was absolutely brilliant. They understood our vision and created an interface that our users love and our team is proud of.",
                project: "Design System",
              },
              {
                name: "Alexander Brown",
                position: "E-commerce Director, RetailPlus",
                company: "RetailPlus",
                avatar: "AB",
                rating: 5,
                testimonial:
                  "Our online sales increased by 300% after launching the new e-commerce platform. CodeForge delivered beyond our wildest expectations.",
                project: "E-commerce Redesign",
              },
            ].map((testimonial) => (
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
                    <div className="testimonial-company">
                      <svg
                        className="testimonial-company-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span>{testimonial.company}</span>
                    </div>
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
                Let's create something amazing together and add your story to
                our collection of successful projects.
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
      {/* Contact Section - Aesthetic white background */}
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
                <p>hello@codeforge.dev</p>
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
      {/* Footer Section */}
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
                  <span>hello@codeforge.dev</span>
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
              <p>
                Made with <span className="heart">❤️</span> by the CodeForge
                Team
              </p>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default App;
