import { Product } from '@/hooks/Theme/useProductCatalog'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import CardProductFive from './Card/CardProductFive';
import CardProductSix from './Card/CardProductSix';

type Props = {
    filteredProducts: Product[];
    openDetailModal: (val: Product) => void
    handleToggleFavorite: (id: number) => void;
    color: ThemeColorSet;
    activeCategory: string
}

const ListProductSix = ({ filteredProducts, openDetailModal, handleToggleFavorite, color, activeCategory }: Props) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
                {activeCategory === 'Semua' ? 'Menu Lengkap' : `Kategori: ${activeCategory}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {filteredProducts.map((product) => (
                    <CardProductSix key={product.id}
                        product={product}
                        onClick={() => openDetailModal(product)}
                        onToggleFavorite={handleToggleFavorite}
                        color={color} />
                ))}
            </div>
            {filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 py-10 text-lg">Menu untuk kategori ini belum tersedia.</p>
            )}
        </div>
    )
}

export default ListProductSix