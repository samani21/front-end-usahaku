import React, { useState, useMemo } from 'react';
// Menggunakan lucide-react untuk ikon
import { Heart, ShoppingCart, History, Home, Coffee, Pizza, X, ChevronRight, Utensils, Palette, Gift } from 'lucide-react'; // Menambahkan ikon Gift
import { CartItem, DUMMY_HISTORY, DUMMY_PRODUCTS, formatRupiah, INITIAL_QUEUE_DATA, Product, SidebarType, Theme, THEMES } from '@/lib/Types/Theme/Elevent';
import ProductCard from '@/Components/Theme/Elevent/ProductCard';
import RightSidebar from '@/Components/Theme/Elevent/RightSidebar';
import ProductDetailModal from '@/Components/Theme/Elevent/ProductDetailModal';

// --- 6. KOMPONEN UTAMA (APP) ---

const ThemeElevent: React.FC = () => {
    const [activeSidebar, setActiveSidebar] = useState<SidebarType>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    // Menambahkan 'package' ke tipe state kategori
    const [activeCategory, setActiveCategory] = useState<'all' | 'main' | 'drink' | 'snack' | 'package'>('all');
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
    const [queueInfo] = useState(INITIAL_QUEUE_DATA);
    const [activeTheme, setActiveTheme] = useState<Theme>(THEMES[0]); // Default theme: Red

    // LOGIKA TAMBAHKAN KE FAVORIT
    const toggleFavorite = (product: Product) => {
        setFavoriteProducts((prev) =>
            prev.some((p) => p.id === product.id)
                ? prev.filter((p) => p.id !== product.id)
                : [...prev, product]
        );
    };

    // LOGIKA TAMBAHKAN KE KERANJANG
    const handleAddToCart = (item: CartItem) => {
        setCartItems((prev) => {
            // Cek apakah produk dan varian yang sama sudah ada
            const existingItemIndex = prev.findIndex(
                (i) => i.product.id === item.product.id && i.variant.id === item.variant.id
            );

            if (existingItemIndex > -1) {
                // Jika ada, perbarui kuantitas
                const newItems = [...prev];
                newItems[existingItemIndex].quantity += item.quantity;
                return newItems;
            } else {
                // Jika belum ada, tambahkan item baru
                return [...prev, item];
            }
        });
    };

    // LOGIKA FILTER PRODUK
    const filteredProducts = useMemo(() => {
        if (activeCategory === 'all') return DUMMY_PRODUCTS;
        return DUMMY_PRODUCTS.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    // Total Harga Keranjang
    const cartTotal = cartItems.reduce((sum, item) => {
        const itemPrice = item.product.price + item.variant.priceAdjustment;
        return sum + itemPrice * item.quantity;
    }, 0);

    // --- KOMPONEN HEADER (Menggunakan tema dinamis) ---
    const Header: React.FC = () => (
        <header className={`fixed top-0 left-0 w-full ${activeTheme.primaryBg} shadow-md z-30`}>
            <div className="max-w-7xl mx-auto p-4 flex justify-between items-center text-white">
                {/* Kiri: Posisi & Antrian - Dihapus dari sini karena sudah ada di banner baru */}
                <div className="flex flex-col text-lg font-bold">
                    Kedai Mantap
                </div>

                {/* Kanan: Icons */}
                <div className="flex space-x-4">
                    <button
                        className={`relative p-2 rounded-full ${activeTheme.primaryHover} transition-colors`}
                        onClick={() => setActiveSidebar('favorite')}
                    >
                        <Heart size={24} />
                        {favoriteProducts.length > 0 && (
                            // Menggunakan warna sekunder yang lebih terang untuk badge
                            <span className={`absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ${activeTheme.primaryBg} ${activeTheme.secondaryBg.replace('500', '400')}`}></span>
                        )}
                    </button>
                    <button
                        className={`relative p-2 rounded-full ${activeTheme.primaryHover} transition-colors`}
                        onClick={() => setActiveSidebar('cart')}
                    >
                        <ShoppingCart size={24} />
                        {cartItems.length > 0 && (
                            <span className={`absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none ${activeTheme.primaryText} transform translate-x-1/2 -translate-y-1/2 ${activeTheme.secondaryBg.replace('500', '400')} rounded-full`}>
                                {cartItems.length}
                            </span>
                        )}
                    </button>
                    <button
                        className={`p-2 rounded-full ${activeTheme.primaryHover} transition-colors`}
                        onClick={() => setActiveSidebar('history')}
                    >
                        <History size={24} />
                    </button>
                </div>
            </div>
        </header>
    );

    // --- KOMPONEN KONTEN SIDEBAR (Menggunakan tema dinamis) ---
    const SidebarContent: React.FC<{ type: SidebarType; theme: Theme }> = ({ type, theme }) => {
        switch (type) {
            case 'cart':
                return (
                    <div>
                        <h3 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">Detail Pesanan ({cartItems.length})</h3>
                        {cartItems.length === 0 ? (
                            <p className="text-center text-gray-500 py-10">Keranjang masih kosong. Ayo pesan!</p>
                        ) : (
                            <>
                                <ul className="space-y-4">
                                    {cartItems.map((item, index) => (
                                        <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
                                            <div>
                                                <p className="font-semibold text-gray-800">{item.product.name}</p>
                                                <p className="text-sm text-gray-600">
                                                    {item.quantity} x {item.variant.name}
                                                </p>
                                                <p className="text-xs font-medium text-green-600">
                                                    {formatRupiah(item.product.price + item.variant.priceAdjustment)}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setCartItems(cartItems.filter((_, i) => i !== index))}
                                                className="text-red-500 hover:text-red-700 p-1 rounded-full bg-white transition"
                                                title="Hapus"
                                            >
                                                <X size={16} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div className={`mt-6 p-4 ${theme.primaryBgLighter} rounded-lg`}>
                                    <div className="flex justify-between font-bold text-xl text-gray-900">
                                        <span>Total:</span>
                                        <span>{formatRupiah(cartTotal)}</span>
                                    </div>
                                    <button className={`mt-4 w-full py-2 ${theme.primaryBg} text-white font-bold rounded-lg ${theme.primaryHover} transition`}>
                                        Proses Pembayaran
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                );
            case 'favorite':
                return (
                    <div>
                        <h3 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">Produk Favorit ({favoriteProducts.length})</h3>
                        {favoriteProducts.length === 0 ? (
                            <p className="text-center text-gray-500 py-10">Belum ada favorit.</p>
                        ) : (
                            <ul className="space-y-3">
                                {favoriteProducts.map((p) => (
                                    <li key={p.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="font-medium">{p.name}</span>
                                        <button
                                            onClick={() => toggleFavorite(p)}
                                            className="text-red-500 hover:text-red-700 p-1 transition"
                                            title="Hapus dari Favorit"
                                        >
                                            <X size={16} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
            case 'history':
                return (
                    <div>
                        <h3 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">Riwayat Pesanan ({DUMMY_HISTORY.length})</h3>
                        {DUMMY_HISTORY.map((item, index) => (
                            <div key={index} className="mb-4 p-3 border rounded-lg bg-gray-50">
                                <p className="font-bold text-sm text-gray-800">No. Pesanan: {item.orderNumber}</p>
                                <p className="text-xs text-gray-500 mb-2">{item.timestamp}</p>
                                <p className="text-sm">
                                    <span className="font-semibold">{item.product.name}</span> ({item.variant.name}) x {item.quantity}
                                </p>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };


    const queueStatusText = queueInfo.currentQueue >= queueInfo.orderQueue
        ? 'Siap Memesan!' // Sudah tidak ada antrian menunggu
        : `Antrian saat ini: #${queueInfo.currentQueue}`;

    // Warna status antrian
    const queueStatusColor = queueInfo.currentQueue >= queueInfo.orderQueue
        ? 'text-green-600' // Hijau jika siap
        : activeTheme.primaryText; // Warna primer jika ada antrian

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header />

            <main className="max-w-7xl mx-auto pt-20 pb-10 px-4 sm:px-6 lg:px-8">
                {/* 4. Hero Section / Banner (Tampilan Alert Box Informatif Baru) */}
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
                <section className="mb-8">
                    <div className={`p-5 rounded-2xl shadow-xl border-l-4 ${activeTheme.primaryBorder} ${activeTheme.primaryBgLighter} flex justify-between items-center transition-all duration-300`}>
                        {/* Kiri: Teks & Informasi */}
                        <div className="flex flex-col">
                            <h1 className={`text-xl font-bold ${queueStatusColor}`}>
                                {queueStatusText}
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Anda berada di **Meja: {queueInfo.tablePosition}**
                            </p>
                            <p className="text-xs text-gray-500">
                                Antrian Anda saat ini: **{queueInfo.orderQueue}**
                            </p>
                        </div>
                        {/* Kanan: Ikon & Aksi (Ajakan Memesan) */}
                        <div className="flex items-center space-x-2">
                            <span className={`hidden sm:inline-block text-sm font-medium ${activeTheme.primaryText}`}>
                                Mulai Pesan
                            </span>
                            <ChevronRight size={24} className={`animate-move-right ${activeTheme.primaryText}`} />
                        </div>
                    </div>
                </section>

                {/* 5. Kategori (Menggunakan tema dinamis) */}
                <section className="mb-8 overflow-x-auto whitespace-nowrap py-2 scrollbar-hide">
                    <div className='flex space-x-3'>
                        {[
                            { id: 'all', name: 'Semua Menu', icon: Home },
                            { id: 'package', name: 'Paket Hemat', icon: Gift }, // Kategori Paket Hemat Baru
                            { id: 'main', name: 'Makanan Utama', icon: Pizza },
                            { id: 'drink', name: 'Minuman Segar', icon: Coffee },
                            { id: 'snack', name: 'Cemilan', icon: Utensils },
                        ].map((category) => {
                            const Icon = category.icon;
                            const isActive = activeCategory === category.id;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id as any)}
                                    className={`flex items-center space-x-2 py-2 px-4 rounded-full text-sm font-medium transition-colors border ${isActive
                                        ? `${activeTheme.primaryBg} text-white ${activeTheme.primaryBorder} shadow-md`
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span>{category.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </section>


                {/* 6. Card Produk */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu {activeCategory === 'all' ? 'Populer' : activeCategory === 'package' ? 'Paket Hemat' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</h2>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onClick={() => setSelectedProduct(product)}
                                    theme={activeTheme} // Meneruskan tema ke Card Produk
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-10">Tidak ada produk di kategori ini.</p>
                    )}
                </section>
            </main>

            {/* Theme Selector Floating Button */}
            <div className="fixed bottom-4 right-4 z-50">
                <div className={`bg-white rounded-xl shadow-2xl p-2 flex space-x-2 border-2 ${activeTheme.primaryBorder}`}>
                    <Palette size={20} className={`${activeTheme.primaryText} self-center`} />
                    {THEMES.map(theme => (
                        <button
                            key={theme.id}
                            onClick={() => setActiveTheme(theme)}
                            title={theme.name}
                            // Mengubah ukuran dan border untuk menampung 8 tombol
                            className={`w-7 h-7 rounded-full transition-all ${activeTheme.id === theme.id ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'hover:opacity-75'} ${theme.primaryBg}`}
                        />
                    ))}
                </div>
            </div>

            {/* 3. Modal Samping Kanan untuk Header Icons */}
            <RightSidebar
                type={activeSidebar}
                onClose={() => setActiveSidebar(null)}
                title={
                    activeSidebar === 'cart' ? 'Keranjang Belanja' :
                        activeSidebar === 'favorite' ? 'Daftar Favorit' :
                            activeSidebar === 'history' ? 'Riwayat Pesanan' : ''
                }
            >
                <SidebarContent type={activeSidebar} theme={activeTheme} /> {/* Meneruskan tema */}
            </RightSidebar>

            {/* 7. Modal Detail Produk */}
            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onAddToCart={handleAddToCart}
                    theme={activeTheme} // Meneruskan tema ke Modal Detail Produk
                />
            )}
        </div>
    );
};

export default ThemeElevent;