import { Category, OrderItem, Product } from "./useProductCatalog";
import { Header, Hero } from "@/lib/Types/Theme/theme";
import { Armchair, Bed, Lamp, Sofa } from "lucide-react";

export const DUMMY_PRODUCTS_SIX: Product[] = [
    {
        id: 1,
        name: "Espresso Signature",
        category: 'Kopi',
        price: 25000,
        description: "Espresso murni dari biji pilihan Arabika Gayo. Kuat dan kaya rasa.",
        imageUrl: "https://media.istockphoto.com/id/1222554435/id/foto/secangkir-kopi-dengan-busa-pulpen-kontrak-kosong-di-atas-meja-kayu.jpg?s=612x612&w=0&k=20&c=ICRR4Qs9qilefouKnoK1M9CHd15VhPZZgvLexu8wmNg=",
        isFavorite: true,
        variants: [
            { id: 101, name: "Single Shot", priceAdjustment: 0 },
            { id: 102, name: "Double Shot (+5k)", priceAdjustment: 5000 },
        ],
    },
    {
        id: 2,
        name: "Matcha Latte",
        category: 'Non-Kopi',
        price: 30000,
        description: "Perpaduan bubuk matcha berkualitas tinggi dengan susu segar.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1661756522906-5df7ee690868?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWF0Y2hhJTIwTGF0dGV8ZW58MHx8MHx8fDA%3D",
        isFavorite: false,
        variants: [
            // { id: 201, name: "Dingin", priceAdjustment: 0 },
            // { id: 202, name: "Panas", priceAdjustment: 0 },
        ],
    },
    {
        id: 3,
        name: "Roti Bakar Keju",
        category: 'Camilan',
        price: 18000,
        description: "Roti tawar dibakar renyah dengan topping keju melimpah dan susu kental manis.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1739906794633-71adada97314?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Um90aSUyMEJha2FyJTIwS2VqdXxlbnwwfHwwfHx8MA%3D%3D",
        isFavorite: true,
        variants: [
            { id: 301, name: "Original", priceAdjustment: 0 },
            { id: 302, name: "Double Keju (+5k)", priceAdjustment: 5000 },
        ],
    },
    {
        id: 4,
        name: "Kopi Susu Gula Aren",
        category: 'Best Seller',
        price: 28000,
        description: "Kopi susu kekinian dengan sentuhan manis gula aren khas nusantara.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1664647903742-52e5f954c28a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8S29waSUyMFN1c3UlMjBHdWxhJTIwQXJlbnxlbnwwfHwwfHx8MA%3D%3D",
        isFavorite: false,
        variants: [
            { id: 401, name: "Less Sugar", priceAdjustment: 0 },
            { id: 402, name: "Normal", priceAdjustment: 0 },
        ],
    },
];

export const DUMMY_CATEGORIES_SIX: Category[] = [
    { id: 1, name: 'Kopi', iconComponent: Sofa },
    { id: 2, name: 'Non-Kopi', iconComponent: Armchair },
    { id: 3, name: 'Camilan', iconComponent: Lamp },
    { id: 4, name: 'Best Seller', iconComponent: Bed },
];


export const DUMMY_HISTORY_SIX: OrderItem[] = [
    {
        id: 1, productName: 'Keripik Kentang Original', basePrice: 13000, variantName: 'Besar (120g)', finalPrice: 52000, quantity: 4, date: "2025-12-06", status: "Selesai"
    },
    {
        id: 2, productName: 'Kopi Instan 3-in-1', basePrice: 12000, variantName: 'Box (10 Sachet)', finalPrice: 24000, quantity: 2, date: "2025-12-05", status: "Dibatalkan"
    },
];


export const DUMMY_HERO_SIX: Hero = {
    title: 'Premium Coffee & Meals',
    sub_title: 'Nikmati Kualitas, Dapatkan Rasa.',
    description: 'Jelajahi menu pilihan kami yang disiapkan dengan bahan-bahan terbaik dan penuh cinta.',
    cta: 'Lihat Semua Produk',
    image: 'https://tangerangkota.go.id/assets/storage/files/photos/34305ternyata-ini-fakta-menarik-dari-kopi-34305.jpeg',
    color: 'stone'
}

export const DUMMY_HEADER_SIX: Header = {
    span1: 'Kedai ',
    span2: 'Nusa.',
    color: 'zinc',
    logo: "/logo/tema-6.svg",
    frameLogo: 'Light'
}