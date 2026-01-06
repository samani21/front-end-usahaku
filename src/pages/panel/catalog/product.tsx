import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import MainLayout from '../Layout/MainLayout'
import HeaderConfig from '@/Components/ThemeConfig/HeaderConfig'
import { ThemeColor, ThemeColorSet } from '@/lib/Types/Theme/ThemeColor'
import { Check, ChevronRight, ImageIcon, Info, Layout, Palette, Type, Upload } from 'lucide-react'
import { Get } from '@/utils/Get'
import { color } from '@/lib/Types/Theme/theme'
import Loading from '@/Components/component/Loading'
import ProductConfig from '@/Components/ThemeConfig/CardProduct'
import { Product } from '@/hooks/Theme/useProductCatalog'
import ModalProduct from '@/Components/ThemeConfig/ModalProduct'

type Props = {}

const listProduct: Product[] = [
    {
        id: 1,
        name: 'ROG Strix G16 (2025)',
        price: 25999000,
        description: 'Laptop berperforma tinggi untuk gaming dan editing profesional. Dilengkapi kartu grafis terbaru.',
        imageUrl: 'https://dlcdnwebimgs.asus.com/files/media/71a33ba1-1be2-44c1-9541-70b4c800abf8/v1/images/Strix_G16_KV_16x9.webp',
        category: 'Laptop',
        isService: false,
        isFavorite: true,
        variants: [
            { id: 1, name: 'RAM 16GB / SSD 512GB', priceAdjustment: 0 },
            { id: 2, name: 'RAM 32GB / SSD 1TB (Premium)', priceAdjustment: 3000000 },
        ],
    },
    {
        id: 2,
        name: 'Espresso Blend Klasik',
        price: 35000,
        description: 'Campuran biji kopi Arabika dan Robusta dengan rasa yang seimbang dan aroma cokelat pekat.',
        imageUrl: 'https://plus.unsplash.com/premium_photo-1675435646209-24c008f31d92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEVzcHJlc3NvJTIwQmxlbmQlMjBLbGFzaWt8ZW58MHx8MHx8fDA%3D',
        category: 'Kopi',
        isFavorite: true,
        variants: [
            { id: 1, name: 'Reguler', priceAdjustment: 0 },
            { id: 2, name: 'Besar (+5K)', priceAdjustment: 5000 },
        ],
    },
    {
        id: 3,
        name: 'Mie Goreng Rasa Ayam Bawang',
        price: 3500,
        description: 'Mie instan dengan rasa ayam bawang klasik. Cocok untuk bekal atau sarapan cepat.',
        imageUrl: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//89/MTA-3452732/sedaap_mie-instant-mie-sedap-70gr-rasa-ayam-bawang_full02.jpg',
        category: 'Makanan Instan',
        isFavorite: true,
        variants: [
            { id: 101, name: 'Biasa', priceAdjustment: 0 },
            { id: 102, name: 'Jumbo Pack (+20%)', priceAdjustment: 1000 },
        ],
    },
    {
        id: 4,
        name: "Kopi Arabika Premium",
        price: 55000,
        description: "Biji kopi Arabika pilihan dari dataran tinggi, aroma kaya dan rasa seimbang. Cocok untuk semua metode seduh, dari V60 hingga Espresso. Produk ini bersertifikat organik.",
        imageUrl: "https://images.unsplash.com/photo-1668923570518-9eb1f838f19b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a29waSUyMGFyYWJpa2F8ZW58MHx8MHx8fDA%3D",
        category: "Minuman",
        isFavorite: true,
        variants: [
            { id: 101, name: "250g Biji Utuh", priceAdjustment: 0 },
            { id: 102, name: "250g Bubuk Halus", priceAdjustment: 5000 },
            { id: 103, name: "500g Biji Utuh", priceAdjustment: 45000 },
        ],
    },
    {
        id: 5,
        name: "Meja Kopi Bundar Kayu Jati",
        imageUrl: "https://images.unsplash.com/photo-1692262089751-7e26b69ad8d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWVqYSUyMEtvcGklMjBCdW5kYXIlMjBLYXl1JTIwSmF0aXxlbnwwfHwwfHx8MA%3D%3D",
        price: 1800000,
        description: "Meja kopi bundar dari kayu jati solid dengan finishing alami. Tahan lama dan elegan.",
        category: "Meja",
        isFavorite: true,
        variants: [
            { id: 201, name: "Diameter 60cm (Jati)", priceAdjustment: 0 },
            { id: 202, name: "Diameter 80cm (Jati Premium)", priceAdjustment: 800000 },
        ],
    },
    {
        id: 6,
        name: "Matcha Latte",
        category: 'Non-Kopi',
        price: 30000,
        description: "Perpaduan bubuk matcha berkualitas tinggi dengan susu segar.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1661756522906-5df7ee690868?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWF0Y2hhJTIwTGF0dGV8ZW58MHx8MHx8fDA%3D",
        isFavorite: false,
        variants: [
            // { id: 201, name: "Dingin", priceAdjustment: 0 },
            // { id: 202, name: "Panas", priceAdjustment: 0 },
        ],
    },
    {
        id: 7,
        category: 'Paket Komplit',
        name: 'Paket Peluncuran Startup',
        price: 8000000,
        description: 'Website, Logo, Desain UI/UX, dan Konsultasi Branding Awal.',
        variants: [],
        imageUrl: '/theme/sevent/paket_startup.png',
        isPackage: true,
        isService: true,
        information: [
        ]
    },
    {
        id: 8,
        name: "Headphone Nirkabel Z20",
        price: 780000,
        category: "Elektronik",
        description: "Suara jernih dan bass mendalam,daya tahan baterai hingga 30 jam.Dilengkapi fitur noise cancelling adaptif.Desain lipat yang ergonomis,ringan dan nyaman digunakan seharian.",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGVhZHBob25lJTIwTmlya2FiZWx8ZW58MHx8MHx8fDA%3D",
        variants: []
    },
    {
        id: 9, name: "Paket Ganteng Maksimal",
        price: 100000, description: "Potong Rambut + Perawatan Janggut + Masker Wajah.",
        imageUrl: "https://images.unsplash.com/photo-1593269233759-427ba69acca5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHBvdG9uZyUyMHJhbWJ1dHxlbnwwfHwwfHx8MA%3D%3D",
        isService: true,
        category: 'Barbershop',
        isPackage: true,
        variants: []
    },
    {
        id: 10,
        category: 'Laundry',
        isPackage: true,
        name: 'Paket Hemat Bulanan',
        isFavorite: true,
        price: 250000,
        description: 'Gratis 5KG untuk total 50KG.',
        imageUrl: 'https://plus.unsplash.com/premium_photo-1663036970563-99624abc950e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8TGF1bmRyeXxlbnwwfHwwfHx8MA%3D%3D',
        variants: [],
        isService: true
    }, {
        id: 11,
        name: 'Paket Ngemil Santai',
        price: 75000,
        description: 'Kentang mushu/singkong kentang + 2 ice kopi gula melaka + Thick Toast peanut butter',
        imageUrl: 'https://katalogpromosi.com/wp-content/uploads/2025/01/toast_box_sip_snack_23102025.jpg',
        isPackage: true,
        category: 'Cemilan',
        variants: [
            { id: 13, name: 'Original', priceAdjustment: 0 },
        ],
    },
    {
        id: 12,
        name: "Kopi Latte Caramel",
        price: 35000,
        category: 'Minuman Segar',
        description: "Espresso dengan susu segar dan sirup karamel manis.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRetEu1YfkmziSSdJVN5wdicRx4DOEhuLP_mw&s",
        variants: [{
            id: 201,
            name: "Panas",
            priceAdjustment: 0
        }, {
            id: 202,
            name: "Dingin",
            priceAdjustment: 3000
        }]
    },
]

const ProductPage = (props: Props) => {
    const [accentColor, setAccentColor] = useState<string>('orange');
    const [listColor, setListColor] = useState<color[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>(listProduct);
    const [product, setProduct] = useState<Product | null>(null);
    const [cardProduct, setCardProduct] = useState<number>(0);
    const [themeMode, setThemeMode] = useState<'Light' | 'Dark'>('Light');
    useEffect(() => {
        getColorTheme();
    }, []);

    const colors = useMemo(() => {
        if (accentColor in ThemeColor) {
            return ThemeColor[accentColor as keyof typeof ThemeColor]
        }
        return ThemeColor.orange
    }, [accentColor]);

    const handleFav = useCallback((id: number) => {
        setProducts((prev) =>
            prev?.map((p) =>
                p?.id === id ?
                    { ...p, isFavorite: !p?.isFavorite } : p)
        )
    }, [])
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
                            <h2 className="text-2xl font-bold">Pengaturan Tampilan Produk dan Modal</h2>
                            <p className="text-slate-500 text-sm">Sesuaikan identitas visual katalog website Anda.</p>
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm">
                            Simpan Perubahan
                        </button>
                    </div>
                    <div className=" sm:flex gap-4">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Layout size={18} className="text-indigo-600" />
                                <h3 className="font-semibold text-slate-800">Pilih Layout Produk</h3>
                            </div>
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
                            <div className="grid sm:grid-cols-1 lg:grid-cols-1 gap-3">
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
                                ].map((item) =>
                                    <ProductConfig theme={item?.id} key={item?.id} product={products[item?.id - 1]} color={colors} handleFav={handleFav} onClick={() => {
                                        setCardProduct(item?.id)
                                        setProduct(products[item?.id - 1])
                                    }} themeMode={themeMode} />)}
                            </div>
                        </div>
                        <div className="w-full bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Palette size={18} className="text-indigo-600" />
                                <h3 className="font-semibold text-slate-800">Aksen Warna Utama</h3>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-3">
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
                {
                    cardProduct != 0 && product &&
                    <ModalProduct product={product} color={colors} onClose={() => setCardProduct(0)} theme={cardProduct} themeMode={themeMode} />
                }
            </MainLayout>
    )
}

export default ProductPage