import { X } from 'lucide-react';
import React from 'react'

interface CenterModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const CenterModal: React.FC<CenterModalProps> = ({ isOpen, onClose, title, children }) => (
    <>
        {/* Overlay */}
        {isOpen && (
            <div
                className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center transition-opacity duration-300"
                onClick={onClose}
            >
                {/* Modal Content */}
                <div
                    className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-md transform transition-transform duration-300 ease-in-out scale-100"
                    onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing when clicking inside
                >
                    <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-4">
                        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition">
                            <X size={20} />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        )}
    </>
);
export default CenterModal