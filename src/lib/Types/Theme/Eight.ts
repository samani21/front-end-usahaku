export interface product {
    id: number,
    name: string,
    price: number,
    desc: string,
    category: string,
    type?: string,
    imageUrl: string,
    variants?: string[]
}



export const mockProducts: product[] = [
    {
        id: 1,
        name: "Kopi Arabika Premium",
        price: 125000,
        category: "Makanan & Minuman",
        desc: "Biji kopi Arabika pilihan dari dataran tinggi. Rasa kaya dengan aroma floral dan sedikit sentuhan cokelat. Sangat cocok untuk metode seduh manual seperti V60 atau Chemex. Diproses dengan metode semi-washed untuk mendapatkan keasaman yang seimbang. Kemasan 250g.",
        imageUrl: "https://images.unsplash.com/photo-1668923570518-9eb1f838f19b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a29waSUyMGFyYWJpa2F8ZW58MHx8MHx8fDA%3D",
        variants: ['Original',
            'Decaf',
            'Medium Roast']
    },

    {
        id: 2,
        name: "Kemeja Linen Oversize",
        price: 249000,
        category: "Pakaian",
        desc: "Kemeja nyaman dengan bahan linen alami, cocok untuk gaya santai di iklim tropis.Desain oversize yang modern dan airy.Tersedia dalam 4 warna pastel yang lembut.",
        imageUrl: "https://media.istockphoto.com/id/2236766372/id/foto/wanita-dengan-sweter-rajutan-lebar-krem-sweter-rajutan-leher-besar-dan-celana-panjang-coklat.webp?a=1&b=1&s=612x612&w=0&k=20&c=7mSX6rSDwGmwc9xOTq_Fb4UcFVMioWd3pzJSfRcta94=",
        variants: ['S (32)',
            'M (34)',
            'L (36)',
            'XL (38)']
    },

    {
        id: 3,
        name: "Headphone Nirkabel Z20",
        price: 780000,
        category: "Elektronik",
        desc: "Suara jernih dan bass mendalam,daya tahan baterai hingga 30 jam.Dilengkapi fitur noise cancelling adaptif.Desain lipat yang ergonomis,ringan dan nyaman digunakan seharian.",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGVhZHBob25lJTIwTmlya2FiZWx8ZW58MHx8MHx8fDA%3D",
        variants: ['Charcoal',
            'Putih',
            'Teal Metallic']
    },

    {
        id: 4,
        name: "Buku Novel Fiksi Fantasi",
        price: 85000,
        category: "Buku",
        desc: "Petualangan epik di dunia yang penuh sihir dan misteri. Buku pertama dari trilogi 'Chronicles of Eldoria'. Total 550 halaman dengan ilustrasi eksklusif.",
        imageUrl: "https://images.unsplash.com/photo-1759766199518-dbb5c6467707?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8QnVrdSUyME5vdmVsJTIwRmlrc2klMjBGYW50YXNpfGVufDB8fDB8fHww",
        variants: ['Softcover',
            'Hardcover']
    },

];

export const mockServices: product[] = [
    // Layanan Satuan (Individual)
    {
        id: 101,
        name: "Desain Logo Korporat",
        price: 500000,
        category: "Branding",
        type: "Individual",
        desc: "Pembuatan satu konsep logo utama dengan 2 kali revisi. Kami fokus pada identitas merek yang kuat dan mudah diingat.",
        imageUrl: "/theme/eight/logo.png"
    },
    {
        id: 104,
        name: "Desain Kartu Nama",
        price: 150000,
        category: "Branding",
        type: "Individual",
        desc: "Desain kartu nama satu sisi,siap cetak(file PDF/ AI).Termasuk 1x revisi minor.Desain elegan dan profesional.",
        imageUrl: "/theme/eight/kartu_nama.png"
    },

    {
        id: 105,
        name: "Pembuatan Iklan Digital",
        price: 250000,
        category: "Marketing",
        type: "Individual",
        desc: "Satu set banner iklan untuk media sosial atau Google Display Network. Kami bantu optimalkan copy dan visual.",
        imageUrl: "/theme/eight/seo.png"
    },


    // Paket Layanan (Package)
    {
        id: 102,
        name: "Platform E-commerce Kustom",
        price: 3500000,
        category: "Web Development",
        type: "Package",
        desc: "Desain UI/UX lengkap dan implementasi platform belanja online yang responsif dan aman.",
        imageUrl: "/theme/eight/e_commerce.png"
    },

    {
        id: 103,
        name: "Strategi Konten Digital",
        price: 1200000,
        category: "Marketing",
        type: "Package",
        desc: "Rencana konten 1 bulan,10 desain grafis & analitik performa.Meningkatkan engagement audiens secara signifikan.",
        imageUrl: "/theme/eight/content.png"
    },

    {
        id: 106,
        name: "Paket Branding Startup",
        price: 2500000,
        category: "Branding",
        type: "Package",
        desc: "Mencakup Logo Korporat, Kartu Nama, Kop Surat, dan Panduan Merek Lengkap.Solusi A - Z untuk identitas bisnis baru.",
        imageUrl: "/theme/eight/branding.png"
    },

];

// Definisi Tema Warna
export const colorThemes = {
    teal: { label: 'Teal (Default)', color: 'teal', hex: '#0D9488' },
    violet: { label: 'Violet', color: 'violet', hex: '#8B5CF6' },
    rose: { label: 'Rose', color: 'rose', hex: '#F43F5E' },
    blue: { label: 'Blue', color: 'blue', hex: '#3B82F6' },
    orange: { label: 'Orange', color: 'orange', hex: '#F97316' },
    zinc: { label: 'Zinc', color: 'zinc', hex: '#52525b' },
};

export type ColorKey = 'teal' | 'violet' | 'rose' | 'blue' | 'orange' | 'zinc';