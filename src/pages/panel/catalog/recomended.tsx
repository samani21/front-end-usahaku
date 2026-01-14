import React, { ReactElement, useEffect, useMemo, useState } from 'react'
import MainLayout from '../Layout/MainLayout'
import { ThemeColor, ThemeColorSet } from '@/lib/Types/Theme/ThemeColor'
import { BadgePercent, BoxIcon, Check, ChevronLeft, Layout, Palette, Star } from 'lucide-react'
import { Get } from '@/utils/Get'
import { color } from '@/lib/Types/Theme/theme'
import Loading from '@/Components/component/Loading'
import { Product } from '@/hooks/Theme/useProductCatalog'
import Modals from '@/Components/component/Modals'
import { ResProduct } from '@/lib/Types/Product/ProductState'
import { Meta } from '@/lib/Types/Public'
import ToggleSwitch from '@/Components/ui/ToggleSwitch'
import FormInput from '@/Components/CRUD/FormInput/FormInput'
import { useAlert } from '@/Context/AlertContext'
import { Post } from '@/utils/Post'


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

export default function RecomendedPage() {
    const { showFinalAlert, simulateProcess } = useAlert();

    const [accentColor, setAccentColor] = useState<string>('orange');
    const [listColor, setListColor] = useState<color[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('rekomendasi hari ini');
    const [products, setProducts] = useState<ResProduct[]>();
    const [meta, setMeta] = useState<Meta>({
        last_page: 1,
        limit: 10,
        page: 1,
        total: 0,
    });
    const [isRecomended, setIsRecomended] = useState<boolean>(false);
    const [detailProduct, setDetailProduct] = useState<ResProduct | null>(null);
    const [priceDiskon, setPriceDiskon] = useState<string>('');
    const [discount, setDiscount] = useState<string>('');
    const [discountType, setDiscountType] = useState<'cut' | 'percent'>('cut');

    useEffect(() => {
        getColorTheme();
        getProduct()
    }, []);

    useEffect(() => {
        setTitle(detailProduct?.title_recomended ?? 'rekomendasi hari ini')
        setIsRecomended(detailProduct?.is_recomended ?? false)
        if (detailProduct?.price_discount) {
            setPriceDiskon(String(detailProduct?.price_discount))
        }
        setAccentColor(detailProduct?.color_recomended ?? 'orange');
        setDiscountType(detailProduct?.percent_discount ? 'percent' : 'cut');
        setDiscount(String(detailProduct?.percent_discount) ?? '');
    }, [detailProduct]);


    const listProductIsRecomended = useMemo<Product[]>(() => {
        if (!products || products.length === 0) return [];

        return products
            .filter((item) => item.is_recomended) // kalau mau hanya recommended
            .map((item): Product => ({
                id: item.id,
                name: item.name,
                description: item.description,
                imageUrl: item.image,
                stock: item.stock,
                isRecomended: item.is_recomended,
                price: item.final_price ?? item.price,
                oldPrice: item.price_discount ? item.price : undefined,
                variants: item.variants?.map((v) => ({
                    id: v.id,
                    name: v.name,
                    priceAdjustment: v.price ?? 0,
                    qty: v.stock,
                })) ?? [],
                isFavorite: false,
                isPackage: false,
                isService: false,
                titleRecomended: item?.title_recomended,
                colorRecomended: item?.color_recomended,
                discount: item?.percent_discount,
            }));
    }, [products]);


    // const colors = useMemo(() => {
    //     if (accentColor in ThemeColor) {
    //         return ThemeColor[accentColor as keyof typeof ThemeColor]
    //     }
    //     return ThemeColor.orange
    // }, [accentColor]);

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

    const getProduct = async () => {
        try {
            setLoading(true)
            const res = await Get<{ success: boolean; data: ResProduct[]; meta: Meta }>(
                `/products`
            );

            if (res?.success) {
                setProducts(res.data);
                setMeta(res.meta);
                setLoading(false)
            }
        } catch (err: any) {
            // setError(err?.message)
            setLoading(false)
        }
    }

    const handleSubmit = async () => {
        try {
            simulateProcess();

            const payload = new FormData();
            payload.append('title', title);
            payload.append('price_discount', priceDiskon);
            payload.append('color_recomended', accentColor);
            payload.append('is_recomended', isRecomended ? '1' : '0');
            payload.append('discount_type', discountType);
            payload.append('discount', discount);


            const res = await Post(`/products/recomended/${detailProduct?.id}`, payload);
            if (res) {
                showFinalAlert('success', 'Berhasil', 'Atur config rekomendasi');
                getProduct()
                setDetailProduct(null)
                setAccentColor('orange')
                setIsRecomended(false)
                setPriceDiskon('')
                setDiscountType('cut')
                setDiscount('')
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
                        <h2 className="text-2xl font-bold">Pengaturan Tampilan Antrian</h2>
                        <p className="text-slate-500 text-sm">Sesuaikan identitas visual katalog website Anda.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <BoxIcon size={18} className="text-indigo-600" />
                            <h3 className="font-semibold text-slate-800">Pilih Produk</h3>
                        </div>
                        <div className="">
                            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 py-6'>
                                {
                                    products?.map((p, i) => {
                                        const colors: ThemeColorSet =
                                            ThemeColor[(p?.color_recomended) as keyof typeof ThemeColor]
                                        return (
                                            <div className={`bg-gray-100 ${p?.is_recomended ? 'border-2' : 'p-2'} ${colors?.border600} rounded-lg space-y-2 hover:bg-gray-200 cursor-pointer`} onClick={() => setDetailProduct(p)} key={i}>
                                                <img src={p?.image} className='w-full h-24 rounded-sm object-cover' />
                                                <div className={`${p?.is_recomended && 'p-2'}`}>
                                                    <p>{p?.name}</p>
                                                    <div>
                                                        <p className='font-semibold'>Rp {p.price.toLocaleString("id-ID")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Layout size={18} className="text-indigo-600" />
                            <h3 className="font-semibold text-slate-800">Layout Kartu Rekomendasi</h3>
                        </div>
                        <div className="">

                            {(listProductIsRecomended?.length > 0 ? listProductIsRecomended : productRecomended)?.map((pr, i) => {
                                const colors: ThemeColorSet =
                                    ThemeColor[(pr?.colorRecomended ?? 'orange') as keyof typeof ThemeColor]
                                return (
                                    <div key={i} className={`relative ${colors?.bg50} h-auto rounded-xl shadow-xl mb-8 overflow-hidden flex flex-col sm:flex-row items-stretch border ${colors?.border200}`}>
                                        <div className="w-full sm:w-1/3 h-48 sm:h-auto relative">
                                            <img
                                                src={pr?.imageUrl}
                                                className="w-full h-60 object-cover"
                                            />
                                        </div>

                                        {pr?.discount &&
                                            <div className={`absolute right-0 ${colors?.bg700} p-1 flex items-center gap-2 ${colors?.text100} rounded-sm`}>
                                                <BadgePercent /> <span className='font-bold'>{pr?.discount}%</span>
                                            </div>
                                        }

                                        <div className="flex-1 p-6 flex flex-col justify-center">
                                            <div className={`inline-flex items-center space-x-2 ${colors?.text600} mb-2`}>
                                                <Star size={20} className={colors?.text400} />
                                                <p className="text-sm font-bold uppercase tracking-wider">{pr?.titleRecomended ?? title}</p>
                                            </div>

                                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                                                {pr?.name}
                                            </h2>

                                            <p className="mt-2 text-gray-700 line-clamp-2">
                                                {pr?.description}
                                            </p>

                                            <div className="mt-4 sm:flex items-center space-x-4">
                                                {
                                                    pr?.oldPrice &&
                                                    <span className={`line-through text-xl font-bold text-red-400`}>
                                                        Rp{pr?.oldPrice.toLocaleString("id-ID")}
                                                    </span>
                                                }
                                                <span className={`text-2xl font-bold ${colors?.text600}`}>
                                                    Rp{pr.price.toLocaleString("id-ID")}
                                                </span>

                                            </div>
                                            <button
                                                className={`px-5 py-2 ${colors?.bg500} text-white font-bold rounded-full shadow-lg ${colors?.hoverBg600} transition-colors text-base mt-2`}
                                            >
                                                Pesan Sekarang
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
                <Modals open={detailProduct ? true : false} onClose={() => {
                    setDetailProduct(null)
                    setIsRecomended(false);
                }}>
                    <div className='overflow-auto max-h-[80vh] no-scrollbar'>
                        <div className='w-lg bg-zinc-100 p-4 rounded-lg space-y-2'>
                            <img src={detailProduct?.image} className='w-full object-cover h-50' />
                            <p className='font-[400px]'>{detailProduct?.name}</p>
                            <p className='font-semibold'>Rp {detailProduct?.price.toLocaleString("id-ID")}</p>
                            <div className='flex items-center justify-end'>
                                <ToggleSwitch
                                    label="Jadikan produk rekomendasi atau diskon"
                                    checked={isRecomended}
                                    onChange={() => {
                                        setIsRecomended(!isRecomended)
                                    }}
                                />
                            </div>
                            {

                                isRecomended ?
                                    <>
                                        <div className="space-y-1.5 mb-2">
                                            <FormInput
                                                label="Title"
                                                type="text"
                                                name="price"
                                                value={title}
                                                onChange={(e) => setTitle(e?.target?.value)}
                                                min={0}
                                                placeholder={"Rekomendasi hari ini"}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <p className="font-semibold">Tipe Diskon</p>

                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="discount"
                                                    value="round"
                                                    checked={discountType === 'cut'}
                                                    onChange={() => setDiscountType('cut')}
                                                    className="accent-red-500"
                                                />
                                                <span>Potong harga</span>
                                            </label>

                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="discount"
                                                    value="floor"
                                                    checked={discountType === 'percent'}
                                                    onChange={() => setDiscountType('percent')}
                                                    className="accent-red-500"
                                                />
                                                <span>Persent</span>
                                            </label>
                                        </div>
                                        {
                                            discountType === 'cut' ?
                                                <div className="space-y-1.5 mb-2">
                                                    <FormInput
                                                        label="Potongan Harga"
                                                        type="price"
                                                        name="price"
                                                        value={priceDiskon}
                                                        onChange={(e) => setPriceDiskon(e?.target?.value)}
                                                        min={0}
                                                        placeholder='100.000'
                                                    />
                                                    <i className='text-red-600 text-[12px]'>Tidak boleh lebih besar dari harga asli</i>
                                                </div> :
                                                <div className="space-y-1.5 mb-2">
                                                    <FormInput
                                                        label="Diskon"
                                                        type="number"
                                                        name="discount"
                                                        value={discount}
                                                        onChange={(e) => setDiscount(e?.target?.value)}
                                                        min={0}
                                                        max={99}
                                                    />
                                                    <i className='text-red-600 text-[12px]'>Tidak boleh lebih dari 100%</i>
                                                </div>
                                        }
                                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Palette size={18} className="text-indigo-600" />
                                                <h3 className="font-semibold text-slate-800">Pilih Warna</h3>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
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
                                        </div>
                                    </> : ''
                            }
                            <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm">
                                Simpan
                            </button>
                        </div>
                    </div>
                </Modals>
            </main>
    )
}


RecomendedPage.getLayout = function getLayout(page: ReactElement) {
    // Di sinilah Halaman dibungkus oleh MainLayout (dan AlertProvider di dalamnya)
    return <MainLayout>{page}</MainLayout>;
};