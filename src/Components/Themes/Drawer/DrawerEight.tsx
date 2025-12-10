import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { color } from 'framer-motion';
import { Clock, Heart, ShoppingCart, X } from 'lucide-react';
import React from 'react'

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    color?: ThemeColorSet;
    children: React.ReactNode;
}

const DrawerEight: React.FC<DrawerProps> = ({ isOpen, onClose, title, children, color }) => {
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/70 z-40 transition-opacity duration-300"
                    onClick={onClose}
                ></div>
            )}

            {/* Modal Konten */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } flex flex-col rounded-l-2xl`}
            >
                <div className="flex justify-between items-center p-5 border-b border-gray-100 flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-5 flex-grow overflow-y-auto">
                    {children}
                </div>
                <div className="p-5 border-t border-gray-100 flex-shrink-0">
                    <button
                        className={`w-full py-3 text-white font-semibold rounded-xl transition duration-150 shadow-md ${color?.bg600} ${color?.hoverBg700} `}
                        onClick={onClose}
                    >
                        Lanjutkan Belanja
                    </button>
                </div>
            </div>
        </>
    );
};

export default DrawerEight