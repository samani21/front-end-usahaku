import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';

type Props = {
    color: ThemeColorSet;
    hero: Hero | null
}

const HeroEight = ({ color, hero }: Props) => {
    return (
        <section className={`${color?.bg600} rounded-xl shadow-lg p-6 sm:p-10 mb-12 relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className=" flex flex-col md:flex-row items-center justify-between">
                <div className=" mb-6 md:mb-0 w-full">
                    <h4 className="text-md sm:text-lg font-extrabold leading-tight text-white">
                        {hero?.title}
                    </h4>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
                        {hero?.sub_title}
                    </h2>
                    <p className={`${color?.text200} text-lg mb-6 max-w-2xl`}>
                        {hero?.description}
                    </p>
                    {
                        hero?.cta &&
                        <button className={`bg-white ${color?.text600} font-bold py-3 px-6 rounded-full shadow-lg hover:bg-gray-50 transition duration-300`}>
                            {hero?.cta}
                        </button>
                    }
                </div>
                {
                    hero?.image &&
                    <div className={`${hero?.isFrame && hero?.frame === 'Light' ? 'bg-gray-100' : hero?.isFrame && hero?.frame === 'Dark' && 'bg-gray-900'} p-1 rounded-[12px] w-1/3  hidden sm:grid`}>
                        <img src={hero?.image} className="rounded-[8px] shadow-xl w-full" />
                    </div>
                }
            </div>
        </section>

    )
}

export default HeroEight