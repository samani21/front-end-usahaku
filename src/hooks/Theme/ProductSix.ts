import { Category, DrawerType, OrderItem, Product } from "./useProductCatalog";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Hero } from "@/lib/Types/Theme/theme";
import { Armchair, Bed, Box, CookingPot, Lamp, Sofa, Tag, Zap } from "lucide-react";

export const DUMMY_PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Espresso Signature",
        category: 'Kopi',
        price: 25000,
        description: "Espresso murni dari biji pilihan Arabika Gayo. Kuat dan kaya rasa.",
        imageUrl: "https://media.istockphoto.com/id/1222554435/id/foto/secangkir-kopi-dengan-busa-pulpen-kontrak-kosong-di-atas-meja-kayu.jpg?s=612x612&w=0&k=20&c=ICRR4Qs9qilefouKnoK1M9CHd15VhPZZgvLexu8wmNg=",
        isFavorite: true,
        variants: [
            { id: 101, name: "Single Shot", priceAdjustment: 0 },
            { id: 102, name: "Double Shot (+5k)", priceAdjustment: 5000 },
        ],
    },
    {
        id: 2,
        name: "Matcha Latte",
        category: 'Non-Kopi',
        price: 30000,
        description: "Perpaduan bubuk matcha berkualitas tinggi dengan susu segar.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1661756522906-5df7ee690868?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWF0Y2hhJTIwTGF0dGV8ZW58MHx8MHx8fDA%3D",
        isFavorite: false,
        variants: [
            // { id: 201, name: "Dingin", priceAdjustment: 0 },
            // { id: 202, name: "Panas", priceAdjustment: 0 },
        ],
    },
    {
        id: 3,
        name: "Roti Bakar Keju",
        category: 'Camilan',
        price: 18000,
        description: "Roti tawar dibakar renyah dengan topping keju melimpah dan susu kental manis.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1739906794633-71adada97314?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Um90aSUyMEJha2FyJTIwS2VqdXxlbnwwfHwwfHx8MA%3D%3D",
        isFavorite: true,
        variants: [
            { id: 301, name: "Original", priceAdjustment: 0 },
            { id: 302, name: "Double Keju (+5k)", priceAdjustment: 5000 },
        ],
    },
    {
        id: 4,
        name: "Kopi Susu Gula Aren",
        category: 'Best Seller',
        price: 28000,
        description: "Kopi susu kekinian dengan sentuhan manis gula aren khas nusantara.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1664647903742-52e5f954c28a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8S29waSUyMFN1c3UlMjBHdWxhJTIwQXJlbnxlbnwwfHwwfHx8MA%3D%3D",
        isFavorite: false,
        variants: [
            { id: 401, name: "Less Sugar", priceAdjustment: 0 },
            { id: 402, name: "Normal", priceAdjustment: 0 },
        ],
    },
];

export const DUMMY_CATEGORIES: Category[] = [
    { id: 1, name: 'Sofa', iconComponent: Sofa },
    { id: 2, name: 'Kursi', iconComponent: Armchair },
    { id: 3, name: 'Lampu', iconComponent: Lamp },
    { id: 4, name: 'Ranjang', iconComponent: Bed },
];


export const DUMMY_HISTORY: OrderItem[] = [
    {
        id: 1, productName: 'Keripik Kentang Original', basePrice: 13000, variantName: 'Besar (120g)', finalPrice: 52000, quantity: 4, date: "2025-12-06", status: "Selesai"
    },
    {
        id: 2, productName: 'Kopi Instan 3-in-1', basePrice: 12000, variantName: 'Box (10 Sachet)', finalPrice: 24000, quantity: 2, date: "2025-12-05", status: "Dibatalkan"
    },
];


export const DUMMY_HERO: Hero = {
    title: 'Premium Coffee & Meals',
    sub_title: 'Nikmati Kualitas, Dapatkan Rasa.',
    description: 'Jelajahi menu pilihan kami yang disiapkan dengan bahan-bahan terbaik dan penuh cinta.',
    cta: 'Lihat Semua Produk',
    image: 'https://tangerangkota.go.id/assets/storage/files/photos/34305ternyata-ini-fakta-menarik-dari-kopi-34305.jpeg'
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