import { DUMMY_CATEGORIES_ONE, DUMMY_HERO_ONE } from '@/hooks/Theme/ProductOne';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React, { useMemo, useState } from 'react'

type Props = {
    color: ThemeColorSet;
}

const One = ({ color }: Props) => {
    const [activeCategory, setActiveCategory] = useState<string>('Semua');
    return (
        <section className="space-y-6 p-4">
            <h2 className="text-3xl font-bold border-b pb-2 border-gray-200 dark:border-gray-700">Kategori Produk</h2>
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={() => setActiveCategory("Semua")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${activeCategory === "Semua"
                        ? `${color?.bg600} text-white shadow-md`
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
                        }`}
                >
                    <span>Semua</span>
                </button>
                {DUMMY_CATEGORIES_ONE?.map((cat) => {
                    const IconComponent = cat.iconComponent;
                    return (
                        <button
                            key={cat.name}
                            onClick={() => setActiveCategory(cat.name)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${activeCategory === cat.name
                                ? `${color?.bg600} text-white shadow-md`
                                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
                                }`}
                        >
                            {IconComponent ? <IconComponent size={18} /> :
                                <img src={cat?.icon} />}

                            <span>{cat.name}</span>
                        </button>
                    )
                })}
            </div>
        </section>
    )
}

export default One