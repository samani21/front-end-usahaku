import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import { ResCategorie } from '@/Types/Product/CategorieState';
import { ArrowUpRight } from 'lucide-react';

type Props = {
    color: ThemeColorSet;
    categories: ResCategorie[];
    isDarkMode: boolean;
}

const Elevent = ({ color, categories, isDarkMode }: Props) => {
    return (
        <section>
            <div className="flex flex-wrap justify-center gap-12">
                {categories.map((cat, i) => (
                    <div key={i} className="bg-white p-4 pb-10 shadow-xl rotate-[-2deg] odd:rotate-[3deg] hover:rotate-0 transition-transform cursor-pointer">
                        <div className="w-56 h-56 overflow-hidden mb-6">
                            <img src={cat.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <h3 className={`text-slate-800 font-serif text-xl font-bold italic text-center underline ${color?.decoration400} decoration-4`}>{cat.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Elevent