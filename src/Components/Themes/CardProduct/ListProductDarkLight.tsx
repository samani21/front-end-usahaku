import { Product } from '@/hooks/Theme/useProductCatalog'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'
import CardProductDarkLight from './Card/CardProductDarkLight';

type Props = {
    filteredProducts: Product[];
    openDetailModal: (val: Product) => void
    handleToggleFavorite: (id: number) => void;
    color: ThemeColorSet;
    activeCategory: string;
    themeMode: number | string;
}

const ListProductDarkLight = ({ filteredProducts, openDetailModal, handleToggleFavorite, color, activeCategory, themeMode }: Props) => {
    const mainTextColor = themeMode === 'Dark' ? 'text-gray-50' : 'text-gray-800';
    const cardBgColor = themeMode === 'Dark' ? `bg-gray-800` : 'bg-white';
    const subtleTextColor = themeMode === 'Dark' ? `text-gray-400` : 'text-gray-900';
    const primaryText = themeMode === 'Dark' ? `text-cyan-500` : color?.text500;
    return (
        <section>
            <h2 className={`text-4xl font-bold ${mainTextColor} mb-8`}>Produk Pilihan</h2>
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" role="list">
                    {filteredProducts.map(product => (
                        <CardProductDarkLight key={product.id}
                            product={product}
                            onClick={() => openDetailModal(product)}
                            onToggleFavorite={handleToggleFavorite}
                            color={color}
                            themeMode={themeMode} />
                    ))}
                </div>
            ) : (
                <div className={`text-center p-10 ${cardBgColor} rounded-xl shadow-md border ${themeMode === 'Dark' ? 'border-gray-700/20' : 'border-gray-300'}`}>
                    <p className={`text-xl ${subtleTextColor}`}>Tidak ada produk di kategori <span className={`font-bold ${primaryText}`}>"{activeCategory}"</span>.</p>
                </div>
            )}
        </section>
    )
}

export default ListProductDarkLight