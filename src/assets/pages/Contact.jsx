import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';

export const Contact = () => {
    const [revealed, setRevealed] = useState(false);

    return (
        <footer id="contact" className="pt-8  w-full mx-auto md:max-w-3xl overflow-x-clip">
            <h2 className="sr-only">Contact & Footer</h2>
            
            <div className="mx-auto w-full px-2 ">
                <div className="screen-line-top screen-line-bottom border-x border-line p-4 md:p-6">
                    <div className="flex items-center gap-4 font-mono text-sm mb-8">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-line bg-muted text-muted-foreground">
                            <Mail size={14} />
                        </div>
                        <p className="font-semibold text-lg tracking-tight">Get in touch</p>
                    </div>

                    <div className="flex flex-col items-center text-center space-y-6 mb-12">
                        <p className="text-xl md:text-3xl font-semibold tracking-tight text-foreground">
                            Let's have a chat.
                        </p>
                        <button
                            onClick={() => {
                                if (!revealed) setRevealed(true);
                                else window.location.href = "mailto:agokul110@gmail.com";
                            }}
                            className={`group relative inline-flex items-center justify-center border border-line bg-background text-sm font-medium transition-all duration-500 h-10 px-6 rounded-lg text-foreground overflow-hidden ${!revealed ? 'cursor-pointer hover:border-accent hover:text-accent' : 'cursor-pointer hover:border-accent/50'}`}
                        >
                            <div className={`flex items-center gap-2 transition-all duration-500 ${revealed ? 'scale-100 opacity-100' : 'scale-95 opacity-90'}`}>
                                {revealed ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                        <span>agokul110@gmail.com</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Reveal Email Address</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                    </>
                                )}
                            </div>
                            
                            {/* Hover glow effect */}
                            <div className={`absolute inset-0 -z-10 bg-accent/10 transition-opacity duration-500 ${!revealed ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`}></div>
                        </button>
                    </div>

                    <div className="border-t border-line pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                            © {new Date().getFullYear()} Gokulakrishnan A
                        </p>
                        
                        <div className="flex items-center gap-6">
                            <a href="https://github.com/Gokulakrishnan-777/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                <SiGithub size={16} />
                            </a>
                            <a href="https://www.linkedin.com/in/gokulakrishnan-a-g8608" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                <SiLinkedin size={16} />
                            </a>
                            <a href="https://x.com/GOKULAKRIS23058" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                <SiX size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
          
        </footer>
    );
};

export default Contact;
