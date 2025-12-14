import { Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'
import ProductRecomendedOne from './ProductRecomendedOne';

type Props = {
    theme: number | string;
    title: string;
    color: ThemeColorSet;
    productRecomended?: Product[];
    openDetailModal: (val: Product) => void
}

const ProductRecomended = ({ theme, color, productRecomended, title, openDetailModal }: Props) => {
    return (
        theme === 1 ?
            <ProductRecomendedOne color={color}
                productRecomended={productRecomended} title={title} openDetailModal={openDetailModal} /> : ""
    )
}

export default ProductRecomended