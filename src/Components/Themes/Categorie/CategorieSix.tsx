import { Category } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    categorie: Category[];
    setActiveCategory: (val: string) => void;
    activeCategory: string
}

const CategorieSix = ({ color, categorie, setActiveCategory, activeCategory }: Props) => {
    return (
        // <div className="mx-4 mt-6">
        //     <h2 className="text-xl font-bold text-gray-800 mb-3">Jelajahi Kategori</h2>
        //     <div className="flex flex-wrap gap-2 md:gap-4 overflow-x-auto pb-2">
        //         <button
        //             onClick={() => setActiveCategory("Semua")}
        //             className={`px-4 py-2 rounded-full text-sm transition ${activeCategory === 'Semua' ? `${color?.bg600} text-white shadow-md` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        //         >
        //             Semua
        //         </button>
        //         {categorie.map(category => {
        //             const Icon = category.iconComponent;

        //             return (
        //                 <button
        //                     key={category.id}
        //                     onClick={() => setActiveCategory(category?.name)}
        //                     className={`flex items-center px-4 py-2 rounded-full text-sm transition ${activeCategory === category?.name ? `${color?.bg600} text-white shadow-md` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        //                 >
        //                     {Icon &&
        //                         <Icon className="h-4 w-4 mr-1" />
        //                     }
        //                     {category.name}
        //                 </button>
        //             );
        //         })}
        //     </div>
        // </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Telusuri Menu</h2>
            <div className="flex flex-wrap gap-3 overflow-x-auto pb-2">
                <button
                    onClick={() => setActiveCategory("Semua")}
                    className={`px-5 py-2 text-base font-semibold rounded-full transition duration-150 whitespace-nowrap border ${activeCategory === "Semua"
                        ? `${color?.bg600} text-white ${color?.border600} shadow-lg`
                        : `bg-white text-gray-700 border-gray-200 hover:bg-gray-50`
                        }`}
                >
                    Semua
                </button>
                {categorie.map((category) => (
                    <button
                        key={category?.id}
                        onClick={() => setActiveCategory(category?.name)}
                        className={`px-5 py-2 text-base font-semibold rounded-full transition duration-150 whitespace-nowrap border ${activeCategory === category?.name
                            ? `${color?.bg600} text-white ${color?.border600} shadow-lg`
                            : `bg-white text-gray-700 border-gray-200 hover:bg-gray-50`
                            }`}
                    >
                        {category?.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CategorieSix