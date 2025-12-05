// src/ThemeFour.tsx
import React from 'react';
import { Theme } from '@/lib/Types/Theme/theme';
import {  useProductCatalog } from '@/hooks/Theme/ProductOne';
import { ThemeColor, ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';

type Props = {
    themeName: string;
    setThemeName: (val: string) => void;
    listTheme: Theme[];
    color: keyof typeof ThemeColor;
}


const ThemeTwo = ({ themeName, listTheme, color, setThemeName }: Props) => {
    const {
        openDrawer, closeDrawer, activeDrawer,
        openDetailModal, closeDetailModal, selectedProduct,
        handleAddToCart, handleToggleFavorite, handleRemoveFromCart,
        favoriteProducts, cart, history, cartTotal,
        activeCategory, setActiveCategory, filteredProducts,
        hero, categorie
    } = useProductCatalog();
    const colors: ThemeColorSet = ThemeColor[color];
    const drawerTitle =
        activeDrawer === 'favorite' ? 'Produk Favorit' :
            activeDrawer === 'cart' ? 'Keranjang Pesanan' :
                activeDrawer === 'history' ? 'Riwayat Pesanan' : '';


    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-sans antialiased">

            
        </div>
    );
}

export default ThemeTwo