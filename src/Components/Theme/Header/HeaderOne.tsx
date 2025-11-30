import { UIState } from '@/lib/Types/Theme/Theme';
import { HeartIcon, HistoryIcon, ShoppingCartIcon } from 'lucide-react';
import React from 'react'

interface HeaderProps {
    onIconClick: (drawerName: keyof UIState) => void;
}

const HeaderOne: React.FC<HeaderProps> = ({ onIconClick }) => {
    return (
        <header className={`sticky top-0 z-30 bg-gray-800 shadow-2xl shadow-black/50`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <h1 className={`text-3xl font-extrabold text-gray-50 tracking-wider`}>
                    <span className="hidden sm:inline">Katalog</span> <span className='text-cyan-400'>Modern</span>
                </h1>
                <div className="flex space-x-5 items-center">
                    <div onClick={() => onIconClick('showFavoritesDrawer')} title="Favorit" className='cursor-pointer'>
                        <HeartIcon className="text-red-500 hover:text-red-700 transition transform hover:scale-110" onClick={() => onIconClick('showFavoritesDrawer')} />
                    </div>
                    <div onClick={() => onIconClick('showOrdersDrawer')} title="Pesanan Saat Ini" className='cursor-pointer'>
                        <ShoppingCartIcon className={`text-cyan-400 hover:opacity-80 transition transform hover:scale-110`} onClick={() => onIconClick('showOrdersDrawer')} />
                    </div>
                    <div onClick={() => onIconClick('showHistoryDrawer')} title="Riwayat Pesanan" className='cursor-pointer'>
                        <HistoryIcon className={`text-teal-400 hover:opacity-80 transition transform hover:scale-110`} onClick={() => onIconClick('showHistoryDrawer')} />
                    </div>
                </div>
            </div>
        </header>
    );
};
export default HeaderOne