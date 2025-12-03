import { formatRupiah, Product, ProductVariant, VariantQuantities } from '@/lib/Types/Theme/Theme';
import { X } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import Quantity from '../Quantity';

type Props = {
    product: Product;
    onClose: () => void;
    onOrderSuccess: (message: string, type?: 'success' | 'error') => void;
    color?: string
}

const ModalDetailThree = ({ product, onClose, onOrderSuccess, color }: Props) => {
    const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
    const initialQuantities = product.variants.length > 0
        ? product.variants.reduce((acc, variant) => ({ ...acc, [variant.id]: 0 }), {} as VariantQuantities)
        : { 'base': 1 };
    const [variantQuantities, setVariantQuantities] = useState<VariantQuantities>(initialQuantities);
    const [variant, setVariant] = useState<ProductVariant>();

    React.useEffect(() => {
        if (product) {
            setSelectedVariantId(product.variants[0]?.id || null);
        }
    }, [product]);

    if (!product) return null;

    const handleOrder = () => {
        setTimeout(() => onClose(), 1500); // Tutup setelah 1.5 detik
    };

    const handleQuantityChange = useCallback((id: number | 'base', newQuantity: string) => {
        const quantity = parseInt(newQuantity, 10);
        const safeQuantity = Math.max(0, quantity || 0);
        setVariantQuantities(prev => ({
            ...prev,
            [id]: safeQuantity,
        }));
    }, []);

    const showMessage = (message: string) => {
        const modal = document.getElementById('message-modal');
        const messageText = document.getElementById('message-text');
        if (modal && messageText) {
            messageText.textContent = message;
            modal.classList.remove('hidden');
            setTimeout(() => modal.classList.add('hidden'), 3000);
            handleOrder()
        }
    };

    const quantity = (selectedVariantId && variant ? variantQuantities[selectedVariantId] : variantQuantities['base']) || 1;

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
                                        setSelectedVariantId(variant?.id)
                                        setVariant(variant)
                                    }}
                                    className={`w-full text-left p-3 rounded-lg  transition duration-150 ${selectedVariantId === variant.id
                                        ? `border-current bg-${color}-50 ring-2 ring-${color}-500 focus:ring-${color}-500 border-${color}-600`
                                        : 'border border-gray-300 hover:bg-gray-100'
                                        }`}
                                    aria-pressed={selectedVariantId === variant.id}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-800">{variant.name}</span>
                                        <span className={`text-sm font-semibold text-${color}-600`}>
                                            {`+${formatRupiah(variant.priceAdjustment || product?.basePrice)}`}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-300 mt-4">
                        {
                            selectedVariantId && variant ?
                                <Quantity
                                    theme={3}
                                    id={selectedVariantId}
                                    quantity={variantQuantities[selectedVariantId] || 1}
                                    onChange={handleQuantityChange}
                                    label={variant.name}
                                    min={0}
                                /> :
                                <Quantity
                                    theme={3}
                                    id={'base'}
                                    quantity={variantQuantities['base'] || 1}
                                    onChange={handleQuantityChange}
                                    label={product.name}
                                    min={0}
                                />
                        }
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Total Harga:</p>
                            <p className="text-2xl font-extrabold text-red-600">{formatRupiah(quantity * (variant && variant?.priceAdjustment || product?.basePrice))}</p>
                        </div>
                    </div>

                </div>

                {/* Footer / Action Button */}
                <div className="p-4 border-t border-gray-300 sticky bottom-0 bg-white">
                    <button
                        onClick={() => {
                            showMessage(`Berhasil memesan ${quantity}x ${product.name} (${variant && variant.name})!`);
                            onClose();
                        }}
                        className={`w-full bg-${color}-600 text-white p-3 rounded-lg text-lg font-semibold $hover:bg-${color}-700 transition shadow-lg shadow-current/50`}
                    >
                        Tambahkan ke Keranjang
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalDetailThree