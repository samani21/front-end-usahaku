import { DUMMY_HERO_FIVE } from '@/hooks/Theme/ProductFive';
import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React, { useMemo } from 'react'

type Props = {
    color: ThemeColorSet;
    dataHero: Hero;
    deleteImage: boolean;
}

const Five = ({ color, dataHero, deleteImage }: Props) => {
    const hero = useMemo(() => {
        const HeroOld = DUMMY_HERO_FIVE;
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
        <section className={`mb-12 ${color?.bg200} rounded-2xl p-8 md:p-12 shadow-inner`}>
            <div className="md:flex items-center">
                <div className=" mb-6 md:mb-0 w-full">
                    <h4 className="text-md sm:text-lg font-extrabold leading-tight">
                        {hero?.title}
                    </h4>
                    <h2 className={`text-4xl md:text-5xl font-extrabold ${color?.text800} mb-4 leading-tight`}>
                        {hero?.sub_title}
                    </h2>
                    <p className={`text-lg ${color?.text600} mb-6`}>
                        {hero?.description}
                    </p>
                    <button className={`px-6 py-3 ${color?.bg800} text-white font-semibold rounded-lg ${color?.hoverBg700} transition duration-300 shadow-md`} onClick={() => {
                        const sec = document.getElementById("produk-pilihan");
                        sec?.scrollIntoView({ behavior: "smooth" });
                    }}>
                        {hero?.cta}
                    </button>
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

export default Five