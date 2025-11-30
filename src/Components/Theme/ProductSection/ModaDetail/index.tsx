import React from 'react'
import ModalDetailOne from './ModalDetailOne';
import { Product } from '@/lib/Types/Theme/Theme';

type Props = {
    theme: number;
    product: Product;
    onClose: () => void
    onOrderSuccess: (message: string, type?: 'success' | 'error') => void;
}

const ModalDetailProduct = ({ theme, product, onClose, onOrderSuccess }: Props) => {
    return (
        theme === 1 ?
            <ModalDetailOne product={product}
                onClose={onClose}
                onOrderSuccess={onOrderSuccess} /> : ''
    )
}

export default ModalDetailProduct