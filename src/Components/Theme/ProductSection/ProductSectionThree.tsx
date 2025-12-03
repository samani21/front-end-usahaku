import { Product } from '@/lib/Types/Theme/Theme';
import React from 'react'
import ProductCardThree from './ProductCard/ProductCardThree';

type Props = {
    filteredProducts: Product[];
    activeCategory: string;
    onClick: (val: Product) => void;
    color?: string;
    handleFav: (id: number) => void;
}

const ProductSectionThree = ({ filteredProducts, activeCategory, onClick, color, handleFav }: Props) => {
    return (
        <div className="mt-10 px-4 sm:px-6 lg:px-8" id="produk-pilihan">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Produk Tersedia ({activeCategory === 'Semua' ? 'Semua' : activeCategory})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map(product => (
                    <ProductCardThree key={product.id} product={product} color={color} onClick={(p) => onClick(p)} handleFav={handleFav} />
                ))}
                {filteredProducts.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        Tidak ada produk di kategori ini.
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductSectionThree