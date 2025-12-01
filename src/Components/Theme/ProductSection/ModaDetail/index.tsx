import React from 'react'
import ModalDetailOne from './ModalDetailOne';
import { Product } from '@/lib/Types/Theme/Theme';
import ModalDetailTwo from './ModalDetailTwo';

type Props = {
    theme: number;
    product: Product;
    onClose: () => void
    onOrderSuccess: (message: string, type?: 'success' | 'error') => void;
    color?: string
}

const ModalDetailProduct = ({ theme, product, onClose, onOrderSuccess, color }: Props) => {
    return (
        theme === 1 ?
            <ModalDetailOne product={product}
                onClose={onClose}
                onOrderSuccess={onOrderSuccess} /> :
            theme === 2 ?
                <ModalDetailTwo product={product}
                    onClose={onClose}
                    onOrderSuccess={onOrderSuccess} color={color} /> : ''
    )
}

export default ModalDetailProduct