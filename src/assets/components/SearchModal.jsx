import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, ArrowRight, User, BookOpen, Wrench, Briefcase, Mail } from 'lucide-react';

const SEARCH_DATA = [
    { id: 'home', label: 'Home', icon: <User size={16} />, category: 'Section' },
    { id: 'about', label: 'About Me', icon: <User size={16} />, category: 'Section' },
    { id: 'education', label: 'Education', icon: <BookOpen size={16} />, category: 'Section' },
    { id: 'skills', label: 'Skills', icon: <Wrench size={16} />, category: 'Section' },
    { id: 'project', label: 'Projects', icon: <Briefcase size={16} />, category: 'Section' },
    { id: 'contact', label: 'Contact', icon: <Mail size={16} />, category: 'Section' },
    { id: 'github', label: 'GitHub Profile', icon: <Command size={16} />, category: 'Link', url: 'https://github.com/gokulakrishnan-777' },
    { id: 'linkedin', label: 'LinkedIn', icon: <Command size={16} />, category: 'Link', url: 'https://www.linkedin.com/in/gokulakrishnxn/' },
    { id: 'resume', label: 'Download Resume', icon: <Command size={16} />, category: 'Link', url: '/Gokulakrishnan__A_Full stack developer.pdf' },
];

const SearchModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);

    // Toggle Modal Event
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Listen for custom event from Header button
    useEffect(() => {
        const handleOpenSearch = () => setIsOpen(true);
        window.addEventListener('open-search', handleOpenSearch);
        return () => window.removeEventListener('open-search', handleOpenSearch);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 10);
            setQuery('');
            setSelectedIndex(0);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const filteredData = SEARCH_DATA.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    const handleSelect = (item) => {
        if (item.url) {
            if (item.id === 'resume') {
                window.location.href = item.url;
            } else {
                window.open(item.url, '_blank');
            }
        } else {
            const HEADER = 72;
            if (item.id === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const el = document.getElementById(item.id);
                if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - HEADER;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            }
        }
        setIsOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1) % (filteredData.length || 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev - 1 + filteredData.length) % (filteredData.length || 1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredData[selectedIndex]) {
                handleSelect(filteredData[selectedIndex]);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 backdrop-blur-sm  flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity" 
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Modal */}
            <dialog 
                className="relative w-full max-w-xl bg-background  border border-line rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
                role="dialog"
                aria-modal="true"
            >
                {/* Search Input */}
                <div className="flex items-center px-4 py-4 border-b border-line">
                    <Search className="w-5 h-5 text-muted-foreground mr-3" />
                    <input
                        ref={inputRef}
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none text-foreground placeholder-muted-foreground text-lg"
                        placeholder="Search portfolio..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono text-muted-foreground bg-muted rounded border border-line">
                        ESC
                    </kbd>
                </div>

                {/* Results list */}
                <div className="max-h-[50vh] overflow-y-auto scrollbar-none  p-2">
                    {filteredData.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                            No results found for "{query}"
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1">
                            {filteredData.map((item, index) => {
                                const isSelected = index === selectedIndex;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleSelect(item)}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors cursor-pointer ${
                                            isSelected ? 'bg-gray-100 text-accent-foreground font-medium' : 'hover:bg-muted text-foreground'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`${isSelected ? 'text-accent-foreground' : 'text-muted-foreground'}`}>
                                                {item.icon}
                                            </div>
                                            <span>{item.label}</span>
                                        </div>
                                        {isSelected && <ArrowRight size={16} className="opacity-70" />}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
                
                {/* Footer */}
                <div className="hidden sm:flex items-center justify-between px-4 py-3 border-t border-line bg-muted/30 text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded border border-line bg-background font-mono shadow-sm">↑</kbd> <kbd className="px-1.5 py-0.5 rounded border border-line bg-background font-mono shadow-sm">↓</kbd> to navigate</span>
                        <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded border border-line bg-background font-mono shadow-sm">Enter</kbd> to select</span>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default SearchModal;
