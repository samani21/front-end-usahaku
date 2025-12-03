import { ChevronDown, Laptop, Monitor, Smartphone, Tablet } from "lucide-react";
import { Category, DrawerType, OrderItem, Product } from "./useProductCatalog";
import { useCallback, useMemo, useState } from "react";
import { Hero } from "@/lib/Types/Theme/theme";

export const DUMMY_PRODUCTS: Product[] = [
    {
        id: 1,
        name: 'ROG Strix G16 (2025)',
        price: 25999000,
        description: 'Laptop berperforma tinggi untuk gaming dan editing profesional. Dilengkapi kartu grafis terbaru.',
        imageUrl: 'https://dlcdnwebimgs.asus.com/files/media/71a33ba1-1be2-44c1-9541-70b4c800abf8/v1/images/Strix_G16_KV_16x9.webp',
        category: 'Laptop',
        variants: [
            { id: 'v1a', name: 'RAM 16GB / SSD 512GB', priceAdjustment: 0 },
            { id: 'v1b', name: 'RAM 32GB / SSD 1TB (Premium)', priceAdjustment: 3000000 },
        ],
        isFavorite: false,
    },
    {
        id: 2,
        name: 'Smartphone Ultra X Pro',
        price: 8999000,
        description: 'Kamera terbaik di kelasnya dan daya tahan baterai seharian penuh. Desain ergonomis.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTJ2Ut9AwmYWiawxXkgbYtTqslz5Vvo7hxJA&s',
        category: 'Smartphone',
        variants: [
            { id: 'v2a', name: 'Warna Hitam (Standar)', priceAdjustment: 0 },
            { id: 'v2b', name: 'Warna Biru (Edisi Khusus)', priceAdjustment: 500000 },
        ],
        isFavorite: true,
    },
    {
        id: 3,
        name: 'Smartwatch Titan Series 3',
        price: 3450000,
        description: 'Melacak aktivitas olahraga, detak jantung, dan notifikasi pintar. Tahan air hingga 50m.',
        imageUrl: 'https://media.tatacroma.com/Croma%20Assets/Communication/Wearable%20Devices/Images/276060_0_e4dbrp.png',
        category: 'Aksesoris',
        variants: [
            { id: 'v3a', name: 'Tali Karet', priceAdjustment: 0 },
            { id: 'v3b', name: 'Tali Logam', priceAdjustment: 350000 },
        ],
        isFavorite: false,
    },
    {
        id: 4,
        name: 'Monitor UltraWide 34"',
        price: 6700000,
        description: 'Layar melengkung 144Hz untuk pengalaman kerja dan gaming yang imersif.',
        imageUrl: 'https://www.lg.com/content/dam/channel/wcms/id/monitor/ultrawide/34wr50qk/gallery/gallery/ultrawide-34wr50qk-gallery-04-2010.jpg',
        category: 'Monitor',
        variants: [

        ],
        isFavorite: false,
    },
];


export const DUMMY_CATEGORIES: Category[] = [
    { name: 'Semua Produk', iconComponent: Monitor },
    { name: 'Laptop', iconComponent: Laptop },
    { name: 'Smartphone', iconComponent: Smartphone },
    { name: 'Monitor', iconComponent: Tablet },
    { name: 'Aksesoris', iconComponent: ChevronDown },
];

export const DUMMY_HISTORY: OrderItem[] = [
    {
        productId: 1, productName: 'Smartphone Ultra X Pro', basePrice: 8999000, variantName: 'Warna Hitam(Standar)', finalPrice: 8999000, quantity: 1
    },
    { productId: 2, productName: 'Smartwatch Titan Series 3', basePrice: 3450000, variantName: 'Tali Karet', finalPrice: 3450000, quantity: 2 },
];


export const useProductCatalog = () => {
    const [products, setProducts] = useState<Product[]>(DUMMY_PRODUCTS);
    const [cart, setCart] = useState<OrderItem[]>([]);
    const [history, setHistory] = useState<OrderItem[]>(DUMMY_HISTORY);
    const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeCategory, setActiveCategory] = useState('Semua Produk');

    const favoriteProducts: Product[] = useMemo(() => products.filter(p => p.isFavorite), [products]);
    const cartTotal: number = useMemo(() => cart.reduce((total, item) => total + item.finalPrice * item.quantity, 0), [cart]);
    const filteredProducts: Product[] = useMemo(() => {
        if (activeCategory === 'Semua Produk') {
            return products;
        }
        return products.filter(p => p.category === activeCategory);
    }, [products, activeCategory]);

    // Actions
    const openDrawer = useCallback((type: DrawerType) => setActiveDrawer(type), []);
    const closeDrawer = useCallback(() => setActiveDrawer(null), []);
    const openDetailModal = useCallback((product: Product) => setSelectedProduct(product), []);
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
                i => i.productId === item.productId && i.variantName === item.variantName
            );

            if (existingItemIndex > -1) {
                return prevCart?.map((i, index) =>
                    index === existingItemIndex ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            }
            return [...prevCart, item];
        });
        // Simulasi checkout: item masuk ke history
        setHistory(prevHistory => [{ ...item, quantity: item.quantity }, ...prevHistory].slice(0, 5));
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
    };
};