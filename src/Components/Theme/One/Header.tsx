import { ThemeConfig, UIState } from '@/lib/Types/Theme/One';
import { HeartIcon, HistoryIcon, ShoppingCartIcon } from 'lucide-react';
import React from 'react'

interface HeaderProps {
    onIconClick: (drawerName: keyof UIState) => void;
    theme: ThemeConfig;
}

const Header: React.FC<HeaderProps> = ({ onIconClick, theme }) => {
    // Fixed Dark Mode colors
    const primaryColor = `text-cyan-400`;
    const secondaryColor = `text-teal-400`;
    const bgColor = `bg-gray-800`;
    const textColor = `text-gray-50`;

    return (
        <header className={`sticky top-0 z-30 ${bgColor} ${theme.shadow}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <h1 className={`text-3xl font-extrabold ${textColor} tracking-wider`}>
                    <span className="hidden sm:inline">Katalog</span> <span className={primaryColor}>Modern</span>
                </h1>
                <div className="flex space-x-5 items-center">
                    {/* Tombol Theme dihilangkan */}

                    <div onClick={() => onIconClick('showFavoritesDrawer')} title="Favorit">
                        <HeartIcon className="text-red-500 hover:text-red-700 transition transform hover:scale-110" onClick={() => onIconClick('showFavoritesDrawer')} />
                    </div>
                    <div onClick={() => onIconClick('showOrdersDrawer')} title="Pesanan Saat Ini">
                        <ShoppingCartIcon className={`text-cyan-400 hover:opacity-80 transition transform hover:scale-110`} onClick={() => onIconClick('showOrdersDrawer')} />
                    </div>
                    <div onClick={() => onIconClick('showHistoryDrawer')} title="Riwayat Pesanan">
                        <HistoryIcon className={`text-teal-400 hover:opacity-80 transition transform hover:scale-110`} onClick={() => onIconClick('showHistoryDrawer')} />
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header