import CardProduct from '@/Components/Themes/CardProduct/CardProduct';
import Categorie from '@/Components/Themes/Categorie';
import Drawer from '@/Components/Themes/Drawer/Drawer';
import DrawerContentRenderer from '@/Components/Themes/DrawerContentRenderer/DrawerContentRenderer';
import Header from '@/Components/Themes/Header';
import HeroSection from '@/Components/Themes/Hero';
import MapTable from '@/Components/Themes/MapTable';
import ModalProductDetail from '@/Components/Themes/ModalProductDetail/ModalProductDetail';
import ProductPackage from '@/Components/Themes/ProductPackage';
import ProductRecomended from '@/Components/Themes/ProductRecomended';
import Queue from '@/Components/Themes/Queue';
import ThemeSwitcher from '@/Components/Themes/ThemeSwitcher/ThemeSwitcher';
import ThemeSwitcherLight from '@/Components/Themes/ThemeSwitcher/ThemeSwitcherLight';
import { useProductCatalogs } from '@/hooks/Theme/useProductCatalogs';
import { Theme, ThemeSection } from '@/lib/Types/Theme/theme';
import { ThemeColor, ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'

type Props = {
    themeName: string;
    setThemeName: (val: string) => void;
    listTheme: Theme[];
    color: keyof typeof ThemeColor;
    themeSections: ThemeSection;
    theme: number;
    loading: boolean
}

const ThemeComponents = ({ themeName, setThemeName, listTheme, color, themeSections, theme, loading }: Props) => {
    /* ===================== Hook ===================== */
    if (loading) return;
    const {
        openDrawer,
        closeDrawer,
        activeDrawer,

        openDetailModal,
        closeDetailModal,
        selectedProduct,

        handleAddToCart,
        handleToggleFavorite,
        handleRemoveFromCart,

        favoriteProducts,
        cart,
        history,
        cartTotal,

        activeCategory,
        setActiveCategory,
        filteredProducts,

        hero,
        categorie,

        isService,
        handleChangeBusiness,

        handlePackage,
        isPackage,

        clientQueueNumber,
        currentQueueNumber,
        handleNextQueue,

        products,
        handleCheckout,
        themeMode,
        toggleTheme
    } = useProductCatalogs(theme, themeSections?.isService);

    /* ===================== Derived State ===================== */
    const colors: ThemeColorSet = ThemeColor[color];

    const drawerTitle =
        activeDrawer === 'favorite'
            ? 'Produk Favorit'
            : activeDrawer === 'cart'
                ? 'Keranjang Pesanan'
                : activeDrawer === 'history'
                    ? 'Riwayat Pesanan'
                    : '';

    const productRecomended = products?.filter(p => p?.isRecomended);
    const hasPackage = products?.some(p => p?.isPackage);
    const hasCategory = categorie?.length > 0;
    const bg = themeMode === "Dark" && themeSections?.dark ? 'bg-gray-900' : 'bg-gray-100'
    const text = themeMode === "Dark" && themeSections?.dark ? 'text-gray-50' : 'text-gray-900'
    return (
        <div className={`min-h-screen ${bg} ${text} font-sans`}>
            {/* ===================== Animation ===================== */}
            <style>
                {`
                @keyframes moveRight {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(5px); }
                }
                .animate-move-right {
                    animation: moveRight 1.5s ease-in-out infinite;
                }
                `}
            </style>
            {/* ===================== Header ===================== */}
            <Header
                theme={themeSections?.header}
                color={colors}
                openDrawer={openDrawer}
                favoriteProducts={favoriteProducts}
                cart={cart}
                history={history}
                isService={isService}
                themeMode={themeMode}
                toggleTheme={toggleTheme}
                handleChangeBusiness={handleChangeBusiness}
            />


            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* ===================== Theme Switcher ===================== */}
                <div className="mb-4">
                    {
                        themeMode === "Dark" && themeSections?.dark ? <ThemeSwitcher listTheme={listTheme} setThemeName={setThemeName} themeName={themeName} /> :
                            <ThemeSwitcherLight
                                listTheme={listTheme}
                                themeName={themeName}
                                setThemeName={setThemeName}
                                color={colors}
                            />
                    }
                </div>

                {/* ===================== Map / Queue Table ===================== */}
                <MapTable
                    theme={themeSections?.mapTable}
                    color={colors}
                    clientQueueNumber={clientQueueNumber}
                    currentQueueNumber={currentQueueNumber}
                    handleNextQueue={handleNextQueue}
                />

                {/* ===================== Recommended Products ===================== */}
                <ProductRecomended
                    theme={themeSections?.productRecomended}
                    color={colors}
                    title="rekomendasi hari ini"
                    productRecomended={productRecomended}
                    openDetailModal={openDetailModal}
                />

                {/* ===================== Hero Section ===================== */}
                <HeroSection
                    theme={themeSections?.hero}
                    color={colors}
                    hero={hero}
                    clientQueueNumber={clientQueueNumber}
                    currentQueueNumber={currentQueueNumber}
                    handleNextQueue={handleNextQueue}
                    themeMode={themeMode} />

                {/* ===================== Package Type ===================== */}
                {hasPackage && (
                    <ProductPackage
                        theme={themeSections?.typeProduct}
                        color={colors}
                        isPackage={isPackage}
                        handlePackage={handlePackage}
                    />
                )}

                {/* ===================== Categories ===================== */}
                {hasCategory && (
                    <Categorie
                        theme={themeSections?.categorie}
                        color={colors}
                        categorie={categorie}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        themeMode={themeMode}
                    />
                )}

                {/* ===================== Product List ===================== */}
                <CardProduct
                    theme={themeSections?.cardProduct}
                    color={colors}
                    filteredProducts={filteredProducts}
                    activeCategory={activeCategory}
                    openDetailModal={openDetailModal}
                    handleToggleFavorite={handleToggleFavorite}
                    themeMode={themeMode}
                />

                {/* ===================== Queue ===================== */}
                <Queue
                    theme={themeSections?.queue}
                    color={colors}
                    clientQueueNumber={clientQueueNumber}
                    currentQueueNumber={currentQueueNumber}
                    handleNextQueue={handleNextQueue}
                />
            </main>

            {/* ===================== Product Detail Modal ===================== */}
            {selectedProduct && (
                <ModalProductDetail
                    theme={themeSections?.modalProductDetail}
                    color={colors}
                    selectedProduct={selectedProduct}
                    closeDetailModal={closeDetailModal}
                    handleAddToCart={handleAddToCart}
                    themeMode={themeMode}
                />
            )}

            {/* ===================== Drawer ===================== */}
            <Drawer
                theme={themeSections?.drawer}
                activeDrawer={activeDrawer}
                drawerTitle={drawerTitle}
                closeDrawer={closeDrawer}
                themeMode={themeMode}
            >
                <DrawerContentRenderer
                    theme={themeSections?.drawerContentRenderer}
                    type={activeDrawer}
                    activeDrawer={activeDrawer}
                    color={colors}
                    favoriteProducts={favoriteProducts}
                    cart={cart}
                    history={history}
                    cartTotal={cartTotal}
                    handleToggleFavorite={handleToggleFavorite}
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleCheckout={handleCheckout}
                    themeMode={themeMode}
                />
            </Drawer>
        </div>
    );
}

export default ThemeComponents