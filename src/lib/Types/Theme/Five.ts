import { Armchair, Bed, Lamp, Menu, Sofa } from "lucide-react";


export interface Product {
    id: number;
    name: string;
    image_url: string;
    base_price: number;
    description: string;
    category: string;
    variants: {
        id: number;
        name: string;
        price_modifier: number;

    }[];
}
export const DUMMY_PRODUCTS = [
    {
        id: 1,
        name: "Sofa Minimalis Abu-abu",
        image_url: "https://images.unsplash.com/photo-1759722668253-1767030ad9b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U29mYSUyME1pbmltYWxpcyUyMEFidS1hYnV8ZW58MHx8MHx8fDA%3D",
        base_price: 6500000,
        description: "Sofa 3 dudukan yang nyaman dengan kain linen abu-abu berkualitas tinggi, cocok untuk ruang tamu modern.",
        category: "Sofa",
        variants: [
            { id: 101, name: "Linen Abu-abu", price_modifier: 0 },
            { id: 102, name: "Beludru Biru Tua", price_modifier: 500000 },
            { id: 103, name: "Kulit Sintetis Hitam", price_modifier: 1200000 },
        ],
    },
    {
        id: 2,
        name: "Meja Kopi Bundar Kayu Jati",
        image_url: "https://images.unsplash.com/photo-1692262089751-7e26b69ad8d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWVqYSUyMEtvcGklMjBCdW5kYXIlMjBLYXl1JTIwSmF0aXxlbnwwfHwwfHx8MA%3D%3D",
        base_price: 1800000,
        description: "Meja kopi bundar dari kayu jati solid dengan finishing alami. Tahan lama dan elegan.",
        category: "Meja",
        variants: [
            { id: 201, name: "Diameter 60cm (Jati)", price_modifier: 0 },
            { id: 202, name: "Diameter 80cm (Jati Premium)", price_modifier: 800000 },
        ],
    },
    {
        id: 3,
        name: "Lampu Lantai Baca Minimalis",
        image_url: "https://images.unsplash.com/photo-1759722667550-81316a23d723?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGFtcHUlMjBMYW50YWklMjBCYWNhJTIwTWluaW1hbGlzfGVufDB8fDB8fHww",
        base_price: 950000,
        description: "Lampu lantai dengan desain ramping dan kepala lampu yang dapat disesuaikan. Ideal untuk sudut baca.",
        category: "Lampu",
        variants: [
            { id: 301, name: "Tinggi 150cm (Hitam Doff)", price_modifier: 0 },
            { id: 302, name: "Tinggi 180cm (Emas)", price_modifier: 450000 },
        ],
    },
    {
        id: 4,
        name: "Kursi Makan Skandinavia",
        image_url: "https://plus.unsplash.com/premium_photo-1683141419137-db47132b8df4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8S3Vyc2klMjBNYWthbiUyMFNrYW5kaW5hdmlhfGVufDB8fDB8fHww",
        base_price: 450000,
        description: "Kursi bergaya Skandinavia dengan kaki kayu beech dan dudukan empuk. Sangat nyaman dan ringan.",
        category: "Kursi",
        variants: [
            { id: 401, name: "Dudukan Putih", price_modifier: 0 },
            { id: 402, name: "Dudukan Abu-abu", price_modifier: 50000 },
        ],
    },
    {
        id: 5,
        name: "Ranjang Tidur Kayu",
        image_url: "https://images.unsplash.com/photo-1688383454669-9f5cc5991778?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHJhbmphbmclMjBUaWR1ciUyMEtheXUlMjBFbWFzfGVufDB8fDB8fHww",
        base_price: 8900000,
        description: "Ranjang ukuran Queen dengan sandaran kepala berlapis. Memberikan nuansa mewah pada kamar tidur Anda.",
        category: "Ranjang",
        variants: [
            { id: 501, name: "Queen (160x200)", price_modifier: 0 },
            { id: 502, name: "King (180x200)", price_modifier: 1500000 },
        ],
    },
];

export const CATEGORIES = [
    { id: 'all', name: 'Semua', icon: Menu },
    { id: 'Sofa', name: 'Sofa', icon: Sofa },
    // FIX: Mengganti Chair dengan Armchair
    { id: 'Kursi', name: 'Kursi', icon: Armchair },
    { id: 'Lampu', name: 'Lampu', icon: Lamp },
    { id: 'Ranjang', name: 'Ranjang', icon: Bed },
];

// --- FUNGSI UTILITAS ---
export const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};
