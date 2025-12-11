import { Category } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    categorie: Category[];
    setActiveCategory: (val: string) => void;
    activeCategory: string
}

//   const Icon = category.iconComponent;

//                     return (
//                         <button
//                             key={category.id}
//                             onClick={() => setActiveCategory(category?.name)}
//                             className={`flex items-center px-4 py-2 rounded-full text-sm transition ${activeCategory === category?.name ? `${color?.bg600} text-white shadow-md` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                         >
//                             {Icon &&
//                                 <Icon className="h-4 w-4 mr-1" />
//                             }
//                             {category.name}
//                         </button>

const CategorieEight = ({ color, categorie, setActiveCategory, activeCategory }: Props) => {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Pilih Kategori</h2>
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={() => setActiveCategory("Semua")}
                    className={`flex items-center px-4 py-2 rounded-full font-semibold transition duration-200 shadow-md ${activeCategory === "Semua"
                        ? `${color?.bg600} text-white`
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                        }
                                        `}
                >
                    Semua
                </button>
                {categorie.map(category => {
                    const Icon = category.iconComponent;
                    return (
                        <button
                            key={category?.id}
                            onClick={() => setActiveCategory(category?.name)}
                            className={`flex items-center px-4 py-2 rounded-full font-semibold transition duration-200 shadow-md ${activeCategory === category?.name
                                ? `${color?.bg600} text-white`
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }
                                        `}
                        >
                            {Icon &&
                                <Icon className="h-4 w-4 mr-1" />
                            }
                            {category?.name}
                        </button>
                    )
                })}
            </div>
        </section>
    )
}

export default CategorieEight