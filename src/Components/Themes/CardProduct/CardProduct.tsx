import React from 'react';
import { Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';

/* ===================== Product Lists ===================== */
import ListProductOne from './ListProductOne';
import ListProductTwo from './ListProductTwo';
import ListProductThree from './ListProductThree';
import ListProductDarkLight from './ListProductDarkLight';
import ListProductFive from './ListProductFive';
import ListProductSix from './ListProductSix';
import ListProductSevent from './ListProductSevent';
import ListProductEight from './ListProductEight';
import ListProductNine from './ListProductNine';
import ListProductTen from './ListProductTen';
import ListProductEleven from './ListProductEleven';
import ListProductTwelve from './ListProductTwelve';

/* ===================== Props ===================== */
type Props = {
    theme: number | string;
    filteredProducts: Product[];
    openDetailModal: (val: Product) => void;
    handleToggleFavorite: (id: number) => void;
    color: ThemeColorSet;
    activeCategory: string;
    themeMode: 'Dark' | 'Light';
};

const CardProduct = ({
    theme,
    filteredProducts,
    openDetailModal,
    handleToggleFavorite,
    color,
    activeCategory,
    themeMode
}: Props) => {
    const commonProps = {
        filteredProducts,
        openDetailModal,
        handleToggleFavorite,
        color,
        activeCategory,
    };

    /* ===================== Numeric Theme ===================== */
    switch (theme) {
        case 1:
            return <ListProductOne {...commonProps} />;
        case 2:
            return <ListProductTwo {...commonProps} />;
        case 3:
            return <ListProductThree {...commonProps} />;
        case 4:
            return <ListProductDarkLight
                {...commonProps}
                themeMode={themeMode}
            />;
        case 5:
            return <ListProductFive {...commonProps} />;
        case 6:
            return <ListProductSix {...commonProps} />;
        case 7:
            return <ListProductSevent {...commonProps} />;
        case 8:
            return <ListProductEight {...commonProps} />;
        case 9:
            return <ListProductNine {...commonProps} />;
        case 10:
            return <ListProductTen {...commonProps} />;
        case 11:
            return <ListProductEleven {...commonProps} />;
        case 12:
            return <ListProductTwelve {...commonProps} />;
        default:
            return null;
    }
};

export default CardProduct;
