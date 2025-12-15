import { ChevronDown, Laptop, Smartphone, Tablet } from "lucide-react";
import { Category, OrderItem, Product } from "./useProductCatalog";
import { Hero } from "@/lib/Types/Theme/theme";

export const DUMMY_PRODUCTS_ONE: Product[] = [
    {
        id: 1,
        name: 'ROG Strix G16 (2025)',
        price: 25999000,
        description: 'Laptop berperforma tinggi untuk gaming dan editing profesional. Dilengkapi kartu grafis terbaru.',
        imageUrl: 'https://dlcdnwebimgs.asus.com/files/media/71a33ba1-1be2-44c1-9541-70b4c800abf8/v1/images/Strix_G16_KV_16x9.webp',
        category: 'Laptop',
        variants: [
            { id: 1, name: 'RAM 16GB / SSD 512GB', priceAdjustment: 0 },
            { id: 2, name: 'RAM 32GB / SSD 1TB (Premium)', priceAdjustment: 3000000 },
        ],
        isFavorite: false,
    },
    {
        id: 2,
        name: 'Smartphone Ultra X Pro',
        price: 8999000,
        description: 'Kamera terbaik di kelasnya dan daya tahan baterai seharian penuh. Desain ergonomis.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTJ2Ut9AwmYWiawxXkgbYtTqslz5Vvo7hxJA&s',
        category: 'Smartphone',
        variants: [
            { id: 3, name: 'Warna Hitam (Standar)', priceAdjustment: 0 },
            { id: 4, name: 'Warna Biru (Edisi Khusus)', priceAdjustment: 500000 },
        ],
        isFavorite: true,
    },
    {
        id: 3,
        name: 'Smartwatch Titan Series 3',
        price: 3450000,
        description: 'Melacak aktivitas olahraga, detak jantung, dan notifikasi pintar. Tahan air hingga 50m.',
        imageUrl: 'https://media.tatacroma.com/Croma%20Assets/Communication/Wearable%20Devices/Images/276060_0_e4dbrp.png',
        category: 'Aksesoris',
        variants: [
            { id: 5, name: 'Tali Karet', priceAdjustment: 0 },
            { id: 6, name: 'Tali Logam', priceAdjustment: 350000 },
        ],
        isFavorite: false,
    },
    {
        id: 4,
        name: 'Monitor UltraWide 34"',
        price: 6700000,
        description: 'Layar melengkung 144Hz untuk pengalaman kerja dan gaming yang imersif.',
        imageUrl: 'https://www.lg.com/content/dam/channel/wcms/id/monitor/ultrawide/34wr50qk/gallery/gallery/ultrawide-34wr50qk-gallery-04-2010.jpg',
        category: 'Monitor',
        variants: [

        ],
        isFavorite: false,
    },
];


export const DUMMY_CATEGORIES_ONE: Category[] = [
    { name: 'Laptop', iconComponent: Laptop },
    { name: 'Smartphone', iconComponent: Smartphone },
    { name: 'Monitor', iconComponent: Tablet },
    { name: 'Aksesoris', iconComponent: ChevronDown },
];

export const DUMMY_HISTORY_ONE: OrderItem[] = [
    { id: 1, productName: 'Smartphone Ultra X Pro', basePrice: 8999000, variantName: 'Warna Hitam (Standar)', finalPrice: 8999000, quantity: 1 },
    { id: 2, productName: 'Smartwatch Titan Series 3', basePrice: 3450000, variantName: 'Tali Karet', finalPrice: 3450000, quantity: 2 },
];

export const DUMMY_HERO_ONE: Hero = {
    // title: 'Penawaran Eksklusif',
    sub_title: 'Temukan Gadget Impianmu!',
    description: 'Jelajahi koleksi produk teknologi terbaru dengan harga terbaik dan varian terlengkap.',
    cta: ' Lihat Semua Produk',
    image: 'https://gizmologi.id/wp-content/uploads/2020/08/asus-rog-strix-g1517.jpg'
}
