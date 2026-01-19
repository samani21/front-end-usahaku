import { DUMMY_HISTORY_TEN, DUMMY_PRODUCTS_TEN } from '@/hooks/Theme/ProductTen';
import { OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Heart, History, ShoppingCart } from 'lucide-react';
import React, { useMemo, useState } from 'react'
import DrawerNine from './Drawer/DrawerNine';

type Props = {
    color: ThemeColorSet;
    bg: string;
    text: string;
    logo: string | null;
    span1: string;
    span2: string;
    frameLogo: string;
}
const Ten = ({ color, bg, text, logo, span1, span2, frameLogo }: Props) => {

    const [openDrawer, setOpenDrawer] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');

    const favoriteProducts: Product[] = DUMMY_PRODUCTS_TEN?.filter(p => p?.isFavorite);
    const history: OrderItem[] = DUMMY_HISTORY_TEN;
    /* ===================== Numeric Theme ===================== */
    const cartTotal = useMemo(
        () => history.reduce((t, i) => t + i.finalPrice * i.quantity, 0),
        [history]
    );
    return (
        <div className=''>
            <header className="absolute w-full top-0 bg-white shadow-md =">
                <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
                    <div className='flex items-center gap-2'>
                        {
                            logo &&
                            <div className={`${frameLogo === 'Light' ? 'bg-gray-100' : frameLogo === 'Dark' ? 'bg-gray-900' : ''} p-1 rounded-[8px] max-w-16`}>
                                <img src={logo} className=' rounded-[8px]' />
                            </div>
                        }
                        <h1 className={`text-xl font-bold ${color?.text600} tracking-wider`}>
                            {span1}{span2}
                        </h1>
                    </div>
                    <div className="hidden sm:flex space-x-4">
                        <button onClick={() => {
                            setOpenDrawer('favorite')
                            setTitle('Daftar Favorit')
                        }}
                            className={`relative p-2 text-red-600 ${color?.hoverText600} rounded-full transition`}
                        >
                            <Heart className="w-6 h-6" />
                        </button>
                        <button onClick={() => {
                            setOpenDrawer('cart')
                            setTitle('Keranjang Belanja')
                        }} className={`relative p-2 text-gray-600 ${color?.hoverText600} rounded-full transition`}>
                            <ShoppingCart size={24} />
                            <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>
                        </button>
                        <button onClick={() => {
                            setOpenDrawer('history')
                            setTitle('Keranjang Belanja')
                        }} className={`p-2 text-gray-600 ${color?.hoverText600} rounded-full transition`}>
                            <History size={24} />
                        </button>
                    </div>
                </div>
            </header >
            <nav className={`absolute w-full bottom-0 flex sm:hidden ${bg} justify-between px-8`}>
                <button onClick={() => {
                    setOpenDrawer('favorite')
                    setTitle('Daftar Favorit')
                }}
                    className={`relative p-2 text-red-600 ${color?.hoverText600} rounded-full transition`}
                >
                    <Heart className="w-6 h-6" />
                </button>
                <button onClick={() => {
                    setOpenDrawer('cart')
                    setTitle('Keranjang Belanja')
                }} className={`relative p-2 text-gray-600 ${color?.hoverText600} rounded-full transition`}>
                    <ShoppingCart size={24} />
                    <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>
                </button>
                <button onClick={() => {
                    setOpenDrawer('history')
                    setTitle('Keranjang Belanja')
                }} className={`p-2 text-gray-600 ${color?.hoverText600} rounded-full transition`}>
                    <History size={24} />
                </button>
            </nav>
            {
                openDrawer &&
                <div className='absolute inset-0 z-40  backdrop-blur-[0px]'>
                    <DrawerNine
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

export default Ten