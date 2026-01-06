import { Product } from '@/hooks/Theme/useProductCatalog'
import { formatRupiah } from '@/lib/Types/Theme/theme'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor'
import { Heart } from 'lucide-react'
import React from 'react'

type Props = {
    product: Product;
    color: ThemeColorSet;
    handleFav: (id: number) => void;
    onClick: () => void;
}

const One = ({ product, color, handleFav, onClick }: Props) => {
    return (
        <div
            onClick={onClick}
            className={`bg-white dark:bg-gray-700 dark:hover:text-gray-400 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden group flex flex-col cursor-pointer h-full ${color?.hoverText600}`}
        >
            <div className="relative">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-40 object-cover transform group-hover:scale-[1.03] transition duration-500"
                    onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x300/000/fff?text=No+Image')}
                />
                <button
                    onClick={() => handleFav(product?.id)}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/70 backdrop-blur-sm text-red-500 hover:text-red-700 transition"
                    aria-label="Toggle Favorite"
                >
                    <Heart size={20} fill={product.isFavorite ? 'currentColor' : 'none'} />
                </button>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate mb-1">
                    {product.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{product.description}</p>
                <p className={`text-2xl font-extrabold mt-auto ${color?.text200}`}>
                    {formatRupiah(product.price)}
                </p>
                <div className="text-xs text-gray-400 mt-1">
                    Mulai dari
                </div>
            </div>
        </div>
    )
}

export default One