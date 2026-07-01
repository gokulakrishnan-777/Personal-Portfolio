import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button
            type="button"
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 p-2.5 sm:p-3 rounded-full border border-line bg-background/80 backdrop-blur-md text-foreground shadow-lg transition-all cursor-pointer duration-300 ease-in-out hover:border-accent hover:text-accent active:scale-90 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
            }`}
            aria-label="Back to top"
        >
            <ArrowUp size={20} strokeWidth={2.5} />
        </button>
    );
};

export default BackToTop;
