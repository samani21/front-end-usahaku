import { Product } from '@/hooks/Theme/useProductCatalog'
import { formatRupiah } from '@/lib/Types/Theme/theme'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor'
import { Heart, HeartIcon } from 'lucide-react'
import React from 'react'

type Props = {
    product: Product;
    color: ThemeColorSet;
    handleFav: (id: number) => void;
    onClick: () => void;
}

const Five = ({ product, color, handleFav, onClick }: Props) => {
    return (
        <div
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden transform -translate-y-1"
        >
            <button
                onClick={(e) => { e.stopPropagation(); handleFav(product.id); }}
                className={`absolute top-2 right-2 p-2  rounded-full bg-white/70 ${color?.bg500} backdrop-blur-sm text-red-500 hover:text-red-700 transition`}
                aria-label="Toggle Favorite"
            >
                <Heart size={20} fill={product.isFavorite ? 'currentColor' : 'none'} />
            </button>
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
            // onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/000000?text=Gambar+Tidak+Tersedia"; }}
            />

            <div className="p-4" onClick={onClick}>
                <h3 className={`text-lg font-semibold truncate ${color?.text900}`}>{product.name}</h3>
                <p className={`text-sm ${color?.text500} mb-2`}>{product.category}</p>
                <p className={`text-xl font-bold ${color?.text800}`}>{formatRupiah(product?.price)}</p>
            </div>
        </div>
    )
}

export default Five