import { X } from 'lucide-react';
import React from 'react'

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children }) => {
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                    onClick={onClose}
                ></div>
            )}

            {/* Drawer Panel */}
            <div
                className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } p-4 flex flex-col`}
            >
                <div className="flex justify-between items-center pb-4 border-b border-gray-300">
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <div className="mt-4 overflow-y-auto flex-grow">{children}</div>
            </div>
        </>
    );
};

export default Drawer