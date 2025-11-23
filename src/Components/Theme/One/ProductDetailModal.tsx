import { formatRupiah, Product, ProductVariant, ThemeConfig } from '@/lib/Types/Theme/One';
import { XIcon } from 'lucide-react';
import React, { useCallback, useMemo, useState } from 'react'
import QuantityInput from './QuantityInput';

interface ProductDetailModalProps {
    product: Product;
    onClose: () => void;
    onOrderSuccess: (message: string, type?: 'success' | 'error') => void;
    theme: ThemeConfig;
}

type VariantQuantities = Record<number | 'base', number>;

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onOrderSuccess, theme }) => {
    const initialQuantities = product.variants.length > 0
        ? product.variants.reduce((acc, variant) => ({ ...acc, [variant.id]: 0 }), {} as VariantQuantities)
        : { 'base': 1 };

    const [variantQuantities, setVariantQuantities] = useState<VariantQuantities>(initialQuantities);

    // Fixed Dark Mode colors
    const primaryTextColor = `text-cyan-400`;
    const primaryText700 = `text-cyan-300`;
    const primaryButtonBg = `bg-cyan-600`;
    const primaryButtonHover = `hover:bg-cyan-700`;
    const cardBgColor = `bg-gray-800`;
    const mainTextColor = `text-gray-50`;
    const subtleTextColor = `text-gray-400`;
    const shadowClass = theme.shadow;

    // Handler untuk mengubah kuantitas varian
    const handleQuantityChange = useCallback((id: number | 'base', newQuantity: string) => {
        const quantity = parseInt(newQuantity, 10);
        const safeQuantity = Math.max(0, quantity || 0);
        setVariantQuantities(prev => ({
            ...prev,
            [id]: safeQuantity,
        }));
    }, []);

    // Hitung total harga dan jumlah item
    const { finalPrice, totalItems } = useMemo(() => {
        let total = 0;
        let items = 0;
        const isNoVariant = product.variants.length === 0;

        if (isNoVariant) {
            const quantity = variantQuantities['base'] || 0;
            total = product.basePrice * quantity;
            items = quantity;
        } else {
            Object.entries(variantQuantities).forEach(([idString, quantity]) => {
                const variantId = parseInt(idString, 10);
                const variant = product.variants.find(v => v.id === variantId);

                if (variant && quantity > 0) {
                    const pricePerUnit = product.basePrice + variant.priceAdjustment;
                    total += pricePerUnit * quantity;
                    items += quantity;
                }
            });
        }
        return { finalPrice: total, totalItems: items };
    }, [product.basePrice, product.variants, variantQuantities]);

    const handleOrder = () => {
        if (totalItems === 0) {
            onOrderSuccess('Pilih setidaknya satu varian atau atur kuantitas.', 'error');
            return;
        }

        const isNoVariant = product.variants.length === 0;
        let summary = '';
        let notificationMessage = '';

        if (isNoVariant) {
            const quantity = variantQuantities['base'];
            summary = `${quantity}x ${product.name}`;
            notificationMessage = `Berhasil menambahkan ${quantity} item ${product.name} ke keranjang.`;
        } else {
            const purchasedItems = Object.entries(variantQuantities)
                .filter(([, quantity]) => quantity > 0)
                .map(([idString, quantity]) => {
                    const variant = product.variants.find(v => v.id === parseInt(idString, 10));
                    return `${quantity}x ${variant?.name}`;
                });

            summary = purchasedItems.join(', ');
            notificationMessage = `Berhasil memesan ${totalItems} item (${purchasedItems.join('; ')}) dari produk ${product.name}.`;
        }

        console.log(`Pesanan untuk ${product.name}: ${summary}. Total: ${formatRupiah(finalPrice)}`);
        onOrderSuccess(notificationMessage);
        onClose();
    };

    const getVariantPrice = (variant: ProductVariant) => product.basePrice + variant.priceAdjustment;

    return (
        <>
            {/* Overlay - Menggunakan bg-black/95 untuk latar belakang yang hampir buram total */}
            <div className="fixed inset-0 bg-black/95 z-40 transition-opacity" onClick={onClose} aria-hidden="true" role="presentation" />

            {/* Modal Content (Lebih Besar) */}
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4 text-center">
                    <div
                        className={`${cardBgColor} rounded-3xl ${shadowClass} transform transition-all w-full max-w-5xl overflow-hidden min-h-[80vh] ${mainTextColor}`}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        {/* Header Modal - Close Button */}
                        <div className="flex justify-end p-4 md:p-6 border-b border-gray-700/20">
                            <XIcon className={`${subtleTextColor} hover:${mainTextColor}`} onClick={onClose}/>
                        </div>

                        {/* Body Modal - Grid 2 Kolom */}
                        <div className="grid md:grid-cols-5 p-4 md:p-8 gap-8">
                            {/* Kolom Kiri: Gambar & Deskripsi (3/5 lebar) */}
                            <div className="md:col-span-3">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full max-h-[500px] object-cover rounded-2xl mb-6 shadow-2xl"
                                    loading="lazy"
                                    onError={(e: any) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/333333?text=Gambar+Detail"; }}
                                />
                                <div className={`p-4 rounded-xl border border-gray-700/10 bg-gray-700`}>
                                    <h4 className={`text-xl font-bold ${mainTextColor} mb-2`}>Deskripsi Produk</h4>
                                    <p className={`${subtleTextColor} text-base leading-relaxed`}>{product.description}</p>
                                </div>
                            </div>

                            {/* Kolom Kanan: Pemesanan & Harga (2/5 lebar) */}
                            <div className="md:col-span-2 text-left flex flex-col justify-between">
                                <div>
                                    <h3 id="modal-title" className="text-4xl font-extrabold mb-1">{product.name}</h3>
                                    <p className={`text-xl font-bold mb-6 ${primaryTextColor}`}>{formatRupiah(product.basePrice)} (Harga Dasar)</p>

                                    {/* Pilihan Varian dan Kuantitas */}
                                    <div className="mb-6 border-t pt-4 border-gray-700/20">
                                        <label className={`block text-2xl font-bold mb-4 ${mainTextColor}`}>Pilih & Pesan:</label>

                                        {product.variants.length > 0 ? (
                                            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                                                {product.variants.map((variant) => (
                                                    <div key={variant.id} className={`flex justify-between items-center p-3 rounded-lg border border-gray-700/20 bg-gray-700 shadow-sm`}>
                                                        <div className="flex-1 mr-4">
                                                            <p className={`font-semibold ${mainTextColor}`}>{variant.name}</p>
                                                            <p className={`text-sm ${subtleTextColor}`}>{formatRupiah(getVariantPrice(variant))}</p>
                                                        </div>
                                                        <QuantityInput
                                                            id={variant.id}
                                                            quantity={variantQuantities[variant.id] || 0}
                                                            onChange={handleQuantityChange}
                                                            label={variant.name}
                                                            min={0}
                                                            theme={theme}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            // UI untuk Produk Tanpa Varian
                                            <div className={`flex items-center justify-between p-4 rounded-xl border border-gray-700/20 bg-gray-700 shadow-sm`}>
                                                <p className={`font-semibold ${mainTextColor}`}>Kuantitas {product.name}</p>
                                                <QuantityInput
                                                    id={'base'}
                                                    quantity={variantQuantities['base'] || 1}
                                                    onChange={handleQuantityChange}
                                                    label={product.name}
                                                    min={1}
                                                    theme={theme}
                                                />
                                            </div>
                                        )}
                                        <p className={`text-xs ${subtleTextColor} mt-2 italic`}>*Atur kuantitas 0 jika tidak ingin memesan varian tertentu.</p>
                                    </div>
                                </div>

                                {/* Total Harga dan Tombol Aksi (Sticky Look) */}
                                <div className="flex flex-col space-y-4 border-t pt-4 mt-auto border-gray-700/20">
                                    <div className={`p-4 rounded-xl bg-gray-700/50 border border-gray-700/20 shadow-inner`}>
                                        {/* Ringkasan Item Dipilih (tetap flex) */}
                                        <p className={`text-lg ${mainTextColor} font-medium flex justify-between mb-3`}>
                                            <span>Total Item Dipilih:</span>
                                            <span className={`font-extrabold ${mainTextColor}`}>{totalItems}</span>
                                        </p>

                                        {/* Total Akhir yang ditumpuk secara vertikal */}
                                        <div className="mt-1">
                                            <p className={`text-2xl font-bold ${mainTextColor}`}>TOTAL AKHIR:</p>
                                            <p className={`text-4xl font-extrabold ${primaryText700}`}>{formatRupiah(finalPrice)}</p>
                                        </div>

                                    </div>

                                    {/* Tombol Pesan */}
                                    <button
                                        className={`w-full text-white py-4 rounded-xl text-xl font-extrabold transition shadow-lg transform hover:scale-[1.01] 
                            ${totalItems > 0 ? primaryButtonBg + ' ' + primaryButtonHover : 'bg-gray-500 cursor-not-allowed opacity-70'}`}
                                        onClick={handleOrder}
                                        disabled={totalItems === 0}
                                        aria-disabled={totalItems === 0}
                                    >
                                        {totalItems > 0 ? 'Masukkan ke Keranjang' : 'Pilih Kuantitas'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProductDetailModal