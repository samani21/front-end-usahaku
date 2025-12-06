import React from 'react'
import HeaderIconOne from '../HeaderIcon/HeaderIconOne'
import { Heart, History, Package, ShoppingCart, Smartphone } from 'lucide-react'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import HeaderIconTwo from '../HeaderIcon/HeaderIconTwo';

type Props = {
    color: ThemeColorSet;
    openDrawer: (val: DrawerType) => void;
    favoriteProducts: Product[];
    cart: OrderItem[];
    history: OrderItem[];
}

const HeaderThree = ({ color, openDrawer, favoriteProducts, cart, history }: Props) => {
    return (
        <header className="sticky top-0 z-20 bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className={`text-xl font-bold ${color?.text600}`}>
                    <Package className="inline h-6 w-6 mr-2" /> Minimarket App
                </div>
                <div className="flex space-x-4">
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
    )
}

export default HeaderThree