import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

function FlowPaths() {
    const flowPaths = useMemo(() => Array.from({ length: 12 }, (_, i) => {
        const amplitude = 50 + i * 10;
        const offset = i * 60;
        return {
            id: `flow-${i}`,
            d: `M-100,${200 + offset} Q200,${200 + offset - amplitude} 500,${200 + offset} T900,${200 + offset}`,
            strokeWidth: 1 + i * 0.3,
            opacity: 0.1 + i * 0.05,
            delay: i * 0.8,
        };
    }), []);

    return (
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 800 800">
            {flowPaths.map((path) => (
                <motion.path key={path.id} d={path.d} fill="none" stroke="currentColor"
                    strokeWidth={path.strokeWidth} strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0.8, 0], opacity: [0, path.opacity, path.opacity * 0.7, 0] }}
                    transition={{ duration: 15, delay: path.delay, repeat: Infinity, ease: "easeInOut" }} />
            ))}
        </svg>
    );
}

export default FlowPaths;