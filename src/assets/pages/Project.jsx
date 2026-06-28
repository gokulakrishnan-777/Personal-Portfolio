import React from 'react';

const Project = () => {
    const projectData = [
        {
            title: "Skillswap",
            date: "2026",
            role: "Full Stack Developer",
            description: "A MERN stack application that allows users to exchange skills and learn from each other.",
            tech: ["Next.js", "Node", "MongoDB", "Socket.io", "WebRTC", "Tailwind", "Redux"],
            live: "https://skillswap-five-beta.vercel.app/",
            github: "https://github.com/gokulakrishnan-777/law-based-ai-bot-application"
        },
        {
            title: "Nyayalite",
            date: "2025",
            role: "Full Stack Developer",
            description: "A full-stack MERN application for Law awareness and legal information.",
            tech: ["React", "Express", "Node", "AI/NLP"],
            live: "https://nyayalite-com.onrender.com/",
            github: "https://github.com/gokulakrishnan-777/law-based-ai-bot-application"
        },
        {
            title: "Portfolio Website",
            date: "2026",
            role: "Frontend Developer",
            description: "Responsive personal portfolio built with Tailwind CSS and React.",
            tech: ["React", "Tailwind CSS", "Vite"],
            live: "https://personal-portfolio-lyart-eight-94.vercel.app/",
            github: "https://github.com/gokulakrishnan-777/Personal-Portfolio"
        }
    ];

    return (
        <section id="project" className="mx-auto max-w-screen overflow-x-clip px-2 md:max-w-3xl pt-8 pb-16">
            <h2 className="sr-only">Projects</h2>
            
            <div className="screen-line-top screen-line-bottom border-x border-line p-4">
                <div className="flex items-center gap-4 font-mono text-sm mb-6">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-line bg-muted text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>
                    </div>
                    <p className="font-semibold text-lg tracking-tight">Featured Projects</p>
                </div>

                <div className="space-y-8">
                    {projectData.map((project, index) => (
                        <div key={index} className="group relative flex flex-col gap-2">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    {project.title}
                                    <span className="text-muted-foreground text-xs font-normal border border-line rounded px-1.5 py-0.5">{project.date}</span>
                                </h3>
                                <div className="text-sm text-muted-foreground font-mono mt-1 sm:mt-0 flex gap-3">
                                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="hover:text-accent flex items-center gap-1 transition-colors">
                                        Live <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                    </a>
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground flex items-center gap-1 transition-colors">
                                        Code <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                                    </a>
                                </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">{project.description}</p>
                            
                            <div className="flex gap-2 mt-2">
                                {project.tech.map((tech, idx) => (
                                    <span key={idx} className="text-xs font-mono bg-accent-muted text-accent px-2 py-0.5 rounded border border-line">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            
                            {index !== projectData.length - 1 && (
                                <div className="h-px w-full bg-line mt-6"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Project;
