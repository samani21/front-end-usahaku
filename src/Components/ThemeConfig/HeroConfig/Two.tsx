import { DUMMY_HERO_TWO } from '@/hooks/Theme/ProductTwo';
import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { ChevronRight } from 'lucide-react';
import React, { useMemo } from 'react'

type Props = {
    color: ThemeColorSet;
    dataHero: Hero,
    deleteImage: boolean;
}

const Two = ({ color, dataHero, deleteImage }: Props) => {
    const hero = useMemo(() => {
        const HeroOld = DUMMY_HERO_TWO;
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
        <div className={`relative ${color?.bg50} rounded-xl my-4 overflow-hidden shadow-lg`}>
            <div className="p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between">
                <div className=" mb-6 md:mb-0 w-full">
                    <h4 className="text-md sm:text-lg font-extrabold leading-tight">
                        {hero?.title}
                    </h4>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                        {hero?.sub_title}
                    </h2>
                    <p className="mt-4 text-gray-600 text-lg">
                        {hero?.description}
                    </p>
                    <button className={`mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white transition duration-150 ${color?.bg600} ${color?.hoverBg700}`} onClick={() => {
                        const sec = document.getElementById("produk-pilihan");
                        sec?.scrollIntoView({ behavior: "smooth" });
                    }}>
                        {hero?.cta || "Lihat Penawaran"} <ChevronRight size={20} className="ml-2" />
                    </button>
                </div>
                {
                    hero?.image && !deleteImage &&
                    <div className={`${hero?.isFrame && hero?.frame === 'Light' ? 'bg-gray-100' : hero?.isFrame && hero?.frame === 'Dark' && 'bg-gray-900'} p-1 rounded-[12px] w-1/3  hidden sm:grid`}>
                        <img src={hero?.image} className=' rounded-[8px] w-full' />
                    </div>
                }

            </div>
        </div >
    )
}

export default Two