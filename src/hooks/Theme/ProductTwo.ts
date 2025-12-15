import { Category, DrawerType, OrderItem, Product } from "./useProductCatalog";
import { Hero } from "@/lib/Types/Theme/theme";

export const DUMMY_PRODUCTS_TWO: Product[] = [
    {
        id: 101,
        name: 'Espresso Blend Klasik',
        price: 35000,
        description: 'Campuran biji kopi Arabika dan Robusta dengan rasa yang seimbang dan aroma cokelat pekat.',
        imageUrl: 'https://plus.unsplash.com/premium_photo-1675435646209-24c008f31d92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEVzcHJlc3NvJTIwQmxlbmQlMjBLbGFzaWt8ZW58MHx8MHx8fDA%3D',
        category: 'Kopi',
        isFavorite: true,
        variants: [
            { id: 1, name: 'Reguler', priceAdjustment: 0 },
            { id: 2, name: 'Besar (+5K)', priceAdjustment: 5000 },
        ],
    },
    {
        id: 102,
        name: 'Teh Hijau Matcha Latte',
        price: 40000,
        imageUrl: 'https://images.unsplash.com/photo-1638978127697-e4d55e88a6e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VGVoJTIwSGlqYXUlMjBNYXRjaGElMjBMYXR0ZXxlbnwwfHwwfHx8MA%3D%3D',
        description: 'Matcha otentik dengan susu segar, memberikan energi dan ketenangan.',
        category: 'Teh',
        isFavorite: false,
        variants: [
            { id: 1, name: 'Dingin', priceAdjustment: 0 },
            { id: 2, name: 'Panas', priceAdjustment: 0 },
        ],
    },
    {
        id: 103,
        name: 'Kue Cokelat Lava',
        price: 25000,
        imageUrl: 'https://images.unsplash.com/photo-1617305855058-336d24456869?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8S3VlJTIwQ29rZWxhdCUyMExhdmF8ZW58MHx8MHx8fDA%3D',
        description: 'Kue cokelat lembut dengan lelehan cokelat di dalamnya.',
        category: 'Camilan',
        isFavorite: false,
        variants: [

        ],
    },
    {
        id: 104,
        name: 'Jus Mangga Tropis',
        price: 28000,
        imageUrl: 'https://media.istockphoto.com/id/1217751106/id/foto/jus-mangga-segar-dan-buah-mangga.jpg?s=612x612&w=0&k=20&c=1khIjBwIF2DKCVZzb_QL9pSBxxtfbc8en6eT8LFHKvY=',
        description: 'Mangga pilihan yang diblender dengan sedikit es. Menyegarkan!',
        category: 'Jus Segar',
        isFavorite: true,
        variants: [
            { id: 1, name: 'Normal Sugar', priceAdjustment: 0 },
            { id: 2, name: 'Less Sugar', priceAdjustment: 0 },
        ],
    },
    {
        id: 105,
        name: 'Kopi Susu Gula Aren',
        price: 38000,
        imageUrl: 'https://media.istockphoto.com/id/2225006703/id/foto/es-kopi-gula-aren-di-atas-meja-sementara-wanita-bekerja-di-laptop-di-kafe.jpg?s=612x612&w=0&k=20&c=fua5ftztVYJCL3emFTzLb5opUUzwTTTIjFoGw9QXehI=',
        description: 'Kopi susu dengan sentuhan manis gula aren lokal. Favorit!',
        category: 'Kopi',
        isFavorite: false,
        variants: [
            { id: 1, name: 'Gelas Kecil', priceAdjustment: 0 },
            { id: 2, name: 'Gelas Besar', priceAdjustment: 7000 },
        ],
    },
];
export const DUMMY_CATEGORIES_TWO: Category[] = [
    { id: 1, name: 'Kopi', icon: '☕' },
    { id: 2, name: 'Teh', icon: '🍵' },
    { id: 3, name: 'Camilan', icon: '🍪' },
    { id: 4, name: 'Jus Segar', icon: '🥤' },
];


export const DUMMY_HISTORY_TWO: OrderItem[] = [
    {
        id: 1, productName: 'Jus Mangga Tropis', basePrice: 28000, variantName: 'Normal Sugar', finalPrice: 112000, quantity: 4, date: "2025-12-06", status: "Selesai"
    },
    {
        id: 2, productName: 'Kopi Susu Gula Aren', basePrice: 7000, variantName: 'Gelas Besar', finalPrice: 28000, quantity: 4, date: "2025-12-05", status: "Dibatalkan"
    },
];


export const DUMMY_HERO_TWO: Hero = {
    // title: 'Penawaran Eksklusif',
    sub_title: 'Diskon Spesial Akhir Pekan!',
    description: 'Nikmati potongan harga 20% untuk semua kategori produk favorit Anda. Jangan sampai terlewat!',
    cta: 'Lihat Penawaran',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2_lyoTTWPt-5OvkGn5xTKTpJ2EWDWTMwJxA&s'
}
