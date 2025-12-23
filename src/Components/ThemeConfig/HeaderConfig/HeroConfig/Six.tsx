import { DUMMY_HERO_SIX } from '@/hooks/Theme/ProductSix';
import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React, { useMemo } from 'react'

type Props = {
    color: ThemeColorSet;
    dataHero: Hero
}

const Six = ({ color, dataHero }: Props) => {
    const hero = useMemo(() => {
        const HeroOld = DUMMY_HERO_SIX;
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
        <div className=" mx-auto pt-8 pb-12">
            <div className={`bg-gradient-to-r ${color?.gradient} p-8 md:p-16 rounded-3xl shadow-2xl`}>
                <div className="flex flex-col md:flex-row items-start justify-between">
                    <div className=" mb-6 md:mb-0 w-full">
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
                        <div className={`${hero?.isFrame && hero?.frame === 'Light' ? 'bg-gray-100' : hero?.isFrame && hero?.frame === 'Dark' && 'bg-gray-900'} p-1 rounded-[12px] w-1/3  hidden sm:grid`}>
                            <img src={hero?.image} className="rounded-[8px] shadow-xl w-full" />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Six