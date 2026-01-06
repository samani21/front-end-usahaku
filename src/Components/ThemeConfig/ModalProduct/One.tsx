import {  Product, Variant } from '@/hooks/Theme/useProductCatalog';
import { formatRupiah } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { CheckCircle, X } from 'lucide-react';
import React from 'react'

interface One {
    product: Product;
    onClose: () => void;
    color: ThemeColorSet;
}

const One: React.FC<One> = ({ product, onClose, color }) => {
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
            <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm z-50">
                <CheckCircle className={`${color?.text600} mb-4`} size={64} />
                <p className={`text-xl font-semibold ${color?.text600}`}>Berhasil Dipesan!</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    {quantity}x {product.name} {selectedVariant && `(${selectedVariant?.name})`} telah ditambahkan.
                </p>
            </div>
        );
    }

    // (Sisa Kode ProductDetailModal yang SAMA, dengan penyesuaian di logic konfirmasi)
    // ...
    return (
        <div
            className="fixed inset-0 bg-gray-900/75 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 relative" // Tambah relative
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-5 border-b dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">Detail Produk</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white p-1 rounded-full">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                        onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x300/000/fff?text=No+Image')}
                    />

                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{product.name}</h4>
                    <p className={`text-3xl font-extrabold ${color?.text600}`}>
                        {formatRupiah(finalPrice)}
                    </p>

                    <p className="text-sm text-gray-600 dark:text-gray-400">{product.description}</p>

                    {/* Variant Selection */}
                    <div className="pt-2 border-t dark:border-gray-700">
                        {
                            product?.variants?.length > 0 &&
                            <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Pilih Varian:</h5>
                        }
                        <div className="space-y-2">
                            {product?.variants?.map((variant) => (
                                <button
                                    key={variant.id}
                                    onClick={() => setSelectedVariant(variant)}
                                    className={`w-full text-left p-3 rounded-lg border transition duration-150 ${selectedVariant.id === variant.id
                                        ? `${color?.border500} ${color?.bg50} ${color?.text800} ring-2`
                                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    <span className="font-medium">{variant.name}</span>
                                    <span className="text-sm ml-2">
                                        ({variant.priceAdjustment >= 0 ? '+' : ''}
                                        {formatRupiah(variant.priceAdjustment)})
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center space-x-3 pt-2">
                        <label htmlFor="quantity" className="font-semibold text-gray-900 dark:text-white">
                            Jumlah:
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-20 p-2 border border-gray-300 rounded-lg text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                </div>

                {/* Footer (Action Button) */}
                <div className="p-5 border-t dark:border-gray-700 flex justify-end">
                    <button
                        onClick={handleOrder}
                        disabled={quantity < 1}
                        className={`px-6 py-3 ${color?.bg600} text-white font-bold rounded-lg shadow-lg ${color?.hoverBg700} transition duration-300 disabled:bg-gray-400`}
                    >
                        Pesan Sekarang ({formatRupiah(finalPrice * quantity)})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default One