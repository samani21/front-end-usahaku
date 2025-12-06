import { Category, DrawerType, OrderItem, Product } from "./useProductCatalog";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Hero } from "@/lib/Types/Theme/theme";

export const DUMMY_PRODUCTS: Product[] = [
    {
        id: 101,
        name: 'Espresso Blend Klasik',
        price: 35000,
        description: 'Campuran biji kopi Arabika dan Robusta dengan rasa yang seimbang dan aroma cokelat pekat.',
        imageUrl: 'https://plus.unsplash.com/premium_photo-1675435646209-24c008f31d92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEVzcHJlc3NvJTIwQmxlbmQlMjBLbGFzaWt8ZW58MHx8MHx8fDA%3D',
        category: 'Kopi',
        isFavorite: true,
        variants: [
            { id: 1, name: 'Reguler', priceAdjustment: 0 },
            { id: 2, name: 'Besar (+5K)', priceAdjustment: 5000 },
        ],
    },
    {
        id: 102,
        name: 'Teh Hijau Matcha Latte',
        price: 40000,
        imageUrl: 'https://images.unsplash.com/photo-1638978127697-e4d55e88a6e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VGVoJTIwSGlqYXUlMjBNYXRjaGElMjBMYXR0ZXxlbnwwfHwwfHx8MA%3D%3D',
        description: 'Matcha otentik dengan susu segar, memberikan energi dan ketenangan.',
        category: 'Teh',
        isFavorite: false,
        variants: [
            { id: 1, name: 'Dingin', priceAdjustment: 0 },
            { id: 2, name: 'Panas', priceAdjustment: 0 },
        ],
    },
    {
        id: 103,
        name: 'Kue Cokelat Lava',
        price: 25000,
        imageUrl: 'https://images.unsplash.com/photo-1617305855058-336d24456869?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8S3VlJTIwQ29rZWxhdCUyMExhdmF8ZW58MHx8MHx8fDA%3D',
        description: 'Kue cokelat lembut dengan lelehan cokelat di dalamnya.',
        category: 'Camilan',
        isFavorite: false,
        variants: [
            { id: 1, name: 'Satu Porsi', priceAdjustment: 0 },
            { id: 2, name: 'Paket Berdua (+15K)', priceAdjustment: 15000 },
        ],
    },
    {
        id: 104,
        name: 'Jus Mangga Tropis',
        price: 28000,
        imageUrl: 'https://media.istockphoto.com/id/1217751106/id/foto/jus-mangga-segar-dan-buah-mangga.jpg?s=612x612&w=0&k=20&c=1khIjBwIF2DKCVZzb_QL9pSBxxtfbc8en6eT8LFHKvY=',
        description: 'Mangga pilihan yang diblender dengan sedikit es. Menyegarkan!',
        category: 'Jus Segar',
        isFavorite: true,
        variants: [
            { id: 1, name: 'Normal Sugar', priceAdjustment: 0 },
            { id: 2, name: 'Less Sugar', priceAdjustment: 0 },
        ],
    },
    {
        id: 105,
        name: 'Kopi Susu Gula Aren',
        price: 38000,
        imageUrl: 'https://media.istockphoto.com/id/2225006703/id/foto/es-kopi-gula-aren-di-atas-meja-sementara-wanita-bekerja-di-laptop-di-kafe.jpg?s=612x612&w=0&k=20&c=fua5ftztVYJCL3emFTzLb5opUUzwTTTIjFoGw9QXehI=',
        description: 'Kopi susu dengan sentuhan manis gula aren lokal. Favorit!',
        category: 'Kopi',
        isFavorite: false,
        variants: [
            { id: 1, name: 'Gelas Kecil', priceAdjustment: 0 },
            { id: 2, name: 'Gelas Besar (+7K)', priceAdjustment: 7000 },
        ],
    },
];
export const DUMMY_CATEGORIES: Category[] = [
    { id: 1, name: 'Kopi', icon: '☕' },
    { id: 2, name: 'Teh', icon: '🍵' },
    { id: 3, name: 'Camilan', icon: '🍪' },
    { id: 4, name: 'Jus Segar', icon: '🥤' },
];


export const DUMMY_HISTORY: OrderItem[] = [
    {
        id: 1, productName: 'Smartphone Ultra X Pro', basePrice: 8999000, variantName: 'Warna Hitam(Standar)', finalPrice: 8999000, quantity: 1, date: "2025-12-06", status: "Selesai"
    },
    {
        id: 2, productName: 'Smartwatch Titan Series 3', basePrice: 3450000, variantName: 'Tali Karet', finalPrice: 3450000, quantity: 2, date: "2025-12-05", status: "Dibatalkan"
    },
];


export const DUMMY_HERO: Hero = {
    // title: 'Penawaran Eksklusif',
    sub_title: 'Diskon Spesial Akhir Pekan!',
    description: 'Nikmati potongan harga 20% untuk semua kategori produk favorit Anda. Jangan sampai terlewat!',
    cta: 'Lihat Penawaran',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2_lyoTTWPt-5OvkGn5xTKTpJ2EWDWTMwJxA&s'
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

    useEffect(() => {
        setProducts(DUMMY_PRODUCTS)
        setHistory(DUMMY_HISTORY);
        setCategorie(DUMMY_CATEGORIES);
        setHero(DUMMY_HERO)
    }, [])

    const favoriteProducts: Product[] = useMemo(() => products.filter(p => p.isFavorite), [products]);
    const cartTotal: number = useMemo(() => cart.reduce((total, item) => total + item.finalPrice * item.quantity, 0), [cart]);
    const filteredProducts: Product[] = useMemo(() => {
        if (activeCategory === 'Semua') {
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
    };
};