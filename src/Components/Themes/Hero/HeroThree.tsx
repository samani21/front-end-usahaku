import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { ChevronRight } from 'lucide-react';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    hero: Hero | null
}

const HeroThree = ({ color, hero }: Props) => {
    return (
        <div className={`relative overflow-hidden rounded-xl m-4 shadow-lg ${color?.bg50}`}> {/* Menggunakan warna tema terang */}
            <div className="p-6 md:p-10 flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-4 md:mb-0">
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
                    hero?.image &&
                    <div className="shrink-0">
                        <img
                            src={hero?.image}
                            alt="Banner Promo"
                            className="rounded-[8px] shadow-xl w-[150px]"
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default HeroThree