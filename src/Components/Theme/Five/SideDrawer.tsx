import { X } from 'lucide-react';
import React from 'react'

type Props = {
    isOpen: boolean;
    onClose: () => void;
    title: string | null;
    children: React.ReactNode;
}

const SideDrawer = ({ isOpen, onClose, title, children }: Props) => {
    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer Konten */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header (fixed) */}
                <div className="flex-shrink-0 p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-800 p-2 rounded-full transition duration-150"
                            aria-label={`Tutup ${title}`}
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Content Area (scrollable) */}
                <div className="flex-grow overflow-y-auto p-6">
                    {children}
                </div>
            </div>
        </>
    );
};

export default SideDrawer