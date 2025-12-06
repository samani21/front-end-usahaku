import React from 'react'
import ModalProductDetailOne from './ModalProductDetailOne'
import { OrderItem, Product } from '@/hooks/Theme/useProductCatalog'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import ModalProductDetailTwo from './ModalProductDetailTwo';

type Props = {
    theme: number;
    selectedProduct: Product;
    closeDetailModal: () => void;
    handleAddToCart: (item: OrderItem) => void
    color: ThemeColorSet;
}

const ModalProductDetail = ({ theme, selectedProduct, closeDetailModal, handleAddToCart, color }: Props) => {
    return (
        theme === 1 ?
            <ModalProductDetailOne product={selectedProduct}
                onClose={closeDetailModal}
                onOrder={handleAddToCart}
                color={color} /> :
            theme === 2 ?
                <ModalProductDetailTwo product={selectedProduct}
                    onClose={closeDetailModal}
                    onOrder={handleAddToCart}
                    color={color} /> : ''
    )
}

export default ModalProductDetail