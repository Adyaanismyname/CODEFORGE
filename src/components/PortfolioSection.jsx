import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect, memo, useCallback } from "react";

const PortfolioSection = memo(({ shouldReduceMotion }) => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedProject]);

    // Memoized animation variants - simplified for performance
    const fadeInUp = useMemo(
        () => ({
            initial: { opacity: 0, y: 25 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: shouldReduceMotion ? 0.2 : 0.4, ease: "easeOut" },
        }),
        [shouldReduceMotion]
    );

    const staggerContainer = useMemo(
        () => ({
            animate: {
                transition: {
                    staggerChildren: shouldReduceMotion ? 0.02 : 0.06,
                },
            },
        }),
        [shouldReduceMotion]
    );

    // Memoized handlers
    const handleProjectClick = useCallback((project) => {
        setSelectedProject(project);
        setCurrentMediaIndex(0);
    }, []);

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
                    name: "AI-Powered Workout Tracker",
                    description: "Intelligent fitness coaching app with video-based exercise evaluation, real-time form analysis, and personalized workout assignment system enabling coaches to provide detailed feedback and track client progress",
                    technologies: ["React Native", "FastAPI", "PostgreSQL", "Computer Vision", "Video Processing"],
                    image: "projects/aifitness1.png",
                    gallery: [
                        { type: "image", src: "projects/aifitness1.png", alt: "Workout tracker dashboard" },
                        { type: "image", src: "projects/aifitness2.png", alt: "Video exercise analysis" },
                        { type: "image", src: "/api/placeholder/400/250", alt: "Coach feedback interface" },
                    ],
                    githubUrl: "#",
                    featured: true
                },
                {
                    name: "Fitness Tracker App",
                    description: "Cross-platform fitness tracking app with social features",
                    technologies: ["React Native", "Firebase", "Redux", "Expo"],
                    image: "/api/placeholder/400/250",
                    liveUrl: "#",
                    githubUrl: "#"
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
                    name: "Medical Imaging Intelligence Platform",
                    description: "Advanced CNN-based diagnostic system for brain tumor detection and localization achieving 90% accuracy in identifying tumors with precise spatial mapping for clinical applications",
                    technologies: ["Python", "TensorFlow", "CNN", "Medical Imaging", "Computer Vision"],
                    image: "/projects/medical_imaging.png",
                    gallery: [
                        { type: "image", src: "/projects/medical_imaging.png", alt: "Brain MRI with tumor detection" },
                        { type: "image", src: "/projects/medical_imaging_2.png", alt: "CNN architecture visualization" },
                        { type: "image", src: "/projects/medical_imaging_3.png", alt: "Detection accuracy dashboard" },
                    ],
                    githubUrl: "#",
                    featured: true
                },
                {
                    name: "Neural Gaze Redirection System",
                    description: "Production-grade end-to-end neural network solution implementing GaZeGaussian architecture for real-time gaze estimation and redirection with comprehensive data pipeline and statistical modeling",
                    technologies: ["Python", "PyTorch", "Neural Networks", "Computer Vision", "Pandas"],
                    image: "/projects/gazegaussian1.png",
                    gallery: [
                        { type: "image", src: "/projects/gazegaussian1.png", alt: "Gaze tracking visualization" },
                        { type: "image", src: "/projects/gazegaussian2.png", alt: "Neural mesh rendering" },
                        { type: "image", src: "/projects/gazegaussian3.png", alt: "Real-time processing pipeline" },
                    ],
                    githubUrl: "#",
                    featured: true
                },
                {
                    name: "AI-Powered Public Safety System",
                    description: "Enterprise-grade real-time face detection and classification system achieving 98% accuracy on masked/unmasked recognition with optimized inference pipeline for scalable deployment in dynamic environments",
                    technologies: ["Python", "CNN", "Real-time Processing", "OpenCV", "Edge Computing"],
                    image: "/projects/facemask1.png",
                    gallery: [
                        { type: "image", src: "/projects/facemask1.png", alt: "Real-time face detection interface" },
                        { type: "image", src: "/projects/facemask2.png", alt: "Masked vs unmasked classification" },
                        { type: "image", src: "/projects/face_detection_3.png", alt: "Performance metrics dashboard" },
                    ],
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
                                {category.projects.map((project) => (
                                    <motion.div
                                        key={project.name}
                                        className={`project-card project-card-hover ${project.featured ? 'project-featured' : ''}`}
                                        variants={fadeInUp}
                                    >
                                        <div className="project-card-glow" />
                                        {project.featured && (
                                            <div className="project-featured-badge">Featured</div>
                                        )}

                                        <div 
                                            className="project-image"
                                            onClick={() => handleProjectClick(project)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {project.image ? (
                                                <img 
                                                    src={project.image} 
                                                    alt={project.name}
                                                    className="project-image-img"
                                                    loading="lazy"
                                                />
                                            ) : (
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
                                            )}
                                            <div className="project-overlay">
                                                <div className="project-actions">
                                                    <button
                                                        className="project-action project-action-gallery"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleProjectClick(project);
                                                        }}
                                                    >
                                                        <svg
                                                            style={{ width: "18px", height: "18px" }}
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
                                                    </button>
                                                    <a
                                                        href={project.githubUrl}
                                                        className="project-action project-action-github"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
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

                {/* Portfolio CTA Section - Simplified */}
                <motion.div
                    className="portfolio-cta-section"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: shouldReduceMotion ? 0.2 : 0.5,
                        ease: "easeOut",
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                >
                    <div className="portfolio-cta-container">
                        <h3 className="portfolio-cta-title">
                            Ready to Start Your Project?
                        </h3>
                        <p className="portfolio-cta-description">
                            Let's collaborate to bring your vision to life with our proven expertise
                            and innovative solutions.
                        </p>
                        <button className="portfolio-cta-button cta-button-hover">
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
                        </button>
                    </div>
                </motion.div>

                {/* Gallery Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            className="gallery-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                        >
                            <motion.div
                                className="gallery-modal"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", damping: 25 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    className="gallery-close"
                                    onClick={() => setSelectedProject(null)}
                                    aria-label="Close gallery"
                                >
                                    <svg
                                        style={{ width: "24px", height: "24px" }}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>

                                {/* Project Info */}
                                <div className="gallery-header">
                                    <h3 className="gallery-title">{selectedProject.name}</h3>
                                    <p className="gallery-description">{selectedProject.description}</p>
                                    <div className="gallery-technologies">
                                        {selectedProject.technologies.map((tech, idx) => (
                                            <span key={idx} className="gallery-tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Media Display */}
                                <div className="gallery-media-container">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentMediaIndex}
                                            className="gallery-media"
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {selectedProject.gallery[currentMediaIndex].type === 'image' ? (
                                                <img
                                                    src={selectedProject.gallery[currentMediaIndex].src}
                                                    alt={selectedProject.gallery[currentMediaIndex].alt}
                                                    className="gallery-image"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <video
                                                    src={selectedProject.gallery[currentMediaIndex].src}
                                                    controls
                                                    className="gallery-video"
                                                    autoPlay
                                                    loop
                                                />
                                            )}
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Navigation Arrows */}
                                    {selectedProject.gallery.length > 1 && (
                                        <>
                                            <button
                                                className="gallery-nav gallery-nav-prev"
                                                onClick={() => setCurrentMediaIndex((prev) => 
                                                    prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
                                                )}
                                                aria-label="Previous media"
                                            >
                                                <svg
                                                    style={{ width: "24px", height: "24px" }}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 19l-7-7 7-7"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                className="gallery-nav gallery-nav-next"
                                                onClick={() => setCurrentMediaIndex((prev) => 
                                                    prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
                                                )}
                                                aria-label="Next media"
                                            >
                                                <svg
                                                    style={{ width: "24px", height: "24px" }}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Thumbnails */}
                                {selectedProject.gallery.length > 1 && (
                                    <div className="gallery-thumbnails">
                                        {selectedProject.gallery.map((media, idx) => (
                                            <button
                                                key={idx}
                                                className={`gallery-thumbnail ${idx === currentMediaIndex ? 'active' : ''}`}
                                                onClick={() => setCurrentMediaIndex(idx)}
                                            >
                                                {media.type === 'image' ? (
                                                    <img src={media.src} alt={media.alt} loading="lazy" />
                                                ) : (
                                                    <div className="gallery-thumbnail-video">
                                                        <svg
                                                            style={{ width: "24px", height: "24px", color: "white" }}
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M8 5v14l11-7z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* GitHub Link */}
                                <div className="gallery-footer">
                                    <a
                                        href={selectedProject.githubUrl}
                                        className="gallery-github-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg
                                            style={{ width: "20px", height: "20px" }}
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        <span>View on GitHub</span>
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
});

PortfolioSection.displayName = "PortfolioSection";

export default PortfolioSection;
