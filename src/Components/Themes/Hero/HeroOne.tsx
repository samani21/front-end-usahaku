import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    hero: Hero | null
}

const HeroOne = ({ color, hero }: Props) => {
    return (
        <section className={`bg-gradient-to-r ${color?.gradient} p-8 sm:p-12 rounded-2xl shadow-xl`}>
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="max-w-lg mb-6 md:mb-0">
                    <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                        {hero?.sub_title}
                    </h2>
                    <p className="mt-3 text-lg">
                        {hero?.description}
                    </p>
                    <button className={`mt-6 px-6 py-3 bg-white ${color?.text600} font-bold rounded-full shadow-lg hover:bg-gray-100 transition duration-300`}>
                        {hero?.cta}
                    </button>
                </div>
                <div className="hidden sm:flex items-center justify-end">
                    <img src={hero?.image} className='w-2/3 rounded-[24px]' />
                </div>
            </div>
        </section>
    )
}

export default HeroOne