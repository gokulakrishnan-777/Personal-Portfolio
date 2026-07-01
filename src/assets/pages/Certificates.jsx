import React from 'react';
import Header from '../components/Header';
import { Trophy, ArrowLeft } from 'lucide-react';
import BackToTop from '../components/BackToTop';
import { Link } from 'react-router-dom';

const Certificates = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <div className="border-b border-line/50">
                <Header />
            </div>

            <main className="flex-1 w-full mx-auto px-2 md:max-w-3xl pt-8 pb-16">
                <div className="screen-line-top screen-line-bottom border-x border-line p-4 md:p-6 min-h-[60vh]">
                    <div className="mb-6">
                        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft size={16} />
                            Home
                        </Link>
                    </div>
                    <div className="flex items-center gap-4 font-mono text-sm mb-8">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-line bg-muted text-muted-foreground">
                            <Trophy size={14} />
                        </div>
                        <h1 className="font-semibold text-xl tracking-tight">Hall of Frame</h1>
                    </div>
                    
                    <div className="space-y-12">
                        {/* Internship Certificate */}
                        <div className="group relative flex flex-col gap-4 p-4 -mx-4 rounded-2xl hover:bg-black/5 dark:hover:bg-black/40 hover:backdrop-blur-md transition-all duration-300 border border-transparent hover:border-line">
                            <div>
                                <h2 className="font-semibold text-2xl flex items-center gap-2 mb-2">
                                    Certificate of Internship
                                    <span className="text-accent text-xs font-medium border border-accent/20 bg-accent/10 rounded px-2 py-1 max-sm:hidden">CyberDude Networks</span>
                                </h2>
                                <p className="text-muted-foreground">Junior Fullstack Engineer Intern • CyberDude Networks Pvt. Ltd.</p>
                            </div>
                            
                            {/* Decorative Frame */}
                            <div className="relative rounded-sm border-8 sm:border-12 border-[#2a2a2a] dark:border-[#1a1a1a] shadow-xl group-hover:shadow-2xl transition-all duration-500 bg-[#f4f1ea] p-4 sm:p-6 md:p-8 mt-4">
                                {/* Matboard Inner Shadow */}
                                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.08)] pointer-events-none"></div>
                                
                                {/* Inner Picture */}
                                <div className="relative bg-white shadow-sm ring-1 ring-black/10 overflow-hidden">
                                    <a href="/certificate.jpg" target="_blank" rel="noopener noreferrer" className="block relative">
                                        <img 
                                            src="/certificate.webp" 
                                            alt="Internship Certificate - CyberDude Networks" 
                                            loading="lazy"
                                            width="800"
                                            height="600"
                                            className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/certificate.jpg";
                                            }}
                                        />
                                        {/* Glass reflection effect */}
                                        <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none"></div>
                                    </a>
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none"></div>
                                </div>
                            </div>
                            
                            <div className="mt-4">
                                <h3 className="font-medium text-foreground mb-2">Description</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Successfully served as a Junior Fullstack Engineer Intern for a duration of six months, from 01 November, 2025 to 30 April, 2026. Awarded for hard work, creativity, and contributions to the company towards upskilling.
                                </p>
                            </div>
                        </div>
                        
                        {/* More certificates can be added here */}
                        <div className="text-center p-8 border border-dashed border-line rounded-xl text-muted-foreground text-sm">
                            More certificates will be added soon...
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Certificates;
