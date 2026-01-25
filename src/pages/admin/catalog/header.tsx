import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import MainLayout from '../Layout/MainLayout';
import { Get } from '@/utils/Get';
import { color } from '@/lib/Theme/theme';
import { ThemeColor, ThemeColorSet } from '@/lib/Theme/ThemeColor';
import { Circle, CircleCheckBigIcon, Upload } from 'lucide-react';
import HeroConfig from '@/Components/ThemeConfig/Header';
import Loading from '@/Components/component/Loading';


const listHeader = [
    { id: 1, name: "Header Satu" },
    { id: 2, name: "Header Dua" },
    { id: 3, name: "Header Tiga" },
    { id: 4, name: "Header Empat" },
    { id: 5, name: "Header Lima" },
    { id: 6, name: "Header Enam" },
    { id: 7, name: "Header Tujuh" },
    { id: 8, name: "Header Delapan" },
    { id: 9, name: "Header Sembilan" },
    { id: 10, name: "Header Sepuluh" },
    { id: 11, name: "Header Sebelas" },
    { id: 12, name: "Header Dua belas" },
    { id: 13, name: "Header Tiga Belas" },
    { id: 14, name: "Header Empat Belas" },
    { id: 15, name: "Header Lima Belas" },
]

export default function HeaderPage() {
    const [headerLayout, setHeaderLayout] = useState<number>();

    const [spanOne, setSpanOne] = useState<string>("NAMA");
    const [spanTwo, setSpanTwo] = useState<string>("USAHA");
    const [accentColor, setAccentColor] = useState<string>("blue"); // tailwind color name
    const [frameType, setFrameType] = useState<"circle" | "square" | "none">("none"); // circle, square, none
    const [frameTheme, setFrameTheme] = useState<"dark" | "light">("dark"); // dark, light
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [themeDark, setThemeDark] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [listColor, setListColor] = useState<color[]>();

    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logo, setLogo] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

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
        if (!file) return;
        setLogoFile(file);
        const b64 = await handleFileToBase64(file);
        setLogo(b64);
    };

    const colors = useMemo(() => {
        if (accentColor in ThemeColor) {
            return ThemeColor[accentColor as keyof typeof ThemeColor]
        }
        return ThemeColor.orange
    }, [accentColor]);



    return (
        loading ? <Loading /> :
            <div>
                <div className={`border-b border-gray-300`}>
                    <div className="w-full mx-auto space-y-4">
                        <div className="flex flex-wrap gap-4 items-end">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-gray-500">Nama Usaha (2 Span)</label>
                                <div className="flex gap-2">
                                    <input
                                        value={spanOne}
                                        onChange={(e) => setSpanOne(e.target.value.toUpperCase())}
                                        placeholder="Span 1"
                                        className="w-1/2 p-2 text-sm rounded-lg border border-gray-300"
                                    />
                                    <input
                                        value={spanTwo}
                                        onChange={(e) => setSpanTwo(e.target.value.toUpperCase())}
                                        placeholder="Span 2"
                                        className="w-1/2 p-2 text-sm rounded-lg border border-gray-300"
                                    />
                                </div>
                            </div>

                            {/* Upload Logo */}
                            <div className="space-y-1" onClick={() => fileInputRef.current?.click()}>
                                <label className="text-[10px] font-bold uppercase text-gray-500">Logo</label>
                                <button

                                    className="flex items-center gap-2 p-2 text-sm bg-gray-300 hover:bg-gray-500 rounded-md transition-colors"
                                >
                                    <Upload className="w-4 h-4" /> {logo ? "Ganti" : "Upload"}
                                </button>
                                <input type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleLogoUpload} />
                            </div>
                        </div>
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
                        </div>
                        {/* Pengaturan Frame */}
                        <div className="flex flex-wrap gap-6 border-t border-gray-300 py-3  ">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold uppercase text-gray-500">Tipe Frame:</span>
                                {['circle', 'square', 'none'].map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setFrameType(t as "circle" | "square" | "none")}
                                        className={`text-xs px-3 py-1 rounded-full border transition-all ${frameType === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-300  border-transparent'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold uppercase text-gray-500">Tema Frame:</span>
                                {['dark', 'light'].map(th => (
                                    <button
                                        key={th}
                                        onClick={() => setFrameTheme(th as "dark" | "light")}
                                        className={`text-xs px-3 py-1 rounded-full border transition-all ${frameTheme === th ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-300  border-transparent'}`}
                                    >
                                        {th}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`space-y-4 mt-4 p-4 ${themeDark ? "bg-slate-900 " : "bg-slate-100"}`}>
                    {
                        listHeader?.map((lh, i) => (
                            <div className='relative space-y-4'>
                                {
                                    headerLayout === lh?.id ?
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <CircleCheckBigIcon />
                                            <p className='font-semibold text-gray-600'>{lh?.name}</p>
                                        </div> :
                                        <div className='flex items-center gap-2 cursor-pointer' onClick={() => setHeaderLayout(lh?.id)}>
                                            <Circle />
                                            <p className='font-semibold text-gray-600'>{lh?.name}</p>
                                        </div>
                                }
                                <HeroConfig
                                    isBuild={true}
                                    key={i}
                                    theme={lh?.id}
                                    color={colors}
                                    themeMode={themeDark ? "dark" : "light"}
                                    spanOne={spanOne}
                                    spanTwo={spanTwo}
                                    setSidebarOpen={setSidebarOpen}
                                    toggleTheme={() => setThemeDark(!themeDark)}
                                    frameType={frameType}
                                    frameTheme={frameTheme}
                                    logoImage={logo} />
                            </div>
                        ))
                    }
                </div>
            </div>
    )
}

HeaderPage.getLayout = function getLayout(page: ReactElement) {
    // Di sinilah Halaman dibungkus oleh MainLayout (dan AlertProvider di dalamnya)
    return <MainLayout>{page}</MainLayout>;
};
