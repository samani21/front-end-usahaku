import { DUMMY_HISTORY_SIX, DUMMY_PRODUCTS_SIX } from '@/hooks/Theme/ProductSix';
import { OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Clock, Heart, ShoppingCart } from 'lucide-react';
import React, { useMemo, useState } from 'react'
import DrawerSix from './Drawer/DrawerSix';


type Props = {
    color: ThemeColorSet;
    bg: string;
    text: string;
    logo: string | null;
    span1: string;
    span2: string;
    frameLogo: string;
}
const Six = ({ color, bg, text, logo, span1, span2, frameLogo }: Props) => {
    const [openDrawer, setOpenDrawer] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');

    const favoriteProducts: Product[] = DUMMY_PRODUCTS_SIX?.filter(p => p?.isFavorite);
    const history: OrderItem[] = DUMMY_HISTORY_SIX;
    /* ===================== Numeric Theme ===================== */
    const cartTotal = useMemo(
        () => history.reduce((t, i) => t + i.finalPrice * i.quantity, 0),
        [history]
    );

    return (
        <div className='relative'>
            <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                    <div className='flex items-center gap-2'>
                        {
                            logo &&
                            <div className={`${frameLogo === 'Light' ? 'bg-gray-100' : frameLogo === 'Dark' ? 'bg-gray-900' : ''} p-1 rounded-[8px] max-w-16`}>
                                <img src={logo} className=' rounded-[8px]' />
                            </div>
                        }
                        <h1 className={`text-2xl font-black text-gray-900 flex items-center uppercase tracking-widest`}>
                            {span1}{span2}
                        </h1>
                    </div>
                    <div className="hidden sm:flex space-x-3">
                        {/* Tombol Pengaturan Tema */}

                        <button onClick={() => {
                            setOpenDrawer('favorite')
                            setTitle('Favorit')
                        }} className="p-2 text-red-500 hover:bg-gray-100 rounded-full transition relative" aria-label="Favorit">
                            <Heart className="w-6 h-6" />
                            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold">
                                {favoriteProducts?.length}
                            </span>
                        </button>
                        <button onClick={() => {
                            setOpenDrawer('cart')
                            setTitle('Pesanan Anda')
                        }} className={`p-2 ${color?.text600} hover:bg-gray-100 rounded-full transition relative`} aria-label="Pesanan Anda">
                            <ShoppingCart className="w-6 h-6" />
                            <span className={`absolute top-0 right-0 h-4 w-4 ${color?.bg600} text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold`}>
                                {history?.length}
                            </span>
                        </button>
                        <button onClick={() => {
                            setOpenDrawer('history')
                            setTitle('Riwayat Pesanan')
                        }} className={`p-2 ${color?.text600} hover:bg-gray-100 rounded-full transition relative`} aria-label="Riwayat Pesanan">
                            <Clock className="w-6 h-6" />
                            <span className={`absolute top-0 right-0 h-4 w-4 ${color?.bg600} text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold`}>
                                {history?.length}
                            </span>
                        </button>
                    </div>
                </div>
            </header>
            <div className="w-full shadow-2xl overflow-hidden">
                <div className={`p-20 text-center ${bg} ${text} italic h-[561px] sm:h-[700px]`}>
                    Konten Website...
                </div>
                <nav className="flex sm:hidden ${bg}  justify-between px-8">
                    <button onClick={() => {
                        setOpenDrawer('favorite')
                        setTitle('Favorit')
                    }} className="p-2 text-red-500 hover:bg-gray-100 rounded-full transition relative" aria-label="Favorit">
                        <Heart className="w-6 h-6" />
                        <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold">
                            {favoriteProducts?.length}
                        </span>
                    </button>
                    <button onClick={() => {
                        setOpenDrawer('cart')
                        setTitle('Pesanan Anda')
                    }} className={`p-2 ${color?.text600} hover:bg-gray-100 rounded-full transition relative`} aria-label="Pesanan Anda">
                        <ShoppingCart className="w-6 h-6" />
                        <span className={`absolute top-0 right-0 h-4 w-4 ${color?.bg600} text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold`}>
                            {history?.length}
                        </span>
                    </button>
                    <button onClick={() => {
                        setOpenDrawer('history')
                        setTitle('Riwayat Pesanan')
                    }} className={`p-2 ${color?.text600} hover:bg-gray-100 rounded-full transition relative`} aria-label="Riwayat Pesanan">
                        <Clock className="w-6 h-6" />
                        <span className={`absolute top-0 right-0 h-4 w-4 ${color?.bg600} text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold`}>
                            {history?.length}
                        </span>
                    </button>
                </nav>
            </div>
            {
                openDrawer &&
                <div className='absolute inset-0 z-40  backdrop-blur-[0px] h-[670px]'>
                    <DrawerSix
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

export default Six