import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import React from 'react'
import { ResCategorie } from '@/Types/Product/CategorieState';

type Props = {
    color: ThemeColorSet;
    isDarkMode: boolean;
    categories: ResCategorie[];
}

const One = ({ categories, isDarkMode }: Props) => {
    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px]">
                <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl">
                    <img src={categories[0].image} className={`absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${isDarkMode && "bg-white"}`} alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end">
                        <h3 className="text-3xl font-bold text-white">{categories[0].name}</h3>
                        <p className="text-white/60">{categories[0].count} Item</p>
                    </div>
                </div>
                {categories.slice(1).map((cat, i) => (
                    <div key={i} className="relative group overflow-hidden rounded-3xl">
                        <img src={cat.image} className={`absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${isDarkMode && "bg-white"}`} alt="" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors p-6 flex flex-col justify-end">
                            <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                            <p className="text-white/60">{cat?.count} Item</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default One