import { DUMMY_HISTORY_FIVE, DUMMY_PRODUCTS_FIVE } from '@/hooks/Theme/ProductFive';
import { OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Heart, History, ShoppingBag } from 'lucide-react';
import React, { useMemo, useState } from 'react'
import DrawerFive from './Drawer/DrawerFive';

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
    color: ThemeColorSet;
}
const Five = ({ bg, text, logo, span1, span2, frameLogo, color }: Props) => {

    const [openDrawer, setOpenDrawer] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');

    const favoriteProducts: Product[] = DUMMY_PRODUCTS_FIVE?.filter(p => p?.isFavorite);
    const history: OrderItem[] = DUMMY_HISTORY_FIVE;
    /* ===================== Numeric Theme ===================== */
    const cartTotal = useMemo(
        () => history.reduce((t, i) => t + i.finalPrice * i.quantity, 0),
        [history]
    );

    return (
        <div className='relative'>
            <header className="sticky top-0 z-30 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className='flex items-center gap-2'>
                        {
                            logo &&
                            <div className={`${frameLogo === 'Light' ? 'bg-gray-100' : frameLogo === 'Dark' ? 'bg-gray-900' : ''} p-1 rounded-[8px] max-w-16`}>
                                <img src={logo} className=' rounded-[8px]' />
                            </div>
                        }
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                            {span1}{span2}
                        </h1>
                    </div>
                    <nav className="hidden sm:flex space-x-4">
                        <button
                            onClick={() => {
                                setOpenDrawer('favorite')
                                setTitle('Daftar Favorit')
                            }}
                            className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150 relative"
                            aria-label="Pesanan Saya"
                        >
                            <Heart size={24} />
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{favoriteProducts?.length}</span>
                        </button>
                        <button
                            onClick={() => {
                                setOpenDrawer('cart')
                                setTitle('Keranjang Belanja')
                            }}
                            className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150 relative"
                            aria-label="Pesanan Saya"
                        >
                            <ShoppingBag size={24} />
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{history?.length}</span>
                        </button>
                        <button
                            onClick={() => {
                                setOpenDrawer('history')
                                setTitle('Keranjang Belanja')
                            }}
                            className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150 relative"
                            aria-label="Pesanan Saya"
                        >
                            <History size={24} />
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{history?.length}</span>
                        </button>
                    </nav>
                </div>
            </header>
            <div className="w-full shadow-2xl overflow-hidden">
                <div className={`p-20 text-center ${bg} ${text} italic h-[561px] sm:h-[700px]`}>
                    Konten Website...
                </div>
                <nav className="flex sm:hidden ${bg}  justify-between px-8">
                    <button
                        onClick={() => {
                            setOpenDrawer('favorite')
                            setTitle('Daftar Favorit')
                        }}
                        className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150 relative"
                        aria-label="Pesanan Saya"
                    >
                        <Heart size={24} />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{favoriteProducts?.length}</span>
                    </button>
                    <button
                        onClick={() => {
                            setOpenDrawer('cart')
                            setTitle('Keranjang Belanja')
                        }}
                        className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150 relative"
                        aria-label="Pesanan Saya"
                    >
                        <ShoppingBag size={24} />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{history?.length}</span>
                    </button>
                    <button
                        onClick={() => {
                            setOpenDrawer('history')
                            setTitle('Keranjang Belanja')
                        }}
                        className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150 relative"
                        aria-label="Pesanan Saya"
                    >
                        <History size={24} />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{history?.length}</span>
                    </button>
                </nav>
            </div>
            {
                openDrawer &&
                <div className='absolute inset-0 z-40  backdrop-blur-[0px] h-[670px]'>
                    <DrawerFive
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

export default Five