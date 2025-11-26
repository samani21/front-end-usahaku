import { ColorKey } from "@/lib/Types/Theme/Eight";


const getColorClass = (color: string = 'teal') => {
    const classes: Record<ColorKey, string> = {
        teal: 'bg-teal-600 hover:bg-teal-700 shadow-teal-300/50 text-teal-600 border-teal-600 hover:border-teal-300 focus:ring-teal-500',
        violet: 'bg-violet-600 hover:bg-violet-700 shadow-violet-300/50 text-violet-600 border-violet-600 hover:border-violet-300 focus:ring-violet-500',
        rose: 'bg-rose-600 hover:bg-rose-700 shadow-rose-300/50 text-rose-600 border-rose-600 hover:border-rose-300 focus:ring-rose-500',
        blue: 'bg-blue-600 hover:bg-blue-700 shadow-blue-300/50 text-blue-600 border-blue-600 hover:border-blue-300 focus:ring-blue-500',
        orange: 'bg-orange-600 hover:bg-orange-700 shadow-orange-300/50 text-orange-600 border-orange-600 hover:border-orange-300 focus:ring-orange-500',
        zinc: 'bg-zinc-600 hover:bg-zinc-700 shadow-zinc-300/50 text-zinc-600 border-zinc-600 hover:border-zinc-300 focus:ring-zinc-500',
    };

    // Jika color tidak ada, fallback ke teal
    return classes[color as ColorKey] ?? classes.teal;
};

export default getColorClass;