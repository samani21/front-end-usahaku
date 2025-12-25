import { OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { formatRupiah } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Clock, Heart, ShoppingBag, X } from 'lucide-react';
import React from 'react'

type Props = {
    favoriteProducts: Product[];
    type: string;
    color: ThemeColorSet;
    cart: OrderItem[];
    history: OrderItem[];
    cartTotal: number;
}

const ContentDrawerThree = ({ type, favoriteProducts, cart, cartTotal, history, color }: Props) => {
    if (type === 'favorite') {
        return (
            <div className="space-y-4">
                <div className="flex items-center text-gray-500">
                    <Heart size={20} className="mr-2" />
                    <p className="font-medium">2 Produk yang Anda Suka</p>
                </div>
                <ul className="divide-y divide-gray-200 bg-white p-2 rounded-lg shadow-inner border border-gray-100">
                    {favoriteProducts?.filter((p) => p?.isFavorite).map(item => (
                        <li key={item.id} className="py-3 flex justify-between items-center text-gray-700 hover:bg-gray-50 px-2 rounded transition cursor-pointer" >
                            <span className="font-medium truncate">{item.name}</span>
                            <span className={`text-sm font-semibold ${color?.text600}`}>Rp{item.price.toLocaleString('id-ID')}</span>
                        </li>
                    ))}
                </ul>
                <p className="text-sm text-center text-gray-500 mt-6">
                    Pilih ikon hati pada produk untuk menambahkannya ke daftar favorit.
                </p>
            </div>
        );
    }

    // Konten Cart
    if (type === 'cart') {
        return (

            <div className="space-y-4">
                <div className="flex items-center text-gray-500">
                    <ShoppingBag size={20} className="mr-2" />
                    <p className="font-medium">Total {cart?.length} Item di Keranjang</p>
                </div>
                <ul className="divide-y divide-gray-200 bg-white p-2 rounded-lg shadow-inner border border-gray-100">
                    {cart?.map((item, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm">
                            <div className='flex items-start justify-between gap-1'>
                                <div>
                                    <p className='w-full'>{item.productName}</p>
                                    <p className='w-full'>{item.variantName}</p>
                                </div>
                                <p className='text-red-500 cursor-pointer' >X</p>

                            </div>
                            <div className='flex items-start justify-between gap-1'>
                                <div>
                                    <span className="font-semibold text-gray-800">{item?.quantity}x @</span>
                                    <span className="font-semibold text-gray-800">{formatRupiah(item.finalPrice)}</span>
                                </div>
                                <p>{formatRupiah(item.finalPrice * item?.quantity)}</p>
                            </div>
                        </div>
                    ))}
                </ul>
                <div className="border-t border-gray-300 pt-4 flex justify-between font-bold text-lg text-gray-800">
                    <span>Subtotal:</span>{ }
                    <span>Rp{cartTotal.toLocaleString('id-ID')}</span>
                </div>
                <button
                    className={`w-full mt-4 py-3 text-white font-bold rounded-xl transition duration-200 ${color?.bg600} ${color?.hoverBg700}`}>
                    Lanjut ke Pembayaran
                </button>

            </div>
        );
    }

    // Konten History
    if (type === 'history') {
        return (
            <div className="space-y-4">
                <div className="flex items-center text-gray-500">
                    <Clock size={20} className="mr-2" />
                    <p className="font-medium">2 Riwayat Transaksi Terakhir</p>
                </div>
                <ul className="divide-y divide-gray-200 bg-white p-2 rounded-lg shadow-inner border border-gray-100">
                    {history.map(history => (
                        <li key={history.id} className="py-3 flex justify-between items-center text-gray-700 px-2">
                            <div>
                                <p className="font-medium text-gray-800">Order #{history.id} - {history.productName} Item</p>
                                <p className="text-xs text-gray-500">{history.date}</p>
                            </div>
                            <div className="text-right">
                                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${history.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {history.status}
                                </span>
                                <p className="text-sm font-bold mt-1">Rp{history.finalPrice.toLocaleString('id-ID')}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <p className="text-sm text-center text-gray-500 mt-6">
                    Semua riwayat pemesanan Anda tersimpan di sini.
                </p>
            </div>
        );
    }

    return null;
}

export default ContentDrawerThree