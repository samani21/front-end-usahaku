export interface ProductVariant {
    id: number;
    name: string; // Contoh: "Regular", "Large", "Dingin", "Panas"
    price_modifier: number; // Tambahan harga dari harga dasar
}

export interface Product {
    id: number;
    name: string;
    category: 'Kopi' | 'Non-Kopi' | 'Camilan' | 'Best Seller';
    base_price: number;
    description: string;
    image_url: string;
    variants: ProductVariant[];
}

export interface ProductColor {
    id: number;
    name: string;
    tailwindClass: string; // Contoh: "bg-red-500"
}

export interface OrderItem {
    product: Product;
    variant: ProductVariant;
    color: ProductColor; // Tambahkan warna ke item pesanan
    quantity: number;
    subtotal: number;
}

export interface ThemeColor {
    name: string;
    primary: string; // Warna dasar Tailwind (e.g., 'stone', 'teal')
    heroFrom: string; // Gradient start class
    heroTo: string;   // Gradient end class
}

// --- 2. DATA DUMMY & TEMA ---

export const DUMMY_PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Espresso Signature",
        category: 'Kopi',
        base_price: 25000,
        description: "Espresso murni dari biji pilihan Arabika Gayo. Kuat dan kaya rasa.",
        image_url: "https://media.istockphoto.com/id/1222554435/id/foto/secangkir-kopi-dengan-busa-pulpen-kontrak-kosong-di-atas-meja-kayu.jpg?s=612x612&w=0&k=20&c=ICRR4Qs9qilefouKnoK1M9CHd15VhPZZgvLexu8wmNg=",
        variants: [
            { id: 101, name: "Single Shot", price_modifier: 0 },
            { id: 102, name: "Double Shot (+5k)", price_modifier: 5000 },
        ],
    },
    {
        id: 2,
        name: "Matcha Latte",
        category: 'Non-Kopi',
        base_price: 30000,
        description: "Perpaduan bubuk matcha berkualitas tinggi dengan susu segar.",
        image_url: "https://plus.unsplash.com/premium_photo-1661756522906-5df7ee690868?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWF0Y2hhJTIwTGF0dGV8ZW58MHx8MHx8fDA%3D",
        variants: [
            { id: 201, name: "Dingin", price_modifier: 0 },
            { id: 202, name: "Panas", price_modifier: 0 },
        ],
    },
    {
        id: 3,
        name: "Roti Bakar Keju",
        category: 'Camilan',
        base_price: 18000,
        description: "Roti tawar dibakar renyah dengan topping keju melimpah dan susu kental manis.",
        image_url: "https://plus.unsplash.com/premium_photo-1739906794633-71adada97314?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Um90aSUyMEJha2FyJTIwS2VqdXxlbnwwfHwwfHx8MA%3D%3D",
        variants: [
            { id: 301, name: "Original", price_modifier: 0 },
            { id: 302, name: "Double Keju (+5k)", price_modifier: 5000 },
        ],
    },
    {
        id: 4,
        name: "Kopi Susu Gula Aren",
        category: 'Best Seller',
        base_price: 28000,
        description: "Kopi susu kekinian dengan sentuhan manis gula aren khas nusantara.",
        image_url: "https://plus.unsplash.com/premium_photo-1664647903742-52e5f954c28a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8S29waSUyMFN1c3UlMjBHdWxhJTIwQXJlbnxlbnwwfHwwfHx8MA%3D%3D",
        variants: [
            { id: 401, name: "Less Sugar", price_modifier: 0 },
            { id: 402, name: "Normal", price_modifier: 0 },
        ],
    },
];

export const ALL_CATEGORIES = ['Semua', 'Best Seller', 'Kopi', 'Non-Kopi', 'Camilan'];

export const DUMMY_COLORS: ProductColor[] = [
    { id: 1, name: "Putih", tailwindClass: "bg-gray-200" },
    { id: 2, name: "Hitam", tailwindClass: "bg-gray-800" },
    { id: 3, name: "Merah", tailwindClass: "bg-red-500" },
    { id: 4, name: "Biru", tailwindClass: "bg-blue-500" },
];

export const DUMMY_HISTORY: OrderItem[][] = [
    [{ product: DUMMY_PRODUCTS[3], variant: DUMMY_PRODUCTS[3].variants[1], quantity: 2, subtotal: (28000 + 0) * 2, color: DUMMY_COLORS[0] }],
    [{ product: DUMMY_PRODUCTS[1], variant: DUMMY_PRODUCTS[1].variants[0], quantity: 1, subtotal: 25000 * 1, color: DUMMY_COLORS[2] }],
];

// Opsi Warna Tema Minimalis (Tidak berubah dari permintaan terakhir)
export const THEMES: ThemeColor[] = [
    // Nuansa Cokelat Tanah / Earthy
    { name: 'Cokelat Tanah', primary: 'stone', heroFrom: 'from-stone-600', heroTo: 'to-gray-500' },
    // Nuansa Abu-abu Netral / Modern Gray
    { name: 'Abu-abu Netral', primary: 'neutral', heroFrom: 'from-neutral-500', heroTo: 'to-gray-700' },
    // Nuansa Hijau Sage / Minty Fresh
    { name: 'Hijau Sage (Mint)', primary: 'teal', heroFrom: 'from-teal-500', heroTo: 'to-emerald-700' },
    // Nuansa Biru Tua / Slate Modern
    { name: 'Biru Tua (Slate)', primary: 'slate', heroFrom: 'from-slate-600', heroTo: 'to-gray-800' },
];
