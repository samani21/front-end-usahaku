export interface Theme {
    name: string;
    primary: string; // Tailwind color name (e.g., 'orange', 'indigo')
    hex: string; // For use in color picker UI
}


export const THEMES: Theme[] = [
    { name: 'Jingga', primary: 'orange', hex: '#f97316' }, // Warna oranye default
    { name: 'Nila', primary: 'indigo', hex: '#4f46e5' },   // Biru keunguan
    { name: 'Zamrud', primary: 'emerald', hex: '#10b981' }, // Hijau
    { name: 'Mawar', primary: 'rose', hex: '#f43f5e' },    // Merah Jambu
];

export interface Category {
    id?: number;
    name: string;
    icon?: string;
    iconComponent?: React.ElementType;
}

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
    showFavoritesDrawer?: boolean;
    showOrdersDrawer?: boolean;
    showHistoryDrawer?: boolean;
    selectedProduct: Product | null;
}

export const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

export interface NotificationState {
    message: string;
    visible: boolean;
    type: 'success' | 'error';
}

export interface Hero {
    title?: string,
    sub_title: string,
    description: string,
    cta: string,
    image?: string,
}

export type VariantQuantities = Record<number | 'base', number>;