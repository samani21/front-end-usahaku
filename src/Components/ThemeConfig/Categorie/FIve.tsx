import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import { ResCategorie } from '@/Types/Product/CategorieState';

type Props = {
    color: ThemeColorSet;
    categories: ResCategorie[];
    isDarkMode: boolean;
}

const Five = ({ color, categories, isDarkMode }: Props) => {
    return (
        <section>
            <div className="flex flex-wrap gap-4">
                {categories.map((cat, i) => (
                    <button key={i} className={`flex items-center gap-3 px-6 py-3 rounded-full font-bold transition-all border-2 ${isDarkMode ? `border-slate-800 ${color?.hoverBorder500}` : `border-slate-200 ${color?.hoverBorder700}`}`}>
                        <img src={cat?.image} className={`w-[32px] rounded-full h-[32px] object-cover ${isDarkMode && "bg-white"}`} />
                        {cat.name}
                    </button>
                ))}
                <button className="flex items-center gap-3 px-6 py-3 rounded-full font-bold bg-black text-white">Lihat Semua</button>
            </div>
        </section>
    )
}

export default Five