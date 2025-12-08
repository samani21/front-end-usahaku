import { OrderItem, Product, Variant } from '@/hooks/Theme/useProductCatalog';
import { formatRupiah } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { CheckCircle, CheckCircleIcon, Info, Minus, PlusIcon, X, XIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react'

interface DetailModalProps {
    product: Product;
    onClose: () => void;
    onOrder: (item: OrderItem) => void;
    color: ThemeColorSet;
}


const ModalProductDetailSix: React.FC<DetailModalProps> = ({ product, onClose, onOrder, color }) => {
    const [selectedVariant, setSelectedVariant] = React.useState<Variant>(product.variants[0]);
    const [quantity, setQuantity] = React.useState(1);
    const [showConfirmation, setShowConfirmation] = React.useState(false);
    const finalPrice = product.price + (selectedVariant?.priceAdjustment || 0);

    const handleOrder = () => {
        if (quantity < 1) return;
        const orderItem: OrderItem = {
            id: product.id,
            productName: product.name,
            basePrice: product.price,
            variantName: selectedVariant?.name || product?.name,
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
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform scale-100 transition-transform duration-300 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full text-gray-600 hover:bg-gray-100 z-10 shadow-lg border border-gray-100"
                    aria-label="Tutup"
                >
                    <X className="w-5 h-5" />
                </button>
                {showConfirmation ? <div className="text-center p-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                    <h3 className="text-2xl font-bold text-gray-800">Pesanan Berhasil!</h3>
                    <p className="text-gray-600 mt-2">"{product.name}" telah masuk keranjang.</p>
                </div> : <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Image Section */}
                        <div className="md:w-3/5">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-80 object-cover rounded-2xl shadow-xl"
                            />
                        </div>

                        {/* Details Section */}
                        <div className="md:w-2/5 flex flex-col justify-between">
                            <div>
                                <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">{product.name}</h2>
                                <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">{product.category}</span>
                                <p className={`text-2xl font-bold ${color?.text600} mt-2 border-b border-gray-100 pb-3`}>
                                    Rp {(finalPrice).toLocaleString('id-ID')}
                                </p>
                                <p className="text-gray-600 mt-4 text-sm">{product.description}</p>

                                {/* Pilihan Varian */}
                                <div className="mt-6">
                                    <h3 className="font-semibold text-gray-700 mb-2">Pilih Varian:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {product.variants.map((variant) => (
                                            <button
                                                key={variant.id}
                                                onClick={() => setSelectedVariant(variant)}
                                                className={`px-4 py-2 text-sm rounded-full transition duration-150 border-2 ${selectedVariant.id === variant.id
                                                    ? `${color?.bg600} text-white ${color?.border600} shadow-md`
                                                    : `bg-white text-gray-700 border-gray-300 ${color?.bg50}`
                                                    }`}
                                            >
                                                {variant.name} {variant.priceAdjustment > 0 && `(+${variant.priceAdjustment / 1000}k)`}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Quantity and Order Button */}
                            <div className="mt-8 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-lg font-semibold text-gray-700">Jumlah:</span>
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition font-bold text-lg w-10 h-10 flex items-center justify-center"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-bold text-xl">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(q => q + 1)}
                                            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition font-bold text-lg w-10 h-10 flex items-center justify-center"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Total Price and Order Button */}
                                <button
                                    onClick={handleOrder}
                                    className={`w-full ${color?.bg600} text-white font-extrabold py-4 rounded-xl ${color?.hoverBg700} transition duration-300 shadow-lg  flex flex-col items-center text-lg`}
                                >
                                    <span>Tambah Pesanan (Rp {(finalPrice * quantity).toLocaleString('id-ID')})</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default ModalProductDetailSix