import { Category } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    categorie: Category[];
    setActiveCategory: (val: string) => void;
    activeCategory: string
}

const CategorieThree = ({ color, categorie, setActiveCategory, activeCategory }: Props) => {
    return (
        <section className="mb-12">
            <h2 className={`text-3xl font-bold ${color?.text800} mb-6`}>Jelajahi Kategori</h2>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <button
                    onClick={() => setActiveCategory("Semua")}
                    className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 w-24 h-24 text-center shadow-sm ${activeCategory === "Semua"
                        ? `${color?.bg800} text-white ring-2 ${color?.ring800}`
                        : `bg-white ${color?.text700} ${color?.hoverBg100} border ${color?.border200}`
                        }`}
                >
                    <span className="text-sm font-medium mt-8">Semua</span>
                </button>
                {categorie.map(category => {
                    const Icon = category.iconComponent;
                    return (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category?.name)}
                            className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 w-24 h-24 text-center shadow-sm ${activeCategory === category.name
                                ? `${color?.bg800} text-white ring-2 ${color?.ring800}`
                                : `bg-white ${color?.text700} ${color?.hoverBg100} border ${color?.border200}`
                                }`}
                        >
                            {Icon &&
                                <Icon size={24} className="mb-1" />
                            }
                            <span className="text-sm font-medium mt-1">{category.name}</span>
                        </button>
                    );
                })}
            </div>
        </section>
    )
}

export default CategorieThree