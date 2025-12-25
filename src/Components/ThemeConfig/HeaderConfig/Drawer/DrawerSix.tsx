import { OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Clock, Heart, ShoppingCart, X } from 'lucide-react';
import React from 'react'
import ContentDrawerFive from './Content/ContentDrawerFive';
import ContentDrawerSix from './Content/ContentDrawerSIx';

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

const DrawerSix = ({ isOpen, onClose, title, type, favoriteProducts, color, cart, history, cartTotal }: Props) => {
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
                    <ContentDrawerSix type={type}
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

export default DrawerSix