import { Product } from '@/lib/Types/Theme/Theme'
import React from 'react'
import ProductCardOne from './ProductCard/ProductCardOne';

type Props = {
    filteredProducts: Product[];
    activeCategory: string;
    onClick: (val: Product) => void
}

const ProductSectionOne = ({ filteredProducts, activeCategory, onClick }: Props) => {

    return (
        <section id="produk-pilihan">
            <h2 className={`text-4xl font-bold text-gray-50 mb-8`}>Produk Pilihan</h2>
            {filteredProducts?.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" role="list">
                    {filteredProducts?.map(product => (
                        <ProductCardOne key={product.id} product={product} onClick={(p) => onClick(p)} />
                    ))}
                </div>
            ) : (
                <div className={`text-center p-10 bg-gray-800 rounded-xl shadow-md border border-gray-700/20`}>
                    <p className={`text-xl text-cyan-400`}>Tidak ada produk di kategori <span className={`font-bold text-gray-400`}>"{activeCategory}"</span>.</p>
                </div>
            )}
        </section>
    )
}

export default ProductSectionOne