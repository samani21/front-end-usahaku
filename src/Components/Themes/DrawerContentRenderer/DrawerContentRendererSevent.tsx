import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { formatRupiah } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import index from '@/pages/auth/[auth]';
import { CheckCircle, ChevronRight, Clock, Heart, History, ShoppingBag, ShoppingCart, X } from 'lucide-react';
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
}

const DrawerContentRendererSevent: React.FC<DrawerContentRendererProps> = ({
    type,
    color,
    favoriteProducts,
    cart,
    history,
    cartTotal,
    handleRemoveFromCart
}) => {
    // Konten Favorit
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
            // cart.length === 0 ? (
            //     <div className="text-center py-10">
            //         <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            //         <p className="text-gray-500">Keranjang Anda masih kosong.</p>
            //     </div>
            // ) : (
            //     <>
            //         <ul className="space-y-4">
            //             {cart.map((item, index) => (
            //                 <li key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl shadow-sm">
            //                     <div>
            //                         <p className="font-semibold text-gray-800">{item.productName}</p>
            //                         <p className="text-sm text-gray-500">({item.variantName}) x {item.quantity}</p>
            //                         <p className="text-sm font-bold text-gray-600 mt-1">Rp {(item.finalPrice).toLocaleString('id-ID')}</p>
            //                     </div>
            //                 </li>
            //             ))}
            //         </ul>
            //         <div className="mt-8 pt-4 border-t border-gray-200">
            //             <div className="flex justify-between font-bold text-xl text-gray-800 mb-4">
            //                 <span>TOTAL AKHIR:</span>
            //                 <span className={`${color?.text700}`}>Rp {cartTotal?.toLocaleString('id-ID')}</span>
            //             </div>
            //             <button
            //                 className={`w-full mt-2 ${color?.bg600} text-white font-extrabold py-3 rounded-xl ${color?.hoverBg700}transition shadow-lg `}
            //             >
            //                 Lanjutkan Pembayaran
            //             </button>
            //         </div>
            //     </>
            // )
            <div className="flex flex-col h-full justify-between">
                <div className="flex-grow overflow-y-auto pr-2">
                    <p className="text-gray-500 mb-4">Layanan yang saat ini ada di keranjang atau dalam proses pemesanan.</p>
                    {cart.length > 0 ? (
                        <ul className="space-y-3">
                            {cart.map((item, index) => (
                                <li key={item.id} className="p-3 bg-blue-50 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm">
                                    <div className="flex-grow mb-2 sm:mb-0">
                                        <span className="font-medium text-gray-800 block">{item.productName}</span>
                                        {/* Tampilkan Harga dan Kuantitas */}
                                        <span className="text-sm text-gray-600">
                                            {item.quantity} x {formatRupiah(item.basePrice)}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        {/* Tampilkan Subtotal */}
                                        <span className="font-bold text-lg text-blue-800">
                                            {formatRupiah(item.finalPrice * item.quantity)}
                                        </span>
                                        {/* Tombol Hapus per item */}
                                        <button
                                            className="text-sm text-red-500 hover:text-red-700 font-medium transition"
                                            onClick={() => handleRemoveFromCart(index)}
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
                                onClick={() => alert('Simulasi: Melanjutkan ke halaman Checkout.')}
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
};


export default DrawerContentRendererSevent