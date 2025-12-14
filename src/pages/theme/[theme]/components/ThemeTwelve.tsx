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
import TypeProduct from '@/Components/Themes/ProductPackage';
import Queue from '@/Components/Themes/Queue';
import { useProductCatalog } from '@/hooks/Theme/ProductEleven';
import MapTable from '@/Components/Themes/MapTable';
import ProductRecomended from '@/Components/Themes/ProductRecomended';

type Props = {
    themeName: string;
    setThemeName: (val: string) => void;
    listTheme: Theme[];
    color: keyof typeof ThemeColor;
}


const ThemeTwelve = ({ themeName, listTheme, color, setThemeName }: Props) => {
    const {
        openDrawer, closeDrawer, activeDrawer,
        openDetailModal, closeDetailModal, selectedProduct,
        handleAddToCart, handleToggleFavorite, handleRemoveFromCart,
        favoriteProducts, cart, history, cartTotal,
        activeCategory, setActiveCategory, filteredProducts,
        hero, categorie, isService, handleChangeBusiness, handlePackage, isPackage, clientQueueNumber, currentQueueNumber, handleNextQueue, products
    } = useProductCatalog();
    const colors: ThemeColorSet = ThemeColor[color];
    const drawerTitle =
        activeDrawer === 'favorite' ? 'Produk Favorit' :
            activeDrawer === 'cart' ? 'Keranjang Pesanan' :
                activeDrawer === 'history' ? 'Riwayat Pesanan' : '';

    const productRecomended = products?.filter(p => p?.isRecomended)
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <style>
                {`
          @keyframes moveRight {
            0%, 100% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(5px);
            }
          }
          .animate-move-right {
            animation: moveRight 1.5s ease-in-out infinite;
          }
          `}
            </style>
            {/* 1. Header */}
            <Header
                theme={12}
                color={colors}
                openDrawer={openDrawer}
                favoriteProducts={favoriteProducts}
                cart={cart}
                history={history}
                isService={isService}
                handleChangeBusiness={handleChangeBusiness}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 2. Pemilih Tema Warna */}
                <div className='mb-4'>
                    <ThemeSwitcherLight listTheme={listTheme} setThemeName={setThemeName} themeName={themeName} color={colors} />
                </div>
                {/* 3. Hero Section / Banner */}
                <MapTable theme={1} color={colors} clientQueueNumber={clientQueueNumber}
                    currentQueueNumber={currentQueueNumber} />
                {/* <HeroSection theme={11} color={colors} hero={hero} clientQueueNumber={clientQueueNumber}
                    currentQueueNumber={currentQueueNumber}
                    handleNextQueue={handleNextQueue} /> */}
                <ProductRecomended theme={1} color={colors}
                    productRecomended={productRecomended} title={"rekomendasi hari ini"}
                    openDetailModal={openDetailModal} />
                {
                    products?.filter(f => f?.isPackage)?.length > 0 &&
                    <TypeProduct
                        handlePackage={handlePackage}
                        isPackage={isPackage}
                        color={colors}
                        theme={1} />
                }
                {/* 4. Kategori Section */}
                {categorie?.length > 0 ? <Categorie color={colors} categorie={categorie} theme={9} setActiveCategory={setActiveCategory}
                    activeCategory={activeCategory} /> : ''}


                <CardProduct
                    theme={12}
                    filteredProducts={filteredProducts}
                    openDetailModal={openDetailModal}
                    handleToggleFavorite={handleToggleFavorite}
                    color={colors}
                    activeCategory={activeCategory}
                />
                <Queue
                    theme={1} color={colors}
                    clientQueueNumber={clientQueueNumber}
                    currentQueueNumber={currentQueueNumber}
                    handleNextQueue={handleNextQueue} />
            </main>
            {selectedProduct && (
                <ModalProductDetail
                    theme={12}
                    selectedProduct={selectedProduct}
                    closeDetailModal={closeDetailModal}
                    handleAddToCart={handleAddToCart}
                    color={colors}
                />
            )}

            {/* 7. Modal Samping (Drawer) */}
            <Drawer
                theme={9}
                activeDrawer={activeDrawer}
                closeDrawer={closeDrawer}
                drawerTitle={drawerTitle}
            >
                <DrawerContentRenderer
                    theme={9}
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

export default ThemeTwelve