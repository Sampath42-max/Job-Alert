import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import XIcon from './icons/XIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

const CustomSelect = ({ items, placeholder, selected, setSelected, isMulti = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [otherValue, setOtherValue] = useState("");
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);

    const handleSelect = (item) => {
        if (isMulti) {
            if (selected.includes(item)) {
                setSelected(selected.filter(i => i !== item));
            } else {
                setSelected([...selected, item]);
            }
        } else {
            setSelected(item);
            setIsOpen(false);
        }
    };

    const handleRemove = (item) => {
        setSelected(selected.filter(i => i !== item));
    };

    const handleAddOther = (e) => {
        if (e.key === 'Enter' && otherValue.trim() !== "") {
            const val = otherValue.trim();
            if (!selected.includes(val)) {
                if (isMulti) setSelected([...selected, val]);
                else setSelected(val);
            }
            setOtherValue("");
            if (!isMulti) setIsOpen(false);
        }
    };

    const filteredItems = items.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()) && item !== "Other");

    const displayValue = () => {
        if (isMulti) {
            if (selected.length === 0) return <span className="text-slate-400">{placeholder}</span>;
            return (
                <div className="flex flex-wrap gap-1.5">
                    {selected.map(item => (
                        <span key={item} className="flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs font-medium px-2 py-1 rounded-md">
                            {item}
                            <button onClick={(e) => { e.stopPropagation(); handleRemove(item); }} className="hover:text-red-500">
                                <XIcon className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>
            );
        }
        return selected ? <span>{selected}</span> : <span className="text-slate-400">{placeholder}</span>;
    };

    const showOtherInput = isMulti ? selected.includes("Other") : selected === "Other";

    return (
        <div className="relative w-full font-sans" ref={ref}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsOpen(!isOpen)}
                role="button"
                tabIndex="0"
                className="w-full flex items-center justify-between text-left p-3 bg-white/5 dark:bg-slate-800/30 border border-slate-300/50 dark:border-slate-700/50 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 min-h-[50px] cursor-pointer"
            >
                <div className="flex-1">{displayValue()}</div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDownIcon className="text-slate-400" />
                </motion.div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute z-10 mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg">
                        <div className="p-2">
                            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <ul className="max-h-60 overflow-y-auto p-2 text-sm">
                            {filteredItems.map(item => (
                                <li key={item} onClick={() => handleSelect(item)} className={`px-3 py-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 ${isMulti && selected.includes(item) ? 'bg-blue-50 dark:bg-blue-900/30 font-semibold' : ''}`}>
                                    {item}
                                </li>
                            ))}
                            <li onClick={() => handleSelect("Other")} className={`px-3 py-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 ${(isMulti && selected.includes("Other")) || selected === "Other" ? 'bg-blue-50 dark:bg-blue-900/30 font-semibold' : ''}`}>
                                Other
                            </li>
                        </ul>
                        {showOtherInput && (
                            <div className="p-2 border-t border-slate-200 dark:border-slate-700">
                                <input
                                    type="text"
                                    placeholder={isMulti ? "Type & press Enter to add" : "Type your entry"}
                                    value={otherValue}
                                    onChange={(e) => setOtherValue(e.target.value)}
                                    onKeyDown={handleAddOther}
                                    className="w-full px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomSelect;