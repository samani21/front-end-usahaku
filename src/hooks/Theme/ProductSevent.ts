import { Category, DrawerType, OrderItem, Product } from "./useProductCatalog";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Hero } from "@/lib/Types/Theme/theme";
import { Armchair, Bed, Box, CookingPot, Lamp, Sofa, Tag, Zap } from "lucide-react";

export const DUMMY_PRODUCTS: Product[] = [
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

export const DUMMY_CATEGORIES: Category[] = [

];


export const DUMMY_HISTORY: OrderItem[] = [

];


export const DUMMY_HERO: Hero = {
    // title: 'Premium Coffee & Meals',
    sub_title: ' Katalog Layanan Digital Terbaik',
    description: 'Temukan berbagai layanan desain, pengembangan web, dan marketing untuk mendukung bisnis Anda.',
    cta: 'Lihat Penawaran Spesial',
    // image: 'https://tangerangkota.go.id/assets/storage/files/photos/34305ternyata-ini-fakta-menarik-dari-kopi-34305.jpeg'
}


export const useProductCatalog = () => {
    const [products, setProducts] = useState<Product[]>(DUMMY_PRODUCTS);
    const [cart, setCart] = useState<OrderItem[]>([]);
    const [history, setHistory] = useState<OrderItem[]>(DUMMY_HISTORY);
    const [hero, setHero] = useState<Hero | null>(null);
    const [categorie, setCategorie] = useState<Category[]>([]);
    const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [themeMode, setThemeMode] = useState<string>('Dark')
    useEffect(() => {
        setProducts(DUMMY_PRODUCTS)
        setHistory(DUMMY_HISTORY);
        setCategorie(DUMMY_CATEGORIES);
        setHero(DUMMY_HERO)
    }, []);

    const favoriteProducts: Product[] = useMemo(() => products.filter(p => p.isFavorite), [products]);
    const cartTotal: number = useMemo(() => cart.reduce((total, item) => total + item.finalPrice * item.quantity, 0), [cart]);
    const filteredProducts: Product[] = useMemo(() => {
        if (activeCategory === 'Semua') {
            return products;
        }
        return products.filter(p => p.category === activeCategory);
    }, [products, activeCategory]);

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
        themeMode
    };
};