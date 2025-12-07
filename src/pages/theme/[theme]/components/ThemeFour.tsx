// src/ThemeFour.tsx
import React, { useMemo } from 'react';
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
import { useProductCatalog } from '@/hooks/Theme/ProductFour';
import HeaderDarkLight from '@/Components/Themes/Header/HeaderDarkLight';
import HeroDarkLight from '@/Components/Themes/Hero/HeroDarkLight';

type Props = {
    themeName: string;
    setThemeName: (val: string) => void;
    listTheme: Theme[];
    color: keyof typeof ThemeColor;
}


const ThemeFour = ({ themeName, listTheme, color, setThemeName }: Props) => {
    const {
        openDrawer, closeDrawer, activeDrawer,
        openDetailModal, closeDetailModal, selectedProduct,
        handleAddToCart, handleToggleFavorite, handleRemoveFromCart,
        favoriteProducts, cart, history, cartTotal,
        activeCategory, setActiveCategory, filteredProducts,
        hero, categorie, toggleTheme, themeMode
    } = useProductCatalog();
    const colors: ThemeColorSet = ThemeColor[color];
    const drawerTitle =
        activeDrawer === 'favorite' ? 'Produk Favorit' :
            activeDrawer === 'cart' ? 'Keranjang Pesanan' :
                activeDrawer === 'history' ? 'Riwayat Pesanan' : '';
    const bg = themeMode === "Dark" ? 'bg-gray-900' : 'bg-gray-100'
    const text = themeMode === "Dark" ? 'text-gray-50' : 'text-gray-900'
    return (
        <div className={`min-h-screen ${bg} text-${text} font-sans transition-colors duration-500`}>
            <Header
                theme={themeMode}
                color={colors}
                openDrawer={openDrawer}
                favoriteProducts={favoriteProducts}
                cart={cart}
                history={history}
                toggleTheme={toggleTheme}
            />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {
                    themeMode === "Light" &&
                    <ThemeSwitcherLight listTheme={listTheme} setThemeName={setThemeName} themeName={themeName} color={colors} />
                }

                {/* 3. Hero Section / Banner */}
                <HeroSection theme={themeMode} color={colors} hero={hero} />

                {/* 4. Kategori Section */}
                {categorie?.length > 0 ? <Categorie color={colors} categorie={categorie} theme={themeMode} setActiveCategory={setActiveCategory}
                    activeCategory={activeCategory} /> : ''}

                <CardProduct
                    theme={themeMode}
                    filteredProducts={filteredProducts}
                    openDetailModal={openDetailModal}
                    handleToggleFavorite={handleToggleFavorite}
                    color={colors}
                    activeCategory={activeCategory}
                />
            </main>
            {selectedProduct && (
                <ModalProductDetail
                    theme={themeMode}
                    selectedProduct={selectedProduct}
                    closeDetailModal={closeDetailModal}
                    handleAddToCart={handleAddToCart}
                    color={colors}
                />
            )}

            {/* 7. Modal Samping (Drawer) */}
            <Drawer
                color={colors}
                theme={themeMode}
                activeDrawer={activeDrawer}
                closeDrawer={closeDrawer}
                drawerTitle={drawerTitle}
            >
                <DrawerContentRenderer
                    theme={themeMode}
                    activeDrawer={activeDrawer}
                    type={activeDrawer}
                    color={colors}
                    favoriteProducts={favoriteProducts}
                    cart={cart}
                    history={history}
                    cartTotal={cartTotal}
                    handleToggleFavorite={handleToggleFavorite}
                    handleRemoveFromCart={handleRemoveFromCart}
                    openDetailModal={openDetailModal}
                />
            </Drawer>

            {/* 8. Modal Detail Produk */}
        </div>
    );
}

export default ThemeFour