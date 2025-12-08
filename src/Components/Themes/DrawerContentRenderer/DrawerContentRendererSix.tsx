import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { formatRupiah } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { CheckCircle, Clock, Heart, History, ShoppingBag, ShoppingCart, X } from 'lucide-react';
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

const DrawerContentRendererSix: React.FC<DrawerContentRendererProps> = ({
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
            favoriteProducts.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Belum ada item favorit.</p>
            ) : (
                <ul className="space-y-4">
                    {favoriteProducts.map(item => (
                        <li key={item.id} className="flex items-center space-x-4 p-4 bg-red-50 rounded-xl shadow-sm">
                            <Heart className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <div className="flex-grow">
                                <p className="font-semibold text-gray-800">{item.name}</p>
                                <p className="text-sm text-gray-500">Rp {(item.price).toLocaleString('id-ID')}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )
        );
    }

    // Konten Cart
    if (type === 'cart') {
        return (
            cart.length === 0 ? (
                <div className="text-center py-10">
                    <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Keranjang Anda masih kosong.</p>
                </div>
            ) : (
                <>
                    <ul className="space-y-4">
                        {cart.map((item, index) => (
                            <li key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl shadow-sm">
                                <div>
                                    <p className="font-semibold text-gray-800">{item.productName}</p>
                                    <p className="text-sm text-gray-500">({item.variantName}) x {item.quantity}</p>
                                    <p className="text-sm font-bold text-gray-600 mt-1">Rp {(item.finalPrice).toLocaleString('id-ID')}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 pt-4 border-t border-gray-200">
                        <div className="flex justify-between font-bold text-xl text-gray-800 mb-4">
                            <span>TOTAL AKHIR:</span>
                            <span className={`${color?.text700}`}>Rp {cartTotal?.toLocaleString('id-ID')}</span>
                        </div>
                        <button
                            className={`w-full mt-2 ${color?.bg600} text-white font-extrabold py-3 rounded-xl ${color?.hoverBg700}transition shadow-lg `}
                        >
                            Lanjutkan Pembayaran
                        </button>
                    </div>
                </>
            )
        );
    }

    // Konten History
    if (type === 'history') {
        return (
            history.length === 0 ? (
                <div className="text-center py-10">
                    <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Anda belum memiliki riwayat pesanan.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {history.map((order, index) => (
                        <div key={index} className={`border border-gray-200 rounded-xl p-5 bg-white shadow-md`}>
                            <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-2">
                                <h4 className={`font-extrabold text-lg text-gray-800`}>Order #{history.length - index}</h4>
                                <span className={`text-sm font-semibold text-green-600 flex items-center`}>
                                    <CheckCircle className='w-4 h-4 mr-1' /> Selesai
                                </span>
                            </div>
                            <li className="flex justify-between text-gray-700">
                                <span className='w-3/4 truncate'>{order?.productName} ({order?.variantName})</span>
                                <span className='font-semibold'>x {order?.quantity}</span>
                            </li>
                            <div className={`mt-4 pt-3 border-t border-gray-200 flex justify-between font-bold text-lg text-gray-900`}>
                                <span>TOTAL:</span>
                                <span className={color?.text800}>Rp {(order?.finalPrice * order?.quantity).toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )
        );
    }

    return null;
};


export default DrawerContentRendererSix