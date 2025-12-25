import { OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { X } from 'lucide-react';
import React from 'react'
import ContentDrawerThree from './Content/ContentDrawerThree';
import ContentDrawerFour from './Content/ContentDrawerFour';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    favoriteProducts: Product[];
    type: string;
    color: ThemeColorSet;
    cart: OrderItem[];
    history: OrderItem[];
    themeMode?: string
    cartTotal: number;
}

const DrawerFour = ({ isOpen, onClose, title, type, favoriteProducts, color, cart, history, cartTotal, themeMode }: Props) => {
    const headerBg = themeMode === 'Dark' ? `bg-cyan-700` : `${color?.bg500}`;
    const overlayBg = themeMode === 'Dark' ? 'bg-gray-900' : 'bg-gray-900/50';
    const cardBgColor = themeMode === 'Dark' ? 'bg-gray-800' : `bg-white`;
    const mainTextColor = themeMode === 'Dark' ? 'text-gray-50' : `text-gray-900`;
    const mainTextColorHover = themeMode === 'Dark' ? 'hover:text-gray-100' : `hover:text-gray-700`;
    const shadowClass = themeMode === 'Dark' ? 'shadow-2xl shadow-black/50' : 'shadow-xl shadow-gray-300/70';

    return (
        <>
            {/* Overlay - Latar belakang dibuat lebih buram (opacity-75 di Dark, 50 di Light) */}
            <div
                className={`fixed inset-0 z-40 ${overlayBg} transition-opacity duration-300 ${isOpen ? 'opacity-75 visible' : 'opacity-0 invisible'}`}
                onClick={onClose}
                aria-hidden={!isOpen}
                role="presentation"
            />

            {/* Drawer Content - Menggunakan theme.cardBg */}
            <div
                className={`fixed right-0 top-0 h-full w-full md:w-96 ${cardBgColor} ${mainTextColor} ${shadowClass} z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="drawer-title"
            >
                <div className={`flex justify-between items-center p-4 border-b border-gray-700/20 cursor-pointer ${headerBg} ${mainTextColor}`}>
                    <h2 id="drawer-title" className="text-xl font-semibold">{title}</h2>
                    <X className={`${mainTextColor} ${mainTextColorHover}`} onClick={onClose} />
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
                    <ContentDrawerFour type={type}
                        favoriteProducts={favoriteProducts}
                        color={color}
                        cart={cart}
                        history={history}
                        cartTotal={cartTotal}
                        themeMode={themeMode} />
                </div>
            </div>
        </>
    );
}

export default DrawerFour