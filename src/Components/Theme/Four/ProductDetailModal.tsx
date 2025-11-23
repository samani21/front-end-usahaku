import { ColorClasses, OrderItem, Product, Variant } from '@/lib/Types/Theme/Four';
import { CheckCircle, X } from 'lucide-react';
import React, { useState } from 'react'

interface DetailModalProps {
    product: Product;
    onClose: () => void;
    onOrder: (item: OrderItem) => void;
    colors: ColorClasses; // Tambahan prop warna
}

const ProductDetailModal: React.FC<DetailModalProps> = ({ product, onClose, onOrder, colors }) => {
    const [selectedVariant, setSelectedVariant] = useState<Variant>(product.variants[0]);
    const [quantity, setQuantity] = useState(1);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const finalPrice = product.price + selectedVariant.priceAdjustment;

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    const handleOrder = () => {
        if (quantity < 1) return;

        const orderItem: OrderItem = {
            productId: product.id,
            productName: product.name,
            basePrice: product.price,
            variantName: selectedVariant.name,
            finalPrice: finalPrice,
            quantity: quantity,
        };

        onOrder(orderItem);
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
            onClose();
        }, 1500);
    };

    const ringAccentClass = colors.borderAccent.replace('border-', 'ring-'); // e.g. 'ring-teal-500'

    return (
        <>
            {/* Modal Overlay */}
            <div
                className="fixed inset-0 bg-gray-900/75 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
                onClick={onClose}
            >
                {/* Modal Content */}
                <div
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
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
                        {/* Menggunakan primaryText untuk Harga */}
                        <p className={`text-3xl font-extrabold ${colors.primaryText} ${colors.primaryTextDark}`}>
                            {formatRupiah(finalPrice)}
                        </p>

                        <p className="text-sm text-gray-600 dark:text-gray-400">{product.description}</p>

                        {/* Variant Selection */}
                        <div className="pt-2 border-t dark:border-gray-700">
                            <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Pilih Varian:</h5>
                            <div className="space-y-2">
                                {product.variants.map((variant) => (
                                    <button
                                        key={variant.id}
                                        onClick={() => setSelectedVariant(variant)}
                                        className={`w-full text-left p-3 rounded-lg border transition duration-150 ${selectedVariant.id === variant.id
                                            ? `${colors.borderAccent} ${colors.backgroundAccent} ${colors.textAccent} ${colors.backgroundAccentDark} ${colors.primaryTextDark} ring-2 ${ringAccentClass}`
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
                            // Menggunakan primary dan primaryHover
                            className={`px-6 py-3 ${colors.primary} text-white font-bold rounded-lg shadow-lg ${colors.primaryHover} transition duration-300 disabled:bg-gray-400`}
                        >
                            Pesan Sekarang ({formatRupiah(finalPrice * quantity)})
                        </button>
                    </div>

                    {/* Konfirmasi Pesanan */}
                    {showConfirmation && (
                        <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm">
                            {/* Menggunakan primaryText untuk ikon dan teks */}
                            <CheckCircle className={`${colors.primaryText.replace('text-', 'text-')} mb-4`} size={64} />
                            <p className={`text-xl font-semibold ${colors.primaryText} ${colors.primaryTextDark}`}>Berhasil Dipesan!</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                {quantity}x {product.name} ({selectedVariant.name}) telah ditambahkan ke Pesanan.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
export default ProductDetailModal