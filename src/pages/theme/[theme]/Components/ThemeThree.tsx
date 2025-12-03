import Loading from '@/Components/component/Loading';
import Categorie from '@/Components/Theme/Categorie';
import Header from '@/Components/Theme/Header';
import HeroSection from '@/Components/Theme/Hero';
import Notification from '@/Components/Theme/Notification';
import ProductSection from '@/Components/Theme/ProductSection';
import ModalDetailProduct from '@/Components/Theme/ProductSection/ModaDetail';
import SideDrawerThree from '@/Components/Theme/SideDrawer/SideDrawerThree';
import ThemeSection from '@/Components/Theme/ThemeSection';
import { Category, formatRupiah, Hero, NotificationState, Product, Theme, UIState } from '@/lib/Types/Theme/Theme';
import { DUMMY_CATEGORIES, DUMMY_HERO, DUMMY_ORDERS, DUMMY_PRODUCTS } from '@/lib/Types/Theme/Three';
import { DUMMY_HISTORY } from '@/lib/Types/Theme/Two';
import { Get } from '@/utils/Get';
import { Clock, Heart, ShoppingBag } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

type Props = {}

const ThemeThree = (props: Props) => {
    const [themeName, setThemeName] = useState('Jingga');
    const [listTheme, setListTheme] = useState<Theme[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const [uiState, setUiState] = useState<UIState>({
        showFavoritesDrawer: false,
        showOrdersDrawer: false,
        showHistoryDrawer: false,
        selectedProduct: null,// FIXED KE DARK MODE
    });
    const [dataHero, setDataHero] = useState<Hero | null>(null);

    const [activeCategory, setActiveCategory] = useState<string>('');
    const [categorie, setCategorie] = useState<Category[]>();

    const toggleDrawer = useCallback((drawerName: keyof UIState, state: boolean) => {
        setUiState(prev => ({ ...prev, [drawerName]: state }));
    }, []);
    const [product, setProduct] = useState<Product[]>([]);
    console.log('product', product)
    const [notification, setNotification] = useState<NotificationState>({
        message: '',
        visible: false,
        type: 'success',
    });
    useEffect(() => {
        setCategorie(DUMMY_CATEGORIES);
        setActiveCategory(DUMMY_CATEGORIES[0]?.name)
        setDataHero(DUMMY_HERO);
        setProduct(DUMMY_PRODUCTS)
        getColorTheme()
    }, []);

    const openProductDetail = useCallback((product: Product) => {
        setUiState(prev => ({ ...prev, selectedProduct: product, showFavoritesDrawer: false }));
    }, []);


    const getColorTheme = async () => {
        try {
            setLoading(true)
            const res = await Get<{ success: boolean; data: Theme[] }>(
                `/color-theme`
            );

            if (res?.success) {
                setListTheme(res?.data)
                setThemeName(res?.data[0]?.name)
            }
        } catch (err: any) {
            setLoading(false)
        }
        setLoading(false)
    }

    const ColorPrimary = useMemo(() => {
        const color = listTheme?.find((t) => t?.name === themeName)?.primary
        return color || listTheme[0]?.primary
    }, [listTheme, themeName]);

    const filteredProducts = useMemo(() => {
        if (activeCategory === "Semua") {
            return product;
        }
        return product?.filter(p => p.category === activeCategory);
    }, [activeCategory, product]);

    const closeProductDetail = useCallback(() => {
        setUiState(prev => ({ ...prev, selectedProduct: null }));
    }, []);

    const showNotification = useCallback((message: string, type: 'success' | 'error' = 'success') => {
        setNotification({ message, visible: true, type });
        setTimeout(() => {
            setNotification(prev => ({ ...prev, visible: false }));
        }, 4000); // Notifikasi hilang setelah 4 detik
    }, []);
    if (loading) {
        return (
            <Loading />
        )
    }

    const renderDrawerContent = (type: keyof UIState) => {
        switch (type) {
            case 'showFavoritesDrawer':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center text-gray-500">
                            <Heart size={20} className="mr-2" />
                            <p className="font-medium">2 Produk yang Anda Suka</p>
                        </div>
                        <ul className="divide-y divide-gray-200 bg-white p-2 rounded-lg shadow-inner border border-gray-100">
                            {product?.filter((p) => p?.isFavorite).map(item => (
                                <li key={item.id} className="py-3 flex justify-between items-center text-gray-700 hover:bg-gray-50 px-2 rounded transition cursor-pointer" onClick={() => {
                                    openProductDetail(item)

                                }}>
                                    <span className="font-medium truncate">{item.name}</span>
                                    <span className={`text-sm font-semibold text-${ColorPrimary}-600`}>Rp{item.basePrice.toLocaleString('id-ID')}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-center text-gray-500 mt-6">
                            Pilih ikon hati pada produk untuk menambahkannya ke daftar favorit.
                        </p>
                    </div>
                );
            case 'showOrdersDrawer':
                const subtotal = DUMMY_ORDERS.reduce((sum, item) => sum + item.price, 0);

                return (
                    <div className="space-y-4">
                        <div className="flex items-center text-gray-500">
                            <ShoppingBag size={20} className="mr-2" />
                            <p className="font-medium">Total {DUMMY_ORDERS.length} Item di Keranjang</p>
                        </div>
                        <ul className="divide-y divide-gray-200 bg-white p-2 rounded-lg shadow-inner border border-gray-100">
                            {DUMMY_ORDERS.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
                                    <span>{item.productName}</span>
                                    <span className="font-semibold text-gray-800">{formatRupiah(item.price)}</span>
                                </div>
                            ))}
                        </ul>
                        <div className="border-t border-gray-300 pt-4 flex justify-between font-bold text-lg text-gray-800">
                            <span>Subtotal:</span>
                            <span>Rp{subtotal.toLocaleString('id-ID')}</span>
                        </div>
                        <button className={`w-full mt-4 py-3 text-white font-bold rounded-xl transition duration-200 bg-${ColorPrimary}-600 hover:bg-${ColorPrimary}-700`}>
                            Lanjut ke Pembayaran
                        </button>

                    </div>

                );
            case 'showHistoryDrawer':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center text-gray-500">
                            <Clock size={20} className="mr-2" />
                            <p className="font-medium">2 Riwayat Transaksi Terakhir</p>
                        </div>
                        <ul className="divide-y divide-gray-200 bg-white p-2 rounded-lg shadow-inner border border-gray-100">
                            {DUMMY_HISTORY.map(history => (
                                <li key={history.id} className="py-3 flex justify-between items-center text-gray-700 px-2">
                                    <div>
                                        <p className="font-medium text-gray-800">Order #{history.id} - {history.items} Item</p>
                                        <p className="text-xs text-gray-500">{history.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${history.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {history.status}
                                        </span>
                                        <p className="text-sm font-bold mt-1">Rp{history.total.toLocaleString('id-ID')}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-center text-gray-500 mt-6">
                            Semua riwayat pemesanan Anda tersimpan di sini.
                        </p>
                    </div>
                );
            default:
                return <p>Konten tidak ditemukan.</p>;
        }
    };

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
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header
                theme={3}
                color={ColorPrimary} onIconClick={(drawerName) => toggleDrawer(drawerName, true)} />
            <main className="container mx-auto p-4 pt-0">
                <ThemeSection themeName={themeName} setThemeName={setThemeName} themeList={listTheme} />
                <HeroSection dataHero={dataHero} color={ColorPrimary} theme={3} />
                {categorie &&
                    <Categorie
                        theme={3}
                        categorie={categorie}
                        setActiveCategory={setActiveCategory}
                        activeCategory={activeCategory}
                        color={ColorPrimary}
                    />}
                <ProductSection
                    theme={3}
                    filteredProducts={filteredProducts}
                    activeCategory={activeCategory}
                    onClick={openProductDetail}
                    color={ColorPrimary}
                    handleFav={handleFav} />
            </main>
            <SideDrawerThree
                isOpen={uiState.showFavoritesDrawer}
                onClose={() => toggleDrawer('showFavoritesDrawer', false)}
                title="Daftar Favorit Anda"
            >
                {renderDrawerContent('showFavoritesDrawer')}
            </SideDrawerThree>

            {/* Orders Drawer */}
            <SideDrawerThree
                isOpen={uiState.showOrdersDrawer}
                onClose={() => toggleDrawer('showOrdersDrawer', false)}
                title="Keranjang Belanja"
            >
                {renderDrawerContent('showOrdersDrawer')}
            </SideDrawerThree>

            {/* History Order Drawer */}
            <SideDrawerThree
                isOpen={uiState.showHistoryDrawer}
                onClose={() => toggleDrawer('showHistoryDrawer', false)}
                title="Riwayat Transaksi"
            >
                {renderDrawerContent('showHistoryDrawer')}
            </SideDrawerThree>

            {uiState.selectedProduct && (
                <ModalDetailProduct
                    theme={3}
                    product={uiState.selectedProduct}
                    onClose={closeProductDetail}
                    onOrderSuccess={showNotification}
                    color={ColorPrimary}
                />
            )}
            <Notification theme={3} notification={notification} />
        </div>
    )
}

export default ThemeThree