import Header from '@/Components/Theme/One/Header';
import NotificationToast from '@/Components/Theme/One/NotificationToast';
import ProductCard from '@/Components/Theme/One/ProductCard';
import ProductDetailModal from '@/Components/Theme/One/ProductDetailModal';
import SideDrawer from '@/Components/Theme/One/SideDrawer';
import { DUMMY_CATEGORIES, DUMMY_PRODUCTS, formatRupiah, NotificationState, Product, THEME_CONFIG, ThemeConfig, UIState } from '@/lib/Types/Theme/One';
import React, { useState, useCallback, useMemo } from 'react';

const ThemeOne: React.FC = () => {
    const [uiState, setUiState] = useState<UIState>({
        showFavoritesDrawer: false,
        showOrdersDrawer: false,
        showHistoryDrawer: false,
        selectedProduct: null,
        activeThemeName: 'Dark', // FIXED KE DARK MODE
    });
    const [activeCategory, setActiveCategory] = useState<string>("Semua");
    const [notification, setNotification] = useState<NotificationState>({
        message: '',
        visible: false,
        type: 'success',
    });

    // Menggunakan useMemo untuk mendapatkan konfigurasi tema aktif (Hanya Dark)
    const activeTheme = useMemo<ThemeConfig>(() => THEME_CONFIG['Dark'], []);

    // Handler untuk menampilkan notifikasi toast
    const showNotification = useCallback((message: string, type: 'success' | 'error' = 'success') => {
        setNotification({ message, visible: true, type });
        setTimeout(() => {
            setNotification(prev => ({ ...prev, visible: false }));
        }, 4000); // Notifikasi hilang setelah 4 detik
    }, []);

    // Handler untuk membuka/menutup drawer
    const toggleDrawer = useCallback((drawerName: keyof UIState, state: boolean) => {
        setUiState(prev => ({ ...prev, [drawerName]: state }));
    }, []);

    // Handler untuk membuka detail produk modal
    const openProductDetail = useCallback((product: Product) => {
        setUiState(prev => ({ ...prev, selectedProduct: product }));
    }, []);

    // Handler untuk menutup modal detail produk
    const closeProductDetail = useCallback(() => {
        setUiState(prev => ({ ...prev, selectedProduct: null }));
    }, []);

    // Filtered Products based on category
    const filteredProducts = useMemo(() => {
        if (activeCategory === "Semua") {
            return DUMMY_PRODUCTS;
        }
        return DUMMY_PRODUCTS.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    // Style classes based on active theme (Fixed to Dark Mode)
    const primaryBg = `bg-cyan-600`;
    const secondaryBg = `bg-teal-700`;
    const bgColor = `bg-gray-900`;
    const mainTextColor = `text-gray-50`;
    const cardBgColor = `bg-gray-800`;

    // Gradient for Hero Section (Dark Mode Style)
    const heroGradient = `from-gray-800 to-cyan-900`;
    const heroTextColor = 'text-white';
    const primaryText = `text-cyan-400`;
    const subtleTextColor = `text-gray-400`;


    // --- Render Konten Drawer ---
    const renderDrawerContent = (type: keyof UIState) => {
        switch (type) {
            case 'showFavoritesDrawer':
                const favorites = DUMMY_PRODUCTS.filter(p => p.isFavorite);
                return (
                    <div className="space-y-4">
                        {favorites.length > 0 ? favorites.map(p => (
                            <div key={p.id} className={`p-4 rounded-lg flex justify-between items-center bg-gray-800 border border-red-200/50 shadow-sm`}>
                                <p className={`font-semibold ${mainTextColor}`}>{p.name}</p>
                                <button
                                    className={`text-sm ${primaryText} font-medium hover:underline`}
                                    onClick={() => { openProductDetail(p); toggleDrawer(type, false); }}
                                >
                                    Lihat Detail
                                </button>
                            </div>
                        )) : <p className={`${subtleTextColor} italic p-4`}>Belum ada produk favorit. Klik ikon hati pada produk untuk menambahkannya.</p>}
                    </div>
                );
            case 'showOrdersDrawer':
                return (
                    <div className="space-y-4">
                        <p className={`text-xl font-bold ${mainTextColor}`}>Ringkasan Pesanan</p>
                        <div className="border-t border-b py-4 space-y-3 border-gray-700/20">
                            <div className={`flex justify-between ${subtleTextColor}`}><span>1x Kopi Arabika Premium</span> <span>{formatRupiah(55000)}</span></div>
                            <div className={`flex justify-between ${subtleTextColor}`}><span>2x Roti Gandum Utuh</span> <span>{formatRupiah(60000)}</span></div>
                        </div>
                        <div className={`flex justify-between text-2xl font-extrabold ${primaryText}`}>
                            <span>Total:</span> <span>{formatRupiah(115000)}</span>
                        </div>
                        <button className={`w-full ${secondaryBg} text-white py-3 rounded-xl mt-4 font-bold text-lg hover:opacity-90 transition shadow-lg`}>Lanjutkan Pembayaran</button>
                    </div>
                );
            case 'showHistoryDrawer':
                return (
                    <div className="space-y-4">
                        <p className={`text-xl font-bold ${mainTextColor}`}>Riwayat 30 Hari</p>
                        <div className={`p-4 border rounded-xl bg-gray-800 shadow-sm border-gray-700/20`}>
                            <p className={`font-semibold ${mainTextColor}`}>Pesanan #2024001</p>
                            <p className={`text-sm ${subtleTextColor}`}>3 Produk - Total: {formatRupiah(85000)}</p>
                            <p className="text-xs text-green-500 font-medium mt-1">Selesai (2 Hari Lalu)</p>
                        </div>
                        <div className={`p-4 border rounded-xl bg-gray-800 shadow-sm border-gray-700/20`}>
                            <p className={`font-semibold ${mainTextColor}`}>Pesanan #2024002</p>
                            <p className={`text-sm ${subtleTextColor}`}>1 Produk - Total: {formatRupiah(210000)}</p>
                            <p className="text-xs text-green-500 font-medium mt-1">Selesai (1 Minggu Lalu)</p>
                        </div>
                        <p className={`${subtleTextColor} italic text-sm pt-2`}>Data ini bersifat statis untuk demo.</p>
                    </div>
                );
            default:
                return <p>Konten tidak ditemukan.</p>;
        }
    };


    return (
        <div className={`min-h-screen ${bgColor} ${mainTextColor} font-sans transition-colors duration-500`}>
            <Header
                onIconClick={(drawerName) => toggleDrawer(drawerName, true)}
                theme={activeTheme}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 1. Hero Section / Banner (Modern Gradient Dark Mode) */}
                <section className={`bg-gradient-to-r ${heroGradient} rounded-3xl shadow-2xl overflow-hidden mb-16 p-8 md:p-16 ${heroTextColor}`}>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-3/5">
                            <span className={`text-sm font-semibold uppercase tracking-widest text-teal-200 mb-2 block`}>Penawaran Eksklusif</span>
                            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">Diskon Hingga 30%</h2>
                            <p className={`text-cyan-100 text-xl mb-8`}>Pilih produk favorit Anda dari semua kategori dan nikmati harga terbaik.</p>
                            <button className={`bg-white ${primaryText} font-bold py-3.5 px-10 rounded-full shadow-lg hover:bg-slate-100 transition duration-300 transform hover:scale-105`}
                                onClick={() => {
                                    const sec = document.getElementById("produk-pilihan");
                                    sec?.scrollIntoView({ behavior: "smooth" });
                                }}>
                                Belanja Sekarang
                            </button>
                        </div>
                        <div className="hidden md:block md:w-1/4">
                            {/* SVG Ilustrasi Modern */}
                            <svg className="w-full h-auto text-white opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                        </div>
                    </div>
                </section>

                {/* 2. Kategori */}
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className={`text-4xl font-bold ${mainTextColor}`}>Jelajahi Kategori</h2>
                    </div>

                    <div className="flex overflow-x-auto pb-4 space-x-3 sm:space-x-5 whitespace-nowrap scrollbar-hide">
                        {DUMMY_CATEGORIES.map(category => (
                            <button
                                key={category}
                                className={`flex-shrink-0 py-2.5 px-8 rounded-full text-lg font-semibold transition duration-200 ${activeCategory === category
                                    ? `${primaryBg} text-white shadow-lg`
                                    : `${cardBgColor} ${mainTextColor} border border-gray-700/20 hover:bg-gray-700`
                                    }`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </section>

                {/* 3. Card Produk (Grid dengan desain horizontal baru) */}
                <section id="produk-pilihan">
                    <h2 className={`text-4xl font-bold ${mainTextColor} mb-8`}>Produk Pilihan</h2>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" role="list">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} onClick={openProductDetail} theme={activeTheme} />
                            ))}
                        </div>
                    ) : (
                        <div className={`text-center p-10 ${cardBgColor} rounded-xl shadow-md border border-gray-700/20`}>
                            <p className={`text-xl ${subtleTextColor}`}>Tidak ada produk di kategori <span className={`font-bold ${primaryText}`}>"{activeCategory}"</span>.</p>
                        </div>
                    )}
                </section>
            </main>

            {/* Render Modals/Drawers */}

            {/* Favorite Drawer */}
            <SideDrawer
                isOpen={uiState.showFavoritesDrawer}
                onClose={() => toggleDrawer('showFavoritesDrawer', false)}
                title="Daftar Favorit Anda"
                theme={activeTheme}
            >
                {renderDrawerContent('showFavoritesDrawer')}
            </SideDrawer>

            {/* Orders Drawer */}
            <SideDrawer
                isOpen={uiState.showOrdersDrawer}
                onClose={() => toggleDrawer('showOrdersDrawer', false)}
                title="Keranjang Belanja"
                theme={activeTheme}
            >
                {renderDrawerContent('showOrdersDrawer')}
            </SideDrawer>

            {/* History Order Drawer */}
            <SideDrawer
                isOpen={uiState.showHistoryDrawer}
                onClose={() => toggleDrawer('showHistoryDrawer', false)}
                title="Riwayat Transaksi"
                theme={activeTheme}
            >
                {renderDrawerContent('showHistoryDrawer')}
            </SideDrawer>

            {/* Product Detail Modal (Tengah) */}
            {uiState.selectedProduct && (
                <ProductDetailModal
                    product={uiState.selectedProduct}
                    onClose={closeProductDetail}
                    onOrderSuccess={showNotification}
                    theme={activeTheme}
                />
            )}

            {/* Notification Toast */}
            <NotificationToast notification={notification} theme={activeTheme} />
        </div>
    );
};

export default ThemeOne;