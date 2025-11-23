import { formatRupiah, SidebarType, ThemeClasses } from '@/lib/Types/Theme/Three';
import { CheckCircle, X } from 'lucide-react';
import React, { useMemo } from 'react'

const SidebarModal: React.FC<{ type: SidebarType; onClose: () => void; themeClasses: ThemeClasses }> = ({ type, onClose, themeClasses }) => {

    // Define structured cart items for price calculation (DUMMY DATA)
    const DUMMY_ORDER_ITEMS = useMemo(() => [
        { name: '1x Biskuit Cokelat (Standar)', total: 12500 },
        { name: '1x Minyak Goreng Pouch 2L', total: 35000 },
        { name: '2x Kopi Instan 3-in-1 (Box)', total: 27000 }, // 2x (1500 + 12000) = 27000
    ], []);

    const titleMap = {
        favorite: 'Daftar Produk Favorit',
        order: 'Keranjang Belanja Anda',
        history: 'Riwayat Pemesanan',
    };

    // Calculation only for 'order' type
    const orderTotals = useMemo(() => {
        if (type !== 'order') return null;

        const subtotal = DUMMY_ORDER_ITEMS.reduce((sum, item) => sum + item.total, 0); // 74500
        const shippingFee = 10000; // Biaya pengiriman dummy
        const grandTotal = subtotal + shippingFee; // 84500

        return { subtotal, shippingFee, grandTotal };
    }, [type, DUMMY_ORDER_ITEMS]);


    // Determine the content for rendering (strings for favorite/history, objects for order)
    const listContent = useMemo(() => {
        switch (type) {
            case 'favorite':
                return ['Mie Ayam Bawang', 'Teh Botol Dingin', 'Kopi Instan 3-in-1'];
            case 'order':
                // Returns the structured data
                return DUMMY_ORDER_ITEMS;
            case 'history':
                return ['Pesanan #A765 (Selesai)', 'Pesanan #B490 (Dibatalkan)', 'Pesanan #C123 (Selesai)'];
            default:
                return [];
        }
    }, [type, DUMMY_ORDER_ITEMS]);

    if (!type) return null;

    return (
        <div className="fixed inset-0 z-30 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-500/75 transition-opacity" onClick={onClose}></div>

            {/* Panel */}
            <div className={`fixed inset-y-0 right-0 w-full max-w-xs transition duration-300 ease-in-out transform ${type ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex h-full flex-col bg-white shadow-xl">
                    <div className="flex items-start justify-between border-b border-gray-300 p-4">
                        <h2 className="text-lg font-semibold text-gray-900">{titleMap[type]}</h2>
                        <button
                            type="button"
                            className="rounded-md text-gray-400 hover:text-gray-500 p-1"
                            onClick={onClose}
                            aria-label="Tutup Panel"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {listContent.map((item, index) => {
                            if (type === 'order') {
                                const orderItem = item as { name: string, total: number };
                                return (
                                    // Cart Item rendering (showing name and price)
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
                                        <span>{orderItem.name}</span>
                                        <span className="font-semibold text-gray-800">{formatRupiah(orderItem.total)}</span>
                                    </div>
                                );
                            }
                            // For favorite and history, item is just a string
                            const textItem = item as string;
                            return (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
                                    <span>{textItem}</span>
                                    {type === 'history' && <CheckCircle className={`h-4 w-4 ml-2 ${themeClasses.primaryText}`} />}
                                </div>
                            );
                        })}
                        {listContent.length === 0 && <p className="text-gray-500 italic">Daftar kosong.</p>}
                    </div>

                    {/* Footer with Totals for 'order' */}
                    <div className="p-4 border-t border-gray-300">
                        {type === 'order' && orderTotals && (
                            <>
                                {/* Price Breakdown */}
                                <div className="space-y-2 mb-4 text-sm">
                                    <div className="flex justify-between text-gray-700">
                                        <span>Subtotal Produk:</span>
                                        <span className="font-semibold">{formatRupiah(orderTotals.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span>Biaya Pengiriman:</span>
                                        <span className="font-semibold">{formatRupiah(orderTotals.shippingFee)}</span>
                                    </div>
                                    {/* Grand Total */}
                                    <div className="flex justify-between text-xl font-bold pt-3 mt-3 border-t border-gray-200">
                                        <span className={themeClasses.primaryText}>TOTAL KESELURUHAN:</span>
                                        <span className={`text-green-600`}>{formatRupiah(orderTotals.grandTotal)}</span>
                                    </div>
                                </div>
                                <button className={`w-full ${themeClasses.primaryBg} text-white p-3 rounded-lg ${themeClasses.primaryHoverBg} transition font-semibold`}>
                                    Lanjut ke Pembayaran ({formatRupiah(orderTotals.grandTotal)})
                                </button>
                            </>
                        )}
                        {type === 'favorite' && (
                            <p className="text-sm text-center text-gray-500">Total {listContent.length} item favorit</p>
                        )}
                        {type === 'history' && (
                            <p className="text-sm text-center text-gray-500">Total {listContent.length} pesanan terakhir</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarModal