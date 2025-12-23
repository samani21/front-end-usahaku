import React, { useEffect, useMemo, useRef, useState } from 'react'
import MainLayout from '../Layout/MainLayout'
import { ThemeColor, ThemeColorSet } from '@/lib/Types/Theme/ThemeColor'
import { Check, ChevronRight, ImageIcon, Info, Layout, Palette, Star, Type, Upload } from 'lucide-react'
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
import QueueConfig from '@/Components/ThemeConfig/QueueConfig'
import { Product } from '@/hooks/Theme/useProductCatalog'

type Props = {}

const productRecomended: Product[] = [
    {
        id: 1,
        name: 'Nasi Goreng Spesial',
        price: 25000,
        oldPrice: 32000,
        description: 'Nasi goreng kampung dengan telur mata sapi, ayam suwir, dan acar. Rasa klasik yang memuaskan.',
        imageUrl: 'https://asset.kompas.com/crops/VcgvggZKE2VHqIAUp1pyHFXXYCs=/202x66:1000x599/1200x800/data/photo/2023/05/07/6456a450d2edd.jpg',
        category: 'Makanan Utama',
        isRecomended: true,
        variants: [
            { id: 1, name: 'Original', priceAdjustment: 0 },
            { id: 3, name: 'Pedas Gila', priceAdjustment: 2000 },
            { id: 2, name: 'Tanpa Telur', priceAdjustment: -1000 },
        ],
    },
    {
        id: 2,
        name: 'Kopi Susu Gula Aren',
        price: 18000,
        description: 'Perpaduan kopi, susu creamy, dan manisnya gula aren alami.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkHljUqHY8-FoRbAEJUtKaDcf0siOOwxhPvg&s',
        category: 'Minuman Segar',
        isRecomended: true,
        variants: [
            { id: 4, name: 'Dingin (Es)', priceAdjustment: 0 },
            { id: 5, name: 'Panas', priceAdjustment: 0 },
            { id: 6, name: 'Extra Shot', priceAdjustment: 5000 },
        ],
    },
    {
        id: 5,
        name: 'Paket Kenyang Berdua',
        price: 80000,
        description: '2 paket bakso nikmat + 2 es lemon timun mas',
        imageUrl: 'https://katalogpromosi.com/wp-content/uploads/2025/08/bakso_boedjangan_paket_kenyang_berdua_18092025.jpg',
        isPackage: true,
        category: 'Makanan Utama',
        variants: [
            { id: 11, name: 'Normal', priceAdjustment: 0 },
            { id: 12, name: 'Upgrade Minuman', priceAdjustment: 5000 }, // Contoh upgrade
        ],
    },
]

const RecomendedPage = (props: Props) => {
    const [accentColor, setAccentColor] = useState<string>('');
    const [listColor, setListColor] = useState<color[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('rekomendasi hari ini');
    useEffect(() => {
        getColorTheme();
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

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Layout size={18} className="text-indigo-600" />
                                <h3 className="font-semibold text-slate-800">Layout Kartu Rekomendasi</h3>
                            </div>
                            <div className="">
                                {productRecomended?.map((pr, i) => (

                                    <div className={`relative ${colors?.bg50} h-auto rounded-xl shadow-xl mb-8 overflow-hidden flex flex-col sm:flex-row items-stretch border ${colors?.border200}`}>
                                        {/* Kiri: Gambar Produk Spesial */}
                                        <div className="w-full sm:w-1/3 h-48 sm:h-auto relative">
                                            <img
                                                src={pr?.imageUrl}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Kanan: Detail Spesial */}
                                        <div className="flex-1 p-6 flex flex-col justify-center">
                                            <div className={`inline-flex items-center space-x-2 ${colors?.text600} mb-2`}>
                                                <Star size={20} className={colors?.text400} />
                                                <p className="text-sm font-bold uppercase tracking-wider">{title}</p>
                                            </div>

                                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                                                {pr?.name}
                                            </h2>

                                            <p className="mt-2 text-gray-700 line-clamp-2">
                                                {pr?.description || "Rasakan kelezatan menu pilihan terbaik kami yang wajib Anda coba hari ini!"}
                                            </p>

                                            <div className="mt-4 sm:flex items-center space-x-4">
                                                {
                                                    pr?.oldPrice &&
                                                    <span className={`line-through text-xl font-bold text-red-400`}>
                                                        Rp{pr?.oldPrice}
                                                    </span>
                                                }
                                                <span className={`text-2xl font-bold ${colors?.text600}`}>
                                                    Rp{pr?.price}
                                                </span>

                                                <button
                                                    // onClick={() => openDetailModal(pr)}
                                                    className={`px-5 py-2 ${colors?.bg500} text-white font-bold rounded-full shadow-lg ${colors?.hoverBg600} transition-colors text-base`}
                                                >
                                                    Pesan Sekarang
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="space-y-1.5 mb-2">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                    placeholder="Contoh: Dapatkan Diskon"
                                />
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

                </main>
            </MainLayout>
    )
}

export default RecomendedPage