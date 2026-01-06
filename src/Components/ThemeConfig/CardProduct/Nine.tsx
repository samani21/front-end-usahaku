import { Product } from '@/hooks/Theme/useProductCatalog'
import { formatRupiah } from '@/lib/Types/Theme/theme'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor'
import { ChevronRight, Heart, HeartIcon } from 'lucide-react'
import React from 'react'

type Props = {
    product: Product;
    color: ThemeColorSet;
    onClick: () => void;
}

const Nine = ({ product, color, onClick }: Props) => {
    return (
        <div
            className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
            onClick={onClick}
        >
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover"
            // onError={(e) => e.currentTarget.src = isProduct ? `https://placehold.co/400x160/${colorThemes[primaryColor].hex.replace('#', '')}/FFFFFF?text=PRODUCT` : "https://placehold.co/400x160/CFD8DC/37474F?text=SERVICE"}
            />
            <div className="p-4 flex flex-col h-[calc(100%-10rem)]">
                <p className="text-xs font-medium text-gray-500 mb-1 tracking-wider uppercase">{product.category}</p>
                <h4 className="text-xl font-bold text-slate-800 mb-2 truncate">{product.name}</h4>

                {/* Tambahan badge tipe layanan (Hanya untuk jasa/service) */}
                <p className={`text-xs font-semibold p-1 w-max rounded px-2 mb-2 ${product.isPackage ? 'bg-indigo-100 text-indigo-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {product.isPackage ? 'PAKET' : 'SATUAN'}
                </p>

                <div className="mt-auto"> {/* Untuk menempatkan harga dan tombol di bawah */}
                    <p className={`md:text-2xl font-black ${color?.text600} mb-4`}>
                        Rp {product.price.toLocaleString('id-ID')}
                    </p>
                    <button
                        className={`w-full py-2 text-md font-semibold text-white rounded-lg transition ${color?.bg600} ${color?.hoverBg700} shadow-md `}
                    >
                        Lihat Detail
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Nine