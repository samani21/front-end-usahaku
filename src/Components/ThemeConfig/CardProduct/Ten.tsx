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

const Ten = ({ product, color, onClick }: Props) => {
    return (
        <div
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden transform hover:scale-[1.02]"
            onClick={onClick}
        >
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-32 object-cover"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://placehold.co/400x300/334155/ffffff?text=Image+Not+Found";
                }}
            />
            <div className="p-4 flex flex-col justify-between h-[calc(100%-8rem)]">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2 h-10">{product.description || 'Deskripsi singkat layanan.'}</p>
                </div>
                <div className="mt-3 flex justify-between items-center">
                    <span className={`text-xl font-extrabold ${color?.text600}}`}>
                        Rp{product.price.toLocaleString('id-ID')}
                    </span>
                    <button
                        className={`px-3 py-1 text-sm rounded-full font-semibold transition duration-200
              ${product.isPackage
                                ? 'bg-rose-500 text-white hover:bg-rose-600'
                                : `${color?.bg500} text-white ${color?.hoverBg700}`
                            }
            `}
                    >
                        Lihat Detail
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Ten