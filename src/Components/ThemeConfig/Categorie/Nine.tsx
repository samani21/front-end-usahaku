import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import { ResCategorie } from '@/Types/Product/CategorieState';
import { ArrowUpRight } from 'lucide-react';

type Props = {
    color: ThemeColorSet;
    categories: ResCategorie[];
    isDarkMode: boolean;
}

const Nine = ({ color, categories, isDarkMode }: Props) => {
    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((cat, i) => (
                    <div key={i} className={`relative overflow-hidden rounded-3xl flex h-48 ${isDarkMode ? 'bg-slate-900' : 'bg-white shadow-lg'}`}>
                        <div className="w-1/3 h-full">
                            <img src={cat.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="flex-1 p-8 flex flex-col justify-center">
                            {/* <span className="text-[10px] font-bold py-1 px-2 rounded bg-red-100 text-red-600 self-start mb-2 uppercase italic">Diskon 50%</span> */}
                            <h3 className="text-2xl font-black">{cat.name}</h3>
                            <p className="text-sm opacity-50 mb-4">{cat.count} produk sedang tren</p>
                            <button className={`text-sm font-bold flex items-center gap-1 ${color?.text600}`}>Buka Katalog <ArrowUpRight className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Nine