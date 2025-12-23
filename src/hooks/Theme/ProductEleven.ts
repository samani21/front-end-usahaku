import { Category, OrderItem, Product } from "./useProductCatalog";
import { Header, Hero } from "@/lib/Types/Theme/theme";
import { Coffee, Pizza, Utensils } from "lucide-react";

export const DUMMY_PRODUCTS_ELEVEN: Product[] = [{
    id: 1,
    name: 'Nasi Goreng Spesial',
    price: 25000,
    oldPrice: 32000,
    description: 'Nasi goreng kampung dengan telur mata sapi, ayam suwir, dan acar. Rasa klasik yang memuaskan.',
    imageUrl: 'https://asset.kompas.com/crops/VcgvggZKE2VHqIAUp1pyHFXXYCs=/202x66:1000x599/1200x800/data/photo/2023/05/07/6456a450d2edd.jpg',
    category: 'Makanan Utama',
    isRecomended: true,
    variants: [
        { id: 1, name: 'Original', priceAdjustment: 0 },
        { id: 3, name: 'Pedas Gila', priceAdjustment: 2000 },
        { id: 2, name: 'Tanpa Telur', priceAdjustment: -1000 },
    ],
},
{
    id: 2,
    name: 'Kopi Susu Gula Aren',
    price: 18000,
    description: 'Perpaduan kopi, susu creamy, dan manisnya gula aren alami.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkHljUqHY8-FoRbAEJUtKaDcf0siOOwxhPvg&s',
    category: 'Minuman Segar',
    isRecomended: true,
    variants: [
        { id: 4, name: 'Dingin (Es)', priceAdjustment: 0 },
        { id: 5, name: 'Panas', priceAdjustment: 0 },
        { id: 6, name: 'Extra Shot', priceAdjustment: 5000 },
    ],
},
{
    id: 3,
    name: 'Kentang Goreng Keju',
    price: 15000,
    description: 'Kentang goreng renyah disajikan dengan saus keju spesial.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Shake_shack_cheese_fries.jpg',
    category: 'Cemilan',
    variants: [
        { id: 7, name: 'Porsi Kecil', priceAdjustment: 0 },
        { id: 9, name: 'Porsi Besar', priceAdjustment: 5000 },
    ],
},
{
    id: 4,
    name: 'Mie Ayam Bakso',
    price: 28000,
    description: 'Mie kenyal dengan topping ayam cincang dan bakso sapi urat.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPV-msWuAydYHqR_EDlrU6b_MTD-naSkiM1w&s',
    category: 'Makanan Utama',
    variants: [
        { id: 10, name: 'Level 1', priceAdjustment: 0 },
        { id: 11, name: 'Level 3 (Pedas)', priceAdjustment: 1000 },
    ],
},
// --- MENU PAKET HEMAT BARU ---
{
    id: 5,
    name: 'Paket Kenyang Berdua',
    price: 80000,
    description: '2 paket bakso nikmat + 2 es lemon timun mas',
    imageUrl: 'https://katalogpromosi.com/wp-content/uploads/2025/08/bakso_boedjangan_paket_kenyang_berdua_18092025.jpg',
    isPackage: true,
    category: 'Makanan Utama',
    variants: [
        { id: 11, name: 'Normal', priceAdjustment: 0 },
        { id: 12, name: 'Upgrade Minuman', priceAdjustment: 5000 }, // Contoh upgrade
    ],
},
{
    id: 6,
    name: 'Paket Ngemil Santai',
    price: 75000,
    description: 'Kentang mushu/singkong kentang + 2 ice kopi gula melaka + Thick Toast peanut butter',
    imageUrl: 'https://katalogpromosi.com/wp-content/uploads/2025/01/toast_box_sip_snack_23102025.jpg',
    isPackage: true,
    category: 'Cemilan',
    variants: [
        { id: 13, name: 'Original', priceAdjustment: 0 },
    ],
},
{
    id: 7,
    name: "Kopi Latte Caramel",
    price: 35000,
    category: 'Minuman Segar',
    description: "Espresso dengan susu segar dan sirup karamel manis.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRetEu1YfkmziSSdJVN5wdicRx4DOEhuLP_mw&s",
    variants: [{
        id: 201,
        name: "Panas",
        priceAdjustment: 0
    }, {
        id: 202,
        name: "Dingin",
        priceAdjustment: 3000
    }]
},
{
    id: 8,
    name: "Jus Alpukat",
    price: 18000,
    description: "Jus alpukat segar dengan sedikit susu kental manis.",
    imageUrl: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1708574230/attached_image/7-manfaat-jus-alpukat-bagi-kesehatan-yang-sayang-untuk-dilewatkan.jpg",
    category: 'Minuman Segar',
    variants: [{
        id: 401,
        name: "Tambah Gula",
        priceAdjustment: 0
    }, {
        id: 402,
        name: "Less Sugar",
        priceAdjustment: 0
    }]
},
];

export const DUMMY_CATEGORIES_ELEVEN: Category[] = [
    {
        id: 2, name: 'Makanan Utama',
        iconComponent: Pizza,
    },
    {
        id: 3, name: 'Minuman Segar',
        iconComponent: Coffee,
    },
    {
        id: 4, name: 'Cemilan',
        iconComponent: Utensils,
    },
];


export const DUMMY_HISTORY_ELEVEN: OrderItem[] = [

];


export const DUMMY_HERO_ELEVEN: Hero = {
    title: 'REKOMENDASI HARI INI',
    sub_title: 'Nasi Goreng Spesial',
    description: 'Nasi goreng dengan bumbu rahasia, telur, ayam suwir, dan kerupuk.',
    cta: 'Pesan Sekarang',
    // image: 'https://tangerangkota.go.id/assets/storage/files/photos/34305ternyata-ini-fakta-menarik-dari-kopi-34305.jpeg',
    color: 'gray'
}


export const DUMMY_HEADER_ELEVEN: Header = {
    span1: 'Kedai  ',
    span2: 'Mantap.',
    color: 'rose',
    // logo: "/logo/tema-6.svg",
    frameLogo: 'Light'
}

export const DUMMY_HEADER_TWELVE: Header = {
    span1: 'Menu  ',
    span2: 'Digital.',
    color: 'orange',
    logo: "/logo/tema-12.svg",
    frameLogo: 'Light'
}
