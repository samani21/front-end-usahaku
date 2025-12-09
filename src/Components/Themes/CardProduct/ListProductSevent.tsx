import { Product } from '@/hooks/Theme/useProductCatalog'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import CardProductFive from './Card/CardProductFive';
import CardProductSix from './Card/CardProductSix';
import CardProductSevent from './Card/CardProductSevent';

type Props = {
    filteredProducts: Product[];
    openDetailModal: (val: Product) => void
    handleToggleFavorite: (id: number) => void;
    color: ThemeColorSet;
    activeCategory: string
}

const ListProductSevent = ({ filteredProducts, openDetailModal, handleToggleFavorite, color, activeCategory }: Props) => {
    return (
        <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Pilihan Paket</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts?.filter((f) => f?.isPackage)?.map((product) => (
                    <CardProductSevent key={product.id}
                        product={product}
                        onClick={() => openDetailModal(product)}
                        onToggleFavorite={handleToggleFavorite}
                        color={color} />
                ))}
            </div>
            <div className="flex justify-between items-center mb-6 mt-4">
                <h2 className="text-3xl font-bold text-gray-900">Semua Layanan</h2>
            </div>

            {filteredProducts?.filter((f) => !f?.isPackage).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts?.filter((f) => !f?.isPackage)?.map((product) => (
                        <CardProductSevent key={product.id}
                            product={product}
                            onClick={() => openDetailModal(product)}
                            onToggleFavorite={handleToggleFavorite}
                            color={color} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl shadow-md">
                    <p className="text-xl text-gray-600 mb-2">Layanan tidak ditemukan.</p>
                    <p className="text-gray-500">Coba ubah kategori atau kata kunci pencarian Anda.</p>
                </div>
            )}
        </section>
    )
}

export default ListProductSevent