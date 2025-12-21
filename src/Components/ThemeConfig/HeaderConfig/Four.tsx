import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { HeartIcon, HistoryIcon, MoonIcon, ShoppingCartIcon, SunIcon } from 'lucide-react';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    bg: string;
    text: string;
    logo: string | null;
    span1: string;
    span2: string;
    frameLogo: string;
    themeMode?: string
    setThemeMode: (val: string) => void;
}
const Four = ({ color, bg, text, logo, span1, span2, themeMode, setThemeMode, frameLogo }: Props) => {

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
        <>
            <header className={`sticky top-0 z-30 ${bgColor} ${shadow}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className='flex items-center gap-2'>
                        {
                            logo &&
                            <div className={`${frameLogo === 'Light' ? 'bg-gray-100' : 'bg-gray-900'} p-1 rounded-[8px] max-w-16`}>
                                <img src={logo} className=' rounded-[8px]' />
                            </div>
                        }
                        <h1 className={`text-3xl font-extrabold ${textColor} tracking-wider`}>
                            <span className="">{span1}</span> <span className={primaryColor}>{span2}</span>
                        </h1>
                    </div>
                    <div className="hidden sm:flex space-x-5 items-center">
                        <div onClick={() => setThemeMode(themeMode == 'Dark' ? 'Light' : 'Dark')} title={themeIconTitle}>
                            <ThemeIcon className={`${themeIconColor} hover:opacity-80 transition transform hover:scale-110`} />
                        </div>

                        <div title="Favorit" className={`p-2 rounded-full text-gray-600 transition duration-150 relative group`}>
                            <HeartIcon className="text-red-500 hover:text-red-700 transition transform hover:scale-110" />
                            <span className={`absolute top-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none ${texts} transform translate-x-1/2 -translate-y-1/2 ${countColor} rounded-full`}>
                                2
                            </span>
                        </div>
                        <div className={`p-2 rounded-full text-gray-600 transition duration-150 relative group`} title="Pesanan Saat Ini">
                            <ShoppingCartIcon className={`${primaryColor} hover:opacity-80 transition transform hover:scale-110`} />
                            <span className={`absolute top-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none ${texts} transform translate-x-1/2 -translate-y-1/2 ${countColor} rounded-full`}>
                                4
                            </span>
                        </div>
                        <div className={`p-2 rounded-full text-gray-600 transition duration-150 relative group`} title="Riwayat Pesanan">
                            <HistoryIcon className={`${secondaryColor} hover:opacity-80 transition transform hover:scale-110`} /> <span className={`absolute top-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none ${texts} transform translate-x-1/2 -translate-y-1/2 ${countColor} rounded-full`}>
                                {history?.length > 99 ? '99+' : history?.length}
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            <div className="w-full shadow-2xl overflow-hidden">
                <div className={`p-20 text-center ${bg} ${text} italic`}>
                    Konten Website...
                </div>
                <nav className={`flex sm:hidden ${bg}  justify-between px-8`}>
                    {/* Tombol Theme Toggle */}
                    <div onClick={() => setThemeMode(themeMode == 'Dark' ? 'Light' : 'Dark')} className={`p-2 rounded-full text-gray-600 transition duration-150 relative group`} title={themeIconTitle}>
                        <ThemeIcon className={`${themeIconColor} hover:opacity-80 transition transform hover:scale-110`} />
                    </div>

                    <div title="Favorit" className={`p-2 rounded-full text-gray-600 transition duration-150 relative group`}>
                        <HeartIcon className="text-red-500 hover:text-red-700 transition transform hover:scale-110" />
                        <span className={`absolute top-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none ${texts} transform translate-x-1/2 -translate-y-1/2 ${countColor} rounded-full`}>
                            2
                        </span>
                    </div>
                    <div className={`p-2 rounded-full text-gray-600 transition duration-150 relative group`} title="Pesanan Saat Ini">
                        <ShoppingCartIcon className={`${primaryColor} hover:opacity-80 transition transform hover:scale-110`} />
                        <span className={`absolute top-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none ${texts} transform translate-x-1/2 -translate-y-1/2 ${countColor} rounded-full`}>
                            4
                        </span>
                    </div>
                    <div className={`p-2 rounded-full text-gray-600 transition duration-150 relative group`} title="Riwayat Pesanan">
                        <HistoryIcon className={`${secondaryColor} hover:opacity-80 transition transform hover:scale-110`} /> <span className={`absolute top-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none ${texts} transform translate-x-1/2 -translate-y-1/2 ${countColor} rounded-full`}>
                            {history?.length > 99 ? '99+' : history?.length}
                        </span>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Four