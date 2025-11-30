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
    title: string,
    sub_title: string,
    description: string,
    cta: string,
}