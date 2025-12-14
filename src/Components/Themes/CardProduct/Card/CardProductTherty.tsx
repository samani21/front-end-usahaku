import { Product } from '@/hooks/Theme/useProductCatalog';
import { formatRupiah } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { col } from 'framer-motion/client';
import { ChevronRight, Gift, Heart, HeartIcon, Zap } from 'lucide-react';
import React from 'react'

interface ProductCardProps {
    product: Product;
    onClick: () => void;
    onToggleFavorite: (id: number) => void;
    color: ThemeColorSet;
}

const CardProductTherty: React.FC<ProductCardProps> = ({ product, onClick, onToggleFavorite, color }) => (
    // <div
    //     className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer transform hover:scale-[1.01]"
    //     onClick={onClick}
    // >
    //     {/* Gambar Produk */}
    //     <div className="relative h-36 bg-gray-100">
    //         <img
    //             src={product.imageUrl}
    //             alt={product.name}
    //             className="w-full h-full object-cover"

    //         />
    //         {/* Badge untuk Paket */}
    //         {product?.isPackage && (
    //             <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
    //                 <Gift size={14} className="inline-block mr-1 -mt-0.5" /> Hemat!
    //             </span>
    //         )}
    //     </div>
    //     {/* Detail Produk */}
    //     <div className="p-4">
    //         <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">{product.name}</h3>
    //         {/* Harga tetap hijau agar terasa seperti harga, namun bisa diubah jika perlu */}
    //         <p className="text-sm font-bold text-green-600">{formatRupiah(product.price)}</p>
    //         {product.description && (
    //             <p className="text-xs text-gray-500 mt-2 line-clamp-2">{product.description}</p>
    //         )}
    //         {/* Tombol Pesan menggunakan warna PRIMER tema agar sinkron dengan header */}
    //         <button className={`mt-3 w-full flex items-center justify-center space-x-2 text-sm font-medium text-white ${color?.bg700} ${color?.hoverBg600} rounded-lg py-2 transition-colors`}>
    //             <span>Pesan</span>
    //             <ChevronRight size={16} />
    //         </button>
    //     </div>
    // </div>
    <div
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:scale-[1.02]"
    >
        <div className="relative h-40 w-full overflow-hidden">
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/CCCCCC/666666?text=Foto+Produk'; }}
            />
            <div className="absolute top-2 right-2 p-1 bg-white rounded-full shadow" onClick={()=>onToggleFavorite(product?.id)}>
                <Heart size={20} className={product?.isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
            </div>
        </div>
        <div className="p-4" onClick={onClick}>
            <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2 min-h-[2.5rem]">{product.description || "Deskripsi produk tidak tersedia."}</p>
            <div className="mt-3 flex justify-between items-center">
                <span className={`text-xl font-bold ${color?.text600}`}>
                    Rp{product.price.toLocaleString('id-ID')}
                </span>
                <button className={`text-sm font-medium text-white ${color?.bg500} px-3 py-1 rounded-full ${color?.hoverBg600} transition-colors`}>
                    Pesan
                </button>
            </div>
        </div>
    </div>
);


export default CardProductTherty