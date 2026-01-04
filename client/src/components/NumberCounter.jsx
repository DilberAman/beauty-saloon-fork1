import { useState, useEffect } from 'react';

const NumberCounter = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        // Fade in
        setOpacity(1);

        let startTime = null;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const safeDuration = duration || 2000;
            const percentage = Math.min(progress / safeDuration, 1);

            // Easing function for smooth animation (easeOutCubic)
            const easeOut = 1 - Math.pow(1 - percentage, 3);

            setCount(Math.floor(easeOut * end));

            if (progress < safeDuration) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return (
        <span style={{
            opacity: opacity,
            transition: 'opacity 1s ease-in-out',
            display: 'inline-block'
        }}>
            {count}{suffix}
        </span>
    );
};

export default NumberCounter;
