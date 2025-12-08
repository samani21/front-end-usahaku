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

const DrawerSix: React.FC<DrawerProps> = ({ isOpen, onClose, title, children, color }) => {
    return (
        <div className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'visible bg-black/50' : 'invisible'}`}>
            {/* Konten Drawer */}
            <div className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl p-6 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} rounded-l-2xl`}>
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        {title === "Pesanan Anda" ? <ShoppingCart className={`w-5 h-5 mr-2 t${color?.text500}`} /> :
                            title === "Riwayat Pesanan" ? <Clock className={`w-5 h-5 mr-2 t${color?.text500}`} /> :
                                <Heart className={`w-5 h-5 mr-2 t${color?.text500}`} />}
                        {title}
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition" aria-label="Tutup Drawer">
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>
                <div className="mt-4 h-[calc(100vh-120px)] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DrawerSix