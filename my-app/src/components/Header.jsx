import React from 'react';
import LogoIcon from './icons/LogoIcon';
import TubelightNavBar from './TubelightNavBar';

function Header({ activeSection }) {
    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-40 px-6 pt-6 flex justify-between items-center">
                <a href="#home" className="flex items-center gap-2">
                    <LogoIcon className="w-7 h-7 text-blue-600" />
                    <span className="font-bold text-lg text-slate-800 dark:text-black">Daily Jobs Al</span>
                </a>
            </div>
            <TubelightNavBar activeSection={activeSection} />
        </>
    );
}


export default Header;
