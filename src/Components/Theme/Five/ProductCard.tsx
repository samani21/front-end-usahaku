import { Product } from '@/lib/Types/Theme/Five';
import { formatRupiah } from '@/lib/Types/Theme/One';
import React from 'react'

type Props = {
    product: { id: number; name: string; image_url: string; base_price: number; description: string; category: string; variants: { id: number; name: string; price_modifier: number; }[]; }
    onSelectProduct: (product: Product) => void
}

const ProductCard = ({ product, onSelectProduct }: Props) => {
    // Hitung harga termurah (varian pertama sebagai default)
    const price = product.base_price + (product.variants[0]?.price_modifier || 0);

    return (
        <div
            onClick={() => onSelectProduct(product)}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
        >
            <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover"
            // onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/000000?text=Gambar+Tidak+Tersedia"; }}
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold truncate text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <p className="text-xl font-bold text-gray-800">{formatRupiah(price)}</p>
                {/* Deskripsi (opsional) - ditampilkan di modal detail */}
            </div>
        </div>
    );
};

export default ProductCard