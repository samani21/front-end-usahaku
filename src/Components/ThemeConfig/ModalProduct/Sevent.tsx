import { Product, Variant } from '@/hooks/Theme/useProductCatalog';
import { formatRupiah } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { CheckCircle, X } from 'lucide-react';
import React, { useState } from 'react'

interface One {
    product: Product;
    onClose: () => void;
    color: ThemeColorSet;
}

const Sevent: React.FC<One> = ({ product, onClose, color }) => {
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
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            {/* Modal Konten */}
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg md:max-w-xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 no-scrollbar">
                {/* Header & Tombol Tutup */}
                <div className="sticky top-0 p-4 border-b border-gray-300 flex justify-between items-center bg-white z-10">
                    <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition">
                        <X size={24} className="text-gray-600" />
                    </button>
                </div>

                {
                    showConfirmation ? <div className="text-center p-8">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                        <h3 className="text-2xl font-bold text-gray-800">Pesanan Berhasil!</h3>
                        <p className="text-gray-600 mt-2">"{product.name}" telah masuk keranjang.</p>
                    </div> :
                        <div className="p-6">
                            <div className="mb-6">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-auto rounded-lg object-cover mb-4 shadow-md"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = 'https://placehold.co/600x450/94a3b8/ffffff?text=Gagal+Muat';
                                    }}
                                />
                                <p className={`text-3xl font-extrabold ${color?.text600} mb-4`}>
                                    {formatRupiah(finalPrice)}
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-4">{product.description || 'Deskripsi detail produk belum tersedia. Hubungi kami untuk informasi lebih lanjut.'}</p>

                                {
                                    product?.information && product?.information?.length > 0 &&
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-gray-800 mb-2">Informasi Layanan</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            {product?.information?.map((info, index) => (
                                                <li key={index}>
                                                    <span className="font-medium text-gray-700">{info}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                                <div className='mt-2 flex gap-2'>
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

                            {/* Tombol Pemesanan */}
                            <button
                                onClick={handleOrder}
                                className={`w-full py-3 ${color?.bg600} text-white font-semibold rounded-lg shadow-md ${color?.hoverBg700} transition duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-4 ${color?.ring500} focus:ring-opacity-50`}
                            >
                                Pesan Layanan Ini Sekarang
                            </button>
                        </div>
                }
            </div>
        </div>
    );
};

export default Sevent