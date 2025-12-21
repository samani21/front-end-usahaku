import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Heart, History, ShoppingBag, ShoppingCart, TextAlignJustify } from 'lucide-react';
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
const Eleven = ({ color, bg, text, logo, span1, span2, frameLogo }: Props) => {
    return (
        <>
            <header className={`sticky top-0 left-0 w-full ${color?.bg700} shadow-md z-30`}>
                <div className="max-w-7xl mx-auto p-4 flex justify-between items-center text-white">

                    <div className='flex items-center gap-2'>
                        {
                            logo &&
                            <div className={`${frameLogo === 'Light' ? 'bg-gray-100' : 'bg-gray-900'} p-1 rounded-[8px] max-w-16`}>
                                <img src={logo} className=' rounded-[8px]' />
                            </div>
                        }
                        <div className="flex flex-col text-lg font-bold">
                            {span1}{span2}
                        </div>
                    </div>
                    {/* Kanan: Icons */}
                    <div className="hidden sm:flex space-x-4">
                        <button
                            className={`relative p-2 rounded-full ${color?.hoverBg600} transition-colors`}
                        >
                            <Heart size={24} />
                            <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>

                        </button>
                        <button
                            className={`relative p-2 rounded-full ${color?.hoverBg600} transition-colors`}
                        >
                            <ShoppingCart size={24} />
                            <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>

                        </button>
                        <button
                            className={`p-2 rounded-full ${color?.hoverBg600} transition-colors`}
                        >
                            <History size={24} />
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
                        className={`relative p-2 rounded-full ${color?.hoverBg600} transition-colors`}
                    >
                        <Heart size={24} />
                        <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>

                    </button>
                    <button
                        className={`relative p-2 rounded-full ${color?.hoverBg600} transition-colors`}
                    >
                        <ShoppingCart size={24} />
                        <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>

                    </button>
                    <button
                        className={`p-2 rounded-full ${color?.hoverBg600} transition-colors`}
                    >
                        <History size={24} />
                    </button>
                </nav>
            </div>
        </>
    )
}

export default Eleven