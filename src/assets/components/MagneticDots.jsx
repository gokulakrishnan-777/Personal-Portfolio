import React, { useRef, useEffect } from 'react';

const MagneticDots = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let mouse = { x: -1000, y: -1000, radius: 80 };

        const spacing = 15;
        const dotRadius = 1;

        const resize = () => {
            const parent = canvas.parentElement;
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const cols = Math.ceil(canvas.width / spacing);
            const rows = Math.ceil(canvas.height / spacing);
            const offsetX = (canvas.width - (cols - 1) * spacing) / 2;
            const offsetY = (canvas.height - (rows - 1) * spacing) / 2;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = offsetX + i * spacing;
                    const y = offsetY + j * spacing;
                    particles.push({
                        baseX: x,
                        baseY: y,
                        x: x,
                        y: y,
                        vx: 0,
                        vy: 0
                    });
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const isDark = document.documentElement.classList.contains('dark');
            ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';

            particles.forEach(p => {
                // physics
                const dx = mouse.x - p.baseX;
                const dy = mouse.y - p.baseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                let targetX = p.baseX;
                let targetY = p.baseY;

                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    // repel away from mouse
                    targetX = p.baseX - Math.cos(angle) * force * 20;
                    targetY = p.baseY - Math.sin(angle) * force * 20;
                }

                // spring back
                p.vx += (targetX - p.x) * 0.15;
                p.vy += (targetY - p.y) * 0.15;

                // friction
                p.vx *= 0.82;
                p.vy *= 0.82;

                p.x += p.vx;
                p.y += p.vy;

                ctx.beginPath();
                ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('resize', resize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 cursor-crosshair pointer-events-auto"
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default MagneticDots;
