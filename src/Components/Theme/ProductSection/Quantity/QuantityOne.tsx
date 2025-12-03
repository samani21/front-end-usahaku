import React from 'react'


const QuantityOne: React.FC<{
    id: number | 'base';
    quantity: number;
    onChange: (id: number | 'base', newQuantity: string) => void;
    label?: string;
    min: number;
}> = ({ id, quantity, onChange, label, min }) => {
    // Fixed Dark Mode colors
    const primaryFocus = `focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400`;
    const textColor = `text-gray-50`;
    const inputBg = 'bg-gray-700';

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
                className={`w-8 h-8 rounded-full bg-gray-800 border border-gray-700 ${textColor} font-bold hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={handleDecrement}
                disabled={quantity <= min}
                aria-label={`Kurangi kuantitas untuk ${label}`}
            >
                -
            </button>
            <input
                type="number"
                min={min}
                value={quantity}
                onChange={(e) => onChange(id, e.target.value)}
                className={`w-20 p-2 border border-gray-600 rounded-lg text-center ${primaryFocus} transition duration-150 ${textColor} ${inputBg}`}
                aria-label={`Kuantitas untuk ${label}`}
                role="spinbutton"
            />
            <button
                className={`w-8 h-8 rounded-full bg-gray-800 border border-gray-700 ${textColor} font-bold hover:bg-gray-700 transition`}
                onClick={handleIncrement}
                aria-label={`Tambahkan kuantitas untuk ${label}`}
            >
                +
            </button>
        </div>
    );
};

export default QuantityOne