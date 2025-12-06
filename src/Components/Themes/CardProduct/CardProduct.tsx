import { Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'
import ListProductOne from './ListProductOne';
import ListProductTwo from './ListProductTwo';

type Props = {
    theme: number;
    filteredProducts: Product[];
    openDetailModal: (val: Product) => void
    handleToggleFavorite: (id: number) => void;
    color: ThemeColorSet;
    activeCategory: string
}

const CardProduct = ({ theme, filteredProducts, openDetailModal, handleToggleFavorite, color, activeCategory
}: Props) => {
    return (
        theme === 1 ? <ListProductOne filteredProducts={filteredProducts}
            openDetailModal={openDetailModal}
            handleToggleFavorite={handleToggleFavorite}
            color={color}
            activeCategory={activeCategory} /> :
            theme === 2 ? <ListProductTwo filteredProducts={filteredProducts}
                openDetailModal={openDetailModal}
                handleToggleFavorite={handleToggleFavorite}
                color={color}
                activeCategory={activeCategory} /> : ''
    )
}

export default CardProduct