import { useEffect, useRef, useMemo } from "react";

type Star = {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    animationDelay: number;
    depth: number;
    autoMove: boolean;
    moveSpeed: number;
    moveDirection: { x: number; y: number };
    blurAmount: number;
    element: HTMLDivElement | null;
};

const STARS_AMOUNT = 100;

// Stars Component with parallax effect and automatic movement
export function Stars() {
    // Use refs instead of state to avoid re-renders
    const starsRef = useRef<Star[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const mousePositionRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef<number | null>(null);
    const lastTimeRef = useRef(0);

    // Generate stars only once with useMemo
    const initialStars = useMemo(() => {
        return Array.from({ length: STARS_AMOUNT }, (_, i) => {
            const autoMove = Math.random() > 0.7; // 30% of stars will move automatically
            return {
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.7 + 0.3,
                animationDelay: Math.random() * 3,
                depth: Math.random() * 5, // Depth for parallax effect
                autoMove: autoMove,
                moveSpeed: Math.random() * 30 + 20, // Much slower movement (higher value = slower)
                moveDirection: {
                    x: (Math.random() - 0.5) * 0.03, // Reduced movement amount
                    y: (Math.random() - 0.5) * 0.03, // Reduced movement amount
                },
                blurAmount: Math.random() > 0.7 ? Math.random() * 3 : 0, // Some stars are blurred
                element: null, // Reference to DOM element
            };
        });
    }, []);

    // Setup stars and animation
    useEffect(() => {
        starsRef.current = initialStars;

        // Create all star elements once
        if (containerRef.current) {
            starsRef.current.forEach((star) => {
                const element = document.createElement("div");
                element.className = "absolute rounded-full bg-white animate-twinkle";
                element.style.width = `${star.size}px`;
                element.style.height = `${star.size}px`;
                element.style.opacity = `${star.opacity}`;
                element.style.animationDelay = `${star.animationDelay}s`;
                element.style.filter = star.blurAmount > 0 ? `blur(${star.blurAmount}px)` : "none";

                // Initial position
                updateStarPosition(star, element, mousePositionRef.current);

                containerRef.current?.appendChild(element);
                star.element = element;
            });
        }

        // Animation function that doesn't cause re-renders
        const animate = (time: number) => {
            if (lastTimeRef.current === 0) {
                lastTimeRef.current = time;
            }

            const deltaTime = time - lastTimeRef.current;
            lastTimeRef.current = time;

            // Update positions directly in the DOM
            starsRef.current.forEach((star) => {
                if (!star.autoMove || !star.element) return;

                let newX = star.x + star.moveDirection.x * (deltaTime / star.moveSpeed);
                let newY = star.y + star.moveDirection.y * (deltaTime / star.moveSpeed);

                // Wrap around edges
                if (newX > 100) newX = 0;
                if (newX < 0) newX = 100;
                if (newY > 100) newY = 0;
                if (newY < 0) newY = 100;

                // Update star position in our data
                star.x = newX;
                star.y = newY;

                // Update DOM directly
                updateStarPosition(star, star.element, mousePositionRef.current);
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }

            // Clean up DOM elements
            if (containerRef.current) {
                while (containerRef.current.firstChild) {
                    containerRef.current.removeChild(containerRef.current.firstChild);
                }
            }
        };
    }, [initialStars]);

    // Handle mouse movement without state updates
    useEffect(() => {
        // Throttle mouse move events
        let ticking = false;

        const handleMouseMove = (e: MouseEvent) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    mousePositionRef.current = {
                        x: (e.clientX / window.innerWidth - 0.5) * 2,
                        y: (e.clientY / window.innerHeight - 0.5) * 2,
                    };

                    // Update all star positions with new mouse position
                    starsRef.current.forEach((star) => {
                        if (star.element) {
                            updateStarPosition(star, star.element, mousePositionRef.current);
                        }
                    });

                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Helper function to update star position
    function updateStarPosition(star: Star, element: HTMLDivElement, mousePosition: { x: number; y: number }) {
        const xPos = `calc(${star.x}% + ${mousePosition.x * star.depth * 5}px)`;
        const yPos = `calc(${star.y}% + ${mousePosition.y * star.depth * 5}px)`;

        element.style.left = xPos;
        element.style.top = yPos;
        element.style.transform = `perspective(1000px) translateZ(${star.depth * 20}px)`;
        element.style.transition = "transform 0.1s ease-out, left 0.5s ease-out, top 0.5s ease-out";
    }

    // Return an empty container that will be filled with stars via DOM manipulation
    return <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden" />;
}
