export interface Variant {
    id: number;
    name: string;
    priceAdjustment: number;
    qty?: number;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    description: string;
    imageUrl: string;
    category?: string;
    stock?: number;
    variants: Variant[];
    isFavorite?: boolean;
    isPackage?: boolean;
    isService?: boolean;
    information?: string[];
    isRecomended?: boolean;
    titleRecomended?: string;
    colorRecomended?: string;
    discount?: number;
}

export interface OrderItem {
    id: number;
    productName: string;
    basePrice: number;
    variantName: string;
    finalPrice: number;
    quantity: number;
    date?: string;
    status?: string;
}

export type DrawerType = 'favorite' | 'cart' | 'history' | null;

export interface Category {
    id?: number;
    name: string,
    icon?: string,
    iconComponent?: React.ElementType;
    isService?: boolean;
}

export interface OrderHistory {
    items: OrderItem[];
    date: string;
    status: 'Selesai' | 'Diproses' | 'Batal';
}
