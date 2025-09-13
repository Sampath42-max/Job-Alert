import React from 'react';
import { motion } from 'framer-motion';
import CheckCircleIcon from './icons/CheckCircleIcon';
import XCircleIcon from './icons/XCircleIcon';

function WhyUsSection() {
    const problems = [
        "Hours wasted scrolling through irrelevant job listings.",
        "Missing out on perfect opportunities buried in noise.",
        "Generic job alerts that don't match your skills.",
        "Overwhelming amount of unfiltered information."
    ];
    const solutions = [
        "Curated daily job alerts based on your profile.",
        "Al-powered matching with your skills and interests.",
        "Quality over quantity - only relevant opportunities.",
        "Delivered straight to your inbox daily."
    ];

    return (
        <section id="why-us" className="py-20 sm:py-32 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Stop Wasting Time on Job Searches</h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Tired of endless scrolling? We deliver only the opportunities that match your skills and interests.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <motion.div
                        className="p-8 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-red-200 dark:border-red-500/20"
                        initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6">The Problem</h3>
                        <ul className="space-y-4">
                            {problems.map((problem, i) => (
                                <li key={i} className="flex items-start">
                                    <XCircleIcon className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-slate-700 dark:text-slate-300">{problem}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div
                        className="p-8 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-blue-200 dark:border-blue-500/20"
                        initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">Our Solution</h3>
                        <ul className="space-y-4">
                            {solutions.map((solution, i) => (
                                <li key={i} className="flex items-start">
                                    <CheckCircleIcon className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-slate-700 dark:text-slate-300">{solution}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default WhyUsSection;