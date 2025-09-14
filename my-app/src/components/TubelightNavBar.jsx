import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomeIcon from './icons/HomeIcon.jsx';
import InfoIcon from './icons/InfoIcon.jsx';
import TargetIcon from './icons/TargetIcon.jsx';
import MailIcon from './icons/MailIcon.jsx';

function TubelightNavBar({ activeSection }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [scrollToSection, setScrollToSection] = useState(null);

    const navItems = [
        { name: 'Home', url: '/', section: 'home', icon: HomeIcon },
        { name: 'How It Works', url: '/#how-it-works', section: 'how-it-works', icon: InfoIcon },
        { name: 'Why Us', url: '/#why-us', section: 'why-us', icon: TargetIcon },
        { name: 'Get Alerts', url: '/get-alerts', section: 'get-alerts', icon: MailIcon }
    ];

    const handleNavClick = (url, section) => {
        if (url === '/get-alerts') {
            navigate(url);
        } else {
            navigate(url);
            setScrollToSection(section);
        }
    };

    useEffect(() => {
        if (scrollToSection && location.pathname === '/') {
            setTimeout(() => {
                const element = document.getElementById(scrollToSection);
                if (element) {
                    const yOffset = -80; // Adjust for fixed navbar
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
                setScrollToSection(null); // Clear after scrolling
            }, 100);
        }
    }, [location, scrollToSection]);

    // Handle initial hash navigation
    useEffect(() => {
        if (location.pathname === '/' && location.hash) {
            setTimeout(() => {
                const section = location.hash.replace('#', '');
                const element = document.getElementById(section);
                if (element) {
                    const yOffset = -80;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    return (
        <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6">
            <nav className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-1 rounded-full shadow-md">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = (item.url === '/get-alerts' && location.pathname === '/get-alerts') ||
                                    (item.section && activeSection === item.section);
                    return (
                        <div
                            key={item.name}
                            onClick={() => handleNavClick(item.url, item.section)}
                            className={`relative cursor-pointer text-sm font-semibold px-4 py-2 md:px-6 rounded-full transition-colors text-slate-600 hover:text-slate-900 ${isActive ? 'text-slate-900' : ''}`}
                        >
                            <span className="hidden md:inline">{item.name}</span>
                            <span className="md:hidden"><Icon className="w-5 h-5" /></span>
                            {isActive && (
                                <motion.div
                                    layoutId="lamp"
                                    className="absolute inset-0 w-full bg-slate-100 rounded-full -z-10"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-t-full">
                                        <div className="absolute w-12 h-6 bg-blue-500/20 rounded-full blur-md -top-2 -left-2" />
                                        <div className="absolute w-8 h-6 bg-blue-500/20 rounded-full blur-md -top-1" />
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </header>
    );
}

export default TubelightNavBar;
