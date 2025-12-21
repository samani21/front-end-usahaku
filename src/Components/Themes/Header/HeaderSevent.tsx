import React from 'react'
import { Heart, History, ShoppingBag } from 'lucide-react'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { Header } from '@/lib/Types/Theme/theme';

type Props = {
    color: ThemeColorSet;
    openDrawer: (val: DrawerType) => void;
    favoriteProducts: Product[];
    cart: OrderItem[];
    history: OrderItem[];
    header: Header | null
}

const HeaderSevent = ({ color, openDrawer, favoriteProducts, cart, history, header }: Props) => {
    return (
        <>
            <header className="sticky top-0 z-30 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    <div className='flex items-center gap-2'>
                        {
                            header?.logo &&
                            <div className={`${header?.frameLogo === 'Light' ? 'bg-gray-100' : 'bg-gray-900'} p-1 rounded-[8px] max-w-16`}>
                                <img src={header?.logo} className=' rounded-[8px]' />
                            </div>
                        }
                        <h1 className={`text-2xl font-extrabold ${color?.text600}`}>
                            {header?.span1}{header?.span2}
                        </h1>
                    </div>
                    <nav className="hidden sm:flex items-center space-x-3">
                        {/* Icon Favorite */}
                        <button
                            onClick={() => openDrawer('favorite')}
                            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-red-500 transition relative"
                            aria-label="Favorite"
                        >
                            <Heart size={24} />
                            {favoriteProducts.length > 0 && (
                                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                            )}
                        </button>
                        {/* Icon Order (Keranjang) */}
                        <button
                            onClick={() => openDrawer('cart')}
                            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-blue-500 transition relative"
                            aria-label="Order"
                        >
                            <ShoppingBag size={24} />
                            {cart.length > 0 && (
                                <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full border-2 border-white"></span>
                            )}
                        </button>
                        <button
                            onClick={() => openDrawer('history')}
                            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-blue-500 transition relative"
                            aria-label="Order"
                        >
                            <History size={24} />
                            {history.length > 0 && (
                                <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full border-2 border-white"></span>
                            )}
                        </button>

                    </nav>
                </div>
            </header>
            <nav className="flex space-x-3 sm:hidden justify-between px-8 fixed bottom-0 bg-gray-100 w-full z-10 pt-1">
                <button
                    onClick={() => openDrawer('favorite')}
                    className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-red-500 transition relative"
                    aria-label="Favorite"
                >
                    <Heart size={24} />
                    {favoriteProducts.length > 0 && (
                        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                    )}
                </button>
                {/* Icon Order (Keranjang) */}
                <button
                    onClick={() => openDrawer('cart')}
                    className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-blue-500 transition relative"
                    aria-label="Order"
                >
                    <ShoppingBag size={24} />
                    {cart.length > 0 && (
                        <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full border-2 border-white"></span>
                    )}
                </button>
                <button
                    onClick={() => openDrawer('history')}
                    className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-blue-500 transition relative"
                    aria-label="Order"
                >
                    <History size={24} />
                    {history.length > 0 && (
                        <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full border-2 border-white"></span>
                    )}
                </button>

            </nav>
        </>
    )
}

export default HeaderSevent