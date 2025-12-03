import React from 'react'
import QuantityOne from './QuantityOne'
import QuantityThree from './QuantityThree';

type Props = {
    theme: number;
    id: number | 'base';
    quantity: number;
    onChange: (id: number | 'base', newQuantity: string) => void;
    label?: string;
    min: number;
}

const Quantity = ({ theme, id, quantity, onChange, label, min }: Props) => {
    return (
        theme === 1 ?
            <QuantityOne
                id={id}
                quantity={quantity}
                onChange={onChange}
                label={label}
                min={min} /> :
            theme === 3 ?
                <QuantityThree
                    id={id}
                    quantity={quantity}
                    onChange={onChange}
                    min={min} /> : ''
    )
}

export default Quantity