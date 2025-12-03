// src/ThemeFour.tsx
import React from 'react';
import { Heart, ShoppingCart, History, Laptop } from 'lucide-react';
import { Hero, Theme } from '@/lib/Types/Theme/theme';
import { DUMMY_CATEGORIES, useProductCatalog } from '@/hooks/Theme/ProductOne';
import HeaderIconOne from '@/Components/Themes/HeaderIcon/HeaderIconOne';
import ThemeSwitcher from '@/Components/Themes/ThemeSwitcher/ThemeSwitcher';
import CardProductOne from '@/Components/Themes/CardProduct/CardProductOne';
import DrawerOne from '@/Components/Themes/Drawer/DrawerOne';
import DrawerContentRendererOne from '@/Components/Themes/DrawerContentRenderer/DrawerContentRendererOne';
import ModalProductDetailOne from '@/Components/Themes/ModalProductDetail/ModalProductDetailOne';
import HeroOne from '@/Components/Themes/Hero/HeroOne';

type Props = {
    themeName: string;
    setThemeName: (val: string) => void;
    listTheme: Theme[];
    color: string;
}


const DUMMY_HERO: Hero = {
    // title: 'Penawaran Eksklusif',
    sub_title: 'Temukan Gadget Impianmu!',
    description: 'Jelajahi koleksi produk teknologi terbaru dengan harga terbaik dan varian terlengkap.',
    cta: ' Lihat Semua Produk',
    image: 'https://gizmologi.id/wp-content/uploads/2020/08/asus-rog-strix-g1517.jpg'
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
                <HeroOne color={color} hero={DUMMY_HERO} />

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
            {selectedProduct && (
                <ModalProductDetailOne
                    product={selectedProduct}
                    onClose={closeDetailModal}
                    onOrder={handleAddToCart}
                    color={color}
                />
            )}

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
        </div>
    );
}

export default ThemeOne