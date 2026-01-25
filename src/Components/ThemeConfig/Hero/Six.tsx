import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    isBuild?: boolean;
    isDarkMode: boolean;
    headline: string;
    subHeadline: string;
    ctaText: string;
    imageHero: string | null;
    title: string;
}


const Six = ({ color, isDarkMode, headline, subHeadline, ctaText, imageHero, title }: Props) => {
    return (
        <section>
            <div className={`rounded-3xl p-8 md:p-12 overflow-hidden relative border-4 border-black transition-all ${isDarkMode ? 'bg-slate-800' : color?.bg50}`} >
                <div className="grid md:grid-cols-5 gap-8 items-center">
                    <div className="md:col-span-3 space-y-6">
                        <div className="inline-block px-4 py-1 bg-black text-white rounded-full text-xs font-bold uppercase italic tracking-tighter shadow-[4px_4px_0px_#000]">{title}</div>
                        <h2 className={`text-5xl md:text-7xl font-black uppercase ${isDarkMode ? "text-white" : "text-black"} leading-[0.9]`}>{headline}</h2>
                        <p className={`text-xl font-bold ${isDarkMode ? "text-white/60" : "text-black/60"}`}>{subHeadline}</p>
                        <div className="flex gap-4 pt-4">
                            <button className={`px-8 py-4 ${color?.bg400} text-black border-4 border-black font-black text-lg hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_#000] transition-all active:translate-x-0 active:translate-y-0 active:shadow-none uppercase`}>
                                {ctaText}
                            </button>
                        </div>
                    </div>
                    <div className="md:col-span-2 relative">
                        <div className={`absolute -inset-4 ${color?.bg400} rounded-full scale-90 blur-xl opacity-20 animate-pulse`} />
                        {
                            imageHero &&
                            <img src={imageHero} alt="Hero" className="relative z-10 w-full object-contain drop-shadow-[10px_10px_0px_#000]" />
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Six