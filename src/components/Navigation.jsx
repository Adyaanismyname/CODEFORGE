import { AnimatePresence, motion } from "framer-motion";
import { useState, memo, useCallback } from "react";

const Navigation = memo(({ shouldReduceMotion, scrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleNavClick = useCallback((section) => {
    scrollToSection(section);
    setIsMobileMenuOpen(false);
  }, [scrollToSection]);

  return (
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
              onClick={() => handleNavClick("#hero-container")}
            >
              CODEFORGE
            </motion.button>

            {/* Desktop Navigation */}
            <motion.div
              className="nav-links nav-links-desktop"
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
                onClick={() => scrollToSection("#portfolio")}
                className="nav-link"
              >
                Portfolio
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

            {/* Hamburger Menu Button */}
            <motion.button
              className={`hamburger-button ${isMobileMenuOpen ? "active" : ""}`}
              onClick={toggleMobileMenu}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: shouldReduceMotion ? 1.4 : 7.2,
                duration: shouldReduceMotion ? 0.3 : 0.8,
              }}
              aria-label="Toggle menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleMobileMenu}
            >
              <motion.div
                className="mobile-menu"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mobile-menu-content">
                  <button
                    onClick={() => handleNavClick("#services")}
                    className="mobile-nav-link"
                  >
                    Services
                  </button>
                  <button
                    onClick={() => handleNavClick("#portfolio")}
                    className="mobile-nav-link"
                  >
                    Portfolio
                  </button>
                  <button
                    onClick={() => handleNavClick("#about")}
                    className="mobile-nav-link"
                  >
                    About
                  </button>
                  <button
                    onClick={() => handleNavClick("#contact")}
                    className="mobile-nav-link"
                  >
                    Contact
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
});

Navigation.displayName = "Navigation";

export default Navigation;
