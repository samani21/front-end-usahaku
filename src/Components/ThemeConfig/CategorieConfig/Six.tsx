import { ResCategorie } from '@/lib/Types/Product/CategorieState';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React, { useState } from 'react'

type Props = {
    color: ThemeColorSet;
    categorie: ResCategorie[];
    frameIcon: 'Light' | 'Dark' | null
}

const Six = ({ color, categorie, frameIcon }: Props) => {
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
                {categorie.map((category) => (
                    <button
                        key={category?.id}
                        onClick={() => setActiveCategory(category?.name)}
                        className={`px-5 py-2 text-base  flex items-center gap-2 font-semibold rounded-full transition duration-150 whitespace-nowrap border ${activeCategory === category?.name
                            ? `${color?.bg600} text-white ${color?.border600} shadow-lg`
                            : `bg-white text-gray-700 border-gray-200 hover:bg-gray-50`
                            }`}
                    >
                        {category?.icon &&
                            <div className={`${frameIcon === 'Light' ? color?.bg100 : frameIcon === 'Dark' ? color?.bg900 : ""} rounded-full p-1`}>
                                <img src={category?.icon} className='w-[24px] h-[24px]' />
                            </div>
                        }
                        {category?.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Six
