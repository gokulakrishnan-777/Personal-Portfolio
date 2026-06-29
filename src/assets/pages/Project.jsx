import React, { useState, useRef } from 'react';
import Tooltip from '../components/Tooltip';

const ProjectCard = ({ project, isExpanded, onToggle }) => {
    const contentRef = useRef(null);

    return (
        <div className="group relative px-2 flex flex-col border-b border-line last:border-b-0 hover:bg-black/5 dark:hover:bg-black/40 hover:backdrop-blur-md transition-all duration-300">
            {/* Header / Toggle */}
            <button 
                onClick={onToggle}
                className="flex items-center w-full py-5 text-left cursor-pointer"
            >
                {/* Left Icon (Cube) */}
                <div className="shrink-0 flex size-10 items-center justify-center rounded-lg border border-line bg-muted/20 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>
                </div>
                
                {/* Title & Date */}
                <div className="grow">
                    <h3 className="font-semibold text-base sm:text-lg">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{project.date}</p>
                </div>

                {/* Right Icons */}
                <div className="flex items-center gap-3 text-muted-foreground">
                    <Tooltip text="Open Project Link" position="top">
                        <a 
                            href={project.live} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => e.stopPropagation()} 
                            className="p-1.5 hover:text-foreground transition-colors hidden sm:block"
                            aria-label="View Live Project"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                        </a>
                    </Tooltip>
                    <div className="p-1.5 flex items-center justify-center">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                            className={`transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isExpanded ? 'rotate-180' : ''}`}
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </div>
            </button>

            {/* Expandable Body */}
            <div 
                className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ 
                    height: isExpanded ? `${contentRef.current?.scrollHeight}px` : '0px',
                    opacity: isExpanded ? 1 : 0
                }}
            >
                <div ref={contentRef}>
                    <div className="pb-6 pt-2 pl-14 pr-4">
                        <ul className="list-disc list-inside text-muted-foreground mb-6 leading-relaxed text-sm sm:text-base space-y-1.5">
                            {Array.isArray(project.description) ? project.description.map((point, i) => (
                                <li key={i}>{point}</li>
                            )) : <li>{project.description}</li>}
                        </ul>
                        
                        <div className="flex items-center gap-6 mb-6">
                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-accent flex items-center gap-2 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                Live Demo
                            </a>
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-foreground flex items-center gap-2 transition-colors text-muted-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                                Source Code
                            </a>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            {project.tech.map((tech, idx) => (
                                <span key={idx} className="text-[11px] sm:text-xs font-mono bg-accent-muted dark:text-gray-300 text-gray-600 px-2.5 py-1 rounded-md border border-line">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Project = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const projectData = [
        {
            title: "Skillswap",
            date: "2026",
            role: "Full Stack Developer",
            description: [
                "A comprehensive MERN stack application empowering users to exchange skills and learn collaboratively.",
                "Engineered real-time chat and video conferencing functionalities using Socket.io and WebRTC.",
                "Architected a robust Redux state management system for seamless data flow.",
                "Designed an intuitive, fully responsive UI utilizing Tailwind CSS."
            ],
            tech: ["Next.js", "Node", "MongoDB", "Socket.io", "WebRTC", "Tailwind", "Redux"],
            live: "https://skillswap-five-beta.vercel.app/",
            github: "https://github.com/gokulakrishnan-777/law-based-ai-bot-application"
        },
        {
            title: "Nyayalite",
            date: "2025",
            role: "Full Stack Developer",
            description: [
                "A full-stack MERN platform dedicated to spreading law awareness and providing accessible legal information.",
                "Integrated an advanced AI/NLP powered chatbot to assist users with legal queries.",
                "Implemented secure user authentication and personalized dashboards.",
                "Optimized backend REST APIs for rapid response times and scalability."
            ],
            tech: ["React", "Express", "Node", "AI/NLP"],
            live: "https://nyayalite-com.onrender.com/",
            github: "https://github.com/gokulakrishnan-777/law-based-ai-bot-application"
        },
        {
            title: "Portfolio Website",
            date: "2026",
            role: "Frontend Developer",
            description: [
                "A highly responsive, modern personal portfolio website built with Vite and React.",
                "Implemented dynamic glassmorphism aesthetics and advanced smooth scrolling (Lenis).",
                "Built an interactive CMD-K search modal and a dynamic theme switcher.",
                "Optimized for maximum performance, accessibility, and SEO best practices."
            ],
            tech: ["React", "Tailwind CSS", "Vite", "Framer Motion"],
            live: "https://personal-portfolio-lyart-eight-94.vercel.app/",
            github: "https://github.com/gokulakrishnan-777/Personal-Portfolio"
        }
    ];

    return (
        <section id="project" className="mx-auto w-full overflow-x-clip px-2 md:max-w-3xl pt-8 pb-16">
            <h2 className="sr-only">Projects</h2>
            
            <div className="screen-line-top screen-line-bottom border-x border-line p-4 md:p-6">
                <div className="flex items-center gap-4 font-mono text-sm mb-6">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-line bg-muted text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>
                    </div>
                    <p className="font-semibold text-lg tracking-tight">Featured Projects</p>
                </div>

                <div className="flex flex-col border-t border-line mt-4 ">
                    {projectData.map((project, index) => (
                        <ProjectCard 
                            key={index} 
                            project={project} 
                            isExpanded={expandedIndex === index}
                            onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Project;
