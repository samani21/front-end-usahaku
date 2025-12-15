import { Category, OrderItem, Product } from "./useProductCatalog";
import { Hero } from "@/lib/Types/Theme/theme";
import { Scissors, WashingMachine, Zap } from "lucide-react";

export const DUMMY_PRODUCTS_TEN: Product[] = [
    {
        id: 1, category: 'Laundry',
        name: 'Cuci Kering Lipat Express',
        price: 15000,
        description: 'Pakaian selesai dalam 6 jam. Per KG.',
        imageUrl: 'https://images.unsplash.com/photo-1574057675080-6cdfd3225424?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEN1Y2klMjBLZXJpbmclMjBMaXBhdCUyMEV4cHJlc3N8ZW58MHx8MHx8fDA%3D',
        variants: [],
        isService: true
    },
    {
        id: 2, category: 'Laundry',
        name: 'Setrika Uap Premium',
        price: 12000,
        description: 'Setrika profesional, bebas kusut. Per KG.',
        imageUrl: 'https://media.istockphoto.com/id/2239558195/id/foto/setrika-uap-modern-bertumpu-pada-papan-setrika-di-ruangan-yang-terang-dengan-pencahayaan.webp?a=1&b=1&s=612x612&w=0&k=20&c=f0mFMIBA-ekEb3J5kUcBkZbz-N0-VH3K9HeEXb0Ktuw=',
        variants: [],
        isService: true
    },
    {
        id: 3, category: 'Barbershop',
        name: 'Potong Rambut Pria',
        price: 35000,
        description: 'Termasuk cuci dan styling.',
        imageUrl: 'https://plus.unsplash.com/premium_photo-1661288502656-7265af3e6b23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG90b25nJTIwUmFtYnV0JTIwUHJpYXxlbnwwfHwwfHx8MA%3D%3D',
        variants: [],
        isService: true
    },
    {
        id: 4, category: 'Barbershop',
        name: 'Pewarnaan Rambut',
        price: 150000,
        description: 'Konsultasi warna gratis.',
        imageUrl: 'https://media.istockphoto.com/id/1182128730/id/foto/tangan-penata-rambut-dengan-sarung-tangan-hitam-melukis-rambut-wanita-itu-dengan-warna-merah.webp?a=1&b=1&s=612x612&w=0&k=20&c=W83K6VsWtGvtxNQ5vUbNvhjd9zVHDG9mscmrnnkzNwQ=',
        variants: [],
        isService: true
    },
    {
        id: 5, category: 'Laundry',
        isPackage: true,
        name: 'Paket Hemat Bulanan',
        price: 250000,
        description: 'Gratis 5KG untuk total 50KG.',
        imageUrl: 'https://plus.unsplash.com/premium_photo-1663036970563-99624abc950e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8TGF1bmRyeXxlbnwwfHwwfHx8MA%3D%3D',
        variants: [],
        isService: true
    },
    {
        id: 6, category: 'Barbershop',
        isPackage: true,
        name: 'Paket Grooming Lengkap',
        price: 75000,
        description: 'Potong, cukur janggut, dan masker.',
        imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8QmFyYmVyfGVufDB8fDB8fHww',
        variants: [],
        isService: true
    },
];

export const DUMMY_CATEGORIES_TEN: Category[] = [
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


export const DUMMY_HISTORY_TEN: OrderItem[] = [

];


export const DUMMY_HERO_TEN: Hero = {
    // title: 'SOLUSI KREATIF & DESAIN',
    sub_title: ' Layanan Cepat & Terpercaya',
    description: 'Pesan jasa laundry, barbershop, dan lainnya dengan mudah. Layanan premium, harga terjangkau.',
    cta: 'Lihat Katalog Sekarang',
    // image: 'https://tangerangkota.go.id/assets/storage/files/photos/34305ternyata-ini-fakta-menarik-dari-kopi-34305.jpeg'
}