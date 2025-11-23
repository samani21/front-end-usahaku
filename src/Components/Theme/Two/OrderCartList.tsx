import { DUMMY_ORDERS, getColorClasses } from '@/lib/Types/Theme/Two';
import { ShoppingBag } from 'lucide-react';
import React from 'react'

const OrderCartList: React.FC<{ colorClasses: ReturnType<typeof getColorClasses> }> = ({ colorClasses }) => {
    const subtotal = DUMMY_ORDERS.reduce((sum, item) => sum + item.price, 0);
    return (
        <div className="space-y-4">
            <div className="flex items-center text-gray-500">
                <ShoppingBag size={20} className="mr-2" />
                <p className="font-medium">Total {DUMMY_ORDERS.length} Item di Keranjang</p>
            </div>
            <ul className="divide-y divide-gray-200 bg-white p-2 rounded-lg shadow-inner border border-gray-100">
                {DUMMY_ORDERS.map(item => (
                    <li key={item.id} className="py-3 flex justify-between items-center text-gray-700 px-2">
                        <span className="truncate">
                            <span className={`font-bold mr-2 ${colorClasses.textAccent}`}>{item.quantity}x</span>
                            {item.productName} ({item.variant})
                        </span>
                        <span className="text-sm font-semibold">Rp{item.price.toLocaleString('id-ID')}</span>
                    </li>
                ))}
            </ul>
            <div className="border-t border-gray-300 pt-4 flex justify-between font-bold text-lg text-gray-800">
                <span>Subtotal:</span>
                <span>Rp{subtotal.toLocaleString('id-ID')}</span>
            </div>
            <button className={`w-full mt-4 py-3 text-white font-bold rounded-xl transition duration-200 ${colorClasses.primaryBg}`}>
                Lanjut ke Pembayaran
            </button>
        </div>
    );
};
export default OrderCartList