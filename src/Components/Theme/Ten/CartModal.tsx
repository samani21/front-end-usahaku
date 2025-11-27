import { CartItem, Service } from '@/lib/Types/Theme/Ten';
import { Minus, Plus, ShoppingCart, X } from 'lucide-react';
import React, { FC } from 'react'

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    cart: Record<string, CartItem>;
    handlePlaceOrder: () => void;
    getThemeClass: (intensity: number, prefix?: string) => void
    cartItemCount: number
    handleUpdateCart: (service: Service, change: number) => void
    cartTotalPrice: number
}
const CartModal: FC<CartModalProps> = ({ isOpen, onClose, cart, handlePlaceOrder, getThemeClass, cartItemCount, handleUpdateCart, cartTotalPrice }) => {
    if (!isOpen) return null;

    const cartItemsArray = Object.values(cart);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                            <ShoppingCart className={`w-6 h-6 mr-2 ${getThemeClass(600)}`} /> Keranjang Belanja ({cartItemCount})
                        </h2>
                        <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100" onClick={onClose} aria-label="Tutup Keranjang">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {cartItemsArray.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">Keranjang Anda kosong. Tambahkan layanan dari katalog!</div>
                    ) : (
                        <div className="space-y-4 mb-6">
                            {cartItemsArray.map(({ service, quantity }) => (
                                <div key={service.id} className={`flex items-center justify-between p-3 ${getThemeClass(50, 'bg')} rounded-xl shadow-sm`}>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-gray-800">{service.name}</p>
                                        <p className={`text-sm ${getThemeClass(600)}`}>Rp {(service.price * quantity).toLocaleString('id-ID')}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleUpdateCart(service, -1)}
                                            className="p-1 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                                            aria-label="Kurangi Kuatitas"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-medium w-6 text-center">{quantity}</span>
                                        <button
                                            onClick={() => handleUpdateCart(service, 1)}
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
                            <span className={`${getThemeClass(600)}`} >Rp {cartTotalPrice.toLocaleString('id-ID')}</span>
                        </div>
                        <button
                            onClick={handlePlaceOrder}
                            disabled={cartItemsArray.length === 0}
                            className={`w-full py-3 text-white text-lg font-semibold rounded-xl shadow-lg transition duration-300 ${cartItemsArray.length > 0 ? `${getThemeClass(600, 'bg')} hover:${getThemeClass(700, 'bg')} transform hover:scale-[1.01]` : 'bg-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Pesan Sekarang & Ambil Antrian
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CartModal