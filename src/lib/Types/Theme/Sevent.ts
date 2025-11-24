export interface Service {
    id: number;
    category: string;
    name: string;
    price: number;
    desc: string;
    image: string;
}

export interface ThemeConfig {
    name: string;
    mainBg: string;
    mainText: string;
    mainHoverBg: string;
    ringClass: string;
    cardAccentBg: string;
    cardAccentText: string;
    heroText: string;
}

export interface OrderItem {
    id: number;
    name: string;
    qty: number;
    price: number;
}

export interface HistoryItem {
    id: number;
    name: string;
    date: string;
}

export interface SimpleServiceItem {
    id: number;
    name: string;
}

// Tentukan tipe untuk modal yang aktif
export type ActiveModalType = 'favorite' | 'order' | 'history' | null;

// --- Theme Configuration (Typed) ---
export const themes: Record<string, ThemeConfig> = {
    indigo: {
        name: 'Indigo',
        mainBg: 'bg-indigo-600',
        mainText: 'text-indigo-600',
        mainHoverBg: 'hover:bg-indigo-700',
        ringClass: 'focus:ring-indigo-500',
        cardAccentBg: 'bg-blue-50',
        cardAccentText: 'text-blue-600',
        heroText: 'text-indigo-200',
    },
    teal: {
        name: 'Teal',
        mainBg: 'bg-teal-600',
        mainText: 'text-teal-600',
        mainHoverBg: 'hover:bg-teal-700',
        ringClass: 'focus:ring-teal-500',
        cardAccentBg: 'bg-cyan-50',
        cardAccentText: 'text-cyan-600',
        heroText: 'text-teal-200',
    },
    rose: {
        name: 'Rose',
        mainBg: 'bg-rose-600',
        mainText: 'text-rose-600',
        mainHoverBg: 'hover:bg-rose-700',
        ringClass: 'focus:ring-rose-500',
        cardAccentBg: 'bg-pink-50',
        cardAccentText: 'text-pink-600',
        heroText: 'text-rose-200',
    },
    sky: {
        name: 'Sky',
        mainBg: 'bg-sky-600',
        mainText: 'text-sky-600',
        mainHoverBg: 'hover:bg-sky-700',
        ringClass: 'focus:ring-sky-500',
        cardAccentBg: 'bg-blue-50',
        cardAccentText: 'text-blue-600',
        heroText: 'text-sky-200',
    },
};

// --- Data Dummy (Static) - Typed ---
export const dummyData: Service[] = [
    { id: 1, category: 'Layanan Populer', name: 'Desain Logo Premium', price: 500000, desc: 'Pembuatan identitas visual profesional, 3 revisi, file lengkap.', image: '/theme/sevent/logo.png' },
    { id: 2, category: 'Layanan Populer', name: 'Website Portofolio Cepat', price: 1500000, desc: 'Website 1 halaman responsif, hosting 1 tahun gratis.', image: '/theme/sevent/portofolio.png' },
    { id: 3, category: 'Layanan Grafis', name: 'Kartu Nama Eksklusif', price: 100000, desc: 'Desain 2 sisi, siap cetak dengan mockup 3D.', image: '/theme/sevent/kartu_nama.png' },
    { id: 4, category: 'Layanan Grafis', name: 'Brosur Digital A4', price: 250000, desc: 'Desain brosur lipat 3, file digital resolusi tinggi.', image: '/theme/sevent/brosur.png' },
    { id: 5, category: 'Paket Komplit', name: 'Paket Branding UMKM', price: 3500000, desc: 'Logo, Kartu Nama, Akun Media Sosial, dan Template Post.', image: '/theme/sevent/paket_umkm.png' },
    { id: 6, category: 'Paket Komplit', name: 'Paket Peluncuran Startup', price: 8000000, desc: 'Website, Logo, Desain UI/UX, dan Konsultasi Branding Awal.', image: '/theme/sevent/paket_startup.png' },
    { id: 7, category: 'Layanan Grafis', name: 'Ilustrasi Khusus', price: 450000, desc: 'Ilustrasi vektor original untuk berbagai kebutuhan.', image: '/theme/sevent/ilustrasi.png' },
    { id: 8, category: 'Layanan Populer', name: 'SEO Audit & Optimasi Dasar', price: 1200000, desc: 'Analisis mendalam, rekomendasi perbaikan, dan implementasi dasar.', image: '/theme/sevent/seo.png' },
];

export const allCategories: string[] = ['Semua Kategori', ...new Set(dummyData.map(item => item.category))];
export const packages: Service[] = dummyData.filter(item => item.category === 'Paket Komplit');
