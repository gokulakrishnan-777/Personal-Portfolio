import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Mail, Link as LinkIcon } from 'lucide-react';
import { GrGithub } from 'react-icons/gr';
import { SiLinkedin, SiNotion, SiX } from 'react-icons/si';
import MagneticDots from '../components/MagneticDots';
import ResumeModal from '../components/ResumeModal';

export const Home = () => {
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    
    // Dynamic full-text rotation with flip animation
    const phrases = [
        "Building SaaS, AI products, and polished web experiences.",
        "Crafting high-performance web apps with React & Next.js.",
        "Developing scalable backend systems using Node.js."
    ];
    const [phraseIndex, setPhraseIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 3000); // 3 seconds per phrase
        return () => clearInterval(interval);
    }, []);

    return (
        <main id="home" className="mx-auto w-full overflow-x-clip px-2 md:max-w-3xl pt-8 pb-16">
            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
            
            {/* Banner Section */}
            <div className="select-none aspect-2/1 border-x border-line sm:aspect-3/1 flex items-center justify-center text-black dark:text-white screen-line-top screen-line-bottom relative overflow-hidden">
                <MagneticDots />
                <div className="relative inline-block z-10 pointer-events-none">
                    <span className="inline-block font-mono text-4xl font-semibold tracking-tight sm:text-5xl">&lt;/&gt;</span>
                </div>
            </div>
            
            {/* Profile Section */}
            <div className="screen-line-bottom flex flex-col  sm:flex-row border-x border-line">
                <div className="shrink-0 border-b sm:border-b-0 sm:border-r border-line p-4 md:p-3 flex justify-center sm:justify-start">
                    <div className="relative isolate overflow-visible rounded-full p-[2px] bg-linear-to-b from-accent to-transparent shadow-black">
                        <img 
                            className="size-32 rounded-full object-cover ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-40" 
                            alt="Gokulakrishnan" 
                            src="/profile.png" 
                        />
                    </div>
                </div>
                
                <div className="flex flex-1 flex-col items-center sm:items-start text-center sm:text-left w-full">
                    <div className="flex grow items-end pb-2 pt-2 sm:pt-0 sm:pl-4">
                        <div className="font-mono text-xs text-muted-foreground select-none">
                            Full Stack Developer
                        </div>
                    </div>
                    <div className="border-t border-line w-full flex flex-col">
                        <div className="flex items-center justify-center sm:justify-start gap-2 py-2 sm:pl-4">
                            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Gokulakrishnan</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4.5 sm:size-5 text-blue-500 select-none shrink-0"><path fill="currentColor" d="M24 12a4.454 4.454 0 0 0-2.564-3.91 4.437 4.437 0 0 0-.948-4.578 4.436 4.436 0 0 0-4.577-.948A4.44 4.44 0 0 0 12 0a4.423 4.423 0 0 0-3.9 2.564 4.434 4.434 0 0 0-2.43-.178 4.425 4.425 0 0 0-2.158 1.126 4.42 4.42 0 0 0-1.12 2.156 4.42 4.42 0 0 0 .183 2.421A4.456 4.456 0 0 0 0 12a4.465 4.465 0 0 0 2.576 3.91 4.433 4.433 0 0 0 .936 4.577 4.459 4.459 0 0 0 4.577.95A4.454 4.454 0 0 0 12 24a4.439 4.439 0 0 0 3.91-2.563 4.26 4.26 0 0 0 5.526-5.526A4.453 4.453 0 0 0 24 12Zm-13.709 4.917-4.38-4.378 1.652-1.663 2.646 2.646L15.83 7.4l1.72 1.591-7.258 7.926Z"></path></svg>
                        </div>
                        <div className="h-auto sm:h-14 border-t border-line py-3 sm:py-2 flex flex-col sm:flex-row items-center sm:justify-between px-4 sm:pl-4 sm:pr-4 gap-3 sm:gap-0 w-full">
                            <div className="flex-1 min-h-[40px] sm:min-h-[20px] flex items-center justify-center sm:justify-start">
                                <p 
                                    key={phraseIndex} 
                                    className="inline-block font-mono text-xs sm:text-sm text-balance text-muted-foreground text-center sm:text-left animate-flip-in-x"
                                >
                                    {phrases[phraseIndex]}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <button onClick={() => setIsResumeOpen(true)} className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium bg-foreground text-background border border-transparent rounded-lg hover:bg-foreground/90 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                                    Resume
                                </button>
                                <a href="#contact" className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium border border-line rounded-lg hover:bg-accent-muted transition-colors text-foreground">
                                    Let's Talk
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Strip Pattern Divider */}
            <div className="relative flex h-8 w-full border-x border-line before:absolute before:left-[-100vw] before:-z-1 before:h-8 before:w-[200vw] before:bg-repeating-lines"></div>

            {/* Info Panel */}
            <section className="screen-line-top screen-line-bottom border-x border-line p-4 space-y-3">
                <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
                    <div className="flex items-center gap-4 font-mono text-sm">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-line bg-muted text-muted-foreground"><MapPin size={14}/></div>
                        <p>Tamil Nadu, India</p>
                    </div>
                    <div className="flex items-center gap-4 font-mono text-sm">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-line bg-muted text-muted-foreground"><Clock size={14}/></div>
                        <p>Availability: Open</p>
                    </div>
                    <div className="flex items-center gap-4 font-mono text-sm">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-line bg-muted text-muted-foreground"><Mail size={14}/></div>
                        <a href="mailto:agokul110@gmail.com" className="hover:text-foreground transition-colors text-muted-foreground">Contact Me</a>
                    </div>
                    <div className="flex items-center gap-4 font-mono text-sm">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-line bg-muted text-muted-foreground"><LinkIcon size={14}/></div>
                        <a href="https://gokulakrishnana.vercel.app" target='_blank' className="hover:text-foreground transition-colors text-muted-foreground">www.gokulakrishnan.com</a>
                    </div>
                </div>
            </section>
            
            {/* Social Links Panel */}
            <section className="screen-line-top screen-line-bottom border-x border-line">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3">
                    <a href="https://github.com/Gokulakrishnan-777" target="_blank" rel="noopener noreferrer" className="flex cursor-pointer items-center gap-4 p-4 pr-2 transition-all duration-300 hover:bg-black/5 dark:hover:bg-black/40 hover:backdrop-blur-md border-r border-b border-line md:border-b-0">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-line bg-background text-foreground"><GrGithub size={16}/></div>
                        <h3 className="flex-1 font-medium text-sm">GitHub</h3>
                    </a>
                    <a href="https://www.linkedin.com/in/gokulakrishnan-a-g8608" target="_blank" rel="noopener noreferrer" className="flex cursor-pointer items-center gap-4 p-4 pr-2 transition-all duration-300 hover:bg-black/5 dark:hover:bg-black/40 hover:backdrop-blur-md border-b border-line md:border-r md:border-b-0">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-line bg-background text-foreground "><SiLinkedin size={16}/></div>
                        <h3 className="flex-1 font-medium text-sm">LinkedIn</h3>
                    </a>
                    <a href="https://x.com/GOKULAKRIS23058" target="_blank" rel="noopener noreferrer" className="flex cursor-pointer place-self-center md:place-self-auto  items-center gap-4 p-4 pr-2 transition-all duration-300 hover:bg-black/5 dark:hover:bg-black/40 hover:backdrop-blur-md col-span-2 md:col-span-1">
                        <div className="flex size-8 shrink-0  items-center justify-center rounded-lg border border-line bg-background text-foreground"><SiX size={16}/></div>
                        <h3 className="flex-1 font-medium text-sm">X (Twitter)</h3>
                    </a>
                </div>
            </section>
        </main>
    );
};
