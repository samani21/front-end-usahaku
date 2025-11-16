import { ChangeEvent } from "react";

export interface Variant {
    name: string;
    price: string | number; // String untuk input yang kosong/diketik, Number untuk konversi akhir
    stock: string | number; // String untuk input yang kosong/diketik, Number untuk konversi akhir
    image: File | null;
    imagePreviewUrl: string | null;
}

/** Tipe untuk State Formulir Produk */
export interface ProductForm {
    name: string;
    description: string;
    price: string | number;
    stock: string | number;
    image: File | null;
    imagePreviewUrl: string | null;
    has_variant: 0 | 1; // 0 (Tidak) atau 1 (Ya)
    variants: Variant[];
}

/** Tipe untuk Objek Error Validasi */
export interface VariantErrors {
    name: string;
    price: string;
    stock: string;
}

export interface Errors {
    name: string;
    description: string;
    price: string;
    stock: string;
    variants: VariantErrors[];
}

// --- STATE AWAL ---

export const initialProductState: ProductForm = {
    name: '',
    description: '',
    price: '',
    stock: '',
    image: null,
    imagePreviewUrl: null,
    has_variant: 0,
    variants: [],
};

export const initialErrors: Errors = {
    name: '',
    description: '',
    price: '',
    stock: '',
    variants: [],
};
