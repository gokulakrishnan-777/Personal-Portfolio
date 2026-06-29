import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { themeContext } from '../context/themeApi';
import { BsMoonStars } from "react-icons/bs";
import { MdOutlineWbSunny } from "react-icons/md";
import { GrGithub } from 'react-icons/gr';
import Tooltip from './Tooltip';

const SECTION_IDS = ['home', 'about', 'education', 'skills', 'project', 'contact'];

const playHapticSound = () => {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.04);
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
        // ignore
    }
};

const Header = () => {
    const { theme, setTheme } = useContext(themeContext);
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            if (e.key.toLowerCase() === 'd') {
                e.preventDefault();
                playHapticSound();
                setTheme(prev => prev === 'dark' ? 'light' : 'dark');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setTheme]);

    const handleTheme = () => {
        playHapticSound();
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const scrollTo = (id) => {
        setIsMenuOpen(false); // Close menu on click
        const HEADER = 72;
        
        // If we are not on the home page (e.g. blog), navigate to home first
        if (window.location.pathname !== '/') {
            // We use navigate from react-router-dom
            navigate('/', { replace: false });
            // Wait for navigation and DOM render before scrolling
            setTimeout(() => {
                if (id === 'home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
                const el = document.getElementById(id);
                if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - HEADER;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            }, 100);
            return;
        }

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
            <header className="sticky top-2 z-50 w-full bg-background/80 backdrop-blur-md px-2 pt-2">
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
                                    className={`text-sm font-medium cursor-pointer transition-colors hover:text-foreground ${
                                        activeSection === id && location.pathname === '/' ? 'text-foreground border-b border-accent pb-0.5' : 'text-muted-foreground'
                                    }`}
                                >
                                    {id.charAt(0).toUpperCase() + id.slice(1)}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 border-l border-line pl-2">
                        <Link
                            to="/blog"
                            className="hidden md:flex items-center justify-center h-8 px-4 rounded-full bg-foreground text-background text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 mr-2"
                        >
                            Blog
                        </Link>
                        <button 
                            onClick={() => window.dispatchEvent(new Event('open-search'))}
                            className="hidden md:flex cursor-pointer lg:fixed lg:right-0  items-center gap-2 h-8 px-3 rounded-md border border-line bg-muted/30 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors mr-2"
                            aria-label="Search"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            <span>Search...</span>
                        </button>
                        
                        {/* Mobile Search Icon */}
                        <button 
                            onClick={() => window.dispatchEvent(new Event('open-search'))}
                            className="flex md:hidden h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            aria-label="Search"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </button>

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

                        <Tooltip text="GitHub Repository" position="bottom">
                            <a
                                href="https://github.com/gokulakrishnan-777"
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors max-sm:hidden"
                                aria-label="GitHub Profile"
                            >
                                <GrGithub size={18} />
                            </a>
                        </Tooltip>
                        
                        <Tooltip text="Toggle Mode" shortcut="D" position="bottom">
                            <button
                                onClick={handleTheme}
                                className="relative flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors overflow-hidden cursor-pointer"
                                aria-label="Toggle Mode"
                            >
                                <div className={`absolute transition-all duration-500 ease-in-out ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}>
                                    <MdOutlineWbSunny size={18} />
                                </div>
                                <div className={`absolute transition-all duration-500 ease-in-out ${theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}>
                                    <BsMoonStars size={18} />
                                </div>
                            </button>
                        </Tooltip>
                    </div>
                </div>
                
                {/* Edge dots */}
                <div className="absolute top-[-3.5px] left-[-4.5px] z-10 flex h-2 w-2 border border-line bg-background max-md:hidden"></div>
                <div className="absolute top-[-3.5px] right-[-4.5px] z-10 flex h-2 w-2 border border-line bg-background max-md:hidden"></div>
            </header>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-14 z-40 bg-background md:hidden border-t border-line overflow-y-auto scrollbar-none">
                    <nav className="flex flex-col p-4 gap-2">
                        {SECTION_IDS.map((id) => (
                            <button
                                key={id}
                                onClick={() => scrollTo(id)}
                                className={`flex w-full items-center justify-between p-4 rounded-xl border border-line text-lg font-medium transition-colors ${
                                    activeSection === id 
                                        ? 'bg-accent/10 text-accent border-accent/20' 
                                        : 'hover:bg-black/5 dark:hover:bg-black/40 hover:backdrop-blur-md transition-all duration-300 text-foreground'
                                }`}
                            >
                                {id.charAt(0).toUpperCase() + id.slice(1)}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={activeSection === id ? "text-accent" : "opacity-50"}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            </button>
                        ))}
                        
                        <div className="mt-4 flex gap-4 p-4 border border-line rounded-xl bg-muted/30">
                            <Link
                                to="/blog"
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-background border border-line py-2 text-sm font-medium hover:bg-accent-muted transition-colors"
                            >
                                Blog
                            </Link>
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
