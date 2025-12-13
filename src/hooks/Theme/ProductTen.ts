import { Category, DrawerType, OrderItem, Product } from "./useProductCatalog";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Hero } from "@/lib/Types/Theme/theme";
import { Scissors, WashingMachine, Zap } from "lucide-react";

export const DUMMY_PRODUCTS: Product[] = [
    {
        id: 1, category: 'Laundry',
        name: 'Cuci Kering Lipat Express',
        price: 15000,
        description: 'Pakaian selesai dalam 6 jam. Per KG.',
        imageUrl: 'https://images.unsplash.com/photo-1574057675080-6cdfd3225424?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEN1Y2klMjBLZXJpbmclMjBMaXBhdCUyMEV4cHJlc3N8ZW58MHx8MHx8fDA%3D',
        variants: [],
        isService: true
    },
    {
        id: 2, category: 'Laundry',
        name: 'Setrika Uap Premium',
        price: 12000,
        description: 'Setrika profesional, bebas kusut. Per KG.',
        imageUrl: 'https://media.istockphoto.com/id/2239558195/id/foto/setrika-uap-modern-bertumpu-pada-papan-setrika-di-ruangan-yang-terang-dengan-pencahayaan.webp?a=1&b=1&s=612x612&w=0&k=20&c=f0mFMIBA-ekEb3J5kUcBkZbz-N0-VH3K9HeEXb0Ktuw=',
        variants: [],
        isService: true
    },
    {
        id: 3, category: 'Barbershop',
        name: 'Potong Rambut Pria',
        price: 35000,
        description: 'Termasuk cuci dan styling.',
        imageUrl: 'https://plus.unsplash.com/premium_photo-1661288502656-7265af3e6b23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG90b25nJTIwUmFtYnV0JTIwUHJpYXxlbnwwfHwwfHx8MA%3D%3D',
        variants: [],
        isService: true
    },
    {
        id: 4, category: 'Barbershop',
        name: 'Pewarnaan Rambut',
        price: 150000,
        description: 'Konsultasi warna gratis.',
        imageUrl: 'https://media.istockphoto.com/id/1182128730/id/foto/tangan-penata-rambut-dengan-sarung-tangan-hitam-melukis-rambut-wanita-itu-dengan-warna-merah.webp?a=1&b=1&s=612x612&w=0&k=20&c=W83K6VsWtGvtxNQ5vUbNvhjd9zVHDG9mscmrnnkzNwQ=',
        variants: [],
        isService: true
    },
    {
        id: 5, category: 'Laundry',
        isPackage: true,
        name: 'Paket Hemat Bulanan',
        price: 250000,
        description: 'Gratis 5KG untuk total 50KG.',
        imageUrl: 'https://plus.unsplash.com/premium_photo-1663036970563-99624abc950e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8TGF1bmRyeXxlbnwwfHwwfHx8MA%3D%3D',
        variants: [],
        isService: true
    },
    {
        id: 6, category: 'Barbershop',
        isPackage: true,
        name: 'Paket Grooming Lengkap',
        price: 75000,
        description: 'Potong, cukur janggut, dan masker.',
        imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8QmFyYmVyfGVufDB8fDB8fHww',
        variants: [],
        isService: true
    },
];

export const DUMMY_CATEGORIES: Category[] = [
    {
        id: 1, name: 'Barbershop',
        isService: true,
        iconComponent: Scissors
    },
    {
        id: 2, name: 'Laundry',
        isService: true,
        iconComponent: WashingMachine
    },
    {
        id: 3, name: 'Aksesoris',
        isService: true,
        iconComponent: Zap
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
    const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [themeMode, setThemeMode] = useState<string>('Dark');
    const [isService, setIsService] = useState<boolean>(true);
    const [isPackage, setIsPackage] = useState<boolean | string>('All');
    const [clientQueueNumber, setClientQueueNumber] = useState<number>(0);
    const [currentQueueNumber, setCurrentQueueNumber] = useState<number>(1);
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
                } else {
                    return products.filter((p) => p?.isService);
                }
            } else {
                if (isPackage === true) {
                    return products.filter((p) => !p?.isService && p?.isPackage);
                } else if (isPackage === false) {
                    return products.filter((p) => !p?.isService && !p?.isPackage);
                } else {
                    return products.filter((p) => !p?.isService);
                }
            }

        }
        if (isService) {
            if (isPackage === true) {
                return products.filter((p) => p?.isService && p?.isPackage && p?.category === activeCategory);
            } else if (isPackage === false) {
                return products.filter((p) => p?.isService && !p?.isPackage && p?.category === activeCategory);
            } else {
                return products.filter((p) => p?.isService && p?.category === activeCategory);
            }
        } else {
            if (isPackage === true) {
                return products.filter((p) => !p?.isService && p?.isPackage && p?.category === activeCategory);
            } else if (isPackage === false) {
                return products.filter((p) => !p?.isService && !p?.isPackage && p?.category === activeCategory);
            } else {
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
        setClientQueueNumber(Math.floor(Math.random() * 50))
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
    }, [isService]);
    const handleNextQueue = () => {
        setCurrentQueueNumber(prev => prev + 1);
    };
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
        isPackage,
        clientQueueNumber,
        currentQueueNumber,
        handleNextQueue
    };
};