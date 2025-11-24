import React, { useState, useMemo, useCallback } from 'react';
import { Heart, ShoppingCart, Clock, CheckCircle, Coffee, Utensils, MessageSquare, Settings } from 'lucide-react';
import { ALL_CATEGORIES, DUMMY_HISTORY, DUMMY_PRODUCTS, OrderItem, Product, ThemeColor, THEMES } from '@/lib/Types/Theme/Six';
import ProductCard from '@/Components/Theme/Six/ProductCard';
import ProductDetailModal from '@/Components/Theme/Six/ProductDetailModal';
import ThemeSelectorModal from '@/Components/Theme/Six/ThemeSelectorModal';
import IconDrawer from '@/Components/Theme/Six/IconDrawer';

export default function ThemeSix() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('Semua');

    // Menggunakan tema pertama (Cokelat Tanah) sebagai default
    const [currentTheme, setCurrentTheme] = useState<ThemeColor>(THEMES[0]);

    // State untuk Header Drawers
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
    const [isOrderOpen, setIsOrderOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);

    // State Data
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [favoriteItems, setFavoriteItems] = useState<Product[]>(DUMMY_PRODUCTS.slice(0, 1)); // Dummy favorites
    const [historyOrders, setHistoryOrders] = useState<OrderItem[][]>(DUMMY_HISTORY);

    // Filter Produk berdasarkan Kategori
    const filteredProducts = useMemo(() => {
        if (activeCategory === 'Semua') return DUMMY_PRODUCTS;
        return DUMMY_PRODUCTS.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    const handleOrderAdd = useCallback((item: OrderItem) => {
        setOrderItems(prev => [...prev, item]);
        console.log("Pesanan ditambahkan:", item);
    }, []);

    const handleOrderCheckout = () => {
        if (orderItems.length === 0) return;
        // Pindahkan item ke riwayat pesanan
        setHistoryOrders(prev => [orderItems, ...prev]);
        setOrderItems([]); // Kosongkan keranjang
        setIsOrderOpen(false);
    }

    // Fungsi untuk menutup semua drawer/modal
    const closeAllPopups = () => {
        setIsFavoritesOpen(false);
        setIsOrderOpen(false);
        setIsHistoryOpen(false);
        setIsThemeSelectorOpen(false);
        setSelectedProduct(null);
    };

    // Komponen Header (DESAIN BARU: Minimalis)
    const Header = () => (
        <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                <h1 className={`text-2xl font-black text-gray-900 flex items-center uppercase tracking-widest`}>
                    <Coffee className={`w-6 h-6 mr-2 text-${currentTheme.primary}-600`} />
                    Kedai Nusa
                </h1>
                <div className="flex space-x-3">
                    {/* Tombol Pengaturan Tema */}
                    <button onClick={() => { closeAllPopups(); setIsThemeSelectorOpen(true); }} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition" aria-label="Ganti Tema">
                        <Settings className="w-6 h-6" />
                    </button>
                    <button onClick={() => { closeAllPopups(); setIsFavoritesOpen(true); }} className="p-2 text-red-500 hover:bg-gray-100 rounded-full transition relative" aria-label="Favorit">
                        <Heart className="w-6 h-6" />
                        {favoriteItems.length > 0 && (
                            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold">
                                {favoriteItems.length}
                            </span>
                        )}
                    </button>
                    <button onClick={() => { closeAllPopups(); setIsOrderOpen(true); }} className={`p-2 text-${currentTheme.primary}-600 hover:bg-gray-100 rounded-full transition relative`} aria-label="Keranjang Belanja">
                        <ShoppingCart className="w-6 h-6" />
                        {orderItems.length > 0 && (
                            <span className={`absolute top-0 right-0 h-4 w-4 bg-${currentTheme.primary}-600 text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold`}>
                                {orderItems.length}
                            </span>
                        )}
                    </button>
                    <button onClick={() => { closeAllPopups(); setIsHistoryOpen(true); }} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition" aria-label="Riwayat Pesanan">
                        <Clock className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );

    // Komponen Hero/Banner (DESAIN BARU: Simpler & Cleaner)
    const HeroSection = () => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
            <div className={`bg-gradient-to-r ${currentTheme.heroFrom} ${currentTheme.heroTo} text-white p-8 md:p-16 rounded-3xl shadow-2xl`}>
                <div className="flex flex-col md:flex-row items-start justify-between">
                    <div>
                        <span className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-2 block">Premium Coffee & Meals</span>
                        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
                            Nikmati <span className='text-white/90 underline decoration-2'>Kualitas</span>, Dapatkan Rasa.
                        </h2>
                        <p className="text-lg font-light opacity-90 max-w-lg">
                            Jelajahi menu pilihan kami yang disiapkan dengan bahan-bahan terbaik dan penuh cinta.
                        </p>
                    </div>
                    <Utensils className="w-16 h-16 md:w-20 md:h-20 opacity-30 flex-shrink-0 mt-6 md:mt-0" />
                </div>
            </div>
        </div>
    );

    // Komponen Kategori
    const CategoryPills = () => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Telusuri Menu</h2>
            <div className="flex flex-wrap gap-3 overflow-x-auto pb-2">
                {ALL_CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-5 py-2 text-base font-semibold rounded-full transition duration-150 whitespace-nowrap border ${activeCategory === category
                            ? `bg-${currentTheme.primary}-600 text-white border-${currentTheme.primary}-600 shadow-lg`
                            : `bg-white text-gray-700 border-gray-200 hover:bg-gray-50`
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="pb-16">
                <HeroSection />
                <CategoryPills />

                {/* --- 6. LIST PRODUK (MENGGANTIKAN GRID CARD) --- */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
                        {activeCategory === 'Semua' ? 'Menu Lengkap' : `Kategori: ${activeCategory}`}
                    </h2>
                    {/* Mengganti grid dengan layout dua kolom untuk list item yang lebih panjang */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} theme={currentTheme} />
                        ))}
                    </div>
                    {filteredProducts.length === 0 && (
                        <p className="text-center text-gray-500 py-10 text-lg">Menu untuk kategori ini belum tersedia.</p>
                    )}
                </div>
            </main>

            {/* --- 3. MODAL / DRAWER --- */}

            {/* Detail Produk Modal (Tengah) */}
            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onOrder={handleOrderAdd}
                    theme={currentTheme}
                />
            )}

            {/* Pemilih Tema Modal (Tengah) */}
            {isThemeSelectorOpen && (
                <ThemeSelectorModal
                    onClose={closeAllPopups}
                    onSelectTheme={setCurrentTheme}
                    currentTheme={currentTheme}
                />
            )}

            {/* Drawer Favorite (Kanan) */}
            <IconDrawer isOpen={isFavoritesOpen} onClose={closeAllPopups} title="Daftar Favorit" theme={currentTheme}>
                {favoriteItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Belum ada item favorit.</p>
                ) : (
                    <ul className="space-y-4">
                        {favoriteItems.map(item => (
                            <li key={item.id} className="flex items-center space-x-4 p-4 bg-red-50 rounded-xl shadow-sm">
                                <Heart className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <div className="flex-grow">
                                    <p className="font-semibold text-gray-800">{item.name}</p>
                                    <p className="text-sm text-gray-500">Rp {(item.base_price).toLocaleString('id-ID')}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </IconDrawer>

            {/* Drawer Order (Keranjang - Kanan) */}
            <IconDrawer isOpen={isOrderOpen} onClose={closeAllPopups} title="Pesanan Anda" theme={currentTheme}>
                {orderItems.length === 0 ? (
                    <div className="text-center py-10">
                        <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Keranjang Anda masih kosong.</p>
                    </div>
                ) : (
                    <>
                        <ul className="space-y-4">
                            {orderItems.map((item, index) => (
                                <li key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl shadow-sm">
                                    <div>
                                        <p className="font-semibold text-gray-800">{item.product.name}</p>
                                        <p className="text-sm text-gray-500">({item.variant.name}) x {item.quantity}</p>
                                        <p className="text-sm font-bold text-gray-600 mt-1">Rp {(item.subtotal).toLocaleString('id-ID')}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 pt-4 border-t border-gray-200">
                            <div className="flex justify-between font-bold text-xl text-gray-800 mb-4">
                                <span>TOTAL AKHIR:</span>
                                <span className={`text-${currentTheme.primary}-700`}>Rp {orderItems.reduce((acc, item) => acc + item.subtotal, 0).toLocaleString('id-ID')}</span>
                            </div>
                            <button
                                onClick={handleOrderCheckout}
                                className={`w-full mt-2 bg-${currentTheme.primary}-600 text-white font-extrabold py-3 rounded-xl hover:bg-${currentTheme.primary}-700 transition shadow-lg shadow-${currentTheme.primary}-500/50`}
                            >
                                Lanjutkan Pembayaran
                            </button>
                        </div>
                    </>
                )}
            </IconDrawer>

            {/* Drawer History Order (Kanan) */}
            <IconDrawer isOpen={isHistoryOpen} onClose={closeAllPopups} title="Riwayat Pesanan" theme={currentTheme}>
                {historyOrders.length === 0 ? (
                    <div className="text-center py-10">
                        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Anda belum memiliki riwayat pesanan.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {historyOrders.map((order, index) => (
                            <div key={index} className={`border border-gray-200 rounded-xl p-5 bg-white shadow-md`}>
                                <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-2">
                                    <h4 className={`font-extrabold text-lg text-gray-800`}>Order #{historyOrders.length - index}</h4>
                                    <span className={`text-sm font-semibold text-green-600 flex items-center`}>
                                        <CheckCircle className='w-4 h-4 mr-1' /> Selesai
                                    </span>
                                </div>
                                <ul className="space-y-2 text-sm">
                                    {order.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex justify-between text-gray-700">
                                            <span className='w-3/4 truncate'>{item.product.name} ({item.variant.name})</span>
                                            <span className='font-semibold'>x {item.quantity}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className={`mt-4 pt-3 border-t border-gray-200 flex justify-between font-bold text-lg text-gray-900`}>
                                    <span>TOTAL:</span>
                                    <span className={`text-${currentTheme.primary}-800`}>Rp {order.reduce((acc, item) => acc + item.subtotal, 0).toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </IconDrawer>

            {/* Footer minimal untuk sentuhan kafe */}
            <footer className="bg-white border-t border-gray-100 p-6 mt-16 shadow-inner">
                <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
                    <p className="flex items-center justify-center font-light">
                        <MessageSquare className="w-4 h-4 mr-2 opacity-70" />
                        Layanan Langganan: +62812-5413-0919 | © 2025 UsahaKu
                    </p>
                </div>
            </footer>
        </div>
    );
}