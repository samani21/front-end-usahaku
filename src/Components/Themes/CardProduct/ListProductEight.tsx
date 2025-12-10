import { Product } from '@/hooks/Theme/useProductCatalog'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import CardProductFive from './Card/CardProductFive';
import CardProductSix from './Card/CardProductSix';
import CardProductSevent from './Card/CardProductSevent';
import { Check, Layers, Package } from 'lucide-react';
import CardProductEight from './Card/CardProductEight';

type Props = {
    filteredProducts: Product[];
    openDetailModal: (val: Product) => void
    handleToggleFavorite: (id: number) => void;
    color: ThemeColorSet;
    activeCategory: string

}

const ListProductEight = ({ filteredProducts, openDetailModal, handleToggleFavorite, color, activeCategory }: Props) => {
    return (
        <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Produk </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredProducts.map(product => (
                    <CardProductEight key={product.id}
                        product={product}
                        onClick={() => openDetailModal(product)}
                        onToggleFavorite={handleToggleFavorite}
                        color={color} />
                ))}
            </div>
        </section>

    )
}

export default ListProductEight