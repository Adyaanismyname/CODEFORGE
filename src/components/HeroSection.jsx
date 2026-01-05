import { motion } from "framer-motion";
import { memo, useMemo } from "react";

const HeroSection = memo(({
  shouldReduceMotion,
  heroOpacity,
  heroY,
  scrollEnabled,
  typedText,
  showScrollIndicator,
  isMobile,
}) => {
  // Memoize transition configs to prevent recreation
  const titleTransition = useMemo(() => ({
    delay: shouldReduceMotion ? 0.5 : 3.5,
    duration: shouldReduceMotion ? 0.5 : 1.2,
    ease: [0.23, 1, 0.32, 1],
  }), [shouldReduceMotion]);

  const subtitleTransition = useMemo(() => ({
    delay: shouldReduceMotion ? 0.8 : 4.8,
    duration: shouldReduceMotion ? 0.5 : 1.0,
    ease: [0.23, 1, 0.32, 1],
  }), [shouldReduceMotion]);

  return (
    <>
      {/* Video Background - optimized with preload and lower quality on mobile */}
      <video
        className="video-background"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        id="landing-video"
        key={isMobile ? "mobile" : "desktop"}
      >
        <source
          src={isMobile ? "/landing-page-mobile.mp4" : "/landing-page.webm"}
          type={isMobile ? "video/mp4" : "video/webm"}
        />
        <source src="/landing-page.mp4" type="video/mp4" />
      </video>

      {/* Hero Content */}
      <div id="hero-container" className="hero-container">
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
            transition={titleTransition}
          >
            CODEFORGE
          </motion.h1>
          <motion.p
            className="hero-subtitle text-white/95 drop-shadow-xl shadow-black/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={subtitleTransition}
          >
            Your ideas forged into{" "}
            <span className="typing-text text-orange-400 font-semibold drop-shadow-lg">
              {typedText}
            </span>
            <span className="typing-cursor text-orange-400">|</span>
          </motion.p>
        </motion.div>

        {/* Scroll Indicator - CSS animations instead of Framer Motion for performance */}
        {showScrollIndicator && (
          <div className="scroll-indicator scroll-indicator-visible">
            <div className={`scroll-indicator-content ${shouldReduceMotion ? "" : "scroll-animate"}`}>
              <div
                className="scroll-text text-white/90 drop-shadow-lg font-medium"
                style={{
                  textShadow: "0 0 10px rgba(0,0,0,0.8), 1px 1px 4px rgba(0,0,0,1)",
                }}
              >
                Scroll
              </div>
              <div className="scroll-mouse">
                <div className={`scroll-dot ${shouldReduceMotion ? "" : "scroll-dot-animate"}`} />
              </div>
              <svg
                className={shouldReduceMotion ? "" : "scroll-arrow-animate"}
                style={{
                  width: "16px",
                  height: "16px",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
