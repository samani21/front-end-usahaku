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
}

const DrawerContentRendererFive: React.FC<DrawerContentRendererProps> = ({
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

            // <div className="space-y-4">
            //     <div className="flex items-center text-gray-500">
            //         <ShoppingBag size={20} className="mr-2" />
            //         <p className="font-medium">Total {cart?.length} Item di Keranjang</p>
            //     </div>
            //     <ul className="divide-y divide-gray-200 bg-white p-2 rounded-lg shadow-inner border border-gray-100">
            //         {cart?.map((item, index) => (
            //             <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm">
            //                 <div className='flex items-start justify-between gap-1'>
            //                     <div>
            //                         <p className='w-full'>{item.productName}</p>
            //                         <p className='w-full'>{item.variantName}</p>
            //                     </div>
            //                     <p className='text-red-500 cursor-pointer' onClick={() => handleRemoveFromCart(index)}>X</p>

            //                 </div>
            //                 <div className='flex items-start justify-between gap-1'>
            //                     <div>
            //                         <span className="font-semibold text-gray-800">{item?.quantity}x @</span>
            //                         <span className="font-semibold text-gray-800">{formatRupiah(item.finalPrice)}</span>
            //                     </div>
            //                     <p>{formatRupiah(item.finalPrice * item?.quantity)}</p>
            //                 </div>
            //             </div>
            //         ))}
            //     </ul>
            //     <div className="border-t border-gray-300 pt-4 flex justify-between font-bold text-lg text-gray-800">
            //         <span>Subtotal:</span>{ }
            //         <span>Rp{cartTotal.toLocaleString('id-ID')}</span>
            //     </div>
            //     <button className={`w-full mt-4 py-3 text-white font-bold rounded-xl transition duration-200 ${color?.bg600} ${color?.hoverBg700}`}>
            //         Lanjut ke Pembayaran
            //     </button>

            // </div>
            <div className="flex flex-col space-y-4 h-full">
                {/* List Item */}
                <ul className="space-y-4">
                    {cart.map(item => (
                        <li key={item.id} className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                            <p className="font-semibold text-gray-800">{item.productName}</p>
                            <div className="flex justify-between items-center text-sm mt-1">
                                <span className="text-gray-500">
                                    {item.quantity} x {formatRupiah(item.basePrice)}
                                </span>
                                <span className="font-bold text-gray-900">
                                    {/* Subtotal */}
                                    {formatRupiah(item.basePrice * item.quantity)}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Total and Button */}
                <div className="mt-auto pt-4 border-t-2 border-gray-200 flex-shrink-0">
                    <div className="flex justify-between items-center text-xl font-bold mb-4">
                        <span className="text-gray-800">TOTAL:</span>
                        <span className={color?.text600}>{formatRupiah(cartTotal)}</span>
                    </div>

                    {/* Tombol Bayar */}
                    <button

                        className={`w-full py-3 ${color?.bg800} text-white font-bold rounded-lg hover:bg-gray-700 transition duration-300 shadow-lg disabled:bg-gray-400`}
                        disabled={cart.length === 0}
                    >
                        Bayar Sekarang
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-2">
                        *Simulasi: Cek konsol untuk log transaksi.
                    </p>
                </div>
            </div>
        );
    }

    // Konten History
    if (type === 'history') {
        return (
            <ul className="space-y-3 text-gray-600">
                {history.map(history => (
                    <li key={history.id} className="p-3 border-b">
                        <div className='flex items-center justify-between'>
                            <p>Ranjang Tidur Kayu Emas</p>
                            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${history.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                {history.status}
                            </span>
                        </div>
                        <div className='flex items-center justify-between'>
                            {history.date}
                            <p className="text-sm font-bold mt-1">Rp{history.finalPrice.toLocaleString('id-ID')}</p>
                        </div>
                    </li>
                ))}
                <li className="text-sm text-gray-500 pt-2">Riwayat 2 bulan terakhir.</li>
            </ul>
        );
    }

    return null;
};


export default DrawerContentRendererFive