import { DUMMY_CATEGORIES_EIGHT } from '@/hooks/Theme/ProductEight';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React, { useMemo, useState } from 'react'

type Props = {
    color: ThemeColorSet;

}

const Eight = ({ color }: Props) => {
    const [activeCategory, setActiveCategory] = useState<string>('Semua');
    return (
        <section className="mb-12 p-4">
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
                {DUMMY_CATEGORIES_EIGHT.map(category => {
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

export default Eight
