import React, { useState, useCallback, useMemo } from 'react';
import { Heart, ShoppingBag, Clock, X, Info, ChevronRight, CheckCircle, Smartphone, Palette } from 'lucide-react';

// --- TIPE DATA DUMMY ---

interface Variant {
    id: number;
    name: string;
    priceAdjustment: number;
}

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    variants: Variant[];
}

interface Category {
    id: number;
    name: string;
    icon: string;
}

// --- DATA DUMMY PRODUK & KATEGORI ---

const DUMMY_CATEGORIES: Category[] = [
    { id: 1, name: 'Kopi', icon: '☕' },
    { id: 2, name: 'Teh', icon: '🍵' },
    { id: 3, name: 'Camilan', icon: '🍪' },
    { id: 4, name: 'Jus Segar', icon: '🥤' },
];

const DUMMY_PRODUCTS: Product[] = [
    {
        id: 101,
        name: 'Espresso Blend Klasik',
        price: 35000,
        image: 'https://placehold.co/400x300/e0e0e0/333333?text=Kopi+A',
        description: 'Campuran biji kopi Arabika dan Robusta dengan rasa yang seimbang dan aroma cokelat pekat.',
        category: 'Kopi',
        variants: [
            { id: 1, name: 'Reguler', priceAdjustment: 0 },
            { id: 2, name: 'Besar (+5K)', priceAdjustment: 5000 },
        ],
    },
    {
        id: 102,
        name: 'Teh Hijau Matcha Latte',
        price: 40000,
        image: 'https://placehold.co/400x300/d1e7dd/1e3b0e?text=Teh+B',
        description: 'Matcha otentik dengan susu segar, memberikan energi dan ketenangan.',
        category: 'Teh',
        variants: [
            { id: 1, name: 'Dingin', priceAdjustment: 0 },
            { id: 2, name: 'Panas', priceAdjustment: 0 },
        ],
    },
    {
        id: 103,
        name: 'Kue Cokelat Lava',
        price: 25000,
        image: 'https://placehold.co/400x300/f8d7da/721c24?text=Kue+C',
        description: 'Kue cokelat lembut dengan lelehan cokelat di dalamnya.',
        category: 'Camilan',
        variants: [
            { id: 1, name: 'Satu Porsi', priceAdjustment: 0 },
            { id: 2, name: 'Paket Berdua (+15K)', priceAdjustment: 15000 },
        ],
    },
    {
        id: 104,
        name: 'Jus Mangga Tropis',
        price: 28000,
        image: 'https://placehold.co/400x300/fff3cd/856404?text=Jus+D',
        description: 'Mangga pilihan yang diblender dengan sedikit es. Menyegarkan!',
        category: 'Jus Segar',
        variants: [
            { id: 1, name: 'Normal Sugar', priceAdjustment: 0 },
            { id: 2, name: 'Less Sugar', priceAdjustment: 0 },
        ],
    },
    {
        id: 105,
        name: 'Kopi Susu Gula Aren',
        price: 38000,
        image: 'https://placehold.co/400x300/e0e0e0/333333?text=Kopi+E',
        description: 'Kopi susu dengan sentuhan manis gula aren lokal. Favorit!',
        category: 'Kopi',
        variants: [
            { id: 1, name: 'Gelas Kecil', priceAdjustment: 0 },
            { id: 2, name: 'Gelas Besar (+7K)', priceAdjustment: 7000 },
        ],
    },
];


// --- DATA DUMMY UNTUK MODAL ---
const DUMMY_FAVORITES = [
    { id: 1, productName: 'Kopi Susu Gula Aren', price: 38000 },
    { id: 2, productName: 'Teh Hijau Matcha Latte', price: 40000 },
];

const DUMMY_ORDERS = [
    { id: 1, productName: 'Espresso Blend Klasik', quantity: 2, price: 70000, variant: 'Reguler' },
    { id: 2, productName: 'Kue Cokelat Lava', quantity: 1, price: 25000, variant: 'Satu Porsi' },
];

const DUMMY_HISTORY = [
    { id: 1, date: '10 Nov 2025', total: 120000, items: 3, status: 'Selesai' },
    { id: 2, date: '05 Nov 2025', total: 65000, items: 2, status: 'Dibatalkan' },
];


// --- SKEMA WARNA DINAMIS ---
type Color = 'indigo' | 'green' | 'red' | 'blue';

const COLOR_SCHEMES: Record<Color, string> = {
    indigo: 'Indigo (Default)',
    green: 'Emerald (Segar)',
    red: 'Rose (Hangat)',
    blue: 'Blue (Profesional)',
};

const getColorClasses = (color: Color) => ({
    // Button background and hover
    primaryBg: `bg-${color}-600 hover:bg-${color}-700`,
    // Light background for Hero section
    lightBg: `bg-${color}-50`,
    // Text accents, price, category badges
    textAccent: `text-${color}-600`,
    // Header icon hover background
    hoverBgLight: `hover:bg-${color}-50`,
    // Active category button shadow
    shadowAccent: `shadow-${color}-300`,
    // Header title color
    titleText: `text-${color}-700`,
    // Icon color in header
    iconColor: `text-${color}-500`,
    // Active variant background in Detail Modal
    activeVariantBg: `bg-${color}-600`,
});


// --- KOMPONEN UTILITAS ---

interface SidebarModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const SidebarModal: React.FC<SidebarModalProps> = ({ isOpen, onClose, title, children }) => {
    return (
        <div
            className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

            {/* Sidebar Content (Right) */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl p-6 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex justify-between items-center mb-6 border-b pb-3">
                    <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition"
                        aria-label={`Tutup ${title}`}
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="overflow-y-auto h-[calc(100vh-80px)]">{children}</div>
            </div>
        </div>
    );
};

interface DetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    colorClasses: ReturnType<typeof getColorClasses>;
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, product, colorClasses }) => {
    const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
    const [isOrdered, setIsOrdered] = useState(false);

    React.useEffect(() => {
        if (product) {
            setSelectedVariantId(product.variants[0]?.id || null);
            setIsOrdered(false);
        }
    }, [product]);

    if (!isOpen || !product) return null;

    const selectedVariant = product.variants.find(v => v.id === selectedVariantId);
    const finalPrice = product.price + (selectedVariant?.priceAdjustment || 0);

    const handleOrder = () => {
        console.log(`Memesan: ${product.name} - ${selectedVariant?.name} dengan harga Rp${finalPrice}`);
        setIsOrdered(true);
        setTimeout(() => onClose(), 1500); // Tutup setelah 1.5 detik
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg md:max-h-[90vh] overflow-hidden transform transition-all duration-300">
                <div className="p-6 relative">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white hover:bg-gray-100 text-gray-600 transition z-10"
                        aria-label="Tutup Detail Produk"
                    >
                        <X size={20} />
                    </button>

                    {/* Product Image */}
                    <div className="mb-4">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-lg"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = `https://placehold.co/400x300/e0e0e0/333333?text=${product.name}`;
                            }}
                        />
                    </div>

                    {/* Product Info */}
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className={`text-xl font-semibold mb-4 ${colorClasses.textAccent}`}>
                        Rp{finalPrice.toLocaleString('id-ID')}
                    </p>
                    <p className="text-gray-600 text-sm mb-6">{product.description}</p>

                    {/* Variant Selector */}
                    <div className="mb-6">
                        <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                            <Info size={18} className={`mr-2 ${colorClasses.iconColor}`} /> Pilih Varian
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {product.variants.map(variant => (
                                <button
                                    key={variant.id}
                                    onClick={() => setSelectedVariantId(variant.id)}
                                    className={`px-4 py-2 text-sm font-medium rounded-full transition duration-150 ${selectedVariantId === variant.id
                                        ? `${colorClasses.activeVariantBg} text-white shadow-md`
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {variant.name} {variant.priceAdjustment > 0 && `(+Rp${variant.priceAdjustment / 1000}K)`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Order Button */}
                    <button
                        onClick={handleOrder}
                        disabled={isOrdered}
                        className={`w-full py-3 rounded-xl text-white font-bold transition duration-300 flex items-center justify-center ${isOrdered ? 'bg-green-500 cursor-not-allowed' : `${colorClasses.primaryBg} shadow-lg`
                            }`}
                    >
                        {isOrdered ? (
                            <>
                                <CheckCircle size={20} className="mr-2" /> Berhasil Dipesan!
                            </>
                        ) : (
                            `Pesan Sekarang (Rp${finalPrice.toLocaleString('id-ID')})`
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- MODAL CONTENT COMPONENTS BARU ---

const FavoriteList: React.FC<{ colorClasses: ReturnType<typeof getColorClasses> }> = ({ colorClasses }) => (
    <div className="space-y-4">
        <div className="flex items-center text-gray-500">
            <Heart size={20} className="mr-2" />
            <p className="font-medium">2 Produk yang Anda Suka</p>
        </div>
        <ul className="divide-y divide-gray-200 bg-white p-2 rounded-lg shadow-inner border border-gray-100">
            {DUMMY_FAVORITES.map(item => (
                <li key={item.id} className="py-3 flex justify-between items-center text-gray-700 hover:bg-gray-50 px-2 rounded transition">
                    <span className="font-medium truncate">{item.productName}</span>
                    <span className={`text-sm font-semibold ${colorClasses.textAccent}`}>Rp{item.price.toLocaleString('id-ID')}</span>
                </li>
            ))}
        </ul>
        <p className="text-sm text-center text-gray-500 mt-6">
            Pilih ikon hati pada produk untuk menambahkannya ke daftar favorit.
        </p>
    </div>
);

const OrderCartList: React.FC<{ colorClasses: ReturnType<typeof getColorClasses> }> = ({ colorClasses }) => {
    const subtotal = DUMMY_ORDERS.reduce((sum, item) => sum + item.price, 0);
    return (
        <div className="space-y-4">
            <div className="flex items-center text-gray-500">
                <ShoppingBag size={20} className="mr-2" />
                <p className="font-medium">Total {DUMMY_ORDERS.length} Item di Keranjang</p>
            </div>
            <ul className="divide-y divide-gray-200 bg-white p-2 rounded-lg shadow-inner border border-gray-100">
                {DUMMY_ORDERS.map(item => (
                    <li key={item.id} className="py-3 flex justify-between items-center text-gray-700 px-2">
                        <span className="truncate">
                            <span className={`font-bold mr-2 ${colorClasses.textAccent}`}>{item.quantity}x</span>
                            {item.productName} ({item.variant})
                        </span>
                        <span className="text-sm font-semibold">Rp{item.price.toLocaleString('id-ID')}</span>
                    </li>
                ))}
            </ul>
            <div className="border-t border-gray-300 pt-4 flex justify-between font-bold text-lg text-gray-800">
                <span>Subtotal:</span>
                <span>Rp{subtotal.toLocaleString('id-ID')}</span>
            </div>
            <button className={`w-full mt-4 py-3 text-white font-bold rounded-xl transition duration-200 ${colorClasses.primaryBg}`}>
                Lanjut ke Pembayaran
            </button>
        </div>
    );
};

const HistoryList: React.FC = () => (
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


// --- KOMPONEN UTAMA ---

type ActiveModal = 'none' | 'favorite' | 'order' | 'history' | 'detail';

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
                        <p className="px-4 py-2 text-xs font-semibold text-gray-500 border-b">Pilih Tema Warna</p>
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
                    <button className={`mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white transition duration-150 ${colorClasses.primaryBg}`}>
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
                <div className="mt-10 px-4 sm:px-6 lg:px-8">
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