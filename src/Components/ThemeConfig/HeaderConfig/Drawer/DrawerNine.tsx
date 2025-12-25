import { OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Clock, Heart, ShoppingCart, X } from 'lucide-react';
import React from 'react'
import ContentDrawerFive from './Content/ContentDrawerFive';
import ContentDrawerSix from './Content/ContentDrawerSIx';
import ContentDrawerSevent from './Content/ContentDrawerSevent';
import ContentDrawerEight from './Content/ContentDrawerEight';
import ContentDrawerNine from './Content/ContentDrawerNine';

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

const DrawerNine = ({ isOpen, onClose, title, type, favoriteProducts, color, cart, history, cartTotal }: Props) => {
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
                        <ContentDrawerNine type={type}
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

export default DrawerNine