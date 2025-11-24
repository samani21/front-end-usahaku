import { DUMMY_COLORS, OrderItem, Product, ProductColor, ProductVariant, ThemeColor } from '@/lib/Types/Theme/Six';
import React, { useMemo, useState } from 'react'
import ModalWrapper from './ModalWrapper';
import { CheckCircle } from 'lucide-react';

const ProductDetailModal: React.FC<{ product: Product; onClose: () => void; onOrder: (item: OrderItem) => void; theme: ThemeColor }> =
    ({ product, onClose, onOrder, theme }) => {
        const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
        const [selectedColor] = useState<ProductColor>(DUMMY_COLORS[0]);
        const [quantity, setQuantity] = useState(1);
        const [isConfirmed, setIsConfirmed] = useState(false);

        const finalPrice = useMemo(() => product.base_price + selectedVariant.price_modifier, [product.base_price, selectedVariant]);
        const total = useMemo(() => finalPrice * quantity, [finalPrice, quantity]);

        const handleOrder = () => {
            onOrder({ product, variant: selectedVariant, color: selectedColor, quantity, subtotal: total });
            setIsConfirmed(true);
            setTimeout(onClose, 1500);
        };

        if (isConfirmed) {
            return (
                <ModalWrapper onClose={onClose}>
                    <div className="text-center p-8">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                        <h3 className="text-2xl font-bold text-gray-800">Pesanan Berhasil!</h3>
                        <p className="text-gray-600 mt-2">"{product.name}" telah masuk keranjang.</p>
                    </div>
                </ModalWrapper>
            );
        }

        return (
            <ModalWrapper onClose={onClose}>
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Image Section */}
                    <div className="md:w-3/5">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-80 object-cover rounded-2xl shadow-xl"
                            onError={(e: any) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/${theme.primary}50/ffffff?text=Detail+${product.name.replace(/\s/g, '+')}`; }}
                        />
                    </div>

                    {/* Details Section */}
                    <div className="md:w-2/5 flex flex-col justify-between">
                        <div>
                            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">{product.name}</h2>
                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">{product.category}</span>
                            <p className={`text-2xl font-bold text-${theme.primary}-600 mt-2 border-b border-gray-100 pb-3`}>
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
                                                    ? `bg-${theme.primary}-600 text-white border-${theme.primary}-600 shadow-md`
                                                    : `bg-white text-gray-700 border-gray-300 hover:bg-${theme.primary}-50`
                                                }`}
                                        >
                                            {variant.name} {variant.price_modifier > 0 && `(+${variant.price_modifier / 1000}k)`}
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
                                className={`w-full bg-${theme.primary}-600 text-white font-extrabold py-4 rounded-xl hover:bg-${theme.primary}-700 transition duration-300 shadow-lg shadow-${theme.primary}-500/50 flex flex-col items-center text-lg`}
                            >
                                <span>Tambah Pesanan (Rp {total.toLocaleString('id-ID')})</span>
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
        );
    };

export default ProductDetailModal