import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import React from 'react'
import { ResCategorie } from '@/Types/Product/CategorieState';
import { ChevronRight } from 'lucide-react';

type Props = {
    color: ThemeColorSet;
    categories: ResCategorie[];
    isDarkMode: boolean;
}

const Three = ({ color, categories, isDarkMode }: Props) => {
    return (
        <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((cat, i) => (
                    <div key={i} className={`p-6 rounded-3xl border transition-all hover:-translate-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'}`}>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg ${color?.bg600}`} >
                            <img src={cat?.image} className='w-12 h-12 rounded-2xl object-cover' />
                        </div>
                        <h3 className="text-xl font-bold mb-1">{cat.name}</h3>
                        <p className="text-xs text-slate-400 font-medium mb-4">{cat.count}</p>
                        <div className={`flex items-center gap-2 text-xs font-bold ${color?.text600}`}>
                            LIHAT <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>
                ))}
            </div>
        </section>

    )
}

export default Three