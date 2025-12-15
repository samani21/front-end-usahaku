import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { useMemo, useState } from 'react';

type Props = {
    color: ThemeColorSet;
    hero: Hero | null
}



const HeroTen = ({ color, hero}: Props) => {

    return (
        <section id="home" className={`${color?.bg50} pt-20 pb-12 sm:pt-24 sm:pb-16 text-center  rounded-b-xl mb-4`}>
            <div className="container mx-auto px-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3">
                    {hero?.sub_title}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                    {hero?.description}
                </p>
                <div className="mt-6">
                    <a href="#satuan" className={`inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-lg text-white ${color?.bg600} ${color?.hoverBg700} transition duration-300 transform hover:scale-105`}>
                        {hero?.cta}
                    </a>
                </div>
            </div>
        </section>
    )
}

export default HeroTen