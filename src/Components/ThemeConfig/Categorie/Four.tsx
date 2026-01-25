import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import React from 'react'
import { ResCategorie } from '@/Types/Product/CategorieState';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

type Props = {
    color: ThemeColorSet;
    categories: ResCategorie[];
    isDarkMode: boolean;
}

const Four = ({ categories, isDarkMode }: Props) => {
    return (
        <section>
            <div className="space-y-4">
                {categories.map((cat, i) => (
                    <div key={i} className={`group flex items-center p-4 rounded-2xl transition-all cursor-pointer hover:pl-8 ${isDarkMode ? 'bg-slate-900' : 'bg-white border border-slate-100'}`}>
                        <div className="w-16 h-16 rounded-xl overflow-hidden mr-6">
                            <img src={cat.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold">{cat.name}</h3>
                            <p className="text-sm opacity-50">{cat.count}</p>
                        </div>
                        <div className={`opacity-0 group-hover:opacity-100 transition-opacity p-3 rounded-full ${isDarkMode ? " bg-slate-800" : " bg-slate-100"}`}>
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Four