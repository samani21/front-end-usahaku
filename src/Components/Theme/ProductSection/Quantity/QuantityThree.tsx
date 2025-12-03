import { formatRupiah } from '@/lib/Types/Theme/Theme';
import React from 'react'

type Props = {
    id: number | 'base';
    quantity: number;
    onChange: (id: number | 'base', newQuantity: string) => void;
    min: number;
}

function QuantityThree({ id, quantity, onChange, min }: Props) {
    const handleDecrement = () => {
        if (quantity > min) {
            onChange(id, String(quantity - 1));
        }
    };

    const handleIncrement = () => {
        onChange(id, String(quantity + 1));
    };
    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={handleDecrement}
                disabled={quantity <= min}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 text-gray-800 font-bold"
                aria-label="Kurangi jumlah"
            >
                -
            </button>
            <span className="text-lg font-bold w-8 text-center">{quantity}</span>
            <button
                onClick={handleIncrement}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 text-gray-800 font-bold"
                aria-label="Tambah jumlah"
            >
                +
            </button>
        </div>
    )
}

export default QuantityThree