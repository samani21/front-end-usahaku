import { Product } from '@/hooks/Theme/useProductCatalog'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import CardProductFive from './Card/CardProductFive';
import CardProductSix from './Card/CardProductSix';
import CardProductSevent from './Card/CardProductSevent';
import { Check, Layers, Package } from 'lucide-react';
import CardProductEight from './Card/CardProductEight';
import CardProductNine from './Card/CardProductNine';

type Props = {
    filteredProducts: Product[];
    openDetailModal: (val: Product) => void
    handleToggleFavorite: (id: number) => void;
    color: ThemeColorSet;
    activeCategory: string

}

const ListProductNine = ({ filteredProducts, openDetailModal, handleToggleFavorite, color, activeCategory }: Props) => {
    return (
        <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Hasil Jasa ({filteredProducts.length})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredProducts.map(product => (
                    <CardProductNine key={product.id}
                        product={product}
                        onClick={() => openDetailModal(product)}
                        onToggleFavorite={handleToggleFavorite}
                        color={color} />
                ))}
            </div>
            {filteredProducts.length === 0 && (
                <div className="text-center p-10 bg-white rounded-xl text-gray-500">
                    <p className="text-xl font-semibold">Tidak ada layanan yang cocok.</p>
                    <p className="text-sm">Coba ubah filter Tipe Layanan atau Kategori.</p>
                </div>
            )}
        </section>
    )
}

export default ListProductNine