import { Product, ThemeColor } from '@/lib/Types/Theme/Six';
import { ChevronRight, Zap } from 'lucide-react';
import React from 'react'

const ProductCard: React.FC<{ product: Product; onSelect: (p: Product) => void; theme: ThemeColor }> =
    ({ product, onSelect, theme }) => {
        return (
            <div
                className={`bg-white rounded-2xl p-4 md:p-6 shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden flex items-center space-x-4 border-l-4 border-${theme.primary}-500`}
                onClick={() => onSelect(product)}
            >
                {/* Gambar Produk */}
                <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-100">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e: any) => { e.target.onerror = null; e.target.src = `https://placehold.co/120x120/${theme.primary}30/ffffff?text=${product.name.substring(0, 1)}`; }}
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
                        <p className={`text-xl font-extrabold text-${theme.primary}-700`}>
                            Rp {(product.base_price / 1000).toLocaleString('id-ID')}K
                        </p>
                        <button className={`text-xs text-white bg-${theme.primary}-600 hover:bg-${theme.primary}-700 px-4 py-2 rounded-full flex items-center shadow-lg transition duration-150`}>
                            Pesan <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };
export default ProductCard