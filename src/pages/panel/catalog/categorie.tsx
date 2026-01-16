import React, { ReactElement, useEffect, useMemo, useState } from 'react'
import MainLayout from '../Layout/MainLayout'
import { ThemeColor, ThemeColorSet } from '@/lib/Types/Theme/ThemeColor'
import { Check, ChevronRight, Layout, Palette } from 'lucide-react'
import { Get } from '@/utils/Get'
import { color } from '@/lib/Types/Theme/theme'
import Loading from '@/Components/component/Loading'
import CategorieConfig from '@/Components/ThemeConfig/CategorieConfig'
import { useRouter } from 'next/router'
import { ResCategorie } from '@/lib/Types/Product/CategorieState'
import { Post } from '@/utils/Post'
import { useAlert } from '@/Context/AlertContext'
import { Catalog } from '@/Types/config'

export default function CategoriePage() {
    const { showFinalAlert, simulateProcess } = useAlert();
    const [accentColor, setAccentColor] = useState<string>('');
    const [themeMode, setThemeMode] = useState<string>("Dark");
    const [categorieLayout, setCategorieLayout] = useState<number | null>(null);
    const [listColor, setListColor] = useState<color[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [categorie, setCategorie] = useState<ResCategorie[]>([]);
    const [frameIcon, setFrameIcon] = useState<'Light' | 'Dark' | null>(null)
    const router = useRouter();
    useEffect(() => {
        getCategorie()
        getColorTheme();
        fetchCategorie();
    }, []);


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

    const fetchCategorie = async () => {
        try {
            setLoading(true)
            const res = await Get<{ success: boolean; data: ResCategorie[] }>(
                `/categorie?limit=10000`
            );

            if (res?.success) {
                setCategorie(res?.data)
                setLoading(false)
            }
        } catch (err: any) {
            setLoading(false)
        }
        setLoading(false)
    };

    const getCategorie = async () => {
        try {
            setLoading(true);
            const res = await Get<{ success: boolean; data: Catalog }>('/catalog');

            if (res?.success) {
                setCategorieLayout(res?.data?.categorie?.theme)
                setAccentColor(res?.data?.categorie?.color)
                if (res?.data?.categorie?.frame) {
                    setFrameIcon(res?.data?.categorie?.frame ?? null)
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            simulateProcess();

            const payload = new FormData();
            payload.append('theme', String(categorieLayout));
            payload.append('color', accentColor);

            if (frameIcon != null) {
                payload.append('frame', frameIcon);
            }

            const res = await Post(`/catalog/categorie`, payload);
            if (res) {
                showFinalAlert('success', 'Berhasil', 'Atur config kategori berhasil')
            }
        } catch (err: any) {
            showFinalAlert(
                'error',
                'Gagal!',
                err.message
            );
            console.log(err.message || "Gagal mengambil data");
        }
    }


    return (

        loading ? <Loading /> :
            <main className='relative space-y-4'>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold">Pengaturan Tampilan Kategori</h2>
                        <p className="text-slate-500 text-sm">Sesuaikan identitas visual katalog website Anda.</p>
                    </div>
                    <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm">
                        Simpan Perubahan
                    </button>
                </div>
                {
                    categorieLayout &&
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
                            <CategorieConfig
                                theme={categorieLayout}
                                color={colors}
                                themeMode={themeMode}
                                setThemeMode={setThemeMode}
                                categorie={categorie}
                                frameIcon={frameIcon}
                            />
                        </div>
                    </div>
                }
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Layout size={18} className="text-indigo-600" />
                            <h3 className="font-semibold text-slate-800">Pilih Layout Kategori</h3>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-3">
                            {[
                                { id: 1, label: '1', mode: 'Dark' },
                                { id: 2, label: '2', mode: 'Light' },
                                { id: 3, label: '3', mode: 'Light' },
                                { id: 4, label: '4', mode: 'Dark' },
                                { id: 5, label: '5', mode: 'Light' },
                                { id: 6, label: '6', mode: 'Light' },
                                { id: 8, label: '7', mode: 'Light' },
                                { id: 9, label: '8', mode: 'Light' },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setCategorieLayout(item.id)
                                        setThemeMode(item?.mode)
                                    }}
                                    className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${categorieLayout === item.id
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
                        <div className="flex items-center justify-between w-full">
                            <h3 className='text-gray-700'>Frame Logo</h3>
                            <div className="flex justify-around p-1 bg-gray-100 rounded-xl border border-gray-200">
                                <button
                                    onClick={() => setFrameIcon("Dark")}
                                    className={`flex-1 py-2 px-2 text-sm font-semibold rounded-lg transition-colors ${frameIcon === 'Dark' ? `bg-gray-600 text-white shadow-md` : 'text-slate-600'
                                        }`}
                                >
                                    Dark
                                </button>
                                <button
                                    onClick={() => setFrameIcon("Light")}
                                    className={`flex-1 py-2 px-2 text-sm font-semibold rounded-lg transition-colors ${frameIcon === 'Light' ? `bg-gray-600 text-white shadow-md` : 'text-slate-600'
                                        }`}
                                >
                                    Light
                                </button>
                                <button
                                    onClick={() => setFrameIcon(null)}
                                    className={`flex-1 py-2 px-2 text-sm font-semibold rounded-lg transition-colors ${frameIcon === null ? `bg-gray-600 text-white shadow-md` : 'text-slate-600'
                                        }`}
                                >
                                    Polos
                                </button>
                            </div>
                        </div>
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
                {
                    categorie?.length < 1 &&
                    <div className='absolute top-0 h-full flex items-center justify-center rounded-[12px] bg-black/40 w-full'>
                        <div className='bg-gray-100 w-lg p-4 rounded-[8px]'>
                            <p className='font-[400] text-[18px] text-gray-600 text-center'>Buat kategori produk anda terlebih dahulu.</p>
                            <p className='font-[400] text-[18px] text-gray-600 text-center'>Klik tombol dibawah ini untuk ke halaman kategori produk</p>
                            <div className='flex items-center justify-center w-full pt-4'>
                                <button onClick={() => router?.push('/panel/product/categorie')} className='bg-sky-700 text-white py-2 px-8 rounded-[6px] hover:bg-sky-500 hover:text-gray-900 font-semibold'>
                                    Atur Kategori
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </main>
    )
}


CategoriePage.getLayout = function getLayout(page: ReactElement) {
    // Di sinilah Halaman dibungkus oleh MainLayout (dan AlertProvider di dalamnya)
    return <MainLayout>{page}</MainLayout>;
};