import { Product } from '@/hooks/Theme/useProductCatalog'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import CardProductFive from './Card/CardProductFive';

type Props = {
    filteredProducts: Product[];
    openDetailModal: (val: Product) => void
    handleToggleFavorite: (id: number) => void;
    color: ThemeColorSet;
    activeCategory: string
}

const ListProductFive = ({ filteredProducts, openDetailModal, handleToggleFavorite, color, activeCategory }: Props) => {
    return (
        <section>
            <h2 className={`text-3xl font-bold ${color?.text800} mb-6`}>
                {activeCategory === 'Semua' ? 'Semua Produk Unggulan' : `${activeCategory}`}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <CardProductFive key={product.id}
                        product={product}
                        onClick={() => openDetailModal(product)}
                        onToggleFavorite={handleToggleFavorite}
                        color={color} />
                ))}
            </div>
            {filteredProducts.length === 0 && (
                <p className={`text-center text-lg ${color?.text500} py-10`}>
                    Maaf, tidak ada produk di kategori ini.
                </p>
            )}
        </section>
    )
}

export default ListProductFive