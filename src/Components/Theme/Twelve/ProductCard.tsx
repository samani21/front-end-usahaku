import { DUMMY_FAVORITES, Product } from '@/lib/Types/Theme/Twelve';
import { Heart } from 'lucide-react';
import React from 'react'

interface ProductCardProps {
    product: Product;
    onClick: (product: Product) => void;
    themePrimary: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, themePrimary }) => {
    const isFavorite = DUMMY_FAVORITES.includes(product.id);

    return (
        <div
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:scale-[1.02]"
            onClick={() => onClick(product)}
        >
            <div className="relative h-40 w-full overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/CCCCCC/666666?text=Foto+Produk'; }}
                />
                <div className="absolute top-2 right-2 p-1 bg-white rounded-full shadow">
                    <Heart size={20} className={isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2 min-h-[2.5rem]">{product.description || "Deskripsi produk tidak tersedia."}</p>
                <div className="mt-3 flex justify-between items-center">
                    <span className={`text-xl font-bold text-${themePrimary}-600`}>
                        Rp{product.price.toLocaleString('id-ID')}
                    </span>
                    <button className={`text-sm font-medium text-white bg-${themePrimary}-500 px-3 py-1 rounded-full hover:bg-${themePrimary}-600 transition-colors`}>
                        Pesan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard