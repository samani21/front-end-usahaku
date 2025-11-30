import { Coffee, Sun, Utensils } from "lucide-react";

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


// --- Tipe Data Dummy ---

export interface Variant {
    id: number;
    name: string;
    price: number;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    variants: Variant[];
}

export interface Category {
    id: number;
    name: string;
    icon: React.ElementType;
}

export interface CartItem {
    productId: number;
    variantId: number;
    name: string;
    variantName: string;
    price: number;
    quantity: number;
}

// --- Data Dummy ---

export const DUMMY_PRODUCTS: Product[] = [
    { id: 1, name: "Nasi Goreng Spesial", price: 25000, description: "Nasi goreng dengan bumbu rahasia, telur, ayam suwir, dan kerupuk.", imageUrl: "https://sanex.co.id/wp-content/uploads/2025/03/2734-1.webp", variants: [{ id: 101, name: "Pedas Sedang", price: 0 }, { id: 102, name: "Pedas Maksimal", price: 2000 }, { id: 103, name: "Tanpa Pedas", price: 0 }] },
    { id: 2, name: "Kopi Latte Caramel", price: 35000, description: "Espresso dengan susu segar dan sirup karamel manis.", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRetEu1YfkmziSSdJVN5wdicRx4DOEhuLP_mw&s", variants: [{ id: 201, name: "Panas", price: 0 }, { id: 202, name: "Dingin", price: 3000 }] },
    { id: 3, name: "Mie Ayam Bakso", price: 22000, description: "Mie dengan topping ayam cincang gurih dan bakso sapi.", imageUrl: "https://www.shutterstock.com/shutterstock/photos/1046157601/display_1500/stock-photo-indonesian-food-mie-ayam-bakso-noodles-with-chicken-and-served-with-meatballs-1046157601.jpg", variants: [{ id: 301, name: "Porsi Jumbo", price: 5000 }, { id: 302, name: "Porsi Biasa", price: 0 }] },
    { id: 4, name: "Jus Alpukat", price: 18000, description: "Jus alpukat segar dengan sedikit susu kental manis.", imageUrl: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1708574230/attached_image/7-manfaat-jus-alpukat-bagi-kesehatan-yang-sayang-untuk-dilewatkan.jpg", variants: [{ id: 401, name: "Tambah Gula", price: 0 }, { id: 402, name: "Less Sugar", price: 0 }] },
];

export const DUMMY_CATEGORIES: Category[] = [
    { id: 1, name: "Makanan Berat", icon: Utensils },
    { id: 2, name: "Minuman Kopi", icon: Coffee },
    { id: 3, name: "Minuman Segar", icon: Sun },
];

export const DUMMY_FAVORITES: number[] = [1, 3]; // Product IDs that are favorited
export const DUMMY_ORDER_HISTORY = [
    { id: 1001, date: "2024-10-20", total: 75000, items: 3 },
    { id: 1002, date: "2024-10-18", total: 40000, items: 2 },
];
export const DUMMY_TABLE_NUMBER = "Meja A-05";
export const DUMMY_QUEUE_INFO = { current: 15, order: 18 };
