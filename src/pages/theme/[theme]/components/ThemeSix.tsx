// src/ThemeFour.tsx
import React from 'react';
import { Theme } from '@/lib/Types/Theme/theme';
import { ThemeColor, ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import Categorie from '@/Components/Themes/Categorie';
import Header from '@/Components/Themes/Header';
import CardProduct from '@/Components/Themes/CardProduct/CardProduct';
import DrawerContentRenderer from '@/Components/Themes/DrawerContentRenderer/DrawerContentRenderer';
import ModalProductDetail from '@/Components/Themes/ModalProductDetail/ModalProductDetail';
import Drawer from '@/Components/Themes/Drawer/Drawer';
import HeroSection from '@/Components/Themes/Hero';
import ThemeSwitcherLight from '@/Components/Themes/ThemeSwitcher/ThemeSwitcherLight';
import { useProductCatalog } from '@/hooks/Theme/ProductSix';

type Props = {
    themeName: string;
    setThemeName: (val: string) => void;
    listTheme: Theme[];
    color: keyof typeof ThemeColor;
}


const ThemeSix = ({ themeName, listTheme, color, setThemeName }: Props) => {
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
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* 1. Header */}
            <Header
                theme={6}
                color={colors}
                openDrawer={openDrawer}
                favoriteProducts={favoriteProducts}
                cart={cart}
                history={history}
            />

            <main className="pb-16">
                {/* 2. Pemilih Tema Warna */}
                <div className='mt-4 px-16'>
                    <ThemeSwitcherLight listTheme={listTheme} setThemeName={setThemeName} themeName={themeName} color={colors} />
                </div>
                {/* 3. Hero Section / Banner */}
                <HeroSection theme={6} color={colors} hero={hero} />

                {/* 4. Kategori Section */}
                {categorie?.length > 0 ? <Categorie color={colors} categorie={categorie} theme={6} setActiveCategory={setActiveCategory}
                    activeCategory={activeCategory} /> : ''}

                <CardProduct
                    theme={6}
                    filteredProducts={filteredProducts}
                    openDetailModal={openDetailModal}
                    handleToggleFavorite={handleToggleFavorite}
                    color={colors}
                    activeCategory={activeCategory}
                />
            </main>
            {selectedProduct && (
                <ModalProductDetail
                    theme={6}
                    selectedProduct={selectedProduct}
                    closeDetailModal={closeDetailModal}
                    handleAddToCart={handleAddToCart}
                    color={colors}
                />
            )}

            {/* 7. Modal Samping (Drawer) */}
            <Drawer
                theme={6}
                activeDrawer={activeDrawer}
                closeDrawer={closeDrawer}
                drawerTitle={drawerTitle}
            >
                <DrawerContentRenderer
                    theme={6}
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

export default ThemeSix