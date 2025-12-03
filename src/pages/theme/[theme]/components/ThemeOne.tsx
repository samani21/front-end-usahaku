// src/ThemeFour.tsx
import React from 'react';
import { Heart, ShoppingCart, History, X, CheckCircle, Palette, Laptop } from 'lucide-react';
import { formatRupiah, THEME_COLORS, ThemeName, ColorClasses, Theme } from '@/lib/Types/Theme/theme';
import { Product, OrderItem, Variant, DrawerType } from '@/hooks/Theme/useProductCatalog';
import { DUMMY_CATEGORIES, useProductCatalog } from '@/hooks/Theme/ProductOne';
import HeaderIconOne from '@/Components/Themes/HeaderIcon/HeaderIconOne';
import ThemeSwitcher from '@/Components/Themes/ThemeSwitcher/ThemeSwitcher';
import CardProductOne from '@/Components/Themes/CardProduct/CardProductOne';
import DrawerOne from '@/Components/Themes/Drawer/DrawerOne';
import DrawerContentRendererOne from '@/Components/Themes/DrawerContentRenderer/DrawerContentRendererOne';
import ModalProductDetailOne from '@/Components/Themes/ModalProductDetail/ModalProductDetailOne';

type Props = {
    themeName: string;
    setThemeName: (val: string) => void;
    listTheme: Theme[];
    color: string;
}

const ThemeOne = ({ themeName, listTheme, color, setThemeName }: Props) => {
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
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-sans antialiased">

            {/* 1. Header */}
            <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className={`text-2xl font-extrabold text-${color}-600 dark:text-${color}-400`}>
                        E-KATALOG TEKNOLOGI
                    </h1>
                    <nav className="flex space-x-3">
                        <HeaderIconOne Icon={Heart} onClick={() => openDrawer('favorite')} count={favoriteProducts.length} label="Buka Favorit" />
                        <HeaderIconOne Icon={ShoppingCart} onClick={() => openDrawer('cart')} count={cart.length} label="Buka Keranjang" />
                        <HeaderIconOne Icon={History} onClick={() => openDrawer('history')} count={history.length} label="Buka Riwayat Pesanan" />
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

                {/* 2. Pemilih Tema Warna */}
                <ThemeSwitcher listTheme={listTheme} setThemeName={setThemeName} themeName={themeName} />

                {/* 3. Hero Section / Banner */}
                <section className={`bg-gradient-to-r from-${color}-600 to-${color}-900  p-8 sm:p-12 rounded-2xl shadow-xl text-white`}>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="max-w-lg mb-6 md:mb-0">
                            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                                Temukan Gadget Impianmu!
                            </h2>
                            <p className="mt-3 text-white/80 text-lg">
                                Jelajahi koleksi produk teknologi terbaru dengan harga terbaik dan varian terlengkap.
                            </p>
                            <button className={`mt-6 px-6 py-3 bg-white text-${color}-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition duration-300`}>
                                Lihat Semua Produk
                            </button>
                        </div>
                        <div className="hidden sm:block">
                            <Laptop size={120} className="text-white/70" />
                        </div>
                    </div>
                </section>

                {/* 4. Kategori Section */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold border-b pb-2 border-gray-200 dark:border-gray-700">Kategori Produk</h2>
                    <div className="flex flex-wrap gap-3">
                        {DUMMY_CATEGORIES?.map((cat) => {
                            const IconComponent = cat.iconComponent;
                            return (
                                <button
                                    key={cat.name}
                                    onClick={() => setActiveCategory(cat.name)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${activeCategory === cat.name
                                        ? `bg-${color}-600 text-white shadow-md`
                                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
                                        }`}
                                >
                                    {IconComponent ? <IconComponent size={18} /> :
                                        <img src={cat?.icon} />}

                                    <span>{cat.name}</span>
                                </button>
                            )
                        })}
                    </div>
                </section>

                {/* 5. Card Produk Section */}
                <section className="space-y-6">
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
                </section>

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

export default ThemeOne