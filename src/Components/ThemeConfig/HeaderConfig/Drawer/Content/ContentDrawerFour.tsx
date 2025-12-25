import { OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { formatRupiah } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'

type Props = {
    favoriteProducts: Product[];
    type: string;
    color: ThemeColorSet;
    cart: OrderItem[];
    history: OrderItem[];
    cartTotal: number;
    themeMode?: string;
}

const ContentDrawerFour = ({ type, favoriteProducts, cart, cartTotal, history, color, themeMode }: Props) => {
    const drawerCardBg = themeMode === 'Dark' ? 'bg-gray-800' : 'bg-gray-100';
    const drawerBorderColor = themeMode === 'Dark' ? 'border-gray-700/20' : 'border-gray-300';
    const secondaryBg = themeMode === 'Dark' ? `bg-teal-700` : color?.bg700;
    const mainTextColor = themeMode === 'Dark' ? 'text-gray-50' : `text-gray-900`;
    const subtleTextColor = themeMode === 'Dark' ? 'text-gray-400' : `text-gray-600`;
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
                                <p className='text-red-500 cursor-pointer' >X</p>

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
}

export default ContentDrawerFour