import { Category } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    categorie: Category[];
    setActiveCategory: (val: string) => void;
    activeCategory: string
}

const CategorieNine = ({ color, categorie, setActiveCategory, activeCategory }: Props) => {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Pilih Kategori</h2>
            <div className="flex flex-wrap gap-3">
                <button

                    onClick={() => setActiveCategory("Semua")}
                    className={`flex items-center space-x-2 py-2 px-4 rounded-full text-sm font-medium transition-colors border ${activeCategory === "Semua"
                        ? `${color?.bg700} text-white ${color?.border700} shadow-md`
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                >
                    <span>Semua</span>
                </button>
                {categorie.map(category => {
                    const Icon = category.iconComponent;
                    return (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category?.name)}
                            className={`flex items-center space-x-2 py-2 px-4 rounded-full text-sm font-medium transition-colors border ${activeCategory === category?.name
                                ? `${color?.bg700} text-white ${color?.border700} shadow-md`
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                }`}
                        >
                            {Icon &&
                                <Icon className="h-4 w-4 mr-1" />
                            }
                            <span>{category.name}</span>
                        </button>
                    )
                })}
            </div>
        </section>
    )
}

export default CategorieNine