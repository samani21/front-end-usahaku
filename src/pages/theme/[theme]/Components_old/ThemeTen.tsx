import React, { useState, useMemo, FC } from 'react';
import { ShoppingCart, Menu, Home, Layers, Package, Clock, X, Loader2, Minus, Plus, Ticket, Palette } from 'lucide-react';
import Header from '@/Components/Theme/Ten/Header';
import DetailModal from '@/Components/Theme/Ten/DetailModal';
import { CartItem, DUMMY_SERVICES, OrderMessage, Service } from '@/lib/Types/Theme/Ten';
import SideDrawer from '@/Components/Theme/Ten/SideDrawer';
import CartModal from '@/Components/Theme/Ten/CartModal';
import HeroSection from '@/Components/Theme/Ten/HeroSection';
import QueueSection from '@/Components/Theme/Ten/QueueSection';
import CategoryPills from '@/Components/Theme/Ten/CategoryPills';
import ServiceCard from '@/Components/Theme/Ten/ServiceCard';


const ThemeTen: FC = () => {
    // --- State Lokal UI & Data ---
    const [activeCategory, setActiveCategory] = useState<string>('Semua');
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
    const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [orderMessage, setOrderMessage] = useState<OrderMessage>({ show: false, text: '', success: true });
    const [cart, setCart] = useState<Record<string, CartItem>>({});

    // Data Katalog dimuat langsung
    const [catalogData] = useState<Service[]>(DUMMY_SERVICES);
    const [isLoadingData] = useState<boolean>(false);

    // State Antrian Lokal (Simulasi)
    const [totalQueue, setTotalQueue] = useState<number>(10);
    const [runningQueue, setRunningQueue] = useState<number>(5);
    const [lastClaimedQueue, setLastClaimedQueue] = useState<number>(0); // NO. ANTRIAN SAYA

    // State Tema Warna
    const [themeColor, setThemeColor] = useState<string>('indigo');

    // Helper untuk mendapatkan kelas warna dinamis
    const getThemeClass = (intensity: number, prefix: string = 'text'): string => `${prefix}-${themeColor}-${intensity}`;

    // Hitungan total item di keranjang
    const cartItemCount: number = useMemo(() =>
        Object.values(cart).reduce((sum, item) => sum + item.quantity, 0),
        [cart]
    );

    // Hitungan total harga di keranjang
    const cartTotalPrice: number = useMemo(() =>
        Object.values(cart).reduce((sum, item) => sum + item.service.price * item.quantity, 0),
        [cart]
    );

    // --- Fungsi Operasi UI ---

    const handleOpenDetailModal = (service: Service) => {
        setSelectedService(service);
        setIsDetailModalOpen(true);
    };

    const handleCloseDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedService(null);
    };

    // --- Fungsi Operasi Keranjang & Antrian LOKAL ---

    const handleUpdateCart = (service: Service, change: number) => {
        setCart(prevCart => {
            const existingItem = prevCart[service.id];
            const newQuantity = (existingItem ? existingItem.quantity : 0) + change;

            if (newQuantity <= 0) {
                const { [service.id]: removed, ...rest } = prevCart;
                return rest;
            }

            return {
                ...prevCart,
                [service.id]: {
                    service: service,
                    quantity: newQuantity,
                },
            };
        });
    };

    const handleAddToCart = (service: Service) => {
        handleUpdateCart(service, 1);
        setIsDetailModalOpen(false);
        setOrderMessage({ show: true, text: `${service.name} ditambahkan ke Keranjang.`, success: true });
        setTimeout(() => setOrderMessage({ show: false, text: '', success: true }), 2000);
    };

    const handlePlaceOrder = () => {
        const itemsCount = Object.keys(cart).length;
        if (itemsCount === 0) {
            setOrderMessage({ show: true, text: 'Keranjang Anda kosong!', success: false });
            setTimeout(() => setOrderMessage({ show: false, text: '', success: true }), 3000);
            return;
        }

        // Simulasi penambahan antrian (Update State Lokal)
        setTotalQueue(prevTotal => {
            const newQueue = prevTotal + 1;
            setLastClaimedQueue(newQueue);
            setOrderMessage({ show: true, text: `Pesanan berhasil! Nomor antrian Anda: ${newQueue}. Cek di bawah.`, success: true });
            return newQueue;
        });

        setCart({}); // Kosongkan keranjang
        setIsCartModalOpen(false);
        setTimeout(() => setOrderMessage({ show: false, text: '', success: true }), 5000);
    };

    const handleNextQueue = () => {
        // Simulasi memajukan antrian (Update State Lokal)
        if (runningQueue < totalQueue) {
            setRunningQueue(prevRunning => {
                const nextRunning = prevRunning + 1;
                setOrderMessage({ show: true, text: `Antrian berpindah ke nomor ${nextRunning}.`, success: true });
                return nextRunning;
            });
        } else {
            setOrderMessage({ show: true, text: 'Tidak ada lagi antrian yang menunggu.', success: false });
        }
        setTimeout(() => setOrderMessage({ show: false, text: '', success: true }), 3000);
    };

    // --- Data yang Difilter (Memoization) ---
    const categories: string[] = useMemo(() => {
        const cats = catalogData.map(s => s.category).filter((value, index, self) => self.indexOf(value) === index);
        return ['Semua', ...cats];
    }, [catalogData]);

    const filteredServices: Service[] = useMemo(() => {
        return catalogData.filter(service =>
            (activeCategory === 'Semua' || service.category === activeCategory) &&
            service.type === 'Layanan Satuan'
        );
    }, [catalogData, activeCategory]);

    const filteredPackages: Service[] = useMemo(() => {
        return catalogData.filter(service =>
            (activeCategory === 'Semua' || service.category === activeCategory) &&
            service.type === 'Paket Layanan'
        );
    }, [catalogData, activeCategory]);


    if (isLoadingData) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50 flex-col">
                <Loader2 className={`w-8 h-8 ${getThemeClass(500)} animate-spin mb-4`} />
                <p className="text-gray-600">Memuat data lokal...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header
                getThemeClass={getThemeClass}
                setIsCartModalOpen={setIsCartModalOpen}
                cartItemCount={cartItemCount}
                setIsDrawerOpen={setIsDrawerOpen} />

            <main className="pt-16 pb-12">
                <HeroSection getThemeClass={getThemeClass} />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                    <CategoryPills
                        categories={categories}
                        setActiveCategory={setActiveCategory}
                        activeCategory={activeCategory}
                        getThemeClass={getThemeClass}
                        themeColor={themeColor} />

                    <section id="satuan" className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <Layers className={`w-6 h-6 mr-2 ${getThemeClass(500)}`} />
                            Layanan Satuan ({activeCategory})
                        </h2>
                        {filteredServices.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredServices.map(service => (
                                    <ServiceCard
                                        key={service.id} service={service}
                                        themeColor={themeColor}
                                        getThemeClass={getThemeClass}
                                        handleOpenDetailModal={handleOpenDetailModal} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 text-gray-500">Tidak ada layanan satuan dalam kategori ini.</div>
                        )}
                    </section>

                    <section id="paket" className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <Package className="w-6 h-6 mr-2 text-orange-500" />
                            Paket Layanan ({activeCategory})
                        </h2>
                        {filteredPackages.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredPackages.map(service => (
                                    <ServiceCard
                                        key={service.id}
                                        service={service}
                                        themeColor={themeColor}
                                        getThemeClass={getThemeClass}
                                        handleOpenDetailModal={handleOpenDetailModal} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 text-gray-500">Tidak ada paket layanan dalam kategori ini.</div>
                        )}
                    </section>

                    <QueueSection
                        getThemeClass={getThemeClass}
                        lastClaimedQueue={lastClaimedQueue}
                        handleNextQueue={handleNextQueue}
                        runningQueue={runningQueue}
                        totalQueue={totalQueue} />
                </div>
            </main>

            {/* Modal Detail Produk */}
            <DetailModal
                service={selectedService}
                isOpen={isDetailModalOpen}
                onClose={handleCloseDetailModal}
                themeColor={themeColor}
                handleAddToCart={handleAddToCart}
                getThemeClass={getThemeClass}
            />

            {/* Modal Keranjang Baru */}
            <CartModal
                cart={cart}
                isOpen={isCartModalOpen}
                onClose={() => setIsCartModalOpen(false)}
                handlePlaceOrder={handlePlaceOrder}
                getThemeClass={getThemeClass}
                cartItemCount={cartItemCount}
                handleUpdateCart={handleUpdateCart}
                cartTotalPrice={cartTotalPrice}
            />

            {/* Side Drawer/Menu */}
            <SideDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                themeColor={themeColor}
                getThemeClass={getThemeClass}
                setThemeColor={setThemeColor}
            />

            {/* Pesan Notifikasi (Custom Alert) */}
            {orderMessage.show && (
                <div
                    className={`fixed bottom-4 right-4 z-50 p-4 rounded-xl shadow-xl transition-all duration-300 transform ${orderMessage.success ? 'bg-green-500' : 'bg-red-500'
                        } text-white`}
                >
                    <p className="font-medium flex items-center">
                        {orderMessage.text}
                        <button className="ml-4" onClick={() => setOrderMessage({ show: false, text: '', success: true })}>
                            <X className="w-4 h-4" />
                        </button>
                    </p>
                </div>
            )}
        </div>
    );
};

export default ThemeTen;