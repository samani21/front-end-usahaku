import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import { ResCategorie } from '@/Types/Product/CategorieState';

type Props = {
    color: ThemeColorSet;
    categories: ResCategorie[];
    isDarkMode: boolean;
}

const Eight = ({ categories, isDarkMode }: Props) => {
    return (
        <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {categories.map((cat, i) => (
                    <div key={i} className={`relative aspect-square rounded-[2.5rem] flex flex-col items-center justify-center p-6 text-center shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] ${isDarkMode ? `bg-slate-900` : ""}`}>
                        {/* <div className={`mb-4 p-4 rounded-full ${isDarkMode ? color?.bg800 : color?.bg50} ${color?.text600}`} >{cat.icon}</div> */}
                        <img src={cat?.image} className={`absolute inset-0 w-full h-full rounded-[2.5rem] object-cover grayscale-50 ${isDarkMode && "bg-white"}`} />
                        <div className='w-full bg-black/30 absolute z-10 p-3'>
                            <h3 className="font-bold text-white">{cat.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Eight