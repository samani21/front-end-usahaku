import { Product } from '@/hooks/Theme/useProductCatalog'
import { formatRupiah } from '@/lib/Types/Theme/theme'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor'
import { ArrowRightIcon, Heart, HeartIcon } from 'lucide-react'
import React from 'react'

type Props = {
    product: Product;
    color: ThemeColorSet;
    handleFav: (id: number) => void;
    onClick: () => void;
    themeMode: "Light" | "Dark"
}

const Four = ({ product, color, handleFav, onClick, themeMode }: Props) => {
    const primaryTextColor = themeMode === 'Dark' ? `text-cyan-500` : color?.text500;
    const primaryBgColor = themeMode === 'Dark' ? `bg-cyan-600` : color?.bg600;
    const primaryHoverBgColor = themeMode === 'Dark' ? `hover:bg-cyan-700` : color?.hoverBg700;
    const cardBgColor = themeMode === 'Dark' ? `bg-gray-800` : 'bg-white';
    const mainTextColor = themeMode === 'Dark' ? `text-gray-50` : 'text-gray-900';
    const subtleTextColor = themeMode === 'Dark' ? `text-gray-400` : 'text-gray-600';
    const hoverBorderColor = themeMode === 'Dark' ? `hover:border-cyan-500` : color?.hoverBorder500;

    // Custom Shadow, menyesuaikan jika Dark/Light
    const shadowStyle = themeMode === 'Dark' ? 'hadow-2xl shadow-black/50' : 'shadow-xl shadow-gray-300/70';
    const cardBorder = themeMode === 'Dark' ? 'border-gray-700/50' : 'border-transparent';
    return (
        <div
            className={`flex flex-col sm:flex-row ${cardBgColor} rounded-3xl p-4 ${shadowStyle} border ${cardBorder}
                 transition duration-500 cursor-pointer overflow-hidden transform hover:scale-[1.02] ${hoverBorderColor}`}

            role="listitem"
        >
            {/* Gambar Kiri */}
            <div className="w-full sm:w-2/5 flex-shrink-0 mb-3 sm:mb-0 sm:mr-4" onClick={onClick}>
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-40 sm:h-full object-cover rounded-2xl shadow-lg"
                    loading="lazy"
                    onError={(e: any) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/CCCCCC/333333?text=Gambar+Hilang"; }}
                />
            </div>

            {/* Detail Kanan */}
            <div className="flex-1 p-1 w-1/2 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-center">
                        <h3 className={`font-extrabold text-xl ${mainTextColor} truncate pr-4`} onClick={onClick}>{product.name}</h3>
                        {product.isFavorite ? (
                            <HeartIcon className="text-red-500 w-5 h-5 flex-shrink-0" onClick={() => handleFav(product?.id)} />
                        ) : <HeartIcon className="text-gray-500 w-5 h-5 flex-shrink-0" onClick={() => handleFav(product?.id)} />}
                    </div>
                    <p className={`font-extrabold text-2xl mt-1 mb-2 ${primaryTextColor}`} onClick={onClick}>{formatRupiah(product.price)}</p>
                    <p className={`${subtleTextColor} text-sm line-clamp-3 min-h-[3rem]`} onClick={onClick}>{product.description}</p>
                </div>

                {/* Tombol Aksi */}
                <button
                    className={`mt-4 flex items-center justify-center space-x-2 w-full text-white py-2.5 rounded-xl font-bold transition shadow-lg ${primaryBgColor} ${primaryHoverBgColor} transform hover:translate-y-[-1px]`}
                    onClick={(e) => { e.stopPropagation(); onClick(); }}
                    aria-label={`Lihat detail produk ${product.name}`}
                >
                    <span>Detail & Pesan</span>
                    <ArrowRightIcon className="text-white w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

export default Four