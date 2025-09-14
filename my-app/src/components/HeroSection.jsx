import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import EnhancedBackground from './icons/background/EnhancedBackground';

function HeroSection() {
    const title = "Stop searching. Start receiving.";
    const words = title.split(" ");

    return (
        <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white">
            <EnhancedBackground />
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/60" />
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-4 tracking-tighter leading-none">
                        {words.map((word, wordIndex) => (
                            <span key={wordIndex} className="inline-block mr-4 md:mr-6 last:mr-0">
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        initial={{ y: 100, opacity: 0, rotateX: -90 }}
                                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                        transition={{ delay: wordIndex * 0.15 + letterIndex * 0.05, type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-700 cursor-default"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-lg md:text-xl text-slate-600 font-light tracking-wide max-w-2xl mx-auto"
                    >
                        Get daily job updates tailored to your skills and interests, delivered straight to your inbox.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 0.8, type: "spring", stiffness: 100 }}
                        className="inline-block group mt-10"
                    >
                        <Link to="/get-alerts" className="relative p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-300 block">
                            <span className="relative block rounded-[14px] px-10 py-5 text-lg font-semibold bg-white hover:bg-slate-50 text-slate-900 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl border-0">
                                <motion.span
                                    className="flex items-center gap-3"
                                    whileHover={{ x: 2 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <span>Get Started Now</span>
                                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="text-xl">
                                        →
                                    </motion.span>
                                </motion.span>
                            </span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default HeroSection;