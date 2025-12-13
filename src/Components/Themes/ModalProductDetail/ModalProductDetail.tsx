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
import ModalProductDetailEight from './ModalProductDetailEight';
import ModalProductDetailNine from './ModalProductDetailNine';
import ModalProductDetailTen from './ModalProductDetailTen';
import ModalProductDetailEleven from './ModalProductDetailEleven';
import ModalProductDetailTwelve from './ModalProductDetailTwelve';

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
                                        color={color} /> :
                                    theme === 8 ?
                                        <ModalProductDetailEight product={selectedProduct}
                                            onClose={closeDetailModal}
                                            onOrder={handleAddToCart}
                                            color={color} /> :
                                        theme === 9 ?
                                            <ModalProductDetailNine product={selectedProduct}
                                                onClose={closeDetailModal}
                                                onOrder={handleAddToCart}
                                                color={color} /> :
                                            theme === 10 ?
                                                <ModalProductDetailTen product={selectedProduct}
                                                    onClose={closeDetailModal}
                                                    onOrder={handleAddToCart}
                                                    color={color} /> :
                                                theme === 11 ?
                                                    <ModalProductDetailEleven product={selectedProduct}
                                                        onClose={closeDetailModal}
                                                        onOrder={handleAddToCart}
                                                        color={color} /> :
                                                    theme === 12 ?
                                                        <ModalProductDetailTwelve product={selectedProduct}
                                                            onClose={closeDetailModal}
                                                            onOrder={handleAddToCart}
                                                            color={color} /> : ''
    )
}

export default ModalProductDetail