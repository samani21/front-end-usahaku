import { formatRupiah, Product, ThemeClasses } from '@/lib/Types/Theme/Three';
import React from 'react'

const ProductCard: React.FC<{ product: Product; onClick: (product: Product) => void; themeClasses: ThemeClasses }> = ({ product, onClick, themeClasses }) => (
    <div
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer border border-gray-100"
        onClick={() => onClick(product)}
        aria-label={`Beli ${product.name}`}
    >
        <div className="h-36 bg-gray-200 flex items-center justify-center overflow-hidden">
            <img
                src={product.imageUrl}
                alt={product.name}
                className="object-cover w-full h-full transform transition-all duration-500 hover:scale-105"
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/e5e7eb/4b5563?text=No+Image'; }}
            />
        </div>
        <div className="p-4">
            <h3 className="text-md font-semibold text-gray-900 line-clamp-2 min-h-[3rem]">{product.name}</h3>
            <p className={`text-lg font-bold ${themeClasses?.primaryText} mt-1`}>{formatRupiah(product.basePrice)}</p>
            <p className="text-xs text-gray-500 mt-1 line-clamp-3 min-h-[3rem]">{product.description}</p>
            <button className={`mt-3 w-full ${themeClasses.primaryBg} text-white py-2 rounded-lg text-sm font-medium ${themeClasses.primaryHoverBg} transition`}>
                Lihat Detail
            </button>
        </div>
    </div>
);


export default ProductCard