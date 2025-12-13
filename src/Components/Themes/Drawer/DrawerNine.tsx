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

const DrawerNine: React.FC<DrawerProps> = ({ isOpen, onClose, title, children, color }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                            {
                                title === 'Keranjang Belanja' ?
                                    <>
                                        <ShoppingCart className={`w-6 h-6 mr-2 ${color?.text600}`} /> Keranjang Belanja
                                    </> :
                                    title

                            }
                        </h2>
                        <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100" onClick={onClose} aria-label="Tutup Keranjang">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrawerNine