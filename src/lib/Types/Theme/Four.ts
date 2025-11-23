import { ChevronDown, Laptop, Monitor, Smartphone, Tablet } from "lucide-react";

export type ThemeName = 'teal' | 'indigo' | 'rose' | 'orange' | 'slate'; // Menambahkan 'slate'

export interface ColorClasses {
    primary: string; // e.g., 'bg-teal-600'
    primaryHover: string; // e.g., 'hover:bg-teal-700'
    primaryText: string; // e.g., 'text-teal-600'
    primaryTextDark: string; // e.g., 'dark:text-teal-400'
    gradientFrom: string; // e.g., 'from-teal-600'
    gradientTo: string; // e.g., 'to-cyan-500'
    borderAccent: string; // e.g., 'border-teal-500'
    backgroundAccent: string; // e.g., 'bg-teal-50'
    backgroundAccentDark: string; // e.g., 'dark:bg-teal-900'
    textAccent: string; // e.g., 'text-teal-800'
}

export const THEME_COLORS: Record<ThemeName, ColorClasses> = {
    teal: {
        primary: 'bg-teal-600',
        primaryHover: 'hover:bg-teal-700',
        primaryText: 'text-teal-600',
        primaryTextDark: 'dark:text-teal-400',
        gradientFrom: 'from-teal-600',
        gradientTo: 'to-cyan-500',
        borderAccent: 'border-teal-500',
        backgroundAccent: 'bg-teal-50',
        backgroundAccentDark: 'dark:bg-teal-900',
        textAccent: 'text-teal-800',
    },
    indigo: {
        primary: 'bg-indigo-600',
        primaryHover: 'hover:bg-indigo-700',
        primaryText: 'text-indigo-600',
        primaryTextDark: 'dark:text-indigo-400',
        gradientFrom: 'from-indigo-600',
        gradientTo: 'to-violet-500',
        borderAccent: 'border-indigo-500',
        backgroundAccent: 'bg-indigo-50',
        backgroundAccentDark: 'dark:bg-indigo-900',
        textAccent: 'text-indigo-800',
    },
    rose: {
        primary: 'bg-rose-600',
        primaryHover: 'hover:bg-rose-700',
        primaryText: 'text-rose-600',
        primaryTextDark: 'dark:text-rose-400',
        gradientFrom: 'from-rose-600',
        gradientTo: 'to-pink-500',
        borderAccent: 'border-rose-500',
        backgroundAccent: 'bg-rose-50',
        backgroundAccentDark: 'dark:bg-rose-900',
        textAccent: 'text-rose-800',
    },
    orange: {
        primary: 'bg-orange-600',
        primaryHover: 'hover:bg-orange-700',
        primaryText: 'text-orange-600',
        primaryTextDark: 'dark:text-orange-400',
        gradientFrom: 'from-orange-600',
        gradientTo: 'to-amber-500',
        borderAccent: 'border-orange-500',
        backgroundAccent: 'bg-orange-50',
        backgroundAccentDark: 'dark:bg-orange-900',
        textAccent: 'text-orange-800',
    },
    // TEMA BARU: SLATE (Minimalis)
    slate: {
        primary: 'bg-slate-700',
        primaryHover: 'hover:bg-slate-800',
        primaryText: 'text-slate-700',
        primaryTextDark: 'dark:text-slate-300',
        gradientFrom: 'from-slate-700',
        gradientTo: 'to-gray-600',
        borderAccent: 'border-slate-500',
        backgroundAccent: 'bg-gray-100',
        backgroundAccentDark: 'dark:bg-slate-900',
        textAccent: 'text-slate-800',
    },
};

export interface Variant {
    id: string;
    name: string;
    priceAdjustment: number;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    variants: Variant[];
    isFavorite: boolean;
}

export interface OrderItem {
    productId: string;
    productName: string;
    basePrice: number;
    variantName: string;
    finalPrice: number;
    quantity: number;
}

// --- 2. DUMMY DATA ---

export const DUMMY_PRODUCTS: Product[] = [
    {
        id: 'p1',
        name: 'ROG Strix G16 (2025)',
        price: 25999000,
        description: 'Laptop berperforma tinggi untuk gaming dan editing profesional. Dilengkapi kartu grafis terbaru.',
        imageUrl: 'https://dlcdnwebimgs.asus.com/files/media/71a33ba1-1be2-44c1-9541-70b4c800abf8/v1/images/Strix_G16_KV_16x9.webp',
        category: 'Laptop',
        variants: [
            { id: 'v1a', name: 'RAM 16GB / SSD 512GB', priceAdjustment: 0 },
            { id: 'v1b', name: 'RAM 32GB / SSD 1TB (Premium)', priceAdjustment: 3000000 },
        ],
        isFavorite: false,
    },
    {
        id: 'p2',
        name: 'Smartphone Ultra X Pro',
        price: 8999000,
        description: 'Kamera terbaik di kelasnya dan daya tahan baterai seharian penuh. Desain ergonomis.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTJ2Ut9AwmYWiawxXkgbYtTqslz5Vvo7hxJA&s',
        category: 'Smartphone',
        variants: [
            { id: 'v2a', name: 'Warna Hitam (Standar)', priceAdjustment: 0 },
            { id: 'v2b', name: 'Warna Biru (Edisi Khusus)', priceAdjustment: 500000 },
        ],
        isFavorite: true,
    },
    {
        id: 'p3',
        name: 'Smartwatch Titan Series 3',
        price: 3450000,
        description: 'Melacak aktivitas olahraga, detak jantung, dan notifikasi pintar. Tahan air hingga 50m.',
        imageUrl: 'https://media.tatacroma.com/Croma%20Assets/Communication/Wearable%20Devices/Images/276060_0_e4dbrp.png',
        category: 'Aksesoris',
        variants: [
            { id: 'v3a', name: 'Tali Karet', priceAdjustment: 0 },
            { id: 'v3b', name: 'Tali Logam', priceAdjustment: 350000 },
        ],
        isFavorite: false,
    },
    {
        id: 'p4',
        name: 'Monitor UltraWide 34"',
        price: 6700000,
        description: 'Layar melengkung 144Hz untuk pengalaman kerja dan gaming yang imersif.',
        imageUrl: 'https://www.lg.com/content/dam/channel/wcms/id/monitor/ultrawide/34wr50qk/gallery/gallery/ultrawide-34wr50qk-gallery-04-2010.jpg',
        category: 'Monitor',
        variants: [
            { id: 'v4a', name: 'Standar', priceAdjustment: 0 },
            { id: 'v4b', name: 'Varian dengan Kalibrasi Warna', priceAdjustment: 1200000 },
        ],
        isFavorite: false,
    },
];

export const DUMMY_CATEGORIES = [
    { name: 'Semua Produk', icon: Monitor },
    { name: 'Laptop', icon: Laptop },
    { name: 'Smartphone', icon: Smartphone },
    { name: 'Monitor', icon: Tablet },
    { name: 'Aksesoris', icon: ChevronDown },
];

export const DUMMY_HISTORY: OrderItem[] = [
    { productId: 'p2', productName: 'Smartphone Ultra X Pro', basePrice: 8999000, variantName: 'Warna Hitam (Standar)', finalPrice: 8999000, quantity: 1 },
    { productId: 'p3', productName: 'Smartwatch Titan Series 3', basePrice: 3450000, variantName: 'Tali Karet', finalPrice: 3450000, quantity: 2 },
];

export type DrawerType = 'favorite' | 'cart' | 'history' | null;

export const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};