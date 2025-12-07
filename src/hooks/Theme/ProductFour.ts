import { Category, DrawerType, OrderItem, Product } from "./useProductCatalog";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Hero } from "@/lib/Types/Theme/theme";

export const DUMMY_PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Kopi Arabika Premium",
        price: 55000,
        description: "Biji kopi Arabika pilihan dari dataran tinggi, aroma kaya dan rasa seimbang. Cocok untuk semua metode seduh, dari V60 hingga Espresso. Produk ini bersertifikat organik.",
        imageUrl: "https://images.unsplash.com/photo-1668923570518-9eb1f838f19b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a29waSUyMGFyYWJpa2F8ZW58MHx8MHx8fDA%3D",
        category: "Minuman",
        isFavorite: true,
        variants: [
            { id: 101, name: "250g Biji Utuh", priceAdjustment: 0 },
            { id: 102, name: "250g Bubuk Halus", priceAdjustment: 5000 },
            { id: 103, name: "500g Biji Utuh", priceAdjustment: 45000 },
        ],
    },
    {
        id: 2,
        name: "Roti Gandum Utuh",
        price: 30000,
        description: "Roti sehat dengan serat tinggi, cocok untuk sarapan atau diet. Dibuat tanpa bahan pengawet dan kaya akan biji-bijian. Varian dengan biji bunga matahari menambah tekstur dan rasa.",
        imageUrl: "https://images.unsplash.com/photo-1537200275355-4f0c0714f777?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm90aSUyMGdhbmR1bXxlbnwwfHwwfHx8MA%3D%3D",
        category: "Makanan",
        isFavorite: false,
        variants: [
            { id: 201, name: "Ukuran Standar", priceAdjustment: 0 },
            { id: 202, name: "Tambahan Biji Matahari", priceAdjustment: 7000 },
        ],
    },
    {
        id: 3,
        name: "Aksesoris Meja Kerja",
        price: 120000,
        description: "Set perlengkapan minimalis untuk meja kerja Anda. Tingkatkan produktivitas! Termasuk tempat pensil, alas mouse kulit premium, dan pengelola kabel.",
        imageUrl: "https://media.istockphoto.com/id/531737355/id/foto/pendidikan.webp?a=1&b=1&s=612x612&w=0&k=20&c=gjgWY3GrlRBFdd2Ojee4uZPjfFrnydz5cRkDlnThmD0=",
        category: "Peralatan",
        isFavorite: true,
        variants: [
            { id: 301, name: "Warna Hitam Doff", priceAdjustment: 0 },
            { id: 302, name: "Warna Putih Glossy", priceAdjustment: 10000 },
        ],
    },
    {
        id: 4,
        name: "Teh Hijau Jepang",
        price: 45000,
        description: "Teh hijau premium impor dari Uji, Kyoto. Rasa otentik dan menyegarkan. Kaya antioksidan alami. Tersedia dalam kemasan kantong untuk kemudahan penyeduhan.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1694540110881-84add98c0a75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVoJTIwaGlqYXV8ZW58MHx8MHx8fDA%3D",
        category: "Minuman",
        isFavorite: false,
        variants: [
            { id: 401, name: "10 Kantong", priceAdjustment: 0 },
            { id: 402, name: "20 Kantong", priceAdjustment: 35000 },
        ],
    },
    {
        id: 5,
        name: "Botol Minum Stainless Steel",
        price: 85000,
        description: "Botol minum isolasi ganda, menjaga suhu panas/dingin hingga 12 jam. Tersedia hanya dalam satu ukuran. Pilihan ideal untuk dibawa bepergian dan berolahraga.",
        imageUrl: "https://media.istockphoto.com/id/1395178102/id/foto/botol-aluminium-tipe-open-end-standar-mudah-perak-di-toko-ritel-atau-pusat-perbelanjaan.webp?a=1&b=1&s=612x612&w=0&k=20&c=ssctB7sPPvk7uPx-aEe7QZyxfVlD3ZedIIbiUuU2MqU=",
        category: "Peralatan",
        isFavorite: false,
        variants: [], // Varian kosong
    },
];
export const DUMMY_CATEGORIES: Category[] = [
    {
        id: 2,
        name: "Minuman"
    },
    {
        id: 3,
        name: "Makanan"
    },
    {
        id: 4,
        name: "Peralatan"
    },
    {
        id: 5,
        name: "Baru"
    },
];

export const DUMMY_HISTORY: OrderItem[] = [
    {
        id: 1, productName: 'Jus Mangga Tropis', basePrice: 28000, variantName: 'Normal Sugar', finalPrice: 112000, quantity: 4, date: "2025-12-06", status: "Selesai"
    },
    {
        id: 2, productName: 'Kopi Susu Gula Aren', basePrice: 7000, variantName: 'Gelas Besar', finalPrice: 28000, quantity: 4, date: "2025-12-05", status: "Dibatalkan"
    },
];


export const DUMMY_HERO: Hero = {
    title: 'Penawaran Eksklusif',
    sub_title: 'Diskon Hingga 30%',
    description: 'Pilih produk favorit Anda dari semua kategori dan nikmati harga terbaik.',
    cta: 'Belanja Sekarang'
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