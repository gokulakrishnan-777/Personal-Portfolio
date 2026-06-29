import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Header from '../components/Header';

const NotFound = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Liquid wave parameters
        let time = 0;
        
        const draw = () => {
            // clear canvas instead of filling it, so the theme bg-background shows through!
            ctx.clearRect(0, 0, width, height);

            // Draw flowing liquid waves using source-over for theme compatibility
            ctx.globalCompositeOperation = 'source-over';
            
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(0, height);
                
                for (let x = 0; x <= width; x += 20) {
                    const wave1 = Math.sin(x * 0.003 + time + i) * 60;
                    const wave2 = Math.cos(x * 0.002 - time * 0.8 + i) * 40;
                    const y = height / 2 + wave1 + wave2 + Math.sin(time * 0.3 + i) * 100;
                    ctx.lineTo(x, y);
                }
                
                ctx.lineTo(width, height);
                ctx.lineTo(0, height);
                ctx.closePath();
                
                const gradient = ctx.createLinearGradient(0, height/2 - 100, width, height);
                gradient.addColorStop(0, `hsla(${200 + i * 40}, 80%, 60%, 0.12)`);
                gradient.addColorStop(1, `hsla(${280 + i * 30}, 90%, 60%, 0.12)`);
                
                ctx.fillStyle = gradient;
                ctx.fill();
            }
            
            time += 0.015;
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
            <canvas 
                ref={canvasRef} 
                className="absolute inset-0 z-0 pointer-events-none"
            />
            
            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    {/* Liquid Glass UI Overlay - Theme Aware */}
                    <div className="relative overflow-hidden flex flex-col items-center max-w-md text-center p-10 rounded-4xl border border-line bg-foreground/5 backdrop-blur-2xl shadow-xl before:absolute before:inset-0 before:bg-linear-to-b before:from-foreground/5 before:to-transparent before:rounded-4xl before:-z-10 group">
                        
                        {/* Inner glowing blobs */}
                        <div className="absolute -top-20 -left-20 w-48 h-48 bg-accent/30 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150 group-hover:bg-accent/40"></div>
                        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150 group-hover:bg-purple-500/30"></div>
                        
                        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-linear-to-b from-foreground to-foreground/40 mb-2 tracking-tighter drop-shadow-sm">
                            404
                        </h1>
                        <h2 className="text-2xl font-bold text-foreground mb-4 tracking-tight">
                            Lost in Cyberspace
                        </h2>
                        <p className="text-muted-foreground mb-8 text-sm leading-relaxed font-medium px-4">
                            The page you are looking for has drifted into the digital void. Let's get you back to familiar territory.
                        </p>
                        <Link 
                            to="/" 
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-foreground text-background font-bold hover:scale-105 shadow-md hover:shadow-lg hover:shadow-foreground/20 transition-all duration-300"
                        >
                            <Home size={18} strokeWidth={2.5} />
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
