import React from 'react';
import { Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';

/* ===================== Components ===================== */
import ProductRecomendedOne from './ProductRecomendedOne';

/* ===================== Props ===================== */
type Props = {
    theme: number | string;
    title: string;
    color: ThemeColorSet;
    productRecomended?: Product[];
    openDetailModal: (val: Product) => void;
};

const ProductRecomended = ({
    theme,
    color,
    title,
    productRecomended,
    openDetailModal,
}: Props) => {
    const commonProps = {
        color,
        title,
        productRecomended,
        openDetailModal,
    };

    switch (theme) {
        case 1:
            return <ProductRecomendedOne {...commonProps} />;
        default:
            return null;
    }
};

export default ProductRecomended;
