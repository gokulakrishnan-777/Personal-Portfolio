import React, { use } from 'react';
import { themeContext } from '../context/themeApi';

const ThemeToggle = () => {
    const { theme, setTheme } = use(themeContext);
    const isDark = theme === 'dark';

    const handleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <button
            type="button"
            onClick={handleTheme}
            aria-label="Toggle Theme"
            className={`relative w-20 h-10 cursor-pointer rounded-full overflow-hidden transition-all duration-700 shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)] shrink-0
                ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-blue-400 border border-blue-300'}`}
        >
            {/* --- DAY BACKGROUND --- */}
            <div className={`absolute inset-0 transition-opacity duration-700 ${isDark ? 'opacity-0' : 'opacity-100'}`}>
                {/* Concentric rings */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-white/20 rounded-full -translate-x-4 -translate-y-4"></div>
                <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-6 -translate-y-6"></div>
                {/* Clouds */}
                <div className="absolute bottom-[-10px] right-[-5px] w-10 h-10 bg-white rounded-full shadow-[inset_2px_2px_0_rgba(0,0,0,0.05)]"></div>
                <div className="absolute bottom-[-5px] right-6 w-8 h-8 bg-slate-50 rounded-full shadow-[inset_2px_2px_0_rgba(0,0,0,0.05)]"></div>
                <div className="absolute bottom-[-15px] right-12 w-10 h-10 bg-slate-100 rounded-full"></div>
                <div className="absolute bottom-[-5px] right-16 w-6 h-6 bg-white rounded-full"></div>
            </div>

            {/* --- NIGHT BACKGROUND --- */}
            <div className={`absolute inset-0 transition-opacity duration-700 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
                {/* Concentric rings */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/20 rounded-full translate-x-4 -translate-y-4"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full translate-x-6 -translate-y-6"></div>
                {/* Stars */}
                <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full shadow-[0_0_4px_1px_rgba(255,255,255,0.8)]"></div>
                <div className="absolute top-6 left-7 w-[3px] h-[3px] bg-white rounded-full shadow-[0_0_4px_1px_rgba(255,255,255,0.8)]"></div>
                <div className="absolute top-3 left-10 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_4px_1px_rgba(255,255,255,0.8)]"></div>
                <div className="absolute top-7 left-14 w-1 h-1 bg-white rounded-full shadow-[0_0_4px_1px_rgba(255,255,255,0.8)]"></div>
            </div>

            {/* --- TOGGLE KNOB (SUN/MOON) --- */}
            <div
                className={`absolute top-1 z-10 w-8 h-8 rounded-full transition-transform duration-700
                ${isDark ? 'translate-x-11 bg-slate-300 shadow-[inset_-3px_-3px_0px_rgba(0,0,0,0.2),0_0_10px_rgba(168,85,247,0.4)]' : 'translate-x-1 bg-amber-300 shadow-[inset_-2px_-2px_0px_rgba(0,0,0,0.1),0_0_10px_rgba(251,191,36,0.4)]'}`}
            >
                {/* Moon Craters */}
                <div className={`absolute inset-0 transition-opacity duration-700 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute top-1 left-4 w-2 h-2 bg-slate-400 rounded-full shadow-[inset_1px_1px_0px_rgba(0,0,0,0.2)]"></div>
                    <div className="absolute top-3.5 left-1 w-1.5 h-1.5 bg-slate-400 rounded-full shadow-[inset_1px_1px_0px_rgba(0,0,0,0.2)]"></div>
                    <div className="absolute top-4 left-4 w-3 h-3 bg-slate-400 rounded-full shadow-[inset_1px_1px_0px_rgba(0,0,0,0.2)]"></div>
                </div>
            </div>
        </button>
    );
};

export default ThemeToggle;
