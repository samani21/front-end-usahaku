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


const ModalProductDetailFive: React.FC<DetailModalProps> = ({ product, onClose, onOrder, color }) => {
    const [selectedVariant, setSelectedVariant] = React.useState<Variant>(product.variants[0]);
    const [quantity, setQuantity] = React.useState(1);
    const [showConfirmation, setShowConfirmation] = React.useState(false);
    const [isOrder, setIsOrder] = useState<boolean>(false)
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
        setIsOrder(true)
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
            setIsOrder(false)
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full transform transition-all scale-100 p-6 md:p-8">
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className={`${color?.text500} hover:text-red-500 transition duration-150`}
                        aria-label="Tutup detail produk"
                    >
                        <X size={24} />
                    </button>
                </div>

                <h3 className={`text-2xl font-bold ${color?.text800} mt-2 mb-4 border-b pb-2 border-gray-300`}>{product.name}</h3>

                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                // onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/000000?text=Gambar+Tidak+Tersedia"; }}
                />

                <p className={`text-sm ${color?.text600} mb-4`}>{product.description}</p>

                <div className="mb-6">
                    <h4 className="font-semibold text-lg mb-2">Pilih Varian:</h4>
                    <div className="flex flex-wrap gap-2">
                        {product.variants.map(variant => (
                            <button
                                key={variant.id}
                                onClick={() => setSelectedVariant(variant)}
                                className={`px-4 py-2 text-sm rounded-full transition-colors duration-200 ${variant.id === selectedVariant?.id
                                    ? `${color?.bg800} text-white shadow-md`
                                    : `bg-white ${color?.text700} border ${color?.border300} ${color?.hoverBg100}`
                                    }`}
                            >
                                {variant.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-300">
                    <span className={`text-xl font-bold ${color?.text900}`}>
                        {formatRupiah(finalPrice)}
                    </span>
                    <button
                        onClick={handleOrder}
                        disabled={isOrder}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${isOrder
                            ? `bg-green-500 text-white`
                            : `${color?.bg800} text-white ${color?.hoverBg700}`
                            }`}
                    >
                        {isOrder ? (
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

export default ModalProductDetailFive