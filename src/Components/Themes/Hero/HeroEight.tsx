import { Hero } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';

type Props = {
    color: ThemeColorSet;
    hero: Hero | null
}

const HeroEight = ({ color, hero }: Props) => {
    return (
        <section className={`md:flex justify-between items-center p-8 md:p-12 rounded-2xl mb-12 shadow-2xl bg-gradient-to-r ${color?.gradient}`}>
            <div>
                <p className={`text-lg font-bold mb-1`}>{hero?.title}</p>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                    {hero?.sub_title}
                </h1>
                <p className={`max-w-3xl text-lg opacity-80`}>
                    {hero?.description}
                </p>
                <button className={`mt-6 px-6 w-full md:w-auto py-3 bg-white ${color?.text600} font-semibold rounded-lg hover:bg-gray-100 transition duration-150 shadow-lg`}>
                    {hero?.cta}
                </button>
            </div>
            <div className='mt-2 md:w-100 p-4 rounded-[16px] bg-white md:mt-0'>
                <img src={hero?.image} className='rounded-[12px]'/>
            </div>
        </section>

    )
}

export default HeroEight