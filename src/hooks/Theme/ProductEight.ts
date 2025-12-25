import { Category, DrawerType, OrderItem, Product } from "./useProductCatalog";
import { Header, Hero } from "@/lib/Types/Theme/theme";

export const DUMMY_PRODUCTS_EIGHT: Product[] = [
    {
        id: 1,
        name: "Kopi Arabika Premium",
        price: 125000,
        category: "Makanan & Minuman",
        isFavorite:true,
        description: "Biji kopi Arabika pilihan dari dataran tinggi. Rasa kaya dengan aroma floral dan sedikit sentuhan cokelat. Sangat cocok untuk metode seduh manual seperti V60 atau Chemex. Diproses dengan metode semi-washed untuk mendapatkan keasaman yang seimbang. Kemasan 250g.",
        imageUrl: "https://images.unsplash.com/photo-1668923570518-9eb1f838f19b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a29waSUyMGFyYWJpa2F8ZW58MHx8MHx8fDA%3D",
        variants: [
            { id: 101, name: "1kg", priceAdjustment: 0 },
            { id: 102, name: "15kg", priceAdjustment: 50000 },
        ],
    },

    {
        id: 2,
        name: "Kemeja Linen Oversize",
        price: 249000,
        category: "Pakaian",
        description: "Kemeja nyaman dengan bahan linen alami, cocok untuk gaya santai di iklim tropis.Desain oversize yang modern dan airy.Tersedia dalam 4 warna pastel yang lembut.",
        imageUrl: "https://media.istockphoto.com/id/2236766372/id/foto/wanita-dengan-sweter-rajutan-lebar-krem-sweter-rajutan-leher-besar-dan-celana-panjang-coklat.webp?a=1&b=1&s=612x612&w=0&k=20&c=7mSX6rSDwGmwc9xOTq_Fb4UcFVMioWd3pzJSfRcta94=",
        variants: []
    },

    {
        id: 3,
        name: "Headphone Nirkabel Z20",
        price: 780000,
        category: "Elektronik",
        description: "Suara jernih dan bass mendalam,daya tahan baterai hingga 30 jam.Dilengkapi fitur noise cancelling adaptif.Desain lipat yang ergonomis,ringan dan nyaman digunakan seharian.",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGVhZHBob25lJTIwTmlya2FiZWx8ZW58MHx8MHx8fDA%3D",
        variants: []
    },

    {
        id: 4,
        name: "Buku Novel Fiksi Fantasi",
        price: 85000,
        category: "Buku",
        description: "Petualangan epik di dunia yang penuh sihir dan misteri. Buku pertama dari trilogi 'Chronicles of Eldoria'. Total 550 halaman dengan ilustrasi eksklusif.",
        imageUrl: "https://images.unsplash.com/photo-1759766199518-dbb5c6467707?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8QnVrdSUyME5vdmVsJTIwRmlrc2klMjBGYW50YXNpfGVufDB8fDB8fHww",
        variants: []
    },
    {
        id: 101,
        name: "Desain Logo Korporat",
        price: 500000,
        category: "Branding",
        isPackage: false,
        description: "Pembuatan satu konsep logo utama dengan 2 kali revisi. Kami fokus pada identitas merek yang kuat dan mudah diingat.",
        imageUrl: "/theme/eight/logo.png",
        variants: [],
        isService: true,
        information: [
            " 1 Konsep Logo Utama",
            "2x Revisi Desain",
            "File Source (AI/EPS)",
            "PNG Transparan Resolusi Tinggi",
        ]
    },
    {
        id: 104,
        name: "Desain Kartu Nama",
        price: 150000,
        category: "Branding",
        isPackage: false,
        description: "Desain kartu nama satu sisi,siap cetak(file PDF/ AI).Termasuk 1x revisi minor.Desain elegan dan profesional.",
        imageUrl: "/theme/eight/kartu_nama.png",
        variants: [],
        isService: true,
        information: [
            "Desain 1 Sisi Eksklusif",
            "File Siap Cetak (PDF & AI)",
            "1x Revisi Warna & Tipografi",

        ]
    },

    {
        id: 105,
        name: "Pembuatan Iklan Digital",
        price: 250000,
        category: "Marketing",
        isPackage: false,
        description: "Satu set banner iklan untuk media sosial atau Google Display Network. Kami bantu optimalkan copy dan visual.",
        imageUrl: "/theme/eight/seo.png",
        variants: [],
        isService: true,
        information: [
            "1 Set Banner (3 Ukuran Berbeda)",
            "File JPG/PNG Optimasi Web",
            "Targeting Audiens Dasar",
        ]
    },


    // Paket Layanan (Package)
    {
        id: 102,
        name: "Platform E-commerce Kustom",
        price: 3500000,
        category: "Web Development",
        isPackage: true,
        description: "Desain UI/UX lengkap dan implementasi platform belanja online yang responsif dan aman.",
        imageUrl: "/theme/eight/e_commerce.png",
        variants: [],
        isService: true,
        information: [
            "Desain UI/UX Kustom",
            "Integrasi Payment Gateway",
            "Optimasi SEO Dasar",
            "Training Penggunaan Admin",
            "Responsif untuk Mobile & Desktop",
        ]
    },

    {
        id: 103,
        name: "Strategi Konten Digital",
        price: 1200000,
        category: "Marketing",
        isPackage: true,
        description: "Rencana konten 1 bulan,10 desain grafis & analitik performa.Meningkatkan engagement audiens secara signifikan.",
        imageUrl: "/theme/eight/content.png",
        variants: [],
        isService: true,
        information: [
            "Rencana Konten 1 Bulan",
            "10 Desain Grafis Postingan",
            "Analitik Performanya Mingguan",
            "Caption Writing Profesional",
        ]
    },

    {
        id: 106,
        name: "Paket Branding Startup",
        price: 2500000,
        category: "Branding",
        isPackage: true,
        description: "Mencakup Logo Korporat, Kartu Nama, Kop Surat, dan Panduan Merek Lengkap.Solusi A - Z untuk identitas bisnis baru.",
        imageUrl: "/theme/eight/branding.png",
        variants: [],
        isService: true,
        information: [
            "Logo Korporat Premium",
            "Desain Kartu Nama & Kop Surat",
            "Panduan Merek Lengkap (PDF)",
            "Template Media Sosial 3x",
        ]
    },
];

export const DUMMY_CATEGORIES_EIGHT: Category[] = [
    {
        id: 1, name: 'Web Development',
        isService: true
    },
    {
        id: 2, name: 'Marketing',
        isService: true
    },
    {
        id: 3, name: 'Branding',
        isService: true
    },
    {
        id: 4, name: 'Makanan & Minuman',
    },
    {
        id: 5, name: 'Pakaian',
    },
    {
        id: 6, name: 'Elektronik',
    }, {
        id: 7, name: 'Buku',
    },
];


export const DUMMY_HISTORY_EIGHT: OrderItem[] = [
    { id: 1, productName: 'Kemeja Linen Oversize', basePrice: 249000, variantName: '', finalPrice: 249000, quantity: 2 },
    { id: 2, productName: 'Desain Logo Korporat', basePrice: 500000, variantName: '', finalPrice: 500000, quantity: 1 },
    { id: 2, productName: 'Kopi Arabika Premium', basePrice: 125000, variantName: '1kg', finalPrice: 125000, quantity: 2 },
];


export const DUMMY_HERO_EIGHT: Hero = {
    // title: 'SOLUSI KREATIF & DESAIN',
    sub_title: 'Temukan Layanan Terbaik Anda',
    description: 'Potong rambut, laundry, atau lainnya. Semua dalam satu klik!',
    // cta: 'Lihat Penawaran Spesial',
    // image: 'https://tangerangkota.go.id/assets/storage/files/photos/34305ternyata-ini-fakta-menarik-dari-kopi-34305.jpeg'
    color: 'teal'
}


export const DUMMY_HEADER_EIGHT: Header = {
    span1: 'CATALOG ',
    span2: 'PRO.',
    color: 'teal',
    // logo: "/logo/tema-6.svg",
    frameLogo: 'Light'
}