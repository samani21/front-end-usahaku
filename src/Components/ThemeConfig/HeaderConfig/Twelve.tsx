import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Clock, Heart, History, Menu, ShoppingBag, ShoppingCart, TextAlignJustify } from 'lucide-react';
import React, { useState } from 'react'


type Props = {
    color: ThemeColorSet;
    bg: string;
    text: string;
    logo: string | null;
    span1: string;
    span2: string;
    frameLogo: string;
}
const Twelve = ({ color, bg, text, logo, span1, span2, frameLogo }: Props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    return (
        <>
            <header className="sticky top-0 z-30 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

                    <div className='flex items-center gap-2'>
                        {
                            logo &&
                            <div className={`${frameLogo === 'Light' ? 'bg-gray-100' : 'bg-gray-900'} p-1 rounded-[8px] max-w-16`}>
                                <img src={logo} className=' rounded-[8px]' />
                            </div>
                        }
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                            <span className={color?.text500}>{span1}</span>{span2}
                        </h1>
                    </div>
                    {/* Desktop Icons */}
                    <div className="hidden sm:flex space-x-4">
                        <button
                            className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            <Heart size={24} />
                            <span
                                className="absolute top-1 right-1 block h-3 w-3 rounded-full ring-2 ring-white bg-red-600 transform translate-x-1/2 -translate-y-1/2"
                                aria-label="Notifikasi Keranjang"
                            ></span>
                        </button>
                        <button
                            className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            <ShoppingCart size={24} />

                            <span
                                className="absolute top-1 right-1 block h-3 w-3 rounded-full ring-2 ring-white bg-red-600 transform translate-x-1/2 -translate-y-1/2"
                                aria-label="Notifikasi Keranjang"
                            ></span>
                        </button>
                        <button
                            className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            <Clock size={24} />
                            <span
                                className="absolute top-1 right-1 block h-3 w-3 rounded-full ring-2 ring-white bg-red-600 transform translate-x-1/2 -translate-y-1/2"
                                aria-label="Notifikasi Keranjang"
                            ></span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="sm:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                        aria-label="Menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* Mobile Menu Drawer (simple) */}
                <div className={`sm:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-60 opacity-100 py-2' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col space-y-2 px-4">
                        <button
                            className="flex items-center justify-start p-3 text-gray-700 rounded-lg hover:bg-orange-50 transition-colors"
                        >
                            <Heart size={20} className="mr-3" />
                            Favorit
                            <span className="ml-auto h-3 w-3 rounded-full bg-red-600" aria-label="Notifikasi Keranjang"></span>
                        </button>
                        <button
                            className="flex items-center justify-start p-3 text-gray-700 rounded-lg hover:bg-orange-50 transition-colors"
                        >
                            <ShoppingCart size={20} className="mr-3" />
                            Pesananku
                            <span className="ml-auto h-3 w-3 rounded-full bg-red-600" aria-label="Notifikasi Keranjang"></span>
                        </button>
                        <button
                            className="flex items-center justify-start p-3 text-gray-700 rounded-lg hover:bg-orange-50 transition-colors"
                        >
                            <Clock size={20} className="mr-3" />
                            Riwayat
                            <span className="ml-auto h-3 w-3 rounded-full bg-red-600" aria-label="Notifikasi Keranjang"></span>
                        </button>
                    </div>
                </div>
            </header>
            <div className="w-full shadow-2xl overflow-hidden">
                <div className={`p-20 text-center ${bg} ${text} italic`}>
                    Konten Website...
                </div>
            </div>
        </>
    )
}

export default Twelve