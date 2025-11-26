import React, { useEffect, useState } from 'react'
import getColorClass from './getColorClass';
import { ColorKey, product } from '@/lib/Types/Theme/Eight';
import showNotification from './showNotification';
import { X } from 'lucide-react';

type Props = {
    product: product;
    isOpen: boolean;
    onClose: () => void;
    primaryColor: string;
}

const ProductDetailModal = ({ product, isOpen, onClose, primaryColor }: Props) => {
    const [selectedVariant, setSelectedVariant] = useState<string>('');
    const [quantity, setQuantity] = useState(1);
    const colorClass = getColorClass(primaryColor);
    const bgColorClass = colorClass.split(' ').find(c => c.startsWith('bg-')) || 'bg-teal-600';
    const hoverBgClass = colorClass.split(' ').find(c => c.startsWith('hover:bg-')) || 'hover:bg-teal-700';
    const shadowClass = colorClass.split(' ').find(c => c.startsWith('shadow-')) || 'shadow-teal-300/50';
    const textClass = colorClass.split(' ').find(c => c.startsWith('text-')) || 'text-teal-600';
    const hoverColorClass = colorClass.split(' ').find(c => c.includes('hover:bg-'))?.replace('hover:bg-', 'hover:bg-') || 'hover:bg-teal-50';
    const hoverBorderClass = colorClass.split(' ').find(c => c.includes('hover:border-')) || 'hover:border-teal-300';
    const ringClass = colorClass.split(' ').find(c => c.includes('focus:ring-')) || 'focus:ring-teal-500';

    useEffect(() => {
        if (product && product.variants && product.variants.length) {
            setSelectedVariant(product.variants[0]);
        }
    }, [product]);

    if (!isOpen || !product) return null;

    const variants = product.variants || ['Default'];

    const handleOrder = () => {
        if (!selectedVariant) {
            showNotification({
                message: "Pilih varian produk terlebih dahulu!",
                isError: true,
                primaryColor: 'rose'
            });

            return;
        }
        showNotification({
            message: `${quantity}x ${product.name} (${selectedVariant}) ditambahkan ke keranjang.`,
            isError: false,
            primaryColor: primaryColor as ColorKey,
        });

        onClose();
    };

    return (
        // Outer Wrapper: Menggunakan flex items-end untuk bottom sheet di mobile
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
                        <p className={`text-xl font-black ${textClass} mb-4`}>
                            Rp {product.price.toLocaleString('id-ID')}
                        </p>

                        <div className="space-y-4 pb-4"> {/* Konten utama bisa digulir */}

                            <p className="text-sm text-gray-600 leading-relaxed">{product.desc}</p>

                            {/* Pilihan Varian */}
                            <div className="pt-3 border-t border-gray-100">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Pilih Varian</label>
                                <div className="flex flex-wrap gap-2">
                                    {variants.map(variant => (
                                        <button
                                            key={variant}
                                            onClick={() => setSelectedVariant(variant)}
                                            className={`px-4 py-2 text-sm font-medium rounded-full transition duration-150 border ${selectedVariant === variant
                                                ? `${bgColorClass} text-white shadow-md`
                                                : `bg-white text-slate-700 ${hoverColorClass} border-gray-300 ${hoverBorderClass}`
                                                }`}
                                        >
                                            {variant}
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
                                    className={`w-20 p-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 ${ringClass}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Sticky Footer Aksi (All screens) */}
                <div className="p-4 sm:p-6 bg-white border-t border-gray-100 flex-shrink-0">
                    <button
                        onClick={handleOrder}
                        className={`w-full py-3 text-lg text-white font-bold rounded-xl shadow-lg ${shadowClass} ${bgColorClass} ${hoverBgClass} transition duration-150`}
                    >
                        Tambah ke Keranjang ({quantity})
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ProductDetailModal