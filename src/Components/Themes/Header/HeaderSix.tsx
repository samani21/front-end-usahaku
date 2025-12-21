import React from 'react'
import { Clock, Heart, ShoppingCart } from 'lucide-react'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { Header } from '@/lib/Types/Theme/theme';

type Props = {
    color: ThemeColorSet;
    openDrawer: (val: DrawerType) => void;
    favoriteProducts: Product[];
    cart: OrderItem[];
    header: Header | null
    history: OrderItem[];
}

const HeaderSix = ({ color, openDrawer, favoriteProducts, cart, history, header }: Props) => {
    return (
        <>
            <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                    <div className='flex items-center gap-2'>
                        {
                            header?.logo &&
                            <div className={`${header?.frameLogo === 'Light' ? 'bg-gray-100' : 'bg-gray-900'} p-1 rounded-[8px] max-w-16`}>
                                <img src={header?.logo} className=' rounded-[8px]' />
                            </div>
                        }
                        <h1 className={`text-2xl font-black text-gray-900 flex items-center uppercase tracking-widest`}>
                            {header?.span1}{header?.span2}
                        </h1>
                    </div>
                    <div className="hidden sm:flex space-x-3">
                        {/* Tombol Pengaturan Tema */}

                        <button onClick={() => openDrawer('favorite')} className="p-2 text-red-500 hover:bg-gray-100 rounded-full transition relative" aria-label="Favorit">
                            <Heart className="w-6 h-6" />
                            {favoriteProducts.length > 0 && (
                                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold">
                                    {favoriteProducts.length}
                                </span>
                            )}
                        </button>
                        <button onClick={() => openDrawer('cart')} className={`p-2 ${color?.text600} hover:bg-gray-100 rounded-full transition relative`} aria-label="Keranjang Belanja">
                            <ShoppingCart className="w-6 h-6" />
                            {cart.length > 0 && (
                                <span className={`absolute top-0 right-0 h-4 w-4 ${color?.bg600} text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold`}>
                                    {cart.length}
                                </span>
                            )}
                        </button>
                        <button onClick={() => openDrawer('history')} className={`p-2 ${color?.text600} hover:bg-gray-100 rounded-full transition relative`} aria-label="Keranjang Belanja">
                            <Clock className="w-6 h-6" />
                            {history.length > 0 && (
                                <span className={`absolute top-0 right-0 h-4 w-4 ${color?.bg600} text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold`}>
                                    {history.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>
            <nav className="flex space-x-3 sm:hidden justify-between px-8 fixed bottom-0 bg-gray-100 w-full z-10 pt-1">
                <button onClick={() => openDrawer('favorite')} className="p-2 text-red-500 hover:bg-gray-100 rounded-full transition relative" aria-label="Favorit">
                    <Heart className="w-6 h-6" />
                    {favoriteProducts.length > 0 && (
                        <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold">
                            {favoriteProducts.length}
                        </span>
                    )}
                </button>
                <button onClick={() => openDrawer('cart')} className={`p-2 ${color?.text600} hover:bg-gray-100 rounded-full transition relative`} aria-label="Keranjang Belanja">
                    <ShoppingCart className="w-6 h-6" />
                    {cart.length > 0 && (
                        <span className={`absolute top-0 right-0 h-4 w-4 ${color?.bg600} text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold`}>
                            {cart.length}
                        </span>
                    )}
                </button>
                <button onClick={() => openDrawer('history')} className={`p-2 ${color?.text600} hover:bg-gray-100 rounded-full transition relative`} aria-label="Keranjang Belanja">
                    <Clock className="w-6 h-6" />
                    {history.length > 0 && (
                        <span className={`absolute top-0 right-0 h-4 w-4 ${color?.bg600} text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold`}>
                            {history.length}
                        </span>
                    )}
                </button>
            </nav>
        </>
    )
}

export default HeaderSix