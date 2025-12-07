import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { ChevronRight } from 'lucide-react';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    hero: Hero | null
}

const HeroFive = ({ color, hero }: Props) => {
    return (
        <section className={`mb-12 ${color?.bg200} rounded-2xl p-8 md:p-12 shadow-inner`}>
            <div className="md:flex items-center">
                <div className="md:w-1/2">
                    <h2 className={`text-4xl md:text-5xl font-extrabold ${color?.text800} mb-4 leading-tight`}>
                        {hero?.sub_title}
                    </h2>
                    <p className={`text-lg ${color?.text600} mb-6`}>
                        {hero?.description}
                    </p>
                    <button className={`px-6 py-3 ${color?.bg800} text-white font-semibold rounded-lg ${color?.hoverBg700} transition duration-300 shadow-md`}>
                        {hero?.cta}
                    </button>
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0 md:pl-10 flex justify-end">
                    {/* placeholder if needed, otherwise use Tailwind abstract art */}
                    <div className={`${color?.text700} font-bold text-lg hidden sm:block`}>
                        <img src={hero?.image} className={`w-48 h-48 md:w-64 md:h-64 ${color?.bg400} rounded-[24px]`} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroFive