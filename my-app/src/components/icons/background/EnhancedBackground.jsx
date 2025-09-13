import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NeuralPaths from './NeuralPaths';
import FlowPaths from './FlowPaths';
import GeometricPaths from './GeometricPaths';
import SpiralPaths from './SpiralPaths';

function EnhancedBackground() {
    const [currentPattern, setCurrentPattern] = useState(0);
    const patterns = ['neural', 'flow', 'geometric', 'spiral'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPattern((prev) => (prev + 1) % patterns.length);
        }, 12000);
        return () => clearInterval(interval);
    }, []);

    const renderPattern = () => {
        switch (patterns[currentPattern]) {
            case 'neural': return <NeuralPaths />;
            case 'flow': return <FlowPaths />;
            case 'geometric': return <GeometricPaths />;
            case 'spiral': return <SpiralPaths />;
            default: return <NeuralPaths />;
        }
    };

    return (
        <div className="absolute inset-0 w-full h-full text-slate-600 dark:text-slate-400">
            <AnimatePresence>
                <motion.div
                    key={currentPattern}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2 }}
                >
                    {renderPattern()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default EnhancedBackground;