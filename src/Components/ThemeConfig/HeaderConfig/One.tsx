import { DUMMY_HISTORY_ONE, DUMMY_PRODUCTS_ONE } from '@/hooks/Theme/ProductOne';
import { OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Heart, History, ShoppingCart } from 'lucide-react';
import React, { useMemo, useState } from 'react'
import DrawerOne from './Drawer/DrawerOne';

interface HeaderIconProps {
    Icon: React.ElementType;
    count: number;
    label: string;
    drawer: string;
    onClik: (val: string, title: string) => void;
}

const HeaderIconOne: React.FC<HeaderIconProps> = ({ Icon, count, label, drawer, onClik }) => (
    <button
        aria-label={label}
        onClick={() => onClik(drawer, label)}
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
    frameLogo: string;
}
const One = ({ color, bg, text, logo, span1, span2, frameLogo }: Props) => {
    const [openDrawer, setOpenDrawer] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');

    const favoriteProducts: Product[] = DUMMY_PRODUCTS_ONE?.filter(p => p?.isFavorite);
    const history: OrderItem[] = DUMMY_HISTORY_ONE;
    /* ===================== Numeric Theme ===================== */
    const cartTotal = useMemo(
        () => history.reduce((t, i) => t + i.finalPrice * i.quantity, 0),
        [history]
    );
    return (
        <div className='relative'>
            <header className=" bg-white dark:bg-gray-800 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className='flex items-center gap-2'>
                        {
                            logo &&
                            <div className={`${frameLogo === 'Light' ? 'bg-gray-100' : 'bg-gray-900'} p-1 rounded-[8px] max-w-16`}>
                                <img src={logo} className=' rounded-[8px]' />
                            </div>
                        }
                        <h1 className={`text-2xl font-extrabold ${color?.text300} ${color?.hoverText200}`}>
                            {span1}{span2}
                        </h1>
                    </div>
                    <nav className="hidden sm:flex space-x-3">
                        <HeaderIconOne Icon={Heart} count={favoriteProducts?.length} label="Buka Favorit" drawer='favorite' onClik={(e, t) => {
                            setOpenDrawer(e)
                            setTitle(t)
                        }} />
                        <HeaderIconOne Icon={ShoppingCart} count={history?.length} label="Buka Keranjang" drawer='cart' onClik={(e, t) => {
                            setOpenDrawer(e)
                            setTitle(t)
                        }} />
                        <HeaderIconOne Icon={History} count={history?.length} label="Buka Riwayat Pesanan" drawer='history' onClik={(e, t) => {
                            setOpenDrawer(e)
                            setTitle(t)
                        }} />
                    </nav>
                </div>
            </header>
            <div className="w-full shadow-2xl overflow-hidden">
                <div className={`p-20 text-center ${bg} ${text} italic  h-[561px] sm:h-[700px] `}>
                    Konten Website...
                </div>
                <nav className="flex sm:hidden bg-gray-800 justify-between px-8">
                    <HeaderIconOne Icon={Heart} count={favoriteProducts?.length} label="Buka Favorit" drawer='favorite' onClik={(e, t) => {
                        setOpenDrawer(e)
                        setTitle(t)
                    }} />
                    <HeaderIconOne Icon={ShoppingCart} count={history?.length} label="Buka Keranjang" drawer='cart' onClik={(e, t) => {
                        setOpenDrawer(e)
                        setTitle(t)
                    }} />
                    <HeaderIconOne Icon={History} count={history?.length} label="Buka Riwayat Pesanan" drawer='history' onClik={(e, t) => {
                        setOpenDrawer(e)
                        setTitle(t)
                    }} />
                </nav>
            </div>
            {
                openDrawer &&
                <div className='absolute inset-0 z-40 bg-black/40 backdrop-blur-[0.6px] h-[670px]'>
                    <DrawerOne
                        isOpen={openDrawer ? true : false}
                        onClose={() => setOpenDrawer(null)}
                        title={title}
                        favoriteProducts={favoriteProducts}
                        type={openDrawer ? openDrawer : ''}
                        color={color}
                        cart={history}
                        history={history}
                        cartTotal={cartTotal} />
                </div>
            }
        </div>
    )
}

export default One