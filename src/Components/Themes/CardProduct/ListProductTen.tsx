import { Product } from '@/hooks/Theme/useProductCatalog'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Layers, Package } from 'lucide-react';
import CardProductTen from './Card/CardProductTen';
import CardProductEleven from './Card/CardProductEleven';

type Props = {
    filteredProducts: Product[];
    openDetailModal: (val: Product) => void
    handleToggleFavorite: (id: number) => void;
    color: ThemeColorSet;
    activeCategory: string

}

const ListProductTen = ({ filteredProducts, openDetailModal, handleToggleFavorite, color, activeCategory }: Props) => {
    return (
        <>
            {
                filteredProducts?.filter((f) => !f?.isPackage).length > 0 &&
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <Layers className={`w-6 h-6 mr-2 ${color?.text500}`} />
                        Layanan</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts?.filter((f) => !f?.isPackage).map(product => (
                            <CardProductEleven key={product.id}
                                product={product}
                                onClick={() => openDetailModal(product)}
                                onToggleFavorite={handleToggleFavorite}
                                color={color} />
                        ))}
                    </div>
                </section>
            }

            {/* 7. PAKET LAYANAN */}
            {
                filteredProducts?.filter((f) => f?.isPackage).length > 0 &&
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <Package className={`mr-2 h-6 w-6 ${color?.text500}`} />
                        Paketan Layanan Spesial
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts?.filter((f) => f?.isPackage).map(product => (
                            <CardProductEleven key={product.id}
                                product={product}
                                onClick={() => openDetailModal(product)}
                                onToggleFavorite={handleToggleFavorite}
                                color={color} />
                        ))}
                    </div>
                </section>
            }

        </>
    )
}

export default ListProductTen