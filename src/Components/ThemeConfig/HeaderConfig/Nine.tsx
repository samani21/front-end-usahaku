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
const Nine = ({ color, bg, text, logo, span1, span2, frameLogo }: Props) => {
    return (
        <>
            <header className="sticky top-0 z-30 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                    <div className='flex items-center gap-2'>
                        {
                            logo &&
                            <div className={`${frameLogo === 'Light' ? 'bg-gray-100' : 'bg-gray-900'} p-1 rounded-[8px] max-w-16`}>
                                <img src={logo} className=' rounded-[8px]' />
                            </div>
                        }
                        <h1 className={`text-2xl font-extrabold ${color?.text600} flex items-center`}>
                            {span1}{span2}
                        </h1>
                    </div>
                    <div className="hidden sm:flex space-x-4">
                        <button
                            className={`relative p-2 text-red-600 ${color?.hoverText600} rounded-full transition`}
                        >
                            <Heart className="w-6 h-6" />
                        </button>
                        <button className={`relative p-2 text-gray-600 ${color?.hoverText600} rounded-full transition`}>
                            <ShoppingCart size={24} />
                            <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>
                        </button>
                        <button className={`p-2 text-gray-600 ${color?.hoverText600} rounded-full transition`}>
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
                        className={`relative p-2 text-red-600 ${color?.hoverText600} rounded-full transition`}
                    >
                        <Heart className="w-6 h-6" />
                    </button>
                    <button className={`relative p-2 text-gray-600 ${color?.hoverText600} rounded-full transition`}>
                        <ShoppingCart size={24} />
                        <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>
                    </button>
                    <button className={`p-2 text-gray-600 ${color?.hoverText600} rounded-full transition`}>
                        <History size={24} />
                    </button>
                </nav>
            </div>
        </>
    )
}

export default Nine