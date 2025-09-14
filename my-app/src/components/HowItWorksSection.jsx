import React from 'react';
import { motion } from 'framer-motion';
import UploadCloudIcon from './icons/UploadCloudIcon.jsx';
import TargetIcon from './icons/TargetIcon.jsx';
import CheckCircleIcon from './icons/CheckCircleIcon.jsx';

function HowItWorksSection() {
    const steps = [
        { icon: UploadCloudIcon, title: 'Submit Your Details', description: 'Provide your skills, experience, and job preferences in a quick form.' },
        { icon: TargetIcon, title: 'AI-Powered Matching', description: 'Our AI matches you with jobs that fit your profile and goals.' },
        { icon: CheckCircleIcon, title: 'Get Daily Alerts', description: 'Receive curated job opportunities directly in your inbox every day.' },
    ];

    return (
        <section id="how-it-works" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900"
                >
                    How It Works
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="mb-4 text-blue-500">
                                <step.icon className="w-12 h-12" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-slate-800">{step.title}</h3>
                            <p className="text-slate-600">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HowItWorksSection;