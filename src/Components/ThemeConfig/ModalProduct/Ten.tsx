import {  Product, Variant } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Minus, Plus, X } from 'lucide-react';
import React, { useState } from 'react'

interface One {
    product: Product;
    onClose: () => void;
    color: ThemeColorSet;
}

const Ten: React.FC<One> = ({ product, onClose, color }) => {
    const [selectedVariant, setSelectedVariant] = React.useState<Variant>(product.variants[0]);
    const [quantity, setQuantity] = React.useState(1);
    const [showConfirmation, setShowConfirmation] = React.useState(false);

    const handleOrder = () => {
        if (quantity < 1) return;
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
            onClose();
        }, 1500);
    };
    return (
        showConfirmation ? <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 text-white font-semibold rounded-lg shadow-xl z-5000 transition-all duration-300 flex items-center ${color?.bg600}`}
            role="alert"
        >
            {quantity}x {product.name} {selectedVariant && `(${selectedVariant?.name})`} telah ditambahkan.
        </div> :
            <div
                className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center transition-opacity duration-300"
                onClick={onClose}
            >
                {/* Modal Content */}
                <div
                    className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-md transform transition-transform duration-300 ease-in-out scale-100"
                    onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing when clicking inside
                >
                    <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-4">
                        <h2 className="text-xl font-bold text-gray-800">{product?.name}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="space-y-4">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-xl"
                        />
                        <p className={`text-2xl font-extrabold ${color?.text600}`}>
                            Rp{product.price.toLocaleString('id-ID')}
                            <span className="text-sm font-medium text-gray-500 ml-2">/{product.isPackage ? 'paket' : 'layanan'}</span>
                        </p>
                        <p className="text-gray-700 text-sm">{product.description}</p>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-300">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition w-8 h-8 flex items-center"
                                >
                                    <Minus />
                                </button>
                                <span className="font-semibold text-lg">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className={`p-2 ${color?.bg500} text-white rounded-full ${color?.hoverBg700} transition  w-8 h-8 flex items-center`}
                                >
                                    <Plus />
                                </button>
                            </div>
                            <button
                                onClick={handleOrder}
                                className={`flex items-center justify-center px-4 py-2 ${color?.bg500} text-white font-semibold rounded-lg shadow-md ${color?.hoverBg700} transition`}
                            >
                                Pesan Sekarang ({quantity})
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Ten