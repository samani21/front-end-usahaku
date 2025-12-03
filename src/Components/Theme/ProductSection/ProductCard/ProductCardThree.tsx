import { formatRupiah, Product } from '@/lib/Types/Theme/Theme';
import { Heart, HeartIcon } from 'lucide-react';
import React from 'react'

type Props = {
    product: Product;
    onClick: (p: Product) => void;
    color?: string;
    handleFav: (id: number) => void;

}

const ProductCardThree = ({ product, onClick, color, handleFav }: Props) => {
    return (
        <div
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer border border-gray-100"
            aria-label={`Beli ${product.name}`}
        >
            <div className="h-36 bg-gray-200 flex items-center justify-center overflow-hidden" onClick={() => onClick(product)}>
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-cover w-full h-full transform transition-all duration-500 hover:scale-105"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/e5e7eb/4b5563?text=No+Image'; }}
                />
            </div>
            <div className="p-4">
                <h3 className="text-md font-semibold text-gray-900 line-clamp-2 min-h-[3rem]" onClick={() => onClick(product)}>{product.name}</h3>
                <p className={`text-lg font-bold text-${color}-600 mt-1`} onClick={() => onClick(product)}>{formatRupiah(product.basePrice)}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-3 min-h-[3rem]">{product.description}</p>
                <div className='flex items-center gap-2'>
                    <button className={`mt-3 w-full bg-${color}-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-${color}-700 transition`} onClick={() => onClick(product)}>
                        Lihat Detail
                    </button>
                    <button className={`w-2/9 mt-3 py-2 rounded-lg text-sm ${product?.isFavorite?'text-red-500':'text-gray-600'} font-medium transition flex justify-center items-center bg-gray-300 hover:text-red-500 hover:bg-gray-200`} onClick={() => handleFav(product?.id)}>
                        <Heart />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCardThree