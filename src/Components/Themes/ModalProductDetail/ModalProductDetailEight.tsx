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


const ModalProductDetailEight: React.FC<DetailModalProps> = ({ product, onClose, onOrder, color }) => {
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
        showConfirmation ?
            <div
                className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 text-white font-semibold rounded-lg shadow-xl z-5000 transition-all duration-300 flex items-center ${color?.bg600}`}
                role="alert"
            >
                {quantity}x {product.name} {selectedVariant && `(${selectedVariant?.name})`} telah ditambahkan.
            </div>
            :
            <div className="fixed inset-0 bg-gray-900/75 z-50 flex items-end sm:items-center justify-center transition-opacity duration-300 p-0 sm:p-4">

                {/* Modal Content - Mobile Bottom Sheet */}
                <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-xl 
                    h-[95vh] sm:h-auto max-h-[95vh] sm:max-h-[90vh] 
                    overflow-auto no-scrollbar transform transition-all duration-300 scale-100 flex flex-col">

                    {/* Close Button Mobile (Header/Pull handle) */}
                    <div className="sm:hidden flex justify-center pt-3 pb-1 flex-shrink-0" onClick={onClose}>
                        <button className="w-12 h-1 bg-gray-300 rounded-full"></button> {/* Handle/gagang */}
                    </div>

                    {/* Content Section - Grid/Single Column */}
                    <div className="sm:grid sm:grid-cols-2 flex-grow overflow-auto ">

                        {/* 1. Image & Header - Fixed height on mobile, full height on desktop */}
                        <div className="sm:h-full p-4 sm:p-6 flex flex-col justify-center items-center bg-gray-50 flex-shrink-0 sm:flex-shrink">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-48 sm:h-auto max-h-64 object-cover rounded-xl shadow-lg"
                            // onError={(e) => e.currentTarget.src = `https://placehold.co/400x256/${colorThemes[primaryColor].hex.replace('#', '')}/FFFFFF?text=PRODUCT+IMAGE`}
                            />
                            {/* Desktop Close Button */}
                            <button onClick={onClose} className="hidden sm:block absolute top-4 right-4 p-2 rounded-full bg-white/80 text-gray-700 hover:bg-white transition shadow-md">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* 2. Details and Options - Scrollable */}
                        <div className="p-6 pt-4 sm:pt-6 flex flex-col overflow-y-auto no-scrollbar">
                            <h3 className="text-3xl font-extrabold text-slate-800 mb-2">{product.name}</h3>
                            <p className={`text-xl font-black ${color?.text600} mb-4`}>
                                Rp {((selectedVariant?.priceAdjustment + product.price) || product.price).toLocaleString('id-ID')}
                            </p>

                            <div className="space-y-4 pb-4"> {/* Konten utama bisa digulir */}

                                <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

                                {/* Pilihan Varian */}
                                <div className="pt-3 border-t border-gray-100">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Pilih Varian</label>
                                    <div className="flex flex-wrap gap-2">
                                        {product?.variants.map(variant => (
                                            <button
                                                key={variant?.id}
                                                onClick={() => setSelectedVariant(variant)}
                                                className={`px-4 py-2 text-sm font-medium rounded-full transition duration-150 border ${selectedVariant === variant
                                                    ? `${color?.bg600} text-white shadow-md`
                                                    : `bg-white text-slate-700 ${color?.hoverBg50} border-gray-300 ${color?.hoverBorder300}`
                                                    }`}
                                            >
                                                {variant?.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity Selector */}
                                <div className="pt-3 flex items-center space-x-3">
                                    <label className="text-sm font-semibold text-slate-700">Jumlah:</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                        className={`w-20 p-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 ${color?.ring500}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Sticky Footer Aksi (All screens) */}
                    <div className="p-4 sm:p-6 bg-white border-t border-gray-100 flex-shrink-0">
                        <button
                            onClick={handleOrder}
                            className={`w-full py-3 text-lg text-white font-bold rounded-xl shadow-lg  ${color?.bg600} ${color?.hoverBg700} transition duration-150`}
                        >
                            Tambah ke Keranjang ({quantity})
                        </button>
                    </div>
                </div>
            </div>
    );
};

export default ModalProductDetailEight