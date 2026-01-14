import { ChangeEvent } from "react";

export interface Variant {
    name: string;
    price: string | number; // String untuk input yang kosong/diketik, Number untuk konversi akhir
    stock: string | number; // String untuk input yang kosong/diketik, Number untuk konversi akhir
    image: File | null;
    imagePreviewUrl: string | null;
    id?: number
}

/** Tipe untuk State Formulir Produk */
export interface ProductForm {
    name: string;
    description?: string;
    price: string | number;
    stock: string | number;
    image: File | null;
    imagePreviewUrl: string | null;
    has_variant: 0 | 1; // 0 (Tidak) atau 1 (Ya)
    variants: Variant[];
    category?: number
}

/** Tipe untuk Objek Error Validasi */
export interface VariantErrors {
    name: string;
    price: string;
    stock: string;
}

export interface Errors {
    name: string;
    price: string;
    stock: string;
    variants: VariantErrors[];
}

// --- STATE AWAL ---

export const initialProductState: ProductForm = {
    name: '',
    price: '',
    stock: '',
    image: null,
    imagePreviewUrl: null,
    has_variant: 0,
    variants: [],
};

export const initialErrors: Errors = {
    name: '',
    price: '',
    stock: '',
    variants: [],
};

export interface Variants {
    image: string,
    name: string,
    id: number,
    product_id: number,
    stock: number,
    price: number,
}

export interface ResProduct {
    name: string,
    description: string,
    slug: string,
    image: string,
    qrcode: string,
    has_variant: boolean;
    is_active: boolean
    price: number,
    stock: number,
    id: number,
    variants: Variants[]
    price_discount?: number,
    final_price?: number,
    is_recomended?: boolean
    title_recomended?: string,
    color_recomended?: string,
    percent_discount?: number,
}