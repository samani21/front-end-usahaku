import { Category, DrawerType, OrderItem, Product } from "./useProductCatalog";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Hero } from "@/lib/Types/Theme/theme";
import { Scissors, WashingMachine, Zap } from "lucide-react";

export const DUMMY_PRODUCTS: Product[] = [
    {
        id: 101, name: "Potong Rambut Premium",
        price: 50000, description: "Termasuk cuci, pijat ringan, dan styling.",
        imageUrl: "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG90b25nJTIwcmFtYnV0fGVufDB8fDB8fHww",
        isService: true,
        category: 'Barbershop',
        variants: []
    },
    {
        id: 102, name: "Perawatan Janggut",
        price: 35000, description: "Trim, shaping, dan minyak perawatan janggut.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1721203653776-57aef8a96266?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RGV0YWlsJTIwUGVyYXdhdGFuJTIwSmFuZ2d1dHxlbnwwfHwwfHx8MA%3D%3D",
        isService: true,
        category: 'Barbershop',
        variants: []
    },
    // Layanan Laundry
    {
        id: 201, name: "Cuci Kering Satuan",
        price: 15000, description: "Pakaian favorit Anda bersih dan rapi dalam 24 jam.",
        imageUrl: "/theme/nine/cuci.png",
        isService: true,
        category: 'Laundry',
        variants: []
    },
    {
        id: 202, name: "Setrika Ekspres",
        price: 10000, description: "Setrika cepat per kilogram, siap dalam 3 jam.",
        imageUrl: "/theme/nine/setrika.png",
        isService: true,
        category: 'Laundry',
        variants: []
    },
    // Layanan Aksesoris
    {
        id: 301, name: "Pembersihan Sepatu",
        price: 45000, description: "Detailing sepatu premium, semua jenis bahan.",
        imageUrl: "/theme/nine/sepatu.png",
        isService: true,
        category: 'Aksesoris',
        variants: []
    },

    // Paket Layanan
    {
        id: 401, name: "Paket Ganteng Maksimal",
        price: 100000, description: "Potong Rambut + Perawatan Janggut + Masker Wajah.",
        imageUrl: "https://images.unsplash.com/photo-1593269233759-427ba69acca5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHBvdG9uZyUyMHJhbWJ1dHxlbnwwfHwwfHx8MA%3D%3D",
        isService: true,
        category: 'Barbershop',
        isPackage: true,
        variants: []
    },
    {
        id: 402, name: "Paket Bersih Kinclong",
        price: 75000, description: "5kg Cuci Kering + 5kg Setrika Reguler.",
        imageUrl: "/theme/nine/Paket.png",
        isService: true,
        category: 'Laundry',
        isPackage: true,
        variants: []
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
    // const [categorie, setCategorie] = useState<Category[]>([]);
    const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [themeMode, setThemeMode] = useState<string>('Dark');
    const [isService, setIsService] = useState<boolean>(true);
    const [isPackage, setIsPackage] = useState<boolean | string>('All');
    const [clientQueueNumber, setClientQueueNumber] = useState<number>(Math.floor(Math.random() * 50) + 1);
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
        setClientQueueNumber(clientQueueNumber + 1)
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