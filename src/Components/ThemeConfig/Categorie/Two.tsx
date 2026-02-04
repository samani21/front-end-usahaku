import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import React from 'react'
import { ResCategorie } from '@/Types/Product/CategorieState';

type Props = {
    color: ThemeColorSet;
    categories: ResCategorie[];
    isDarkMode: boolean;
}

const Two = ({ color, categories, isDarkMode }: Props) => {
    return (
        <section className="text-center">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                {categories.map((cat, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 p-1 border-2 border-transparent ${color?.groupHover} transition-all`}>
                            <img src={cat.image} className={`w-full h-full object-cover rounded-full shadow-lg ${isDarkMode&&"bg-white"}`} alt="" />
                        </div>
                        <h3 className="font-bold text-sm uppercase tracking-widest">{cat.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Two