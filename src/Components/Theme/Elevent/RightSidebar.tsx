import { SidebarType } from '@/lib/Types/Theme/Elevent';
import { X } from 'lucide-react';
import React from 'react'
const RightSidebar: React.FC<{ type: SidebarType; onClose: () => void; children: React.ReactNode; title: string }> = ({ type, onClose, children, title }) => {
    return (
        <>
            {/* Overlay */}
            {type && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
          ${type ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-5 border-b  border-gray-300 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                        <X size={24} className="text-gray-600" />
                    </button>
                </div>
                <div className="p-4 h-[calc(100%-60px)] overflow-y-auto">
                    {children}
                </div>
            </div>
        </>
    );
};

export default RightSidebar