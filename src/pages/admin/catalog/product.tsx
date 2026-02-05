import React, { ReactElement, useEffect, useMemo, useState } from 'react'
import MainLayout from '../Layout/MainLayout';
import { Get } from '@/utils/Get';
import { color } from '@/lib/Theme/theme';
import { ThemeColor, ThemeColorSet } from '@/lib/Theme/ThemeColor';
import { Check, Circle, CircleCheckBigIcon, Moon, Sun } from 'lucide-react';
import Loading from '@/Components/component/Loading';
import ProductConfig from '@/Components/ThemeConfig/Product';
import { ResProduct } from '@/Types/Product/ProductState';
import { useAlert } from '@/Context/AlertContext';
import { Post } from '@/utils/Post';
import { Catalog } from '@/Types/config';


const listProduct = [
    { id: 1, name: "Classic" },
    { id: 2, name: "Minimalist" },
    { id: 3, name: "Floating Bubble" },
    { id: 4, name: "Horizontal Stripes" },
    { id: 5, name: "Polaroid" },
    { id: 6, name: "Retro Hardware" },
    { id: 7, name: "Cyberpunk HUD" },
    { id: 8, name: "Bento Bento" },
    { id: 9, name: "Horizontal Split" },
    { id: 10, name: "Brutalist List" },
    { id: 11, name: "Soft Gradient" },
    { id: 12, name: "Floating Stack" },
    { id: 13, name: "Luxury Boutique" },
    { id: 14, name: "Ticket Stub" },
    { id: 15, name: "Circle Focus" },
]


const productsDefault: ResProduct[] = [
    {
        id: 1,
        name: "Kopi Gayo Premium",
        price: 85000,
        price_discount: 17000,
        final_price: 68000,
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=600&auto=format&fit=crop",
        description: "Biji kopi pilihan dari dataran tinggi Gayo, diolah dengan teknik roasting medium-dark.",
        variants: [
            {
                id: 1,
                name: "Giling Halus",
                product_id: 1,
                stock: 12,
                price: 100000,
                discount_price: 17000,
                final_price: 83000,
            },
            {
                id: 2,
                name: "Giling Kasar",
                product_id: 1,
                stock: 12,
                price: 85000,
                discount_price: 17000,
                final_price: 68000,
            },
            {
                id: 3,
                name: "Biji Utuh",
                product_id: 1,
                stock: 12,
                price: 85000,
                discount_price: 17000,
                final_price: 68000,
            }
        ],
        categori: "Minuman",
        slug: "",
        qrcode: "",
        has_variant: true,
        is_active: true,
        stock: 123,
        is_quantity: true,
        percent_discount: 20
    },
    {
        id: 2,
        name: "Jasa Desain Logo",
        price: 500000,
        final_price: 500000,
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop",
        description: "Pembuatan identitas visual profesional untuk bisnis Anda.",
        variants: [
            {
                id: 4,
                name: "Paket Hemat",
                product_id: 2,
                stock: 12,
                price: 500000,
                final_price: 500000,
            },
            {
                id: 5,
                name: "Paket Bisnis",
                product_id: 2,
                stock: 12,
                price: 500000,
                final_price: 500000,
            },
            {
                id: 6,
                name: "Paket Korporat",
                product_id: 2,
                stock: 12,
                price: 500000,
                final_price: 500000,
            }
        ],
        categori: "Kreatif",
        slug: "",
        qrcode: "",
        has_variant: false,
        is_active: true,
        stock: 123,
        is_quantity: false,
        is_service: true,
        service: [
            {
                id: 1,
                product_id: 2,
                title: "Estimasi: 3-5 Hari Kerja"
            },
            {
                id: 2,
                product_id: 2,
                title: "Bergaransi Penuh"
            }
        ]
    },
    {
        id: 3,
        name: "Sneaker Urban White",
        price: 450000,
        price_discount: 51000,
        final_price: 399000,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
        description: "Sepatu casual dengan bahan breathable dan sol anti-slip.",
        variants: [
            {
                id: 7,
                name: "Size 40",
                product_id: 3,
                stock: 12,
                price: 450000,
                discount_price: 51000,
                final_price: 399000,
            },
            {
                id: 8,
                name: "Size 41",
                product_id: 3,
                stock: 12,
                price: 450000,
                discount_price: 51000,
                final_price: 399000,
            },
            {
                id: 9,
                name: "Size 42",
                product_id: 3,
                stock: 12,
                price: 450000,
                discount_price: 51000,
                final_price: 399000,
            }
        ],
        categori: "Sepatu",
        slug: "",
        qrcode: "",
        has_variant: true,
        is_active: true,
        stock: 123,
        is_quantity: true
    },
    {
        id: 4,
        name: "Macbook",
        price: 4600000,
        price_discount: 200000,
        final_price: 45800000,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Biji kopi pilihan dari dataran tinggi Gayo, diolah dengan teknik roasting medium-dark.",
        variants: [],
        categori: "Elektronik",
        slug: "",
        qrcode: "",
        has_variant: false,
        is_active: true,
        stock: 123,
        is_quantity: false
    },
];


export default function CategoriePage() {
    const { showFinalAlert, simulateProcess } = useAlert();

    const [productLayout, setProductLayout] = useState<number>();
    const [accentColor, setAccentColor] = useState("cyan");
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [listColor, setListColor] = useState<color[]>();
    const [products, setProducts] = useState<ResProduct[]>()
    useEffect(() => {
        getColorTheme();
        getCalog()
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

    const getCalog = async () => {
        try {
            setLoading(true);
            const res = await Get<{ success: boolean; data: Catalog }>('/catalog');

            if (res?.success) {

                setProductLayout(res?.data?.product?.theme);
                setAccentColor(res?.data?.categorie?.color);
                setProducts(res?.data?.products ?? productsDefault)
            }
        } finally {
            setLoading(false);
        }
    };
    const handleSubmit = async () => {
        try {
            simulateProcess();
            const formData = new FormData();
            formData.append('theme', String(productLayout));
            formData.append('color', accentColor);

            const res = await Post(`/catalog/product`, formData);
            if (res) {
                showFinalAlert('success', 'Berhasil', 'Berhasil atur kategori')
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
                        <button
                            onClick={handleSubmit}
                            className="flex mb-1 items-center gap-2 p-2 text-sm bg-blue-600 text-white font-semibold hover:bg-blue-800 rounded-md transition-colors"
                        >
                            <Check className="w-4 h-4" /> Simpan Perubahan
                        </button>
                    </div>
                </div>
                <div className={`py-12 space-y-24 px-2 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
                    {
                        listProduct?.map((lh, i) => (
                            <div className='relative space-y-4'>
                                {
                                    productLayout === lh?.id ?
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <CircleCheckBigIcon />
                                            <label className="text-[12px] font-bold uppercase tracking-[0.3em] text-slate-500 block">{lh?.id}. {lh?.name}</label>
                                        </div> :
                                        <div className='flex items-center gap-2 cursor-pointer' onClick={() => setProductLayout(lh?.id)}>
                                            <Circle />
                                            <label className="text-[12px] font-bold uppercase tracking-[0.3em] text-slate-500 block">{lh?.id}. {lh?.name}</label>
                                        </div>
                                }
                                <div className='hidden md:grid'>
                                    <ProductConfig
                                        theme={lh?.id}
                                        color={colors}
                                        products={products ?? []}
                                        isDarkMode={isDarkMode} />
                                </div>
                                <div className='md:hidden'>
                                    <ProductConfig
                                        theme={lh?.id}
                                        color={colors}
                                        products={products?.slice(0, 2) ?? []}
                                        isDarkMode={isDarkMode} />
                                </div>
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
