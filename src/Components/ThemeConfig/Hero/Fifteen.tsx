import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import { Heart, Zap } from 'lucide-react';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    isBuild?: boolean;
    isDarkMode: boolean;
    headline: string;
    subHeadline: string;
    ctaText: string;
    imageHero: string | null
}


const Fifteen = ({ color, isDarkMode, headline, subHeadline, ctaText, imageHero }: Props) => {
    return (
        <section>

            <div className={`grid md:grid-cols-2 ${color?.bg950} text-white rounded-3xl overflow-hidden min-h-[500px]`}>
                <div className="p-12 flex flex-col justify-center items-start text-left order-2 md:order-1">
                    <div className="w-12 h-[2px] bg-white/30 mb-8" />
                    <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight italic">{headline}</h2>
                    <p className={`${color?.text50} mb-10 max-w-sm`}>{subHeadline}</p>
                    <button className={`px-10 py-4 bg-white ${color?.text900} font-bold uppercase tracking-widest text-xs ${color?.hoverBg100} transition-colors`}>Lihat Koleksi</button>
                </div>
                <div className={`order-1 md:order-2 relative ${color?.bg900}`}>
                    {
                        imageHero &&
                        <img src={imageHero} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
                    }
                    <div className={`absolute inset-0 bg-gradient-to-t ${color?.gradientTotransparan} to-transparent`} />
                </div>
            </div>
        </section>
    )
}

export default Fifteen