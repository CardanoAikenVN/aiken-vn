import React, { useEffect, useRef } from 'react';

const Starfield: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Array<{ x: number; y: number; size: number; velocity: number; opacity: number }> = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            const starCount = Math.floor(Math.random() * (350 - 200 + 1)) + 200; // 200-350 stars
            stars = [];
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1 + 1, // 1-2px (approx)
                    velocity: Math.random() * (0.2 - 0.05) + 0.05, // 0.05-0.2
                    opacity: Math.random() * 0.5 + 0.3, // Soft opacity
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach((star) => {
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
                ctx.fill();

                // Update position
                star.y += star.velocity;

                // Reset if off screen
                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0, // Behind content but in front of background color
                pointerEvents: 'none',
                filter: 'blur(0.5px)', // Blur request
            }}
            aria-hidden="true"
        />
    );
};

export default Starfield;
