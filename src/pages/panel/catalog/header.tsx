import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import MainLayout from '../Layout/MainLayout'
import HeaderConfig from '@/Components/ThemeConfig/HeaderConfig'
import { ThemeColor, ThemeColorSet } from '@/lib/Types/Theme/ThemeColor'
import { Check, ChevronRight, ImageIcon, Info, Layout, Palette, Trash2, Type, Upload } from 'lucide-react'
import { Get } from '@/utils/Get'
import { color } from '@/lib/Types/Theme/theme'
import Loading from '@/Components/component/Loading'
import { Post } from '@/utils/Post'
import { useAlert } from '@/Context/AlertContext'
import { Catalog } from '@/Types/config'

type Props = {}

export default function HeaderConfigPage() {
    const { showFinalAlert, simulateProcess } = useAlert();
    const [accentColor, setAccentColor] = useState<string>('orange');
    const [themeMode, setThemeMode] = useState<string>("Light");
    const [headerLayout, setHeaderLayout] = useState<number | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [frameLogo, setFrameLogo] = useState<string>('');
    const [logo, setLogo] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [span1, setSpan1] = useState<string>('Brand ');
    const [span2, setSpan2] = useState<string>('Catalog');
    const [listColor, setListColor] = useState<color[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [deleteImage, setDeleteImage] = useState<boolean>(false);
    useEffect(() => {
        getColorTheme();
        getHeader();
    }, []);

    const colors = useMemo(() => {
        if (accentColor in ThemeColor) {
            return ThemeColor[accentColor as keyof typeof ThemeColor]
        }
        return ThemeColor.orange
    }, [accentColor]);
    const handleFileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    const handleLogoUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        setDeleteImage(false)
        if (!file) return;
        setLogoFile(file);
        const b64 = await handleFileToBase64(file);
        setLogo(b64);
    };
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

    const getHeader = async () => {
        try {
            setLoading(true);
            const res = await Get<{ success: boolean; data: Catalog }>('/catalog');

            if (res?.success) {
                setHeaderLayout(res?.data?.header?.theme)
                setAccentColor(res?.data?.header?.color)
                if (res?.data?.header?.frame) {
                    setFrameLogo(res?.data?.header?.frame)
                }
                if (res?.data?.header?.logo) {
                    setLogo(res?.data?.header?.logo)
                }
                if (res?.data?.header?.span_one) {
                    setSpan1(res?.data?.header?.span_one)
                }
                if (res?.data?.header?.span_two) {
                    setSpan2(res?.data?.header?.span_two)
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
            payload.append('theme', String(headerLayout));
            payload.append('color', accentColor);
            if (logoFile) {
                payload.append('logo', logoFile);
            }
            if (frameLogo != '') {
                payload.append('frame', frameLogo);
            }
            if (span1 != '') {
                payload.append('span_one', span1);
            }
            if (span2 != '') {
                payload.append('span_two', span2);
            }
            payload.append('delete_image', deleteImage ? '1' : '0');

            const res = await Post(`/catalog/header`, payload);
            if (res) {
                showFinalAlert('success', 'Berhasil', 'Atur config header berhasil')
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
            <main className='space-y-4'>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold">Pengaturan Tampilan Header</h2>
                        <p className="text-slate-500 text-sm">Sesuaikan identitas visual katalog website Anda.</p>
                    </div>
                    <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm">
                        Simpan Perubahan
                    </button>
                </div>
                {
                    headerLayout &&
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <span className="text-xs text-slate-400 font-medium ml-2">Live Preview - Website Anda</span>
                        </div>
                        <div className={`${themeMode === "Dark" ? "bg-gray-900" : "bg-slate-50"} relative h-[100vh]`}>
                            <HeaderConfig theme={headerLayout} color={colors} themeMode={themeMode} logo={logo} span1={span1}
                                span2={span2} setThemeMode={setThemeMode} frameLogo={frameLogo} />
                        </div>
                    </div>
                }

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Layout size={18} className="text-indigo-600" />
                            <h3 className="font-semibold text-slate-800">Pilih Layout Header</h3>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-3">
                            {[
                                { id: 1, label: '1', mode: 'Dark' },
                                { id: 2, label: '2', mode: 'Light' },
                                { id: 3, label: '3', mode: 'Light' },
                                { id: 4, label: '4', mode: 'Dark' },
                                { id: 5, label: '5', mode: 'Light' },
                                { id: 6, label: '6', mode: 'Light' },
                                { id: 7, label: '7', mode: 'Light' },
                                { id: 8, label: '8', mode: 'Light' },
                                { id: 9, label: '9', mode: 'Light' },
                                { id: 10, label: '10', mode: 'Light' },
                                { id: 11, label: '11', mode: 'Light' },
                                { id: 12, label: '12', mode: 'Light' },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setHeaderLayout(item.id)
                                        setThemeMode(item?.mode)
                                    }}
                                    className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${headerLayout === item.id
                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                        : 'border-slate-100 hover:border-slate-200 bg-white text-slate-500'
                                        }`}
                                >
                                    <div className={`w-full h-8 ${item?.mode === "Dark" ? 'bg-gray-800' : ' bg-slate-200'} rounded flex items-center px-1 gap-1`}>
                                        <div className="w-3 h-3 bg-indigo-400 rounded-sm"></div>
                                        <div className="w-6 h-1 bg-slate-300 rounded-full"></div>
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
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <ImageIcon size={18} className="text-indigo-600" />
                            <h3 className="font-semibold text-slate-800">Logo Website</h3>
                        </div>

                        <div className="flex items-center justify-between w-full my-4">
                            <h3 className='text-gray-700'>Frame Logo</h3>
                            <div className="flex justify-around p-1 bg-gray-100 rounded-xl border border-gray-200">
                                <button
                                    onClick={() => setFrameLogo("Dark")}
                                    className={`flex-1 py-2 px-2 text-sm font-semibold rounded-lg transition-colors ${frameLogo === 'Dark' ? `bg-gray-600 text-white shadow-md` : 'text-slate-600'
                                        }`}
                                >
                                    Dark
                                </button>
                                <button
                                    onClick={() => setFrameLogo("Light")}
                                    className={`flex-1 py-2 px-2 text-sm font-semibold rounded-lg transition-colors ${frameLogo === 'Light' ? `bg-gray-600 text-white shadow-md` : 'text-slate-600'
                                        }`}
                                >
                                    Light
                                </button>
                                <button
                                    onClick={() => setFrameLogo("")}
                                    className={`flex-1 py-2 px-2 text-sm font-semibold rounded-lg transition-colors ${frameLogo === '' ? `bg-gray-600 text-white shadow-md` : 'text-slate-600'
                                        }`}
                                >
                                    Polos
                                </button>
                            </div>
                        </div>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="group relative cursor-pointer border-2 border-dashed border-slate-200 rounded-xl p-8 hover:border-indigo-400 transition-colors flex flex-col items-center gap-3"
                        >
                            {logo ? (
                                <div className="relative">
                                    <img src={logo} alt="Preview" className="max-h-20 object-contain" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded text-white text-xs font-medium">
                                        Ganti Logo
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full group-hover:scale-110 transition-transform">
                                        <Upload size={24} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-slate-700">Klik untuk upload logo</p>
                                        <p className="text-xs text-slate-400 mt-1">PNG, JPG atau SVG (Maks. 2MB)</p>
                                    </div>
                                </>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleLogoUpload}
                            />
                        </div>
                        <button onClick={() => {
                            setDeleteImage(true)
                            setLogoFile(null)
                            setLogo(null)
                        }} className='flex items-center w-full justify-center mt-4 bg-red-500 text-white hover:bg-red-700 rounded-[12px] p-2'>
                            <Trash2 /> <span>Hapus</span>
                        </button>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Type size={18} className="text-indigo-600" />
                                <h3 className="font-semibold text-slate-800">Nama Brand / Judul</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Span 1</label>
                                    <input
                                        type="text"
                                        value={span1}
                                        onChange={(e) => setSpan1(e.target.value)}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                        placeholder="Contoh: Toko"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Span 2</label>
                                    <input
                                        type="text"
                                        value={span2}
                                        onChange={(e) => setSpan2(e.target.value)}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                        placeholder="Contoh: Kami"
                                    />
                                </div>
                            </div>
                            <div className='flex items-center gap-1 mt-1'>
                                <Info className='text-zinc-700' size={12} />
                                <i className='text-zinc-700 text-[12px]'>Jika ingin ada jarak antara nama brand ny maka kasih spasi di salah satu inputan</i>
                            </div>
                        </div>
                    </div>

                </div>

            </main>
    )
}

HeaderConfigPage.getLayout = function getLayout(page: ReactElement) {
    // Di sinilah Halaman dibungkus oleh MainLayout (dan AlertProvider di dalamnya)
    return <MainLayout>{page}</MainLayout>;
};
