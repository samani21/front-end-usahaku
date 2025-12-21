import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Heart, History, ShoppingBag } from 'lucide-react';
import React from 'react'

interface HeaderIconProps {
    Icon: React.ElementType;
    count: number;
    label: string;
    color: ThemeColorSet;
}


type Props = {
    bg: string;
    text: string;
    logo: string | null;
    span1: string;
    span2: string;
    frameLogo: string;
}
const Five = ({ bg, text, logo, span1, span2, frameLogo }: Props) => {
    return (
        <>
            <header className="sticky top-0 z-30 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className='flex items-center gap-2'>
                        {
                            logo &&
                            <div className={`${frameLogo === 'Light' ? 'bg-gray-100' : 'bg-gray-900'} p-1 rounded-[8px] max-w-16`}>
                                <img src={logo} className=' rounded-[8px]' />
                            </div>
                        }
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                            {span1}{span2}
                        </h1>
                    </div>
                    <nav className="hidden sm:flex space-x-4">
                        <button
                            className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150 relative"
                            aria-label="Pesanan Saya"
                        >
                            <Heart size={24} />
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{2}</span>
                        </button>
                        <button
                            className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150 relative"
                            aria-label="Pesanan Saya"
                        >
                            <ShoppingBag size={24} />
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{4}</span>
                        </button>
                        <button
                            className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150 relative"
                            aria-label="Pesanan Saya"
                        >
                            <History size={24} />
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{3}</span>
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
                        className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150 relative"
                        aria-label="Pesanan Saya"
                    >
                        <Heart size={24} />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{2}</span>
                    </button>
                    <button
                        className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150 relative"
                        aria-label="Pesanan Saya"
                    >
                        <ShoppingBag size={24} />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{4}</span>
                    </button>
                    <button
                        className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150 relative"
                        aria-label="Pesanan Saya"
                    >
                        <History size={24} />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{3}</span>
                    </button>
                </nav>
            </div>
        </>
    )
}

export default Five