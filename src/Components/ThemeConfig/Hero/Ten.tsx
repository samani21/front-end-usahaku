import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import { CheckCircle, Zap } from 'lucide-react';
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


const Ten = ({ color, headline, subHeadline, ctaText, isDarkMode }: Props) => {
    return (
        <section>
            <div className={`p-8 md:p-20 rounded-[4rem] text-center border-2 transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : `bg-gradient-to-br ${color?.gradient} to-white border-blue-100 shadow-xl shadow-blue-500/5`}`}>
                <h2 className={`text-4xl md:text-6xl font-bold mb-6`}>{headline}</h2>
                <p className="text-slate-500 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">{subHeadline}</p>
                <button className={`px-12 py-4 rounded-full text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 ${color?.bg600}`}>
                    {ctaText}
                </button>
            </div>
        </section>
    )
}

export default Ten