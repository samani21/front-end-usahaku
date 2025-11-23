import { ThemeConfig } from '@/lib/Types/Theme/One';
import { XIcon } from 'lucide-react';
import React from 'react'

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    theme: ThemeConfig;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose, title, children, theme }) => {
    // Menggunakan warna primary untuk background drawer header (fixed Dark Mode colors)
    const headerBg = `bg-cyan-700`;

    return (
        <>
            {/* Overlay - Latar belakang dibuat lebih buram (opacity-75) */}
            <div
                className={`fixed inset-0 z-40 bg-gray-900 transition-opacity duration-300 ${isOpen ? 'opacity-75 visible' : 'opacity-0 invisible'}`}
                onClick={onClose}
                aria-hidden={!isOpen}
                role="presentation"
            />

            {/* Drawer Content - Menggunakan theme.cardBg (warna solid Dark Mode: gray-800) */}
            <div
                className={`fixed right-0 top-0 h-full w-full md:w-96 bg-gray-800 ${theme.shadow} z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="drawer-title"
            >
                <div className={`flex justify-between items-center p-4 border-b border-gray-700/20 ${headerBg} text-white`}>
                    <h2 id="drawer-title" className="text-xl font-semibold">{title}</h2>
                    <XIcon className="text-white hover:text-white/80" onClick={onClose} />
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
                    {children}
                </div>
            </div>
        </>
    );
};



export default SideDrawer