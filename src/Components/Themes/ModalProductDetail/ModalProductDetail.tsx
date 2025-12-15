import React from 'react';
import { OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';

/* ===================== Modal Variants ===================== */
import ModalProductDetailOne from './ModalProductDetailOne';
import ModalProductDetailTwo from './ModalProductDetailTwo';
import ModalProductDetailThree from './ModalProductDetailThree';
import ModalProductDetailDarkLight from './ModalProductDetailDarkLight';
import ModalProductDetailFive from './ModalProductDetailFive';
import ModalProductDetailSix from './ModalProductDetailSix';
import ModalProductDetailSevent from './ModalProductDetailSevent';
import ModalProductDetailEight from './ModalProductDetailEight';
import ModalProductDetailNine from './ModalProductDetailNine';
import ModalProductDetailTen from './ModalProductDetailTen';
import ModalProductDetailEleven from './ModalProductDetailEleven';
import ModalProductDetailTwelve from './ModalProductDetailTwelve';

/* ===================== Props ===================== */
type Props = {
    theme: number | string;
    selectedProduct: Product;
    closeDetailModal: () => void;
    handleAddToCart: (item: OrderItem) => void;
    color: ThemeColorSet;
    themeMode: 'Dark' | 'Light';
};

const ModalProductDetail = ({
    theme,
    selectedProduct,
    closeDetailModal,
    handleAddToCart,
    color,
    themeMode
}: Props) => {
    const commonProps = {
        product: selectedProduct,
        onClose: closeDetailModal,
        onOrder: handleAddToCart,
        color,
    };

    /* ===================== Numeric Theme ===================== */
    switch (theme) {
        case 1:
            return <ModalProductDetailOne {...commonProps} />;
        case 2:
            return <ModalProductDetailTwo {...commonProps} />;
        case 3:
            return <ModalProductDetailThree {...commonProps} />;
        case 5:
            return <ModalProductDetailFive {...commonProps} />;
        case 4:
            return <ModalProductDetailDarkLight
                {...commonProps}
                themeMode={themeMode}
            />;
        case 6:
            return <ModalProductDetailSix {...commonProps} />;
        case 7:
            return <ModalProductDetailSevent {...commonProps} />;
        case 8:
            return <ModalProductDetailEight {...commonProps} />;
        case 9:
            return <ModalProductDetailNine {...commonProps} />;
        case 10:
            return <ModalProductDetailTen {...commonProps} />;
        case 11:
            return <ModalProductDetailEleven {...commonProps} />;
        case 12:
            return <ModalProductDetailTwelve {...commonProps} />;
        default:
            return null;
    }
};

export default ModalProductDetail;
