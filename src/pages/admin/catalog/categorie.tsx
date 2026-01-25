import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import MainLayout from '../Layout/MainLayout';
import { Get } from '@/utils/Get';
import { color } from '@/lib/Theme/theme';
import { ThemeColor, ThemeColorSet } from '@/lib/Theme/ThemeColor';
import { Circle, CircleCheckBigIcon, Coffee, Moon, ShoppingBag, Smartphone, Sun, Upload, Utensils } from 'lucide-react';
import Loading from '@/Components/component/Loading';
import HeroConfig from '@/Components/ThemeConfig/Hero';
import CategorieConfig from '@/Components/ThemeConfig/Categorie';
import { ResCategorie } from '@/Types/Product/CategorieState';


const listHeader = [
    { id: 1, name: "Modern Bento Grid" },
    { id: 2, name: "Minimalist Circles" },
    { id: 3, name: "Floating Glass Cards" },
    { id: 4, name: "Horizontal Stripes" },
    { id: 5, name: "Interactive Pills" },
    { id: 6, name: "Duotone Image Grid" },
    { id: 7, name: "Numbered Sophistication" },
    { id: 8, name: "Soft Neumorphism" },
    { id: 9, name: "Badge Cards" },
    { id: 10, name: "Typographic Focus" },
    { id: 11, name: "Vintage Polaroids" },
    { id: 12, name: "Glassmorphism Icons" },
    { id: 13, name: "Minimal Bordered" },
    { id: 14, name: "Accent Shadow Boxes" },
    { id: 15, name: "Modern Split Slides" },
]


const categories: ResCategorie[] = [
    { id: 1, name: "Kopi & Teh", count: "120 Item", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=400&auto=format&fit=crop" },
    { id: 2, name: "Fashion", count: "85 Item", image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, name: "Elektronik", count: "45 Item", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=400&auto=format&fit=crop" },
    { id: 4, name: "Kuliner", count: "210 Item", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&auto=format&fit=crop" },
    { id: 5, name: "Snack", count: "310 Item", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25hY2t8ZW58MHx8MHx8fDA%3D" },
];


export default function CategoriePage() {
    const [headerLayout, setHeaderLayout] = useState<number>();

    const [accentColor, setAccentColor] = useState("indigo");
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [listColor, setListColor] = useState<color[]>();

    useEffect(() => {
        getColorTheme();
    }, []);
    const getColorTheme = async () => {
        try {
            setLoading(true);
            const res = await Get<{ success: boolean; data: color[] }>('/colors?limit=100');

            if (res?.success) {
                setListColor(res.data);
            }
        } finally {
            setLoading(false);
        }
    };
    const colors = useMemo(() => {
        if (accentColor in ThemeColor) {
            return ThemeColor[accentColor as keyof typeof ThemeColor]
        }
        return ThemeColor.orange
    }, [accentColor]);



    return (
        loading ? <Loading /> :
            <div className='relative'>
                <div className={`sm:sticky z-100 top-0 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} p-2`}>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-gray-500">Warna Aksen</label>
                        <div className="flex gap-3 overflow-x-auto  pb-1 no-scrollbar">
                            {listColor?.map((c, i) => {
                                const color: ThemeColorSet = ThemeColor[c?.primary];
                                return (
                                    <div className='cursor-pointer' onClick={() => setAccentColor(c?.primary)}>
                                        <div className='flex items-center justify-center'>
                                            <div
                                                className={`w-6 h-6 rounded-full flex-shrink-0 border-2 ${color?.bg600} ${accentColor === c?.primary ? `${color?.border200} scale-110'` : 'border-transparent'}`} />
                                        </div>
                                        <p className={`font-semibold text-[12px] ${color?.text500}`}>{c?.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`p-2 ${isDarkMode ? "bg-slate-800" : "bg-slate-200"} rounded-lg transition-colors`}
                        >
                            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
                        </button>
                    </div>
                </div>
                <div className={`py-12 space-y-24 px-2 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
                    {
                        listHeader?.map((lh, i) => (
                            <div className='relative space-y-4'>
                                {
                                    headerLayout === lh?.id ?
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <CircleCheckBigIcon />
                                            <label className="text-[12px] font-bold uppercase tracking-[0.3em] text-slate-500 block">{lh?.id}. {lh?.name}</label>
                                        </div> :
                                        <div className='flex items-center gap-2 cursor-pointer' onClick={() => setHeaderLayout(lh?.id)}>
                                            <Circle />
                                            <label className="text-[12px] font-bold uppercase tracking-[0.3em] text-slate-500 block">{lh?.id}. {lh?.name}</label>
                                        </div>
                                }
                                <CategorieConfig
                                    theme={lh?.id}
                                    color={colors}
                                    categories={categories}
                                    isDarkMode={isDarkMode} />
                            </div>
                        ))
                    }

                </div>
            </div>
    )
}

CategoriePage.getLayout = function getLayout(page: ReactElement) {
    // Di sinilah Halaman dibungkus oleh MainLayout (dan AlertProvider di dalamnya)
    return <MainLayout>{page}</MainLayout>;
};
