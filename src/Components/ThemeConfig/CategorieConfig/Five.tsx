import { ResCategorie } from '@/lib/Types/Product/CategorieState';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React, { useState } from 'react'

type Props = {
    color: ThemeColorSet;
    categorie: ResCategorie[];
    frameIcon: 'Light' | 'Dark' | null
}

const Five = ({ color, categorie, frameIcon }: Props) => {
    const [activeCategory, setActiveCategory] = useState<string>('Semua');
    return (
        <section className="mb-12 p-4">
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
                    return (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category?.name)}
                            className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 w-24 h-24 text-center shadow-sm ${activeCategory === category.name
                                ? `${color?.bg800} text-white ring-2 ${color?.ring800}`
                                : `bg-white ${color?.text700} ${color?.hoverBg100} border ${color?.border200}`
                                }`}
                        >
                            {category?.icon &&
                                <div className={`${frameIcon === 'Light' ? color?.bg100 : frameIcon === 'Dark' ? color?.bg900 : ""} rounded-full p-1`}>
                                    <img src={category?.icon} className='w-[24px] h-[24px]' />
                                </div>
                            }
                            <span className={`text-sm font-medium ${category?.icon ? 'mt-1' : "mt-8"}`}>{category.name}</span>
                        </button>
                    );
                })}
            </div>
        </section>
    )
}

export default Five
