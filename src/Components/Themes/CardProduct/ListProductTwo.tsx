import { Product } from '@/hooks/Theme/useProductCatalog'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'
import CardProductOne from './Card/CardProductOne';
import CardProductTwo from './Card/CardProductTwo';

type Props = {
    filteredProducts: Product[];
    openDetailModal: (val: Product) => void
    handleToggleFavorite: (id: number) => void;
    color: ThemeColorSet;
    activeCategory: string
}

const ListProductTwo = ({ filteredProducts, openDetailModal, handleToggleFavorite, color, activeCategory }: Props) => {
    return (
        <div className="mt-10" id="produk-pilihan">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Produk Tersedia ({activeCategory === 'Semua' ? 'Semua' : activeCategory})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map(product => (
                     <CardProductTwo
                            key={product.id}
                            product={product}
                            onClick={() => openDetailModal(product)}
                            onToggleFavorite={handleToggleFavorite}
                            color={color}
                        />
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

export default ListProductTwo