import React from 'react';
import { Download } from 'lucide-react';

export const About = () => {
    return (
        <section id="about" className="mx-auto w-full overflow-x-clip px-2 md:max-w-3xl pt-8 pb-16">
            <h2 className="sr-only">About</h2>
            
            <div className="screen-line-top screen-line-bottom border-x border-line p-4 md:p-6">
                <div className="flex items-center gap-4 font-mono text-sm mb-6">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-line bg-muted text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                    </div>
                    <p className="font-semibold text-lg tracking-tight">About</p>
                </div>

                <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                        I'm <a href='https://gokulakrishnana.vercel.app' target='_blank' className="text-foreground font-medium underline underline-offset-4 decoration-gray-500 decoration-1">Gokulakrishnan A</a>, a Full Stack Developer building high-performance web apps with a focus on robust architectures and user-centric design.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        I am committed to writing clean, efficient, and maintainable code while continuously learning and adapting to new technologies. I design, code and build digital experiences, passionate about cracking complex problems and inventing elegant solutions.
                    </p>
                    
                    <div className="pt-4">
                        <a 
                            href="/Gokulakrishnan__A_Full stack developer.pdf" 
                            target="_blank" 
                            download="/Gokulakrishnan__A_Full stack developer.pdf"
                            aria-label="Download Resume"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-line rounded-lg hover:bg-accent-muted transition-colors text-foreground"
                        >
                            <Download size={16} className="text-muted-foreground" />
                            Download Resume
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
