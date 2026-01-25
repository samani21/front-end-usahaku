import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import React from 'react'
import { ResCategorie } from '@/Types/Product/CategorieState';
import { ChevronRight } from 'lucide-react';

type Props = {
    color: ThemeColorSet;
    categories: ResCategorie[];
    isDarkMode: boolean;
}

const Six = ({ color, categories }: Props) => {
    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((cat, i) => (
                    <div key={i} className="relative h-64 rounded-2xl overflow-hidden group">
                        <img src={cat.image} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-50" alt="" />
                        <div className={`absolute inset-0 mix-blend-multiply opacity-60 transition-opacity group-hover:opacity-0 ${color?.bg600}`} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter">{cat.name}</h3>
                            <div className="w-8 h-1 bg-white mt-2 scale-x-0 group-hover:scale-x-100 transition-transform" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Six