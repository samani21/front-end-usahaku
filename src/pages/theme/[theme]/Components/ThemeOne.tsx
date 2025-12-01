import Categorie from '@/Components/Theme/Categorie';
import Header from '@/Components/Theme/Header';
import HeroSection from '@/Components/Theme/Hero';
import Notification from '@/Components/Theme/Notification';
import ProductSection from '@/Components/Theme/ProductSection';
import ModalDetailProduct from '@/Components/Theme/ProductSection/ModaDetail';
import SideDrawerOne from '@/Components/Theme/SideDrawer/SideDrawerOne';
import { DUMMY_CATEGORIES, DUMMY_HERO, DUMMY_PRODUCTS } from '@/lib/Types/Theme/One';
import { Category, formatRupiah, Hero, NotificationState, Product, UIState } from '@/lib/Types/Theme/Theme';
import React, { useCallback, useEffect, useMemo, useState } from 'react'


const ThemeOne = () => {
    const [uiState, setUiState] = useState<UIState>({
        showFavoritesDrawer: false,
        showOrdersDrawer: false,
        showHistoryDrawer: false,
        selectedProduct: null,// FIXED KE DARK MODE
    });
    const toggleDrawer = useCallback((drawerName: keyof UIState, state: boolean) => {
        setUiState(prev => ({ ...prev, [drawerName]: state }));
    }, []);
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [dataHero, setDataHero] = useState<Hero | null>(null);
    const [categorie, setCategorie] = useState<Category[]>();
    const [product, setProduct] = useState<Product[]>([]);
    const [notification, setNotification] = useState<NotificationState>({
        message: '',
        visible: false,
        type: 'success',
    });
    useEffect(() => {
        setDataHero(DUMMY_HERO);
        setActiveCategory("Semua");
        setCategorie(DUMMY_CATEGORIES)
        setProduct(DUMMY_PRODUCTS)
    }, [])

    const secondaryBg = `bg-teal-700`;
    const mainTextColor = `text-gray-50`;
    const primaryText = `text-cyan-400`;
    const subtleTextColor = `text-gray-400`;

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

    const filteredProducts = useMemo(() => {
        if (activeCategory === "Semua") {
            return product;
        }
        return product?.filter(p => p.category === activeCategory);
    }, [activeCategory, product]);

    const openProductDetail = useCallback((product: Product) => {
        setUiState(prev => ({ ...prev, selectedProduct: product }));
    }, []);

    // Handler untuk menutup modal detail produk
    const closeProductDetail = useCallback(() => {
        setUiState(prev => ({ ...prev, selectedProduct: null }));
    }, []);

    const showNotification = useCallback((message: string, type: 'success' | 'error' = 'success') => {
        setNotification({ message, visible: true, type });
        setTimeout(() => {
            setNotification(prev => ({ ...prev, visible: false }));
        }, 4000); // Notifikasi hilang setelah 4 detik
    }, []);

    const handleFav = (id?: number) => {
        setProduct((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, isFavorite: !item.isFavorite }
                    : item
            )
        );
    };

    return (
        <div className={`min-h-screen bg-gray-900 text-gray-50 font-sans transition-colors duration-500`}>
            <Header
                theme={1}
                onIconClick={(drawerName) => toggleDrawer(drawerName, true)}
            />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {dataHero &&
                    <HeroSection
                        theme={1}
                        dataHero={dataHero} />
                }
                {
                    categorie &&
                    <Categorie
                        theme={1}
                        categorie={categorie}
                        setActiveCategory={setActiveCategory}
                        activeCategory={activeCategory}
                    />
                }
                <ProductSection
                    theme={1}
                    handleFav={handleFav}
                    filteredProducts={filteredProducts}
                    activeCategory={activeCategory}
                    onClick={openProductDetail} />
            </main>
            <SideDrawerOne
                isOpen={uiState.showFavoritesDrawer}
                onClose={() => toggleDrawer('showFavoritesDrawer', false)}
                title="Daftar Favorit Anda"
            >
                {renderDrawerContent('showFavoritesDrawer')}
            </SideDrawerOne>

            {/* Orders Drawer */}
            <SideDrawerOne
                isOpen={uiState.showOrdersDrawer}
                onClose={() => toggleDrawer('showOrdersDrawer', false)}
                title="Keranjang Belanja"
            >
                {renderDrawerContent('showOrdersDrawer')}
            </SideDrawerOne>

            {/* History Order Drawer */}
            <SideDrawerOne
                isOpen={uiState.showHistoryDrawer}
                onClose={() => toggleDrawer('showHistoryDrawer', false)}
                title="Riwayat Transaksi"
            >
                {renderDrawerContent('showHistoryDrawer')}
            </SideDrawerOne>
            {uiState.selectedProduct && (
                <ModalDetailProduct
                    theme={1}
                    product={uiState.selectedProduct}
                    onClose={closeProductDetail}
                    onOrderSuccess={showNotification}
                />
            )}

            {/* Notification Toast */}
            <Notification theme={1} notification={notification} />
        </div>
    )
}

export default ThemeOne