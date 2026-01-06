import {  Product, Variant } from '@/hooks/Theme/useProductCatalog';
import { formatRupiah } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { CheckCircleIcon, Minus, PlusIcon, X } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

interface QuantityControlsProps {
    currentQuantity: number;
    onQuantityChange: (newQuantity: number) => void;
    themeMode: number | string;
    color: ThemeColorSet;
}

const QuantityControls: React.FC<QuantityControlsProps> = ({ currentQuantity, onQuantityChange, themeMode, color }) => {
    const primaryFocus = `focus:ring-2 ${color?.focusRing400}`;
    const textColor = themeMode === 'Dark' ? 'text-gray-50' : 'text-gray-900';
    const inputBg = themeMode === 'Dark' ? 'bg-gray-700' : 'bg-gray-100';
    const buttonBg = themeMode === 'Dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300';
    const borderClass = themeMode === 'Dark' ? 'border-gray-600' : 'border-gray-300';

    return (
        <div className="flex items-center space-x-2">
            <button
                className={`w-8 h-8 rounded-full ${buttonBg} border ${textColor} font-bold hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
                onClick={() => onQuantityChange(currentQuantity - 1)}
                disabled={currentQuantity <= 0}
            >
                <Minus size={16} />
            </button>
            <div
                className={`w-20 p-2 border ${borderClass} rounded-lg text-center ${primaryFocus} transition duration-150 ${textColor} ${inputBg}`}
                role="spinbutton"
            >
                {currentQuantity}
            </div>
            <button
                className={`w-8 h-8 rounded-full ${buttonBg} border ${textColor} font-bold hover:opacity-80 transition flex items-center justify-center`}
                onClick={() => onQuantityChange(currentQuantity + 1)}
            >
                <PlusIcon size={16} />
            </button>
        </div>
    );
};

interface One {
    product: Product;
    onClose: () => void;
    color: ThemeColorSet;
    themeMode: "Light" | 'Dark'
}

const Four: React.FC<One> = ({ product, onClose, color, themeMode }) => {
    const [quantity, setQuantity] = useState(0);
    // State untuk varian produk, diinisialisasi dengan data varian dari props
    const [orderVariants, setOrderVariants] = useState<Variant[]>([]);
    // State untuk menampilkan notifikasi pesanan berhasil
    const [alert, setAlert] = useState<boolean>(false);

    const hasVariants = product?.variants?.length > 0;

    // Inisialisasi state orderVariants saat komponen di-mount atau product berubah
    useEffect(() => {
        // Pastikan setiap variant memiliki properti 'qty' untuk kuantitas yang dipesan
        const initialVariants = product.variants.map(v => ({
            ...v,
            qty: v.qty ?? 0, // Menggunakan 0 jika 'qty' belum terdefinisi
        }));
        setOrderVariants(initialVariants);
    }, [product]);


    // --- Styling Berdasarkan Theme Mode ---
    const primaryTextColor = themeMode === 'Dark' ? 'text-cyan-500' : color?.text500;
    const primaryText700 = themeMode === 'Dark' ? 'text-cyan-700' : color?.text700;
    const primaryButtonBg = themeMode === 'Dark' ? 'bg-cyan-600' : color?.bg600;
    const primaryButtonHover = themeMode === 'Dark' ? 'hover:bg-cyan-700' : color?.hoverBg700;
    const cardBgColor = themeMode === 'Dark' ? 'bg-gray-800' : `bg-white`;
    const mainTextColor = themeMode === 'Dark' ? 'text-gray-50' : `text-gray-900`;
    const subtleTextColor = themeMode === 'Dark' ? 'text-gray-400' : `text-gray-600`;
    const shadowClass = themeMode === 'Dark' ? 'shadow-2xl shadow-black/50' : 'shadow-xl shadow-gray-300/70';
    const borderDiv = themeMode === 'Dark' ? 'border-gray-700/20' : 'border-gray-200/50';
    const innerBg = themeMode === 'Dark' ? 'bg-gray-700' : 'bg-gray-50';
    const footerBg = themeMode === 'Dark' ? 'bg-gray-700/50' : 'bg-gray-100/50';


    // --- Handler untuk Varian: Memperbarui Kuantitas Varian Tertentu ---
    const handleVariantQuantityChange = useCallback((variantId: number, newQuantity: number) => {
        setOrderVariants(prev => {
            return prev?.map(v =>
                v.id === variantId ? { ...v, qty: Math.max(0, newQuantity) } : v
            );
        });
    }, []);


    // --- Memoization: Menghitung Total Harga dan Item ---
    const { finalPrice, totalItems } = useMemo(() => {
        let total = 0;
        let items = 0;

        if (!hasVariants) {
            total = product.price * quantity;
            items = quantity;
        } else {
            orderVariants?.forEach(o => {
                const qty = o?.qty || 0;
                if (qty > 0) {
                    const pricePerUnit = product.price + o.priceAdjustment;
                    total += pricePerUnit * qty;
                    items += qty;
                }
            });
        }
        return { finalPrice: total, totalItems: items };
    }, [quantity, orderVariants, product.price, hasVariants]);


    // --- Handler Utama: Proses Pemesanan ---
    const handleOrder = () => {
        if (totalItems === 0) return; // Guard clause


        // Tampilkan alert dan tutup modal
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
            onClose();
        }, 1500);
    };


    // --- Render Alert Pemberitahuan ---
    if (alert) {
        return (
            <div
                className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl transition-all duration-500 transform ${color?.bg600} text-white max-w-sm`}
                role="alert"
            >
                <div className="flex items-center space-x-3">
                    <CheckCircleIcon className="text-white" />
                    <p className="font-medium text-sm">Berhasil memesan **{totalItems}x {product.name}**!</p>
                </div>
            </div>
        );
    }


    // --- Render Modal Detail Produk ---
    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/70 z-40 transition-opacity"
                onClick={onClose}
                aria-hidden="true"
                role="presentation"
            />

            {/* Konten Modal */}
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4 text-center">
                    <div
                        className={`${cardBgColor} rounded-3xl ${shadowClass} transform transition-all w-full max-w-5xl overflow-hidden min-h-[80vh] ${mainTextColor}`}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        {/* Header Modal - Close Button */}
                        <div className={`flex justify-end p-4 md:p-6 border-b ${borderDiv}`}>
                            <X className={`${subtleTextColor} hover:${mainTextColor} cursor-pointer`} onClick={onClose} />
                        </div>

                        {/* Body Modal - Grid 2 Kolom */}
                        <div className="grid md:grid-cols-5 p-4 md:p-8 gap-8">
                            {/* Kolom Kiri: Gambar & Deskripsi */}
                            <div className="md:col-span-3">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full max-h-[500px] object-cover rounded-2xl mb-6 shadow-2xl"
                                    loading="lazy"
                                    onError={(e: any) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/333333?text=Gambar+Detail"; }}
                                />
                                <div className={`p-4 rounded-xl border ${borderDiv} ${innerBg}`}>
                                    <h4 className={`text-xl font-bold ${mainTextColor} mb-2`}>Deskripsi Produk</h4>
                                    <p className={`${subtleTextColor} text-base leading-relaxed`}>{product.description}</p>
                                </div>
                            </div>

                            {/* Kolom Kanan: Pemesanan & Harga */}
                            <div className="md:col-span-2 text-left flex flex-col justify-between">
                                <div>
                                    <h3 id="modal-title" className="text-4xl font-extrabold mb-1">{product.name}</h3>
                                    <p className={`text-xl font-bold mb-6 ${primaryTextColor}`}>{formatRupiah(product.price)} (Harga Dasar)</p>

                                    {/* Pilihan Varian dan Kuantitas */}
                                    <div className={`mb-6 border-t pt-4 ${borderDiv}`}>
                                        <label className={`block text-2xl font-bold mb-4 ${mainTextColor}`}>Pilih & Pesan:</label>

                                        {hasVariants ? (
                                            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                                                {orderVariants.map((variant) => {
                                                    const currentQty = variant.qty || 0;
                                                    const finalVariantPrice = variant.priceAdjustment + product.price;

                                                    return (
                                                        <div key={variant.id} className={`flex justify-between items-center p-3 rounded-lg border ${borderDiv} ${innerBg} shadow-sm`}>
                                                            <div className="flex-1 mr-4">
                                                                <p className={`font-semibold ${mainTextColor}`}>{variant.name}</p>
                                                                <p className={`text-sm ${subtleTextColor}`}>{formatRupiah(finalVariantPrice)}</p>
                                                            </div>
                                                            <QuantityControls
                                                                currentQuantity={currentQty}
                                                                onQuantityChange={(q) => handleVariantQuantityChange(variant.id, q)}
                                                                themeMode={themeMode}
                                                                color={color}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            // UI untuk Produk Tanpa Varian
                                            <div className={`flex items-center justify-between p-4 rounded-xl border ${borderDiv} ${innerBg} shadow-sm`}>
                                                <p className={`font-semibold ${mainTextColor}`}>Kuantitas {product.name}</p>
                                                <QuantityControls
                                                    currentQuantity={quantity}
                                                    onQuantityChange={setQuantity}
                                                    themeMode={themeMode}
                                                    color={color}
                                                />
                                            </div>
                                        )}
                                        {hasVariants && <p className={`text-xs ${subtleTextColor} mt-2 italic`}>*Atur kuantitas 0 jika tidak ingin memesan varian tertentu.</p>}
                                    </div>
                                </div>

                                {/* Total Harga dan Tombol Aksi (Sticky Look) */}
                                <div className={`flex flex-col space-y-4 border-t pt-4 mt-auto ${borderDiv}`}>
                                    <div className={`p-4 rounded-xl ${footerBg} border ${borderDiv} shadow-inner`}>
                                        {/* Ringkasan Item Dipilih */}
                                        <p className={`text-lg ${mainTextColor} font-medium flex justify-between mb-3`}>
                                            <span>Total Item Dipilih:</span>
                                            <span className={`font-extrabold ${mainTextColor}`}>{totalItems}</span>
                                        </p>

                                        {/* Total Akhir */}
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

export default Four