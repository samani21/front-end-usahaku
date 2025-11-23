import React, { useState, useMemo, useCallback } from 'react';
import {
    Heart,
    ShoppingCart,
    History,
    X,
    ChevronDown,
    Monitor,
    Smartphone,
    Tablet,
    Laptop,
    CheckCircle,
    Palette,
} from 'lucide-react';

// --- 1. DEFINISI TIPE DATA DAN TEMA ---

type ThemeName = 'teal' | 'indigo' | 'rose' | 'orange' | 'slate'; // Menambahkan 'slate'

interface ColorClasses {
    primary: string; // e.g., 'bg-teal-600'
    primaryHover: string; // e.g., 'hover:bg-teal-700'
    primaryText: string; // e.g., 'text-teal-600'
    primaryTextDark: string; // e.g., 'dark:text-teal-400'
    gradientFrom: string; // e.g., 'from-teal-600'
    gradientTo: string; // e.g., 'to-cyan-500'
    borderAccent: string; // e.g., 'border-teal-500'
    backgroundAccent: string; // e.g., 'bg-teal-50'
    backgroundAccentDark: string; // e.g., 'dark:bg-teal-900'
    textAccent: string; // e.g., 'text-teal-800'
}

const THEME_COLORS: Record<ThemeName, ColorClasses> = {
    teal: {
        primary: 'bg-teal-600',
        primaryHover: 'hover:bg-teal-700',
        primaryText: 'text-teal-600',
        primaryTextDark: 'dark:text-teal-400',
        gradientFrom: 'from-teal-600',
        gradientTo: 'to-cyan-500',
        borderAccent: 'border-teal-500',
        backgroundAccent: 'bg-teal-50',
        backgroundAccentDark: 'dark:bg-teal-900',
        textAccent: 'text-teal-800',
    },
    indigo: {
        primary: 'bg-indigo-600',
        primaryHover: 'hover:bg-indigo-700',
        primaryText: 'text-indigo-600',
        primaryTextDark: 'dark:text-indigo-400',
        gradientFrom: 'from-indigo-600',
        gradientTo: 'to-violet-500',
        borderAccent: 'border-indigo-500',
        backgroundAccent: 'bg-indigo-50',
        backgroundAccentDark: 'dark:bg-indigo-900',
        textAccent: 'text-indigo-800',
    },
    rose: {
        primary: 'bg-rose-600',
        primaryHover: 'hover:bg-rose-700',
        primaryText: 'text-rose-600',
        primaryTextDark: 'dark:text-rose-400',
        gradientFrom: 'from-rose-600',
        gradientTo: 'to-pink-500',
        borderAccent: 'border-rose-500',
        backgroundAccent: 'bg-rose-50',
        backgroundAccentDark: 'dark:bg-rose-900',
        textAccent: 'text-rose-800',
    },
    orange: {
        primary: 'bg-orange-600',
        primaryHover: 'hover:bg-orange-700',
        primaryText: 'text-orange-600',
        primaryTextDark: 'dark:text-orange-400',
        gradientFrom: 'from-orange-600',
        gradientTo: 'to-amber-500',
        borderAccent: 'border-orange-500',
        backgroundAccent: 'bg-orange-50',
        backgroundAccentDark: 'dark:bg-orange-900',
        textAccent: 'text-orange-800',
    },
    // TEMA BARU: SLATE (Minimalis)
    slate: {
        primary: 'bg-slate-700',
        primaryHover: 'hover:bg-slate-800',
        primaryText: 'text-slate-700',
        primaryTextDark: 'dark:text-slate-300',
        gradientFrom: 'from-slate-700',
        gradientTo: 'to-gray-600',
        borderAccent: 'border-slate-500',
        backgroundAccent: 'bg-gray-100',
        backgroundAccentDark: 'dark:bg-slate-900',
        textAccent: 'text-slate-800',
    },
};

interface Variant {
    id: string;
    name: string;
    priceAdjustment: number;
}

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    variants: Variant[];
    isFavorite: boolean;
}

interface OrderItem {
    productId: string;
    productName: string;
    basePrice: number;
    variantName: string;
    finalPrice: number;
    quantity: number;
}

// --- 2. DUMMY DATA ---

const DUMMY_PRODUCTS: Product[] = [
    {
        id: 'p1',
        name: 'Laptop Gaming Rexus Z1',
        price: 15500000,
        description: 'Laptop berperforma tinggi untuk gaming dan editing profesional. Dilengkapi kartu grafis terbaru.',
        imageUrl: 'https://placehold.co/400x300/10b981/ffffff?text=Laptop+Z1',
        category: 'Laptop',
        variants: [
            { id: 'v1a', name: 'RAM 16GB / SSD 512GB', priceAdjustment: 0 },
            { id: 'v1b', name: 'RAM 32GB / SSD 1TB (Premium)', priceAdjustment: 3000000 },
        ],
        isFavorite: false,
    },
    {
        id: 'p2',
        name: 'Smartphone Ultra X Pro',
        price: 8999000,
        description: 'Kamera terbaik di kelasnya dan daya tahan baterai seharian penuh. Desain ergonomis.',
        imageUrl: 'https://placehold.co/400x300/f59e0b/ffffff?text=HP+Ultra+X',
        category: 'Smartphone',
        variants: [
            { id: 'v2a', name: 'Warna Hitam (Standar)', priceAdjustment: 0 },
            { id: 'v2b', name: 'Warna Biru (Edisi Khusus)', priceAdjustment: 500000 },
        ],
        isFavorite: true,
    },
    {
        id: 'p3',
        name: 'Smartwatch Titan Series 3',
        price: 3450000,
        description: 'Melacak aktivitas olahraga, detak jantung, dan notifikasi pintar. Tahan air hingga 50m.',
        imageUrl: 'https://placehold.co/400x300/3b82f6/ffffff?text=Smartwatch+S3',
        category: 'Aksesoris',
        variants: [
            { id: 'v3a', name: 'Tali Karet', priceAdjustment: 0 },
            { id: 'v3b', name: 'Tali Logam', priceAdjustment: 350000 },
        ],
        isFavorite: false,
    },
    {
        id: 'p4',
        name: 'Monitor UltraWide 34"',
        price: 6700000,
        description: 'Layar melengkung 144Hz untuk pengalaman kerja dan gaming yang imersif.',
        imageUrl: 'https://placehold.co/400x300/ef4444/ffffff?text=Monitor+34"',
        category: 'Monitor',
        variants: [
            { id: 'v4a', name: 'Standar', priceAdjustment: 0 },
            { id: 'v4b', name: 'Varian dengan Kalibrasi Warna', priceAdjustment: 1200000 },
        ],
        isFavorite: false,
    },
];

const DUMMY_CATEGORIES = [
    { name: 'Semua Produk', icon: Monitor },
    { name: 'Laptop', icon: Laptop },
    { name: 'Smartphone', icon: Smartphone },
    { name: 'Monitor', icon: Tablet },
    { name: 'Aksesoris', icon: ChevronDown },
];

const DUMMY_HISTORY: OrderItem[] = [
    { productId: 'p2', productName: 'Smartphone Ultra X Pro', basePrice: 8999000, variantName: 'Warna Hitam (Standar)', finalPrice: 8999000, quantity: 1 },
    { productId: 'p3', productName: 'Smartwatch Titan Series 3', basePrice: 3450000, variantName: 'Tali Karet', finalPrice: 3450000, quantity: 2 },
];

// --- 3. KOMPONEN REUSABLE (DRAWER/MODAL SAMPING) ---

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    colors: ColorClasses; // Tambahan prop warna
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children, colors }) => {
    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-gray-900 bg-opacity-75 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Drawer Content */}
            <div
                className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white dark:bg-gray-800 shadow-2xl z-50 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-4 h-[calc(100%-65px)] overflow-y-auto">
                    {children}
                </div>
            </div>
        </>
    );
};

// --- 4. KOMPONEN PRODUCT DETAIL MODAL ---

interface DetailModalProps {
    product: Product;
    onClose: () => void;
    onOrder: (item: OrderItem) => void;
    colors: ColorClasses; // Tambahan prop warna
}

const ProductDetailModal: React.FC<DetailModalProps> = ({ product, onClose, onOrder, colors }) => {
    const [selectedVariant, setSelectedVariant] = useState<Variant>(product.variants[0]);
    const [quantity, setQuantity] = useState(1);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const finalPrice = product.price + selectedVariant.priceAdjustment;

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    const handleOrder = () => {
        if (quantity < 1) return;

        const orderItem: OrderItem = {
            productId: product.id,
            productName: product.name,
            basePrice: product.price,
            variantName: selectedVariant.name,
            finalPrice: finalPrice,
            quantity: quantity,
        };

        onOrder(orderItem);
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
            onClose();
        }, 1500);
    };

    const ringAccentClass = colors.borderAccent.replace('border-', 'ring-'); // e.g. 'ring-teal-500'

    return (
        <>
            {/* Modal Overlay */}
            <div
                className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
                onClick={onClose}
            >
                {/* Modal Content */}
                <div
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-5 border-b dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">Detail Produk</h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white p-1 rounded-full">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-5 space-y-4">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-lg shadow-md"
                            onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x300/000/fff?text=No+Image')}
                        />

                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">{product.name}</h4>
                        {/* Menggunakan primaryText untuk Harga */}
                        <p className={`text-3xl font-extrabold ${colors.primaryText} ${colors.primaryTextDark}`}>
                            {formatRupiah(finalPrice)}
                        </p>

                        <p className="text-sm text-gray-600 dark:text-gray-400">{product.description}</p>

                        {/* Variant Selection */}
                        <div className="pt-2 border-t dark:border-gray-700">
                            <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Pilih Varian:</h5>
                            <div className="space-y-2">
                                {product.variants.map((variant) => (
                                    <button
                                        key={variant.id}
                                        onClick={() => setSelectedVariant(variant)}
                                        className={`w-full text-left p-3 rounded-lg border transition duration-150 ${selectedVariant.id === variant.id
                                            ? `${colors.borderAccent} ${colors.backgroundAccent} ${colors.textAccent} ${colors.backgroundAccentDark} ${colors.primaryTextDark} ring-2 ${ringAccentClass}`
                                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        <span className="font-medium">{variant.name}</span>
                                        <span className="text-sm ml-2">
                                            ({variant.priceAdjustment >= 0 ? '+' : ''}
                                            {formatRupiah(variant.priceAdjustment)})
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Control */}
                        <div className="flex items-center space-x-3 pt-2">
                            <label htmlFor="quantity" className="font-semibold text-gray-900 dark:text-white">
                                Jumlah:
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-20 p-2 border border-gray-300 rounded-lg text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Footer (Action Button) */}
                    <div className="p-5 border-t dark:border-gray-700 flex justify-end">
                        <button
                            onClick={handleOrder}
                            disabled={quantity < 1}
                            // Menggunakan primary dan primaryHover
                            className={`px-6 py-3 ${colors.primary} text-white font-bold rounded-lg shadow-lg ${colors.primaryHover} transition duration-300 disabled:bg-gray-400`}
                        >
                            Pesan Sekarang ({formatRupiah(finalPrice * quantity)})
                        </button>
                    </div>

                    {/* Konfirmasi Pesanan */}
                    {showConfirmation && (
                        <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm">
                            {/* Menggunakan primaryText untuk ikon dan teks */}
                            <CheckCircle className={`${colors.primaryText.replace('text-', 'text-')} mb-4`} size={64} />
                            <p className={`text-xl font-semibold ${colors.primaryText} ${colors.primaryTextDark}`}>Berhasil Dipesan!</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                {quantity}x {product.name} ({selectedVariant.name}) telah ditambahkan ke Pesanan.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};


// --- 5. KOMPONEN UTAMA APLIKASI ---

type DrawerType = 'favorite' | 'cart' | 'history' | null;

const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

const HeaderIcon: React.FC<{ Icon: React.ElementType; onClick: () => void; count: number; label: string }> = ({ Icon, onClick, count, label }) => (
    <button
        onClick={onClick}
        aria-label={label}
        className="p-2 relative rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150"
    >
        <Icon size={24} className="text-gray-700 dark:text-gray-200" />
        {count > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {count}
            </span>
        )}
    </button>
);


interface ProductCardProps {
    product: Product;
    onClick: () => void;
    onToggleFavorite: (id: string) => void;
    colors: ColorClasses; // Tambahan prop warna
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onToggleFavorite, colors }) => (
    <div
        className="bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden group flex flex-col cursor-pointer h-full"
    >
        <div className="relative">
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover transform group-hover:scale-[1.03] transition duration-500"
                onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x300/000/fff?text=No+Image')}
            />
            <button
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.id); }}
                className="absolute top-2 right-2 p-2 rounded-full bg-white/70 backdrop-blur-sm text-red-500 hover:text-red-700 transition"
                aria-label="Toggle Favorite"
            >
                <Heart size={20} fill={product.isFavorite ? 'currentColor' : 'none'} />
            </button>
        </div>

        <div className="p-4 flex flex-col flex-grow" onClick={onClick}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate mb-1">
                {product.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{product.description}</p>
            {/* Menggunakan primaryText untuk Harga */}
            <p className={`text-2xl font-extrabold ${colors.primaryText} ${colors.primaryTextDark} mt-auto`}>
                {formatRupiah(product.price)}
            </p>
            <div className="text-xs text-gray-400 mt-1">
                Mulai dari
            </div>
        </div>
    </div>
);


export default function ThemeFour() {
    const [products, setProducts] = useState<Product[]>(DUMMY_PRODUCTS);
    const [cart, setCart] = useState<OrderItem[]>([]);
    const [history, setHistory] = useState<OrderItem[]>(DUMMY_HISTORY);
    const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeCategory, setActiveCategory] = useState('Semua Produk');

    // State untuk mengelola tema warna
    const [activeTheme, setActiveTheme] = useState<ThemeName>('slate'); // Diubah ke 'slate' sebagai default
    const colors = THEME_COLORS[activeTheme]; // Objek warna yang sedang aktif

    // Logic untuk membuka/menutup drawer
    const openDrawer = (type: DrawerType) => {
        setActiveDrawer(type);
    };
    const closeDrawer = () => {
        setActiveDrawer(null);
    };

    // Logic untuk Produk Detail Modal
    const openDetailModal = (product: Product) => {
        setSelectedProduct(product);
    };
    const closeDetailModal = () => {
        setSelectedProduct(null);
    };

    // Logic Favorite
    const handleToggleFavorite = useCallback((productId: string) => {
        setProducts(prevProducts =>
            prevProducts.map(p =>
                p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
            )
        );
    }, []);

    const favoriteProducts = useMemo(() =>
        products.filter(p => p.isFavorite)
        , [products]);

    // Logic Cart/Order
    const handleAddToCart = useCallback((item: OrderItem) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(
                i => i.productId === item.productId && i.variantName === item.variantName
            );

            if (existingItemIndex > -1) {
                // Update quantity if item/variant exists
                return prevCart.map((i, index) =>
                    index === existingItemIndex ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            }
            // Add new item
            return [...prevCart, item];
        });
        // Pindahkan ke history setelah pemesanan (simulasi checkout sederhana)
        setHistory(prevHistory => [{ ...item, quantity: item.quantity }, ...prevHistory].slice(0, 5));
    }, []);

    const cartTotal = cart.reduce((total, item) => total + item.finalPrice * item.quantity, 0);

    // Filtered Products
    const filteredProducts = useMemo(() => {
        if (activeCategory === 'Semua Produk') {
            return products;
        }
        return products.filter(p => p.category === activeCategory);
    }, [products, activeCategory]);


    // --- Render Functions for Drawer Content ---

    const renderDrawerContent = (type: DrawerType, colors: ColorClasses) => {
        if (type === 'favorite') {
            return (
                <div className="space-y-4">
                    {favoriteProducts.length > 0 ? (
                        favoriteProducts.map((p) => (
                            <div key={p.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
                                <img
                                    src={p.imageUrl}
                                    alt={p.name}
                                    className="w-12 h-12 object-cover rounded-md"
                                    onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100/000/fff?text=Fav')}
                                />
                                <div className="flex-grow">
                                    <p className="font-semibold text-gray-900 dark:text-white truncate">{p.name}</p>
                                    {/* Menggunakan primaryText untuk harga di Favorit */}
                                    <p className={`text-sm ${colors.primaryText} ${colors.primaryTextDark}`}>{formatRupiah(p.price)}</p>
                                </div>
                                <button
                                    onClick={() => handleToggleFavorite(p.id)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                    aria-label="Hapus dari Favorit"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">Belum ada produk favorit.</p>
                    )}
                </div>
            );
        }
        if (type === 'cart') {
            return (
                <div className="flex flex-col h-full">
                    <div className="flex-grow space-y-4 overflow-y-auto pr-2">
                        {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
                                    <div className="flex-grow">
                                        <p className="font-semibold text-gray-900 dark:text-white">{item.productName}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Varian: {item.variantName}</p>
                                        {/* Menggunakan primaryText untuk harga di Cart */}
                                        <p className={`text-sm ${colors.primaryText} ${colors.primaryTextDark} font-bold mt-1`}>
                                            {item.quantity}x @ {formatRupiah(item.finalPrice)}
                                        </p>
                                        <p className="text-sm text-gray-900 dark:text-white font-bold">
                                            Total: {formatRupiah(item.finalPrice * item.quantity)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setCart(cart.filter((_, i) => i !== index))}
                                        className="text-red-500 hover:text-red-700 p-1 mt-1"
                                        aria-label="Hapus Item"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-4">Keranjang pesanan masih kosong.</p>
                        )}
                    </div>
                    <div className="mt-4 pt-4 border-t dark:border-gray-700">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-lg font-extrabold text-gray-900 dark:text-white">Total Keseluruhan:</span>
                            {/* Menggunakan primaryText untuk Total Cart */}
                            <span className={`text-2xl font-extrabold ${colors.primaryText} ${colors.primaryTextDark}`}>{formatRupiah(cartTotal)}</span>
                        </div>
                        {/* Menggunakan primary dan primaryHover untuk Checkout Button */}
                        <button
                            className={`w-full py-3 ${colors.primary} text-white font-bold rounded-lg shadow-lg ${colors.primaryHover} transition duration-300 disabled:bg-gray-400`}
                            disabled={cart.length === 0}
                        >
                            Proses Checkout
                        </button>
                    </div>
                </div>
            );
        }
        if (type === 'history') {
            return (
                <div className="space-y-4">
                    {history.length > 0 ? (
                        history.map((item, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm opacity-80">
                                {/* Menggunakan primaryText untuk ikon History */}
                                <History size={24} className={`${colors.primaryText.replace('text-', 'text-')} mt-1 flex-shrink-0`} />
                                <div className='flex-grow'>
                                    <p className="font-semibold text-gray-900 dark:text-white truncate">{item.productName}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Varian: {item.variantName}</p>
                                    <p className="text-sm text-gray-900 dark:text-white">
                                        {item.quantity}x ({formatRupiah(item.finalPrice)})
                                    </p>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium flex-shrink-0">
                                    Selesai
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">Belum ada riwayat pesanan.</p>
                    )}
                </div>
            );
        }
        return null;
    };


    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-sans antialiased">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    {/* Menggunakan primaryText untuk judul */}
                    <h1 className={`text-2xl font-extrabold ${colors.primaryText} ${colors.primaryTextDark}`}>
                        E-KATALOG TEKNOLOGI
                    </h1>
                    <nav className="flex space-x-3">
                        <HeaderIcon
                            Icon={Heart}
                            onClick={() => openDrawer('favorite')}
                            count={favoriteProducts.length}
                            label="Buka Favorit"
                        />
                        <HeaderIcon
                            Icon={ShoppingCart}
                            onClick={() => openDrawer('cart')}
                            count={cart.length}
                            label="Buka Keranjang"
                        />
                        <HeaderIcon
                            Icon={History}
                            onClick={() => openDrawer('history')}
                            count={history.length}
                            label="Buka Riwayat Pesanan"
                        />
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

                {/* Pemilih Tema Warna (NEW) */}
                <section className="flex justify-end items-center space-x-3">
                    <Palette size={20} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Pilih Tema:</span>
                    {Object.keys(THEME_COLORS).map((themeName) => {
                        const theme = themeName as ThemeName;
                        const themeColors = THEME_COLORS[theme];
                        const displayName = theme.charAt(0).toUpperCase() + theme.slice(1);

                        return (
                            <button
                                key={theme}
                                onClick={() => setActiveTheme(theme)}
                                className={`w-6 h-6 rounded-full border-2 transition duration-200 ${activeTheme === theme ? `border-gray-900 dark:border-white ring-2 ring-offset-2 ${themeColors.primary.replace('bg-', 'ring-')}` : 'border-gray-300'
                                    } ${themeColors.primary}`}
                                aria-label={`Pilih tema ${theme}`}
                                title={displayName}
                            ></button>
                        );
                    })}
                </section>

                {/* 4. Hero Section / Banner */}
                {/* Menggunakan gradientFrom dan gradientTo */}
                <section className={`bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} ${colors.gradientFrom.replace('from-', 'dark:from-')} ${colors.gradientTo.replace('to-', 'dark:to-')} p-8 sm:p-12 rounded-2xl shadow-xl text-white`}>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="max-w-lg mb-6 md:mb-0">
                            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                                Temukan Gadget Impianmu!
                            </h2>
                            <p className="mt-3 text-white/80 text-lg">
                                Jelajahi koleksi produk teknologi terbaru dengan harga terbaik dan varian terlengkap.
                            </p>
                            {/* Menggunakan primaryText untuk tombol di Hero */}
                            <button className={`mt-6 px-6 py-3 bg-white ${colors.primaryText} font-bold rounded-full shadow-lg hover:bg-gray-100 transition duration-300`}>
                                Lihat Semua Produk
                            </button>
                        </div>
                        <div className="hidden sm:block">
                            <Laptop size={120} className="text-white/70" />
                        </div>
                    </div>
                </section>

                {/* 5. Kategori Section */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold border-b pb-2 border-gray-200 dark:border-gray-700">Kategori Produk</h2>
                    <div className="flex flex-wrap gap-3">
                        {DUMMY_CATEGORIES.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${activeCategory === cat.name
                                    // Menggunakan primary untuk tombol aktif
                                    ? `${colors.primary} text-white shadow-md`
                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
                                    }`}
                            >
                                <cat.icon size={18} />
                                <span>{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* 6. Card Produk Section */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold border-b pb-2 border-gray-200 dark:border-gray-700">
                        Daftar Produk ({activeCategory})
                    </h2>
                    {filteredProducts.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-10">Tidak ada produk dalam kategori ini.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onClick={() => openDetailModal(product)}
                                    onToggleFavorite={handleToggleFavorite}
                                    colors={colors} // Mengirimkan objek warna
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* 8. Tampilan Teknologi */}
                <section className="space-y-4 pt-8 border-t dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Dibangun Dengan Teknologi Modern</h2>
                    <div className="flex flex-wrap gap-4 text-sm font-medium">
                        <span className="px-3 py-1 bg-blue-600 text-white rounded-full">Next.js (React)</span>
                        <span className="px-3 py-1 bg-sky-500 text-white rounded-full">TypeScript (TSX)</span>
                        <span className="px-3 py-1 bg-cyan-700 text-white rounded-full">Tailwind CSS</span>
                        <span className="px-3 py-1 bg-indigo-600 text-white rounded-full">Lucide Icons</span>
                    </div>
                </section>

            </main>

            {/* 3. Modal Samping (Drawer) */}
            <Drawer
                isOpen={activeDrawer !== null}
                onClose={closeDrawer}
                title={
                    activeDrawer === 'favorite'
                        ? 'Produk Favorit'
                        : activeDrawer === 'cart'
                            ? 'Keranjang Pesanan'
                            : activeDrawer === 'history'
                                ? 'Riwayat Pesanan'
                                : ''
                }
                colors={colors} // Mengirimkan objek warna
            >
                {renderDrawerContent(activeDrawer, colors)}
            </Drawer>

            {/* 7. Modal Detail Produk */}
            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={closeDetailModal}
                    onOrder={handleAddToCart}
                    colors={colors} // Mengirimkan objek warna
                />
            )}
        </div>
    );
}