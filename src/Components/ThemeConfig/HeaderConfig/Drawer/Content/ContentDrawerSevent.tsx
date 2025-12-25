import { OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { formatRupiah } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { ChevronRight, } from 'lucide-react';
import React from 'react'

type Props = {
    favoriteProducts: Product[];
    type: string;
    color: ThemeColorSet;
    cart: OrderItem[];
    history: OrderItem[];
    cartTotal: number;
}

const ContentDrawerSevent = ({ type, favoriteProducts, cart, cartTotal, history, color }: Props) => {
    if (type === 'favorite') {
        return (
            <div>
                <p className="text-gray-500 mb-4">Daftar layanan yang Anda tandai sebagai favorit.</p>
                {favoriteProducts.length > 0 ? (
                    <ul className="space-y-3">
                        {favoriteProducts.map(item => (
                            <li key={item.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center shadow-sm">
                                <span className="font-medium text-gray-700">{item.name}</span>
                                <ChevronRight size={18} className="text-gray-400" />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500 italic py-8">Belum ada layanan favorit.</p>
                )}
            </div>
        );
    }

    // Konten Cart
    if (type === 'cart') {
        return (
            <div className="flex flex-col h-full justify-between">
                <div className="flex-grow overflow-y-auto pr-2">
                    <p className="text-gray-500 mb-4">Layanan yang saat ini ada di keranjang atau dalam proses pemesanan.</p>
                    {cart.length > 0 ? (
                        <ul className="space-y-3">
                            {cart.map((item, index) => (
                                <li key={item.id} className={`p-3 ${color?.bg50} rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm`}>
                                    <div className="flex-grow mb-2 sm:mb-0">
                                        <span className="font-medium text-gray-800 block">{item.productName}</span>
                                        {/* Tampilkan Harga dan Kuantitas */}
                                        <span className="text-sm text-gray-600">
                                            {item.quantity} x {formatRupiah(item.basePrice)}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        {/* Tampilkan Subtotal */}
                                        <span className={`font-bold text-lg ${color?.text800}`}>
                                            {formatRupiah(item.finalPrice * item.quantity)}
                                        </span>
                                        {/* Tombol Hapus per item */}
                                        <button
                                            className="text-sm text-red-500 hover:text-red-700 font-medium transition"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500 italic py-8">Keranjang Anda kosong.</p>
                    )}
                </div>

                {/* Total dan Tombol Pesan/Checkout */}
                <div className="border-t border-gray-200 pt-4 mt-4 sticky bottom-0 bg-white">
                    {cart.length > 0 && (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-bold text-gray-900">Total Pembayaran:</span>
                                <span className={`text-2xl font-extrabold ${color?.text600}}`}>
                                    {formatRupiah(cartTotal)}
                                </span>
                            </div>

                            {/* Tombol Pesan/Checkout untuk seluruh keranjang */}
                            <button
                                className={`w-full py-3 ${color?.bg600} text-white font-semibold rounded-lg shadow-md ${color?.hoverBg700} transition duration-300 focus:outline-none focus:ring-4 ${color?.ring500} focus:ring-opacity-50`}
                            >
                                Lanjutkan Pemesanan ({cart.length} Item)
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    }

    // Konten History
    if (type === 'history') {
        return (
            <div>
                <p className="text-gray-500 mb-4">Riwayat pemesanan layanan Anda sebelumnya.</p>
                {history.length > 0 ? (
                    <ul className="space-y-3">
                        {history.map(item => (
                            <li key={item.id} className="p-3 bg-green-50 rounded-lg flex justify-between items-center shadow-sm">
                                <div>
                                    <span className="font-medium text-gray-700 block">{item.productName}</span>
                                    <span className="text-xs text-gray-500">Tanggal: {item.date}</span>
                                </div>
                                <button className="text-sm text-green-600 hover:underline">Lihat Invoice</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500 italic py-8">Tidak ada riwayat pemesanan.</p>
                )}
            </div>
        );
    }

    return null;
}

export default ContentDrawerSevent