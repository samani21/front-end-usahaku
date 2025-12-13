import { Product } from '@/hooks/Theme/useProductCatalog';
import { formatRupiah } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { col } from 'framer-motion/client';
import { ChevronRight, Gift, Heart, HeartIcon, Zap } from 'lucide-react';
import React from 'react'

interface ProductCardProps {
    product: Product;
    onClick: () => void;
    onToggleFavorite: (id: number) => void;
    color: ThemeColorSet;
}

const CardProductTwelve: React.FC<ProductCardProps> = ({ product, onClick, onToggleFavorite, color }) => (
    <div
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer transform hover:scale-[1.01]"
        onClick={onClick}
    >
        {/* Gambar Produk */}
        <div className="relative h-36 bg-gray-100">
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"

            />
            {/* Badge untuk Paket */}
            {product?.isPackage && (
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                    <Gift size={14} className="inline-block mr-1 -mt-0.5" /> Hemat!
                </span>
            )}
        </div>
        {/* Detail Produk */}
        <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">{product.name}</h3>
            {/* Harga tetap hijau agar terasa seperti harga, namun bisa diubah jika perlu */}
            <p className="text-sm font-bold text-green-600">{formatRupiah(product.price)}</p>
            {product.description && (
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">{product.description}</p>
            )}
            {/* Tombol Pesan menggunakan warna PRIMER tema agar sinkron dengan header */}
            <button className={`mt-3 w-full flex items-center justify-center space-x-2 text-sm font-medium text-white ${color?.bg700} ${color?.hoverBg600} rounded-lg py-2 transition-colors`}>
                <span>Pesan</span>
                <ChevronRight size={16} />
            </button>
        </div>
    </div>
);


export default CardProductTwelve