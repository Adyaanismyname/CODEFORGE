import {
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Lenis from "lenis";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import {
  Navigation,
  HeroSection,
  AboutSection,
  ServicesSection,
  TestimonialsSection,
  ContactSection,
  FooterSection,
} from "./components";

const App = () => {
  const shouldReduceMotion = useReducedMotion(); // reduce motion
  const { scrollY } = useScroll();
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
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
  }, [typedText, isTyping, currentWordIndex, words, shouldReduceMotion]);

  // Optimized Lenis smooth scroll setup
  useEffect(() => {
    if (shouldReduceMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [shouldReduceMotion]);

  // Optimized scroll indicator visibility
  useEffect(() => {
    const scrollTimeoutId = scrollTimeoutRef.current;
    
    const unsubscribe = scrollY.on("change", (latest) => {
      const shouldShow = latest < 100;
      if (shouldShow !== showScrollIndicator) {
        setShowScrollIndicator(shouldShow);
      }

      // Enable scroll transformations after initial load for performance
      if (latest > 50 && !scrollEnabled) {
        setScrollEnabled(true);
      }
    });

    return () => {
      unsubscribe();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (scrollTimeoutId) {
        clearTimeout(scrollTimeoutId);
      }
    };
  }, [scrollY, scrollEnabled, showScrollIndicator]);

  // Optimized scroll to section function
  const scrollToSection = useCallback((sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element, {
          offset: -80,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, []);

  return (
    <>
      <Navigation 
        shouldReduceMotion={shouldReduceMotion}
        scrollToSection={scrollToSection}
      />
      
      <HeroSection
        shouldReduceMotion={shouldReduceMotion}
        heroOpacity={heroOpacity}
        heroY={heroY}
        scrollEnabled={scrollEnabled}
        typedText={typedText}
        showScrollIndicator={showScrollIndicator}
        isMobile={isMobile}
      />
      
      <AboutSection shouldReduceMotion={shouldReduceMotion} />
      
      <ServicesSection shouldReduceMotion={shouldReduceMotion} />
      
      <TestimonialsSection shouldReduceMotion={shouldReduceMotion} />
      
      <ContactSection shouldReduceMotion={shouldReduceMotion} />
      
      <FooterSection 
        shouldReduceMotion={shouldReduceMotion}
        scrollToSection={scrollToSection}
      />
    </>
  );
};

export default App;
