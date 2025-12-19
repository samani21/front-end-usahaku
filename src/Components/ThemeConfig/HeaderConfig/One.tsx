import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Heart, History, ShoppingCart } from 'lucide-react';
import React from 'react'

interface HeaderIconProps {
    Icon: React.ElementType;
    count: number;
    label: string;
}

const HeaderIconOne: React.FC<HeaderIconProps> = ({ Icon, count, label }) => (
    <button
        aria-label={label}
        className="p-2 relative rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150"
    >
        <Icon size={24} className="text-gray-700 dark:text-gray-200" />
        {count > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-zinc-600 rounded-full">
                {count > 99 ? '99+' : count}
            </span>
        )}
    </button>
);

type Props = {
    color: ThemeColorSet;
    bg: string;
    text: string;
    logo: string | null;
    span1: string;
    span2: string;
}
const One = ({ color, bg, text, logo, span1, span2 }: Props) => {
    return (
        <>
            <header className=" bg-white dark:bg-gray-800 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className='flex items-center gap-2'>
                        {
                            logo &&
                            <img src={logo} className='w-10 h-10 object-cover rounded-[8px]' />
                        }
                        <h1 className={`text-2xl font-extrabold ${color?.text300} ${color?.hoverText200}`}>
                            {span1}{span2}
                        </h1>
                    </div>
                    <nav className="hidden sm:flex space-x-3">
                        <HeaderIconOne Icon={Heart} count={0} label="Buka Favorit" />
                        <HeaderIconOne Icon={ShoppingCart} count={4} label="Buka Keranjang" />
                        <HeaderIconOne Icon={History} count={4} label="Buka Riwayat Pesanan" />
                    </nav>
                </div>
            </header>
            <div className="w-full shadow-2xl overflow-hidden">
                <div className={`p-20 text-center ${bg} ${text} italic`}>
                    Konten Website...
                </div>
                <nav className="flex sm:hidden bg-gray-800 justify-between px-8">
                    <HeaderIconOne Icon={Heart} count={0} label="Buka Favorit" />
                    <HeaderIconOne Icon={ShoppingCart} count={4} label="Buka Keranjang" />
                    <HeaderIconOne Icon={History} count={4} label="Buka Riwayat Pesanan" />
                </nav>
            </div>
        </>
    )
}

export default One