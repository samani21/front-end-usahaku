import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Heart, History, ShoppingCart, Smartphone } from 'lucide-react';
import React from 'react'

interface HeaderIconProps {
    Icon: React.ElementType;
    count: number;
    label: string;
    color: ThemeColorSet;
}

const HeaderIconTwo: React.FC<HeaderIconProps> = ({ Icon, count, label, color }) => (
    <button
        aria-label={label}
        className={`p-2 rounded-full text-gray-600 ${color?.hoverText600} ${color?.hoverBg50} transition duration-150 relative group`}
    >
        <Icon size={24} />
        {count > 0 && (
            <span className={`absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 ${color?.bg600} rounded-full`}>
                {count > 99 ? '99+' : count}
            </span>
        )}
        <span className="absolute  left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
            {label}
        </span>
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
const Two = ({ color, bg, text, logo, span1, span2 }: Props) => {
    return (
        <>
            <header className="sticky top-0 z-40 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        {
                            logo &&
                            <img src={logo} className='w-10 h-10 object-cover rounded-[8px]' />
                        }
                        <h1 className={`text-2xl font-extrabold flex items-center ${color?.text700}`}>
                            {span1}{span2}
                        </h1>
                    </div>
                    <div className="hidden sm:flex space-x-4">
                        <HeaderIconTwo Icon={Heart} count={2} label="Buka Favorit" color={color} />
                        <HeaderIconTwo Icon={ShoppingCart} count={4} label="Buka Keranjang" color={color} />
                        <HeaderIconTwo Icon={History} count={5} label="Buka Riwayat Pesanan" color={color} />
                    </div>
                </div>
            </header>
            <div className="w-full shadow-2xl overflow-hidden">
                <div className={`p-20 text-center ${bg} ${text} italic`}>
                    Konten Website...
                </div>
                <nav className="flex sm:hidden ${bg}  justify-between px-8">
                    <HeaderIconTwo Icon={Heart} count={0} label="Buka Favorit" color={color} />
                    <HeaderIconTwo Icon={ShoppingCart} count={4} label="Buka Keranjang" color={color} />
                    <HeaderIconTwo Icon={History} count={4} label="Buka Riwayat Pesanan" color={color} />
                </nav>
            </div>
        </>
    )
}

export default Two