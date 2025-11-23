import { ColorClasses } from '@/lib/Types/Theme/Four';
import { X } from 'lucide-react';
import React from 'react'

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    colors: ColorClasses; // Tambahan prop warna
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children, colors }) => {
    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-gray-900/75 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Drawer Content */}
            <div
                className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white dark:bg-gray-800 shadow-2xl z-50 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-4 h-[calc(100%-65px)] overflow-y-auto">
                    {children}
                </div>
            </div>
        </>
    );
};


export default Drawer