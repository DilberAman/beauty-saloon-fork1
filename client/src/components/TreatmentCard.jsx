import { useState, useRef, useEffect } from 'react';

const TreatmentCard = ({ title, description, details, price, delay = 0 }) => {
    const [expanded, setExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="card"
            onClick={() => setExpanded(!expanded)}
            style={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backgroundColor: expanded ? 'hsl(var(--card))' : 'hsl(var(--card) / 0.8)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                animation: isVisible ? `popIn 0.6s ease-out forwards` : 'none',
                animationDelay: `${delay}s`
            }}
        >
            <div className="cardTitle" style={{ marginTop: 0 }}>{title}</div>
            <div className="cardText">{description}</div>

            <div style={{
                maxHeight: expanded ? '500px' : '0',
                opacity: expanded ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 0.5s ease',
                marginTop: expanded ? '10px' : '0'
            }}>
                <div style={{ paddingTop: '10px', borderTop: '1px solid hsl(var(--border))', fontSize: '14px', color: 'hsl(var(--muted-foreground))' }}>
                    <p style={{ marginBottom: '8px' }}>{details}</p>
                    <div style={{ fontWeight: '700', color: 'hsl(var(--primary))' }}>
                        Price: {price}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreatmentCard;
