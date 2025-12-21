import React from 'react'
import { Heart, History, ShoppingCart } from 'lucide-react'
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

const HeaderThree = ({ color, openDrawer, favoriteProducts, cart, history, header }: Props) => {
    return (
        <>
            <header className="sticky top-0 z-20 bg-white shadow-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                    <div className={`text-xl font-bold ${color?.text600} flex items-center gap-2`}>
                        {
                            header?.logo &&
                            <div className={`${header?.frameLogo === 'Light' ? 'bg-gray-100' : 'bg-gray-900'} p-1 rounded-[8px] max-w-16`}>
                                <img src={header?.logo} className=' rounded-[8px]' />
                            </div>
                        }
                        {header?.span1}{header?.span2}
                    </div>
                    <div className="hidden sm:flex space-x-4">
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 transition duration-150 relative"
                            aria-label="Daftar Favorit"
                            onClick={() => openDrawer('favorite')}
                        >
                            <Heart className="h-6 w-6 text-red-500" />
                            <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center text-xs text-white bg-red-500 rounded-full">{favoriteProducts?.length}</span>
                        </button>
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 transition duration-150 relative"
                            aria-label="Keranjang Belanja"
                            onClick={() => openDrawer('cart')}
                        >
                            {/* Order icon color is secondary/fixed blue for cart */}
                            <ShoppingCart className="h-6 w-6 text-blue-600" />
                            <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center text-xs text-white bg-blue-600 rounded-full">{cart?.length}</span>
                        </button>                <button
                            className="p-2 rounded-full hover:bg-gray-100 transition duration-150 relative"
                            aria-label="Keranjang Belanja"
                            onClick={() => openDrawer('history')}
                        >
                            {/* Order icon color is secondary/fixed blue for cart */}
                            <History className="h-6 w-6 text-gray-500" />
                            <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center text-xs text-white bg-gray-600 rounded-full">{history?.length}</span>
                        </button>
                    </div>
                </div>
            </header>
            <nav className="flex space-x-3 sm:hidden justify-between px-8 fixed bottom-0 bg-gray-100 w-full z-10 pt-1">
                <button
                    className="p-2 rounded-full hover:bg-gray-100 transition duration-150 relative"
                    aria-label="Daftar Favorit"
                    onClick={() => openDrawer('favorite')}
                >
                    <Heart className="h-6 w-6 text-red-500" />
                    <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center text-xs text-white bg-red-500 rounded-full">{favoriteProducts?.length}</span>
                </button>
                <button
                    className="p-2 rounded-full hover:bg-gray-100 transition duration-150 relative"
                    aria-label="Keranjang Belanja"
                    onClick={() => openDrawer('cart')}
                >
                    {/* Order icon color is secondary/fixed blue for cart */}
                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                    <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center text-xs text-white bg-blue-600 rounded-full">{cart?.length}</span>
                </button>                <button
                    className="p-2 rounded-full hover:bg-gray-100 transition duration-150 relative"
                    aria-label="Keranjang Belanja"
                    onClick={() => openDrawer('history')}
                >
                    {/* Order icon color is secondary/fixed blue for cart */}
                    <History className="h-6 w-6 text-gray-500" />
                    <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center text-xs text-white bg-gray-600 rounded-full">{history?.length}</span>
                </button>
            </nav>
        </>

    )
}

export default HeaderThree