import React, { useMemo, useState } from 'react'
import ServiceDetailModal from './ServiceDetailModal';
import CenterModal from './CenterModal';
import RightDrawer from './RightDrawer';
import { ChevronRight, Home, Package, Palette, Scissors, Search, ShoppingCart, User, WashingMachine, Zap } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { useTheme } from './useTheme';
import { CATEGORIES, DUMMY_SERVICES, Service, THEME_COLORS } from '@/lib/Types/Theme/Nine';

const CatalogAppCore: React.FC = () => {
    const { theme, setTheme } = useTheme();

    // State untuk Modal Header
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isThemePickerOpen, setIsThemePickerOpen] = useState(false); // State baru

    // State untuk Detail Layanan
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    // State untuk Kategori
    const [activeCategory, setActiveCategory] = useState<string>('Semua');

    // State untuk Nomor Antrian (Nomor pelanggan statis)
    const [clientQueueNumber] = useState<number>(Math.floor(Math.random() * 50) + 1);

    // State BARU untuk Nomor Antrian yang Sedang Berjalan
    const [currentQueueNumber, setCurrentQueueNumber] = useState<number>(1);

    // Fungsi untuk memajukan antrian (Simulasi oleh Admin/Petugas)
    const handleNextQueue = () => {
        setCurrentQueueNumber(prev => prev + 1);
    };

    // Fungsi Filter Layanan
    const filteredServices = useMemo(() => {
        if (activeCategory === 'Semua') {
            return DUMMY_SERVICES;
        }
        return DUMMY_SERVICES.filter(s => s.category === activeCategory);
    }, [activeCategory]);

    const individualServices = filteredServices.filter(s => s.type === 'Layanan');
    const packageServices = filteredServices.filter(s => s.type === 'Paket');

    // Handler untuk membuka modal detail
    const handleViewDetails = (service: Service) => {
        setSelectedService(service);
    };

    // Logika untuk menampilkan status antrian
    const queueStatus = useMemo(() => {
        if (clientQueueNumber === currentQueueNumber) {
            return { text: "Giliran Anda Sekarang!", color: "bg-red-500 text-white" };
        }
        if (clientQueueNumber < currentQueueNumber) {
            return { text: "Anda Sudah Terlewat", color: "bg-yellow-500 text-gray-800" };
        }
        const diff = clientQueueNumber - currentQueueNumber;
        return { text: `${diff} antrian lagi sebelum Anda.`, color: "bg-white text-gray-700" };
    }, [clientQueueNumber, currentQueueNumber]);

    // Komponen Pemilih Warna (Theme Picker)
    const ThemePicker: React.FC = () => (
        <RightDrawer isOpen={isThemePickerOpen} onClose={() => setIsThemePickerOpen(false)} title="Pilih Tema Warna">
            <p className="text-gray-600 mb-4">Ubah warna utama aplikasi sesuai selera Anda.</p>
            <div className="grid grid-cols-2 gap-4">
                {THEME_COLORS.map((color) => (
                    <button
                        key={color.name}
                        onClick={() => {
                            setTheme(color);
                            setIsThemePickerOpen(false);
                        }}
                        className={`p-4 rounded-xl shadow-md flex items-center justify-center font-bold text-white transition transform hover:scale-[1.05] border-4
              bg-${color.bg} ${theme.name === color.name ? `border-gray-800` : 'border-transparent'}
            `}
                    >
                        {color.name}
                    </button>
                ))}
            </div>
        </RightDrawer>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* HEADER */}
            <header className="sticky top-0 z-30 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                    <h1 className={`text-2xl font-extrabold text-${theme.text} flex items-center`}>
                        <Zap className="mr-2 h-6 w-6" />
                        ServiceKu
                    </h1>
                    <div className="flex space-x-4">
                        {/* Tombol Tema Warna BARU */}
                        <button onClick={() => setIsThemePickerOpen(true)} className={`p-2 text-gray-600 hover:text-${theme.text} rounded-full transition`}>
                            <Palette size={24} />
                        </button>

                        <button onClick={() => setIsSearchOpen(true)} className={`p-2 text-gray-600 hover:text-${theme.text} rounded-full transition`}>
                            <Search size={24} />
                        </button>
                        <button onClick={() => setIsCartOpen(true)} className={`relative p-2 text-gray-600 hover:text-${theme.text} rounded-full transition`}>
                            <ShoppingCart size={24} />
                            {/* Badge keranjang */}
                            <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>
                        </button>
                        <button onClick={() => setIsProfileOpen(true)} className={`p-2 text-gray-600 hover:text-${theme.text} rounded-full transition`}>
                            <User size={24} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 4. HERO SECTION / BANNER */}
                <section className="mb-12">
                    <div className={`bg-${theme.bg} p-8 md:p-12 rounded-2xl text-white shadow-xl`}>
                        <div className="md:flex md:justify-between md:items-start space-y-6 md:space-y-0">
                            <div className="md:w-1/2">
                                <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">
                                    Temukan Layanan Terbaik Anda
                                </h2>
                                <p className="text-white/80 text-lg">
                                    Potong rambut, laundry, atau lainnya. Semua dalam satu klik!
                                </p>
                                {/* Menampilkan Status Antrian */}
                                <div className={`mt-4 inline-block p-2 rounded-lg font-semibold shadow-md ${queueStatus.color}`}>
                                    {queueStatus.text}
                                </div>
                            </div>

                            {/* Tampilan Nomor Antrian */}
                            <div className="md:w-1/2 flex flex-col sm:flex-row items-center justify-center md:justify-end space-y-4 sm:space-y-0 sm:space-x-4">

                                {/* Antrian Pelanggan */}
                                <div className={`bg-white text-${theme.text} p-4 rounded-xl shadow-lg flex-1 min-w-[150px]`}>
                                    <p className="text-sm font-medium text-gray-500">Nomor Anda</p>
                                    <p className="text-4xl font-bold">{clientQueueNumber}</p>
                                </div>

                                {/* Antrian Berjalan */}
                                <div className={`bg-white text-${theme.text} p-4 rounded-xl shadow-lg flex-1 min-w-[150px]`}>
                                    <p className="text-sm font-medium text-gray-500">Sedang Berjalan</p>
                                    <p className="text-4xl font-bold text-red-600">{currentQueueNumber}</p>
                                </div>
                            </div>
                        </div>

                        {/* Tombol Simulasi Maju Antrian (Opsional, untuk demo) */}
                        <div className="mt-6 pt-4 border-t border-white/40">
                            <p className="text-sm font-medium mb-2">Simulasi Petugas Antrian:</p>
                            <button
                                onClick={handleNextQueue}
                                className={`flex items-center px-4 py-2 bg-white text-${theme.text} font-semibold rounded-lg shadow-md hover:bg-gray-100 transition`}
                            >
                                Panggil Antrian Berikutnya ({currentQueueNumber + 1})
                            </button>
                        </div>
                    </div>
                </section>

                {/* 5. KATEGORI */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Pilih Kategori</h2>
                    <div className="flex flex-wrap gap-3">
                        {CATEGORIES.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`flex items-center px-4 py-2 rounded-full font-semibold transition duration-200 shadow-md
                  ${activeCategory === category
                                        ? `bg-${theme.primary} text-white`
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }
                `}
                            >
                                {/* Perbaikan: Menggunakan Scissors untuk Barbershop */}
                                {category === 'Barbershop' && <Scissors size={18} className="mr-2" />}
                                {/* Perbaikan: Menggunakan WashingMachine untuk Laundry */}
                                {category === 'Laundry' && <WashingMachine size={18} className="mr-2" />}
                                {category === 'Aksesoris' && <Zap size={18} className="mr-2" />}
                                {category === 'Semua' && <Home size={18} className="mr-2" />}
                                {category}
                            </button>
                        ))}
                    </div>
                </section>

                {/* 6. CARD LAYANAN (Perorangan) */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Layanan Perorangan</h2>
                    {individualServices.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {individualServices.map(service => (
                                <ServiceCard key={service.id} service={service} onViewDetails={handleViewDetails} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Tidak ada layanan perorangan di kategori ini.</p>
                    )}
                </section>

                {/* 7. PAKET LAYANAN */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <Package className="mr-2 h-6 w-6 text-rose-500" />
                        Paketan Layanan Spesial
                    </h2>
                    {packageServices.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {packageServices.map(service => (
                                <ServiceCard key={service.id} service={service} onViewDetails={handleViewDetails} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Tidak ada paket layanan di kategori ini.</p>
                    )}
                </section>

                {/* Footer Kontak */}
                <footer className="mt-12 pt-8 border-t border-gray-200 text-center">
                    <p className="text-gray-500 text-sm">© 2024 ServiceKu. Layanan Cepat, Harga Hemat.</p>
                </footer>

            </main>

            {/* --- MODAL DAN DRAWER --- */}

            {/* Cart Drawer */}
            <RightDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} title="Keranjang Belanja">
                <div className="space-y-4">
                    <p className="text-gray-500">Keranjang Anda masih kosong. Mari berbelanja!</p>
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-xl">Total: Rp0</h3>
                        <button className={`mt-3 w-full py-2 bg-${theme.primary} text-white rounded-lg hover:bg-${theme.primaryHover} transition`}>
                            Lanjutkan ke Pembayaran <ChevronRight size={18} className="inline-block ml-1" />
                        </button>
                    </div>
                </div>
            </RightDrawer>

            {/* Profile Drawer */}
            <RightDrawer isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} title="Profil Pengguna">
                <div className="text-center p-4">
                    <User size={50} className={`text-${theme.text} mx-auto mb-4`} />
                    <p className="text-lg font-bold">Halo, Pelanggan Setia!</p>
                    <p className="text-gray-500 text-sm">Anda telah login sebagai Guest. </p>
                    <div className="mt-6 space-y-3">
                        <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                            Riwayat Pesanan
                        </button>
                        <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                            Pengaturan Akun
                        </button>
                        <button className="w-full py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition">
                            Logout
                        </button>
                    </div>
                </div>
            </RightDrawer>

            {/* Search Modal (Center Modal) */}
            <CenterModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} title="Cari Layanan">
                <input
                    type="text"
                    placeholder="Ketik nama layanan atau paket..."
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${theme.primary} focus:border-${theme.primary} transition`}
                />
                <p className="mt-3 text-sm text-gray-500">Ketik dan tekan Enter untuk mencari.</p>
            </CenterModal>

            {/* Pemilih Tema Warna */}
            <ThemePicker />

            {/* 8. Modal Detail Produk */}
            <ServiceDetailModal service={selectedService} onClose={() => setSelectedService(null)} />

        </div>
    );
};


export default CatalogAppCore