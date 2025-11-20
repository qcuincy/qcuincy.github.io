import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed bottom-8 right-8 z-50 mix-blend-difference">
            <svg width="60" height="60" viewBox="0 0 60 60" className="transform -rotate-90">
                <circle
                    cx="30"
                    cy="30"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="transparent"
                    className="text-slate-800"
                />
                <motion.circle
                    cx="30"
                    cy="30"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="transparent"
                    className="text-indigo-500"
                    style={{ pathLength: scaleX }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-indigo-400 font-bold">
                SCROLL
            </div>
        </div>
    );
};
