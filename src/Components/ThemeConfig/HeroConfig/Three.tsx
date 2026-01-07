import { DUMMY_HERO_THREE } from '@/hooks/Theme/ProductThree';
import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { ChevronRight } from 'lucide-react';
import React, { useMemo } from 'react'

type Props = {
    color: ThemeColorSet;
    dataHero: Hero;
    deleteImage: boolean;
}

const Three = ({ color, dataHero, deleteImage }: Props) => {
    const hero = useMemo(() => {
        const HeroOld = DUMMY_HERO_THREE;
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
        <div className={`relative overflow-hidden rounded-xl my-4 shadow-lg ${color?.bg50}`}> {/* Menggunakan warna tema terang */}
            <div className="p-6 md:p-10 flex flex-col md:flex-row items-center justify-between">
                <div className=" mb-6 md:mb-0 w-full">
                    <h4 className="text-md sm:text-lg font-extrabold leading-tight">
                        {hero?.title}
                    </h4>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                        {hero?.sub_title}
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">{hero?.description}</p>
                    <button className={`mt-4 inline-flex items-center px-4 py-2 ${color?.bg600} text-white font-semibold rounded-lg shadow-md ${color?.hoverBg700} transition`} onClick={() => {
                        const sec = document.getElementById("produk-pilihan");
                        sec?.scrollIntoView({ behavior: "smooth" });
                    }}>
                        {hero?.cta}
                        <ChevronRight className="h-5 w-5 ml-1" />
                    </button>
                </div>
                {
                    hero?.image && !deleteImage &&
                    <div className={`${hero?.isFrame && hero?.frame === 'Light' ? 'bg-gray-100' : hero?.isFrame && hero?.frame === 'Dark' && 'bg-gray-900'} p-1 rounded-[12px] w-1/3  hidden sm:grid`}>
                        <img src={hero?.image} className="rounded-[8px] shadow-xl w-full" />
                    </div>
                }
            </div>
        </div>
    )
}

export default Three