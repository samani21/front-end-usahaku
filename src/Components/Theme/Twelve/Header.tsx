import { DUMMY_FAVORITES, DUMMY_ORDER_HISTORY } from '@/lib/Types/Theme/Twelve';
import { Heart, History, Menu, ShoppingCart, Utensils } from 'lucide-react';
import React, { useState } from 'react'

interface HeaderProps {
    onOpenDrawer: (type: 'favorite' | 'order' | 'history') => void;
    cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ onOpenDrawer, cartCount }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: "Favorit", icon: Heart, type: 'favorite' as const, badge: DUMMY_FAVORITES.length },
        { name: "Pesananku", icon: ShoppingCart, type: 'order' as const, badge: cartCount },
        { name: "Riwayat", icon: History, type: 'history' as const, badge: DUMMY_ORDER_HISTORY.length },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleItemClick = (type: 'favorite' | 'order' | 'history') => {
        onOpenDrawer(type);
        setIsMenuOpen(false); // Close menu on selection for mobile
    };

    return (
        <header className="sticky top-0 z-30 bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo/Title - Tetap Oranye untuk Branding */}
                <div className="flex items-center space-x-2">
                    <Utensils className="text-orange-500" size={32} />
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                        <span className="text-orange-500">Menu</span>Digital
                    </h1>
                </div>

                {/* Desktop Icons */}
                <div className="hidden sm:flex space-x-4">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => onOpenDrawer(item.type)}
                            className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                            aria-label={item.name}
                        >
                            <item.icon size={24} />

                            {/* LOGIC: Tampilkan Titik Merah Notifikasi untuk Keranjang jika ada item (tanpa angka) */}
                            {item.type === 'order' && cartCount > 0 && (
                                <span
                                    className="absolute top-1 right-1 block h-3 w-3 rounded-full ring-2 ring-white bg-red-600 transform translate-x-1/2 -translate-y-1/2"
                                    aria-label="Notifikasi Keranjang"
                                ></span>
                            )}

                            {/* LOGIC: Tampilkan Angka Badge untuk item lain (hanya jika item.type BUKAN 'order' dan badge > 0) */}
                            {(item.type !== 'order' && item.badge && item.badge > 0) && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    ))}
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
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleItemClick(item.type)}
                            className="flex items-center justify-start p-3 text-gray-700 rounded-lg hover:bg-orange-50 transition-colors"
                        >
                            <item.icon size={20} className="mr-3" />
                            {item.name}

                            {/* LOGIC: Tampilkan Titik Merah Notifikasi untuk Keranjang di menu mobile (tanpa angka) */}
                            {item.type === 'order' && item.badge && item.badge > 0 && (
                                <span className="ml-auto h-3 w-3 rounded-full bg-red-600" aria-label="Notifikasi Keranjang"></span>
                            )}

                            {/* LOGIC: Tampilkan Angka Badge untuk item lain (hanya jika item.type BUKAN 'order' dan badge > 0) */}
                            {(item.type !== 'order' && item.badge && item.badge > 0) && (
                                <span className="ml-auto px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
};


export default Header