import React, { useState, useCallback, useMemo } from 'react';
import { Heart, ShoppingBag, Clock, ChevronRight, CheckCircle, Smartphone, Palette } from 'lucide-react';
import { ActiveModal, Color, COLOR_SCHEMES, DUMMY_CATEGORIES, DUMMY_PRODUCTS, getColorClasses, Product } from '@/lib/Types/Theme/Two';
import SidebarModal from '@/Components/Theme/Two/SidebarModal';
import FavoriteList from '@/Components/Theme/Two/FavoriteList';
import OrderCartList from '@/Components/Theme/Two/OrderCartList';
import HistoryList from '@/Components/Theme/Two/HistoryList';
import DetailModal from '@/Components/Theme/Two/DetailModal';


const App: React.FC = () => {
    const [activeModal, setActiveModal] = useState<ActiveModal>('none');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('Semua');
    const [colorKey, setColorKey] = useState<Color>('indigo');
    const [showColorPicker, setShowColorPicker] = useState(false);

    // Helper untuk mendapatkan kelas warna dinamis
    const colorClasses = useMemo(() => getColorClasses(colorKey), [colorKey]);

    const handleOpenModal = useCallback((modal: ActiveModal, product: Product | null = null) => {
        setActiveModal(modal);
        if (product) {
            setSelectedProduct(product);
        }
        setShowColorPicker(false); // Close picker when opening other modals
    }, []);

    const handleCloseModal = useCallback(() => {
        setActiveModal('none');
        setSelectedProduct(null);
    }, []);

    // Filtered products based on active category
    const filteredProducts = useMemo(() => {
        if (activeCategory === 'Semua') {
            return DUMMY_PRODUCTS;
        }
        return DUMMY_PRODUCTS.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    // --- Color Palette Selector Component ---
    const ColorPaletteSelector: React.FC = () => {
        const handleColorChange = (color: Color) => {
            setColorKey(color);
            setShowColorPicker(false);
        };

        return (
            <div className="relative">
                <button
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className={`p-2 rounded-full text-gray-600 hover:${colorClasses.iconColor} hover:bg-gray-100 transition duration-150`}
                    aria-label="Pilih Skema Warna"
                >
                    <Palette size={24} />
                </button>
                {showColorPicker && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100">
                        <p className="px-4 py-2 text-xs font-semibold text-gray-500 border-b border-gray-300">Pilih Tema Warna</p>
                        {Object.entries(COLOR_SCHEMES).map(([key, name]) => (
                            <button
                                key={key}
                                onClick={() => handleColorChange(key as Color)}
                                className={`w-full text-left px-4 py-2 text-sm flex items-center transition-colors duration-150 ${colorKey === key
                                    ? `font-bold ${colorClasses.textAccent} bg-gray-50`
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <span className={`w-3 h-3 rounded-full mr-3 bg-${key}-600 border border-gray-300`}></span>
                                {name}
                                {colorKey === key && <CheckCircle size={16} className={`ml-auto ${colorClasses.textAccent}`} />}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };


    // --- HEADER ---
    const Header: React.FC = () => (
        <header className="sticky top-0 z-40 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <h1 className={`text-2xl font-extrabold flex items-center ${colorClasses.titleText}`}>
                        <Smartphone className={`w-6 h-6 mr-2 ${colorClasses.iconColor} hidden sm:inline`} /> Katalog Minimalis
                    </h1>
                    <div className="ml-4">
                        <ColorPaletteSelector />
                    </div>
                </div>
                <div className="flex space-x-4">
                    <HeaderIcon
                        Icon={Heart}
                        label="Favorit"
                        onClick={() => handleOpenModal('favorite')}
                        colorClasses={colorClasses}
                    />
                    <HeaderIcon
                        Icon={ShoppingBag}
                        label="Pesanan"
                        onClick={() => handleOpenModal('order')}
                        colorClasses={colorClasses}
                    />
                    <HeaderIcon
                        Icon={Clock}
                        label="Riwayat"
                        onClick={() => handleOpenModal('history')}
                        colorClasses={colorClasses}
                    />
                </div>
            </div>
        </header>
    );

    const HeaderIcon: React.FC<{ Icon: React.ElementType; label: string; onClick: () => void; colorClasses: ReturnType<typeof getColorClasses> }> = ({
        Icon,
        label,
        onClick,
        colorClasses,
    }) => (
        <button
            onClick={onClick}
            className={`p-2 rounded-full text-gray-600 hover:${colorClasses.textAccent} ${colorClasses.hoverBgLight} transition duration-150 relative group`}
            aria-label={label}
        >
            <Icon size={24} />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
                {label}
            </span>
        </button>
    );

    // --- HERO/BANNER SECTION ---
    const HeroSection: React.FC = () => (
        <div className={`relative ${colorClasses.lightBg} rounded-xl m-4 md:m-8 overflow-hidden shadow-lg`}>
            <div className="p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between">
                <div className="max-w-lg mb-6 md:mb-0">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                        Diskon Spesial Akhir Pekan!
                    </h2>
                    <p className="mt-4 text-gray-600 text-lg">
                        Nikmati potongan harga 20% untuk semua kategori produk favorit Anda. Jangan sampai terlewat!
                    </p>
                    <button className={`mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white transition duration-150 ${colorClasses.primaryBg}`} onClick={() => {
                        const sec = document.getElementById("produk-pilihan");
                        sec?.scrollIntoView({ behavior: "smooth" });
                    }}>
                        Lihat Penawaran <ChevronRight size={20} className="ml-2" />
                    </button>
                </div>
                <div className="w-full md:w-1/3 flex justify-center">
                    <div className="text-6xl md:text-8xl p-4 bg-white rounded-full shadow-xl">
                        🎉
                    </div>
                </div>
            </div>
        </div>
    );

    // --- CATEGORIES SECTION ---
    const CategoriesSection: React.FC = () => (
        <div className="mt-8 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Telusuri Kategori</h2>
            <div className="flex space-x-3 overflow-x-auto pb-3 scrollbar-hide">
                {['Semua', ...DUMMY_CATEGORIES.map(c => c.name)].map((name, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveCategory(name)}
                        className={`flex-shrink-0 px-5 py-2.5 text-sm font-medium rounded-full transition-colors duration-200 shadow-sm ${activeCategory === name
                            ? `${colorClasses.primaryBg} text-white ${colorClasses.shadowAccent}`
                            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                            }`}
                    >
                        {DUMMY_CATEGORIES.find(c => c.name === name)?.icon} {name}
                    </button>
                ))}
            </div>
        </div>
    );

    // --- PRODUCT CARD ---
    const ProductCard: React.FC<{ product: Product, colorClasses: ReturnType<typeof getColorClasses> }> = ({ product, colorClasses }) => (
        <div
            onClick={() => handleOpenModal('detail', product)}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
        >
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover object-center"
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://placehold.co/400x300/e0e0e0/333333?text=${product.name}`;
                }}
            />
            <div className="p-4">
                <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${colorClasses.textAccent}`}>
                    {product.category}
                </p>
                <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">{product.name}</h3>
                <p className="text-xl font-bold text-gray-900">
                    Rp{product.price.toLocaleString('id-ID')}
                </p>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.description}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <style>{`
        /* Minimalist scrollbar hide for category section */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        /* Font family rule removed to rely on Next.js global settings */
      `}</style>

            {/* 1. Header */}
            <Header />

            <main className="max-w-7xl mx-auto pb-12">
                {/* 4. Hero Section */}
                <HeroSection />

                {/* 5. Kategori */}
                <CategoriesSection />

                {/* 6. Card Produk */}
                <div className="mt-10 px-4 sm:px-6 lg:px-8" id="produk-pilihan">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Produk Tersedia ({activeCategory === 'Semua' ? 'Semua' : activeCategory})
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} colorClasses={colorClasses} />
                        ))}
                        {filteredProducts.length === 0 && (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                Tidak ada produk di kategori ini.
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* 3. Sidebar Modals (Favorite, Order, History) */}
            <SidebarModal
                isOpen={activeModal === 'favorite'}
                onClose={handleCloseModal}
                title="Daftar Favorit"
            >
                <FavoriteList colorClasses={colorClasses} />
            </SidebarModal>

            <SidebarModal
                isOpen={activeModal === 'order'}
                onClose={handleCloseModal}
                title="Keranjang Pesanan"
            >
                <OrderCartList colorClasses={colorClasses} />
            </SidebarModal>

            <SidebarModal
                isOpen={activeModal === 'history'}
                onClose={handleCloseModal}
                title="Riwayat Pemesanan"
            >
                <HistoryList />
            </SidebarModal>

            {/* 7. Product Detail Modal (Center) */}
            <DetailModal
                isOpen={activeModal === 'detail'}
                onClose={handleCloseModal}
                product={selectedProduct}
                colorClasses={colorClasses}
            />
        </div>
    );
};

export default App;