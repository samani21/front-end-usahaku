import { Menu, ShoppingCart } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    getThemeClass: (intensity: number, prefix?: string) => string;
    setIsCartModalOpen: (value: boolean) => void;
    cartItemCount: number;
    setIsDrawerOpen: (value: boolean) => void
}

const Header = ({ getThemeClass, setIsCartModalOpen, cartItemCount, setIsDrawerOpen }: Props) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-20 bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                <h1 className={`text-xl font-bold ${getThemeClass(600)} tracking-wider`}>
                    <span className="hidden sm:inline">Katalog</span> Layanan
                </h1>
                <div className="flex space-x-4">
                    <button
                        className={`p-2 text-gray-600 hover:${getThemeClass(600, 'text')} transition-colors rounded-full hover:${getThemeClass(50, 'bg')} relative`}
                        onClick={() => setIsCartModalOpen(true)}
                        aria-label="Keranjang Belanja"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        {cartItemCount > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                    <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 cursor-default">
                        {/* Display User ID Mocked */}
                        <span className="font-semibold">LOCAL MOCK USER</span>
                    </div>
                    <button
                        className={`p-2 text-gray-600 hover:${getThemeClass(600, 'text')} transition-colors rounded-full hover:${getThemeClass(50, 'bg')}`}
                        onClick={() => setIsDrawerOpen(true)}
                        aria-label="Menu Navigasi"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header