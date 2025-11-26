import { X } from 'lucide-react';
import React from 'react'

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

/** Modal Samping Kanan (Right Drawer) */
const RightDrawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children }) => (
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
            className={`fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
        >
            <div className="p-5 border-b border-gray-300 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition">
                    <X size={24} />
                </button>
            </div>
            <div className="p-5 h-[calc(100%-65px)] overflow-y-auto">
                {children}
            </div>
        </div>
    </>
);
export default RightDrawer