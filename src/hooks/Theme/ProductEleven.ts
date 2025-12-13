import { Category, DrawerType, OrderItem, Product } from "./useProductCatalog";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Hero } from "@/lib/Types/Theme/theme";
import { Coffee, Gift, Pizza, Scissors, Utensils, WashingMachine, Zap } from "lucide-react";

export const DUMMY_PRODUCTS: Product[] = [{
    id: 1,
    name: 'Nasi Goreng Spesial',
    price: 25000,
    description: 'Nasi goreng kampung dengan telur mata sapi, ayam suwir, dan acar. Rasa klasik yang memuaskan.',
    imageUrl: 'https://asset.kompas.com/crops/VcgvggZKE2VHqIAUp1pyHFXXYCs=/202x66:1000x599/1200x800/data/photo/2023/05/07/6456a450d2edd.jpg',
    category: 'Makanan Utama',
    variants: [
        { id: 1, name: 'Original', priceAdjustment: 0 },
        { id: 3, name: 'Pedas Gila', priceAdjustment: 2000 },
        { id: 2, name: 'Tanpa Telur', priceAdjustment: -1000 },
    ],
},
{
    id: 2,
    name: 'Kopi Susu Gula Aren',
    price: 18000,
    description: 'Perpaduan kopi, susu creamy, dan manisnya gula aren alami.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkHljUqHY8-FoRbAEJUtKaDcf0siOOwxhPvg&s',
    category: 'Minuman Segar',
    variants: [
        { id: 4, name: 'Dingin (Es)', priceAdjustment: 0 },
        { id: 5, name: 'Panas', priceAdjustment: 0 },
        { id: 6, name: 'Extra Shot', priceAdjustment: 5000 },
    ],
},
{
    id: 3,
    name: 'Kentang Goreng Keju',
    price: 15000,
    description: 'Kentang goreng renyah disajikan dengan saus keju spesial.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Shake_shack_cheese_fries.jpg',
    category: 'Cemilan',
    variants: [
        { id: 7, name: 'Porsi Kecil', priceAdjustment: 0 },
        { id: 9, name: 'Porsi Besar', priceAdjustment: 5000 },
    ],
},
{
    id: 4,
    name: 'Mie Ayam Bakso',
    price: 28000,
    description: 'Mie kenyal dengan topping ayam cincang dan bakso sapi urat.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPV-msWuAydYHqR_EDlrU6b_MTD-naSkiM1w&s',
    category: 'Makanan Utama',
    variants: [
        { id: 10, name: 'Level 1', priceAdjustment: 0 },
        { id: 11, name: 'Level 3 (Pedas)', priceAdjustment: 1000 },
    ],
},
// --- MENU PAKET HEMAT BARU ---
{
    id: 5,
    name: 'Paket Kenyang Berdua',
    price: 80000,
    description: '2 paket bakso nikmat + 2 es lemon timun mas',
    imageUrl: 'https://katalogpromosi.com/wp-content/uploads/2025/08/bakso_boedjangan_paket_kenyang_berdua_18092025.jpg',
    isPackage: true,
    category: 'Makanan Utama',
    variants: [
        { id: 11, name: 'Normal', priceAdjustment: 0 },
        { id: 12, name: 'Upgrade Minuman', priceAdjustment: 5000 }, // Contoh upgrade
    ],
},
{
    id: 6,
    name: 'Paket Ngemil Santai',
    price: 75000,
    description: 'Kentang mushu/singkong kentang + 2 ice kopi gula melaka + Thick Toast peanut butter',
    imageUrl: 'https://katalogpromosi.com/wp-content/uploads/2025/01/toast_box_sip_snack_23102025.jpg',
    isPackage: true,
    category: 'Cemilan',
    variants: [
        { id: 13, name: 'Original', priceAdjustment: 0 },
    ],
},];

export const DUMMY_CATEGORIES: Category[] = [
    {
        id: 2, name: 'Makanan Utama',
        iconComponent: Pizza,
    },
    {
        id: 3, name: 'Minuman Segar',
        iconComponent: Coffee,
    },
    {
        id: 4, name: 'Cemilan',
        iconComponent: Utensils,
    },
];


export const DUMMY_HISTORY: OrderItem[] = [

];


export const DUMMY_HERO: Hero = {
    // title: 'SOLUSI KREATIF & DESAIN',
    sub_title: ' Layanan Cepat & Terpercaya',
    description: 'Pesan jasa laundry, barbershop, dan lainnya dengan mudah. Layanan premium, harga terjangkau.',
    cta: 'Lihat Katalog Sekarang',
    // image: 'https://tangerangkota.go.id/assets/storage/files/photos/34305ternyata-ini-fakta-menarik-dari-kopi-34305.jpeg'
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
    const [isService, setIsService] = useState<boolean>(false);
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