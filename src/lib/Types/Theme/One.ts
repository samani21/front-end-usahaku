import { Hero, Product } from "./Theme";


export interface NotificationState {
    message: string;
    visible: boolean;
    type: 'success' | 'error';
}

export const DUMMY_PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Kopi Arabika Premium",
        basePrice: 55000,
        description: "Biji kopi Arabika pilihan dari dataran tinggi, aroma kaya dan rasa seimbang. Cocok untuk semua metode seduh, dari V60 hingga Espresso. Produk ini bersertifikat organik.",
        imageUrl: "https://images.unsplash.com/photo-1668923570518-9eb1f838f19b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a29waSUyMGFyYWJpa2F8ZW58MHx8MHx8fDA%3D",
        category: "Minuman",
        isFavorite: true,
        variants: [
            { id: 101, name: "250g Biji Utuh", priceAdjustment: 0 },
            { id: 102, name: "250g Bubuk Halus", priceAdjustment: 5000 },
            { id: 103, name: "500g Biji Utuh", priceAdjustment: 45000 },
        ],
    },
    {
        id: 2,
        name: "Roti Gandum Utuh",
        basePrice: 30000,
        description: "Roti sehat dengan serat tinggi, cocok untuk sarapan atau diet. Dibuat tanpa bahan pengawet dan kaya akan biji-bijian. Varian dengan biji bunga matahari menambah tekstur dan rasa.",
        imageUrl: "https://images.unsplash.com/photo-1537200275355-4f0c0714f777?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm90aSUyMGdhbmR1bXxlbnwwfHwwfHx8MA%3D%3D",
        category: "Makanan",
        isFavorite: false,
        variants: [
            { id: 201, name: "Ukuran Standar", priceAdjustment: 0 },
            { id: 202, name: "Tambahan Biji Matahari", priceAdjustment: 7000 },
        ],
    },
    {
        id: 3,
        name: "Aksesoris Meja Kerja",
        basePrice: 120000,
        description: "Set perlengkapan minimalis untuk meja kerja Anda. Tingkatkan produktivitas! Termasuk tempat pensil, alas mouse kulit premium, dan pengelola kabel.",
        imageUrl: "https://media.istockphoto.com/id/531737355/id/foto/pendidikan.webp?a=1&b=1&s=612x612&w=0&k=20&c=gjgWY3GrlRBFdd2Ojee4uZPjfFrnydz5cRkDlnThmD0=",
        category: "Peralatan",
        isFavorite: true,
        variants: [
            { id: 301, name: "Warna Hitam Doff", priceAdjustment: 0 },
            { id: 302, name: "Warna Putih Glossy", priceAdjustment: 10000 },
        ],
    },
    {
        id: 4,
        name: "Teh Hijau Jepang",
        basePrice: 45000,
        description: "Teh hijau premium impor dari Uji, Kyoto. Rasa otentik dan menyegarkan. Kaya antioksidan alami. Tersedia dalam kemasan kantong untuk kemudahan penyeduhan.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1694540110881-84add98c0a75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVoJTIwaGlqYXV8ZW58MHx8MHx8fDA%3D",
        category: "Minuman",
        isFavorite: false,
        variants: [
            { id: 401, name: "10 Kantong", priceAdjustment: 0 },
            { id: 402, name: "20 Kantong", priceAdjustment: 35000 },
        ],
    },
    {
        id: 5,
        name: "Botol Minum Stainless Steel",
        basePrice: 85000,
        description: "Botol minum isolasi ganda, menjaga suhu panas/dingin hingga 12 jam. Tersedia hanya dalam satu ukuran. Pilihan ideal untuk dibawa bepergian dan berolahraga.",
        imageUrl: "https://media.istockphoto.com/id/1395178102/id/foto/botol-aluminium-tipe-open-end-standar-mudah-perak-di-toko-ritel-atau-pusat-perbelanjaan.webp?a=1&b=1&s=612x612&w=0&k=20&c=ssctB7sPPvk7uPx-aEe7QZyxfVlD3ZedIIbiUuU2MqU=",
        category: "Peralatan",
        isFavorite: false,
        variants: [], // Varian kosong
    },
];

export const DUMMY_CATEGORIES: string[] = ["Semua", "Minuman", "Makanan", "Peralatan", "Baru"];

export const DUMMY_HERO: Hero = {
    title: 'Penawaran Eksklusif',
    sub_title: 'Diskon Hingga 30%',
    description: 'Pilih produk favorit Anda dari semua kategori dan nikmati harga terbaik.',
    cta: 'Belanja Sekarang'
}