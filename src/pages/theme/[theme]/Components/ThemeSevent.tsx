import React, { useState, useMemo } from 'react';
import { ShoppingBag, Heart, History, X, ChevronRight, Search, ListFilter, Palette } from 'lucide-react';
import { ActiveModalType, allCategories, dummyData, HistoryItem, OrderItem, packages, Service, SimpleServiceItem, ThemeConfig, themes } from '@/lib/Types/Theme/Sevent';
import ServiceCard from '@/Components/Theme/Sevent/ServiceCard';
import SideModal from '@/Components/Theme/Sevent/SideModal';


// --- Komponen Utama Aplikasi (Main App Component) ---
const ThemeSevent: React.FC = () => {
    // State Typed
    const [activeModal, setActiveModal] = useState<ActiveModalType>(null);
    const [detailProduct, setDetailProduct] = useState<Service | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('Semua Kategori');
    const [searchTerm, setSearchTerm] = useState<string>('');

    // State untuk tema warna
    const [currentThemeKey, setCurrentThemeKey] = useState<string>('indigo');
    const currentTheme: ThemeConfig = useMemo(() => themes[currentThemeKey] || themes.indigo, [currentThemeKey]);


    // Helper function untuk format harga (didefinisikan sekali di sini)
    const formatPrice = (price: number): string => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);


    // Simpan state untuk daftar di modal (dummy) - Menggunakan state internal, bukan Firestore
    const [favorites] = useState<SimpleServiceItem[]>([{ id: 1, name: 'Desain Logo Premium' }]);
    const [orders] = useState<OrderItem[]>([
        { id: 101, name: 'Website Portofolio Cepat', qty: 1, price: 1500000 },
        { id: 102, name: 'Desain Logo Premium', qty: 2, price: 500000 },
    ]);
    const [history] = useState<HistoryItem[]>([{ id: 201, name: 'Kartu Nama Eksklusif', date: '2024-10-01' }]);

    // Logika Filter dan Pencarian
    const filteredServices: Service[] = useMemo(() => {
        let services: Service[] = dummyData.filter(item => item.category !== 'Paket Komplit');

        if (selectedCategory !== 'Semua Kategori') {
            services = services.filter(item => item.category === selectedCategory);
        }

        if (searchTerm) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            services = services.filter(item =>
                item.name.toLowerCase().includes(lowerCaseSearch) ||
                item.desc.toLowerCase().includes(lowerCaseSearch)
            );
        }

        return services;
    }, [selectedCategory, searchTerm]);

    // Handler untuk membuka modal detail produk
    const openDetailModal = (product: Service) => {
        setDetailProduct(product);
    };

    // Handler untuk menutup semua modal
    const closeModal = () => {
        setActiveModal(null);
        setDetailProduct(null);
    };

    // Fungsi Alert Kustom (menggantikan window.alert)
    const alert = (message: string) => {
        const modalElement = document.getElementById('custom-alert-modal');
        const messageElement = document.getElementById('custom-alert-message');

        if (messageElement) {
            messageElement.textContent = message;
        }
        if (modalElement) {
            modalElement.classList.remove('hidden');
            setTimeout(() => {
                modalElement.classList.add('hidden');
            }, 3000); // Tampil 3 detik
        }
    };


    // --- Render Konten Modal Samping ---
    const renderModalContent = (type: ActiveModalType): React.ReactNode => {
        switch (type) {
            case 'favorite':
                return (
                    <div>
                        <p className="text-gray-500 mb-4">Daftar layanan yang Anda tandai sebagai favorit.</p>
                        {favorites.length > 0 ? (
                            <ul className="space-y-3">
                                {favorites.map(item => (
                                    <li key={item.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center shadow-sm">
                                        <span className="font-medium text-gray-700">{item.name}</span>
                                        <ChevronRight size={18} className="text-gray-400" />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-500 italic py-8">Belum ada layanan favorit.</p>
                        )}
                    </div>
                );
            case 'order':
                // Hitung total harga
                const total: number = orders.reduce((sum, item) => sum + (item.price * item.qty), 0);

                return (
                    <div className="flex flex-col h-full justify-between">
                        <div className="flex-grow overflow-y-auto pr-2">
                            <p className="text-gray-500 mb-4">Layanan yang saat ini ada di keranjang atau dalam proses pemesanan.</p>
                            {orders.length > 0 ? (
                                <ul className="space-y-3">
                                    {orders.map(item => (
                                        <li key={item.id} className="p-3 bg-blue-50 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm">
                                            <div className="flex-grow mb-2 sm:mb-0">
                                                <span className="font-medium text-gray-800 block">{item.name}</span>
                                                {/* Tampilkan Harga dan Kuantitas */}
                                                <span className="text-sm text-gray-600">
                                                    {item.qty} x {formatPrice(item.price)}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                {/* Tampilkan Subtotal */}
                                                <span className="font-bold text-lg text-blue-800">
                                                    {formatPrice(item.price * item.qty)}
                                                </span>
                                                {/* Tombol Hapus per item */}
                                                <button
                                                    className="text-sm text-red-500 hover:text-red-700 font-medium transition"
                                                    onClick={() => alert(`Simulasi: Menghapus ${item.name} dari keranjang`)}
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-500 italic py-8">Keranjang Anda kosong.</p>
                            )}
                        </div>

                        {/* Total dan Tombol Pesan/Checkout */}
                        <div className="border-t border-gray-200 pt-4 mt-4 sticky bottom-0 bg-white">
                            {orders.length > 0 && (
                                <>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-lg font-bold text-gray-900">Total Pembayaran:</span>
                                        <span className={`text-2xl font-extrabold ${currentTheme.mainText}`}>
                                            {formatPrice(total)}
                                        </span>
                                    </div>

                                    {/* Tombol Pesan/Checkout untuk seluruh keranjang */}
                                    <button
                                        onClick={() => alert('Simulasi: Melanjutkan ke halaman Checkout.')}
                                        className={`w-full py-3 ${currentTheme.mainBg} text-white font-semibold rounded-lg shadow-md ${currentTheme.mainHoverBg} transition duration-300 focus:outline-none focus:ring-4 ${currentTheme.ringClass} focus:ring-opacity-50`}
                                    >
                                        Lanjutkan Pemesanan ({orders.length} Item)
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                );
            case 'history':
                return (
                    <div>
                        <p className="text-gray-500 mb-4">Riwayat pemesanan layanan Anda sebelumnya.</p>
                        {history.length > 0 ? (
                            <ul className="space-y-3">
                                {history.map(item => (
                                    <li key={item.id} className="p-3 bg-green-50 rounded-lg flex justify-between items-center shadow-sm">
                                        <div>
                                            <span className="font-medium text-gray-700 block">{item.name}</span>
                                            <span className="text-xs text-gray-500">Tanggal: {item.date}</span>
                                        </div>
                                        <button className="text-sm text-green-600 hover:underline">Lihat Invoice</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-500 italic py-8">Tidak ada riwayat pemesanan.</p>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    // --- Render Konten Modal Detail Produk (Centered Modal) ---
    const renderDetailModal = (): React.ReactNode => {
        if (!detailProduct) return null;
        const product: Service = detailProduct;

        // Fungsi untuk Pemesanan (Simulasi)
        const handleOrder = () => {
            console.log(`Pemesanan layanan: ${product.name}`);
            alert('Pemesanan Berhasil Disimulasikan! Cek console untuk detail.');
            closeModal();
        };


        return (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                {/* Modal Konten */}
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg md:max-w-xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 no-scrollbar">
                    {/* Header & Tombol Tutup */}
                    <div className="sticky top-0 p-4 border-b border-gray-300 flex justify-between items-center bg-white z-10">
                        <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                        <button onClick={closeModal} className="p-2 rounded-full hover:bg-gray-100 transition">
                            <X size={24} className="text-gray-600" />
                        </button>
                    </div>

                    {/* Isi Detail Produk */}
                    <div className="p-6">
                        <div className="mb-6">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-auto rounded-lg object-cover mb-4 shadow-md"
                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = 'https://placehold.co/600x450/94a3b8/ffffff?text=Gagal+Muat';
                                }}
                            />
                            <p className={`text-3xl font-extrabold ${currentTheme.mainText} mb-4`}>
                                {formatPrice(product.price)}
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">{product.desc || 'Deskripsi detail produk belum tersedia. Hubungi kami untuk informasi lebih lanjut.'}</p>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2">Informasi Layanan</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li><span className="font-medium text-gray-700">Kategori:</span> {product.category}</li>
                                    <li><span className="font-medium text-gray-700">Estimasi Pengerjaan:</span> 3-7 Hari Kerja</li>
                                    <li><span className="font-medium text-gray-700">Revisi:</span> Maksimal 3x</li>
                                </ul>
                            </div>
                        </div>

                        {/* Tombol Pemesanan */}
                        <button
                            onClick={handleOrder}
                            className={`w-full py-3 ${currentTheme.mainBg} text-white font-semibold rounded-lg shadow-md ${currentTheme.mainHoverBg} transition duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-4 ${currentTheme.ringClass} focus:ring-opacity-50`}
                        >
                            Pesan Layanan Ini Sekarang
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Custom Alert/Message Box (Simulasi) */}
            <div id="custom-alert-modal" className="fixed top-5 left-1/2 -translate-x-1/2 p-4 bg-green-500 text-white rounded-lg shadow-xl z-[9999] hidden transition-opacity duration-300">
                <p id="custom-alert-message" className="font-semibold"></p>
            </div>

            {/* --- Header/Navbar --- */}
            <header className="sticky top-0 z-30 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    <h1 className={`text-2xl font-extrabold ${currentTheme.mainText}`}>
                        Catalog<span className="text-gray-900">Pro</span>
                    </h1>
                    <nav className="flex items-center space-x-3">
                        {/* Icon Favorite */}
                        <button
                            onClick={() => setActiveModal('favorite')}
                            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-red-500 transition relative"
                            aria-label="Favorite"
                        >
                            <Heart size={24} />
                            {favorites.length > 0 && (
                                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                            )}
                        </button>
                        {/* Icon Order (Keranjang) */}
                        <button
                            onClick={() => setActiveModal('order')}
                            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-blue-500 transition relative"
                            aria-label="Order"
                        >
                            <ShoppingBag size={24} />
                            {orders.length > 0 && (
                                <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full border-2 border-white"></span>
                            )}
                        </button>
                        {/* Icon History Order */}
                        <button
                            onClick={() => setActiveModal('history')}
                            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-green-500 transition"
                            aria-label="History Order"
                        >
                            <History size={24} />
                        </button>
                    </nav>
                </div>
            </header>

            {/* --- Main Content --- */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* 4. Hero Section / Banner */}
                <section className={`${currentTheme.mainBg} rounded-xl shadow-lg p-6 sm:p-10 mb-12 relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="relative">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
                            Katalog Layanan Digital Terbaik
                        </h2>
                        <p className={`${currentTheme.heroText} text-lg mb-6 max-w-2xl`}>
                            Temukan berbagai layanan desain, pengembangan web, dan marketing untuk mendukung bisnis Anda.
                        </p>
                        <button className={`bg-white ${currentTheme.mainText} font-bold py-3 px-6 rounded-full shadow-lg hover:bg-gray-50 transition duration-300`}>
                            Lihat Penawaran Spesial
                        </button>
                    </div>
                </section>

                {/* 7. Paketan Layanan (Displayed Separately) */}
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-900">Paket Komplit (Nilai Terbaik)</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {packages.map((pkg) => (
                            <ServiceCard key={pkg.id} service={pkg} onClick={openDetailModal} theme={currentTheme} />
                        ))}
                    </div>
                </section>

                {/* Filter, Pencarian, dan Pemilih Tema */}
                <section className="mb-8 p-4 bg-white rounded-xl shadow-md border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        {/* Pemilih Tema */}
                        <div className="flex items-center space-x-2">
                            <Palette size={20} className="text-gray-600" />
                            <span className="text-sm font-medium text-gray-700 hidden sm:inline">Tema:</span>
                            <div className="flex space-x-1">
                                {Object.keys(themes).map(key => (
                                    <button
                                        key={key}
                                        onClick={() => setCurrentThemeKey(key)}
                                        className={`w-6 h-6 rounded-full transition transform hover:scale-110 ${themes[key].mainBg} ${currentThemeKey === key ? 'ring-2 ring-offset-2 ring-gray-400' : 'opacity-70 hover:opacity-100'}`}
                                        title={themes[key].name}
                                        aria-label={`Pilih tema ${themes[key].name}`}
                                    ></button>
                                ))}
                            </div>
                        </div>

                        {/* Pencarian */}
                        <div className="relative flex-grow w-full md:w-auto">
                            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari Layanan (e.g., Logo, SEO)..."
                                value={searchTerm}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>

                        {/* 5. Kategori (Filter) */}
                        <div className="relative w-full md:w-56">
                            <ListFilter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <select
                                value={selectedCategory}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    setSelectedCategory(e.target.value);
                                    setSearchTerm(''); // Reset pencarian saat kategori diubah
                                }}
                                className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-10 pr-8 rounded-lg leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500 focus:border-indigo-500 transition cursor-pointer"
                            >
                                {allCategories.filter(cat => cat !== 'Paket Komplit').map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <ChevronRight size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </section>


                {/* 6. Card Layanan */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-900">{selectedCategory === 'Semua Kategori' ? 'Semua Layanan' : selectedCategory}</h2>
                    </div>

                    {filteredServices.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredServices.map((service) => (
                                <ServiceCard key={service.id} service={service} onClick={openDetailModal} theme={currentTheme} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl shadow-md">
                            <p className="text-xl text-gray-600 mb-2">Layanan tidak ditemukan.</p>
                            <p className="text-gray-500">Coba ubah kategori atau kata kunci pencarian Anda.</p>
                        </div>
                    )}
                </section>

            </main>

            {/* --- 3. Modal Samping Kanan (Header Icons) --- */}
            <SideModal
                isOpen={!!activeModal}
                onClose={closeModal}
                title={
                    activeModal === 'favorite' ? 'Layanan Favorit' :
                        activeModal === 'order' ? 'Keranjang & Pemesanan' :
                            activeModal === 'history' ? 'Riwayat Pesanan' : ''
                }
            >
                {renderModalContent(activeModal)}
            </SideModal>

            {/* --- 8. Modal Detail Produk (Centered Modal) --- */}
            {detailProduct && renderDetailModal()}
        </div>
    );
};

export default ThemeSevent;