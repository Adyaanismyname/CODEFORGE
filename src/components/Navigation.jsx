import { motion } from "framer-motion";

const Navigation = ({ shouldReduceMotion, scrollToSection }) => {
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
              onClick={() => scrollToSection("#hero-container")}
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
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
