import { CartItem, Product } from '@/lib/Types/Theme/Twelve';
import { Loader, X } from 'lucide-react';
import React, { useState } from 'react'

interface DetailModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (item: CartItem) => void;
    themePrimary: string;
}

const ProductDetailModal: React.FC<DetailModalProps> = ({ product, isOpen, onClose, onAddToCart, themePrimary }) => {
    const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id || null);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    React.useEffect(() => {
        // Reset state when product changes or modal opens
        setSelectedVariantId(product.variants[0]?.id || null);
        setQuantity(1);
    }, [product, isOpen]);

    if (!isOpen || !product) return null;

    const selectedVariant = product.variants.find(v => v.id === selectedVariantId);
    const totalItemPrice = (product.price + (selectedVariant?.price || 0)) * quantity;

    const handleAddToCart = () => {
        if (!selectedVariant) return;
        setIsAdding(true);

        const item: CartItem = {
            productId: product.id,
            variantId: selectedVariant.id,
            name: product.name,
            variantName: selectedVariant.name,
            price: product.price + selectedVariant.price,
            quantity: quantity,
        };

        setTimeout(() => { // Simulate API delay
            onAddToCart(item);
            setIsAdding(false);
            onClose();
        }, 500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
                <div className="p-4 border-b border-gray-300 flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-900">Detail Produk</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                        <X size={24} />
                    </button>
                </div>

                <div className="overflow-y-auto p-6 flex-grow">
                    {/* Gambar Produk */}
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/480x192/CCCCCC/666666?text=Foto+Produk'; }}
                    />

                    {/* Nama & Deskripsi */}
                    <h4 className="text-xl font-semibold text-gray-900">{product.name}</h4>
                    <p className="text-gray-600 mt-2 text-sm">{product.description}</p>

                    <div className="mt-4 pt-4 border-t border-gray-300">
                        <p className={`text-lg font-bold text-${themePrimary}-600`}>
                            Harga Dasar: Rp{product.price.toLocaleString('id-ID')}
                        </p>
                    </div>

                    {/* Varian Pilihan */}
                    <div className="mt-4">
                        <h5 className="text-lg font-semibold mb-2">Pilih Varian:</h5>
                        <div className="space-y-2">
                            {product.variants.map((variant) => (
                                <button
                                    key={variant.id}
                                    onClick={() => setSelectedVariantId(variant.id)}
                                    className={`w-full text-left p-3 border rounded-lg transition-all flex justify-between items-center ${selectedVariantId === variant.id
                                        ? `border-${themePrimary}-500 bg-${themePrimary}-50 ring-2 ring-${themePrimary}-200`
                                        : 'border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className='font-medium'>{variant.name}</span>
                                    {variant.price > 0 && <span className='text-sm text-gray-500'>+ Rp{variant.price.toLocaleString('id-ID')}</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Kontrol Kuantitas */}
                    <div className="mt-6 flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-semibold text-gray-700">Jumlah:</span>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="p-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300"
                            >
                                -
                            </button>
                            <span className="font-bold text-lg w-6 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(q => q + 1)}
                                className="p-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer: Tombol Pesan */}
                <div className="p-4 bg-white border-t border-gray-300 sticky bottom-0">
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`w-full py-3 bg-${themePrimary}-600 text-white font-bold text-lg rounded-xl hover:bg-${themePrimary}-700 transition-colors flex items-center justify-center disabled:bg-gray-400`}
                    >
                        {isAdding ? (
                            <>
                                <Loader size={20} className="animate-spin mr-2" />
                                Memproses...
                            </>
                        ) : (
                            `Tambahkan ke Pesanan - Rp${totalItemPrice.toLocaleString('id-ID')}`
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};


export default ProductDetailModal