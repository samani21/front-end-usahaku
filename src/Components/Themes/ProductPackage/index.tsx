import React from 'react';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';

/* ===================== Components ===================== */
import ProductPackageOne from './ProductPackageOne';

/* ===================== Props ===================== */
type Props = {
    theme: number;
    color: ThemeColorSet;
    handlePackage: (val: boolean | string) => void;
    isPackage: boolean | string;
};

const ProductPackage = ({
    theme,
    color,
    handlePackage,
    isPackage,
}: Props) => {
    const commonProps = {
        color,
        handlePackage,
        isPackage,
    };

    switch (theme) {
        case 1:
            return <ProductPackageOne {...commonProps} />;
        default:
            return null;
    }
};

export default ProductPackage;
