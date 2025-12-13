import React, { useState, useCallback, useMemo, useEffect } from 'react';

// --- DEFINISI TEMA WARNA ---
const THEME_CONFIG = {
    Dark: {
        name: 'Dark',
        primary: 'cyan',
        secondary: 'teal',
        bg: 'gray-900',
        cardBg: 'gray-800',
        text: 'gray-50',
        subtleText: 'gray-400',
        shadow: 'shadow-2xl shadow-black/50',
        headerBg: 'gray-800'
    },
    Light: {
        name: 'Light',
        primary: 'indigo',
        secondary: 'purple',
        bg: 'gray-100',
        cardBg: 'white',
        text: 'gray-900',
        subtleText: 'gray-600',
        shadow: 'shadow-xl shadow-gray-300/70',
        headerBg: 'white'
    }
};
type ThemeName = keyof typeof THEME_CONFIG;
interface ThemeConfig {
    name: string;
    primary: string;
    secondary: string;
    bg: string;
    cardBg: string;
    text: string;
    subtleText: string;
    shadow: string;
    headerBg: string;
}

// --- Tipe Data (Interfaces) ---

interface ProductVariant {
    id: number;
    name: string;
    priceAdjustment: number;
}

interface Product {
    id: number;
    name: string;
    basePrice: number;
    description: string;
    imageUrl: string;
    category: string;
    isFavorite: boolean;
    variants: ProductVariant[];
}

interface UIState {
    showFavoritesDrawer: boolean;
    showOrdersDrawer: boolean;
    showHistoryDrawer: boolean;
    selectedProduct: Product | null;
    activeThemeName: ThemeName;
}

interface NotificationState {
    message: string;
    visible: boolean;
    type: 'success' | 'error';
}

// --- Dummy Data ---

const DUMMY_PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Kopi Arabika Premium",
        basePrice: 55000,
        description: "Biji kopi Arabika pilihan dari dataran tinggi, aroma kaya dan rasa seimbang. Cocok untuk semua metode seduh, dari V60 hingga Espresso. Produk ini bersertifikat organik.",
        imageUrl: "https://placehold.co/400x300/147c78/ffffff?text=Kopi+Arabika",
        category: "Minuman",
        isFavorite: true,
        variants: [
            { id: 101, name: "250g Biji Utuh", priceAdjustment: 0 },
            { id: 102, name: "250g Bubuk Halus", priceAdjustment: 5000 },
            { id: 103, name: "500g Biji Utuh", priceAdjustment: 45000 },
        ],
    },
    {
        id: 2,
        name: "Roti Gandum Utuh",
        basePrice: 30000,
        description: "Roti sehat dengan serat tinggi, cocok untuk sarapan atau diet. Dibuat tanpa bahan pengawet dan kaya akan biji-bijian. Varian dengan biji bunga matahari menambah tekstur dan rasa.",
        imageUrl: "https://placehold.co/400x300/a2d2ff/333333?text=Roti+Gandum",
        category: "Makanan",
        isFavorite: false,
        variants: [
            { id: 201, name: "Ukuran Standar", priceAdjustment: 0 },
            { id: 202, name: "Tambahan Biji Matahari", priceAdjustment: 7000 },
        ],
    },
    {
        id: 3,
        name: "Aksesoris Meja Kerja",
        basePrice: 120000,
        description: "Set perlengkapan minimalis untuk meja kerja Anda. Tingkatkan produktivitas! Termasuk tempat pensil, alas mouse kulit premium, dan pengelola kabel.",
        imageUrl: "https://placehold.co/400x300/3c5a6b/ffffff?text=Aksesoris",
        category: "Peralatan",
        isFavorite: true,
        variants: [
            { id: 301, name: "Warna Hitam Doff", priceAdjustment: 0 },
            { id: 302, name: "Warna Putih Glossy", priceAdjustment: 10000 },
        ],
    },
    {
        id: 4,
        name: "Teh Hijau Jepang",
        basePrice: 45000,
        description: "Teh hijau premium impor dari Uji, Kyoto. Rasa otentik dan menyegarkan. Kaya antioksidan alami. Tersedia dalam kemasan kantong untuk kemudahan penyeduhan.",
        imageUrl: "https://placehold.co/400x300/6b8e23/ffffff?text=Teh+Hijau",
        category: "Minuman",
        isFavorite: false,
        variants: [
            { id: 401, name: "10 Kantong", priceAdjustment: 0 },
            { id: 402, name: "20 Kantong", priceAdjustment: 35000 },
        ],
    },
    {
        id: 5,
        name: "Botol Minum Stainless Steel",
        basePrice: 85000,
        description: "Botol minum isolasi ganda, menjaga suhu panas/dingin hingga 12 jam. Tersedia hanya dalam satu ukuran. Pilihan ideal untuk dibawa bepergian dan berolahraga.",
        imageUrl: "https://placehold.co/400x300/4c7c8c/ffffff?text=Botol+Stainless",
        category: "Peralatan",
        isFavorite: false,
        variants: [], // Varian kosong
    },
];

const DUMMY_CATEGORIES: string[] = ["Semua", "Minuman", "Makanan", "Peralatan", "Baru"];

// --- Utility Functions ---

/**
 * Mengubah angka menjadi format mata uang Rupiah.
 */
const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

// --- Komponen Icon (SVG inline untuk performa) ---
interface IconProps {
    className?: string;
    onClick?: () => void;
    title?: string;
}

const HeartIcon: React.FC<IconProps> = (props) => (
    <svg onClick={props.onClick} className={`cursor-pointer w-6 h-6 ${props.className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label={props.title || "Favorit"}>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
);

const ShoppingCartIcon: React.FC<IconProps> = (props) => (
    <svg onClick={props.onClick} className={`cursor-pointer w-6 h-6 ${props.className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label={props.title || "Keranjang Belanja"}>
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.72a2 2 0 0 0 2-1.57l1.7-10H5.5" />
    </svg>
);

const HistoryIcon: React.FC<IconProps> = (props) => (
    <svg onClick={props.onClick} className={`cursor-pointer w-6 h-6 ${props.className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label={props.title || "Riwayat Pesanan"}>
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-3.373 0c-.43.43-.66 1.15-.66 1.15V9" />
        <path d="M12 7v5l2 2" />
    </svg>
);

const XIcon: React.FC<IconProps> = (props) => (
    <svg onClick={props.onClick} className={`cursor-pointer w-6 h-6 ${props.className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label={props.title || "Tutup"}>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

const CheckCircleIcon: React.FC<IconProps> = (props) => (
    <svg className={`w-6 h-6 ${props.className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
    </svg>
);

const ArrowRightIcon: React.FC<IconProps> = (props) => (
    <svg onClick={props.onClick} className={`cursor-pointer w-5 h-5 ${props.className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </svg>
);

const SunIcon: React.FC<IconProps> = (props) => (
    <svg onClick={props.onClick} className={`cursor-pointer w-6 h-6 ${props.className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label={props.title || "Light Mode"}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
    </svg>
);

const MoonIcon: React.FC<IconProps> = (props) => (
    <svg onClick={props.onClick} className={`cursor-pointer w-6 h-6 ${props.className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label={props.title || "Dark Mode"}>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
);


// --- Komponen Notification Toast ---
interface NotificationToastProps {
    notification: NotificationState;
    theme: ThemeConfig;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ notification, theme }) => {
    const { message, visible, type } = notification;

    // Menggunakan warna fixed (Green/Red) agar pesan fungsional tetap jelas.
    const color = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const icon = type === 'success' ? <CheckCircleIcon className="text-white" /> : <XIcon className="text-white" />;

    return (
        <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl transition-all duration-500 transform ${color} text-white max-w-sm ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
            role="alert"
        >
            <div className="flex items-center space-x-3">
                {icon}
                <p className="font-medium text-sm">{message}</p>
            </div>
        </div>
    );
};


// --- Komponen Drawer Samping (Modal Samping Kanan) ---

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    theme: ThemeConfig;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose, title, children, theme }) => {
    // Menggunakan warna primary untuk background drawer header
    const headerBg = theme.name === 'Dark' ? `bg-${theme.primary}-700` : `bg-${theme.primary}-500`;
    const overlayBg = theme.name === 'Dark' ? 'bg-gray-900' : 'bg-gray-900/50';

    return (
        <>
            {/* Overlay - Latar belakang dibuat lebih buram (opacity-75 di Dark, 50 di Light) */}
            <div
                className={`fixed inset-0 z-40 ${overlayBg} transition-opacity duration-300 ${isOpen ? 'opacity-75 visible' : 'opacity-0 invisible'}`}
                onClick={onClose}
                aria-hidden={!isOpen}
                role="presentation"
            />

            {/* Drawer Content - Menggunakan theme.cardBg */}
            <div
                className={`fixed right-0 top-0 h-full w-full md:w-96 bg-${theme.cardBg} text-${theme.text} ${theme.shadow} z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="drawer-title"
            >
                <div className={`flex justify-between items-center p-4 border-b border-gray-700/20 ${headerBg} text-white`}>
                    <h2 id="drawer-title" className="text-xl font-semibold">{title}</h2>
                    <XIcon className="text-white hover:text-white/80" onClick={onClose} title="Tutup Drawer" />
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
                    {children}
                </div>
            </div>
        </>
    );
};

// --- Komponen Header ---

interface HeaderProps {
    onIconClick: (drawerName: keyof UIState) => void;
    onThemeToggle: () => void;
    theme: ThemeConfig;
}

const Header: React.FC<HeaderProps> = ({ onIconClick, onThemeToggle, theme }) => {
    // Kelas warna dinamis berdasarkan tema
    const primaryColor = `text-${theme.primary}-500`;
    const secondaryColor = `text-${theme.secondary}-500`;
    const bgColor = `bg-${theme.headerBg}`;
    const textColor = `text-${theme.text}`;
    const themeIconColor = theme.name === 'Dark' ? 'text-yellow-400' : 'text-yellow-600';

    // Tentukan ikon yang akan ditampilkan
    const ThemeIcon = theme.name === 'Dark' ? SunIcon : MoonIcon;
    const themeIconTitle = theme.name === 'Dark' ? 'Ubah ke Light Mode' : 'Ubah ke Dark Mode';

    return (
        <header className={`sticky top-0 z-30 ${bgColor} ${theme.shadow}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <h1 className={`text-3xl font-extrabold ${textColor} tracking-wider`}>
                    <span className="hidden sm:inline">Katalog</span> <span className={primaryColor}>Modern</span>
                </h1>
                <div className="flex space-x-5 items-center">

                    {/* Tombol Theme Toggle */}
                    <div onClick={onThemeToggle} title={themeIconTitle}>
                        <ThemeIcon className={`${themeIconColor} hover:opacity-80 transition transform hover:scale-110`} />
                    </div>

                    <div onClick={() => onIconClick('showFavoritesDrawer')} title="Favorit">
                        <HeartIcon className="text-red-500 hover:text-red-700 transition transform hover:scale-110" onClick={() => onIconClick('showFavoritesDrawer')} title="Favorit" />
                    </div>
                    <div onClick={() => onIconClick('showOrdersDrawer')} title="Pesanan Saat Ini">
                        <ShoppingCartIcon className={`${primaryColor} hover:opacity-80 transition transform hover:scale-110`} onClick={() => onIconClick('showOrdersDrawer')} title="Keranjang Belanja" />
                    </div>
                    <div onClick={() => onIconClick('showHistoryDrawer')} title="Riwayat Pesanan">
                        <HistoryIcon className={`${secondaryColor} hover:opacity-80 transition transform hover:scale-110`} onClick={() => onIconClick('showHistoryDrawer')} title="Riwayat Pesanan" />
                    </div>
                </div>
            </div>
        </header>
    );
};

// --- Komponen Product Card ---

interface ProductCardProps {
    product: Product;
    onClick: (product: Product) => void;
    theme: ThemeConfig;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, theme }) => {
    // Kelas warna dinamis
    const primaryTextColor = `text-${theme.primary}-500`;
    const primaryBgColor = `bg-${theme.primary}-600`;
    const primaryHoverBgColor = `hover:bg-${theme.primary}-700`;
    const cardBgColor = `bg-${theme.cardBg}`;
    const mainTextColor = `text-${theme.text}`;
    const subtleTextColor = `text-${theme.subtleText}`;
    const hoverBorderColor = `hover:border-${theme.primary}-500`;

    // Custom Shadow, menyesuaikan jika Dark/Light
    const shadowStyle = theme.shadow;
    const cardBorder = theme.name === 'Dark' ? 'border-gray-700/50' : 'border-transparent';

    // Tampilkan harga dasar atau harga varian termurah/tertinggi jika ada varian
    const priceDisplay = useMemo(() => {
        if (product.variants.length > 0) {
            const minPrice = product.variants.reduce((min, v) => Math.min(min, product.basePrice + v.priceAdjustment), Infinity);
            return formatRupiah(minPrice);
        }
        return formatRupiah(product.basePrice);
    }, [product]);

    return (
        <div
            className={`flex flex-col sm:flex-row ${cardBgColor} rounded-3xl p-4 ${shadowStyle} border ${cardBorder}
                 transition duration-500 cursor-pointer overflow-hidden transform hover:scale-[1.02] ${hoverBorderColor}`}
            onClick={() => onClick(product)}
            role="listitem"
        >
            {/* Gambar Kiri */}
            <div className="w-full sm:w-2/5 flex-shrink-0 mb-3 sm:mb-0 sm:mr-4">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-40 sm:h-full object-cover rounded-2xl shadow-lg"
                    loading="lazy"
                    onError={(e: any) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/CCCCCC/333333?text=Gambar+Hilang"; }}
                />
            </div>

            {/* Detail Kanan */}
            <div className="flex-1 p-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-center">
                        <h3 className={`font-extrabold text-xl ${mainTextColor} truncate pr-4`}>{product.name}</h3>
                        {product.isFavorite && (
                            <HeartIcon className="text-red-500 w-5 h-5 flex-shrink-0" title="Produk Favorit" />
                        )}
                    </div>
                    <p className={`font-extrabold text-2xl mt-1 mb-2 ${primaryTextColor}`}>{priceDisplay}</p>
                    <p className={`${subtleTextColor} text-sm line-clamp-3 min-h-[3rem]`}>{product.description}</p>
                </div>

                {/* Tombol Aksi */}
                <button
                    className={`mt-4 flex items-center justify-center space-x-2 w-full text-white py-2.5 rounded-xl font-bold transition shadow-lg ${primaryBgColor} ${primaryHoverBgColor} transform hover:translate-y-[-1px]`}
                    onClick={(e) => { e.stopPropagation(); onClick(product); }}
                    aria-label={`Lihat detail produk ${product.name}`}
                >
                    <span>Detail & Pesan</span>
                    <ArrowRightIcon className="text-white w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

// --- Komponen Modal Detail Produk ---

interface ProductDetailModalProps {
    product: Product;
    onClose: () => void;
    onOrderSuccess: (message: string, type?: 'success' | 'error') => void;
    theme: ThemeConfig;
}

// Tipe untuk melacak kuantitas: { variantId: quantity } atau { 'base': quantity } jika tidak ada varian
type VariantQuantities = Record<number | 'base', number>;

const QuantityInput: React.FC<{
    id: number | 'base';
    quantity: number;
    onChange: (id: number | 'base', newQuantity: string) => void;
    label: string;
    min: number;
    theme: ThemeConfig;
}> = ({ id, quantity, onChange, label, min, theme }) => {
    // Kelas warna dinamis
    const primaryFocus = `focus:ring-2 focus:ring-${theme.primary}-400 focus:border-${theme.primary}-400`;
    const textColor = `text-${theme.text}`;
    const inputBg = theme.name === 'Dark' ? 'bg-gray-700' : 'bg-gray-100';
    const buttonBg = theme.name === 'Dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300';

    const handleDecrement = () => {
        if (quantity > min) {
            onChange(id, String(quantity - 1));
        }
    };

    const handleIncrement = () => {
        onChange(id, String(quantity + 1));
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                className={`w-8 h-8 rounded-full ${buttonBg} border ${textColor} font-bold hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={handleDecrement}
                disabled={quantity <= min}
                aria-label={`Kurangi kuantitas untuk ${label}`}
            >
                -
            </button>
            <input
                type="number"
                min={min}
                value={quantity}
                onChange={(e) => onChange(id, e.target.value)}
                className={`w-20 p-2 border ${theme.name === 'Dark' ? 'border-gray-600' : 'border-gray-300'} rounded-lg text-center ${primaryFocus} transition duration-150 ${textColor} ${inputBg}`}
                aria-label={`Kuantitas untuk ${label}`}
                role="spinbutton"
            />
            <button
                className={`w-8 h-8 rounded-full ${buttonBg} border ${textColor} font-bold hover:opacity-80 transition`}
                onClick={handleIncrement}
                aria-label={`Tambahkan kuantitas untuk ${label}`}
            >
                +
            </button>
        </div>
    );
};

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onOrderSuccess, theme }) => {
    const initialQuantities = product.variants.length > 0
        ? product.variants.reduce((acc, variant) => ({ ...acc, [variant.id]: 0 }), {} as VariantQuantities)
        : { 'base': 1 };

    const [variantQuantities, setVariantQuantities] = useState<VariantQuantities>(initialQuantities);

    // Kelas warna dinamis
    const primaryTextColor = `text-${theme.primary}-500`;
    const primaryText700 = `text-${theme.primary}-700`;
    const primaryButtonBg = `bg-${theme.primary}-600`;
    const primaryButtonHover = `hover:bg-${theme.primary}-700`;
    const cardBgColor = `bg-${theme.cardBg}`;
    const mainTextColor = `text-${theme.text}`;
    const subtleTextColor = `text-${theme.subtleText}`;
    const shadowClass = theme.shadow;
    const borderDiv = theme.name === 'Dark' ? 'border-gray-700/20' : 'border-gray-200/50';
    const innerBg = theme.name === 'Dark' ? 'bg-gray-700' : 'bg-gray-50';
    const footerBg = theme.name === 'Dark' ? 'bg-gray-700/50' : 'bg-gray-100/50';

    // Handler untuk mengubah kuantitas varian
    const handleQuantityChange = useCallback((id: number | 'base', newQuantity: string) => {
        const quantity = parseInt(newQuantity, 10);
        const safeQuantity = Math.max(0, quantity || 0);
        setVariantQuantities(prev => ({
            ...prev,
            [id]: safeQuantity,
        }));
    }, []);

    // Hitung total harga dan jumlah item
    const { finalPrice, totalItems } = useMemo(() => {
        let total = 0;
        let items = 0;
        const isNoVariant = product.variants.length === 0;

        if (isNoVariant) {
            const quantity = variantQuantities['base'] || 0;
            total = product.basePrice * quantity;
            items = quantity;
        } else {
            Object.entries(variantQuantities).forEach(([idString, quantity]) => {
                const variantId = parseInt(idString, 10);
                const variant = product.variants.find(v => v.id === variantId);
                console.log('variant', variant)
                if (variant && quantity > 0) {
                    const pricePerUnit = product.basePrice + variant.priceAdjustment;
                    total += pricePerUnit * quantity;
                    items += quantity;
                }
            });
        }
        return { finalPrice: total, totalItems: items };
    }, [product.basePrice, product.variants, variantQuantities]);

    const handleOrder = () => {
        if (totalItems === 0) {
            onOrderSuccess('Pilih setidaknya satu varian atau atur kuantitas.', 'error');
            return;
        }

        const isNoVariant = product.variants.length === 0;
        let summary = '';
        let notificationMessage = '';

        if (isNoVariant) {
            const quantity = variantQuantities['base'];
            summary = `${quantity}x ${product.name}`;
            notificationMessage = `Berhasil menambahkan ${quantity} item ${product.name} ke keranjang.`;
        } else {
            const purchasedItems = Object.entries(variantQuantities)
                .filter(([, quantity]) => quantity > 0)
                .map(([idString, quantity]) => {
                    const variant = product.variants.find(v => v.id === parseInt(idString, 10));
                    return `${quantity}x ${variant?.name}`;
                });

            summary = purchasedItems.join(', ');
            notificationMessage = `Berhasil memesan ${totalItems} item (${purchasedItems.join('; ')}) dari produk ${product.name}.`;
        }

        console.log(`Pesanan untuk ${product.name}: ${summary}. Total: ${formatRupiah(finalPrice)}`);
        onOrderSuccess(notificationMessage);
        onClose();
    };

    const getVariantPrice = (variant: ProductVariant) => product.basePrice + variant.priceAdjustment;

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/70 z-40 transition-opacity" onClick={onClose} aria-hidden="true" role="presentation" />

            {/* Modal Content (Lebih Besar) */}
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4 text-center">
                    <div
                        className={`${cardBgColor} rounded-3xl ${shadowClass} transform transition-all w-full max-w-5xl overflow-hidden min-h-[80vh] ${mainTextColor}`}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        {/* Header Modal - Close Button */}
                        <div className={`flex justify-end p-4 md:p-6 border-b ${borderDiv}`}>
                            <XIcon className={`${subtleTextColor} hover:${mainTextColor}`} onClick={onClose} title="Tutup Modal" />
                        </div>

                        {/* Body Modal - Grid 2 Kolom */}
                        <div className="grid md:grid-cols-5 p-4 md:p-8 gap-8">
                            {/* Kolom Kiri: Gambar & Deskripsi (3/5 lebar) */}
                            <div className="md:col-span-3">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full max-h-[500px] object-cover rounded-2xl mb-6 shadow-2xl"
                                    loading="lazy"
                                    onError={(e: any) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/333333?text=Gambar+Detail"; }}
                                />
                                <div className={`p-4 rounded-xl border ${borderDiv} ${innerBg}`}>
                                    <h4 className={`text-xl font-bold ${mainTextColor} mb-2`}>Deskripsi Produk</h4>
                                    <p className={`${subtleTextColor} text-base leading-relaxed`}>{product.description}</p>
                                </div>
                            </div>

                            {/* Kolom Kanan: Pemesanan & Harga (2/5 lebar) */}
                            <div className="md:col-span-2 text-left flex flex-col justify-between">
                                <div>
                                    <h3 id="modal-title" className="text-4xl font-extrabold mb-1">{product.name}</h3>
                                    <p className={`text-xl font-bold mb-6 ${primaryTextColor}`}>{formatRupiah(product.basePrice)} (Harga Dasar)</p>

                                    {/* Pilihan Varian dan Kuantitas */}
                                    <div className={`mb-6 border-t pt-4 ${borderDiv}`}>
                                        <label className={`block text-2xl font-bold mb-4 ${mainTextColor}`}>Pilih & Pesan:</label>

                                        {product.variants.length > 0 ? (
                                            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                                                {product.variants.map((variant) => (
                                                    <div key={variant.id} className={`flex justify-between items-center p-3 rounded-lg border ${borderDiv} ${innerBg} shadow-sm`}>
                                                        <div className="flex-1 mr-4">
                                                            <p className={`font-semibold ${mainTextColor}`}>{variant.name}</p>
                                                            <p className={`text-sm ${subtleTextColor}`}>{formatRupiah(getVariantPrice(variant))}</p>
                                                        </div>
                                                        <QuantityInput
                                                            id={variant.id}
                                                            quantity={variantQuantities[variant.id] || 0}
                                                            onChange={handleQuantityChange}
                                                            label={variant.name}
                                                            min={0}
                                                            theme={theme}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            // UI untuk Produk Tanpa Varian
                                            <div className={`flex items-center justify-between p-4 rounded-xl border ${borderDiv} ${innerBg} shadow-sm`}>
                                                <p className={`font-semibold ${mainTextColor}`}>Kuantitas {product.name}</p>
                                                <QuantityInput
                                                    id={'base'}
                                                    quantity={variantQuantities['base'] || 1}
                                                    onChange={handleQuantityChange}
                                                    label={product.name}
                                                    min={1}
                                                    theme={theme}
                                                />
                                            </div>
                                        )}
                                        <p className={`text-xs ${subtleTextColor} mt-2 italic`}>*Atur kuantitas 0 jika tidak ingin memesan varian tertentu.</p>
                                    </div>
                                </div>

                                {/* Total Harga dan Tombol Aksi (Sticky Look) */}
                                <div className={`flex flex-col space-y-4 border-t pt-4 mt-auto ${borderDiv}`}>
                                    <div className={`p-4 rounded-xl ${footerBg} border ${borderDiv} shadow-inner`}>
                                        {/* Ringkasan Item Dipilih (tetap flex) */}
                                        <p className={`text-lg ${mainTextColor} font-medium flex justify-between mb-3`}>
                                            <span>Total Item Dipilih:</span>
                                            <span className={`font-extrabold ${mainTextColor}`}>{totalItems}</span>
                                        </p>

                                        {/* Total Akhir yang ditumpuk secara vertikal */}
                                        <div className="mt-1">
                                            <p className={`text-2xl font-bold ${mainTextColor}`}>TOTAL AKHIR:</p>
                                            <p className={`text-4xl font-extrabold ${primaryText700}`}>{formatRupiah(finalPrice)}</p>
                                        </div>

                                    </div>

                                    {/* Tombol Pesan */}
                                    <button
                                        className={`w-full text-white py-4 rounded-xl text-xl font-extrabold transition shadow-lg transform hover:scale-[1.01] 
                            ${totalItems > 0 ? primaryButtonBg + ' ' + primaryButtonHover : 'bg-gray-500 cursor-not-allowed opacity-70'}`}
                                        onClick={handleOrder}
                                        disabled={totalItems === 0}
                                        aria-disabled={totalItems === 0}
                                    >
                                        {totalItems > 0 ? 'Masukkan ke Keranjang' : 'Pilih Kuantitas'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// --- Komponen Utama Aplikasi ---

const App: React.FC = () => {
    const [uiState, setUiState] = useState<UIState>({
        showFavoritesDrawer: false,
        showOrdersDrawer: false,
        showHistoryDrawer: false,
        selectedProduct: null,
        // Mulai dengan Dark Mode (atau Light, tergantung preferensi)
        activeThemeName: 'Dark',
    });
    const [activeCategory, setActiveCategory] = useState<string>("Semua");
    const [notification, setNotification] = useState<NotificationState>({
        message: '',
        visible: false,
        type: 'success',
    });

    // Menggunakan useMemo untuk mendapatkan konfigurasi tema aktif
    const activeTheme = useMemo<ThemeConfig>(() => THEME_CONFIG[uiState.activeThemeName], [uiState.activeThemeName]);

    // Handler untuk mengubah tema
    const toggleTheme = useCallback(() => {
        setUiState(prev => ({
            ...prev,
            activeThemeName: prev.activeThemeName === 'Dark' ? 'Light' : 'Dark'
        }));
    }, []);

    // Handler untuk menampilkan notifikasi toast
    const showNotification = useCallback((message: string, type: 'success' | 'error' = 'success') => {
        setNotification({ message, visible: true, type });
        setTimeout(() => {
            setNotification(prev => ({ ...prev, visible: false }));
        }, 4000); // Notifikasi hilang setelah 4 detik
    }, []);

    // Handler untuk membuka/menutup drawer
    const toggleDrawer = useCallback((drawerName: keyof UIState, state: boolean) => {
        setUiState(prev => ({ ...prev, [drawerName]: state }));
    }, []);

    // Handler untuk membuka detail produk modal
    const openProductDetail = useCallback((product: Product) => {
        setUiState(prev => ({ ...prev, selectedProduct: product }));
    }, []);

    // Handler untuk menutup modal detail produk
    const closeProductDetail = useCallback(() => {
        setUiState(prev => ({ ...prev, selectedProduct: null }));
    }, []);

    // Filtered Products based on category
    const filteredProducts = useMemo(() => {
        if (activeCategory === "Semua") {
            return DUMMY_PRODUCTS;
        }
        return DUMMY_PRODUCTS.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    // Style classes based on active theme
    const primaryBg = `bg-${activeTheme.primary}-600`;
    const secondaryBg = `bg-${activeTheme.secondary}-700`;
    const bgColor = `bg-${activeTheme.bg}`;
    const mainTextColor = `text-${activeTheme.text}`;
    const cardBgColor = `bg-${activeTheme.cardBg}`;

    // Gradient for Hero Section
    const heroGradient = activeTheme.name === 'Dark'
        ? `from-gray-800 to-cyan-900`
        : `from-white to-${activeTheme.primary}-100`;
    const heroTextColor = activeTheme.name === 'Dark' ? 'text-white' : 'text-gray-900';
    const primaryText = `text-${activeTheme.primary}-500`;
    const subtleTextColor = `text-${activeTheme.subtleText}`;
    const heroAccentText = activeTheme.name === 'Dark' ? 'text-teal-200' : 'text-teal-700';
    const heroButtonClasses = activeTheme.name === 'Dark'
        ? 'bg-white text-gray-900 hover:bg-slate-100'
        : `bg-${activeTheme.primary}-600 text-white hover:bg-${activeTheme.primary}-700`;

    // --- Render Konten Drawer ---
    const renderDrawerContent = (type: keyof UIState) => {
        const drawerCardBg = activeTheme.name === 'Dark' ? 'bg-gray-800' : 'bg-gray-100';
        const drawerBorderColor = activeTheme.name === 'Dark' ? 'border-gray-700/20' : 'border-gray-300';

        switch (type) {
            case 'showFavoritesDrawer':
                const favorites = DUMMY_PRODUCTS.filter(p => p.isFavorite);
                return (
                    <div className="space-y-4">
                        {favorites.length > 0 ? favorites.map(p => (
                            <div key={p.id} className={`p-4 rounded-lg flex justify-between items-center ${drawerCardBg} border ${drawerBorderColor} shadow-sm`}>
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
                        <div className={`border-t border-b py-4 space-y-3 ${drawerBorderColor}`}>
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
                        <div className={`p-4 border rounded-xl ${drawerCardBg} shadow-sm ${drawerBorderColor}`}>
                            <p className={`font-semibold ${mainTextColor}`}>Pesanan #2024001</p>
                            <p className={`text-sm ${subtleTextColor}`}>3 Produk - Total: {formatRupiah(85000)}</p>
                            <p className="text-xs text-green-500 font-medium mt-1">Selesai (2 Hari Lalu)</p>
                        </div>
                        <div className={`p-4 border rounded-xl ${drawerCardBg} shadow-sm ${drawerBorderColor}`}>
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


    return (
        <div className={`min-h-screen ${bgColor} ${mainTextColor} font-sans transition-colors duration-500`}>
            <Header
                onIconClick={(drawerName) => toggleDrawer(drawerName, true)}
                onThemeToggle={toggleTheme}
                theme={activeTheme}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 1. Hero Section / Banner */}
                <section className={`bg-gradient-to-r ${heroGradient} rounded-3xl shadow-2xl overflow-hidden mb-16 p-8 md:p-16 ${heroTextColor}`}>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-3/5">
                            <span className={`text-sm font-semibold uppercase tracking-widest ${heroAccentText} mb-2 block`}>Penawaran Eksklusif</span>
                            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">Diskon Hingga 30%</h2>
                            <p className={`text-xl mb-8 ${activeTheme.name === 'Dark' ? 'text-cyan-100' : 'text-gray-700'}`}>Pilih produk favorit Anda dari semua kategori dan nikmati harga terbaik.</p>
                            <button className={`font-bold py-3.5 px-10 rounded-full shadow-lg transition duration-300 transform hover:scale-105 ${heroButtonClasses}`}>
                                Belanja Sekarang
                            </button>
                        </div>
                        <div className="hidden md:block md:w-1/4">
                            {/* SVG Ilustrasi Modern */}
                            <svg className={`w-full h-auto opacity-80 ${activeTheme.name === 'Dark' ? 'text-white' : 'text-gray-700'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                        </div>
                    </div>
                </section>

                {/* 2. Kategori */}
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className={`text-4xl font-bold ${mainTextColor}`}>Jelajahi Kategori</h2>
                    </div>

                    <div className="flex overflow-x-auto pb-4 space-x-3 sm:space-x-5 whitespace-nowrap scrollbar-hide">
                        {DUMMY_CATEGORIES.map(category => (
                            <button
                                key={category}
                                className={`flex-shrink-0 py-2.5 px-8 rounded-full text-lg font-semibold transition duration-200 shadow-md ${activeCategory === category
                                    ? `${primaryBg} text-white shadow-lg`
                                    : `${cardBgColor} ${mainTextColor} border ${activeTheme.name === 'Dark' ? 'border-gray-700/20 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-200'}`
                                    }`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </section>

                {/* 3. Card Produk (Grid dengan desain horizontal baru) */}
                <section>
                    <h2 className={`text-4xl font-bold ${mainTextColor} mb-8`}>Produk Pilihan</h2>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" role="list">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} onClick={openProductDetail} theme={activeTheme} />
                            ))}
                        </div>
                    ) : (
                        <div className={`text-center p-10 ${cardBgColor} rounded-xl shadow-md border ${activeTheme.name === 'Dark' ? 'border-gray-700/20' : 'border-gray-300'}`}>
                            <p className={`text-xl ${subtleTextColor}`}>Tidak ada produk di kategori <span className={`font-bold ${primaryText}`}>"{activeCategory}"</span>.</p>
                        </div>
                    )}
                </section>
            </main>

            {/* Render Modals/Drawers */}

            {/* Favorite Drawer */}
            <SideDrawer
                isOpen={uiState.showFavoritesDrawer}
                onClose={() => toggleDrawer('showFavoritesDrawer', false)}
                title="Daftar Favorit Anda"
                theme={activeTheme}
            >
                {renderDrawerContent('showFavoritesDrawer')}
            </SideDrawer>

            {/* Orders Drawer */}
            <SideDrawer
                isOpen={uiState.showOrdersDrawer}
                onClose={() => toggleDrawer('showOrdersDrawer', false)}
                title="Keranjang Belanja"
                theme={activeTheme}
            >
                {renderDrawerContent('showOrdersDrawer')}
            </SideDrawer>

            {/* History Order Drawer */}
            <SideDrawer
                isOpen={uiState.showHistoryDrawer}
                onClose={() => toggleDrawer('showHistoryDrawer', false)}
                title="Riwayat Transaksi"
                theme={activeTheme}
            >
                {renderDrawerContent('showHistoryDrawer')}
            </SideDrawer>

            {/* Product Detail Modal (Tengah) */}
            {uiState.selectedProduct && (
                <ProductDetailModal
                    product={uiState.selectedProduct}
                    onClose={closeProductDetail}
                    onOrderSuccess={showNotification}
                    theme={activeTheme}
                />
            )}

            {/* Notification Toast */}
            <NotificationToast notification={notification} theme={activeTheme} />
        </div>
    );
};

export default App;