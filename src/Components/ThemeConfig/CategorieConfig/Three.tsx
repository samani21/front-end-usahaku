import { ResCategorie } from '@/lib/Types/Product/CategorieState';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React, { useState } from 'react'

type Props = {
    color: ThemeColorSet;
    categorie: ResCategorie[]
    frameIcon: 'Light' | 'Dark' | null

}

const Three = ({ color, categorie, frameIcon }: Props) => {
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
                {categorie.map(category => {
                    return (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category?.name)}
                            className={`flex items-center px-4 py-2 gap-2 rounded-full text-sm transition ${activeCategory === category?.name ? `${color?.bg600} text-white shadow-md` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            {
                                category?.icon &&
                                <div className={`${frameIcon === 'Light' ? color?.bg100 : frameIcon === 'Dark' ? color?.bg900 : ""} rounded-full p-1`}>
                                    <img src={category?.icon} className='w-[24px] h-[24px]' />
                                </div>
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