import { DUMMY_HERO_FOUR } from '@/hooks/Theme/ProductFour';
import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React, { FC, useMemo } from 'react'

type Props = {
    color: ThemeColorSet;
    dataHero: Hero;
    setThemeMode: (val: string) => void;
    themeMode: string;
    deleteImage: boolean;
}

const CartIcon: FC<{ className?: string; strokeWidth?: number; }> = ({ className, strokeWidth = 1 }) => (
    <svg className={className} strokeWidth={strokeWidth} xmlns="http://www.w3.org/2000/svg" width="90" height="" viewBox="0 0 24 24" fill="none" stroke="none" strokeLinecap="round" strokeLinejoin="round">
        <path fill="currentColor" fill-rule="evenodd" d="M1.289 2.763a.75.75 0 0 1 .948-.475l.265.089l.04.013c.626.209 1.155.385 1.572.579c.442.206.826.46 1.117.865c.291.403.412.848.467 1.333c.052.456.052 1.014.052 1.674V9.5c0 1.435.002 2.437.103 3.192c.099.734.28 1.122.556 1.399c.277.277.666.457 1.4.556c.755.101 1.756.103 3.191.103h7a.75.75 0 0 1 0 1.5h-7.055c-1.367 0-2.47 0-3.337-.116c-.9-.122-1.658-.38-2.26-.982s-.86-1.36-.981-2.26c-.117-.867-.117-1.97-.117-3.337V6.883c0-.713 0-1.185-.042-1.546c-.04-.342-.107-.506-.194-.626c-.086-.12-.221-.237-.533-.382c-.33-.153-.777-.304-1.453-.53l-.265-.087a.75.75 0 0 1-.474-.95" clip-rule="evenodd" /><path fill="currentColor" d="M5.745 6q.006.39.005.841V9.5c0 1.435.002 2.437.103 3.192q.023.165.05.308h10.12c.959 0 1.438 0 1.814-.248s.565-.688.942-1.57l.43-1c.809-1.89 1.213-2.834.769-3.508S18.506 6 16.45 6z" opacity="0.5" /><path fill="currentColor" d="M7.25 9A.75.75 0 0 1 8 8.25h3a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 9m.25 9a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3M18 19.5a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0" />
    </svg>
);


const Four = ({ color, dataHero, themeMode, setThemeMode, deleteImage }: Props) => {
    const hero = useMemo(() => {
        const HeroOld = DUMMY_HERO_FOUR;
        const data = {
            title: dataHero?.title || HeroOld?.title,
            sub_title: dataHero?.sub_title || HeroOld?.sub_title,
            description: dataHero?.description || HeroOld?.description,
            cta: dataHero?.cta || HeroOld?.cta,
            image: dataHero?.image || HeroOld?.image,
            isFrame: dataHero?.isFrame || HeroOld?.isFrame,
            frame: dataHero?.frame || HeroOld?.frame,
            iconDefault: dataHero?.iconDefault,
        }
        return data
    }, [dataHero])
    const heroGradient = themeMode === 'Dark'
        ? `from-gray-800 to-cyan-900`
        : `from-white ${color?.bg50}`;
    const heroTextColor = themeMode === 'Dark' ? 'text-white' : 'text-gray-900';
    const heroAccentText = themeMode === 'Dark' ? 'text-teal-200' : color?.text700;
    const heroButtonClasses = themeMode === 'Dark'
        ? 'bg-white text-gray-900 hover:bg-slate-100'
        : `${color?.bg600} ${color?.hoverBg700} text-white`;

    return (
        <>
            <i className='font-medium text-gray-600'>*Ini tampil saat atur hero/banner aja pilihan dark dan light ini</i>
            <div className="flex justify-around p-1 bg-gray-100 rounded-xl border border-gray-200 mb-4">
                <button
                    onClick={() => setThemeMode("Dark")}
                    className={`flex-1 py-2 px-2 text-sm font-semibold rounded-lg transition-colors ${themeMode === 'Dark' ? `bg-gray-600 text-white shadow-md` : 'text-slate-600'
                        }`}
                >
                    Dark
                </button>
                <button
                    onClick={() => setThemeMode("Light")}
                    className={`flex-1 py-2 px-2 text-sm font-semibold rounded-lg transition-colors ${themeMode === 'Light' ? `bg-gray-600 text-white shadow-md` : 'text-slate-600'
                        }`}
                >
                    Light
                </button>
            </div>
            <section className={`bg-gradient-to-r ${heroGradient} rounded-3xl shadow-2xl overflow-hidden mb-16 p-8 md:p-16 ${heroTextColor}`}>
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="w-full">
                        <span className={`text-sm font-semibold uppercase tracking-widest ${heroAccentText} mb-2 block`}>{hero?.title}</span>
                        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">{hero?.sub_title}</h2>
                        <p className={`text-xl mb-8 ${themeMode === 'Dark' ? 'text-cyan-100' : 'text-gray-700'}`}>{hero?.description}</p>
                        <button className={`font-bold py-3.5 px-10 rounded-full shadow-lg transition duration-300 transform hover:scale-105 ${heroButtonClasses}`}>
                            {hero?.cta}
                        </button>
                    </div>
                    {
                        hero?.iconDefault ?
                            <div className={`${hero?.frame == 'Light' ? 'bg-gray-100' : hero?.frame === 'Dark' && heroButtonClasses} rounded-full w-1/4 hidden sm:grid`}>
                                <CartIcon className={`${color?.text500} w-full`} />
                            </div> :
                            <div className={`${hero?.isFrame == true && hero?.frame == 'Light' ? 'bg-gray-100' : hero?.isFrame == true && hero?.frame === 'Dark' && 'bg-gray-900'} rounded-[12px] p-4 w-1/4 hidden sm:grid`}>
                                <img src={hero?.image} className="rounded-[8px] w-full max-h-60" />
                            </div>
                    }
                </div>
            </section>
        </>

    )
}

export default Four