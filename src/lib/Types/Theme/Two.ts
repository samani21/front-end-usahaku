export interface Variant {
    id: number;
    name: string;
    priceAdjustment: number;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    variants: Variant[];
}

export interface Category {
    id: number;
    name: string;
    icon: string;
}

// --- DATA DUMMY PRODUK & KATEGORI ---

export const DUMMY_CATEGORIES: Category[] = [
    { id: 1, name: 'Kopi', icon: '☕' },
    { id: 2, name: 'Teh', icon: '🍵' },
    { id: 3, name: 'Camilan', icon: '🍪' },
    { id: 4, name: 'Jus Segar', icon: '🥤' },
];

export const DUMMY_PRODUCTS: Product[] = [
    {
        id: 101,
        name: 'Espresso Blend Klasik',
        price: 35000,
        image: 'https://plus.unsplash.com/premium_photo-1675435646209-24c008f31d92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEVzcHJlc3NvJTIwQmxlbmQlMjBLbGFzaWt8ZW58MHx8MHx8fDA%3D',
        description: 'Campuran biji kopi Arabika dan Robusta dengan rasa yang seimbang dan aroma cokelat pekat.',
        category: 'Kopi',
        variants: [
            { id: 1, name: 'Reguler', priceAdjustment: 0 },
            { id: 2, name: 'Besar (+5K)', priceAdjustment: 5000 },
        ],
    },
    {
        id: 102,
        name: 'Teh Hijau Matcha Latte',
        price: 40000,
        image: 'https://images.unsplash.com/photo-1638978127697-e4d55e88a6e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VGVoJTIwSGlqYXUlMjBNYXRjaGElMjBMYXR0ZXxlbnwwfHwwfHx8MA%3D%3D',
        description: 'Matcha otentik dengan susu segar, memberikan energi dan ketenangan.',
        category: 'Teh',
        variants: [
            { id: 1, name: 'Dingin', priceAdjustment: 0 },
            { id: 2, name: 'Panas', priceAdjustment: 0 },
        ],
    },
    {
        id: 103,
        name: 'Kue Cokelat Lava',
        price: 25000,
        image: 'https://images.unsplash.com/photo-1617305855058-336d24456869?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8S3VlJTIwQ29rZWxhdCUyMExhdmF8ZW58MHx8MHx8fDA%3D',
        description: 'Kue cokelat lembut dengan lelehan cokelat di dalamnya.',
        category: 'Camilan',
        variants: [
            { id: 1, name: 'Satu Porsi', priceAdjustment: 0 },
            { id: 2, name: 'Paket Berdua (+15K)', priceAdjustment: 15000 },
        ],
    },
    {
        id: 104,
        name: 'Jus Mangga Tropis',
        price: 28000,
        image: 'https://media.istockphoto.com/id/1217751106/id/foto/jus-mangga-segar-dan-buah-mangga.jpg?s=612x612&w=0&k=20&c=1khIjBwIF2DKCVZzb_QL9pSBxxtfbc8en6eT8LFHKvY=',
        description: 'Mangga pilihan yang diblender dengan sedikit es. Menyegarkan!',
        category: 'Jus Segar',
        variants: [
            { id: 1, name: 'Normal Sugar', priceAdjustment: 0 },
            { id: 2, name: 'Less Sugar', priceAdjustment: 0 },
        ],
    },
    {
        id: 105,
        name: 'Kopi Susu Gula Aren',
        price: 38000,
        image: 'https://media.istockphoto.com/id/2225006703/id/foto/es-kopi-gula-aren-di-atas-meja-sementara-wanita-bekerja-di-laptop-di-kafe.jpg?s=612x612&w=0&k=20&c=fua5ftztVYJCL3emFTzLb5opUUzwTTTIjFoGw9QXehI=',
        description: 'Kopi susu dengan sentuhan manis gula aren lokal. Favorit!',
        category: 'Kopi',
        variants: [
            { id: 1, name: 'Gelas Kecil', priceAdjustment: 0 },
            { id: 2, name: 'Gelas Besar (+7K)', priceAdjustment: 7000 },
        ],
    },
];


// --- DATA DUMMY UNTUK MODAL ---
export const DUMMY_FAVORITES = [
    { id: 1, productName: 'Kopi Susu Gula Aren', price: 38000 },
    { id: 2, productName: 'Teh Hijau Matcha Latte', price: 40000 },
];

export const DUMMY_ORDERS = [
    { id: 1, productName: 'Espresso Blend Klasik', quantity: 2, price: 70000, variant: 'Reguler' },
    { id: 2, productName: 'Kue Cokelat Lava', quantity: 1, price: 25000, variant: 'Satu Porsi' },
];

export const DUMMY_HISTORY = [
    { id: 1, date: '10 Nov 2025', total: 120000, items: 3, status: 'Selesai' },
    { id: 2, date: '05 Nov 2025', total: 65000, items: 2, status: 'Dibatalkan' },
];


// --- SKEMA WARNA DINAMIS ---
export type Color = 'indigo' | 'green' | 'red' | 'blue' | 'yellow' | 'zinc';

export const COLOR_SCHEMES: Record<Color, string> = {
    indigo: 'Indigo (Default)',
    green: 'Emerald (Segar)',
    red: 'Rose (Hangat)',
    blue: 'Blue (Profesional)',
    yellow: 'Yellow (Profesional)',
    zinc: 'Zinc (Profesional)',
};

export const getColorClasses = (color: Color) => ({
    // Button background and hover
    primaryBg: `bg-${color}-600 hover:bg-${color}-700`,
    // Light background for Hero section
    lightBg: `bg-${color}-50`,
    // Text accents, price, category badges
    textAccent: `text-${color}-600`,
    // Header icon hover background
    hoverBgLight: `hover:bg-${color}-50`,
    // Active category button shadow
    shadowAccent: `shadow-${color}-300`,
    // Header title color
    titleText: `text-${color}-700`,
    // Icon color in header
    iconColor: `text-${color}-500`,
    // Active variant background in Detail Modal
    activeVariantBg: `bg-${color}-600`,
});


export type ActiveModal = 'none' | 'favorite' | 'order' | 'history' | 'detail';