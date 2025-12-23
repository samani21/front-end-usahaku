import { Category, OrderItem, Product } from "./useProductCatalog";
import { Header, Hero } from "@/lib/Types/Theme/theme";
import { Armchair, Bed, Lamp, Sofa } from "lucide-react";

export const DUMMY_PRODUCTS_FIVE: Product[] = [
    {
        id: 1,
        name: "Sofa Minimalis Abu-abu",
        imageUrl: "https://images.unsplash.com/photo-1759722668253-1767030ad9b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U29mYSUyME1pbmltYWxpcyUyMEFidS1hYnV8ZW58MHx8MHx8fDA%3D",
        price: 6500000,
        description: "Sofa 3 dudukan yang nyaman dengan kain linen abu-abu berkualitas tinggi, cocok untuk ruang tamu modern.",
        category: "Sofa",
        isFavorite: false,
        variants: [
            { id: 101, name: "Linen Abu-abu", priceAdjustment: 0 },
            { id: 102, name: "Beludru Biru Tua", priceAdjustment: 500000 },
            { id: 103, name: "Kulit Sintetis Hitam", priceAdjustment: 1200000 },
        ],
    },
    {
        id: 2,
        name: "Meja Kopi Bundar Kayu Jati",
        imageUrl: "https://images.unsplash.com/photo-1692262089751-7e26b69ad8d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWVqYSUyMEtvcGklMjBCdW5kYXIlMjBLYXl1JTIwSmF0aXxlbnwwfHwwfHx8MA%3D%3D",
        price: 1800000,
        description: "Meja kopi bundar dari kayu jati solid dengan finishing alami. Tahan lama dan elegan.",
        category: "Meja",
        isFavorite: false,
        variants: [
            { id: 201, name: "Diameter 60cm (Jati)", priceAdjustment: 0 },
            { id: 202, name: "Diameter 80cm (Jati Premium)", priceAdjustment: 800000 },
        ],
    },
    {
        id: 3,
        name: "Lampu Lantai Baca Minimalis",
        imageUrl: "https://images.unsplash.com/photo-1759722667550-81316a23d723?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGFtcHUlMjBMYW50YWklMjBCYWNhJTIwTWluaW1hbGlzfGVufDB8fDB8fHww",
        price: 950000,
        description: "Lampu lantai dengan desain ramping dan kepala lampu yang dapat disesuaikan. Ideal untuk sudut baca.",
        category: "Lampu",
        isFavorite: false,
        variants: [
            { id: 301, name: "Tinggi 150cm (Hitam Doff)", priceAdjustment: 0 },
            { id: 302, name: "Tinggi 180cm (Emas)", priceAdjustment: 450000 },
        ],
    },
    {
        id: 4,
        name: "Kursi Makan Skandinavia",
        imageUrl: "https://plus.unsplash.com/premium_photo-1683141419137-db47132b8df4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8S3Vyc2klMjBNYWthbiUyMFNrYW5kaW5hdmlhfGVufDB8fDB8fHww",
        price: 450000,
        description: "Kursi bergaya Skandinavia dengan kaki kayu beech dan dudukan empuk. Sangat nyaman dan ringan.",
        category: "Kursi",
        isFavorite: false,
        variants: [
            { id: 401, name: "Dudukan Putih", priceAdjustment: 0 },
            { id: 402, name: "Dudukan Abu-abu", priceAdjustment: 50000 },
        ],
    },
    {
        id: 5,
        name: "Ranjang Tidur Kayu",
        imageUrl: "https://images.unsplash.com/photo-1688383454669-9f5cc5991778?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHJhbmphbmclMjBUaWR1ciUyMEtheXUlMjBFbWFzfGVufDB8fDB8fHww",
        price: 8900000,
        description: "Ranjang ukuran Queen dengan sandaran kepala berlapis. Memberikan nuansa mewah pada kamar tidur Anda.",
        category: "Ranjang",
        isFavorite: false,
        variants: [
            { id: 501, name: "Queen (160x200)", priceAdjustment: 0 },
            { id: 502, name: "King (180x200)", priceAdjustment: 1500000 },
        ],
    },
];

export const DUMMY_CATEGORIES_FIVE: Category[] = [
    { id: 1, name: 'Sofa', iconComponent: Sofa },
    { id: 2, name: 'Kursi', iconComponent: Armchair },
    { id: 3, name: 'Lampu', iconComponent: Lamp },
    { id: 4, name: 'Ranjang', iconComponent: Bed },
];


export const DUMMY_HISTORY_FIVE: OrderItem[] = [
    {
        id: 1, productName: 'Keripik Kentang Original', basePrice: 13000, variantName: 'Besar (120g)', finalPrice: 52000, quantity: 4, date: "2025-12-06", status: "Selesai"
    },
    {
        id: 2, productName: 'Kopi Instan 3-in-1', basePrice: 12000, variantName: 'Box (10 Sachet)', finalPrice: 24000, quantity: 2, date: "2025-12-05", status: "Dibatalkan"
    },
];


export const DUMMY_HERO_FIVE: Hero = {
    // title: 'Penawaran Eksklusif',
    sub_title: 'Desain Ruangan Impian Anda.',
    description: 'Koleksi furniture minimalis terbaik, fungsional, dan estetis untuk setiap sudut rumah.',
    cta: 'Lihat Semua Produk',
    image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNvZmF8ZW58MHx8MHx8fDA%3D',
    // isFrame: true,
    frame: "Light",
    color:'slate'
}

export const DUMMY_HEADER_FIVE: Header = {
    span1: 'Furniture.',
    // span2: 'Minimalis',
    color: 'zinc',
    // logo: "/logo/tema-2.svg",
    frameLogo: 'Light'
}