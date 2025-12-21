import React from 'react'
import HeaderIconOne from '../HeaderIcon/HeaderIconOne'
import { Clock, Coffee, Heart, History, Package, ShoppingBag, ShoppingCart, Smartphone, Zap } from 'lucide-react'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import HeaderIconTwo from '../HeaderIcon/HeaderIconTwo';

type Props = {
    color: ThemeColorSet;
    openDrawer: (val: DrawerType) => void;
    favoriteProducts: Product[];
    cart: OrderItem[];
    history: OrderItem[];
    isService?: boolean
    handleChangeBusiness?: (val: boolean) => void;
}

const HeaderEleven = ({ color, openDrawer, favoriteProducts, cart, history, isService, handleChangeBusiness }: Props) => {
    return (
        <>
            <header className={`sticky top-0 left-0 w-full ${color?.bg700} shadow-md z-30`}>
                <div className="max-w-7xl mx-auto p-4 flex justify-between items-center text-white">
                    {/* Kiri: Posisi & Antrian - Dihapus dari sini karena sudah ada di banner baru */}
                    <div className="flex flex-col text-lg font-bold">
                        Kedai Mantap
                    </div>

                    {/* Kanan: Icons */}
                    <div className="hidden sm:flex space-x-4">
                        <button
                            className={`relative p-2 rounded-full ${color?.hoverBg600} transition-colors`}
                            onClick={() => openDrawer('favorite')}
                        >
                            <Heart size={24} />
                            {
                                favoriteProducts?.length > 0 &&
                                <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>
                            }
                        </button>
                        <button
                            className={`relative p-2 rounded-full ${color?.hoverBg600} transition-colors`}
                            onClick={() => openDrawer('cart')}
                        >
                            <ShoppingCart size={24} />
                            {
                                cart?.length > 0 &&
                                <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>
                            }
                        </button>
                        <button
                            className={`p-2 rounded-full ${color?.hoverBg600} transition-colors`}
                            onClick={() => openDrawer('history')}
                        >
                            <History size={24} />
                        </button>
                    </div>
                </div>
            </header>
            <nav className="flex space-x-3 sm:hidden justify-between px-8 fixed bottom-0 bg-gray-100 w-full z-10 pt-1">
                <button
                    className={`relative p-2 rounded-full ${color?.hoverBg600} transition-colors`}
                    onClick={() => openDrawer('favorite')}
                >
                    <Heart size={24} />
                    {
                        favoriteProducts?.length > 0 &&
                        <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>
                    }
                </button>
                <button
                    className={`relative p-2 rounded-full ${color?.hoverBg600} transition-colors`}
                    onClick={() => openDrawer('cart')}
                >
                    <ShoppingCart size={24} />
                    {
                        cart?.length > 0 &&
                        <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>
                    }
                </button>
                <button
                    className={`p-2 rounded-full ${color?.hoverBg600} transition-colors`}
                    onClick={() => openDrawer('history')}
                >
                    <History size={24} />
                </button>
            </nav>
        </>
    )
}

export default HeaderEleven