import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import { ResCategorie } from '@/Types/Product/CategorieState';

type Props = {
    color: ThemeColorSet;
    categories: ResCategorie[];
    isDarkMode: boolean;
}

const FourTen = ({ categories, isDarkMode, color }: Props) => {
    return (
        <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {categories.map((cat, i) => (
                    <div key={i} className="relative group">
                        <div className={`absolute inset-0 rounded-2xl translate-x-3 translate-y-3 opacity-20 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform ${color?.bg600}`} />
                        <div className={`relative p-8 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-900 shadow-sm group-hover:shadow-none'}`}>
                            <img src={cat?.image} className={`absolute inset-0 w-full h-full object-cover rounded-2xl z-10 top-0 ${isDarkMode && 'bg-white'}`} />
                            <div className={`w-full bg-black/50 absolute z-11 text-left text-gray-100 px-2`}>
                                <h3 className="font-black uppercase italic tracking-tighter text-xl">{cat.name}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FourTen