import React from 'react'
import { Heart, History, ShoppingBag} from 'lucide-react'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { Header } from '@/lib/Types/Theme/theme';

type Props = {
    color: ThemeColorSet;
    openDrawer: (val: DrawerType) => void;
    favoriteProducts: Product[];
    cart: OrderItem[];
    header: Header | null;
    history: OrderItem[];
}

const HeaderFive = ({ openDrawer, favoriteProducts, cart, history, header }: Props) => {
    return (
        <>
            <header className="sticky top-0 z-30 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className='flex items-center gap-2'>
                        {
                            header?.logo &&
                            <div className={`${header?.frameLogo === 'Light' ? 'bg-gray-100' : 'bg-gray-900'} p-1 rounded-[8px] max-w-16`}>
                                <img src={header?.logo} className=' rounded-[8px]' />
                            </div>
                        }
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                            {header?.span1}{header?.span2}
                        </h1>
                    </div>
                    <nav className="hidden sm:flex space-x-4">
                        <button
                            onClick={() => openDrawer('favorite')}
                            className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150 relative"
                            aria-label="Pesanan Saya"
                        >
                            <Heart size={24} />
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{favoriteProducts.length}</span>
                        </button>
                        <button
                            onClick={() => openDrawer('cart')}
                            className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150 relative"
                            aria-label="Pesanan Saya"
                        >
                            <ShoppingBag size={24} />
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{cart.length}</span>
                        </button>
                        <button
                            onClick={() => openDrawer('history')}
                            className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150 relative"
                            aria-label="Pesanan Saya"
                        >
                            <History size={24} />
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{history.length}</span>
                        </button>
                    </nav>
                </div>
            </header>
            <nav className="flex space-x-3 sm:hidden justify-between px-8 fixed bottom-0 bg-gray-100 w-full z-10 pt-1">
                <button
                    onClick={() => openDrawer('favorite')}
                    className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150 relative"
                    aria-label="Pesanan Saya"
                >
                    <Heart size={24} />
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{favoriteProducts.length}</span>
                </button>
                <button
                    onClick={() => openDrawer('cart')}
                    className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150 relative"
                    aria-label="Pesanan Saya"
                >
                    <ShoppingBag size={24} />
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{cart.length}</span>
                </button>
                <button
                    onClick={() => openDrawer('history')}
                    className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150 relative"
                    aria-label="Pesanan Saya"
                >
                    <History size={24} />
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{history.length}</span>
                </button>
            </nav>
        </>
    )
}

export default HeaderFive