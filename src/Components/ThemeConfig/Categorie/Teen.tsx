import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import { ResCategorie } from '@/Types/Product/CategorieState';

type Props = {
    color: ThemeColorSet;
    categories: ResCategorie[];
    isDarkMode: boolean;
}

const Teen = ({ color, categories, isDarkMode }: Props) => {
    return (
        <section>
            <div className="flex flex-col gap-4">
                {categories.map((cat, i) => (
                    <div key={i} className={`group relative overflow-hidden py-6 border-b ${isDarkMode ? "border-slate-800" : " border-slate-200"}`}>
                        <div className="flex items-center justify-between relative z-10">
                            <h2 className={`text-4xl md:text-7xl font-bold ${isDarkMode ? "text-gray-100" : "text-gray-700"} uppercase tracking-tighter group-hover:italic transition-all`}>{cat.name}</h2>
                            <div className="hidden md:block w-32 h-20 rounded-xl overflow-hidden scale-0 group-hover:scale-100 transition-transform duration-500">
                                <img src={cat.image} className="w-full h-full object-cover" alt="" />
                            </div>
                            <span className="text-xl font-mono">{cat.count}</span>
                        </div>
                        <div className={`absolute inset-0 bg-current opacity-0 group-hover:opacity-5 transition-opacity ${color?.text600}`} />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Teen