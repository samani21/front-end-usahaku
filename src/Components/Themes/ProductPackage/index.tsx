import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'
import ProductPackageOne from './ProductPackageOne';

type Props = {
    theme: number
    color: ThemeColorSet;
    handlePackage: (val: boolean | string) => void;
    isPackage: boolean | string
}

const ProductPackage = ({ color, handlePackage, isPackage, theme }: Props) => {
    return (
        theme === 1 ? <ProductPackageOne handlePackage={handlePackage}
            isPackage={isPackage}
            color={color} /> : ''
    )
}

export default ProductPackage