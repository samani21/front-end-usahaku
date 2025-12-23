import { DUMMY_CATEGORIES_FOUR } from '@/hooks/Theme/ProductFour';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React, { useMemo, useState } from 'react'

type Props = {
    color: ThemeColorSet;
    themeMode: string;
    setThemeMode: (val: string) => void
}

const Four = ({ color, themeMode, setThemeMode }: Props) => {
    const [activeCategory, setActiveCategory] = useState<string>('Semua');
    const mainTextColor = themeMode === 'Dark' ? 'text-gray-50' : 'text-gray-800';
    const primaryBg = themeMode === 'Dark' ? `bg-cyan-600` : color?.bg600;
    const cardBgColor = themeMode === 'Dark' ? `bg-gray-800` : 'bg-white';
    return (

        <>
            <i className='font-medium text-gray-600'>*Ini tampil saat atur hero/banner aja pilihan dark dan light ini</i>
            <div className="flex justify-around p-1 bg-gray-100 rounded-xl border border-gray-200 mb-4">
                <button
                    onClick={() => setThemeMode("Dark")}
                    className={`flex-1 py-2 px-2 text-sm font-semibold rounded-lg transition-colors ${themeMode === 'Dark' ? `bg-gray-600 text-white shadow-md` : 'text-slate-600'
                        }`}
                >
                    Dark
                </button>
                <button
                    onClick={() => setThemeMode("Light")}
                    className={`flex-1 py-2 px-2 text-sm font-semibold rounded-lg transition-colors ${themeMode === 'Light' ? `bg-gray-600 text-white shadow-md` : 'text-slate-600'
                        }`}
                >
                    Light
                </button>
            </div>
            <section className={`${cardBgColor} p-4`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-4xl font-bold ${mainTextColor}`}>Jelajahi Kategori</h2>
                </div>

                <div className="flex overflow-x-auto pb-4 space-x-3 sm:space-x-5 whitespace-nowrap scrollbar-hide">
                    <button
                        className={`flex-shrink-0 py-2.5 px-8 rounded-full text-lg font-semibold transition duration-200 shadow-md ${activeCategory === "Semua"
                            ? `${primaryBg} text-white shadow-lg`
                            : `${cardBgColor} ${mainTextColor} border ${themeMode === 'Dark' ? 'border-gray-700/20 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-200'}`
                            }`}
                        onClick={() => setActiveCategory("Semua")}
                    >
                        Semua
                    </button>
                    {DUMMY_CATEGORIES_FOUR.map(category => (
                        <button
                            key={category?.id}
                            className={`flex-shrink-0 py-2.5 px-8 rounded-full text-lg font-semibold transition duration-200 shadow-md ${activeCategory === category?.name
                                ? `${primaryBg} text-white shadow-lg`
                                : `${cardBgColor} ${mainTextColor} border ${themeMode === 'Dark' ? 'border-gray-700/20 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-200'}`
                                }`}
                            onClick={() => setActiveCategory(category?.name)}
                        >
                            {category?.name}
                        </button>
                    ))}
                </div>
            </section>
        </>

    )
}

export default Four