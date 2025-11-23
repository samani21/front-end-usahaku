import React, { useState, useMemo, useCallback } from 'react';
import {
    Heart,
    ShoppingCart,
    History,
    X,
    Laptop,
    Palette,
} from 'lucide-react';
import { ColorClasses, DrawerType, DUMMY_CATEGORIES, DUMMY_HISTORY, DUMMY_PRODUCTS, formatRupiah, OrderItem, Product, THEME_COLORS, ThemeName } from '@/lib/Types/Theme/Four';
import HeaderIcon from '@/Components/Theme/Four/HeaderIcon';
import ProductCard from '@/Components/Theme/Four/ProductCard';
import Drawer from '@/Components/Theme/Four/Drawer';
import ProductDetailModal from '@/Components/Theme/Four/ProductDetailModal';


export default function ThemeFour() {
    const [products, setProducts] = useState<Product[]>(DUMMY_PRODUCTS);
    const [cart, setCart] = useState<OrderItem[]>([]);
    const [history, setHistory] = useState<OrderItem[]>(DUMMY_HISTORY);
    const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeCategory, setActiveCategory] = useState('Semua Produk');

    // State untuk mengelola tema warna
    const [activeTheme, setActiveTheme] = useState<ThemeName>('slate'); // Diubah ke 'slate' sebagai default
    const colors = THEME_COLORS[activeTheme]; // Objek warna yang sedang aktif

    // Logic untuk membuka/menutup drawer
    const openDrawer = (type: DrawerType) => {
        setActiveDrawer(type);
    };
    const closeDrawer = () => {
        setActiveDrawer(null);
    };

    // Logic untuk Produk Detail Modal
    const openDetailModal = (product: Product) => {
        setSelectedProduct(product);
    };
    const closeDetailModal = () => {
        setSelectedProduct(null);
    };

    // Logic Favorite
    const handleToggleFavorite = useCallback((productId: string) => {
        setProducts(prevProducts =>
            prevProducts.map(p =>
                p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
            )
        );
    }, []);

    const favoriteProducts = useMemo(() =>
        products.filter(p => p.isFavorite)
        , [products]);

    // Logic Cart/Order
    const handleAddToCart = useCallback((item: OrderItem) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(
                i => i.productId === item.productId && i.variantName === item.variantName
            );

            if (existingItemIndex > -1) {
                // Update quantity if item/variant exists
                return prevCart.map((i, index) =>
                    index === existingItemIndex ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            }
            // Add new item
            return [...prevCart, item];
        });
        // Pindahkan ke history setelah pemesanan (simulasi checkout sederhana)
        setHistory(prevHistory => [{ ...item, quantity: item.quantity }, ...prevHistory].slice(0, 5));
    }, []);

    const cartTotal = cart.reduce((total, item) => total + item.finalPrice * item.quantity, 0);

    // Filtered Products
    const filteredProducts = useMemo(() => {
        if (activeCategory === 'Semua Produk') {
            return products;
        }
        return products.filter(p => p.category === activeCategory);
    }, [products, activeCategory]);


    // --- Render Functions for Drawer Content ---

    const renderDrawerContent = (type: DrawerType, colors: ColorClasses) => {
        if (type === 'favorite') {
            return (
                <div className="space-y-4">
                    {favoriteProducts.length > 0 ? (
                        favoriteProducts.map((p) => (
                            <div key={p.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
                                <img
                                    src={p.imageUrl}
                                    alt={p.name}
                                    className="w-12 h-12 object-cover rounded-md"
                                    onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100/000/fff?text=Fav')}
                                />
                                <div className="flex-grow">
                                    <p className="font-semibold text-gray-900 dark:text-white truncate">{p.name}</p>
                                    {/* Menggunakan primaryText untuk harga di Favorit */}
                                    <p className={`text-sm ${colors.primaryText} ${colors.primaryTextDark}`}>{formatRupiah(p.price)}</p>
                                </div>
                                <button
                                    onClick={() => handleToggleFavorite(p.id)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                    aria-label="Hapus dari Favorit"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">Belum ada produk favorit.</p>
                    )}
                </div>
            );
        }
        if (type === 'cart') {
            return (
                <div className="flex flex-col h-full">
                    <div className="flex-grow space-y-4 overflow-y-auto pr-2">
                        {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
                                    <div className="flex-grow">
                                        <p className="font-semibold text-gray-900 dark:text-white">{item.productName}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Varian: {item.variantName}</p>
                                        {/* Menggunakan primaryText untuk harga di Cart */}
                                        <p className={`text-sm ${colors.primaryText} ${colors.primaryTextDark} font-bold mt-1`}>
                                            {item.quantity}x @ {formatRupiah(item.finalPrice)}
                                        </p>
                                        <p className="text-sm text-gray-900 dark:text-white font-bold">
                                            Total: {formatRupiah(item.finalPrice * item.quantity)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setCart(cart.filter((_, i) => i !== index))}
                                        className="text-red-500 hover:text-red-700 p-1 mt-1"
                                        aria-label="Hapus Item"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-4">Keranjang pesanan masih kosong.</p>
                        )}
                    </div>
                    <div className="mt-4 pt-4 border-t dark:border-gray-700">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-lg font-extrabold text-gray-900 dark:text-white">Total Keseluruhan:</span>
                            {/* Menggunakan primaryText untuk Total Cart */}
                            <span className={`text-2xl font-extrabold ${colors.primaryText} ${colors.primaryTextDark}`}>{formatRupiah(cartTotal)}</span>
                        </div>
                        {/* Menggunakan primary dan primaryHover untuk Checkout Button */}
                        <button
                            className={`w-full py-3 ${colors.primary} text-white font-bold rounded-lg shadow-lg ${colors.primaryHover} transition duration-300 disabled:bg-gray-400`}
                            disabled={cart.length === 0}
                        >
                            Proses Checkout
                        </button>
                    </div>
                </div>
            );
        }
        if (type === 'history') {
            return (
                <div className="space-y-4">
                    {history.length > 0 ? (
                        history.map((item, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm opacity-80">
                                {/* Menggunakan primaryText untuk ikon History */}
                                <History size={24} className={`${colors.primaryText.replace('text-', 'text-')} mt-1 flex-shrink-0`} />
                                <div className='flex-grow'>
                                    <p className="font-semibold text-gray-900 dark:text-white truncate">{item.productName}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Varian: {item.variantName}</p>
                                    <p className="text-sm text-gray-900 dark:text-white">
                                        {item.quantity}x ({formatRupiah(item.finalPrice)})
                                    </p>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium flex-shrink-0">
                                    Selesai
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">Belum ada riwayat pesanan.</p>
                    )}
                </div>
            );
        }
        return null;
    };


    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-sans antialiased">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    {/* Menggunakan primaryText untuk judul */}
                    <h1 className={`text-2xl font-extrabold ${colors.primaryText} ${colors.primaryTextDark}`}>
                        E-KATALOG TEKNOLOGI
                    </h1>
                    <nav className="flex space-x-3">
                        <HeaderIcon
                            Icon={Heart}
                            onClick={() => openDrawer('favorite')}
                            count={favoriteProducts.length}
                            label="Buka Favorit"
                            colors={colors}
                        />
                        <HeaderIcon
                            Icon={ShoppingCart}
                            onClick={() => openDrawer('cart')}
                            count={cart.length}
                            label="Buka Keranjang"
                            colors={colors}
                        />
                        <HeaderIcon
                            Icon={History}
                            onClick={() => openDrawer('history')}
                            count={history.length}
                            label="Buka Riwayat Pesanan"
                            colors={colors}
                        />
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

                {/* Pemilih Tema Warna (NEW) */}
                <section className="flex justify-end items-center space-x-3">
                    <Palette size={20} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Pilih Tema:</span>
                    {Object.keys(THEME_COLORS).map((themeName) => {
                        const theme = themeName as ThemeName;
                        const themeColors = THEME_COLORS[theme];
                        const displayName = theme.charAt(0).toUpperCase() + theme.slice(1);

                        return (
                            <button
                                key={theme}
                                onClick={() => setActiveTheme(theme)}
                                className={`w-6 h-6 rounded-full border-2 transition duration-200 ${activeTheme === theme ? `border-gray-900 dark:border-white ring-2 ring-offset-2 ${themeColors.primary.replace('bg-', 'ring-')}` : 'border-gray-300'
                                    } ${themeColors.primary}`}
                                aria-label={`Pilih tema ${theme}`}
                                title={displayName}
                            ></button>
                        );
                    })}
                </section>

                {/* 4. Hero Section / Banner */}
                {/* Menggunakan gradientFrom dan gradientTo */}
                <section className={`bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} ${colors.gradientFrom.replace('from-', 'dark:from-')} ${colors.gradientTo.replace('to-', 'dark:to-')} p-8 sm:p-12 rounded-2xl shadow-xl text-white`}>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="max-w-lg mb-6 md:mb-0">
                            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                                Temukan Gadget Impianmu!
                            </h2>
                            <p className="mt-3 text-white/80 text-lg">
                                Jelajahi koleksi produk teknologi terbaru dengan harga terbaik dan varian terlengkap.
                            </p>
                            {/* Menggunakan primaryText untuk tombol di Hero */}
                            <button className={`mt-6 px-6 py-3 bg-white ${colors.primaryText} font-bold rounded-full shadow-lg hover:bg-gray-100 transition duration-300`}>
                                Lihat Semua Produk
                            </button>
                        </div>
                        <div className="hidden sm:block">
                            <Laptop size={120} className="text-white/70" />
                        </div>
                    </div>
                </section>

                {/* 5. Kategori Section */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold border-b pb-2 border-gray-200 dark:border-gray-700">Kategori Produk</h2>
                    <div className="flex flex-wrap gap-3">
                        {DUMMY_CATEGORIES.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${activeCategory === cat.name
                                    // Menggunakan primary untuk tombol aktif
                                    ? `${colors.primary} text-white shadow-md`
                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
                                    }`}
                            >
                                <cat.icon size={18} />
                                <span>{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* 6. Card Produk Section */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold border-b pb-2 border-gray-200 dark:border-gray-700">
                        Daftar Produk ({activeCategory})
                    </h2>
                    {filteredProducts.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-10">Tidak ada produk dalam kategori ini.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onClick={() => openDetailModal(product)}
                                    onToggleFavorite={handleToggleFavorite}
                                    colors={colors} // Mengirimkan objek warna
                                />
                            ))}
                        </div>
                    )}
                </section>

            </main>

            {/* 3. Modal Samping (Drawer) */}
            <Drawer
                isOpen={activeDrawer !== null}
                onClose={closeDrawer}
                title={
                    activeDrawer === 'favorite'
                        ? 'Produk Favorit'
                        : activeDrawer === 'cart'
                            ? 'Keranjang Pesanan'
                            : activeDrawer === 'history'
                                ? 'Riwayat Pesanan'
                                : ''
                }
                colors={colors} // Mengirimkan objek warna
            >
                {renderDrawerContent(activeDrawer, colors)}
            </Drawer>

            {/* 7. Modal Detail Produk */}
            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={closeDetailModal}
                    onOrder={handleAddToCart}
                    colors={colors} // Mengirimkan objek warna
                />
            )}
        </div>
    );
}