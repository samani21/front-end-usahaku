import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Heart, ShoppingCart, History, X, Check, Package, Layers, Palette } from 'lucide-react';
import SideModal from '@/Components/Theme/Eight/SideModal';
import ProductDetailModal from '@/Components/Theme/Eight/ProductDetailModal';
import ServiceDetailModal from '@/Components/Theme/Eight/ServiceDetailModal';
import { ColorKey, colorThemes, product } from '@/lib/Types/Theme/Eight';
import ColorThemePicker from '@/Components/Theme/Eight/ColorThemePicker';
import getColorClass from '@/Components/Theme/Eight/getColorClass';
import ProductView from '@/Components/Theme/Eight/ProductView';
import ServiceView from '@/Components/Theme/Eight/ServiceView';


// --- Komponen Utama Aplikasi (App) ---
const App = () => {
    // State untuk tema warna utama
    const [primaryColor, setPrimaryColor] = useState('teal');

    // State untuk mengelola tampilan antara Produk dan Jasa
    const [viewMode, setViewMode] = useState('product'); // 'product' atau 'service'

    // State untuk Modal Samping
    const [sideModalOpen, setSideModalOpen] = useState<string | null>(null); // 'favorite', 'order', 'history', atau null

    // State untuk Modal Detail
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<product | null>(null);

    const openDetailModal = useCallback((item: product) => {
        setSelectedItem(item);
        setDetailModalOpen(true);
    }, []);

    const closeDetailModal = useCallback(() => {
        setDetailModalOpen(false);
        setSelectedItem(null);
    }, []);

    // Menggunakan fungsi utilitas untuk kelas dinamis
    const colorClass = getColorClass(primaryColor);
    const bgColorClass = colorClass.split(' ').find(c => c.startsWith('bg-')) || 'bg-teal-600';
    const textClass = colorClass.split(' ').find(c => c.startsWith('text-')) || 'text-teal-600';

    // Isi dummy untuk Modal Samping
    const getSideModalContent = (type: string | null) => {
        switch (type) {
            case 'favorite':
                return (
                    <ul className="space-y-4">
                        <li className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-medium shadow-sm">Kopi Arabika Premium</li>
                        <li className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-medium shadow-sm">Desain Logo Korporat</li>
                        <p className="text-sm mt-3 text-gray-500 italic">Total 2 item favorit Anda.</p>
                    </ul>
                );
            case 'order':
                return (
                    <ul className="space-y-4">
                        <li className="p-4 border border-gray-200 rounded-lg flex justify-between items-center bg-white shadow-sm">
                            <span className="text-slate-800 font-medium">Headphone Z20 (x1)</span><span className={`font-extrabold ${textClass}`}>Rp 780K</span>
                        </li>
                        <li className="p-4 border border-gray-200 rounded-lg flex justify-between items-center bg-white shadow-sm">
                            <span className="text-slate-800 font-medium">Platform E-commerce (x1)</span><span className={`font-extrabold ${textClass}`}>Rp 3.500K</span>
                        </li>
                        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between font-bold text-xl text-slate-800">
                            <span>Total:</span>
                            <span className={`${textClass}`}>Rp 4.280.000</span>
                        </div>
                    </ul>
                );
            case 'history':
                return (
                    <ul className="space-y-4">
                        <li className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center">
                            <span>#ORD-2024-10-15</span><span className="text-sm text-green-600 font-medium">Selesai</span>
                        </li>
                        <li className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center">
                            <span>#ORD-2024-09-21</span><span className="text-sm text-green-600 font-medium">Selesai</span>
                        </li>
                        <li className="p-4 bg-yellow-50 rounded-lg border border-yellow-300 flex justify-between items-center">
                            <span>#ORD-2024-11-01</span><span className="text-sm text-yellow-800 font-medium">Diproses</span>
                        </li>
                    </ul>
                );
            default:
                return <p className="text-gray-500">Belum ada data untuk ditampilkan.</p>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans relative">
            {/* Notifikasi Sukses/Error (Pengganti Alert) */}
            <div
                id="notification"
                className="hidden fixed top-4 left-1/2 transform bg-red-500 -translate-x-1/2 p-4 text-white font-semibold rounded-lg shadow-xl z-50 transition-all duration-300 flex items-center"
                role="alert"
            >
                Notifikasi
            </div>

            {/* Header Utama */}
            <header className="sticky top-0 bg-white border-b border-gray-200 shadow-lg z-30">
                <div className="container mx-auto p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <h1 className={`md:text-3xl font-black ${textClass} tracking-wider`}>
                            {viewMode === 'product' ? 'CATALOG PRO' : 'SOLUSI KREATIF'}
                        </h1>
                        {/* Tombol Alih Tampilan (Desktop) */}
                        <div className="hidden sm:flex p-1 bg-gray-100 rounded-full border border-gray-200">
                            <button
                                onClick={() => setViewMode('product')}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${viewMode === 'product' ? `${bgColorClass} text-white shadow-md` : 'text-slate-600 hover:bg-white'
                                    }`}
                            >
                                Produk Jualan
                            </button>
                            <button
                                onClick={() => setViewMode('service')}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${viewMode === 'service' ? `${bgColorClass} text-white shadow-md` : 'text-slate-600 hover:bg-white'
                                    }`}
                            >
                                Layanan Jasa Desain
                            </button>
                        </div>
                    </div>


                    {/* Ikon Aksi (Menggunakan Lucide React) */}
                    <div className="flex space-x-3 items-center">
                        {/* Komponen Pilihan Warna */}
                        <ColorThemePicker themes={colorThemes} activeColor={primaryColor} onSelect={setPrimaryColor} />

                        <button
                            onClick={() => setSideModalOpen('favorite')}
                            className="p-3 rounded-full text-red-500 hover:bg-red-50 transition border border-gray-100"
                            aria-label="Favorite"
                        >
                            <Heart className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => setSideModalOpen('order')}
                            className={`p-3 rounded-full ${textClass} hover:bg-${primaryColor}-50 transition border border-gray-100`}
                            aria-label="Order/Keranjang"
                        >
                            <ShoppingCart className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => setSideModalOpen('history')}
                            className="p-3 rounded-full text-slate-600 hover:bg-gray-100 transition border border-gray-100"
                            aria-label="History Order"
                        >
                            <History className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content berdasarkan View Mode */}
            {viewMode === 'product' ? (
                <ProductView openDetailModal={openDetailModal} primaryColor={primaryColor as ColorKey} />
            ) : (
                <ServiceView openDetailModal={openDetailModal} primaryColor={primaryColor as ColorKey} />
            )}

            {/* Tombol Alih di Mobile (Footer - Fixed) */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-20 p-3">
                <div className="flex justify-around p-1 bg-gray-100 rounded-xl border border-gray-200">
                    <button
                        onClick={() => setViewMode('product')}
                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${viewMode === 'product' ? `${bgColorClass} text-white shadow-md` : 'text-slate-600'
                            }`}
                    >
                        Produk
                    </button>
                    <button
                        onClick={() => setViewMode('service')}
                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${viewMode === 'service' ? `${bgColorClass} text-white shadow-md` : 'text-slate-600'
                            }`}
                    >
                        Layanan Jasa Desain
                    </button>
                </div>
            </div>

            {/* Modal Samping */}
            <SideModal
                title={
                    sideModalOpen === 'favorite' ? 'Daftar Favorit Anda' :
                        sideModalOpen === 'order' ? 'Keranjang Belanja Saat Ini' :
                            sideModalOpen === 'history' ? 'Riwayat Transaksi' : ''
                }
                isOpen={sideModalOpen !== null}
                onClose={() => setSideModalOpen(null)}
                primaryColor={primaryColor}
            >
                {getSideModalContent(sideModalOpen)}
            </SideModal>

            {/* Modal Detail Produk/Jasa */}
            {selectedItem && (
                viewMode === 'product' ? (
                    <ProductDetailModal
                        product={selectedItem}
                        isOpen={detailModalOpen}
                        onClose={closeDetailModal}
                        primaryColor={primaryColor}
                    />
                ) : (
                    <ServiceDetailModal
                        service={selectedItem}
                        isOpen={detailModalOpen}
                        onClose={closeDetailModal}
                        primaryColor={primaryColor}
                    />
                )
            )}
        </div>
    );
};

export default App;