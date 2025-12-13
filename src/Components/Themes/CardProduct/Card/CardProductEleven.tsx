import { Product } from '@/hooks/Theme/useProductCatalog';
import { formatRupiah } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { col } from 'framer-motion/client';
import { ChevronRight, Heart, HeartIcon, Zap } from 'lucide-react';
import React from 'react'

interface ProductCardProps {
    product: Product;
    onClick: () => void;
    onToggleFavorite: (id: number) => void;
    color: ThemeColorSet;
}

const CardProductEleven: React.FC<ProductCardProps> = ({ product, onClick, onToggleFavorite, color }) => (
    <div
        onClick={onClick}
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full border border-gray-100"
    >
        <div className="relative h-32 bg-gray-100 flex items-center justify-center">
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover rounded-t-xl opacity-80"

            />
            {
                product?.isPackage &&
                <div className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full text-white ${color?.bg500}`}>
                    Paket
                </div>
            }
        </div>
        <div className="p-4 flex-grow">
            <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
            <p className={`text-sm ${color?.text600} font-bold`}>
                Rp {product.price.toLocaleString('id-ID')}
            </p>
            {product.description && (
                <p className="text-xs text-gray-500 mt-2 line-clamp-3">{product.description}</p>
            )}
        </div>
        <div className="p-4 pt-0">
            <button
                onClick={onClick}
                className={`w-full py-2 ${color?.bg50} ${color?.text600} text-sm font-medium rounded-lg ${color?.hoverBg100} transition-colors`}>
                Lihat Detail
            </button>
        </div>
    </div>
);


export default CardProductEleven