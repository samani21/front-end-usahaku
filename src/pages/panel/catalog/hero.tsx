import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import MainLayout from '../Layout/MainLayout'
import { ThemeColor, ThemeColorSet } from '@/lib/Types/Theme/ThemeColor'
import { Check, ChevronRight, ImageIcon, Info, Layout, Palette, Trash2, Type, Upload } from 'lucide-react'
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
import HeroConfig from '@/Components/ThemeConfig/HeroConfig'
import { Catalog, ResHero } from '@/Types/config'
import { useAlert } from '@/Context/AlertContext'
import { Post } from '@/utils/Post'
import ModalDelete from '@/Components/CRUD/ModalDelete'
import { Delete } from '@/utils/Delete'

type Props = {}

export default function HeroConfigPage() {
    const { showFinalAlert, simulateProcess } = useAlert();
    const [accentColor, setAccentColor] = useState<string>('');
    const [themeMode, setThemeMode] = useState<string>("Dark");
    const [heroLayout, setHeroLayout] = useState<number | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [frameBanner, setFrameBanner] = useState<string | null>(null);
    const [banner, setBanner] = useState<string | null>(null);
    const [isBanner, setIsBanner] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [cta, setCta] = useState<string>('');
    const [listColor, setListColor] = useState<color[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [defaultImage, setDefaultImage] = useState<boolean>(false);
    const [deleteImage, setDeleteImage] = useState<boolean>(false);
    const [heroData, setHeroData] = useState<boolean>(false);
    const [deleteData, setDeleData] = useState<ResHero | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    useEffect(() => {
        getColorTheme();
        getHero()
    }, []);

    useEffect(() => {
        // if(isHero)
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
        if (heroLayout === 4 && !heroData) {
            setDefaultImage(true)
        } else {
            setDefaultImage(false)
        }
        setAccentColor(accentColor ?? heroMap[heroLayout || 0] ?? '')
    }, [heroLayout])


    const hero = useMemo(() => {
        const dataHero: Hero = {
            title: title,
            sub_title: subtitle,
            description: desc,
            cta: cta,
            image: banner ? banner : '',
            frame: frameBanner ? frameBanner : '',
            iconDefault: defaultImage,
            color: accentColor
        }
        return dataHero
    }, [title, subtitle, desc, cta, isBanner, banner, frameBanner, defaultImage])

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

    const handleBannerUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDeleteImage(false)
        const file = e.target.files?.[0];
        if (!file) return;

        setBannerFile(file);

        const b64 = await handleFileToBase64(file);
        setBanner(b64);
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

    const getHero = async () => {
        try {
            setLoading(true);
            const res = await Get<{ success: boolean; data: Catalog }>('/catalog');
            if (res?.success) {
                setIsBanner(false);
                setDeleData(res?.data?.hero)
                setDeleteImage(true)
                setHeroLayout(res?.data?.hero?.theme)
                setAccentColor(res?.data?.hero?.color)
                if (res?.data?.hero?.frame) {
                    setIsBanner(true)
                    setFrameBanner(res?.data?.hero?.frame)
                }
                if (res?.data?.hero?.image) {
                    // setFrameBanner("Light")
                    setHeroData(true)
                    setDeleteImage(false)
                    setBanner(res?.data?.hero?.image)
                }
                if (res?.data?.hero?.title) {
                    setTitle(res?.data?.hero?.title)
                }
                if (res?.data?.hero?.subtitle) {
                    setSubtitle(res?.data?.hero?.subtitle)
                }
                if (res?.data?.hero?.desc) {
                    setDesc(res?.data?.hero?.desc)
                }
                if (res?.data?.hero?.cta) {
                    setCta(res?.data?.hero?.cta)
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
            payload.append('theme', String(heroLayout));
            payload.append('color', accentColor);
            if (bannerFile) {
                payload.append('image', bannerFile);
            }
            if (frameBanner) {
                payload.append('frame', frameBanner);
            }
            if (title != '') {
                payload.append('title', title);
            }
            if (subtitle != '') {
                payload.append('subtitle', subtitle);
            }
            if (desc != '') {
                payload.append('desc', desc);
            }
            if (cta != '') {
                payload.append('cta', cta);
            }
            payload.append('delete_image', deleteImage ? '1' : '0');

            const res = await Post(`/catalog/hero`, payload);
            if (res) {
                showFinalAlert('success', 'Berhasil', 'Atur config hero/banner berhasil');
                getHero()
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

    const onDelete = async (id: number | null) => {
        try {
            simulateProcess();

            const res = await Delete(`/catalog/hero/${id}`);
            if (res) {
                showFinalAlert('success', 'Berhasil', 'Hapus produk berhasil')
                setIsModalOpen(false);
                setHeroLayout(null)
                setBannerFile(null)
                setFrameBanner(null)
                setBanner(null)
                setIsBanner(false)
                setTitle('')
                setSubtitle('')
                setDesc('')
                setCta('')
                setDefaultImage(false)
                setDeleteImage(false)
                setHeroData(false)
                setDeleData(null)
            }
        } catch (err: any) {
            showFinalAlert(
                'error',
                'Gagal!',
                err.message
            );
            console.log(err.message || "Gagal mengambil data");
        }
    };


    return (

        loading ? <Loading /> :

            <>

                <main className='space-y-4'>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold">Pengaturan Tampilan Hero/Banner</h2>
                            <p className="text-slate-500 text-sm">Sesuaikan identitas visual katalog website Anda.</p>
                        </div>
                        <div className='space-x-4'>
                            <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm">
                                Simpan Perubahan
                            </button>
                            <button onClick={() => setIsModalOpen(true)} className="bg-rose-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition shadow-sm">
                                Hapus
                            </button>
                        </div>
                    </div>
                    {
                        heroLayout &&
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
                                {
                                    heroLayout === 4 && <>
                                        <i className='font-medium text-gray-600'>*Ini tampil saat atur hero/banner aja pilihan dark dan light ini</i>
                                        <div className="flex justify-around p-1 bg-gray-100 rounded-xl border border-gray-200 mb-4">
                                            <button
                                                onClick={() => setThemeMode("Dark")}
                                                className={`flex-1 py-2 px-2 text-sm font-semibold rounded-lg transition-colors ${themeMode === 'Dark' ? `bg-gray-600 text-white shadow-md` : 'text-slate-600'
                                                    }`}
                                            >
                                                Dark
                                            </button>
                                            <button
                                                onClick={() => setThemeMode("Light")}
                                                className={`flex-1 py-2 px-2 text-sm font-semibold rounded-lg transition-colors ${themeMode === 'Light' ? `bg-gray-600 text-white shadow-md` : 'text-slate-600'
                                                    }`}
                                            >
                                                Light
                                            </button>
                                        </div>
                                    </>
                                }
                                <HeroConfig
                                    theme={heroLayout}
                                    color={colors}
                                    themeMode={themeMode}
                                    dataHero={hero}
                                    setThemeMode={setThemeMode}
                                    deleteImage={deleteImage}
                                />
                            </div>
                        </div>
                    }
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Layout size={18} className="text-indigo-600" />
                                <h3 className="font-semibold text-slate-800">Pilih Layout Hero/Banner</h3>
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
                                    { id: 10, label: '9', mode: 'Light' },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setHeroLayout(item.id)
                                            setThemeMode(item?.mode)
                                        }}
                                        className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${heroLayout === item.id
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
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <ImageIcon size={18} className="text-indigo-600" />
                                <h3 className="font-semibold text-slate-800">Gambar Banner</h3>
                            </div>

                            <div className="flex items-center justify-between w-full my-4">
                                <h3 className='text-gray-700'>Gunakan {heroLayout === 4 ? 'icon asli banner' : "gambar banner"}</h3>
                                <div className="flex justify-around p-1 bg-gray-100 rounded-xl border border-gray-200">
                                    <button
                                        onClick={() => {
                                            setDefaultImage(true)
                                            // setFrameBanner("Light")
                                            setDeleteImage(true)
                                            setFrameBanner("Dark")
                                            setBanner(null)
                                            setBannerFile(null)
                                        }}
                                        className={`flex-1 py-2 px-2 text-sm font-semibold rounded-lg transition-colors ${defaultImage ? `bg-gray-600 text-white shadow-md` : 'text-slate-600'
                                            }`}
                                    >
                                        {heroLayout === 4 ? "Ya" : "Tidak"}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setDefaultImage(false)
                                            setDeleteImage(false)
                                        }}
                                        className={`flex-1 py-2 px-2 text-sm font-semibold rounded-lg transition-colors ${!defaultImage ? `bg-gray-600 text-white shadow-md` : 'text-slate-600'
                                            }`}
                                    >
                                        {heroLayout === 4 ? "Tidak" : "Ya"}
                                    </button>
                                </div>
                            </div>
                            {
                                !defaultImage &&
                                <>
                                    <div className="flex items-center justify-between w-full my-4">
                                        <h3 className='text-gray-700'>Gunakan Frame Banner</h3>
                                        <div className="flex justify-around p-1 bg-gray-100 rounded-xl border border-gray-200">
                                            <button
                                                onClick={() => {
                                                    setIsBanner(true)
                                                    setFrameBanner(null)
                                                }
                                                }
                                                className={`flex-1 py-2 px-2 text-sm font-semibold rounded-lg transition-colors ${isBanner ? `bg-gray-600 text-white shadow-md` : 'text-slate-600'
                                                    }`}
                                            >
                                                Ya
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsBanner(false)
                                                    setFrameBanner(null)
                                                }}
                                                className={`flex-1 py-2 px-2 text-sm font-semibold rounded-lg transition-colors ${!isBanner ? `bg-gray-600 text-white shadow-md` : 'text-slate-600'
                                                    }`}
                                            >
                                                Tidak
                                            </button>
                                        </div>
                                    </div>
                                    <div className={`${isBanner ? "flex" : "hidden"} items-center justify-between w-full my-4`}>
                                        <h3 className='text-gray-700'>Frame Logo</h3>
                                        <div className="flex justify-around p-1 bg-gray-100 rounded-xl border border-gray-200">
                                            <button
                                                onClick={() => setFrameBanner("Dark")}
                                                className={`flex-1 py-2 px-2 text-sm font-semibold rounded-lg transition-colors ${frameBanner === 'Dark' ? `bg-gray-600 text-white shadow-md` : 'text-slate-600'
                                                    }`}
                                            >
                                                Dark
                                            </button>
                                            <button
                                                onClick={() => setFrameBanner("Light")}
                                                className={`flex-1 py-2 px-2 text-sm font-semibold rounded-lg transition-colors ${frameBanner === 'Light' ? `bg-gray-600 text-white shadow-md` : 'text-slate-600'
                                                    }`}
                                            >
                                                Light
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="group relative cursor-pointer border-2 border-dashed border-slate-200 rounded-xl p-8 hover:border-indigo-400 transition-colors flex flex-col items-center gap-3"
                                    >
                                        {banner ? (
                                            <div className="relative">
                                                <img src={banner} alt="Preview" className="max-h-20 object-contain" />
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
                                            onChange={handleBannerUpload}
                                        />
                                    </div>
                                    <button onClick={() => {
                                        setDeleteImage(true)
                                        setBannerFile(null)
                                        setBanner(null)
                                    }} className='flex items-center w-full justify-center mt-4 bg-red-500 text-white hover:bg-red-700 rounded-[12px] p-2'>
                                        <Trash2 /> <span>Hapus</span>
                                    </button>
                                </>
                            }
                        </div>
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <Type size={18} className="text-indigo-600" />
                                    <h3 className="font-semibold text-slate-800">Atur Teks Banner</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                            placeholder="Contoh: Dapatkan Diskon"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Subtitle</label>
                                        <input
                                            type="text"
                                            value={subtitle}
                                            onChange={(e) => setSubtitle(e.target.value)}
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                            placeholder="Contoh: Diskon Spesial Akhir Pekan!"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Subtitle</label>
                                        <textarea
                                            value={desc}
                                            onChange={(e) => setDesc(e.target.value)}
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                            placeholder="Contoh: Nikmati potongan harga 20% untuk semua kategori produk favorit Anda. Jangan sampai terlewat!">

                                        </textarea>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Teks Tombol</label>
                                        <input
                                            type="text"
                                            value={cta}
                                            onChange={(e) => setCta(e.target.value)}
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                            placeholder="Contoh: Lihat Penaawaran"
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
                <ModalDelete
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                    }}
                    deleteData={deleteData}
                    handleDelete={onDelete} />
            </>
    )
}

HeroConfigPage.getLayout = function getLayout(page: ReactElement) {
    // Di sinilah Halaman dibungkus oleh MainLayout (dan AlertProvider di dalamnya)
    return <MainLayout>{page}</MainLayout>;
};
