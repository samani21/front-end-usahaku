import { Box, CookingPot, Tag, Zap } from "lucide-react";

export interface Variant {
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
    variants: Variant[];
}

export interface Category {
    id: string;
    name: string;
    icon: React.ElementType; // Tipe untuk komponen Lucide Icon
}

export type SidebarType = 'favorite' | 'order' | 'history' | null;

// --- Tema Warna (Color Themes) ---
export type ThemeName = 'Minimarket' | 'Modern' | 'Warm' | 'Premium' | 'Minimalis' | 'Yellow';

export const THEME_MAP: Record<ThemeName, {
    primaryText: string;
    primaryBg: string;
    primaryHoverBg: string;
    primaryRing: string;
    primaryBgLight: string;
    colorName: string; // Used for display
}> = {
    Minimarket: {
        primaryText: 'text-green-600',
        primaryBg: 'bg-green-600',
        primaryHoverBg: 'hover:bg-green-700',
        primaryRing: 'ring-green-500 focus:ring-green-500',
        primaryBgLight: 'bg-green-50',
        colorName: 'Hijau',
    },
    Modern: {
        primaryText: 'text-indigo-600',
        primaryBg: 'bg-indigo-600',
        primaryHoverBg: 'hover:bg-indigo-700',
        primaryRing: 'ring-indigo-500 focus:ring-indigo-500',
        primaryBgLight: 'bg-indigo-50',
        colorName: 'Indigo',
    },
    Warm: {
        primaryText: 'text-orange-600',
        primaryBg: 'bg-orange-600',
        primaryHoverBg: 'hover:bg-orange-700',
        primaryRing: 'ring-orange-500 focus:ring-orange-500',
        primaryBgLight: 'bg-orange-50',
        colorName: 'Jingga',
    },
    Premium: {
        primaryText: 'text-violet-600',
        primaryBg: 'bg-violet-600',
        primaryHoverBg: 'hover:bg-violet-700',
        primaryRing: 'ring-violet-500 focus:ring-violet-500',
        primaryBgLight: 'bg-violet-50',
        colorName: 'Violet',
    },
    Minimalis: {
        primaryText: 'text-zinc-600',
        primaryBg: 'bg-zinc-600',
        primaryHoverBg: 'hover:bg-zinc-700',
        primaryRing: 'ring-zinc-500 focus:ring-zinc-500',
        primaryBgLight: 'bg-zinc-50',
        colorName: 'zinc',
    },
    Yellow: {
        primaryText: 'text-yellow-600',
        primaryBg: 'bg-yellow-600',
        primaryHoverBg: 'hover:bg-yellow-700',
        primaryRing: 'ring-yellow-500 focus:ring-yellow-500',
        primaryBgLight: 'bg-yellow-50',
        colorName: 'yellow',
    },
};

export interface ThemeClasses {
    primaryText: string;
    primaryBg: string;
    primaryHoverBg: string;
    primaryRing: string;
    primaryBgLight: string;
}

// --- Data Statis (Dummy Data) ---

export const DUMMY_CATEGORIES: Category[] = [
    { id: 'makanan-instan', name: 'Makanan Instan', icon: Box },
    { id: 'minuman', name: 'Minuman Segar', icon: Zap },
    { id: 'snack', name: 'Snack & Cokelat', icon: Tag },
    { id: 'kebutuhan-dapur', name: 'Kebutuhan Dapur', icon: CookingPot },
];

export const DUMMY_PRODUCTS: Product[] = [
    {
        id: 1,
        name: 'Mie Goreng Rasa Ayam Bawang',
        basePrice: 3500,
        description: 'Mie instan dengan rasa ayam bawang klasik. Cocok untuk bekal atau sarapan cepat.',
        imageUrl: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//89/MTA-3452732/sedaap_mie-instant-mie-sedap-70gr-rasa-ayam-bawang_full02.jpg',
        category: 'makanan-instan',
        variants: [
            { id: 101, name: 'Biasa', priceAdjustment: 0 },
            { id: 102, name: 'Jumbo Pack (+20%)', priceAdjustment: 1000 },
        ],
    },
    {
        id: 2,
        name: 'Teh Botol Dingin',
        basePrice: 5000,
        description: 'Teh manis siap minum, sangat menyegarkan.',
        imageUrl: 'https://cdn.infobrand.id/assets/images/compressed/posts/2023/02/15/menelusuri-pemilik-teh-botol-sosro-minuman-legendaris-teman-di-saat-makan.webp',
        category: 'minuman',
        variants: [
            { id: 201, name: '330ml', priceAdjustment: 0 },
            { id: 202, name: '500ml', priceAdjustment: 2500 },
        ],
    },
    {
        id: 3,
        name: 'Biskuit Cokelat Premium',
        basePrice: 12500,
        description: 'Biskuit renyah dengan lapisan cokelat tebal.',
        imageUrl: 'https://inafood.com/wp-content/uploads/2023/04/Okebis-Cokelat-28-resize-cover-min.png',
        category: 'snack',
        variants: [
            { id: 301, name: 'Standar', priceAdjustment: 0 },
            { id: 302, name: 'Edisi Keluarga', priceAdjustment: 7500 },
        ],
    },
    {
        id: 4,
        name: 'Minyak Goreng Pouch 2L',
        basePrice: 35000,
        description: 'Minyak goreng berkualitas tinggi untuk hasil masakan terbaik.',
        imageUrl: 'https://media.istockphoto.com/id/2172415199/id/foto/minyak-goreng-kelapa-dalam-kemasan-kantong-besar.jpg?s=612x612&w=0&k=20&c=9qwg85B53du_bG9EHphqywUehFE08zqb05IOhXkMrDU=',
        category: 'kebutuhan-dapur',
        variants: [
            { id: 401, name: '2 Liter', priceAdjustment: 0 },
        ],
    },
    {
        id: 5,
        name: 'Kopi Instan 3-in-1',
        basePrice: 1500,
        description: 'Kopi, gula, dan krimer dalam satu sachet.',
        imageUrl: 'https://media.istockphoto.com/id/539834652/id/foto/nescafe-3-dalam-1.jpg?s=612x612&w=0&k=20&c=BWWQAKT5LeSyoE_Vh6lIyfKlGhRqDgdhfjUMt4O3NO0=',
        category: 'minuman',
        variants: [
            { id: 501, name: 'Per Sachet', priceAdjustment: 0 },
            { id: 502, name: 'Box (10 Sachet)', priceAdjustment: 12000 },
        ],
    },
    {
        id: 6,
        name: 'Keripik Kentang Original',
        basePrice: 8000,
        description: 'Keripik kentang dengan bumbu asin alami.',
        imageUrl: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/90/MTA-182223612/japota_japota_keripik_kentang_original_68_gr_full01_989f2500.jpg',
        category: 'snack',
        variants: [
            { id: 601, name: 'Kecil (60g)', priceAdjustment: 0 },
            { id: 602, name: 'Besar (120g)', priceAdjustment: 5000 },
        ],
    },
];

// --- Utilitas (Utilities) ---

export const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};
