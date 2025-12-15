import { Product } from '@/hooks/Theme/useProductCatalog'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'
import CardProductOne from './Card/CardProductOne';

type Props = {
    filteredProducts: Product[];
    openDetailModal: (val: Product) => void
    handleToggleFavorite: (id: number) => void;
    color: ThemeColorSet;
    activeCategory: string
}

const ListProductOne = ({ filteredProducts, openDetailModal, handleToggleFavorite, color, activeCategory }: Props) => {
    return (
        <section className="space-y-6 mt-4">
            <h2 className="text-3xl font-bold border-b pb-2 border-gray-200 dark:border-gray-700">
                Daftar Produk ({activeCategory})
            </h2>
            {filteredProducts.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-10">Tidak ada produk dalam kategori ini.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts?.map((product) => (
                        <CardProductOne
                            key={product.id}
                            product={product}
                            onClick={() => openDetailModal(product)}
                            onToggleFavorite={handleToggleFavorite}
                            color={color}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

export default ListProductOne