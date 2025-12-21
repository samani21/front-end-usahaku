import { Category, DrawerType, OrderItem, Product } from './useProductCatalog';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Header, Hero } from '@/lib/Types/Theme/theme';
import { DEFAULT_DUMMY_THEME, DUMMY_THEME_MAP } from './dummyThemeMap';

/* ===================== Helpers ===================== */
const filterProducts = (
    products: Product[],
    {
        category,
        isService,
        isPackage,
    }: {
        category: string;
        isService: boolean;
        isPackage: boolean | string;
    }
) => {
    return products.filter((p) => {
        if (p.isService !== isService) return false;
        if (category !== 'Semua' && p.category !== category) return false;
        if (isPackage === true && !p.isPackage) return false;
        if (isPackage === false && p.isPackage) return false;
        return true;
    });
};

export const useProductCatalogs = (theme?: number, service?: boolean) => {

    const themeData = useMemo(() => {
        return typeof theme === 'number' && DUMMY_THEME_MAP[theme]
            ? DUMMY_THEME_MAP[theme]
            : DEFAULT_DUMMY_THEME;
    }, [theme]);

    /* ===================== State ===================== */
    const [products, setProducts] = useState<Product[]>(themeData.products);
    const [cart, setCart] = useState<OrderItem[]>([]);
    const [history, setHistory] = useState<OrderItem[]>(themeData.history);
    const [hero, setHero] = useState<Hero | null>(themeData.hero);
    const [header, setHeader] = useState<Header | null>(themeData.header);
    const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeCategory, setActiveCategory] = useState('Semua');

    const [isDarkMode, setIsDarkMode] = useState(true);
    const [themeMode, setThemeMode] = useState<'Dark' | 'Light'>('Dark');

    const [isService, setIsService] = useState(service);
    const [isPackage, setIsPackage] = useState<boolean | string>('All');

    const [clientQueueNumber, setClientQueueNumber] = useState(0);
    const [currentQueueNumber, setCurrentQueueNumber] = useState(1);
    /* ===================== Init Dummy Data ===================== */

    useEffect(() => {
        setProducts(themeData.products);
        setHistory(themeData.history);
        setHero(themeData.hero);
        setHeader(themeData.header);
    }, [theme]);
    /* ===================== Computed ===================== */
    const favoriteProducts = useMemo(
        () => products.filter((p) => p.isFavorite),
        [products]
    );

    const cartTotal = useMemo(
        () => cart.reduce((t, i) => t + i.finalPrice * i.quantity, 0),
        [cart]
    );

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

    const categorie = useMemo(() => {
        if (isService) {
            return themeData?.categories?.filter((c) => c?.isService);
        } else {
            return themeData?.categories?.filter((c) => !c?.isService);
        }
    }, [isService]);

    /* ===================== UI Actions ===================== */
    const openDrawer = useCallback(
        (type: DrawerType) => setActiveDrawer(type),
        []
    );

    const closeDrawer = useCallback(() => setActiveDrawer(null), []);

    const openDetailModal = useCallback((product: Product) => {
        setSelectedProduct(product);
        setActiveDrawer(null);
    }, []);

    const closeDetailModal = useCallback(
        () => setSelectedProduct(null),
        []
    );

    const setActiveCategorySafe = useCallback(
        (category: string) => setActiveCategory(category),
        []
    );

    /* ===================== Business Actions ===================== */
    const handleChangeBusiness = useCallback(
        (value: boolean) => setIsService(value),
        []
    );

    const handlePackage = useCallback(
        (value: boolean | string) => setIsPackage(value),
        []
    );

    const toggleTheme = useCallback(() => {
        setIsDarkMode((prev) => !prev);
        setThemeMode((prev) => (prev === 'Dark' ? 'Light' : 'Dark'));
    }, []);

    /* ===================== Product Actions ===================== */
    const handleToggleFavorite = useCallback((productId: number) => {
        setProducts((prev) =>
            prev.map((p) =>
                p.id === productId
                    ? { ...p, isFavorite: !p.isFavorite }
                    : p
            )
        );
    }, []);

    const handleAddToCart = useCallback((item: OrderItem) => {
        setCart((prev) => {
            const idx = prev.findIndex(
                (i) => i.id === item.id && i.variantName === item.variantName
            );

            if (idx > -1) {
                return prev.map((i, index) =>
                    index === idx
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }

            return [...prev, item];
        });


        // setHistory((prev) =>
        //     [
        //         {
        //             ...item,
        //             date: new Date().toISOString().split('T')[0],
        //             status: 'Selesai',
        //         },
        //         ...prev,
        //     ].slice(0, 5)
        // );
    }, []);

    const handleCheckout = () => {
        const today = new Date().toISOString().split('T')[0];

        setHistory((prev) =>
            [
                ...cart.map((item) => ({
                    ...item,
                    date: today,
                    status: 'Selesai' as const,
                })),
                ...prev,
            ].slice(0, 5)
        );

        setCart([]);
        setClientQueueNumber(Math.floor(Math.random() * 50));
    };

    const handleRemoveFromCart = useCallback((index: number) => {
        setCart((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const handleNextQueue = useCallback(() => {
        setCurrentQueueNumber((prev) => prev + 1);
    }, []);

    /* ===================== Exposed API ===================== */
    return {
        // State
        products,
        cart,
        history,
        hero,
        header,
        activeDrawer,
        selectedProduct,
        activeCategory,
        categorie,
        isDarkMode,
        themeMode,
        isService,
        isPackage,
        clientQueueNumber,
        currentQueueNumber,

        // Computed
        favoriteProducts,
        cartTotal,
        filteredProducts,

        // Actions
        openDrawer,
        closeDrawer,
        openDetailModal,
        closeDetailModal,
        setActiveCategory: setActiveCategorySafe,
        handleToggleFavorite,
        handleAddToCart,
        handleRemoveFromCart,
        handleChangeBusiness,
        handlePackage,
        toggleTheme,
        handleNextQueue,
        handleCheckout
    };
};


