import { UIState } from '@/lib/Types/Theme/Theme';
import { Heart, History, Package, ShoppingCart } from 'lucide-react';
import React from 'react'

type Props = {
    color?: string;
    onIconClick: (drawerName: keyof UIState) => void;
}

const HeaderThree = ({ color, onIconClick }: Props) => {
    return (
        <header className="sticky top-0 z-20 bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className={`text-xl font-bold text-${color}-600`}>
                    <Package className="inline h-6 w-6 mr-2" /> Minimarket App
                </div>
                <div className="flex space-x-4">
                    <button
                        className="p-2 rounded-full hover:bg-gray-100 transition duration-150 relative"
                        aria-label="Daftar Favorit"
                        onClick={() => onIconClick('showFavoritesDrawer')}
                    >
                        <Heart className="h-6 w-6 text-red-500" />
                        <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center text-xs text-white bg-red-500 rounded-full">3</span>
                    </button>
                    <button
                        className="p-2 rounded-full hover:bg-gray-100 transition duration-150 relative"
                        aria-label="Keranjang Belanja"
                        onClick={() => onIconClick('showOrdersDrawer')}
                    >
                        {/* Order icon color is secondary/fixed blue for cart */}
                        <ShoppingCart className="h-6 w-6 text-blue-600" />
                        <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center text-xs text-white bg-blue-600 rounded-full">3</span>
                    </button>
                    <button
                        className="p-2 rounded-full hover:bg-gray-100 transition duration-150"
                        aria-label="Riwayat Pesanan"
                        onClick={() => onIconClick('showHistoryDrawer')}
                    >
                        <History className="h-6 w-6 text-gray-500" />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default HeaderThree