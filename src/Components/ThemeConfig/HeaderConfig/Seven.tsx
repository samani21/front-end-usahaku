import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Heart, History, ShoppingBag } from 'lucide-react';
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
const Seven = ({ color, bg, text, logo, span1, span2, frameLogo }: Props) => {
    return (
        <>
            <header className="sticky top-0 z-30 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    <div className='flex items-center gap-2'>
                        {
                            logo &&
                            <div className={`${frameLogo === 'Light' ? 'bg-gray-100' : 'bg-gray-900'} p-1 rounded-[8px] max-w-16`}>
                                <img src={logo} className=' rounded-[8px]' />
                            </div>
                        }
                        <h1 className={`text-2xl font-extrabold ${color?.text600}`}>
                            {span1}{span2}
                        </h1>
                    </div>
                    <nav className="hidden sm:flex items-center space-x-3">
                        {/* Icon Favorite */}
                        <button
                            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-red-500 transition relative"
                            aria-label="Favorite"
                        >
                            <Heart size={24} />
                            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>

                        </button>
                        {/* Icon Order (Keranjang) */}
                        <button
                            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-blue-500 transition relative"
                            aria-label="Order"
                        >
                            <ShoppingBag size={24} />
                            <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full border-2 border-white"></span>
                        </button>
                        <button
                            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-blue-500 transition relative"
                            aria-label="Order"
                        >
                            <History size={24} />
                            <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full border-2 border-white"></span>

                        </button>

                    </nav>
                </div>
            </header>
            <div className="w-full shadow-2xl overflow-hidden">
                <div className={`p-20 text-center ${bg} ${text} italic`}>
                    Konten Website...
                </div>
                <nav className="flex sm:hidden ${bg}  justify-between px-8">
                    <button
                        className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-red-500 transition relative"
                        aria-label="Favorite"
                    >
                        <Heart size={24} />
                        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>

                    </button>
                    {/* Icon Order (Keranjang) */}
                    <button
                        className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-blue-500 transition relative"
                        aria-label="Order"
                    >
                        <ShoppingBag size={24} />
                        <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full border-2 border-white"></span>
                    </button>
                    <button
                        className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-blue-500 transition relative"
                        aria-label="Order"
                    >
                        <History size={24} />
                        <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full border-2 border-white"></span>

                    </button>
                </nav>
            </div>
        </>
    )
}

export default Seven