import { Product } from '@/hooks/Theme/useProductCatalog';
import { formatRupiah } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Heart, HeartIcon } from 'lucide-react';
import React from 'react'

interface ProductCardProps {
    product: Product;
    onClick: () => void;
    onToggleFavorite: (id: number) => void;
    color: ThemeColorSet;
}

const CardProductTwo: React.FC<ProductCardProps> = ({ product, onClick, onToggleFavorite, color }) => (
    <div
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
    >
        <img
            onClick={onClick}
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover object-center"
            onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/400x300/e0e0e0/333333?text=${product.name}`;
            }}
        />
        <div className="p-4">
            <div className='flex items-center justify-between'>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-1 text-${color}-600`}>
                    {product.category}
                </p>
                <div onClick={() => onToggleFavorite(product?.id)}>
                    {product.isFavorite ? <HeartIcon className="text-red-500 w-5 h-5 flex-shrink-0" /> : <HeartIcon className="text-gray-500 w-5 h-5 flex-shrink-0" />}
                </div>
            </div>
            <div onClick={onClick}>

                <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">{product.name}</h3>
                <p className="text-xl font-bold text-gray-900">
                    Rp{product.price.toLocaleString('id-ID')}
                </p>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.description}</p>
            </div>
        </div>
    </div>
);


export default CardProductTwo