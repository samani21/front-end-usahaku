import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Heart, History, ShoppingCart } from 'lucide-react';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    bg: string;
    text: string;
    logo: string | null;
    span1: string;
    span2: string;
    frameLogo: string;
}
const Three = ({ color, bg, text, logo, span1, span2, frameLogo }: Props) => {
    return (
        <>
            <header className="sticky top-0 z-20 bg-white shadow-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                    <div className={`text-xl font-bold ${color?.text600} flex items-center gap-2`}>
                        {
                            logo &&
                            <div className={`${frameLogo === 'Light' ? 'bg-gray-100' : 'bg-gray-900'} p-1 rounded-[8px] max-w-16`}>
                                <img src={logo} className=' rounded-[8px]' />
                            </div>
                        }
                        {span1}{span2}
                    </div>
                    <div className="hidden sm:flex space-x-4">
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 transition duration-150 relative"
                            aria-label="Daftar Favorit">
                            <Heart className="h-6 w-6 text-red-500" />
                            <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center text-xs text-white bg-red-500 rounded-full">{2}</span>
                        </button>
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 transition duration-150 relative"
                            aria-label="Keranjang Belanja">
                            {/* Order icon color is secondary/fixed blue for cart */}
                            <ShoppingCart className="h-6 w-6 text-blue-600" />
                            <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center text-xs text-white bg-blue-600 rounded-full">{4}</span>
                        </button>
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 transition duration-150 relative"
                            aria-label="Keranjang Belanja">
                            {/* Order icon color is secondary/fixed blue for cart */}
                            <History className="h-6 w-6 text-gray-500" />
                            <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center text-xs text-white bg-gray-600 rounded-full">{5}</span>
                        </button>
                    </div>
                </div>
            </header>
            <div className="w-full shadow-2xl overflow-hidden">
                <div className={`p-20 text-center ${bg} ${text} italic`}>
                    Konten Website...
                </div>
                <nav className="flex sm:hidden ${bg}  justify-between px-8">
                    <button
                        className="p-2 rounded-full hover:bg-gray-100 transition duration-150 relative"
                        aria-label="Daftar Favorit">
                        <Heart className="h-6 w-6 text-red-500" />
                        <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center text-xs text-white bg-red-500 rounded-full">{2}</span>
                    </button>
                    <button
                        className="p-2 rounded-full hover:bg-gray-100 transition duration-150 relative"
                        aria-label="Keranjang Belanja">
                        {/* Order icon color is secondary/fixed blue for cart */}
                        <ShoppingCart className="h-6 w-6 text-blue-600" />
                        <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center text-xs text-white bg-blue-600 rounded-full">{4}</span>
                    </button>
                    <button
                        className="p-2 rounded-full hover:bg-gray-100 transition duration-150 relative"
                        aria-label="Keranjang Belanja">
                        {/* Order icon color is secondary/fixed blue for cart */}
                        <History className="h-6 w-6 text-gray-500" />
                        <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center text-xs text-white bg-gray-600 rounded-full">{5}</span>
                    </button>
                </nav>
            </div>
        </>
    )
}

export default Three