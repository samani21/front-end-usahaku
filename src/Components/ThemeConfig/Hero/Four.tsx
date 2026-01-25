import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
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


const Four = ({ color, isDarkMode, headline, subHeadline, ctaText }: Props) => {
    return (
        <section>
            <div className={`p-8 md:p-16 rounded-2xl border-2 border-dashed transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700' : `${color?.bg50} ${color?.border300}`}`}>
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className={`text-4xl md:text-6xl font-serif ${isDarkMode ? color?.text100 : color?.text900} mb-6`}>{headline}</h2>
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="h-px bg-amber-900/20 flex-1" />
                        <div className={`w-3 h-3 rounded-full ${color?.bg600}`} />
                        <div className="h-px bg-amber-900/20 flex-1" />
                    </div>
                    <p className={`${isDarkMode ? "text-slate-400" : "text-slate-600"} text-lg mb-10 leading-relaxed font-serif`}>{subHeadline}</p>
                    <div className="relative inline-block group">
                        <div className={`absolute inset-0 translate-x-1 translate-y-1 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 ${color?.bg600}`} />
                        <button className="relative px-8 py-3 bg-white border-2 border-current text-black font-bold uppercase tracking-widest">{ctaText}</button>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Four