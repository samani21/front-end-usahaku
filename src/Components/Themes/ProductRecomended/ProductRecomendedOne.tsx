import { Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Star } from 'lucide-react';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    productRecomended?: Product[];
    title: string;
    openDetailModal: (val: Product) => void
}

const ProductRecomendedOne = ({ color, productRecomended, title, openDetailModal }: Props) => {
    return (
        productRecomended?.map((pr, i) => (

            <div className={`relative ${color?.bg50} h-auto rounded-xl shadow-xl mb-8 overflow-hidden flex flex-col sm:flex-row items-stretch border ${color?.border200}`}>
                {/* Kiri: Gambar Produk Spesial */}
                <div className="w-full sm:w-1/3 h-48 sm:h-auto relative">
                    <img
                        src={pr?.imageUrl}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Kanan: Detail Spesial */}
                <div className="flex-1 p-6 flex flex-col justify-center">
                    <div className={`inline-flex items-center space-x-2 ${color?.text600} mb-2`}>
                        <Star size={20} className={color?.text400} />
                        <p className="text-sm font-bold uppercase tracking-wider">{title}</p>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                        {pr?.name}
                    </h2>

                    <p className="mt-2 text-gray-700 line-clamp-2">
                        {pr?.description || "Rasakan kelezatan menu pilihan terbaik kami yang wajib Anda coba hari ini!"}
                    </p>

                    <div className="mt-4 sm:flex items-center space-x-4">
                        {
                            pr?.oldPrice &&
                            <span className={`line-through text-xl font-bold text-red-400`}>
                                Rp{pr?.oldPrice}
                            </span>
                        }
                        <span className={`text-2xl font-bold ${color?.text600}`}>
                            Rp{pr?.price}
                        </span>

                        <button
                            onClick={() => openDetailModal(pr)}
                            className={`px-5 py-2 ${color?.bg500} text-white font-bold rounded-full shadow-lg ${color?.hoverBg600} transition-colors text-base`}
                        >
                            Pesan Sekarang
                        </button>
                    </div>
                </div>
            </div>
        ))
    )
}

export default ProductRecomendedOne