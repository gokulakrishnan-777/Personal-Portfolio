import React, { useEffect, useState } from 'react';

const Loader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + Math.floor(Math.random() * 12) + 4;
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsFading(true);
                        setTimeout(onComplete, 800); 
                    }, 400); 
                    return 100;
                }
                return next;
            });
        }, 80);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div 
            className={`fixed inset-0 z-9999 bg-background flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
        >
            <div className="relative flex flex-col items-center">
                {/* Glowing Background Blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-foreground/5 blur-3xl rounded-full"></div>
                
                {/* Text Logo Masking Effect */}
                <div className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-muted/30 relative select-none">
                    Gokul
                    <span 
                        className="absolute inset-0 text-foreground overflow-hidden whitespace-nowrap transition-[width] duration-150 ease-out" 
                        style={{ width: `${progress}%` }}
                    >
                        Gokul
                    </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-48 md:w-64 h-0.5 bg-line rounded-full overflow-hidden relative">
                    <div 
                        className="absolute top-0 left-0 h-full bg-foreground transition-[width] duration-150 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                
                {/* Percentage */}
                <div className="mt-6 flex items-center gap-4 text-xs font-mono text-muted-foreground w-48 md:w-64 justify-between">
                    <span>Loading assets</span>
                    <span>{Math.min(progress, 100)}%</span>
                </div>
            </div>
        </div>
    );
};

export default Loader;
