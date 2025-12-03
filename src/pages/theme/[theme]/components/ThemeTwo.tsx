// src/ThemeFour.tsx
import React, { useEffect, useState } from 'react';
import { Heart, ShoppingCart, History, X, CheckCircle, Palette, Laptop, Smartphone, ShoppingBag, Clock, ChevronRight } from 'lucide-react';
import { formatRupiah, Theme, Hero } from '@/lib/Types/Theme/theme';
import { Product, OrderItem, Variant, DrawerType } from '@/hooks/Theme/useProductCatalog';
import { DUMMY_CATEGORIES, useProductCatalog } from '@/hooks/Theme/ProductOne';
import HeaderIconOne from '@/Components/Themes/HeaderIcon/HeaderIconOne';
import ThemeSwitcher from '@/Components/Themes/ThemeSwitcher/ThemeSwitcher';
import CardProductOne from '@/Components/Themes/CardProduct/CardProductOne';
import DrawerOne from '@/Components/Themes/Drawer/DrawerOne';
import DrawerContentRendererOne from '@/Components/Themes/DrawerContentRenderer/DrawerContentRendererOne';
import ModalProductDetailOne from '@/Components/Themes/ModalProductDetail/ModalProductDetailOne';
import HeaderIconTwo from '@/Components/Themes/HeaderIcon/HeaderIconTwo';
import ThemeSwitcherLight from '@/Components/Themes/ThemeSwitcher/ThemeSwitcherLight';
import HeroTwo from '@/Components/Themes/Hero/HeroTwo';

type Props = {
    themeName: string;
    setThemeName: (val: string) => void;
    listTheme: Theme[];
    color: string;
}

const DUMMY_HERO: Hero = {
    // title: 'Penawaran Eksklusif',
    sub_title: 'Diskon Spesial Akhir Pekan!',
    description: 'Nikmati potongan harga 20% untuk semua kategori produk favorit Anda. Jangan sampai terlewat!',
    cta: 'Lihat Penawaran',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2_lyoTTWPt-5OvkGn5xTKTpJ2EWDWTMwJxA&s'
}

const ThemeTwo = ({ themeName, listTheme, color, setThemeName }: Props) => {
    const {
        openDrawer, closeDrawer, activeDrawer,
        openDetailModal, closeDetailModal, selectedProduct,
        handleAddToCart, handleToggleFavorite, handleRemoveFromCart,
        favoriteProducts, cart, history, cartTotal,
        activeCategory, setActiveCategory, filteredProducts,
    } = useProductCatalog();

    const drawerTitle =
        activeDrawer === 'favorite' ? 'Produk Favorit' :
            activeDrawer === 'cart' ? 'Keranjang Pesanan' :
                activeDrawer === 'history' ? 'Riwayat Pesanan' : '';

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <style>{`
        /* Minimalist scrollbar hide for category section */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        /* Font family rule removed to rely on Next.js global settings */
      `}</style>
            {/* 1. Header */}
            <header className="sticky top-0 z-40 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className={`text-2xl font-extrabold flex items-center text-${color}-700`}>
                            <Smartphone className={`w-6 h-6 mr-2 text-${color}-500 hidden sm:inline`} /> Katalog Minimalis
                        </h1>
                    </div>
                    <div className="flex space-x-4">
                        <HeaderIconTwo
                            Icon={Heart}
                            onClick={() => openDrawer('favorite')}
                            label="Buka Favorit"
                            color={color}
                        />
                        <HeaderIconTwo
                            Icon={ShoppingBag}
                            onClick={() => openDrawer('cart')}
                            label="Buka Keranjang"
                            color={color}
                        />
                        <HeaderIconTwo
                            Icon={Clock}
                            onClick={() => openDrawer('history')}
                            label="Buka Riwayat Pesanan"
                            color={color}
                        />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto pb-12 py-4">
                {/* 2. Pemilih Tema Warna */}
                <ThemeSwitcherLight color={color} listTheme={listTheme} setThemeName={setThemeName} themeName={themeName} />

                <HeroTwo color={color} hero={DUMMY_HERO} />

                {/* 5. Card Produk Section */}
                {/* <section className="space-y-6">
                    <h2 className="text-3xl font-bold border-b pb-2 border-gray-200 dark:border-gray-700">
                        Daftar Produk ({activeCategory})
                    </h2>
                    {filteredProducts.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-10">Tidak ada produk dalam kategori ini.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts?.map((product) => (
                                <CardProductOne
                                    key={product.id}
                                    product={product}
                                    onClick={() => openDetailModal(product)}
                                    onToggleFavorite={handleToggleFavorite}
                                    color={color}
                                />
                            ))}
                        </div>
                    )}
                </section> */}

            </main>

            {/* 7. Modal Samping (Drawer) */}
            <DrawerOne
                isOpen={activeDrawer !== null}
                onClose={closeDrawer}
                title={drawerTitle}
            >
                <DrawerContentRendererOne
                    type={activeDrawer}
                    color={color}
                    favoriteProducts={favoriteProducts}
                    cart={cart}
                    history={history}
                    cartTotal={cartTotal}
                    handleToggleFavorite={handleToggleFavorite}
                    handleRemoveFromCart={handleRemoveFromCart}
                />
            </DrawerOne>

            {/* 8. Modal Detail Produk */}
            {selectedProduct && (
                <ModalProductDetailOne
                    product={selectedProduct}
                    onClose={closeDetailModal}
                    onOrder={handleAddToCart}
                    color={color}
                />
            )}
        </div>
    );
}

export default ThemeTwo