import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import { ResCategorie } from '@/Types/Product/CategorieState';
import { ArrowUpRight } from 'lucide-react';

type Props = {
    color: ThemeColorSet;
    categories: ResCategorie[];
    isDarkMode: boolean;
}

const Twelve = ({ categories, isDarkMode }: Props) => {
    return (
        <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((cat, i) => (
                    <div key={i} className="relative aspect-square rounded-[2rem] overflow-hidden group">
                        <img src={cat.image} className={`absolute inset-0 w-full h-72 ${isDarkMode && "bg-white"} object-cover opacity-50`} alt="" />
                        <div className="absolute inset-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 flex flex-col items-center justify-start gap-4 text-center">
                            <img src={cat?.image} className='h-[80%] w-full w-full object-cover' />
                            <div className='bg-black/10 w-full p-2'>
                                <h3 className="text-white font-bold text-sm leading-tight">{cat.name}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Twelve