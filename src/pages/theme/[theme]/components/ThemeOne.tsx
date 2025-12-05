// src/ThemeFour.tsx
import React from 'react';
import { Theme } from '@/lib/Types/Theme/theme';
import { useProductCatalog } from '@/hooks/Theme/ProductOne';
import ThemeSwitcher from '@/Components/Themes/ThemeSwitcher/ThemeSwitcher';
import DrawerOne from '@/Components/Themes/Drawer/DrawerOne';
import HeroOne from '@/Components/Themes/Hero/HeroOne';
import { ThemeColor, ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import Categorie from '@/Components/Themes/Categorie';
import Header from '@/Components/Themes/Header';
import CardProduct from '@/Components/Themes/CardProduct/CardProduct';
import DrawerContentRenderer from '@/Components/Themes/DrawerContentRenderer/DrawerContentRenderer';
import ModalProductDetail from '@/Components/Themes/ModalProductDetail/ModalProductDetail';
import Drawer from '@/Components/Themes/Drawer/Drawer';

type Props = {
    themeName: string;
    setThemeName: (val: string) => void;
    listTheme: Theme[];
    color: keyof typeof ThemeColor;
}


const ThemeOne = ({ themeName, listTheme, color, setThemeName }: Props) => {
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

            {/* 1. Header */}
            <Header
                theme={1}
                color={colors}
                openDrawer={openDrawer}
                favoriteProducts={favoriteProducts}
                cart={cart}
                history={history}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

                {/* 2. Pemilih Tema Warna */}
                <ThemeSwitcher listTheme={listTheme} setThemeName={setThemeName} themeName={themeName} />

                {/* 3. Hero Section / Banner */}
                <HeroOne color={colors} hero={hero} />

                {/* 4. Kategori Section */}
                {categorie?.length > 0 ? <Categorie color={colors} categorie={categorie} theme={1} setActiveCategory={setActiveCategory}
                    activeCategory={activeCategory} /> : ''}

                <CardProduct
                    theme={1}
                    filteredProducts={filteredProducts}
                    openDetailModal={openDetailModal}
                    handleToggleFavorite={handleToggleFavorite}
                    color={colors}
                    activeCategory={activeCategory}
                />
            </main>
            {selectedProduct && (
                <ModalProductDetail
                    theme={1}
                    selectedProduct={selectedProduct}
                    closeDetailModal={closeDetailModal}
                    handleAddToCart={handleAddToCart}
                    color={colors}
                />
            )}

            {/* 7. Modal Samping (Drawer) */}
            <Drawer
                theme={1}
                activeDrawer={activeDrawer}
                closeDrawer={closeDrawer}
                drawerTitle={drawerTitle}
            >
                <DrawerContentRenderer
                    theme={1}
                    activeDrawer={activeDrawer}
                    type={activeDrawer}
                    color={colors}
                    favoriteProducts={favoriteProducts}
                    cart={cart}
                    history={history}
                    cartTotal={cartTotal}
                    handleToggleFavorite={handleToggleFavorite}
                    handleRemoveFromCart={handleRemoveFromCart}
                />
            </Drawer>

            {/* 8. Modal Detail Produk */}
        </div>
    );
}

export default ThemeOne