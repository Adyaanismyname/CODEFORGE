import { motion } from "framer-motion";
import { useMemo } from "react";

const PortfolioSection = ({ shouldReduceMotion }) => {
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

    const portfolioCategories = [
        {
            id: "web-development",
            title: "Web Development",
            icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
            projects: [
                {
                    name: "E-Commerce Platform",
                    description: "Modern React-based e-commerce solution with Next.js and Stripe integration",
                    technologies: ["React", "Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
                    image: "/api/placeholder/400/250",
                    liveUrl: "#",
                    githubUrl: "#",
                    featured: true
                },
                {
                    name: "SaaS Dashboard",
                    description: "Comprehensive analytics dashboard for business intelligence",
                    technologies: ["React", "D3.js", "Material-UI", "Node.js"],
                    image: "/api/placeholder/400/250",
                    liveUrl: "#",
                    githubUrl: "#"
                },
                {
                    name: "Portfolio Website",
                    description: "Creative portfolio website with smooth animations and modern design",
                    technologies: ["React", "Framer Motion", "CSS3", "Vite"],
                    image: "/api/placeholder/400/250",
                    liveUrl: "#",
                    githubUrl: "#"
                }
            ]
        },
        {
            id: "mobile-apps",
            title: "Mobile Applications",
            icon: "M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z",
            projects: [
                {
                    name: "Fitness Tracker App",
                    description: "Cross-platform fitness tracking app with social features",
                    technologies: ["React Native", "Firebase", "Redux", "Expo"],
                    image: "/api/placeholder/400/250",
                    liveUrl: "#",
                    githubUrl: "#",
                    featured: true
                },
                {
                    name: "Food Delivery App",
                    description: "On-demand food delivery application with real-time tracking",
                    technologies: ["React Native", "Socket.io", "MongoDB", "Express"],
                    image: "/api/placeholder/400/250",
                    liveUrl: "#",
                    githubUrl: "#"
                }
            ]
        },
        {
            id: "cloud-solutions",
            title: "Cloud Solutions",
            icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10",
            projects: [
                {
                    name: "Microservices Architecture",
                    description: "Scalable microservices deployment with Kubernetes orchestration",
                    technologies: ["Docker", "Kubernetes", "AWS", "Node.js", "MongoDB"],
                    image: "/api/placeholder/400/250",
                    liveUrl: "#",
                    githubUrl: "#",
                    featured: true
                },
                {
                    name: "CI/CD Pipeline",
                    description: "Automated deployment pipeline with comprehensive testing",
                    technologies: ["GitHub Actions", "Docker", "AWS", "Terraform"],
                    image: "/api/placeholder/400/250",
                    liveUrl: "#",
                    githubUrl: "#"
                }
            ]
        },
        {
            id: "ai-ml",
            title: "AI & Machine Learning",
            icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
            projects: [
                {
                    name: "Computer Vision System",
                    description: "Real-time object detection and recognition system",
                    technologies: ["Python", "TensorFlow", "OpenCV", "Docker"],
                    image: "/api/placeholder/400/250",
                    liveUrl: "#",
                    githubUrl: "#",
                    featured: true
                },
                {
                    name: "ChatBot Platform",
                    description: "Intelligent chatbot with natural language processing",
                    technologies: ["Python", "NLP", "FastAPI", "React"],
                    image: "/api/placeholder/400/250",
                    liveUrl: "#",
                    githubUrl: "#"
                }
            ]
        },
        {
            id: "ui-ux-design",
            title: "UI/UX Design",
            icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2a2 2 0 002-2V5a2 2 0 00-2-2z",
            projects: [
                {
                    name: "Design System",
                    description: "Comprehensive design system with reusable components",
                    technologies: ["Figma", "Storybook", "React", "CSS"],
                    image: "/api/placeholder/400/250",
                    liveUrl: "#",
                    githubUrl: "#",
                    featured: true
                },
                {
                    name: "Mobile App Redesign",
                    description: "Complete UX overhaul for improved user engagement",
                    technologies: ["Figma", "Principle", "User Research"],
                    image: "/api/placeholder/400/250",
                    liveUrl: "#",
                    githubUrl: "#"
                }
            ]
        },
        {
            id: "ecommerce",
            title: "E-commerce Solutions",
            icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
            projects: [
                {
                    name: "Multi-vendor Marketplace",
                    description: "Complete marketplace solution with vendor management",
                    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
                    image: "/api/placeholder/400/250",
                    liveUrl: "#",
                    githubUrl: "#",
                    featured: true
                },
                {
                    name: "Inventory Management",
                    description: "Real-time inventory tracking and management system",
                    technologies: ["Vue.js", "Laravel", "MySQL", "WebSocket"],
                    image: "/api/placeholder/400/250",
                    liveUrl: "#",
                    githubUrl: "#"
                }
            ]
        }
    ];

    return (
        <div id="portfolio" className="portfolio-section">
            <div className="portfolio-pattern" />

            <div className="portfolio-container">
                <motion.div
                    className="portfolio-header"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    <motion.div variants={fadeInUp}>
                        <span className="portfolio-badge">Our Portfolio</span>
                    </motion.div>
                    <motion.h2 className="portfolio-title" variants={fadeInUp}>
                        Crafted with
                        <span className="portfolio-title-gradient">Precision</span>
                    </motion.h2>
                    <motion.p className="portfolio-description" variants={fadeInUp}>
                        Explore our diverse collection of successful projects that showcase our expertise
                        across different technologies and industries.
                    </motion.p>
                </motion.div>

                {/* Portfolio Categories */}
                <motion.div
                    className="portfolio-categories"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    {portfolioCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.id}
                            id={category.id}
                            className="portfolio-category"
                            variants={fadeInUp}
                        >
                            <div className="category-header">
                                <div className={`category-icon category-icon-${categoryIndex % 6}`}>
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
                                            d={category.icon}
                                        />
                                    </svg>
                                </div>
                                <h3 className="category-title">{category.title}</h3>
                            </div>

                            <div className="projects-grid">
                                {category.projects.map((project, projectIndex) => (
                                    <motion.div
                                        key={project.name}
                                        className={`project-card ${project.featured ? 'project-featured' : ''}`}
                                        whileHover={
                                            shouldReduceMotion
                                                ? {}
                                                : {
                                                    y: -15,
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
                                        <div className="project-card-glow" />
                                        {project.featured && (
                                            <div className="project-featured-badge">Featured</div>
                                        )}

                                        <div className="project-image">
                                            <div className="project-image-placeholder">
                                                <svg
                                                    style={{ width: "48px", height: "48px", color: "#ff7f00" }}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="project-overlay">
                                                <div className="project-actions">
                                                    <a
                                                        href={project.liveUrl}
                                                        className="project-action project-action-live"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
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
                                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                            />
                                                        </svg>
                                                    </a>
                                                    <a
                                                        href={project.githubUrl}
                                                        className="project-action project-action-github"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <svg
                                                            style={{ width: "16px", height: "16px" }}
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="project-content">
                                            <h4 className="project-title">{project.name}</h4>
                                            <p className="project-description">{project.description}</p>

                                            <div className="project-technologies">
                                                {project.technologies.map((tech, techIndex) => (
                                                    <span key={techIndex} className="tech-tag">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Portfolio CTA Section */}
                <motion.div
                    className="portfolio-cta-section"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: shouldReduceMotion ? 0.3 : 0.8,
                        delay: shouldReduceMotion ? 0 : 0.2,
                        ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                >
                    <div className="portfolio-cta-container">
                        <h3 className="portfolio-cta-title">
                            Ready to Start Your Project?
                        </h3>
                        <p className="portfolio-cta-description">
                            Let's collaborate to bring your vision to life with our proven expertise
                            and innovative solutions.
                        </p>
                        <motion.button
                            className="portfolio-cta-button"
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

export default PortfolioSection;
