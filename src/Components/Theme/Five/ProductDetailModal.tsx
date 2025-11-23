import { Product } from '@/lib/Types/Theme/Five';
import { formatRupiah } from '@/lib/Types/Theme/One';
import { CheckCircle, X } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    product: Product
    onClose: () => void
}
const ProductDetailModal = ({ product, onClose }: Props) => {
    const [selectedVariantId, setSelectedVariantId] = useState(product?.variants[0]?.id || null);
    const [isOrdered, setIsOrdered] = useState(false);

    if (!product) return null;

    const selectedVariant = product.variants.find(v => v.id === selectedVariantId);
    const finalPrice = product.base_price + (selectedVariant?.price_modifier || 0);

    const handleOrder = () => {
        setIsOrdered(true);
        setTimeout(() => {
            setIsOrdered(false);
            onClose(); // Tutup setelah order
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full transform transition-all scale-100 p-6 md:p-8">
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 transition duration-150"
                        aria-label="Tutup detail produk"
                    >
                        <X size={24} />
                    </button>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-2 mb-4 border-b pb-2">{product.name}</h3>

                <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                // onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/000000?text=Gambar+Tidak+Tersedia"; }}
                />

                <p className="text-sm text-gray-600 mb-4">{product.description}</p>

                <div className="mb-6">
                    <h4 className="font-semibold text-lg mb-2">Pilih Varian:</h4>
                    <div className="flex flex-wrap gap-2">
                        {product.variants.map(variant => (
                            <button
                                key={variant.id}
                                onClick={() => setSelectedVariantId(variant.id)}
                                className={`px-4 py-2 text-sm rounded-full transition-colors duration-200 ${variant.id === selectedVariantId
                                    ? 'bg-gray-800 text-white shadow-md'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                                    }`}
                            >
                                {variant.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <span className="text-xl font-bold text-gray-900">
                        {formatRupiah(finalPrice)}
                    </span>
                    <button
                        onClick={handleOrder}
                        disabled={isOrdered}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${isOrdered
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-900'
                            }`}
                    >
                        {isOrdered ? (
                            <>
                                <CheckCircle size={18} />
                                <span>Dipesan!</span>
                            </>
                        ) : (
                            <span>Pesan Sekarang</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal