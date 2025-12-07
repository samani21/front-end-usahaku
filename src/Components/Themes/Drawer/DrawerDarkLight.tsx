import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { X } from 'lucide-react';
import React from 'react'

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    themeMode: number | string;
    color?: ThemeColorSet;
}

const DrawerDarkLight: React.FC<DrawerProps> = ({ isOpen, onClose, title, children, themeMode, color }) => {
    const headerBg = themeMode === 'Dark' ? `bg-cyan-700` : `${color?.bg500}`;
    const overlayBg = themeMode === 'Dark' ? 'bg-gray-900' : 'bg-gray-900/50';
    const cardBgColor = themeMode === 'Dark' ? 'bg-gray-800' : `bg-white`;
    const mainTextColor = themeMode === 'Dark' ? 'text-gray-50' : `text-gray-900`;
    const shadowClass = themeMode === 'Dark' ? 'shadow-2xl shadow-black/50' : 'shadow-xl shadow-gray-300/70';

    return (
        <>
            {/* Overlay - Latar belakang dibuat lebih buram (opacity-75 di Dark, 50 di Light) */}
            <div
                className={`fixed inset-0 z-40 ${overlayBg} transition-opacity duration-300 ${isOpen ? 'opacity-75 visible' : 'opacity-0 invisible'}`}
                onClick={onClose}
                aria-hidden={!isOpen}
                role="presentation"
            />

            {/* Drawer Content - Menggunakan theme.cardBg */}
            <div
                className={`fixed right-0 top-0 h-full w-full md:w-96 ${cardBgColor} ${mainTextColor} ${shadowClass} z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="drawer-title"
            >
                <div className={`flex justify-between items-center p-4 border-b border-gray-700/20 ${headerBg} text-white`}>
                    <h2 id="drawer-title" className="text-xl font-semibold">{title}</h2>
                    <X className="text-white hover:text-white/80" onClick={onClose} />
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
                    {children}
                </div>
            </div>
        </>
    );
};

export default DrawerDarkLight