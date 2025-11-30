
export interface Variant {
    id: string;
    name: string;
    priceAdjustment: number; // Tambahan harga, bisa 0
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    // Menambahkan kategori 'package'
    category: 'main' | 'drink' | 'snack' | 'package';
    variants: Variant[];
}

export interface CartItem {
    product: Product;
    variant: Variant;
    quantity: number;
}

export interface HistoryItem extends CartItem {
    timestamp: string;
    orderNumber: number;
}

export type SidebarType = 'cart' | 'favorite' | 'history' | null;

// --- 2. DEFINISI TEMA WARNA ---

export interface Theme {
    id: string;
    name: string;
    primaryBg: string; // e.g., 'bg-red-700'
    primaryHover: string; // e.g., 'hover:bg-red-600'
    primaryBorder: string; // e.g., 'border-red-700'
    primaryText: string; // e.g., 'text-red-700'
    primaryBgLighter: string; // e.g., 'bg-red-100'
    secondaryBg: string; // e.g., 'bg-amber-500' (untuk tombol/pembelian)
    secondaryHover: string; // e.g., 'hover:bg-amber-600'
    secondaryText: string; // e.g., 'text-amber-300' (untuk ikon)
    heroFrom: string; // e.g., 'from-red-600'
}

export const THEMES: Theme[] = [
    // --- TEMA CERAH (Sudah Ada) ---
    {
        id: 'red', name: 'Merah Berani',
        primaryBg: 'bg-red-700', primaryHover: 'hover:bg-red-600', primaryBorder: 'border-red-700', primaryText: 'text-red-700', primaryBgLighter: 'bg-red-100',
        secondaryBg: 'bg-amber-500', secondaryHover: 'hover:bg-amber-600', secondaryText: 'text-amber-300',
        heroFrom: 'from-red-600'
    },
    {
        id: 'green', name: 'Hijau Segar',
        primaryBg: 'bg-green-700', primaryHover: 'hover:bg-green-600', primaryBorder: 'border-green-700', primaryText: 'text-green-700', primaryBgLighter: 'bg-green-100',
        secondaryBg: 'bg-lime-500', secondaryHover: 'hover:bg-lime-600', secondaryText: 'text-lime-300',
        heroFrom: 'from-green-600'
    },
    {
        id: 'blue', name: 'Biru Tenang',
        primaryBg: 'bg-blue-700', primaryHover: 'hover:bg-blue-600', primaryBorder: 'border-blue-700', primaryText: 'text-blue-700', primaryBgLighter: 'bg-blue-100',
        secondaryBg: 'bg-cyan-500', secondaryHover: 'hover:bg-cyan-600', secondaryText: 'text-cyan-300',
        heroFrom: 'from-blue-600'
    },
    {
        id: 'purple', name: 'Ungu Trendy',
        primaryBg: 'bg-purple-700', primaryHover: 'hover:bg-purple-600', primaryBorder: 'border-purple-700', primaryText: 'text-purple-700', primaryBgLighter: 'bg-purple-100',
        secondaryBg: 'bg-pink-500', secondaryHover: 'hover:bg-pink-600', secondaryText: 'text-pink-300',
        heroFrom: 'from-purple-600'
    },
    // --- TEMA MINIMALIS ---
    {
        id: 'charcoal', name: 'Minimalis Arang',
        primaryBg: 'bg-gray-900', primaryHover: 'hover:bg-gray-800', primaryBorder: 'border-gray-900', primaryText: 'text-gray-900', primaryBgLighter: 'bg-gray-200',
        secondaryBg: 'bg-teal-500', secondaryHover: 'hover:bg-teal-400', secondaryText: 'text-teal-300',
        heroFrom: 'from-gray-800'
    },
    {
        id: 'sand', name: 'Minimalis Pasir',
        primaryBg: 'bg-stone-700', primaryHover: 'hover:bg-stone-600', primaryBorder: 'border-stone-700', primaryText: 'text-stone-700', primaryBgLighter: 'bg-stone-100',
        secondaryBg: 'bg-orange-500', secondaryHover: 'hover:bg-orange-600', secondaryText: 'text-orange-300',
        heroFrom: 'from-stone-600'
    },
    {
        id: 'olive', name: 'Minimalis Zaitun',
        primaryBg: 'bg-green-900', primaryHover: 'hover:bg-green-800', primaryBorder: 'border-green-900', primaryText: 'text-green-900', primaryBgLighter: 'bg-green-100',
        secondaryBg: 'bg-yellow-500', secondaryHover: 'hover:bg-yellow-400', secondaryText: 'text-yellow-300',
        heroFrom: 'from-green-800'
    },
    {
        id: 'slate', name: 'Minimalis Abu-abu',
        primaryBg: 'bg-slate-700', primaryHover: 'hover:bg-slate-600', primaryBorder: 'border-slate-700', primaryText: 'text-slate-700', primaryBgLighter: 'bg-slate-100',
        secondaryBg: 'bg-fuchsia-500', secondaryHover: 'hover:bg-fuchsia-600', secondaryText: 'text-fuchsia-300',
        heroFrom: 'from-slate-600'
    },
];


// --- 3. DATA DUMMY (STATIS) ---

export const DUMMY_PRODUCTS: Product[] = [
    // --- MENU UTAMA, MINUMAN, CEMILAN (Data Lama) ---
    {
        id: 'p1',
        name: 'Nasi Goreng Spesial',
        price: 25000,
        description: 'Nasi goreng kampung dengan telur mata sapi, ayam suwir, dan acar. Rasa klasik yang memuaskan.',
        imageUrl: 'https://asset.kompas.com/crops/VcgvggZKE2VHqIAUp1pyHFXXYCs=/202x66:1000x599/1200x800/data/photo/2023/05/07/6456a450d2edd.jpg',
        category: 'main',
        variants: [
            { id: 'v1', name: 'Original', priceAdjustment: 0 },
            { id: 'v2', name: 'Pedas Gila', priceAdjustment: 2000 },
            { id: 'v3', name: 'Tanpa Telur', priceAdjustment: -1000 },
        ],
    },
    {
        id: 'p2',
        name: 'Kopi Susu Gula Aren',
        price: 18000,
        description: 'Perpaduan kopi, susu creamy, dan manisnya gula aren alami.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkHljUqHY8-FoRbAEJUtKaDcf0siOOwxhPvg&s',
        category: 'drink',
        variants: [
            { id: 'v4', name: 'Dingin (Es)', priceAdjustment: 0 },
            { id: 'v5', name: 'Panas', priceAdjustment: 0 },
            { id: 'v6', name: 'Extra Shot', priceAdjustment: 5000 },
        ],
    },
    {
        id: 'p3',
        name: 'Kentang Goreng Keju',
        price: 15000,
        description: 'Kentang goreng renyah disajikan dengan saus keju spesial.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Shake_shack_cheese_fries.jpg',
        category: 'snack',
        variants: [
            { id: 'v7', name: 'Porsi Kecil', priceAdjustment: 0 },
            { id: 'v8', name: 'Porsi Besar', priceAdjustment: 5000 },
        ],
    },
    {
        id: 'p4',
        name: 'Mie Ayam Bakso',
        price: 28000,
        description: 'Mie kenyal dengan topping ayam cincang dan bakso sapi urat.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPV-msWuAydYHqR_EDlrU6b_MTD-naSkiM1w&s',
        category: 'main',
        variants: [
            { id: 'v9', name: 'Level 1', priceAdjustment: 0 },
            { id: 'v10', name: 'Level 3 (Pedas)', priceAdjustment: 1000 },
        ],
    },
    // --- MENU PAKET HEMAT BARU ---
    {
        id: 'pk1',
        name: 'Paket Kenyang Berdua',
        price: 80000,
        description: '2 paket bakso nikmat + 2 es lemon timun mas',
        imageUrl: 'https://katalogpromosi.com/wp-content/uploads/2025/08/bakso_boedjangan_paket_kenyang_berdua_18092025.jpg',
        category: 'package',
        variants: [
            { id: 'pv1', name: 'Normal', priceAdjustment: 0 },
            { id: 'pv2', name: 'Upgrade Minuman', priceAdjustment: 5000 }, // Contoh upgrade
        ],
    },
    {
        id: 'pk2',
        name: 'Paket Ngemil Santai',
        price: 75000,
        description: 'Kentang mushu/singkong kentang + 2 ice kopi gula melaka + Thick Toast peanut butter',
        imageUrl: 'https://katalogpromosi.com/wp-content/uploads/2025/01/toast_box_sip_snack_23102025.jpg',
        category: 'package',
        variants: [
            { id: 'pv3', name: 'Original', priceAdjustment: 0 },
        ],
    },
];

export const DUMMY_HISTORY: HistoryItem[] = [
    {
        product: DUMMY_PRODUCTS[0],
        variant: DUMMY_PRODUCTS[0].variants[0],
        quantity: 1,
        timestamp: '2024-11-20 14:30',
        orderNumber: 125,
    },
    {
        product: DUMMY_PRODUCTS[1],
        variant: DUMMY_PRODUCTS[1].variants[1],
        quantity: 2,
        timestamp: '2024-11-20 14:30',
        orderNumber: 125,
    },
];

export const INITIAL_QUEUE_DATA = {
    orderQueue: 138,
    currentQueue: 135,
    tablePosition: 'Meja 07',
};

// --- 4. KOMPONEN PEMBANTU (HELPERS) ---

export const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};
