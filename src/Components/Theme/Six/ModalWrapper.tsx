import { X } from 'lucide-react';
import React from 'react'

const ModalWrapper: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({ onClose, children }) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform scale-100 transition-transform duration-300 relative">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white rounded-full text-gray-600 hover:bg-gray-100 z-10 shadow-lg border border-gray-100"
                aria-label="Tutup"
            >
                <X className="w-5 h-5" />
            </button>
            <div className="p-8 md:p-10">
                {children}
            </div>
        </div>
    </div>
);

export default ModalWrapper