import React, { useMemo, useState } from 'react'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { HeartIcon, HistoryIcon, MoonIcon, ShoppingCartIcon, SunIcon } from 'lucide-react';
import One from './One';
import { OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { DUMMY_HISTORY_ONE, DUMMY_PRODUCTS_ONE } from '@/hooks/Theme/ProductOne';
import { DUMMY_HISTORY_THREE, DUMMY_PRODUCTS_THREE } from '@/hooks/Theme/ProductThree';

type Props = {
    theme: number;
    color: ThemeColorSet;
    themeMode: string;
    setThemeMode: (val: string) => void;
}

const DrawerConfig = ({ theme, color, themeMode, setThemeMode }: Props) => {
    const [openDrawer, setOpenDrawer] = useState<string | null>(null);
    const bg = themeMode === "Dark" ? 'bg-gray-900' : 'bg-gray-100'
    const text = themeMode === "Dark" ? 'text-gray-50' : 'text-gray-900'
    const [title, setTile] = useState<string>('')
    const commonProps = {
        color,
        bg,
        text,
        themeMode,
        setThemeMode,
    };
    const favoriteProducts: Product[] = DUMMY_PRODUCTS_THREE?.filter(p => p?.isFavorite);
    const history: OrderItem[] = DUMMY_HISTORY_THREE;
    /* ===================== Numeric Theme ===================== */
    const cartTotal = useMemo(
        () => history.reduce((t, i) => t + i.finalPrice * i.quantity, 0),
        [history]
    );
    const Main = ({ themes }: { themes: number }) => {
        switch (themes) {
            case 1:
                return <One isOpen={openDrawer ? true : false} onClose={() => setOpenDrawer(null)} title={title} favoriteProducts={favoriteProducts} type={openDrawer ? openDrawer : ''} color={color} history={history} cart={history} cartTotal={cartTotal} />;

            default:
                return null;
        }
    }
    const primaryColor = themeMode === 'Dark' ? `text-cyan-500` : color?.text500;
    const texts = themeMode === 'Dark' ? `text-gray-800` : color?.text900;
    const countColor = themeMode === 'Dark' ? `bg-cyan-300` : color?.bg300;
    const secondaryColor = themeMode === 'Dark' ? `text-teal-500` : color?.text500;
    const bgColor = themeMode === 'Dark' ? `bg-gray-800` : "bg-white";
    const textColor = themeMode === 'Dark' ? `text-white` : color?.text800;
    const themeIconColor = themeMode === 'Dark' ? 'text-gray-50' : color?.text900;
    const shadow = themeMode === 'Dark' ? 'shadow-2xl shadow-black/50' : 'shadow-xl shadow-gray-300/70';

    const ThemeIcon = themeMode === 'Dark' ? SunIcon : MoonIcon;
    const themeIconTitle = themeMode === 'Dark' ? 'Ubah ke Light Mode' : 'Ubah ke Dark Mode';

    return (
        <div className='relative'>
            <header className={`sticky top-0 z-30 ${bgColor} ${shadow}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className='flex items-center gap-2'>
                        <h1 className={`text-3xl font-extrabold ${textColor} tracking-wider`}>
                            <span className="">Contoh</span> <span className={primaryColor}>Katalog</span>
                        </h1>
                    </div>
                    <div className="hidden sm:flex space-x-5 items-center">
                        <div className='cursor-pointer' onClick={() => setThemeMode(themeMode == 'Dark' ? 'Light' : 'Dark')} title={themeIconTitle}>
                            <ThemeIcon className={`${themeIconColor} hover:opacity-80 transition transform hover:scale-110`} />
                        </div>

                        <div onClick={() => {
                            setOpenDrawer('favorite')
                            setTile('Favorit')
                        }} title="Favorit" className={`p-2 rounded-full text-gray-600 transition duration-150 relative group cursor-pointer`}>
                            <HeartIcon className="text-red-500 hover:text-red-700 transition transform hover:scale-110" />
                            <span className={`absolute top-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none ${texts} transform translate-x-1/2 -translate-y-1/2 ${countColor} rounded-full`}>
                                2
                            </span>
                        </div>
                        <div onClick={() => {
                            setOpenDrawer('cart');
                            setTile('Pesanan Saat Ini')
                        }} className={`p-2 rounded-full text-gray-600 transition duration-150 relative group cursor-pointer`} title="Pesanan Saat Ini">
                            <ShoppingCartIcon className={`${primaryColor} hover:opacity-80 transition transform hover:scale-110`} />
                            <span className={`absolute top-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none ${texts} transform translate-x-1/2 -translate-y-1/2 ${countColor} rounded-full`}>
                                4
                            </span>
                        </div>
                        <div onClick={() => {
                            setOpenDrawer('history');
                            setTile('Riwayat Pesanan')
                        }} className={`p-2 rounded-full text-gray-600 transition duration-150 relative group cursor-pointer`} title="Riwayat Pesanan">
                            <HistoryIcon className={`${secondaryColor} hover:opacity-80 transition transform hover:scale-110`} /> <span className={`absolute top-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none ${texts} transform translate-x-1/2 -translate-y-1/2 ${countColor} rounded-full`}>
                                {history?.length > 99 ? '99+' : history?.length}
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            <div className="w-full shadow-2xl overflow-hidden">
                <div className={`p-20 text-center ${bg} ${text} italic h-[500px] flex items-center justify-center`}>
                    Konten Website...
                </div>
                <nav className={`flex sm:hidden ${bg}  justify-between px-8`}>
                    {/* Tombol Theme Toggle */}
                    <div onClick={() => setThemeMode(themeMode == 'Dark' ? 'Light' : 'Dark')} className={`p-2 rounded-full text-gray-600 transition duration-150 relative group`} title={themeIconTitle}>
                        <ThemeIcon className={`${themeIconColor} hover:opacity-80 transition transform hover:scale-110`} />
                    </div>

                    <div onClick={() => {
                        setOpenDrawer('favorite')
                        setTile('Favorit')
                    }} title="Favorit" className={`p-2 rounded-full text-gray-600 transition duration-150 relative group`}>
                        <HeartIcon className="text-red-500 hover:text-red-700 transition transform hover:scale-110" />
                        <span className={`absolute top-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none ${texts} transform translate-x-1/2 -translate-y-1/2 ${countColor} rounded-full`}>
                            2
                        </span>
                    </div>
                    <div className={`p-2 rounded-full text-gray-600 transition duration-150 relative group`} onClick={() => {
                        setOpenDrawer('cart');
                        setTile('Pesanan Saat Ini')
                    }} title="Pesanan Saat Ini">
                        <ShoppingCartIcon className={`${primaryColor} hover:opacity-80 transition transform hover:scale-110`} />
                        <span className={`absolute top-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none ${texts} transform translate-x-1/2 -translate-y-1/2 ${countColor} rounded-full`}>
                            4
                        </span>
                    </div>
                    <div className={`p-2 rounded-full text-gray-600 transition duration-150 relative group`} onClick={() => {
                        setOpenDrawer('history');
                        setTile('Riwayat Pesanan')
                    }} title="Riwayat Pesanan">
                        <HistoryIcon className={`${secondaryColor} hover:opacity-80 transition transform hover:scale-110`} /> <span className={`absolute top-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none ${texts} transform translate-x-1/2 -translate-y-1/2 ${countColor} rounded-full`}>
                            {history?.length > 99 ? '99+' : history?.length}
                        </span>
                    </div>
                </nav>
            </div>
            {
                openDrawer &&
                <div className='absolute inset-0 z-40 bg-black/40 backdrop-blur-[0.6px] h-[495px]'>
                    <Main themes={1} />
                </div>
            }
        </div>
    );
}

export default DrawerConfig