import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { formatRupiah } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Clock, Heart, History, ShoppingBag, X } from 'lucide-react';
import React from 'react'

interface DrawerContentRendererProps {
    type: DrawerType;
    color: ThemeColorSet;
    favoriteProducts: Product[];
    cart: OrderItem[];
    history: OrderItem[];
    cartTotal: number;
    handleToggleFavorite: (id: number) => void;
    handleRemoveFromCart: (index: number) => void;
    themeMode: number | string;
    openModal?: (val: Product) => void;
    handleCheckout: () => void;
}

const DrawerContentRendererDarkLight: React.FC<DrawerContentRendererProps> = ({
    type,
    color,
    favoriteProducts,
    cart,
    history,
    cartTotal,
    handleRemoveFromCart,
    themeMode,
    handleCheckout,
    openModal
}) => {
    const drawerCardBg = themeMode === 'Dark' ? 'bg-gray-800' : 'bg-gray-100';
    const drawerBorderColor = themeMode === 'Dark' ? 'border-gray-700/20' : 'border-gray-300';
    const secondaryBg = themeMode === 'Dark' ? `bg-teal-700` : color?.bg700;
    const primaryTextColor = themeMode === 'Dark' ? 'text-cyan-500' : color?.text500;
    const primaryText700 = themeMode === 'Dark' ? 'text-cyan-700' : color?.text700;
    const primaryButtonBg = themeMode === 'Dark' ? 'bg-cyan-600' : color?.bg600;
    const primaryButtonHover = themeMode === 'Dark' ? 'hover:bg-cyan-700' : color?.hoverBg700;
    const cardBgColor = themeMode === 'Dark' ? 'bg-gray-800' : `bg-white`;
    const mainTextColor = themeMode === 'Dark' ? 'text-gray-50' : `text-gray-900`;
    const subtleTextColor = themeMode === 'Dark' ? 'text-gray-400' : `text-gray-600`;
    const shadowClass = themeMode === 'Dark' ? 'shadow-2xl shadow-black/50' : 'shadow-xl shadow-gray-300/70';
    const borderDiv = themeMode === 'Dark' ? 'border-gray-700/20' : 'border-gray-200/50';
    const innerBg = themeMode === 'Dark' ? 'bg-gray-700' : 'bg-gray-50';
    const footerBg = themeMode === 'Dark' ? 'bg-gray-700/50' : 'bg-gray-100/50';
    const primaryText = themeMode === 'Dark' ? `text-cyan-500` : color?.text500;

    if (type === 'favorite') {
        return (
            <div className="space-y-4">
                {favoriteProducts.length > 0 ?
                    favoriteProducts.map(p => (
                        <div key={p.id} className={`p-4 rounded-lg flex justify-between items-center ${drawerCardBg} border ${drawerBorderColor} shadow-sm`}>
                            <p className={`font-semibold ${mainTextColor}`}>{p.name}</p>
                            <button
                                className={`text-sm ${primaryText} font-medium hover:underline`}
                                onClick={() => openModal?.(p)}
                            >
                                Lihat Detail
                            </button>
                        </div>
                    )) : <p className={`${subtleTextColor} italic p-4`}>Belum ada produk favorit. Klik ikon hati pada produk untuk menambahkannya.</p>}
            </div>
        );
    }

    // Konten Cart
    if (type === 'cart') {
        return (
            <div className="space-y-4">
                <p className={`text-xl font-bold ${mainTextColor}`}>Ringkasan Pesanan</p>
                <div className={`border-t border-b py-4 space-y-3 ${drawerBorderColor}`}>
                    {cart?.map((item, index) => (
                        <div className={`${subtleTextColor}`}>
                            <div className='flex items-start justify-between gap-1'>
                                <div>
                                    <p className='w-full'>{item.productName}</p>
                                    <p className='w-full'>{item.variantName}</p>
                                </div>
                                <p className='text-red-500 cursor-pointer' onClick={() => handleRemoveFromCart(index)}>X</p>

                            </div>
                            <div className='flex items-start justify-between gap-1'>
                                <div>
                                    <span>{item?.quantity}x @</span>
                                    <span>{formatRupiah(item.finalPrice)}</span>
                                </div>
                                <p>{formatRupiah(item.finalPrice * item?.quantity)}</p>
                            </div>
                        </div>
                    ))}

                </div>
                <div className={`flex justify-between text-2xl font-extrabold ${primaryText}`}>
                    <span>Total:</span> <span>{formatRupiah(cartTotal)}</span>
                </div>
                <button
                    onClick={handleCheckout}
                    className={`w-full ${secondaryBg} text-white py-3 rounded-xl mt-4 font-bold text-lg hover:opacity-90 transition shadow-lg`}>Lanjutkan Pembayaran</button>
            </div>
        );
    }

    // Konten History
    if (type === 'history') {
        return (
            <div className="space-y-4">
                <p className={`text-xl font-bold ${mainTextColor}`}>Riwayat 30 Hari</p>
                {history?.map(h => (
                    <div className={`p-4 border rounded-xl ${drawerCardBg} shadow-sm ${drawerBorderColor}`} key={h?.id}>
                        <p className={`font-semibold ${mainTextColor}`}>Order #{h.id} - {history?.length} Item</p>
                        <p className={`text-sm ${subtleTextColor}`}>{h.productName} - Total: {formatRupiah(h.finalPrice)}</p>
                        <p className={`text-xs ${h?.status === 'Selesai' ? 'text-green-500' : h?.status === 'Dibatalkan' ? 'text-red-500' : 'text-yellow-500'} font-medium mt-1`}>{h?.status} ({h.date})</p>
                    </div>
                ))}
            </div>
        );
    }

    return null;
};


export default DrawerContentRendererDarkLight