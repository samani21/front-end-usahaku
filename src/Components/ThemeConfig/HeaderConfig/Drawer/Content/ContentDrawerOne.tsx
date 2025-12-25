import { OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { formatRupiah } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { History, X } from 'lucide-react';
import React from 'react'

type Props = {
    favoriteProducts: Product[];
    type: string;
    color: ThemeColorSet;
    cart: OrderItem[];
    history: OrderItem[];
    cartTotal: number;
}

const ContentDrawerOne = ({ type, favoriteProducts, cart, cartTotal, history, color }: Props) => {
    if (type === 'favorite') {
        return (
            <div className="space-y-4">
                {favoriteProducts?.length > 0 ? (
                    favoriteProducts?.map((p) => (
                        <div key={p.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
                            <img
                                src={p.imageUrl}
                                alt={p.name}
                                className="w-12 h-12 object-cover rounded-md"
                                onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100/000/fff?text=Fav')}
                            />
                            <div className="flex-grow">
                                <p className="font-semibold text-gray-900 dark:text-white truncate">{p.name}</p>
                                <p className={`text-sm ${color?.text200}`}>{formatRupiah(p.price)}</p>
                            </div>
                            <button
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
                    {cart?.length > 0 ? (
                        cart?.map((item, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
                                <div className="flex-grow">
                                    <p className="font-semibold text-gray-900 dark:text-white">{item.productName}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Varian: {item.variantName}</p>
                                    <p className={`text-sm ${color?.text400}  font-bold mt-1`}>
                                        {item.quantity}x @ {formatRupiah(item.finalPrice)}
                                    </p>
                                    <p className="text-sm text-gray-900 dark:text-white font-bold">
                                        Total: {formatRupiah(item.finalPrice * item.quantity)}
                                    </p>
                                </div>
                                <button
                                    // onClick={() => handleRemoveFromCart(index)}
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
                        <span className={`text-2xl font-extrabold ${color?.text400}`}>{formatRupiah(cartTotal)}</span>
                    </div>
                    <button
                        // onClick={handleCheckout}
                        className={`w-full py-3 ${color?.bg600} text-white font-bold rounded-lg shadow-lg ${color?.hoverBg700} transition duration-300 disabled:bg-gray-400`}
                        disabled={cart.length === 0}
                    >
                        Proses Checkout
                    </button>
                </div>
            </div>
        );
    }

    // Konten History
    if (type === 'history') {
        return (
            <div className="space-y-4">
                {history?.length > 0 ? (
                    history.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm opacity-80">
                            <History size={24} className={`${color?.text400} mt-1 flex-shrink-0`} />
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

}

export default ContentDrawerOne