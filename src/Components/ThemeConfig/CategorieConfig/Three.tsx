import { DUMMY_CATEGORIES_THREE } from '@/hooks/Theme/ProductThree';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React, { useMemo, useState } from 'react'

type Props = {
    color: ThemeColorSet;
    
}

const Three = ({ color }: Props) => {
    const [activeCategory, setActiveCategory] = useState<string>('Semua');
    return (
        <div className="mx-4 mt-6 p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Jelajahi Kategori</h2>
            <div className="flex flex-wrap gap-2 md:gap-4 overflow-x-auto pb-2">
                <button
                    onClick={() => setActiveCategory("Semua")}
                    className={`px-4 py-2 rounded-full text-sm transition ${activeCategory === 'Semua' ? `${color?.bg600} text-white shadow-md` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                    Semua
                </button>
                {DUMMY_CATEGORIES_THREE.map(category => {
                    const Icon = category.iconComponent;

                    return (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category?.name)}
                            className={`flex items-center px-4 py-2 rounded-full text-sm transition ${activeCategory === category?.name ? `${color?.bg600} text-white shadow-md` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            {Icon &&
                                <Icon className="h-4 w-4 mr-1" />
                            }
                            {category.name}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default Three