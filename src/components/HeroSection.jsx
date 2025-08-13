import { motion } from "framer-motion";

const HeroSection = ({
  shouldReduceMotion,
  heroOpacity,
  heroY,
  scrollEnabled,
  typedText,
  showScrollIndicator,
  isMobile,
}) => {
  return (
    <>
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
          >
            Your ideas forged into{" "}
            <span className="typing-text text-orange-400 font-semibold drop-shadow-lg">
              {typedText}
            </span>
            <span className="typing-cursor text-orange-400">|</span>
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
    </>
  );
};

export default HeroSection;
