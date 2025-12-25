import { OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { formatRupiah } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Minus, Plus } from 'lucide-react';
import React from 'react'

type Props = {
    favoriteProducts: Product[];
    type: string;
    color: ThemeColorSet;
    cart: OrderItem[];
    history: OrderItem[];
    cartTotal: number;
}

const ContentDrawerNine = ({ type, favoriteProducts, cart, cartTotal, history, color }: Props) => {
    if (type === 'favorite') {
        return (
            <ul className="space-y-4">
                {favoriteProducts.length > 0 ? (
                    <ul className="space-y-3">
                        {favoriteProducts.map(item => (
                            <li className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-medium shadow-sm">{item?.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500 italic py-8">Belum ada layanan favorit.</p>
                )}
                {
                    favoriteProducts.length > 0 &&
                    <p className="text-sm mt-3 text-gray-500 italic">Total {favoriteProducts.length} item favorit Anda.</p>
                }
            </ul>
        );
    }

    // Konten Cart
    if (type === 'cart') {
        return (
            <div>
                {cart.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">Keranjang Anda kosong. Tambahkan layanan dari katalog!</div>
                ) : (
                    <div className="space-y-4 mb-6">
                        {cart?.map((c, i) => (
                            <div key={i} className={`flex items-center justify-between p-3 ${color?.bg50} rounded-xl shadow-sm`}>
                                <div className="flex-grow">
                                    <p className="font-semibold text-gray-800">{c.productName}</p>
                                    <p className={`text-sm ${color?.text600}`}>Rp {(c.finalPrice * c?.quantity).toLocaleString('id-ID')}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button

                                        className="p-1 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                                        aria-label="Kurangi Kuatitas"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="font-medium w-6 text-center">{c?.quantity}</span>
                                    <button

                                        className="p-1 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                                        aria-label="Tambah Kuantitas"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="border-t border-gray-300  pt-4">
                    <div className="flex justify-between items-center text-xl font-bold text-gray-800 mb-4">
                        <span>Total Bayar:</span>
                        <span className={`${color?.text600}`} >Rp {cartTotal.toLocaleString('id-ID')}</span>
                    </div>
                    <button
                        disabled={cart?.length === 0}
                        className={`w-full py-3 text-white text-lg font-semibold rounded-xl shadow-lg transition duration-300 ${cart?.length > 0 ? `${color?.bg600} ${color?.hoverBg700} transform hover:scale-[1.01]` : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Pesan Sekarang & Ambil Antrian
                    </button>
                </div>
            </div>
        );
    }

    // Konten History
    if (type === 'history') {
        return (
            <div>
                {history?.length > 0 ? history?.map((item, index) => (
                    <div key={index} className="mb-4 p-3 border rounded-lg bg-gray-50">
                        <p className="font-bold text-sm text-gray-800">No. Pesanan: {item.id}</p>
                        <p className="text-xs text-gray-500 mb-2">{item.date}</p>
                        <p className="text-sm">
                            <span className="font-semibold">{item.productName}</span> ({item.variantName}) x {item.quantity}
                        </p>
                    </div>
                ))
                    :
                    <p className="text-center text-gray-500 italic py-8">Tidak ada riwayat pemesanan.</p>
                }
            </div>
        );
    }

    return null;
}

export default ContentDrawerNine