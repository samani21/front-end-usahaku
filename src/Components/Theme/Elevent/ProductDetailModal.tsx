import { CartItem, formatRupiah, Product, Theme, Variant } from '@/lib/Types/Theme/Elevent';
import { Minus, Plus, ShoppingCart, X } from 'lucide-react';
import React, { useMemo, useState } from 'react'

const ProductDetailModal: React.FC<{
    product: Product;
    onClose: () => void;
    onAddToCart: (item: CartItem) => void;
    theme: Theme; // Prop tema baru
}> = ({ product, onClose, onAddToCart, theme }) => {
    const [selectedVariant, setSelectedVariant] = useState<Variant>(product.variants[0]);
    const [quantity, setQuantity] = useState(1);

    const finalPrice = useMemo(() => product.price + selectedVariant.priceAdjustment, [product.price, selectedVariant]);

    const handleAddToCart = () => {
        onAddToCart({ product, variant: selectedVariant, quantity });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl max-h-full overflow-y-auto transform transition-all scale-100 duration-300">
                {/* Header dan Gambar */}
                <div className="relative">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-56 object-cover rounded-t-xl"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `https://placehold.co/400x300/${theme.secondaryBg.split('-')[1]}/ffffff?text=${product.name.replace(/\s/g, '+')}`;
                        }}
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Konten Detail */}
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
                    {/* Harga tetap Hijau/Merah */}
                    <p className={`text-3xl font-extrabold text-green-600 mb-4`}>{formatRupiah(finalPrice)}</p>
                    <p className="text-gray-600 mb-6">{product.description}</p>

                    {/* Pemilihan Varian */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-700 mb-2">Pilih Varian:</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {product.variants.map((variant) => (
                                <button
                                    key={variant.id}
                                    onClick={() => setSelectedVariant(variant)}
                                    className={`py-2 px-4 text-sm rounded-lg border  transition-colors ${selectedVariant.id === variant.id
                                        ? `${theme.secondaryBg} text-white border-white shadow-md` // Varian aktif menggunakan warna sekunder
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                        }`}
                                >
                                    {variant.name} {variant.priceAdjustment > 0 ? `(+${formatRupiah(variant.priceAdjustment)})` : ''}
                                    {variant.priceAdjustment < 0 ? `(-${formatRupiah(Math.abs(variant.priceAdjustment))})` : ''}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Kontrol Kuantitas */}
                    <div className="flex items-center justify-between border-t border-gray-300 pt-4">
                        <h3 className="font-semibold text-gray-700">Kuantitas:</h3>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="text-xl font-medium w-8 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity((q) => q + 1)}
                                className={`p-2 ${theme.secondaryBg} text-white rounded-full ${theme.secondaryHover} transition`}
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Tombol Pesan */}
                <div className="p-4 border-t border-gray-300 sticky bottom-0 bg-white rounded-b-xl">
                    <button
                        onClick={handleAddToCart}
                        // Mengubah gradien tombol agar lebih menonjol
                        className={`w-full py-3 ${theme.primaryBg} text-white font-bold text-lg rounded-xl shadow-lg ${theme.primaryHover} transition-colors flex items-center justify-center space-x-2`}
                    >
                        <ShoppingCart size={20} />
                        <span>Tambahkan ke Pesanan</span>
                    </button>
                </div>
            </div>
        </div>
    );
};


export default ProductDetailModal