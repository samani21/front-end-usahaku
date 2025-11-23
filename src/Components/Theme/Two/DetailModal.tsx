import { getColorClasses, Product } from '@/lib/Types/Theme/Two';
import { CheckCircle, Info, X } from 'lucide-react';
import React, { useState } from 'react'

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  colorClasses: ReturnType<typeof getColorClasses>;
}


const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, product, colorClasses }) => {
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
  const [isOrdered, setIsOrdered] = useState(false);

  React.useEffect(() => {
    if (product) {
      setSelectedVariantId(product.variants[0]?.id || null);
      setIsOrdered(false);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId);
  const finalPrice = product.price + (selectedVariant?.priceAdjustment || 0);

  const handleOrder = () => {
    console.log(`Memesan: ${product.name} - ${selectedVariant?.name} dengan harga Rp${finalPrice}`);
    setIsOrdered(true);
    setTimeout(() => onClose(), 1500); // Tutup setelah 1.5 detik
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg md:max-h-[90vh] overflow-hidden transform transition-all duration-300">
        <div className="p-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-white hover:bg-gray-100 text-gray-600 transition z-10"
            aria-label="Tutup Detail Produk"
          >
            <X size={20} />
          </button>

          {/* Product Image */}
          <div className="mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/400x300/e0e0e0/333333?text=${product.name}`;
              }}
            />
          </div>

          {/* Product Info */}
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h3>
          <p className={`text-xl font-semibold mb-4 ${colorClasses.textAccent}`}>
            Rp{finalPrice.toLocaleString('id-ID')}
          </p>
          <p className="text-gray-600 text-sm mb-6">{product.description}</p>

          {/* Variant Selector */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
              <Info size={18} className={`mr-2 ${colorClasses.iconColor}`} /> Pilih Varian
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.variants.map(variant => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition duration-150 ${selectedVariantId === variant.id
                    ? `${colorClasses.activeVariantBg} text-white shadow-md`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {variant.name} {variant.priceAdjustment > 0 && `(+Rp${variant.priceAdjustment / 1000}K)`}
                </button>
              ))}
            </div>
          </div>

          {/* Order Button */}
          <button
            onClick={handleOrder}
            disabled={isOrdered}
            className={`w-full py-3 rounded-xl text-white font-bold transition duration-300 flex items-center justify-center ${isOrdered ? 'bg-green-500 cursor-not-allowed' : `${colorClasses.primaryBg} shadow-lg`
              }`}
          >
            {isOrdered ? (
              <>
                <CheckCircle size={20} className="mr-2" /> Berhasil Dipesan!
              </>
            ) : (
              `Pesan Sekarang (Rp${finalPrice.toLocaleString('id-ID')})`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal