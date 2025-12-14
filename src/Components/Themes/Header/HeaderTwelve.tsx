import React, { useState } from 'react'
import HeaderIconOne from '../HeaderIcon/HeaderIconOne'
import { Clock, Coffee, Heart, History, Menu, Package, ShoppingBag, ShoppingCart, Smartphone, Utensils, Zap } from 'lucide-react'
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

const HeaderTwelve = ({ color, openDrawer, favoriteProducts, cart, history, isService, handleChangeBusiness }: Props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    return (
        <header className="sticky top-0 z-30 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo/Title - Tetap Oranye untuk Branding */}
                <div className="flex items-center space-x-2">
                    <Utensils className={color?.text500} size={32} />
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                        <span className={color?.text500}>Menu</span>Digital
                    </h1>
                </div>

                {/* Desktop Icons */}
                <div className="hidden sm:flex space-x-4">
                    <button
                        onClick={() => openDrawer('favorite')}
                        className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <Heart size={24} />

                        {favoriteProducts?.length > 0 && (
                            <span
                                className="absolute top-1 right-1 block h-3 w-3 rounded-full ring-2 ring-white bg-red-600 transform translate-x-1/2 -translate-y-1/2"
                                aria-label="Notifikasi Keranjang"
                            ></span>
                        )}

                    </button>
                    <button
                        onClick={() => openDrawer('cart')}
                        className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <ShoppingCart size={24} />

                        {cart?.length > 0 && (
                            <span
                                className="absolute top-1 right-1 block h-3 w-3 rounded-full ring-2 ring-white bg-red-600 transform translate-x-1/2 -translate-y-1/2"
                                aria-label="Notifikasi Keranjang"
                            ></span>
                        )}
                    </button>
                    <button
                        onClick={() => openDrawer('history')}
                        className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <Clock size={24} />

                        {history?.length > 0 && (
                            <span
                                className="absolute top-1 right-1 block h-3 w-3 rounded-full ring-2 ring-white bg-red-600 transform translate-x-1/2 -translate-y-1/2"
                                aria-label="Notifikasi Keranjang"
                            ></span>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="sm:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                    aria-label="Menu"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile Menu Drawer (simple) */}
            <div className={`sm:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-60 opacity-100 py-2' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col space-y-2 px-4">
                    <button
                        onClick={() => openDrawer('favorite')}
                        className="flex items-center justify-start p-3 text-gray-700 rounded-lg hover:bg-orange-50 transition-colors"
                    >
                        <Heart size={20} className="mr-3" />
                        Favorit

                        {favoriteProducts?.length > 0 && (
                            <span className="ml-auto h-3 w-3 rounded-full bg-red-600" aria-label="Notifikasi Keranjang"></span>
                        )}
                    </button>
                    <button
                        onClick={() => openDrawer('cart')}
                        className="flex items-center justify-start p-3 text-gray-700 rounded-lg hover:bg-orange-50 transition-colors"
                    >
                        <ShoppingCart size={20} className="mr-3" />
                        Pesananku

                        {cart?.length > 0 && (
                            <span className="ml-auto h-3 w-3 rounded-full bg-red-600" aria-label="Notifikasi Keranjang"></span>
                        )}
                    </button>
                    <button
                        onClick={() => openDrawer('history')}
                        className="flex items-center justify-start p-3 text-gray-700 rounded-lg hover:bg-orange-50 transition-colors"
                    >
                        <Clock size={20} className="mr-3" />
                        Riwayat

                        {history?.length > 0 && (
                            <span className="ml-auto h-3 w-3 rounded-full bg-red-600" aria-label="Notifikasi Keranjang"></span>
                        )}

                    </button>
                </div>
            </div>
        </header>
    )
}

export default HeaderTwelve