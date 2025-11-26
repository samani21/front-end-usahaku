export const THEME_COLORS = [
    { name: 'Indigo', primary: 'indigo-600', primaryHover: 'indigo-700', bg: 'indigo-500', text: 'indigo-600' },
    { name: 'Hijau', primary: 'emerald-600', primaryHover: 'emerald-700', bg: 'emerald-500', text: 'emerald-600' },
    { name: 'Cyan', primary: 'cyan-600', primaryHover: 'cyan-700', bg: 'cyan-500', text: 'cyan-600' },
    { name: 'Rose', primary: 'rose-600', primaryHover: 'rose-700', bg: 'rose-500', text: 'rose-600' },
];

// Tipe untuk Context
export interface ThemeContextType {
    theme: typeof THEME_COLORS[0];
    setTheme: (theme: typeof THEME_COLORS[0]) => void;
}

export interface Service {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    type: 'Layanan' | 'Paket';
    category: 'Barbershop' | 'Laundry' | 'Aksesoris';
}

// --- 2. DATA DUMMY (Static Dummy Data) ---

export const DUMMY_SERVICES: Service[] = [
    // Layanan Barbershop
    {
        id: 101, name: "Potong Rambut Premium",
        price: 50000, description: "Termasuk cuci, pijat ringan, dan styling.",
        image: "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG90b25nJTIwcmFtYnV0fGVufDB8fDB8fHww",
        type: 'Layanan', category: 'Barbershop'
    },
    {
        id: 102, name: "Perawatan Janggut",
        price: 35000, description: "Trim, shaping, dan minyak perawatan janggut.",
        image: "https://plus.unsplash.com/premium_photo-1721203653776-57aef8a96266?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RGV0YWlsJTIwUGVyYXdhdGFuJTIwSmFuZ2d1dHxlbnwwfHwwfHx8MA%3D%3D",
        type: 'Layanan', category: 'Barbershop'
    },
    // Layanan Laundry
    {
        id: 201, name: "Cuci Kering Satuan",
        price: 15000, description: "Pakaian favorit Anda bersih dan rapi dalam 24 jam.",
        image: "/theme/nine/cuci.png",
        type: 'Layanan', category: 'Laundry'
    },
    {
        id: 202, name: "Setrika Ekspres",
        price: 10000, description: "Setrika cepat per kilogram, siap dalam 3 jam.",
        image: "/theme/nine/setrika.png",
        type: 'Layanan', category: 'Laundry'
    },
    // Layanan Aksesoris
    {
        id: 301, name: "Pembersihan Sepatu",
        price: 45000, description: "Detailing sepatu premium, semua jenis bahan.",
        image: "/theme/nine/sepatu.png",
        type: 'Layanan', category: 'Aksesoris'
    },

    // Paket Layanan
    {
        id: 401, name: "Paket Ganteng Maksimal",
        price: 100000, description: "Potong Rambut + Perawatan Janggut + Masker Wajah.",
        image: "https://images.unsplash.com/photo-1593269233759-427ba69acca5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHBvdG9uZyUyMHJhbWJ1dHxlbnwwfHwwfHx8MA%3D%3D",
        type: 'Paket', category: 'Barbershop'
    },
    {
        id: 402, name: "Paket Bersih Kinclong",
        price: 75000, description: "5kg Cuci Kering + 5kg Setrika Reguler.",
        image: "/theme/nine/paket.png",
        type: 'Paket', category: 'Laundry'
    },
];

export const CATEGORIES = ['Semua', 'Barbershop', 'Laundry', 'Aksesoris'];
