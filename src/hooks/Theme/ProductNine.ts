import { Category, OrderItem, Product } from "./useProductCatalog";
import { Header, Hero } from "@/lib/Types/Theme/theme";
import { Scissors, WashingMachine, Zap } from "lucide-react";

export const DUMMY_PRODUCTS_NINE: Product[] = [
    {
        id: 101, name: "Potong Rambut Premium",
        price: 50000, description: "Termasuk cuci, pijat ringan, dan styling.",
        imageUrl: "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG90b25nJTIwcmFtYnV0fGVufDB8fDB8fHww",
        isService: true,
        category: 'Barbershop',
        variants: []
    },
    {
        id: 102, name: "Perawatan Janggut",
        price: 35000, description: "Trim, shaping, dan minyak perawatan janggut.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1721203653776-57aef8a96266?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RGV0YWlsJTIwUGVyYXdhdGFuJTIwSmFuZ2d1dHxlbnwwfHwwfHx8MA%3D%3D",
        isService: true,
        category: 'Barbershop',
        variants: []
    },
    // Layanan Laundry
    {
        id: 201, name: "Cuci Kering Satuan",
        price: 15000, description: "Pakaian favorit Anda bersih dan rapi dalam 24 jam.",
        imageUrl: "/theme/nine/cuci.png",
        isService: true,
        category: 'Laundry',
        variants: []
    },
    {
        id: 202, name: "Setrika Ekspres",
        price: 10000, description: "Setrika cepat per kilogram, siap dalam 3 jam.",
        imageUrl: "/theme/nine/setrika.png",
        isService: true,
        category: 'Laundry',
        variants: []
    },
    // Layanan Aksesoris
    {
        id: 301, name: "Pembersihan Sepatu",
        price: 45000, description: "Detailing sepatu premium, semua jenis bahan.",
        imageUrl: "/theme/nine/sepatu.png",
        isService: true,
        category: 'Aksesoris',
        variants: []
    },

    // Paket Layanan
    {
        id: 401, name: "Paket Ganteng Maksimal",
        price: 100000, description: "Potong Rambut + Perawatan Janggut + Masker Wajah.",
        imageUrl: "https://images.unsplash.com/photo-1593269233759-427ba69acca5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHBvdG9uZyUyMHJhbWJ1dHxlbnwwfHwwfHx8MA%3D%3D",
        isService: true,
        category: 'Barbershop',
        isPackage: true,
        variants: []
    },
    {
        id: 402, name: "Paket Bersih Kinclong",
        price: 75000, description: "5kg Cuci Kering + 5kg Setrika Reguler.",
        imageUrl: "/theme/nine/Paket.png",
        isService: true,
        category: 'Laundry',
        isPackage: true,
        variants: []
    },
];

export const DUMMY_CATEGORIES_NINE: Category[] = [
    {
        id: 1, name: 'Barbershop',
        isService: true,
        iconComponent: Scissors
    },
    {
        id: 2, name: 'Laundry',
        isService: true,
        iconComponent: WashingMachine
    },
    {
        id: 3, name: 'Aksesoris',
        isService: true,
        iconComponent: Zap
    },
];


export const DUMMY_HISTORY_NINE: OrderItem[] = [

];


export const DUMMY_HERO_NINE: Hero = {
    title: 'SOLUSI KREATIF & DESAIN',
    sub_title: ' Katalog Layanan Digital Terbaik',
    description: 'Temukan berbagai layanan desain, pengembangan web, dan marketing untuk mendukung bisnis Anda.',
    cta: 'Lihat Penawaran Spesial',
    image: 'https://tangerangkota.go.id/assets/storage/files/photos/34305ternyata-ini-fakta-menarik-dari-kopi-34305.jpeg',
    color: 'gray'
}
export const DUMMY_HEADER_NINE: Header = {
    span1: 'ServiceKu ',
    // span2: 'PRO.',
    color: 'sky',
    logo: "/logo/tema-9.svg",
    frameLogo: 'Light'
}