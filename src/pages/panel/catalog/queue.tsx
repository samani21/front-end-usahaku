import React, { useEffect, useMemo, useState } from 'react'
import MainLayout from '../Layout/MainLayout'
import { ThemeColor, ThemeColorSet } from '@/lib/Types/Theme/ThemeColor'
import { Check, ChevronRight, Layout, Palette, } from 'lucide-react'
import { Get } from '@/utils/Get'
import { color, Hero } from '@/lib/Types/Theme/theme'
import Loading from '@/Components/component/Loading'
import { DUMMY_HERO_ONE } from '@/hooks/Theme/ProductOne'
import { DUMMY_HERO_TWO } from '@/hooks/Theme/ProductTwo'
import { DUMMY_HERO_THREE } from '@/hooks/Theme/ProductThree'
import { DUMMY_HERO_FOUR } from '@/hooks/Theme/ProductFour'
import { DUMMY_HERO_FIVE } from '@/hooks/Theme/ProductFive'
import { DUMMY_HERO_SIX } from '@/hooks/Theme/ProductSix'
import { DUMMY_HERO_SEVENT } from '@/hooks/Theme/ProductSevent'
import { DUMMY_HERO_EIGHT } from '@/hooks/Theme/ProductEight'
import { DUMMY_HERO_TEN } from '@/hooks/Theme/ProductTen'
import QueueConfig from '@/Components/ThemeConfig/QueueConfig'

type Props = {}

const QueuePage = (props: Props) => {
    const [accentColor, setAccentColor] = useState<string>('');
    const [queueLayout, setQueue] = useState<number | null>(null);
    const [listColor, setListColor] = useState<color[]>();
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        getColorTheme();
    }, []);

    useEffect(() => {
        const heroMap: Record<number, string> = {
            1: DUMMY_HERO_ONE?.color,
            2: DUMMY_HERO_TWO?.color,
            3: DUMMY_HERO_THREE?.color,
            4: DUMMY_HERO_FOUR?.color,
            5: DUMMY_HERO_FIVE?.color,
            6: DUMMY_HERO_SIX?.color,
            7: DUMMY_HERO_SEVENT?.color,
            8: DUMMY_HERO_EIGHT?.color,
            10: DUMMY_HERO_TEN?.color,
        }

        setAccentColor(heroMap[queueLayout || 0] ?? '')
    }, [queueLayout])

    const colors = useMemo(() => {
        if (accentColor in ThemeColor) {
            return ThemeColor[accentColor as keyof typeof ThemeColor]
        }
        return ThemeColor.orange
    }, [accentColor]);

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


    return (

        loading ? <Loading /> :
            <MainLayout>
                <main className='space-y-4'>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold">Pengaturan Tampilan Antrian</h2>
                            <p className="text-slate-500 text-sm">Sesuaikan identitas visual katalog website Anda.</p>
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm">
                            Simpan Perubahan
                        </button>
                    </div>
                    {
                        queueLayout &&
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <span className="text-xs text-slate-400 font-medium ml-2">Live Preview - Website Anda</span>
                            </div>
                            <div className="bg-slate-50 min-h-[150px] p-4">
                                <QueueConfig
                                    theme={queueLayout}
                                    color={colors}
                                />
                            </div>
                        </div>
                    }
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Layout size={18} className="text-indigo-600" />
                                <h3 className="font-semibold text-slate-800">Pilih Layout Antrian</h3>
                            </div>
                            <div className="grid sm:grid-cols-3 gap-3">
                                {[
                                    { id: 1, label: '1', mode: 'Dark' },
                                    { id: 2, label: '2', mode: 'Light' },
                                    { id: 3, label: '3', mode: 'Light' },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setQueue(item.id)
                                        }}
                                        className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${queueLayout === item.id
                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                            : 'border-slate-100 hover:border-slate-200 bg-white text-slate-500'
                                            }`}
                                    >
                                        <div className={`w-full h-16 ${item?.mode === "Dark" ? 'bg-gray-800' : ' bg-slate-200'} rounded flex items-center justify-between px-1 gap-1`}>
                                            {/* <div className="w-3 h-3 bg-indigo-400 rounded-sm"></div>
                                            <div className="w-6 h-1 bg-slate-300 rounded-full"></div> */}
                                            <div className='grid gap-2 w-1/2'>
                                                <div className="w-6 h-1 bg-slate-300 rounded-full"></div>
                                                <div className="w-full h-1 bg-slate-300 rounded-full"></div>
                                                <div className="w-full h-1 bg-slate-300 rounded-full"></div>
                                                <div className="w-6 h-1 bg-slate-300 rounded-full"></div>
                                            </div>
                                            <div className='w-8 h-8 bg-slate-300 rounded-[4px]' />
                                        </div>
                                        <span className="text-xs font-medium">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Palette size={18} className="text-indigo-600" />
                                <h3 className="font-semibold text-slate-800">Aksen Warna Utama</h3>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {listColor?.map((colorKey, i) => {
                                    const color: ThemeColorSet = ThemeColor[colorKey?.primary];
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setAccentColor(colorKey?.primary)}
                                            className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${accentColor === colorKey?.primary
                                                ? 'border-indigo-600 bg-indigo-50 shadow-sm'
                                                : 'border-slate-100 hover:border-slate-200 bg-white'
                                                }`}
                                        >
                                            <div className={`w-6 h-6 rounded-full shadow-inner ${color?.bg600}`}></div>
                                            <span className="text-sm font-medium capitalize text-slate-700">{colorKey?.primary}</span>
                                            {accentColor === colorKey?.primary && <Check size={14} className="ml-auto text-indigo-600" />}
                                        </button>
                                    )
                                }
                                )}
                            </div>

                            <div className="mt-6 p-4 rounded-lg bg-slate-50 border border-slate-100">
                                <p className="text-xs text-slate-500 flex items-center gap-2">
                                    <ChevronRight size={14} className="text-indigo-500" />
                                    Warna ini akan diterapkan pada teks Span 1, icon keranjang, dan elemen interaktif lainnya.
                                </p>
                            </div>
                        </div>
                    </div>

                </main>
            </MainLayout>
    )
}

export default QueuePage