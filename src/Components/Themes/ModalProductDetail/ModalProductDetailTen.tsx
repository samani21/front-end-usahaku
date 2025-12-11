import { OrderItem, Product, Variant } from '@/hooks/Theme/useProductCatalog';
import { formatRupiah } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Check, CheckCircle, CheckCircleIcon, Info, Minus, Plus, PlusIcon, X, XIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react'

interface DetailModalProps {
    product: Product;
    onClose: () => void;
    onOrder: (item: OrderItem) => void;
    color: ThemeColorSet;
}


const ModalProductDetailTen: React.FC<DetailModalProps> = ({ product, onClose, onOrder, color }) => {
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
        showConfirmation ? <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 text-white font-semibold rounded-lg shadow-xl z-5000 transition-all duration-300 flex items-center ${color?.bg600}`}
            role="alert"
        >
            {quantity}x {product.name} {selectedVariant && `(${selectedVariant?.name})`} telah ditambahkan.
        </div> :
            // <div className="fixed inset-0 bg-gray-900/75 z-50 flex items-end sm:items-center justify-center transition-opacity duration-300 p-0 sm:p-4">

            //     {/* Modal Content - Mobile Bottom Sheet */}
            //     <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-xl 
            //                 h-[95vh] sm:h-auto max-h-[95vh] sm:max-h-[90vh] 
            //                 overflow-hidden transform transition-all duration-300 scale-100 flex flex-col">

            //         {/* Close Button Mobile (Header/Pull handle) */}
            //         <div className="sm:hidden flex justify-center pt-3 pb-1 flex-shrink-0" onClick={onClose} >
            //             <button className="w-12 h-1 bg-gray-300 rounded-full"></button> {/* Handle/gagang */}
            //         </div>

            //         {/* Content Section - Scrollable */}
            //         <div className="p-6 pt-4 sm:pt-6 flex-grow overflow-y-auto no-scrollbar">

            //             {/* Header/Title */}
            //             <div className="flex justify-between items-start border-b border-gray-300 pb-4 mb-4 flex-shrink-0">
            //                 <h3 className="text-3xl font-extrabold text-slate-800">{product.name}</h3>
            //                 <button onClick={onClose} className="hidden sm:block p-2 rounded-full text-gray-500 hover:bg-gray-100 transition">
            //                     <X className="w-6 h-6" />
            //                 </button>
            //             </div>

            //             <div className="space-y-4">
            //                 <img
            //                     src={product.imageUrl}
            //                     alt={product.name}
            //                     className="w-full h-48 object-cover rounded-xl mb-4 shadow-md"
            //                 />
            //                 <p className={`text-4xl font-black ${color?.text600}`}>
            //                     {product.price.toLocaleString('id-ID')}
            //                 </p>
            //                 <p className={`text-xs font-bold p-1 w-max rounded-full px-3 ${product.isPackage ? 'bg-indigo-100 text-indigo-700' : 'bg-yellow-100 text-yellow-700'}`}>
            //                     {product.isPackage ? 'PAKET LAYANAN' : 'LAYANAN SATUAN'}
            //                 </p>
            //                 <p className="text-md text-slate-700 leading-relaxed">{product.description}</p>

            //                 {/* Deliverables/Included Features */}
            //                 <div className="pt-4 border-t border-gray-100">
            //                     <label className="block text-sm font-semibold text-slate-700 mb-3">Informasi:</label>
            //                     <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-gray-700">
            //                         {product?.information?.map((item, index) => (
            //                             <li key={index} className="flex items-start text-sm">
            //                                 <Check className={`${color?.text600} w-4 h-4 mr-2 mt-1 flex-shrink-0`} />
            //                                 <span>{item}</span>
            //                             </li>
            //                         ))}
            //                     </ul>
            //                 </div>
            //             </div>
            //         </div>

            //         {/* Sticky Footer Aksi (All screens) */}
            //         <div className="p-4 sm:p-6 bg-white border-t border-gray-100 flex-shrink-0">
            //             <button
            //                 onClick={handleOrder}
            //                 className={`w-full py-3 text-lg font-bold text-white rounded-xl shadow-lg  ${color?.bg600} ${color?.hoverBg700} transition duration-150`}
            //             >
            //                 Konsultasi Gratis & Pesan Jasa
            //             </button>
            //         </div>
            //     </div>
            // </div>
            <div
                className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center transition-opacity duration-300"
                onClick={onClose}
            >
                {/* Modal Content */}
                <div
                    className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-md transform transition-transform duration-300 ease-in-out scale-100"
                    onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing when clicking inside
                >
                    <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-4">
                        <h2 className="text-xl font-bold text-gray-800">{product?.name}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="space-y-4">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-xl"
                        />
                        <p className={`text-2xl font-extrabold ${color?.text600}`}>
                            Rp{product.price.toLocaleString('id-ID')}
                            <span className="text-sm font-medium text-gray-500 ml-2">/{product.isPackage ? 'paket' : 'layanan'}</span>
                        </p>
                        <p className="text-gray-700 text-sm">{product.description}</p>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-300">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition w-8 h-8 flex items-center"
                                >
                                    <Minus />
                                </button>
                                <span className="font-semibold text-lg">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className={`p-2 ${color?.bg500} text-white rounded-full ${color?.hoverBg700} transition  w-8 h-8 flex items-center`}
                                >
                                    <Plus />
                                </button>
                            </div>
                            <button
                                onClick={handleOrder}
                                className={`flex items-center justify-center px-4 py-2 ${color?.bg500} text-white font-semibold rounded-lg shadow-md ${color?.hoverBg700} transition`}
                            >
                                Pesan Sekarang ({quantity})
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default ModalProductDetailTen