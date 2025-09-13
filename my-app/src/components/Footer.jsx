import React from 'react';

function Footer() {
    return (
        <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                <p>&copy; {new Date().getFullYear()} Daily Jobs Al. All rights reserved.</p>
                <div className="flex justify-center gap-6 mt-4 text-sm">
                    <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-blue-500 transition-colors">Contact Us</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;