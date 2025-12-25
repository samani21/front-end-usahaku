import { OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { X } from 'lucide-react';
import React from 'react'
import ContentDrawerTwo from './Content/ContentDrawerTwo';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    favoriteProducts: Product[];
    type: string;
    color: ThemeColorSet;
    cart: OrderItem[];
    history: OrderItem[];
    cartTotal: number;
}

const DrawerTwo = ({ isOpen, onClose, title, type, favoriteProducts, color, cart, history, cartTotal }: Props) => {
    return (
        <div
            className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

            {/* Sidebar Content (Right) */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl p-6 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-3">
                    <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition"
                        aria-label={`Tutup ${title}`}
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="overflow-y-auto h-[calc(100%-65px)]">
                    <ContentDrawerTwo type={type}
                        favoriteProducts={favoriteProducts}
                        color={color}
                        cart={cart}
                        history={history}
                        cartTotal={cartTotal} />
                </div>
            </div>
        </div>
    );
}

export default DrawerTwo