import React from 'react'
import HeaderIconOne from '../HeaderIcon/HeaderIconOne'
import { Heart, History, ShoppingCart } from 'lucide-react'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';

type Props = {
    color: ThemeColorSet;
    openDrawer: (val: DrawerType) => void;
    favoriteProducts: Product[];
    cart: OrderItem[];
    history: OrderItem[];
}

const HeaderOne = ({ color, openDrawer, favoriteProducts, cart, history }: Props) => {
    return (
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <h1 className={`text-2xl font-extrabold ${color?.text300} ${color?.hoverText200}`}>
                    E-KATALOG TEKNOLOGI
                </h1>
                <nav className="flex space-x-3">
                    <HeaderIconOne Icon={Heart} onClick={() => openDrawer('favorite')} count={favoriteProducts.length} label="Buka Favorit" />
                    <HeaderIconOne Icon={ShoppingCart} onClick={() => openDrawer('cart')} count={cart.length} label="Buka Keranjang" />
                    <HeaderIconOne Icon={History} onClick={() => openDrawer('history')} count={history.length} label="Buka Riwayat Pesanan" />
                </nav>
            </div>
        </header>
    )
}

export default HeaderOne