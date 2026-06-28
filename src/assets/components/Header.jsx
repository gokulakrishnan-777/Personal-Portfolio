import React, { useContext, useEffect, useState } from 'react';
import { themeContext } from '../context/themeApi';
import { BsMoonStars } from "react-icons/bs";
import { MdOutlineWbSunny } from "react-icons/md";
import { GrGithub } from 'react-icons/gr';

const SECTION_IDS = ['home', 'about', 'education', 'skills', 'project', 'contact'];

const Header = () => {
    const { theme, setTheme } = useContext(themeContext);
    const [activeSection, setActiveSection] = useState('home');

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

    return (
        <header className="sticky top-0 z-50 w-full overflow-x-hidden bg-background px-2 pt-2">
            <div className="screen-line-top screen-line-bottom mx-auto flex h-12 items-center justify-between gap-2 border-x border-line px-2 sm:gap-4 md:max-w-3xl">
                
                {/* Logo Mark */}
                <a onClick={() => scrollTo('home')} className="cursor-pointer select-none transition-transform ease-out active:scale-[0.95]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-background text-lg font-black text-foreground shadow-sm transition-colors hover:border-accent hover:text-accent">
                        G
                    </div>
                </a>
                
                <div className="flex-1"></div>
                
                {/* Navigation */}
                <div className="flex items-center gap-1 sm:gap-3">
                    <nav className="flex items-center gap-4 max-sm:hidden">
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
                    <a
                        href="https://github.com/gokulakrishnan-777"
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
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
    );
};

export default Header;
