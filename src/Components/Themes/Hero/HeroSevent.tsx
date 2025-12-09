import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';

type Props = {
    color: ThemeColorSet;
    hero: Hero | null
}

const HeroSevent = ({ color, hero }: Props) => {
    return (
        <section className={`${color?.bg600} rounded-xl shadow-lg p-6 sm:p-10 mb-12 relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
                    {hero?.sub_title}
                </h2>
                <p className={`${color?.text200} text-lg mb-6 max-w-2xl`}>
                    {hero?.description}
                </p>
                <button className={`bg-white ${color?.text600} font-bold py-3 px-6 rounded-full shadow-lg hover:bg-gray-50 transition duration-300`}>
                    {hero?.cta}
                </button>
            </div>
        </section>
    )
}

export default HeroSevent