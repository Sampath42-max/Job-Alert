import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

function SpiralPaths() {
    const spirals = useMemo(() => Array.from({ length: 8 }, (_, i) => {
        const centerX = 400 + (i % 4 - 1.5) * 200;
        const centerY = 300 + Math.floor(i / 4 - 0.5) * 200;
        const radius = 80 + i * 15;
        const turns = 3 + i * 0.5;
        let path = `M${centerX + radius},${centerY}`;
        for (let angle = 0; angle <= turns * 360; angle += 5) {
            const radian = (angle * Math.PI) / 180;
            const currentRadius = radius * (1 - angle / (turns * 360));
            const x = centerX + currentRadius * Math.cos(radian);
            const y = centerY + currentRadius * Math.sin(radian);
            path += ` L${x},${y}`;
        }
        return { id: `spiral-${i}`, d: path, delay: i * 1.2 };
    }), []);

    return (
        <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 800 600">
            {spirals.map((spiral) => (
                <motion.path key={spiral.id} d={spiral.d} fill="none" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0], rotate: [0, 360] }}
                    transition={{
                        pathLength: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        delay: spiral.delay
                    }} />
            ))}
        </svg>
    );
}

export default SpiralPaths;