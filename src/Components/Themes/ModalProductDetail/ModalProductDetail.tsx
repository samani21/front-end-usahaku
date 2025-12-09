import React from 'react'
import ModalProductDetailOne from './ModalProductDetailOne'
import { OrderItem, Product } from '@/hooks/Theme/useProductCatalog'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import ModalProductDetailTwo from './ModalProductDetailTwo';
import ModalProductDetailThree from './ModalProductDetailThree';
import ModalProductDetailDarkLight from './ModalProductDetailDarkLight';
import ModalProductDetailFive from './ModalProductDetailFive';
import ModalProductDetailSix from './ModalProductDetailSix';
import ModalProductDetailSevent from './ModalProductDetailSevent';

type Props = {
    theme: number | string;
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
                    color={color} /> :
                theme === 3 ?
                    <ModalProductDetailThree product={selectedProduct}
                        onClose={closeDetailModal}
                        onOrder={handleAddToCart}
                        color={color} /> :
                    typeof theme === "string" && (theme === "Dark" || theme === "Light") ?
                        <ModalProductDetailDarkLight product={selectedProduct}
                            onClose={closeDetailModal}
                            onOrder={handleAddToCart}
                            color={color}
                            themeMode={theme} /> :
                        theme === 5 ?
                            <ModalProductDetailFive product={selectedProduct}
                                onClose={closeDetailModal}
                                onOrder={handleAddToCart}
                                color={color} /> :
                            theme === 6 ?
                                <ModalProductDetailSix product={selectedProduct}
                                    onClose={closeDetailModal}
                                    onOrder={handleAddToCart}
                                    color={color} /> :
                                theme === 7 ?
                                    <ModalProductDetailSevent product={selectedProduct}
                                        onClose={closeDetailModal}
                                        onOrder={handleAddToCart}
                                        color={color} /> : ''
    )
}

export default ModalProductDetail