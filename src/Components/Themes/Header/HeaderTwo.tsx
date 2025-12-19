import React from 'react'
import HeaderIconOne from '../HeaderIcon/HeaderIconOne'
import { Heart, History, ShoppingCart, Smartphone } from 'lucide-react'
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

const HeaderTwo = ({ color, openDrawer, favoriteProducts, cart, history }: Props) => {
    return (
        <>
            <header className="sticky top-0 z-40 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className={`text-2xl font-extrabold flex items-center ${color?.text700}`}>
                            <Smartphone className={`w-6 h-6 mr-2 ${color?.text500} hidden sm:inline`} /> Katalog Minimalis
                        </h1>
                    </div>
                    <div className="hidden sm:flex space-x-4">
                        <HeaderIconTwo Icon={Heart} onClick={() => openDrawer('favorite')} count={favoriteProducts.length} label="Buka Favorit" color={color} />
                        <HeaderIconTwo Icon={ShoppingCart} onClick={() => openDrawer('cart')} count={cart.length} label="Buka Keranjang" color={color} />
                        <HeaderIconTwo Icon={History} onClick={() => openDrawer('history')} count={history.length} label="Buka Riwayat Pesanan" color={color} />
                    </div>
                </div>
            </header>
            <nav className="flex space-x-3 sm:hidden justify-between px-8 fixed bottom-0 bg-gray-100 w-full z-10">
                <HeaderIconTwo Icon={Heart} onClick={() => openDrawer('favorite')} count={favoriteProducts.length} label="Buka Favorit" color={color} />
                <HeaderIconTwo Icon={ShoppingCart} onClick={() => openDrawer('cart')} count={cart.length} label="Buka Keranjang" color={color} />
                <HeaderIconTwo Icon={History} onClick={() => openDrawer('history')} count={history.length} label="Buka Riwayat Pesanan" color={color} />

            </nav>
        </>
    )
}

export default HeaderTwo