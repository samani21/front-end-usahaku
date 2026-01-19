import { DUMMY_HERO_ONE } from '@/hooks/Theme/ProductOne';
import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React, { useMemo } from 'react'

type Props = {
    color: ThemeColorSet;
    dataHero: Hero;
    deleteImage?: boolean;
}

const One = ({ color, dataHero, deleteImage }: Props) => {
    const hero = useMemo(() => {
        const HeroOld = DUMMY_HERO_ONE;
        const data = {
            title: dataHero?.title || HeroOld?.title,
            sub_title: dataHero?.sub_title || HeroOld?.sub_title,
            description: dataHero?.description || HeroOld?.description,
            cta: dataHero?.cta || HeroOld?.cta,
            image: dataHero?.image,
            isFrame: dataHero?.isFrame,
            frame: dataHero?.frame
        }
        return data
    }, [dataHero])
    return (
        <section className={`bg-gradient-to-r ${color?.gradient} p-8 mb-4 sm:p-12 rounded-2xl shadow-xl`}>
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className=" mb-6 md:mb-0 w-full">
                    <h4 className="text-md sm:text-lg font-extrabold leading-tight">
                        {hero?.title}
                    </h4>
                    <h2 className="text-2xl sm:text-5xl font-extrabold leading-tight">
                        {hero?.sub_title}
                    </h2>
                    <p className="mt-3 text-lg">
                        {hero?.description}
                    </p>
                    <button className={`mt-6 px-6 py-3 bg-white ${color?.text600} font-bold rounded-full shadow-lg hover:bg-gray-100 transition duration-300`} onClick={() => {
                        const sec = document.getElementById("produk-pilihan");
                        sec?.scrollIntoView({ behavior: "smooth" });
                    }}>
                        {hero?.cta}
                    </button>
                </div>
                {
                    hero?.image && !deleteImage &&
                    <div className={`${hero?.frame === 'Light' ? 'bg-gray-100' : hero?.frame === 'Dark' && 'bg-gray-900'} p-1 rounded-[12px] w-1/3  hidden sm:flex item-center justify-center`}>
                        <img src={hero?.image} className=' rounded-[8px]' />
                    </div>
                }
            </div>
        </section>
    )
}

export default One