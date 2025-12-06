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


const ModalProductDetailTwo: React.FC<DetailModalProps> = ({ product, onClose, onOrder, color }) => {
    const [selectedVariant, setSelectedVariant] = React.useState<Variant>(product.variants[0]);
    const [quantity, setQuantity] = React.useState(1);
    const [showConfirmation, setShowConfirmation] = React.useState(false);
    const [isOrder, setIsOrder] = useState<boolean>(false);
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
        setIsOrder(true)
        onOrder(orderItem);
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
            onClose();
        }, 1500);
    };

    if (showConfirmation) {
        // Render Konfirmasi Pesanan secara overlay dalam modal
        return (
            <div
                className={`fixed top-4 right-4 z-9999 p-4 rounded-xl shadow-2xl transition-all duration-500 transform ${color?.bg600} text-white max-w-sm ${showConfirmation ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                role="alert"
            >
                <div className="flex items-center space-x-3">
                    <CheckCircleIcon className="text-white" />
                    <p className="font-medium text-sm">{quantity}x {product.name} {selectedVariant && `(${selectedVariant?.name})`} telah ditambahkan.</p>
                </div>
            </div>
        );
    }

    // (Sisa Kode ProductDetailModal yang SAMA, dengan penyesuaian di logic konfirmasi)
    // ...
    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg md:max-h-[90vh] overflow-hidden transform transition-all duration-300">
                <div className="p-6 relative">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white hover:bg-gray-100 text-gray-600 transition z-10"
                        aria-label="Tutup Detail Produk"
                    >
                        <X size={20} />
                    </button>

                    {/* Product Image */}
                    <div className="mb-4">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-lg"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = `https://placehold.co/400x300/e0e0e0/333333?text=${product.name}`;
                            }}
                        />
                    </div>

                    {/* Product Info */}
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className={`text-xl font-semibold mb-4 ${color?.text600}`}>
                        Rp{product?.price.toLocaleString('id-ID')}
                    </p>
                    <p className="text-gray-600 text-sm mb-6">{product.description}</p>

                    {/* Variant Selector */}
                    <div className="mb-6">
                        <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                            <Info size={18} className={`mr-2 ${color?.text500}`} /> Pilih Varian
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {product.variants.map(variant => {
                                return (
                                    <button
                                        key={variant.id}
                                        onClick={() => setSelectedVariant(variant)}
                                        className={`px-4 py-2 text-sm font-medium rounded-full transition duration-150 ${selectedVariant?.id === variant.id
                                            ? `${color?.bg600} text-white shadow-md`
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {variant.name} {variant.priceAdjustment > 0 && `(+Rp${variant.priceAdjustment / 1000}K)`}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    <div className='pb-4 flex items-center gap-4'>
                        <button className='bg-gray-300 rounded-full p-[4px] hover:bg-gray-400' onClick={() => setQuantity(quantity - 1)}>
                            <Minus />
                        </button>
                        <div className='bg-gray-200 px-4 py-1 rounded-[8px]'>
                            {quantity}
                        </div>
                        <button className='bg-gray-300 rounded-full p-[4px] hover:bg-gray-400' onClick={() => setQuantity(quantity + 1)}>
                            <PlusIcon />
                        </button>
                    </div>
                    <button
                        onClick={handleOrder}
                        disabled={isOrder}
                        className={`w-full py-3 rounded-xl text-white font-bold transition duration-300 flex items-center justify-center ${isOrder ? 'bg-green-500 cursor-not-allowed' : `${color?.bg600} ${color?.hoverBg700} shadow-lg`
                            }`}
                    >
                        {isOrder ? (
                            <>
                                <CheckCircle size={20} className="mr-2" /> Berhasil Dipesan!
                            </>
                        ) : (
                            `Pesan Sekarang (Rp${(finalPrice * quantity).toLocaleString('id-ID')})`
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalProductDetailTwo