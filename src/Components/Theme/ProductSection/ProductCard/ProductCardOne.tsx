import { formatRupiah, Product } from '@/lib/Types/Theme/Theme';
import { ArrowRightIcon, HeartIcon } from 'lucide-react';
import React, { useMemo } from 'react'

interface ProductCardProps {
    product: Product;
    onClick: (p: Product) => void;
    handleFav: (id: number) => void
}

const ProductCardOne: React.FC<ProductCardProps> = ({ product, onClick, handleFav }) => {
    // Fixed Dark Mode classes
    const primaryTextColor = `text-cyan-400`;
    const primaryBgColor = `bg-cyan-600`;
    const primaryHoverBgColor = `hover:bg-cyan-700`;
    const cardBgColor = `bg-gray-800`;
    const mainTextColor = `text-gray-50`;
    const subtleTextColor = `text-gray-400`;

    // Custom Dark Mode Shadow
    const shadowStyle = 'shadow-2xl shadow-black/50 hover:shadow-white/10';

    // Tampilkan harga dasar atau harga varian termurah/tertinggi jika ada varian
    const priceDisplay = useMemo(() => {
        if (product.variants.length > 0) {
            const minPrice = product.variants.reduce((min, v) => Math.min(min, product.basePrice + v.priceAdjustment), Infinity);
            return formatRupiah(minPrice);
        }
        return formatRupiah(product.basePrice);
    }, [product]);

    return (
        <div
            className={`flex flex-col sm:flex-row ${cardBgColor} rounded-3xl p-4 ${shadowStyle} 
                 transition duration-500 cursor-pointer overflow-hidden transform hover:scale-[1.02] border border-transparent hover:border-cyan-600`}

            role="listitem"
        >
            {/* Gambar Kiri */}
            <div className="w-full sm:w-2/5 flex-shrink-0 mb-3 sm:mb-0 sm:mr-4" onClick={() => onClick(product)}>
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-40 sm:h-full object-cover rounded-2xl shadow-lg"
                    loading="lazy"
                    onError={(e: any) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/CCCCCC/333333?text=Gambar+Hilang"; }}
                />
            </div>

            {/* Detail Kanan */}
            <div className="flex-1 p-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-center">
                        <h3 className={`font-extrabold text-xl ${mainTextColor} truncate pr-4`} onClick={() => onClick(product)}>{product.name}</h3>
                        <div onClick={() => handleFav(product?.id)}>
                            {product.isFavorite ? <HeartIcon className="text-red-500 w-5 h-5 flex-shrink-0" /> : <HeartIcon className="text-gray-500 w-5 h-5 flex-shrink-0" />}
                        </div>
                    </div>
                    <p className={`font-extrabold text-2xl mt-1 mb-2 ${primaryTextColor}`} onClick={() => onClick(product)}>{priceDisplay}</p>
                    <p className={`${subtleTextColor} text-sm line-clamp-3 min-h-[3rem]`} onClick={() => onClick(product)}>{product.description}</p>
                </div>

                {/* Tombol Aksi */}
                <button
                    className={`mt-4 flex items-center justify-center space-x-2 w-full text-white py-2.5 rounded-xl font-bold transition shadow-lg ${primaryBgColor} ${primaryHoverBgColor} transform hover:translate-y-[-1px]`}
                    onClick={(e) => { e.stopPropagation(); onClick(product); }}
                    aria-label={`Lihat detail produk ${product.name}`}
                >
                    <span>Detail & Pesan</span>
                    <ArrowRightIcon className="text-white w-4 h-4" />
                </button>
            </div>
        </div>
    );
};
export default ProductCardOne