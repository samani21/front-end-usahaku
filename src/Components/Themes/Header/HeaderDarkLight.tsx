import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { HeartIcon, HistoryIcon, MoonIcon, ShoppingCartIcon, SunIcon } from 'lucide-react';
import React from 'react'

interface HeaderProps {
    onThemeToggle?: () => void;
    openDrawer: (val: DrawerType) => void;
    favoriteProducts: Product[];
    cart: OrderItem[];
    color: ThemeColorSet;
    history: OrderItem[];
    themeMode: number | string;
}

const HeaderDarkLight: React.FC<HeaderProps> = ({ onThemeToggle, openDrawer, favoriteProducts, cart, history, color, themeMode }) => {
    // Kelas warna dinamis berdasarkan tema
    const primaryColor = themeMode === 'Dark' ? `text-cyan-500` : color?.text500;
    const text = themeMode === 'Dark' ? `text-gray-800` : color?.text900;
    const countColor = themeMode === 'Dark' ? `bg-cyan-300` : color?.bg300;
    const secondaryColor = themeMode === 'Dark' ? `text-teal-500` : color?.text500;
    const bgColor = themeMode === 'Dark' ? `bg-gray-800` : "bg-white";
    const textColor = themeMode === 'Dark' ? `text-white` : color?.text800;
    const themeIconColor = themeMode === 'Dark' ? 'text-gray-50' : color?.text900;
    const shadow = themeMode === 'Dark' ? 'shadow-2xl shadow-black/50' : 'shadow-xl shadow-gray-300/70';

    // Tentukan ikon yang akan ditampilkan
    const ThemeIcon = themeMode === 'Dark' ? SunIcon : MoonIcon;
    const themeIconTitle = themeMode === 'Dark' ? 'Ubah ke Light Mode' : 'Ubah ke Dark Mode';

    return (
        <header className={`sticky top-0 z-30 ${bgColor} ${shadow}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <h1 className={`text-3xl font-extrabold ${textColor} tracking-wider`}>
                    <span className="hidden sm:inline">Katalog</span> <span className={primaryColor}>Modern</span>
                </h1>
                <div className="flex space-x-5 items-center">

                    {/* Tombol Theme Toggle */}
                    <div onClick={onThemeToggle} title={themeIconTitle}>
                        <ThemeIcon className={`${themeIconColor} hover:opacity-80 transition transform hover:scale-110`} />
                    </div>

                    <div onClick={() => openDrawer('favorite')} title="Favorit" className={`p-2 rounded-full text-gray-600 transition duration-150 relative group`}>
                        <HeartIcon className="text-red-500 hover:text-red-700 transition transform hover:scale-110" onClick={() => openDrawer('favorite')} />
                        <span className={`absolute top-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none ${text} transform translate-x-1/2 -translate-y-1/2 ${countColor} rounded-full`}>
                            {favoriteProducts?.length > 99 ? '99+' : favoriteProducts?.length}
                        </span>
                    </div>
                    <div className={`p-2 rounded-full text-gray-600 transition duration-150 relative group`} onClick={() => openDrawer('cart')} title="Pesanan Saat Ini">
                        <ShoppingCartIcon className={`${primaryColor} hover:opacity-80 transition transform hover:scale-110`} onClick={() => openDrawer('cart')} />
                        <span className={`absolute top-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none ${text} transform translate-x-1/2 -translate-y-1/2 ${countColor} rounded-full`}>
                            {cart?.length > 99 ? '99+' : cart?.length}
                        </span>
                    </div>
                    <div className={`p-2 rounded-full text-gray-600 transition duration-150 relative group`} onClick={() => openDrawer('history')} title="Riwayat Pesanan">
                        <HistoryIcon className={`${secondaryColor} hover:opacity-80 transition transform hover:scale-110`} onClick={() => openDrawer('history')} /> <span className={`absolute top-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none ${text} transform translate-x-1/2 -translate-y-1/2 ${countColor} rounded-full`}>
                            {history?.length > 99 ? '99+' : history?.length}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderDarkLight