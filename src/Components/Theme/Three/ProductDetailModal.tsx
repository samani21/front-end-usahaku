import { formatRupiah, Product, THEME_MAP, ThemeClasses, ThemeName } from '@/lib/Types/Theme/Three';
import { X } from 'lucide-react';
import React, { useState } from 'react'

const ProductDetailModal: React.FC<{ product: Product; onClose: () => void; themeClasses: ThemeClasses }> = ({ product, onClose, themeClasses }) => {
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
    const [quantity, setQuantity] = useState(1);

    const finalPrice = product.basePrice * quantity + selectedVariant.priceAdjustment * quantity;

    // Custom alert/message box instead of window.alert
    const showMessage = (message: string) => {
        const modal = document.getElementById('message-modal');
        const messageText = document.getElementById('message-text');
        if (modal && messageText) {
            messageText.textContent = message;
            modal.classList.remove('hidden');
            setTimeout(() => modal.classList.add('hidden'), 3000);
        }
    };


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
                                    onClick={() => setSelectedVariant(variant)}
                                    className={`w-full text-left p-3 rounded-lg  transition duration-150 ${selectedVariant.id === variant.id
                                        ? `border-current ${themeClasses.primaryBgLight} ring-2 ${themeClasses.primaryRing}`
                                        : 'border border-gray-300 hover:bg-gray-100'
                                        }`}
                                    // Set border color dynamically for current selection
                                    style={{ borderColor: selectedVariant.id === variant.id ? THEME_MAP[Object.keys(THEME_MAP).find(key => THEME_MAP[key as ThemeName] === themeClasses)! as ThemeName].primaryText.replace('text-', 'border-') : undefined }}
                                    aria-pressed={selectedVariant.id === variant.id}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-800">{variant.name}</span>
                                        <span className={`text-sm font-semibold ${themeClasses.primaryText}`}>
                                            {variant.priceAdjustment > 0 ? `+${formatRupiah(variant.priceAdjustment)}` : 'Harga Dasar'}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-300 mt-4">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 text-gray-800 font-bold"
                                aria-label="Kurangi jumlah"
                            >
                                -
                            </button>
                            <span className="text-lg font-bold w-8 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(prev => prev + 1)}
                                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 text-gray-800 font-bold"
                                aria-label="Tambah jumlah"
                            >
                                +
                            </button>
                        </div>

                        <div className="text-right">
                            <p className="text-sm text-gray-500">Total Harga:</p>
                            {/* Price remains red for emphasis */}
                            <p className="text-2xl font-extrabold text-red-600">{formatRupiah(finalPrice)}</p>
                        </div>
                    </div>

                </div>

                {/* Footer / Action Button */}
                <div className="p-4 border-t border-gray-300 sticky bottom-0 bg-white">
                    <button
                        onClick={() => {
                            showMessage(`Berhasil memesan ${quantity}x ${product.name} (${selectedVariant.name})!`);
                            onClose();
                        }}
                        className={`w-full ${themeClasses.primaryBg} text-white p-3 rounded-lg text-lg font-semibold ${themeClasses.primaryHoverBg} transition shadow-lg shadow-current/50`}
                    >
                        Tambahkan ke Keranjang
                    </button>
                </div>
            </div>
        </div>
    );
};


export default ProductDetailModal