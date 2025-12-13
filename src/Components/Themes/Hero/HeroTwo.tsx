import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { ChevronRight } from 'lucide-react';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    hero: Hero | null
}

const HeroTwo = ({ color, hero }: Props) => {
    return (
        <div className={`relative ${color?.bg50} rounded-xl my-4 overflow-hidden shadow-lg`}>
            <div className="p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between">
                <div className="max-w-lg mb-6 md:mb-0">
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
                <div className="w-full md:w-1/3 flex justify-center">
                    <img src={hero?.image} className='w-full rounded-[24px]' />
                </div>
            </div>
        </div>
    )
}

export default HeroTwo