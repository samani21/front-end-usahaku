import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { ChevronRight, Utensils } from 'lucide-react';
import { title } from 'process';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    hero: Hero | null
}

const HeroSix = ({ color, hero }: Props) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
            <div className={`bg-gradient-to-r ${color?.gradient} p-8 md:p-16 rounded-3xl shadow-2xl`}>
                <div className="flex flex-col md:flex-row items-start justify-between">
                    <div>
                        <span className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-2 block">{hero?.title}</span>
                        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
                            {hero?.sub_title}
                        </h2>
                        <p className="text-lg font-light opacity-90 max-w-lg">
                            {hero?.description}
                        </p>
                        <button
                            // onClick={() => setViewMode('service')}
                            className={`mt-6 px-6 py-3 font-semibold rounded-lg transition duration-150 shadow-lg border ${color?.bg600} ${color?.border400} ${color?.hoverBg700}`}
                        >
                            {hero?.cta}
                        </button>
                    </div>
                    {
                        hero?.image &&
                        <img src={hero?.image} className='hidden md:block rounded-[24px] w-1/3' />
                    }
                </div>
            </div>
        </div>
    )
}

export default HeroSix