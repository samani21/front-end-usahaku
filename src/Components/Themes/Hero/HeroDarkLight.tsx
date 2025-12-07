import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'

type Props = {
    hero: Hero | null;
    color: ThemeColorSet;
    themeMode: number | string;
}

const HeroDarkLight = ({ themeMode, hero, color }: Props) => {
    const heroGradient = themeMode === 'Dark'
        ? `from-gray-800 to-cyan-900`
        : `from-white ${color?.bg50}`;
    const heroTextColor = themeMode === 'Dark' ? 'text-white' : 'text-gray-900';
    const heroAccentText = themeMode === 'Dark' ? 'text-teal-200' : color?.text700;
    const heroButtonClasses = themeMode === 'Dark'
        ? 'bg-white text-gray-900 hover:bg-slate-100'
        : `${color?.bg600} ${color?.hoverBg700} text-white`;

    return (
        <section className={`bg-gradient-to-r ${heroGradient} rounded-3xl shadow-2xl overflow-hidden mb-16 p-8 md:p-16 ${heroTextColor}`}>
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-3/5">
                    <span className={`text-sm font-semibold uppercase tracking-widest ${heroAccentText} mb-2 block`}>{hero?.title}</span>
                    <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">{hero?.sub_title}</h2>
                    <p className={`text-xl mb-8 ${themeMode === 'Dark' ? 'text-cyan-100' : 'text-gray-700'}`}>{hero?.description}</p>
                    <button className={`font-bold py-3.5 px-10 rounded-full shadow-lg transition duration-300 transform hover:scale-105 ${heroButtonClasses}`}>
                        {hero?.cta}
                    </button>
                </div>
                <div className="hidden md:block md:w-1/4">
                    {/* SVG Ilustrasi Modern */}
                    <svg className={`w-full h-auto opacity-80 ${themeMode === 'Dark' ? 'text-white' : 'text-gray-700'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                </div>
            </div>
        </section>

    )
}

export default HeroDarkLight