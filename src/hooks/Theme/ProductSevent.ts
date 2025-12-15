import { Category, OrderItem, Product } from "./useProductCatalog";
import { Hero } from "@/lib/Types/Theme/theme";

export const DUMMY_PRODUCTS_SEVENT: Product[] = [
    {
        id: 1,
        category: 'Layanan Populer',
        name: 'Desain Logo Premium',
        price: 500000,
        description: 'Pembuatan identitas visual profesional, 3 revisi, file lengkap.',
        variants: [],
        imageUrl: '/theme/sevent/logo.png',
        isService: true,
        information: [
            "Kategori: Layanan Populer",
            "Estimasi Pengerjaan: 3-7 Hari Kerja",
            "Revisi: Maksimal 3x",
        ]
    },
    {
        id: 2,
        category: 'Layanan Populer',
        name: 'Website Portofolio Cepat',
        price: 1500000,
        description: 'Website 1 halaman responsif, hosting 1 tahun gratis.',
        variants: [],
        imageUrl: '/theme/sevent/portofolio.png',
        isService: true,
        information: [
            "Kategori: Layanan Populer",
            "Estimasi Pengerjaan: 3-7 Hari Kerja",
            "Revisi: Maksimal 3x",
        ]
    },
    {
        id: 3,
        category: 'Layanan Grafis',
        name: 'Kartu Nama Eksklusif',
        price: 100000,
        description: 'Desain 1 sisi,Desain 2 sisi, siap cetak dengan mockup 3D.',
        variants: [
            { id: 401, name: "1 Sisi", priceAdjustment: 0 },
            { id: 402, name: "2 Sisi", priceAdjustment: 20000 },
        ],
        isFavorite: true,
        imageUrl: '/theme/sevent/kartu_nama.png',
        isService: true,
        information: [
            "Kategori: Layanan Populer",
            "Estimasi Pengerjaan: 3-7 Hari Kerja",
            "Revisi: Maksimal 3x",
        ]
    },
    {
        id: 4,
        category: 'Layanan Grafis',
        name: 'Brosur Digital A4',
        price: 250000,
        description: 'Desain brosur lipat 3, file digital resolusi tinggi.',
        variants: [

        ],
        imageUrl: '/theme/sevent/brosur.png',
        isService: true,
        information: [
            "Kategori: Layanan Populer",
            "Estimasi Pengerjaan: 3-7 Hari Kerja",
            "Revisi: Maksimal 3x",
        ]
    },
    {
        id: 5,
        category: 'Paket Komplit',
        name: 'Paket Branding UMKM',
        price: 3500000,
        description: 'Logo, Kartu Nama, Akun Media Sosial, dan Template Post.',
        variants: [],
        imageUrl: '/theme/sevent/paket_umkm.png',
        isPackage: true,
        isService: true,
        information: [
            "Kategori: Layanan Populer",
            "Estimasi Pengerjaan: 3-7 Hari Kerja",
            "Revisi: Maksimal 3x",
        ]
    },
    {
        id: 6,
        category: 'Paket Komplit',
        name: 'Paket Peluncuran Startup',
        price: 8000000,
        description: 'Website, Logo, Desain UI/UX, dan Konsultasi Branding Awal.',
        variants: [],
        imageUrl: '/theme/sevent/paket_startup.png',
        isPackage: true,
        isService: true,
        information: [
        ]
    },
    {
        id: 7,
        category: 'Layanan Grafis',
        name: 'Ilustrasi Khusus',
        price: 450000,
        description: 'Ilustrasi vektor original untuk berbagai kebutuhan.',
        variants: [],
        imageUrl: '/theme/sevent/ilustrasi.png',
        isService: true,
        information: [
            "Kategori: Layanan Populer",
            "Estimasi Pengerjaan: 3-7 Hari Kerja",
            "Revisi: Maksimal 3x",
        ]
    },
    {
        id: 8,
        category: 'Layanan Populer',
        name: 'SEO Audit & Optimasi Dasar',
        price: 1200000,
        description: 'Analisis mendalam, rekomendasi perbaikan, dan implementasi dasar.',
        variants: [],
        imageUrl: '/theme/sevent/seo.png',
        isService: true,
        information: [
            "Kategori: Layanan Populer",
            "Estimasi Pengerjaan: 3-7 Hari Kerja",
            "Revisi: Maksimal 3x",
        ]
    },
];

export const DUMMY_CATEGORIES_SEVENT: Category[] = [

];


export const DUMMY_HISTORY_SEVENT: OrderItem[] = [

];


export const DUMMY_HERO_SEVENT: Hero = {
    // title: 'Premium Coffee & Meals',
    sub_title: ' Katalog Layanan Digital Terbaik',
    description: 'Temukan berbagai layanan desain, pengembangan web, dan marketing untuk mendukung bisnis Anda.',
    cta: 'Lihat Penawaran Spesial',
    // image: 'https://tangerangkota.go.id/assets/storage/files/photos/34305ternyata-ini-fakta-menarik-dari-kopi-34305.jpeg'
}
