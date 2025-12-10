import { Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'
import ListProductOne from './ListProductOne';
import ListProductTwo from './ListProductTwo';
import ListProductThree from './ListProductThree';
import ListProductDarkLight from './ListProductDarkLight';
import ListProductFive from './ListProductFive';
import ListProductSix from './ListProductSix';
import ListProductSevent from './ListProductSevent';
import ListProductEight from './ListProductEight';
import ListProductNine from './ListProductNine';

type Props = {
    theme: number | string;
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
                activeCategory={activeCategory} /> :
                theme === 3 ? <ListProductThree filteredProducts={filteredProducts}
                    openDetailModal={openDetailModal}
                    handleToggleFavorite={handleToggleFavorite}
                    color={color}
                    activeCategory={activeCategory} /> :
                    typeof theme === "string" && (theme === "Dark" || theme === "Light") ?
                        <ListProductDarkLight filteredProducts={filteredProducts}
                            openDetailModal={openDetailModal}
                            handleToggleFavorite={handleToggleFavorite}
                            color={color}
                            activeCategory={activeCategory}
                            themeMode={theme} /> :
                        theme === 5 ? <ListProductFive filteredProducts={filteredProducts}
                            openDetailModal={openDetailModal}
                            handleToggleFavorite={handleToggleFavorite}
                            color={color}
                            activeCategory={activeCategory} /> :
                            theme === 6 ? <ListProductSix filteredProducts={filteredProducts}
                                openDetailModal={openDetailModal}
                                handleToggleFavorite={handleToggleFavorite}
                                color={color}
                                activeCategory={activeCategory} /> :
                                theme === 7 ? <ListProductSevent filteredProducts={filteredProducts}
                                    openDetailModal={openDetailModal}
                                    handleToggleFavorite={handleToggleFavorite}
                                    color={color}
                                    activeCategory={activeCategory} /> :
                                    theme === 8 ? <ListProductEight filteredProducts={filteredProducts}
                                        openDetailModal={openDetailModal}
                                        handleToggleFavorite={handleToggleFavorite}
                                        color={color}
                                        activeCategory={activeCategory} /> :
                                        ""
    )
}

export default CardProduct