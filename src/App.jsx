import {
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState, lazy, Suspense, memo } from "react";
import "./App.css";

// Critical path components - load immediately
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";

// Lazy load below-the-fold sections for better initial load
const AboutSection = lazy(() => import("./components/AboutSection"));
const ServicesSection = lazy(() => import("./components/ServicesSection"));
const PortfolioSection = lazy(() => import("./components/PortfolioSection"));
const TestimonialsSection = lazy(() => import("./components/TestimonialsSection"));
const ContactSection = lazy(() => import("./components/ContactSection"));
const FooterSection = lazy(() => import("./components/FooterSection"));

// Lightweight loading placeholder
const SectionLoader = memo(() => (
  <div style={{ 
    minHeight: "50vh", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center" 
  }}>
    <div style={{
      width: "32px",
      height: "32px",
      border: "2px solid rgba(255,255,255,0.1)",
      borderTopColor: "rgba(251,146,60,0.6)",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite"
    }} />
  </div>
));

SectionLoader.displayName = "SectionLoader";

// Intersection observer hook for lazy rendering
const useInView = (rootMargin = "200px") => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, isInView];
};

// Lazy section wrapper - only loads when near viewport
const LazyRender = memo(({ children, minHeight = "50vh", rootMargin = "300px" }) => {
  const [ref, isInView] = useInView(rootMargin);
  
  return (
    <div ref={ref} style={{ minHeight: isInView ? "auto" : minHeight }}>
      {isInView ? (
        <Suspense fallback={<SectionLoader />}>
          {children}
        </Suspense>
      ) : (
        <SectionLoader />
      )}
    </div>
  );
});

LazyRender.displayName = "LazyRender";

const App = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const typingTimeoutRef = useRef(null);
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  const words = useMemo(() => ["WEBSITES", "AUTOMATIONS", "APPS"], []);

  // Mobile detection - debounced for performance
  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(
        navigator.userAgent.toLowerCase()
      );
      setIsMobile(isMobileDevice || window.innerWidth <= 768);
    };

    checkIsMobile();
    
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkIsMobile, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Simplified scroll transforms - removed springs for smoother performance
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -150]);

  // Typing animation - optimized
  useEffect(() => {
    const currentWord = words[currentWordIndex];

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    const speed = shouldReduceMotion ? 20 : 60;
    const pauseDuration = shouldReduceMotion ? 500 : 1200;

    if (isTyping) {
      if (typedText.length < currentWord.length) {
        typingTimeoutRef.current = setTimeout(() => {
          setTypedText(currentWord.slice(0, typedText.length + 1));
        }, speed);
      } else {
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
      }
    } else {
      if (typedText.length > 0) {
        typingTimeoutRef.current = setTimeout(() => {
          setTypedText(typedText.slice(0, -1));
        }, speed);
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

  // Optimized Lenis - skip on mobile, dynamic import
  useEffect(() => {
    if (shouldReduceMotion || isMobile) {
      document.documentElement.style.scrollBehavior = "smooth";
      return;
    }

    // Dynamic import Lenis only when needed
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        infinite: false,
        smoothWheel: true,
        wheelMultiplier: 0.8,
      });

      lenisRef.current = lenis;

      const raf = (time) => {
        lenis.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      };

      rafIdRef.current = requestAnimationFrame(raf);
    });

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, [shouldReduceMotion, isMobile]);

  // Throttled scroll handler with passive listener
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const latest = window.scrollY;
          setShowScrollIndicator(latest < 100);
          if (latest > 50 && !scrollEnabled) {
            setScrollEnabled(true);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollEnabled]);

  // Optimized scroll function
  const scrollToSection = useCallback((sectionId) => {
    const element = document.querySelector(sectionId);
    if (!element) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(element, {
        offset: -80,
        duration: 1.2,
      });
    } else {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
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

      <LazyRender minHeight="80vh" rootMargin="400px">
        <AboutSection shouldReduceMotion={shouldReduceMotion} />
      </LazyRender>

      <LazyRender minHeight="100vh" rootMargin="400px">
        <ServicesSection shouldReduceMotion={shouldReduceMotion} />
      </LazyRender>

      <LazyRender minHeight="100vh" rootMargin="400px">
        <PortfolioSection shouldReduceMotion={shouldReduceMotion} />
      </LazyRender>

      <LazyRender minHeight="80vh" rootMargin="400px">
        <TestimonialsSection shouldReduceMotion={shouldReduceMotion} />
      </LazyRender>

      <LazyRender minHeight="60vh" rootMargin="400px">
        <ContactSection shouldReduceMotion={shouldReduceMotion} />
      </LazyRender>

      <LazyRender minHeight="30vh" rootMargin="200px">
        <FooterSection
          shouldReduceMotion={shouldReduceMotion}
          scrollToSection={scrollToSection}
        />
      </LazyRender>
    </>
  );
};

export default App;
