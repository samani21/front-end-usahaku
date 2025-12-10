import { Category } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    categorie: Category[];
    setActiveCategory: (val: string) => void;
    activeCategory: string
}

const CategorieSevent = ({ color, categorie, setActiveCategory, activeCategory }: Props) => {
    return (
        <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-gray-300 pb-2">Kategori</h2>
            <div className="flex flex-wrap gap-3 overflow-x-auto pb-2">
                <button
                    onClick={() => setActiveCategory("Semua")}
                    className={`px-5 py-2 text-sm font-medium rounded-full transition duration-150 whitespace-nowrap border-2 ${activeCategory === "Semua"
                        ? `${color?.bg600} text-white ${color?.border600} shadow-md`
                        : `bg-white text-slate-700 ${color?.hoverBg50} border-gray-300 ${color?.hoverBg300}`
                        }`}
                >
                    Semua
                </button>
                {categorie.map(cat => (
                    <button
                        key={cat?.id}
                        onClick={() => setActiveCategory(cat?.name)}
                        className={`px-5 py-2 text-sm font-medium rounded-full transition duration-150 whitespace-nowrap border-2 ${activeCategory === cat?.name
                            ? `${color?.bg600} text-white ${color?.border600} shadow-md`
                            : `bg-white text-slate-700 ${color?.hoverBg50} border-gray-300 ${color?.hoverBg300}`
                            }`}
                    >
                        {cat?.name}
                    </button>
                ))}
            </div>
        </section>
    )
}

export default CategorieSevent