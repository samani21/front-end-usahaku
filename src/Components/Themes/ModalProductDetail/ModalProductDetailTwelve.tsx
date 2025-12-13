import { OrderItem, Product, Variant } from '@/hooks/Theme/useProductCatalog';
import { formatRupiah } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Check, CheckCircle, CheckCircleIcon, Info, Minus, Plus, PlusIcon, ShoppingCart, X, XIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react'

interface DetailModalProps {
    product: Product;
    onClose: () => void;
    onOrder: (item: OrderItem) => void;
    color: ThemeColorSet;
}


const ModalProductDetailTwelve: React.FC<DetailModalProps> = ({ product, onClose, onOrder, color }) => {
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
            className={`fixed top-10 left-1/2 transform -translate-x-1/2 p-4 text-white font-semibold rounded-lg shadow-xl z-5000 transition-all duration-300 flex items-center ${color?.bg600}`}
            role="alert"
        >
            {quantity}x {product.name} {selectedVariant && `(${selectedVariant?.name})`} telah ditambahkan.
        </div> :
            // <div
            //     className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center transition-opacity duration-300"
            //     onClick={onClose}
            // >
            //     {/* Modal Content */}
            //     <div
            //         className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-md transform transition-transform duration-300 ease-in-out scale-100"
            //         onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing when clicking inside
            //     >
            //         <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-4">
            //             <h2 className="text-xl font-bold text-gray-800">{product?.name}</h2>
            //             <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition">
            //                 <X size={20} />
            //             </button>
            //         </div>
            //         <div className="space-y-4">
            //             <div className="mb-4">
            //                 <img
            //                     src={product.imageUrl}
            //                     alt={product.name}
            //                     className="w-full h-48 object-cover rounded-lg mb-3"
            //                 />
            //                 <p className={`text-3xl font-extrabold ${color?.text600} mt-2`}>
            //                     Rp {product.price.toLocaleString('id-ID')}
            //                 </p>
            //                 <p className="text-gray-500 mt-2">{product.description}</p>
            //                 {
            //                     product.category &&
            //                     <p className="text-sm text-gray-600 mt-1">Kategori: <span className={`font-medium ${color?.text600}`}>{product.category}</span></p>
            //                 }
            //                 {
            //                     product?.isPackage &&
            //                     <p className="text-sm text-gray-600">Jenis: <span className={`font-medium ${color?.text600}`}>{product.isPackage && "Paket"}</span></p>
            //                 }
            //                 {
            //                     product?.information && product?.information?.length > 0 &&
            //                     product?.information?.map((info, i) => (
            //                         <p key={i} className="text-sm text-gray-600">{info}</p>
            //                     ))
            //                 }
            //             </div>

            //             <button
            //                 onClick={handleOrder}
            //                 className={`w-full py-3 ${color?.bg600} text-white text-lg font-semibold rounded-xl shadow-lg ${color?.hoverBg700} transition duration-300 transform hover:scale-[1.01]`}
            //             >
            //                 Tambah ke Keranjang
            //             </button>
            //         </div>
            //     </div>
            // </div>
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl max-h-full overflow-y-auto transform transition-all scale-100 duration-300">
                    {/* Header dan Gambar */}
                    <div className="relative">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-56 object-cover rounded-t-xl"
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
                                            ? `${color?.bg700} text-white border-white shadow-md` // Varian aktif menggunakan warna sekunder
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
                                    className={`p-2 ${color?.bg700} text-white rounded-full ${color?.hoverBg600} transition`}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Tombol Pesan */}
                    <div className="p-4 border-t border-gray-300 sticky bottom-0 bg-white rounded-b-xl">
                        <button
                            onClick={handleOrder}
                            // Mengubah gradien tombol agar lebih menonjol
                            className={`w-full py-3 ${color?.bg700} text-white font-bold text-lg rounded-xl shadow-lg ${color?.hoverBg600} transition-colors flex items-center justify-center space-x-2`}
                        >
                            <ShoppingCart size={20} />
                            <span>Tambahkan ke Pesanan</span>
                        </button>
                    </div>
                </div>
            </div>
    );
};

export default ModalProductDetailTwelve