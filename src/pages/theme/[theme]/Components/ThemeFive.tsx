import React, { useState, useMemo } from 'react';
// Asumsi 'lucide-react' tersedia di lingkungan ini
// FIX: Mengubah 'Chair' menjadi 'Armchair' karena 'Chair' tidak terdaftar di Lucide.
import { Heart, ShoppingBag, History, X, Menu, Sofa, Armchair, Lamp, Bed, CheckCircle } from 'lucide-react';
import { CATEGORIES, DUMMY_PRODUCTS, formatRupiah } from '@/lib/Types/Theme/Five';
import SideDrawer from '@/Components/Theme/Five/SideDrawer';
import ProductDetailModal from '@/Components/Theme/Five/ProductDetailModal';
import ProductCard from '@/Components/Theme/Five/ProductCard';


// 4. Main ThemeFive Component
const ThemeFive = () => {
    const [activeDrawer, setActiveDrawer] = useState<string | null>(null); // 'favorite', 'order', 'history'
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Dummy Cart Data
    const DUMMY_CART = [
        { id: 1, name: "Sofa Minimalis Abu-abu (Linen Abu)", price: 6500000, quantity: 1 },
        { id: 4, name: "Kursi Makan Skandinavia (Dudukan Putih)", price: 450000, quantity: 2 },
        { id: 3, name: "Lampu Lantai Baca Minimalis (Hitam Doff)", price: 950000, quantity: 1 }
    ];

    // Hitung Total Cart
    const cartTotal = useMemo(() => {
        return DUMMY_CART.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, []);

    const handlePayment = () => {
        // Simulasi Proses Pembayaran
        console.log("Memproses Pembayaran untuk Total:", formatRupiah(cartTotal));

        // Di aplikasi nyata, ini akan berinteraksi dengan gateway pembayaran
        // Kemudian, Anda mungkin akan membersihkan keranjang dan menampilkan notifikasi sukses.

        // Untuk demo, kita akan menutup drawer dan mencatatnya ke konsol
        setActiveDrawer(null);
        console.log("Pembayaran Berhasil. Pesanan Anda akan diproses.");
    };

    // Filter produk berdasarkan kategori
    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'all') {
            return DUMMY_PRODUCTS;
        }
        return DUMMY_PRODUCTS.filter(p => p.category === selectedCategory);
    }, [selectedCategory]);

    const openProductDetail = (product: any) => {
        setSelectedProduct(product);
    };

    const closeProductDetail = () => {
        setSelectedProduct(null);
    };

    // --- Konten Drawer Dummy ---
    const renderDrawerContent = (type: string | null) => {
        switch (type) {
            case 'favorite':
                return (
                    <ul className="space-y-3">
                        <li className="p-3 bg-gray-50 rounded-lg">Sofa Minimalis Abu-abu</li>
                        <li className="p-3 bg-gray-50 rounded-lg">Lampu Lantai Baca Minimalis</li>
                        <li className="text-sm text-gray-500 pt-2">2 Item favorit.</li>
                    </ul>
                );
            case 'order':
                // Konten Keranjang (dengan harga, total, dan tombol bayar)
                return (
                    <div className="flex flex-col space-y-4 h-full">
                        {/* List Item */}
                        <ul className="space-y-4">
                            {DUMMY_CART.map(item => (
                                <li key={item.id} className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                                    <p className="font-semibold text-gray-800">{item.name}</p>
                                    <div className="flex justify-between items-center text-sm mt-1">
                                        <span className="text-gray-500">
                                            {item.quantity} x {formatRupiah(item.price)}
                                        </span>
                                        <span className="font-bold text-gray-900">
                                            {/* Subtotal */}
                                            {formatRupiah(item.price * item.quantity)}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Total and Button */}
                        <div className="mt-auto pt-4 border-t-2 border-gray-200 flex-shrink-0">
                            <div className="flex justify-between items-center text-xl font-bold mb-4">
                                <span className="text-gray-800">TOTAL:</span>
                                <span className="text-green-600">{formatRupiah(cartTotal)}</span>
                            </div>

                            {/* Tombol Bayar */}
                            <button
                                onClick={handlePayment}
                                className="w-full py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition duration-300 shadow-lg disabled:bg-gray-400"
                                disabled={DUMMY_CART.length === 0}
                            >
                                Bayar Sekarang
                            </button>
                            <p className="text-xs text-center text-gray-500 mt-2">
                                *Simulasi: Cek konsol untuk log transaksi.
                            </p>
                        </div>
                    </div>
                );
            case 'history':
                return (
                    <ul className="space-y-3 text-gray-600">
                        <li className="p-3 border-b">Ranjang Tidur Kayu Emas (Selesai 12/10/2025)</li>
                        <li className="p-3 border-b">Kursi Makan Skandinavia (Selesai 01/09/2025)</li>
                        <li className="text-sm text-gray-500 pt-2">Riwayat 2 bulan terakhir.</li>
                    </ul>
                );
            default:
                return <p className="text-gray-500">Tidak ada data untuk ditampilkan.</p>;
        }
    };

    const getDrawerTitle = (type: string | null) => {
        switch (type) {
            case 'favorite': return 'Daftar Favorit';
            case 'order': return 'Pesanan Saya (Keranjang)';
            case 'history': return 'Riwayat Pesanan';
            default: return '';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            {/* 2. Header */}
            <header className="sticky top-0 z-30 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                        Furniture.
                    </h1>
                    <nav className="flex space-x-4">
                        {/* Icon Favorite */}
                        <button
                            onClick={() => setActiveDrawer('favorite')}
                            className="p-2 text-gray-600 hover:text-red-500 rounded-full transition duration-150"
                            aria-label="Daftar Favorit"
                        >
                            <Heart size={24} />
                        </button>
                        {/* Icon Order (Keranjang) */}
                        <button
                            onClick={() => setActiveDrawer('order')}
                            className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150 relative"
                            aria-label="Pesanan Saya"
                        >
                            <ShoppingBag size={24} />
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{DUMMY_CART.length}</span>
                        </button>
                        {/* Icon History Order */}
                        <button
                            onClick={() => setActiveDrawer('history')}
                            className="p-2 text-gray-600 hover:text-gray-900 rounded-full transition duration-150"
                            aria-label="Riwayat Pesanan"
                        >
                            <History size={24} />
                        </button>
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* 4. Hero Section / Banner */}
                <section className="mb-12 bg-gray-200 rounded-2xl p-8 md:p-12 shadow-inner">
                    <div className="md:flex items-center">
                        <div className="md:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
                                Desain Ruangan Impian Anda.
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Koleksi furniture minimalis terbaik, fungsional, dan estetis untuk setiap sudut rumah.
                            </p>
                            <button className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300 shadow-md">
                                Lihat Semua Produk
                            </button>
                        </div>
                        <div className="md:w-1/2 mt-6 md:mt-0 md:pl-10 flex justify-end">
                            {/* placeholder if needed, otherwise use Tailwind abstract art */}
                            <div className=" text-gray-700 font-bold text-lg hidden sm:block">
                                <img src={'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNvZmF8ZW58MHx8MHx8fDA%3D'} className='w-48 h-48 md:w-64 md:h-64 bg-gray-400 rounded-[24px]' />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Kategori */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Jelajahi Kategori</h2>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        {CATEGORIES.map(category => {
                            const IconComponent = category.icon;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 w-24 h-24 text-center shadow-sm ${selectedCategory === category.id
                                        ? 'bg-gray-800 text-white ring-2 ring-gray-800'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    <IconComponent size={24} className="mb-1" />
                                    <span className="text-sm font-medium mt-1">{category.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* 6. Card Produk */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        {selectedCategory === 'all' ? 'Semua Produk Unggulan' : `${selectedCategory}`}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onSelectProduct={openProductDetail}
                            />
                        ))}
                    </div>
                    {filteredProducts.length === 0 && (
                        <p className="text-center text-lg text-gray-500 py-10">
                            Maaf, tidak ada produk di kategori ini.
                        </p>
                    )}
                </section>

            </main>

            {/* 3. Modal Samping (Drawer) */}
            <SideDrawer
                isOpen={!!activeDrawer}
                onClose={() => setActiveDrawer(null)}
                title={getDrawerTitle(activeDrawer)}
            >
                {renderDrawerContent(activeDrawer)}
            </SideDrawer>

            {/* 7. Modal Detail Produk */}
            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={closeProductDetail}
                />
            )}
        </div>
    );
};

export default ThemeFive;