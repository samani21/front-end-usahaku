import { DUMMY_CATEGORIES_SIX } from '@/hooks/Theme/ProductSix';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React, { useMemo, useState } from 'react'

type Props = {
    color: ThemeColorSet;

}

const Six = ({ color }: Props) => {
    const [activeCategory, setActiveCategory] = useState<string>('Semua');
    return (
        <div className="-auto px-4 sm:px-6 lg:px-8 pb-8">
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
                {DUMMY_CATEGORIES_SIX.map((category) => (
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

export default Six
