import React from 'react'
import HeaderIconOne from '../HeaderIcon/HeaderIconOne'
import { Heart, History, ShoppingCart } from 'lucide-react'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { Header } from '@/lib/Types/Theme/theme';

type Props = {
    color: ThemeColorSet;
    openDrawer?: (val: DrawerType) => void;
    favoriteProducts: Product[];
    cart: OrderItem[];
    header: Header | null;
    history: OrderItem[];
}

const HeaderOne = ({ color, openDrawer, favoriteProducts, cart, history, header }: Props) => {
    return (
        <>
            <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className='flex items-center gap-2'>
                        {
                            header?.logo &&
                            <div className={`${header?.frameLogo === 'Light' ? 'bg-gray-100' : 'bg-gray-900'} p-1 rounded-[8px] max-w-16`}>
                                <img src={header?.logo} className=' rounded-[8px]' />
                            </div>
                        }
                        <h1 className={`text-xl sm:text-2xl font-extrabold ${color?.text300} ${color?.hoverText200}`}>
                            {header?.span1}{header?.span2}
                        </h1>
                    </div>
                    <nav className="hidden sm:flex space-x-3">
                        <HeaderIconOne Icon={Heart} onClick={() => openDrawer?.('favorite')} count={favoriteProducts.length} label="Buka Favorit" />
                        <HeaderIconOne Icon={ShoppingCart} onClick={() => openDrawer?.('cart')} count={cart.length} label="Buka Keranjang" />
                        <HeaderIconOne Icon={History} onClick={() => openDrawer?.('history')} count={history.length} label="Buka Riwayat Pesanan" />
                    </nav>
                </div>
            </header>
            <nav className="flex space-x-3 sm:hidden justify-between px-8 fixed bottom-0 bg-gray-800 w-full z-10">
                <HeaderIconOne Icon={Heart} onClick={() => openDrawer?.('favorite')} count={favoriteProducts.length} label="Buka Favorit" />
                <HeaderIconOne Icon={ShoppingCart} onClick={() => openDrawer?.('cart')} count={cart.length} label="Buka Keranjang" />
                <HeaderIconOne Icon={History} onClick={() => openDrawer?.('history')} count={history.length} label="Buka Riwayat Pesanan" />
            </nav>
        </>
    )
}

export default HeaderOne