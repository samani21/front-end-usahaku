import { Category } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    categorie: Category[];
    setActiveCategory: (val: string) => void;
    activeCategory: string
}

const CategorieTwo = ({ color, categorie, setActiveCategory, activeCategory }: Props) => {
    return (
        <div className="mt-8 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Telusuri Kategori</h2>
            <div className="flex space-x-3 overflow-x-auto pb-3 scrollbar-hide">
                <button
                    onClick={() => setActiveCategory("Semua")}
                    className={`flex-shrink-0 px-5 py-2.5 text-sm font-medium rounded-full transition-colors duration-200 shadow-sm ${activeCategory === "Semua"
                        ? `${color?.bg600} ${color?.hoverBg700} text-white ${color?.bg300?.replace('bg', 'shadow')}`
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                        }`}
                >
                    Semua
                </button>
                {categorie?.map((cat) => {
                    return (
                        <button
                            key={cat.name}
                            onClick={() => setActiveCategory(cat.name)}
                            className={`flex-shrink-0 px-5 py-2.5 text-sm font-medium rounded-full transition-colors duration-200 shadow-sm ${activeCategory === cat.name
                                ? `${color?.bg600} ${color?.hoverBg700} text-white ${color?.bg300?.replace('bg', 'shadow')}`
                                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                                }`}
                        >
                            {cat?.icon} {cat?.name}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default CategorieTwo