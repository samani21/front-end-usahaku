import { Category, DrawerType, OrderItem, Product } from "./useProductCatalog";
import { Header, Hero } from "@/lib/Theme/theme";
import { Box, CookingPot, Tag, Zap } from "lucide-react";

export const DUMMY_PRODUCTS_THREE: Product[] = [
    {
        id: 1,
        name: 'Mie Goreng Rasa Ayam Bawang',
        price: 3500,
        description: 'Mie instan dengan rasa ayam bawang klasik. Cocok untuk bekal atau sarapan cepat.',
        imageUrl: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//89/MTA-3452732/sedaap_mie-instant-mie-sedap-70gr-rasa-ayam-bawang_full02.jpg',
        category: 'Makanan Instan',
        isFavorite: true,
        variants: [
            { id: 101, name: 'Biasa', priceAdjustment: 0 },
            { id: 102, name: 'Jumbo Pack (+20%)', priceAdjustment: 1000 },
        ],
    },
    {
        id: 2,
        name: 'Teh Botol Dingin',
        price: 5000,
        description: 'Teh manis siap minum, sangat menyegarkan.',
        imageUrl: 'https://cdn.infobrand.id/assets/images/compressed/posts/2023/02/15/menelusuri-pemilik-teh-botol-sosro-minuman-legendaris-teman-di-saat-makan.webp',
        category: 'Minuman Segar',
        isFavorite: false,
        variants: [
            { id: 201, name: '330ml', priceAdjustment: 0 },
            { id: 202, name: '500ml', priceAdjustment: 2500 },
        ],
    },
    {
        id: 3,
        name: 'Biskuit Cokelat Premium',
        price: 12500,
        description: 'Biskuit renyah dengan lapisan cokelat tebal.',
        imageUrl: 'https://inafood.com/wp-content/uploads/2023/04/Okebis-Cokelat-28-resize-cover-min.png',
        category: 'Snack & Cokelat',
        isFavorite: true,
        variants: [
            { id: 301, name: 'Standar', priceAdjustment: 0 },
            { id: 302, name: 'Edisi Keluarga', priceAdjustment: 7500 },
        ],
    },
    {
        id: 4,
        name: 'Minyak Goreng Pouch 2L',
        price: 35000,
        description: 'Minyak goreng berkualitas tinggi untuk hasil masakan terbaik.',
        imageUrl: 'https://media.istockphoto.com/id/2172415199/id/foto/minyak-goreng-kelapa-dalam-kemasan-kantong-besar.jpg?s=612x612&w=0&k=20&c=9qwg85B53du_bG9EHphqywUehFE08zqb05IOhXkMrDU=',
        category: 'Kebutuhan Dapur',
        isFavorite: true,
        variants: [
        ],
    },
    {
        id: 5,
        name: 'Kopi Instan 3-in-1',
        price: 1500,
        description: 'Kopi, gula, dan krimer dalam satu sachet.',
        imageUrl: 'https://media.istockphoto.com/id/539834652/id/foto/nescafe-3-dalam-1.jpg?s=612x612&w=0&k=20&c=BWWQAKT5LeSyoE_Vh6lIyfKlGhRqDgdhfjUMt4O3NO0=',
        category: 'Minuman Segar',
        isFavorite: false,
        variants: [
            { id: 501, name: 'Per Sachet', priceAdjustment: 0 },
            { id: 502, name: 'Box (10 Sachet)', priceAdjustment: 12000 },
        ],
    },
    {
        id: 6,
        name: 'Keripik Kentang Original',
        price: 8000,
        description: 'Keripik kentang dengan bumbu asin alami.',
        imageUrl: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/90/MTA-182223612/japota_japota_keripik_kentang_original_68_gr_full01_989f2500.jpg',
        category: 'Snack & Cokelat',
        isFavorite: false,
        variants: [
            { id: 601, name: 'Kecil (60g)', priceAdjustment: 0 },
            { id: 602, name: 'Besar (120g)', priceAdjustment: 13000 },
        ],
    },
];

export const DUMMY_CATEGORIES_THREE: Category[] = [
    { id: 1, name: 'Makanan Instan', iconComponent: Box },
    { id: 2, name: 'Minuman Segar', iconComponent: Zap },
    { id: 3, name: 'Snack & Cokelat', iconComponent: Tag },
    { id: 4, name: 'Kebutuhan Dapur', iconComponent: CookingPot },
];


export const DUMMY_HISTORY_THREE: OrderItem[] = [
    {
        id: 1, productName: 'Keripik Kentang Original', basePrice: 13000, variantName: 'Besar (120g)', finalPrice: 52000, quantity: 4, date: "2025-12-06", status: "Selesai"
    },
    {
        id: 2, productName: 'Kopi Instan 3-in-1', basePrice: 12000, variantName: 'Box (10 Sachet)', finalPrice: 24000, quantity: 2, date: "2025-12-05", status: "Dibatalkan"
    },
];


export const DUMMY_HERO_THREE: Hero = {
    // title: 'Penawaran Eksklusif',
    sub_title: 'Hemat Akhir Pekan!',
    description: 'iskon hingga 50% untuk produk pilihan.',
    cta: 'Lihat Promo',
    image: 'https://img.freepik.com/premium-vector/special-sale-promo-3d-editable-text-effect_567288-1644.jpg',
    isFrame: true,
    frame: "Light",
    color: 'teal'
}


export const DUMMY_HEADER_THREE: Header = {
    span1: 'Minimarket ',
    span2: 'App',
    color: 'green',
    logo: "/logo/tema-3.svg",
    frameLogo: 'Light'
}