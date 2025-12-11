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

const HeaderNine = ({ color, openDrawer, favoriteProducts, cart, history, isService, handleChangeBusiness }: Props) => {
    return (
        <header className="sticky top-0 z-30 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                <h1 className={`text-2xl font-extrabold ${color?.text600} flex items-center`}>
                    <Zap className="mr-2 h-6 w-6" />
                    ServiceKu
                </h1>
                <div className="flex space-x-4">
                    <button
                        onClick={() => openDrawer('favorite')}
                        className={`relative p-2 text-red-600 ${color?.hoverText600} rounded-full transition`}
                    >
                        <Heart className="w-6 h-6" />
                    </button>
                    <button onClick={() => openDrawer('cart')} className={`relative p-2 text-gray-600 ${color?.hoverText600} rounded-full transition`}>
                        <ShoppingCart size={24} />
                        {/* Badge keranjang */}
                        <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>
                    </button>
                    <button onClick={() => openDrawer('history')} className={`p-2 text-gray-600 ${color?.hoverText600} rounded-full transition`}>
                        <History size={24} />
                    </button>
                </div>
            </div>
        </header>

    )
}

export default HeaderNine