import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Navigation = ({ shouldReduceMotion, scrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (section) => {
    scrollToSection(section);
    setIsMobileMenuOpen(false);
  };

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
                  <motion.button
                    onClick={() => handleNavClick("#services")}
                    className="mobile-nav-link"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Services
                  </motion.button>
                  <motion.button
                    onClick={() => handleNavClick("#portfolio")}
                    className="mobile-nav-link"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Portfolio
                  </motion.button>
                  <motion.button
                    onClick={() => handleNavClick("#about")}
                    className="mobile-nav-link"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    About
                  </motion.button>
                  <motion.button
                    onClick={() => handleNavClick("#contact")}
                    className="mobile-nav-link"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Contact
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
