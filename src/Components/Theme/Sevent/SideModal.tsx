import { X } from 'lucide-react';
import React from 'react'
interface SideModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const SideModal: React.FC<SideModalProps> = ({ isOpen, onClose, title, children }) => {
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
                    onClick={onClose}
                ></div>
            )}

            {/* Panel */}
            <div
                className={`fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-300">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition">
                        <X size={24} className="text-gray-600" />
                    </button>
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100vh-65px)]">
                    {children}
                </div>
            </div>
        </>
    );
};


export default SideModal