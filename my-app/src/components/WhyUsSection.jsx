import React from 'react';
import { motion } from 'framer-motion';

function WhyUsSection() {
    const features = [
        { title: 'Personalized Alerts', description: 'Jobs tailored to your unique skills and preferences.' },
        { title: 'AI-Driven Insights', description: 'Advanced algorithms ensure the best job matches.' },
        { title: 'Daily Updates', description: 'Fresh opportunities delivered to your inbox every day.' },
    ];

    return (
        <section id="why-us" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900"
                >
                    Why Choose Us
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <h3 className="text-xl font-semibold mb-2 text-slate-800">{feature.title}</h3>
                            <p className="text-slate-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhyUsSection;