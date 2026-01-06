import { Product, Variant } from '@/hooks/Theme/useProductCatalog';
import { formatRupiah } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { X } from 'lucide-react';
import React, { useState } from 'react'

interface One {
    product: Product;
    onClose: () => void;
    color: ThemeColorSet;
}

const Elevent: React.FC<One> = ({ product, onClose, color }) => {
    const [selectedVariant, setSelectedVariant] = React.useState<Variant>(product.variants[0]);
    const [quantity, setQuantity] = React.useState(1);
    const [showConfirmation, setShowConfirmation] = React.useState(false);
    const finalPrice = product.price + (selectedVariant?.priceAdjustment || 0);

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
                        <div className="mb-4">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-lg mb-3"
                            />
                            <p className={`text-3xl font-extrabold ${color?.text600} mt-2`}>
                                Rp {product.price.toLocaleString('id-ID')}
                            </p>
                            <p className="text-gray-500 mt-2">{product.description}</p>
                            {
                                product.category &&
                                <p className="text-sm text-gray-600 mt-1">Kategori: <span className={`font-medium ${color?.text600}`}>{product.category}</span></p>
                            }
                            {
                                product?.isPackage &&
                                <p className="text-sm text-gray-600">Jenis: <span className={`font-medium ${color?.text600}`}>{product.isPackage && "Paket"}</span></p>
                            }
                            {
                                product?.information && product?.information?.length > 0 &&
                                product?.information?.map((info, i) => (
                                    <p key={i} className="text-sm text-gray-600">{info}</p>
                                ))
                            }
                        </div>

                        <button
                            onClick={handleOrder}
                            className={`w-full py-3 ${color?.bg600} text-white text-lg font-semibold rounded-xl shadow-lg ${color?.hoverBg700} transition duration-300 transform hover:scale-[1.01]`}
                        >
                            Tambah ke Keranjang
                        </button>
                    </div>
                </div>
            </div>
    );
};

export default Elevent