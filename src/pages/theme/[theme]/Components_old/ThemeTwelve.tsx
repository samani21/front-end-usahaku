import React, { useState, useCallback, useMemo } from 'react';
import { MapPin, Star, Palette } from 'lucide-react';
import { CartItem, DUMMY_CATEGORIES, DUMMY_FAVORITES, DUMMY_ORDER_HISTORY, DUMMY_PRODUCTS, DUMMY_QUEUE_INFO, DUMMY_TABLE_NUMBER, Product, THEMES } from '@/lib/Types/Theme/Twelve';
import ProductCard from '@/Components/Theme/Twelve/ProductCard';
import ProductDetailModal from '@/Components/Theme/Twelve/ProductDetailModal';
import Drawer from '@/Components/Theme/Twelve/Drawer';
import Header from '@/Components/Theme/Twelve/Header';

// --- Komponen Utama: App ---

export const ThemeTwelve = () => {
    const [activeDrawer, setActiveDrawer] = useState<'none' | 'favorite' | 'order' | 'history'>('none');
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    // State untuk Tema Warna
    const [themeName, setThemeName] = useState('Jingga');
    const currentTheme = THEMES.find(t => t.name === themeName) || THEMES[0];
    const themePrimary = currentTheme.primary; // e.g., 'orange', 'indigo'

    const openProductDetail = (product: Product) => {
        setSelectedProduct(product);
        setIsDetailModalOpen(true);
    };

    const closeProductDetail = () => {
        setIsDetailModalOpen(false);
        setSelectedProduct(null);
    };

    const handleOpenDrawer = (type: 'favorite' | 'order' | 'history') => {
        setActiveDrawer(type);
    };

    const handleCloseDrawer = () => {
        setActiveDrawer('none');
    };

    const handleAddToCart = useCallback((item: CartItem) => {
        // Check if product with same variant already exists
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                i => i.productId === item.productId && i.variantId === item.variantId
            );

            if (existingItemIndex > -1) {
                // Update quantity
                return prevItems.map((i, index) =>
                    index === existingItemIndex ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            } else {
                // Add new item
                return [...prevItems, item];
            }
        });
    }, []);

    const totalCartItems = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
    const totalCartPrice = useMemo(() => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cartItems]);

    const filteredProducts = useMemo(() => {
        if (!selectedCategory) return DUMMY_PRODUCTS;
        const categoryName = DUMMY_CATEGORIES.find(c => c.id === selectedCategory)?.name;
        if (categoryName === "Makanan Berat") return DUMMY_PRODUCTS.filter(p => p.id === 1 || p.id === 3);
        if (categoryName === "Minuman Kopi") return DUMMY_PRODUCTS.filter(p => p.id === 2);
        if (categoryName === "Minuman Segar") return DUMMY_PRODUCTS.filter(p => p.id === 4);
        return DUMMY_PRODUCTS;
    }, [selectedCategory]);


    // --- Konten Drawer ---

    const renderDrawerContent = (type: 'favorite' | 'order' | 'history') => {
        switch (type) {
            case 'favorite':
                const favoriteProducts = DUMMY_PRODUCTS.filter(p => DUMMY_FAVORITES.includes(p.id));
                return (
                    <div className='space-y-4'>
                        {favoriteProducts.length > 0 ? favoriteProducts.map(p => (
                            <div key={p.id} className={`p-3 border border-gray-300 rounded-lg flex items-center justify-between bg-${themePrimary}-50`}>
                                <span className="font-medium">{p.name}</span>
                                <button onClick={() => openProductDetail(p)} className={`text-sm text-${themePrimary}-600 hover:underline`}>Detail</button>
                            </div>
                        )) : <p className="text-gray-500">Belum ada item favorit.</p>}
                    </div>
                );
            case 'order':
                return (
                    <div className='flex flex-col h-full'>
                        <div className='flex-grow space-y-4 overflow-y-auto pr-2'>
                            {cartItems.length > 0 ? cartItems.map((item, index) => (
                                <div key={index} className="p-3 border border-gray-300 rounded-lg bg-gray-50">
                                    <p className="font-semibold text-gray-800">{item.name}</p>
                                    <p className="text-sm text-gray-600">Varian: {item.variantName}</p>
                                    <p className="text-sm text-gray-600">Rp{item.price.toLocaleString('id-ID')} x {item.quantity}</p>
                                </div>
                            )) : <p className="text-gray-500">Keranjang kosong.</p>}
                        </div>
                        <div className='mt-6 pt-4 border-t border-gray-300 sticky bottom-0 bg-white'>
                            <div className='flex justify-between items-center text-xl font-bold mb-3'>
                                <span>Total:</span>
                                <span className={`text-${themePrimary}-600`}>Rp{totalCartPrice.toLocaleString('id-ID')}</span>
                            </div>
                            <button className='w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700'>
                                Konfirmasi Pesanan
                            </button>
                        </div>
                    </div>
                );
            case 'history':
                return (
                    <div className='space-y-4'>
                        {DUMMY_ORDER_HISTORY.map(h => (
                            <div key={h.id} className="p-4 border border-gray-300 rounded-lg shadow-sm">
                                <p className="font-semibold text-gray-800">Order ID: #{h.id}</p>
                                <p className="text-sm text-gray-600">Tanggal: {h.date}</p>
                                <p className={`text-lg font-bold text-${themePrimary}-600`}>Total: Rp{h.total.toLocaleString('id-ID')}</p>
                                <p className="text-sm text-gray-500">{h.items} item</p>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };


    // Ambil produk spesial (misalnya, Nasi Goreng Spesial)
    const specialProduct = DUMMY_PRODUCTS.find(p => p.id === 1);
    const specialPrice = specialProduct?.price.toLocaleString('id-ID') || 'N/A';
    const specialName = specialProduct?.name || 'Menu Spesial';
    const specialImage = specialProduct?.imageUrl || 'https://sanex.co.id/wp-content/uploads/2025/03/2734-1.webp';


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header onOpenDrawer={handleOpenDrawer} cartCount={totalCartItems} />

            <main className="container mx-auto px-4 py-6 flex-grow">
                {/* Posisi Meja & Antrian Info (Warna Dinamis) */}
                <div className={`bg-${themePrimary}-100 p-4 rounded-xl shadow-md mb-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 text-${themePrimary}-800`}>
                    <div className='flex items-center space-x-2'>
                        <MapPin size={20} />
                        <span className="font-bold">Posisi Meja: {DUMMY_TABLE_NUMBER}</span>
                    </div>
                    <div className='flex space-x-4 text-sm font-medium'>
                        <span>Antrian Pesanan: <span className={`font-bold text-${themePrimary}-600`}>{DUMMY_QUEUE_INFO.order}</span></span>
                        <span>Antrian Sekarang: <span className={`font-bold text-${themePrimary}-600`}>{DUMMY_QUEUE_INFO.current}</span></span>
                    </div>
                </div>

                {/* Pemilih Tema Warna */}
                <div className="flex justify-start items-center space-x-4 p-4 mb-8 bg-white rounded-xl shadow-md">
                    <Palette size={20} className="text-gray-600 flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-700 flex-shrink-0">Pilih Tema ({themeName}):</span>
                    <div className="flex space-x-2 overflow-x-auto pb-0.5">
                        {THEMES.map((theme) => (
                            <button
                                key={theme.name}
                                onClick={() => setThemeName(theme.name)}
                                className={`w-7 h-7 rounded-full shadow-inner border-2 transition-all duration-200 flex-shrink-0`}
                                style={{ backgroundColor: theme.hex, borderColor: themeName === theme.name ? '#000000' : 'transparent' }}
                                title={theme.name}
                            >
                                {themeName === theme.name && (
                                    <div className="w-full h-full rounded-full ring-2 ring-white/70"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Hero Section / Banner - TEMA BARU: Menu Harian Spesial (Warna Dinamis) */}
                <div className={`relative bg-${themePrimary}-50 h-auto rounded-xl shadow-xl mb-8 overflow-hidden flex flex-col sm:flex-row items-stretch border border-${themePrimary}-200`}>
                    {/* Kiri: Gambar Produk Spesial */}
                    <div className="w-full sm:w-1/3 h-48 sm:h-auto relative">
                        <img
                            src={specialImage}
                            alt={specialName}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.src = `https://placehold.co/400x300/${currentTheme.hex.substring(1)}/ffffff?text=Menu+Harian`; }}
                        />
                    </div>

                    {/* Kanan: Detail Spesial */}
                    <div className="flex-1 p-6 flex flex-col justify-center">
                        <div className={`inline-flex items-center space-x-2 text-${themePrimary}-600 mb-2`}>
                            <Star size={20} className={`fill-${themePrimary}-400`} />
                            <p className="text-sm font-bold uppercase tracking-wider">REKOMENDASI HARI INI</p>
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                            {specialName}
                        </h2>

                        <p className="mt-2 text-gray-700 line-clamp-2">
                            {specialProduct?.description || "Rasakan kelezatan menu pilihan terbaik kami yang wajib Anda coba hari ini!"}
                        </p>

                        <div className="mt-4 flex items-center space-x-4">
                            <span className={`text-2xl font-bold text-${themePrimary}-600`}>
                                Rp{specialPrice}
                            </span>
                            <button
                                onClick={() => specialProduct && openProductDetail(specialProduct)}
                                className={`px-5 py-2 bg-${themePrimary}-500 text-white font-bold rounded-full shadow-lg hover:bg-${themePrimary}-600 transition-colors text-base`}
                            >
                                Pesan Sekarang
                            </button>
                        </div>
                    </div>
                </div>

                {/* Kategori */}
                <section id="kategori" className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Pilih Kategori</h2>
                    <div className="flex space-x-3 overflow-x-auto pb-2">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-colors ${!selectedCategory ? `bg-${themePrimary}-600 text-white shadow-md` : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
                        >
                            Semua
                        </button>
                        {DUMMY_CATEGORIES.map(cat => {
                            const Icon = cat.icon;
                            const isActive = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex-shrink-0 px-4 py-2 rounded-full flex items-center space-x-2 font-medium transition-colors ${isActive ? `bg-${themePrimary}-600 text-white shadow-md` : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
                                >
                                    <Icon size={18} />
                                    <span>{cat.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* Daftar Produk */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        {selectedCategory ? DUMMY_CATEGORIES.find(c => c.id === selectedCategory)?.name : "Semua Produk"}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} onClick={openProductDetail} themePrimary={themePrimary} />
                        ))}
                    </div>
                    {filteredProducts.length === 0 && (
                        <div className="text-center p-10 bg-white rounded-xl text-gray-500">
                            <p>Tidak ada produk yang tersedia di kategori ini.</p>
                        </div>
                    )}
                </section>
            </main>

            {/* --- Modals & Drawers --- */}

            {/* Product Detail Modal */}
            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    isOpen={isDetailModalOpen}
                    onClose={closeProductDetail}
                    onAddToCart={handleAddToCart}
                    themePrimary={themePrimary}
                />
            )}

            {/* Drawers */}
            <Drawer
                isOpen={activeDrawer === 'favorite'}
                onClose={handleCloseDrawer}
                title="Daftar Favorit"
            >
                {renderDrawerContent('favorite')}
            </Drawer>

            <Drawer
                isOpen={activeDrawer === 'order'}
                onClose={handleCloseDrawer}
                title="Keranjang Pesanan"
            >
                {renderDrawerContent('order')}
            </Drawer>

            <Drawer
                isOpen={activeDrawer === 'history'}
                onClose={handleCloseDrawer}
                title="Riwayat Pesanan"
            >
                {renderDrawerContent('history')}
            </Drawer>

        </div>
    );
};

export default ThemeTwelve;