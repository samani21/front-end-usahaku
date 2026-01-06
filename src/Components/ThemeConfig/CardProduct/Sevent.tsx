import { Product } from '@/hooks/Theme/useProductCatalog'
import { formatRupiah } from '@/lib/Types/Theme/theme'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor'
import { ChevronRight, Heart, HeartIcon } from 'lucide-react'
import React from 'react'

type Props = {
    product: Product;
    color: ThemeColorSet;
    onClick: () => void;
}

const Sevent = ({ product, color, onClick }: Props) => {
    return (
        <div
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full"
            onClick={onClick}
        >
            <div className="h-40 bg-gray-100 overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // Mencegah loop tak terbatas
                        target.src = 'https://placehold.co/400x300/94a3b8/ffffff?text=Gagal+Muat'; // Placeholder fallback
                    }}
                />
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                    <span className={`text-xs font-medium ${color?.text600} ${color?.bg50} px-2 py-0.5 rounded-full mb-1 inline-block`}>
                        {product.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                    {product.description && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-3">{product.description}</p>
                    )}
                </div>
                <div className="mt-2 flex justify-between items-center">
                    <span className={`text-xl font-extrabold ${color?.text600}`}>
                        Rp {product.price?.toLocaleString('id-ID')}
                    </span>
                    <button
                        className={`text-sm font-semibold ${color?.text600} hover:opacity-80 transition flex items-center`}
                        onClick={onClick}
                    >
                        Lihat Detail <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sevent