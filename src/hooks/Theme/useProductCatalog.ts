export interface Variant {
    id: string;
    name: string;
    priceAdjustment: number;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    variants: Variant[];
    isFavorite: boolean;
}

export interface OrderItem {
    productId: number;
    productName: string;
    basePrice: number;
    variantName: string;
    finalPrice: number;
    quantity: number;
}

export type DrawerType = 'favorite' | 'cart' | 'history' | null;

export interface Category {
    id?: number;
    name: string,
    icon?: string,
    iconComponent?: React.ElementType;
}

