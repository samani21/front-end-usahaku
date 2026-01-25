import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import { ResCategorie } from '@/Types/Product/CategorieState';

type Props = {
    color: ThemeColorSet;
    categories: ResCategorie[];
    isDarkMode: boolean;
}

const Fiften = ({ categories, isDarkMode, color }: Props) => {
    return (
        <section>
            <div className="flex flex-col md:flex-row gap-4 h-[400px]">
                {categories.map((cat, i) => (
                    <div key={i} className="flex-1 group relative overflow-hidden rounded-3xl transition-all duration-700 hover:flex-[3]">
                        <img src={cat.image} className="absolute inset-0 w-full h-full object-cover" alt="" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center group-hover:rotate-0 rotate-[-90deg] md:rotate-[-90deg] md:group-hover:rotate-0 transition-all duration-500">
                                <h3 className="text-white text-2xl md:text-4xl font-black uppercase whitespace-nowrap">{cat.name}</h3>
                                <p className="text-white/0 group-hover:text-white/60 transition-opacity mt-2">{cat.count}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Fiften