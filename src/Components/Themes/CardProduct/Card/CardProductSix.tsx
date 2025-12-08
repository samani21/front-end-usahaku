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

const CardProductSix: React.FC<ProductCardProps> = ({ product, onClick, onToggleFavorite, color }) => (
    <div
        className={`bg-white rounded-2xl p-4 md:p-6 shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden flex items-center space-x-4 border-l-4 ${color?.border500}`}

    >
        <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-100">
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
            />
        </div>

        {/* Detail Produk */}
        <div className="flex-grow min-w-0">
            <div className="flex items-center space-x-2 mb-1">
                {product.category === 'Best Seller' && (
                    <Zap className="w-4 h-4 text-red-500 fill-red-500" />
                )}
                <h3 className="text-xl font-bold text-gray-900 truncate">{product.name}</h3>
            </div>
            <p className="text-sm text-gray-500 mt-0 truncate">{product.description}</p>

            <div className="flex justify-between items-end mt-2 pt-2">
                <p className={`text-xl font-extrabold ${color?.text700}`}>
                    Rp {(product.price / 1000).toLocaleString('id-ID')}K
                </p>
                <div className='flex items-center gap-2'>
                    <button className={`text-xs text-white ${color?.bg600} ${color?.hoverBg700} px-4 py-2 rounded-full flex items-center shadow-lg transition duration-150`} onClick={onClick}>
                        Pesan <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                    <button className={`text-xs bg-gray-400 hover:bg-gray-600 px-4 py-2 rounded-full flex items-center shadow-lg transition duration-150`} onClick={() => onToggleFavorite(product?.id)}>
                        <Heart className={`${product?.isFavorite ? "text-red-500" : "text-gray-800"} w-4 h-4`} fill={product?.isFavorite ? "red" : 'none'} />
                    </button>
                </div>
            </div>
        </div>
    </div>
);


export default CardProductSix