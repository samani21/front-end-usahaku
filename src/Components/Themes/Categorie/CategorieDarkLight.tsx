import { Category } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    categorie: Category[];
    setActiveCategory: (val: string) => void;
    activeCategory: string;
    themeMode: number | string;
}

const CategorieDarkLight = ({ color, categorie, setActiveCategory, activeCategory, themeMode }: Props) => {
    const mainTextColor = themeMode === 'Dark' ? 'text-gray-50' : 'text-gray-800';
    const primaryBg = themeMode === 'Dark' ? `bg-cyan-600` : color?.bg600;
    const cardBgColor = themeMode === 'Dark' ? `bg-gray-800` : 'bg-white';
    return (

        <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className={`text-4xl font-bold ${mainTextColor}`}>Jelajahi Kategori</h2>
            </div>

            <div className="flex overflow-x-auto pb-4 space-x-3 sm:space-x-5 whitespace-nowrap scrollbar-hide">
                <button
                    className={`flex-shrink-0 py-2.5 px-8 rounded-full text-lg font-semibold transition duration-200 shadow-md ${activeCategory === "Semua"
                        ? `${primaryBg} text-white shadow-lg`
                        : `${cardBgColor} ${mainTextColor} border ${themeMode === 'Dark' ? 'border-gray-700/20 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-200'}`
                        }`}
                    onClick={() => setActiveCategory("Semua")}
                >
                    Semua
                </button>
                {categorie.map(category => (
                    <button
                        key={category?.id}
                        className={`flex-shrink-0 py-2.5 px-8 rounded-full text-lg font-semibold transition duration-200 shadow-md ${activeCategory === category?.name
                            ? `${primaryBg} text-white shadow-lg`
                            : `${cardBgColor} ${mainTextColor} border ${themeMode === 'Dark' ? 'border-gray-700/20 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-200'}`
                            }`}
                        onClick={() => setActiveCategory(category?.name)}
                    >
                        {category?.name}
                    </button>
                ))}
            </div>
        </section>

    )
}

export default CategorieDarkLight