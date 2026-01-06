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

const Three: React.FC<One> = ({ product, onClose, color }) => {
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

    if (showConfirmation) {
        // Render Konfirmasi Pesanan secara overlay dalam modal
        return (
            <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
                <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl transition duration-300 ease-out">
                    <span className="font-medium"> Berhasil memesan {quantity}x {product.name} {selectedVariant && `(${selectedVariant.name})`}!</span>
                </div>
            </div>
        );
    }

    // (Sisa Kode ProductDetailModal yang SAMA, dengan penyesuaian di logic konfirmasi)
    // ...
    return (

        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
            <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl transition-transform duration-300" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-300 flex justify-between items-center p-4">
                    <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
                    <button className="text-gray-500 hover:text-gray-700 p-1" onClick={onClose} aria-label="Tutup Detail">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">

                    {/* Product Image */}
                    <div className="w-full h-56 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="object-cover w-full h-full"
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/e5e7eb/4b5563?text=Detail+Produk'; }}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-semibold mb-1">Deskripsi</h3>
                        <p className="text-gray-600 text-sm">{product.description}</p>
                    </div>

                    {/* Variants */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Pilih Varian</h3>
                        <div className="space-y-2">
                            {product.variants.map((variant) => (
                                <button
                                    key={variant.id}
                                    onClick={() => {
                                        setSelectedVariant(variant)
                                    }}
                                    className={`w-full text-left p-3 rounded-lg  transition duration-150 ${selectedVariant?.id === variant.id
                                        ? `border-current ${color?.bg50} ring-2 ${color?.ring500} ${color?.focusRing500} ${color?.border500}`
                                        : 'border border-gray-300 hover:bg-gray-100'
                                        }`}
                                    aria-pressed={selectedVariant?.id === variant.id}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-800">{variant.name}</span>
                                        <span className={`text-sm font-semibold ${color?.text600}`}>
                                            {`${variant.priceAdjustment > 0 ? '+' : ''}${formatRupiah(variant.priceAdjustment || product?.price)}`}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-300 mt-4">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setQuantity(quantity - 1)}
                                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 text-gray-800 font-bold"
                                aria-label="Kurangi jumlah"
                            >
                                -
                            </button>
                            <span className="text-lg font-bold w-8 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 text-gray-800 font-bold"
                                aria-label="Tambah jumlah"
                            >
                                +
                            </button>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Total Harga:</p>
                            <p className={`text-2xl font-extrabold ${color?.text600}`}>{formatRupiah(finalPrice)}</p>
                        </div>
                    </div>

                </div>

                {/* Footer / Action Button */}
                <div className="p-4 border-t border-gray-300 sticky bottom-0 bg-white">
                    <button
                        onClick={handleOrder}
                        className={`w-full ${color?.bg600} text-white p-3 rounded-lg text-lg font-semibold ${color?.hoverBg700} transition shadow-lg shadow-current/50`}
                    >
                        Tambahkan ke Keranjang
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Three