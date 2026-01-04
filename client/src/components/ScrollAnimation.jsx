import { useState, useEffect, useRef } from 'react';

const ScrollAnimation = ({ children, direction = 'right', distance = '50px', duration = '0.8s' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setIsVisible(entry.isIntersecting));
        });

        const currentRef = domRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const initialTransform = direction === 'right'
        ? `translateX(${distance})`
        : direction === 'left'
            ? `translateX(-${distance})`
            : 'none';

    return (
        <div
            ref={domRef}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'none' : initialTransform,
                transition: `opacity ${duration} ease-out, transform ${duration} ease-out`,
            }}
        >
            {children}
        </div>
    );
};

export default ScrollAnimation;
