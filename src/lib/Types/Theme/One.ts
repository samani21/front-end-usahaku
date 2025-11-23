// --- DEFINISI TEMA WARNA (Hanya Dark Mode) ---
export const THEME_CONFIG = {
    Dark: {
        name: 'Dark',
        primary: 'cyan',
        secondary: 'teal',
        bg: 'gray-900',
        cardBg: 'gray-800',
        text: 'gray-50',
        subtleText: 'gray-400',
        shadow: 'shadow-2xl shadow-black/50'
    },
};
export type ThemeName = keyof typeof THEME_CONFIG; // Akan selalu 'Dark'
export interface ThemeConfig {
    name: string;
    primary: string;
    secondary: string;
    bg: string;
    cardBg: string;
    text: string;
    subtleText: string;
    shadow: string;
}

// --- Tipe Data (Interfaces) ---

export interface ProductVariant {
    id: number;
    name: string;
    priceAdjustment: number;
}

export interface Product {
    id: number;
    name: string;
    basePrice: number;
    description: string;
    imageUrl: string;
    category: string;
    isFavorite: boolean;
    variants: ProductVariant[];
}

export interface UIState {
    showFavoritesDrawer: boolean;
    showOrdersDrawer: boolean;
    showHistoryDrawer: boolean;
    selectedProduct: Product | null;
    activeThemeName: ThemeName;
}

export interface NotificationState {
    message: string;
    visible: boolean;
    type: 'success' | 'error';
}

// --- Dummy Data ---

export const DUMMY_PRODUCTS: Product[] = [
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

export const DUMMY_CATEGORIES: string[] = ["Semua", "Minuman", "Makanan", "Peralatan", "Baru"];

// --- Utility Functions ---

/**
 * Mengubah angka menjadi format mata uang Rupiah.
 */
export const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

// --- Komponen Icon (SVG inline untuk performa) ---
export interface IconProps {
    className?: string;
    onClick?: () => void;
    title?: string;
}
