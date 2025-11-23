import { DUMMY_FAVORITES, getColorClasses } from '@/lib/Types/Theme/Two';
import { Heart } from 'lucide-react';
import React from 'react'

const FavoriteList: React.FC<{ colorClasses: ReturnType<typeof getColorClasses> }> = ({ colorClasses }) => (
    <div className="space-y-4">
        <div className="flex items-center text-gray-500">
            <Heart size={20} className="mr-2" />
            <p className="font-medium">2 Produk yang Anda Suka</p>
        </div>
        <ul className="divide-y divide-gray-200 bg-white p-2 rounded-lg shadow-inner border border-gray-100">
            {DUMMY_FAVORITES.map(item => (
                <li key={item.id} className="py-3 flex justify-between items-center text-gray-700 hover:bg-gray-50 px-2 rounded transition">
                    <span className="font-medium truncate">{item.productName}</span>
                    <span className={`text-sm font-semibold ${colorClasses.textAccent}`}>Rp{item.price.toLocaleString('id-ID')}</span>
                </li>
            ))}
        </ul>
        <p className="text-sm text-center text-gray-500 mt-6">
            Pilih ikon hati pada produk untuk menambahkannya ke daftar favorit.
        </p>
    </div>
);


export default FavoriteList