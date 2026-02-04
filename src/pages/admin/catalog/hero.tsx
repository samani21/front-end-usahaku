import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import MainLayout from '../Layout/MainLayout';
import { Get } from '@/utils/Get';
import { color } from '@/lib/Theme/theme';
import { ThemeColor, ThemeColorSet } from '@/lib/Theme/ThemeColor';
import { Check, Circle, CircleCheckBigIcon, Moon, Sun, Upload } from 'lucide-react';
import Loading from '@/Components/component/Loading';
import HeroConfig from '@/Components/ThemeConfig/Hero';
import { useAlert } from '@/Context/AlertContext';
import { Post } from '@/utils/Post';
import { Catalog } from '@/Types/config';


const listHeader = [
    { id: 1, name: "Classic Split" },
    { id: 2, name: "Modern Floating Card" },
    { id: 3, name: "Modern Floating Card" },
    { id: 4, name: "Rustic Coffee" },
    { id: 5, name: "Cyber Tech" },
    { id: 6, name: "Vibrant Foodie" },
    { id: 7, name: "Elegant Property" },
    { id: 8, name: "Classic Barber" },
    { id: 9, name: "Industrial Service" },
    { id: 10, name: "Soft Laundry" },
    { id: 11, name: "Playful Pet" },
    { id: 12, name: "Music Dynamic" },
    { id: 13, name: "Fine Tailor" },
    { id: 14, name: "Typo Hero" },
    { id: 15, name: "Library Grid" },
]

export default function HeroPage() {
    const { showFinalAlert, simulateProcess } = useAlert();
    const [heroLayout, setHeroLayout] = useState<number>();

    const [title, setTitle] = useState("Rekomendasi Hari Ini");
    const [headline, setHeadline] = useState("PRODUK TERBAIK KAMI");
    const [subHeadline, setSubHeadline] = useState("Kualitas premium dengan harga yang sangat terjangkau khusus untuk Anda.");
    const [ctaText, setCtaText] = useState("Pesan Sekarang");
    const [accentColor, setAccentColor] = useState("zinc");
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [listColor, setListColor] = useState<color[]>();

    const [heroFile, setHeroFile] = useState<File | null>(null);
    const [imageHero, setImageHero] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        getColorTheme();
        getCalog();
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
        setHeroFile(file);
        const b64 = await handleFileToBase64(file);
        setImageHero(b64);
    };

    const colors = useMemo(() => {
        if (accentColor in ThemeColor) {
            return ThemeColor[accentColor as keyof typeof ThemeColor]
        }
        return ThemeColor.orange
    }, [accentColor]);

    const handleSubmit = async () => {
        try {
            simulateProcess();
            const formData = new FormData();
            formData.append('theme', String(heroLayout));
            formData.append('color', accentColor);
            formData.append('title', title);
            formData.append('subtitle', headline);
            formData.append('desc', subHeadline);
            formData.append('cta', ctaText);
            if (heroFile) {
                formData.append('image', heroFile);
            }
            const res = await Post(`/catalog/hero`, formData);
            if (res) {
                showFinalAlert('success', 'Berhasil', 'Berhasil atur hero atau banner')
            }
        } catch (err: any) {
            showFinalAlert(
                'error',
                'Gagal Koneksi!',
                err.message
            );
            console.log(err.message || "Gagal mengambil data");
        }
    };

    const getCalog = async () => {
        try {
            setLoading(true);
            const res = await Get<{ success: boolean; data: Catalog }>('/catalog');

            if (res?.success) {
                if (res?.data?.hero?.image) {
                    setImageHero(res?.data?.hero?.image);
                }
                if (res?.data?.hero?.title) {
                    setTitle(res?.data?.hero?.title);
                }
                if (res?.data?.hero?.subtitle) {
                    setHeadline(res?.data?.hero?.subtitle);
                }
                if (res?.data?.hero?.desc) {
                    setSubHeadline(res?.data?.hero?.desc);
                }
                if (res?.data?.hero?.cta) {
                    setCtaText(res?.data?.hero?.cta);
                }

                setHeroLayout(res?.data?.hero?.theme);
                setAccentColor(res?.data?.hero?.color);
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        loading ? <Loading /> :
            <div className='relative z-1'>
                <div className={`sm:sticky z-100 top-0 border-b border-gray-300 p-4 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
                    <div className="w-full mx-auto">
                        <div className="sm:flex items-start gap-4">
                            <div className="sm:w-1/2 space-y-1">
                                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Teks Hero</label>
                                <div className="w-full space-y-2">
                                    <input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full p-2 text-sm rounded-lg border-gray-300 border focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Headline Utama"
                                    />
                                    <input
                                        value={headline}
                                        onChange={(e) => setHeadline(e.target.value.toUpperCase())}
                                        className="w-full p-2 text-sm rounded-lg border-gray-300 border focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Headline Utama"
                                    />
                                    <textarea
                                        value={subHeadline}
                                        onChange={(e) => setSubHeadline(e.target.value)}
                                        className="w-full p-2 text-sm rounded-lg border-gray-300 border h-16 outline-none"
                                        placeholder="Sub-headline deskripsi..."
                                    />
                                </div>
                            </div>

                            <div>
                                <div className='sm:pt-6'>
                                    <input
                                        value={ctaText}
                                        onChange={(e) => setCtaText(e.target.value)}
                                        className="w-full p-2 text-sm rounded-lg border border-gray-300 outline-none"
                                        placeholder="Teks Tombol"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-gray-500">Gambar</label>
                                    <div className='flex items-center gap-4'>
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`flex items-center gap-2 p-2 text-sm bg-gray-300 hover:bg-gray-500 rounded-md transition-colors text-gray-900`}
                                        >
                                            <Upload className="w-4 h-4" /> {imageHero ? "Ganti" : "Upload"}
                                        </button>

                                        <button
                                            onClick={() => setIsDarkMode(!isDarkMode)}
                                            className={`p-2 ${isDarkMode ? "bg-slate-800" : "bg-slate-200"} rounded-lg transition-colors`}
                                        >
                                            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            className="flex mb-1 items-center gap-2 p-2 text-sm bg-blue-600 text-white font-semibold hover:bg-blue-800 rounded-md transition-colors"
                                        >
                                            <Check className="w-4 h-4" /> Simpan Perubahan
                                        </button>
                                    </div>

                                    <p className="text-[10px] text-slate-400 italic text-center">Gunakan gambar landscape untuk hasil terbaik.</p>
                                    <input type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleLogoUpload} />
                                </div>
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

                    </div>
                </div>
                <div className={`py-12 space-y-24 px-2 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
                    {
                        listHeader?.map((lh, i) => (
                            <div className='relative space-y-4'>
                                {
                                    heroLayout === lh?.id ?
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <CircleCheckBigIcon />
                                            <label className="text-[12px] font-bold uppercase tracking-[0.3em] text-slate-500 block">{lh?.id}. {lh?.name}</label>
                                        </div> :
                                        <div className='flex items-center gap-2 cursor-pointer' onClick={() => setHeroLayout(lh?.id)}>
                                            <Circle />
                                            <label className="text-[12px] font-bold uppercase tracking-[0.3em] text-slate-500 block">{lh?.id}. {lh?.name}</label>
                                        </div>
                                }
                                <HeroConfig
                                    theme={lh?.id}
                                    color={colors}
                                    isDarkMode={isDarkMode}
                                    headline={headline}
                                    subHeadline={subHeadline}
                                    ctaText={ctaText}
                                    imageHero={imageHero}
                                    title={title} />
                            </div>
                        ))
                    }

                </div>
            </div>
    )
}

HeroPage.getLayout = function getLayout(page: ReactElement) {
    // Di sinilah Halaman dibungkus oleh MainLayout (dan AlertProvider di dalamnya)
    return <MainLayout>{page}</MainLayout>;
};
