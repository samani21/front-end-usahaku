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
}

const ContentDrawerEight = ({ type, favoriteProducts, cart, cartTotal, history, color }: Props) => {
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
                <p className="text-sm mt-3 text-gray-500 italic">Total 2 item favorit Anda.</p>
            </ul>
        );
    }

    // Konten Cart
    if (type === 'cart') {
        return (
            <div>
                {cart.length > 0 ?
                    <>
                        <ul className="space-y-4">
                            {cart.map((item, index) => (
                                <li key={index} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center bg-white shadow-sm">
                                    <span className="text-slate-800 font-medium">{item?.productName} (x{item?.quantity})</span><span className={`font-extrabold ${color?.text600}`}>{formatRupiah(item?.finalPrice * item?.quantity)}</span>
                                </li>
                            ))}
                            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between font-bold text-xl text-slate-800">
                                <span>Total:</span>
                                <span className={`${color?.text600}`}> {formatRupiah(cartTotal)}</span>
                            </div>
                        </ul>
                        <div className="p-5 border-t border-gray-100 flex-shrink-0">
                            <button
                                className={`w-full py-3 text-white font-semibold rounded-xl transition duration-150 shadow-md ${color?.bg600} ${color?.hoverBg700} `}
                            >
                                Lanjutkan Belanja
                            </button>
                        </div>
                    </> : <p className="text-center text-gray-500 italic py-8">Keranjang Anda kosong.</p>}

            </div>
        );
    }

    // Konten History
    if (type === 'history') {
        return (
            // <div>
            //     <p className="text-gray-500 mb-4">Riwayat pemesanan layanan Anda sebelumnya.</p>
            //     {history.length > 0 ? (
            //         <ul className="space-y-3">
            //             {history.map(item => (
            //                 <li key={item.id} className="p-3 bg-green-50 rounded-lg flex justify-between items-center shadow-sm">
            //                     <div>
            //                         <span className="font-medium text-gray-700 block">{item.productName}</span>
            //                         <span className="text-xs text-gray-500">Tanggal: {item.date}</span>
            //                     </div>
            //                     <button className="text-sm text-green-600 hover:underline">Lihat Invoice</button>
            //                 </li>
            //             ))}
            //         </ul>
            //     ) : (
            //         <p className="text-center text-gray-500 italic py-8">Tidak ada riwayat pemesanan.</p>
            //     )}
            // </div>
            history.length > 0 ?
                <ul className="space-y-4">
                    {history.map(item => (
                        <li className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center">
                            <span>#ORD-2024-10-15</span><span className="text-sm text-green-600 font-medium">Selesai</span>
                        </li>
                    ))}
                </ul> :
                <p className="text-center text-gray-500 italic py-8">Tidak ada riwayat pemesanan.</p>
        );
    }

    return null;
}

export default ContentDrawerEight