import { Category, DrawerType, OrderItem, Product } from "./useProductCatalog";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Hero } from "@/lib/Types/Theme/theme";

export const DUMMY_PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Kopi Arabika Premium",
        price: 125000,
        category: "Makanan & Minuman",
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

export const DUMMY_CATEGORIES: Category[] = [
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


export const DUMMY_HISTORY: OrderItem[] = [

];


export const DUMMY_HERO: Hero = {
    title: 'SOLUSI KREATIF & DESAIN',
    sub_title: ' Katalog Layanan Digital Terbaik',
    description: 'Temukan berbagai layanan desain, pengembangan web, dan marketing untuk mendukung bisnis Anda.',
    cta: 'Lihat Penawaran Spesial',
    image: 'https://tangerangkota.go.id/assets/storage/files/photos/34305ternyata-ini-fakta-menarik-dari-kopi-34305.jpeg'
}


export const useProductCatalog = () => {
    const [products, setProducts] = useState<Product[]>(DUMMY_PRODUCTS);
    const [cart, setCart] = useState<OrderItem[]>([]);
    const [history, setHistory] = useState<OrderItem[]>(DUMMY_HISTORY);
    const [hero, setHero] = useState<Hero | null>(null);
    // const [categorie, setCategorie] = useState<Category[]>([]);
    const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [themeMode, setThemeMode] = useState<string>('Dark');
    const [isService, setIsService] = useState<boolean>(false);
    const [isPackage, setIsPackage] = useState<boolean | string>('All');
    useEffect(() => {
        setProducts(DUMMY_PRODUCTS)
        setHistory(DUMMY_HISTORY);
        setHero(DUMMY_HERO)
    }, []);
    const handleChangeBusiness = (value: boolean) => {
        setIsService(value)
    }
    const handlePackage = (val: boolean | string) => {
        setIsPackage(val)
    }
    const favoriteProducts: Product[] = useMemo(() => products.filter(p => p.isFavorite), [products]);
    const cartTotal: number = useMemo(() => cart.reduce((total, item) => total + item.finalPrice * item.quantity, 0), [cart]);
    const filteredProducts: Product[] = useMemo(() => {
        if (activeCategory === 'Semua') {
            if (isService) {
                if (isPackage === true) {
                    return products.filter((p) => p?.isService && p?.isPackage);
                } else if (isPackage === false) {
                    return products.filter((p) => p?.isService && !p?.isPackage);
                } {
                    return products.filter((p) => p?.isService);
                }
            } else {
                if (isPackage === true) {
                    return products.filter((p) => !p?.isService && p?.isPackage);
                } else if (isPackage === false) {
                    return products.filter((p) => !p?.isService && !p?.isPackage);
                } {
                    return products.filter((p) => !p?.isService);
                }
            }

        }
        if (isService) {
            if (isPackage === true) {
                return products.filter((p) => p?.isService && p?.isPackage && p?.category === activeCategory);
            } else if (isPackage === false) {
                return products.filter((p) => p?.isService && !p?.isPackage && p?.category === activeCategory);
            } {
                return products.filter((p) => p?.isService && p?.category === activeCategory);
            }
        } else {
            if (isPackage === true) {
                return products.filter((p) => !p?.isService && p?.isPackage && p?.category === activeCategory);
            } else if (isPackage === false) {
                return products.filter((p) => !p?.isService && !p?.isPackage && p?.category === activeCategory);
            } {
                return products.filter((p) => !p?.isService && p?.category === activeCategory);
            }
        }
    }, [products, activeCategory, isPackage, isService]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode)
        setThemeMode(isDarkMode ? "Light" : "Dark")
    }
    // Actions
    const openDrawer = useCallback((type: DrawerType) => setActiveDrawer(type), []);
    const closeDrawer = useCallback(() => setActiveDrawer(null), []);
    const openDetailModal = useCallback((product: Product) => {
        setSelectedProduct(product)
        setActiveDrawer(null)
    }, []);
    const closeDetailModal = useCallback(() => setSelectedProduct(null), []);
    const setActiveCategorySafe = useCallback((category: string) => setActiveCategory(category), []);

    const handleToggleFavorite = useCallback((productId: number) => {
        setProducts(prevProducts =>
            prevProducts?.map(p =>
                p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
            )
        );
    }, []);

    const handleAddToCart = useCallback((item: OrderItem) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart?.findIndex(
                i => i.id === item.id && i.variantName === item.variantName
            );

            if (existingItemIndex > -1) {
                return prevCart?.map((i, index) =>
                    index === existingItemIndex ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            }
            return [...prevCart, item];
        });
        // Simulasi checkout: item masuk ke history
        setHistory(prevHistory => [{ ...item, quantity: item.quantity, date: new Date().toISOString().split("T")[0], status: "Selesai" }, ...prevHistory].slice(0, 5));
    }, []);

    const handleRemoveFromCart = useCallback((indexToRemove: number) => {
        setCart(prevCart => prevCart.filter((_, i) => i !== indexToRemove));
    }, []);

    const categorie = useMemo(() => {
        if (isService) {
            return DUMMY_CATEGORIES?.filter((c) => c?.isService);
        } else {
            return DUMMY_CATEGORIES?.filter((c) => !c?.isService);
        }
    }, [isService])
    return {
        // State
        products,
        cart,
        history,
        activeDrawer,
        selectedProduct,
        activeCategory,
        categorie,
        hero,

        // Computed
        favoriteProducts,
        cartTotal,
        filteredProducts,

        // Actions
        openDrawer,
        closeDrawer,
        openDetailModal,
        closeDetailModal,
        handleToggleFavorite,
        handleAddToCart,
        handleRemoveFromCart,
        setActiveCategory: setActiveCategorySafe,
        toggleTheme,
        isDarkMode,
        themeMode,
        isService,
        handleChangeBusiness,
        handlePackage,
        isPackage
    };
};