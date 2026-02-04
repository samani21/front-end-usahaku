import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import { ResCategorie } from '@/Types/Product/CategorieState';

type Props = {
    color: ThemeColorSet;
    categories: ResCategorie[];
    isDarkMode: boolean;
}

const Thirteen = ({ categories, isDarkMode, color }: Props) => {
    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {categories.map((cat, i) => (
                    <div key={i} className={`p-12 border transition-colors ${color?.hoverBg50}  ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}  ${isDarkMode && 'hover:text-gray-700'}`}>
                        <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-slate-400 mb-6">Kategori {i + 1}</h3>
                        <h2 className={`text-3xl font-bold mb-8`}>{cat.name}</h2>
                        <div className="w-full h-40 rounded-lg overflow-hidden mb-8">
                            <img src={cat.image} className={`w-full h-full object-cover ${isDarkMode && "bg-white"}`} alt="" />
                        </div>
                        <button className={`flex items-center gap-2 font-bold group ${color?.text600}`}>
                            EXPLORE
                            <div className={`w-8 h-[2px] ${isDarkMode ? "bg-white" : "bg-black"} group-hover:w-16 transition-all`} />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Thirteen