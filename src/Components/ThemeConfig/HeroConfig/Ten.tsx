
import { DUMMY_HERO_TEN } from '@/hooks/Theme/ProductTen';
import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React, { useMemo } from 'react'

type Props = {
    color: ThemeColorSet;
    dataHero: Hero;
    deleteImage?: boolean;
}

const Ten = ({ color, dataHero, deleteImage }: Props) => {
    const hero = useMemo(() => {
        const HeroOld = DUMMY_HERO_TEN;
        const data = {
            title: dataHero?.title || HeroOld?.title,
            sub_title: dataHero?.sub_title || HeroOld?.sub_title,
            description: dataHero?.description || HeroOld?.description,
            cta: dataHero?.cta || HeroOld?.cta,
            image: dataHero?.image || HeroOld?.image,
            isFrame: dataHero?.isFrame || HeroOld?.isFrame,
            frame: dataHero?.frame || HeroOld?.frame
        }
        return data
    }, [dataHero])
    return (
        <section id="home" className={`${color?.bg50} pt-20 pb-12 sm:pt-24 sm:pb-16 ${hero?.image ? "" : 'text-center'} rounded-b-xl mb-4`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className=" mb-6 md:mb-0 w-full ">
                    <h4 className="text-md sm:text-lg font-extrabold leading-tight text-white">
                        {hero?.title}
                    </h4>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3">
                        {hero?.sub_title}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 mx-auto">
                        {hero?.description}
                    </p>
                    <div className="mt-6">
                        <a href="#satuan" className={`inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-lg text-white ${color?.bg600} ${color?.hoverBg700} transition duration-300 transform hover:scale-105`}>
                            {hero?.cta}
                        </a>
                    </div>
                </div>
                {
                    hero?.image && !deleteImage &&
                    <div className={`${hero?.isFrame && hero?.frame === 'Light' ? 'bg-gray-100' : hero?.isFrame && hero?.frame === 'Dark' && 'bg-gray-900'} p-1 rounded-[12px] w-1/3  hidden sm:grid`}>
                        <img src={hero?.image} className="rounded-[8px] shadow-xl w-full" />
                    </div>
                }
            </div>
        </section>
    )
}

export default Ten