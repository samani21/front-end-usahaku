import { DUMMY_HISTORY_ELEVEN, DUMMY_PRODUCTS_ELEVEN } from '@/hooks/Theme/ProductEleven';
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
const Eleven = ({ color, bg, text, logo, span1, span2, frameLogo }: Props) => {

    const [openDrawer, setOpenDrawer] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');

    const favoriteProducts: Product[] = DUMMY_PRODUCTS_ELEVEN?.filter(p => p?.isFavorite);
    const history: OrderItem[] = DUMMY_HISTORY_ELEVEN;
    /* ===================== Numeric Theme ===================== */
    const cartTotal = useMemo(
        () => history.reduce((t, i) => t + i.finalPrice * i.quantity, 0),
        [history]
    );
    return (
        <div className='relative'>
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
                        <button onClick={() => {
                            setOpenDrawer('favorite')
                            setTitle('Daftar Favorit')
                        }}
                            className={`relative p-2 rounded-full ${color?.hoverBg600} transition-colors`}
                        >
                            <Heart size={24} />
                            <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>

                        </button>
                        <button onClick={() => {
                            setOpenDrawer('cart')
                            setTitle('Keranjang Belanja')
                        }}
                            className={`relative p-2 rounded-full ${color?.hoverBg600} transition-colors`}
                        >
                            <ShoppingCart size={24} />
                            <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>

                        </button>
                        <button onClick={() => {
                            setOpenDrawer('history')
                            setTitle('Keranjang Belanja')
                        }}
                            className={`p-2 rounded-full ${color?.hoverBg600} transition-colors`}
                        >
                            <History size={24} />
                        </button>
                    </div>
                </div>
            </header>
            <div className="w-full shadow-2xl overflow-hidden">
                <div className={`p-20 text-center ${bg} ${text} italic  h-[561px] sm:h-[700px]`}>
                    Konten Website...
                </div>
                <nav className="flex sm:hidden ${bg}  justify-between px-8">
                    <button
                        onClick={() => {
                            setOpenDrawer('favorite')
                            setTitle('Daftar Favorit')
                        }}
                        className={`relative p-2 rounded-full ${color?.hoverBg600} transition-colors`}
                    >
                        <Heart size={24} />
                        <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>

                    </button>
                    <button
                        onClick={() => {
                            setOpenDrawer('cart')
                            setTitle('Keranjang Belanja')
                        }}
                        className={`relative p-2 rounded-full ${color?.hoverBg600} transition-colors`}
                    >
                        <ShoppingCart size={24} />
                        <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>

                    </button>
                    <button
                        onClick={() => {
                            setOpenDrawer('history')
                            setTitle('Keranjang Belanja')
                        }}
                        className={`p-2 rounded-full ${color?.hoverBg600} transition-colors`}
                    >
                        <History size={24} />
                    </button>
                </nav>
            </div>
            {
                openDrawer &&
                <div className='absolute inset-0 z-40  backdrop-blur-[0px] h-[670px]'>
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

export default Eleven