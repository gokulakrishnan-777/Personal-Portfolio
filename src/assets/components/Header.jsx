import React, { useContext, useEffect, useState } from 'react';
import { themeContext } from '../context/themeApi';
import { BsMoonStars } from "react-icons/bs";
import { MdOutlineWbSunny } from "react-icons/md";
import { GrGithub } from 'react-icons/gr';

const SECTION_IDS = ['home', 'about', 'education', 'skills', 'project', 'contact'];

const Header = () => {
    const { theme, setTheme } = useContext(themeContext);
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;
            let current = 'home';
            for (const id of SECTION_IDS) {
                const el = document.getElementById(id);
                if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY;
                    if (scrollPosition >= top) {
                        current = id;
                    }
                }
            }
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        const favicon = document.querySelector('link[rel="icon"]');
        if (theme === "dark") {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
            if (favicon) favicon.href = "/favicon-dark.svg";
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
            if (favicon) favicon.href = "/favicon-light.svg";
        }
    }, [theme]);

    const handleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const scrollTo = (id) => {
        setIsMenuOpen(false); // Close menu on click
        const HEADER = 72;
        if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
    
        const el = document.getElementById(id);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - HEADER;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    // Close menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <header className="sticky top-2 z-50 w-full overflow-x-hidden bg-background/80 backdrop-blur-md px-2 pt-2">
                <div className="screen-line-top screen-line-bottom mx-auto flex h-12 items-center justify-between gap-2 border-x border-line px-2 sm:gap-4 md:max-w-3xl relative">
                    
                    {/* Logo Mark */}
                    <a onClick={() => scrollTo('home')} className="cursor-pointer select-none transition-transform ease-out active:scale-[0.95]">
                        <div className="flex h-8 px-3 items-center justify-center rounded-lg  text-2xl font-semibold text-foreground  transition-colors ">
                            Gokul
                        </div>
                    </a>
                    
                    <div className="flex-1"></div>
                    
                    {/* Navigation */}
                    <div className="flex items-center gap-1 sm:gap-3">
                        <nav className="flex items-center gap-4 max-md:hidden">
                            {SECTION_IDS.map((id) => (
                                <button
                                    key={id}
                                    onClick={() => scrollTo(id)}
                                    className={`text-sm font-medium transition-colors hover:text-foreground ${
                                        activeSection === id ? 'text-foreground border-b border-accent pb-0.5' : 'text-muted-foreground'
                                    }`}
                                >
                                    {id.charAt(0).toUpperCase() + id.slice(1)}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 border-l border-line pl-2">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex h-8 w-8 md:hidden items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                            )}
                        </button>

                        <a
                            href="https://github.com/gokulakrishnan-777"
                            target="_blank"
                            rel="noreferrer"
                            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors max-sm:hidden"
                            aria-label="GitHub Profile"
                        >
                            <GrGithub size={18} />
                        </a>
                        
                        <button
                            onClick={handleTheme}
                            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            aria-label="Toggle Mode"
                        >
                            {theme === 'dark' ? <MdOutlineWbSunny size={18} /> : <BsMoonStars size={18} />}
                        </button>
                    </div>
                </div>
                
                {/* Edge dots */}
                <div className="absolute top-[-3.5px] left-[-4.5px] z-10 flex h-2 w-2 border border-line bg-background max-md:hidden"></div>
                <div className="absolute top-[-3.5px] right-[-4.5px] z-10 flex h-2 w-2 border border-line bg-background max-md:hidden"></div>
            </header>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-[56px] z-40 bg-background md:hidden border-t border-line overflow-y-auto">
                    <nav className="flex flex-col p-4 gap-2">
                        {SECTION_IDS.map((id) => (
                            <button
                                key={id}
                                onClick={() => scrollTo(id)}
                                className={`flex w-full items-center justify-between p-4 rounded-xl border border-line text-lg font-medium transition-colors ${
                                    activeSection === id 
                                        ? 'bg-accent/10 text-foreground border-accent/50' 
                                        : 'bg-muted/30 text-muted-foreground hover:bg-muted'
                                }`}
                            >
                                {id.charAt(0).toUpperCase() + id.slice(1)}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={activeSection === id ? "text-accent" : "opacity-50"}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            </button>
                        ))}
                        
                        <div className="mt-4 flex gap-4 p-4 border border-line rounded-xl bg-muted/30">
                            <a
                                href="https://github.com/gokulakrishnan-777"
                                target="_blank"
                                rel="noreferrer"
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-background border border-line py-2 text-sm font-medium hover:bg-accent-muted transition-colors"
                            >
                                <GrGithub size={16} /> GitHub
                            </a>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
};

export default Header;
