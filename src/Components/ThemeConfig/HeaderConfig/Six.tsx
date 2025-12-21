import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Clock, Heart, ShoppingCart } from 'lucide-react';
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
const Six = ({ color, bg, text, logo, span1, span2, frameLogo }: Props) => {
    return (
        <>
            <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                    <div className='flex items-center gap-2'>
                        {
                            logo &&
                            <div className={`${frameLogo === 'Light' ? 'bg-gray-100' : 'bg-gray-900'} p-1 rounded-[8px] max-w-16`}>
                                <img src={logo} className=' rounded-[8px]' />
                            </div>
                        }
                        <h1 className={`text-2xl font-black text-gray-900 flex items-center uppercase tracking-widest`}>
                            {span1}{span2}
                        </h1>
                    </div>
                    <div className="hidden sm:flex space-x-3">
                        {/* Tombol Pengaturan Tema */}

                        <button className="p-2 text-red-500 hover:bg-gray-100 rounded-full transition relative" aria-label="Favorit">
                            <Heart className="w-6 h-6" />
                            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold">
                                3
                            </span>
                        </button>
                        <button className={`p-2 ${color?.text600} hover:bg-gray-100 rounded-full transition relative`} aria-label="Keranjang Belanja">
                            <ShoppingCart className="w-6 h-6" />
                            <span className={`absolute top-0 right-0 h-4 w-4 ${color?.bg600} text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold`}>
                                2
                            </span>
                        </button>
                        <button className={`p-2 ${color?.text600} hover:bg-gray-100 rounded-full transition relative`} aria-label="Keranjang Belanja">
                            <Clock className="w-6 h-6" />
                            <span className={`absolute top-0 right-0 h-4 w-4 ${color?.bg600} text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold`}>
                                4
                            </span>
                        </button>
                    </div>
                </div>
            </header>
            <div className="w-full shadow-2xl overflow-hidden">
                <div className={`p-20 text-center ${bg} ${text} italic`}>
                    Konten Website...
                </div>
                <nav className="flex sm:hidden ${bg}  justify-between px-8">
                    <button className="p-2 text-red-500 hover:bg-gray-100 rounded-full transition relative" aria-label="Favorit">
                        <Heart className="w-6 h-6" />
                        <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold">
                            3
                        </span>
                    </button>
                    <button className={`p-2 ${color?.text600} hover:bg-gray-100 rounded-full transition relative`} aria-label="Keranjang Belanja">
                        <ShoppingCart className="w-6 h-6" />
                        <span className={`absolute top-0 right-0 h-4 w-4 ${color?.bg600} text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold`}>
                            2
                        </span>
                    </button>
                    <button className={`p-2 ${color?.text600} hover:bg-gray-100 rounded-full transition relative`} aria-label="Keranjang Belanja">
                        <Clock className="w-6 h-6" />
                        <span className={`absolute top-0 right-0 h-4 w-4 ${color?.bg600} text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold`}>
                            4
                        </span>
                    </button>
                </nav>
            </div>
        </>
    )
}

export default Six