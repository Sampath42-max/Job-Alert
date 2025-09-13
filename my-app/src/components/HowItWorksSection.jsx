import React from 'react';
import { motion } from 'framer-motion';

function HowItWorksSection() {
    const steps = [
        { icon: '📄', title: 'Upload Your Resume', description: 'Let our Al parse your experience and skills to kickstart your profile.' },
        { icon: '⚙️', title: 'Set what matters to you.', description: 'Fine-tune your job search with specific skills, roles, and interests.' },
        { icon: '📧', title: 'Get Daily Alerts', description: 'Receive a curated list of the best job openings directly in your inbox.' }
    ];

    return (
        <section id="how-it-works" className="py-20 sm:py-32 bg-slate-50 dark:bg-slate-900/70">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">How It Works</h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Three simple steps to land your dream job.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            className="text-center p-8 bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="text-5xl mb-4">{step.icon}</div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HowItWorksSection;