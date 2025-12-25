import { OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { X } from 'lucide-react';
import React from 'react'
import ContentDrawerThree from './Content/ContentDrawerThree';

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

const DrawerThree = ({ isOpen, onClose, title, type, favoriteProducts, color, cart, history, cartTotal }: Props) => {
    return (
        <div
            className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

            {/* Panel */}
            <div className={`fixed inset-y-0 right-0 w-full max-w-xs transition duration-300 ease-in-out transform `}>
                <div className="flex h-full flex-col bg-white shadow-xl">
                    <div className="flex items-start justify-between border-b border-gray-300 p-4">
                        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                        <button
                            type="button"
                            className="rounded-md text-gray-400 hover:text-gray-500 p-1"
                            onClick={onClose}
                            aria-label="Tutup Panel"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        <ContentDrawerThree type={type}
                            favoriteProducts={favoriteProducts}
                            color={color}
                            cart={cart}
                            history={history}
                            cartTotal={cartTotal} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DrawerThree