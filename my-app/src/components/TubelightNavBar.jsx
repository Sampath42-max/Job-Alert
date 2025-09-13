import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Added useLocation
import { motion } from 'framer-motion';
import HomeIcon from './icons/HomeIcon';
import InfoIcon from './icons/InfoIcon';
import TargetIcon from './icons/TargetIcon';
import MailIcon from './icons/MailIcon';

function TubelightNavBar({ activeSection }) {
    const location = useLocation(); // Get current route
    const navItems = [
        { name: 'Home', url: '/', icon: HomeIcon },
        { name: 'How It Works', url: '/#how-it-works', icon: InfoIcon },
        { name: 'Why Us', url: '/#why-us', icon: TargetIcon },
        { name: 'Get Alerts', url: '/get-alerts', icon: MailIcon }
    ];

    return (
        <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6">
            <nav className="flex items-center gap-2 bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-lg px-4 py-1 rounded-full shadow-lg">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = (item.url === '/get-alerts' && location.pathname === '/get-alerts') ||
                                    (item.url !== '/get-alerts' && activeSection === (item.url.split('#')[1] || 'home'));
                    return (
                        <Link
                            key={item.name}
                            to={item.url}
                            className={`relative cursor-pointer text-sm font-semibold px-4 py-2 md:px-6 rounded-full transition-colors text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white ${isActive ? 'text-slate-900 dark:text-white' : ''}`}
                        >
                            <span className="hidden md:inline">{item.name}</span>
                            <span className="md:hidden"><Icon className="w-5 h-5" /></span>
                            {isActive && (
                                <motion.div
                                    layoutId="lamp"
                                    className="absolute inset-0 w-full bg-slate-200/50 dark:bg-slate-800/50 rounded-full -z-10"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-t-full">
                                        <div className="absolute w-12 h-6 bg-blue-500/20 rounded-full blur-md -top-2 -left-2" />
                                        <div className="absolute w-8 h-6 bg-blue-500/20 rounded-full blur-md -top-1" />
                                    </div>
                                </motion.div>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
}

export default TubelightNavBar;