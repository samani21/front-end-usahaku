import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import { ResProduct, Variants } from '@/Types/Product/ProductState';
import { formatIDR } from '@/lib/FormtRupiah';
import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { ArrowRight, CircleCheckBig, CircleCheckIcon, Sparkles } from 'lucide-react';
import AlertWrapper from './AlertWrapper';

type Props = {
    color: ThemeColorSet;
    products: ResProduct[];
    isDarkMode: boolean;
}

const Three = ({ products, isDarkMode, color }: Props) => {
    const [product, setProduct] = useState<ResProduct | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const [activeAlert, setActiveAlert] = useState<boolean>(false);
    const disableButton = useMemo(() => {
        if (product) {
            if (product?.variants?.length > 0 && !selectedVariant) {
                return true;
            } else {
                if (product?.variants?.length === 0) {
                    return false;
                } else {
                    return false;
                }
            }
        }
    }, [product, selectedVariant])
    useEffect(() => {
        if (activeAlert) {
            const timer = setTimeout(() => setActiveAlert(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [activeAlert]);
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 h-full'>
            {products?.map((p, i) => (
                <div onClick={() => setProduct(p)} key={i} className="group cursor-pointer flex flex-col items-center justify-center p-8">
                    <div className={`w-48 h-48 rounded-full overflow-hidden shadow-2xl group-hover:-translate-y-4 transition-transform border-8 ${isDarkMode ? "border-slate-800" : "border-white"}`}>
                        <img src={p?.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <h3 className="mt-6 font-bold text-center">{p?.name}</h3>
                    <div className="mt-2 text-xs font-black px-4 py-1 rounded-full bg-black text-white">{formatIDR(p?.final_price ?? 0)}</div>
                </div>
            ))}

            <ModalWrapper
                activeModal={product ? true : false}
                closeModal={() => {
                    setProduct(null)
                    setSelectedVariant(null)
                    setQuantity(1)
                }}
                isDarkMode={isDarkMode}>
                <div className={`md:w-2/5 p-6 sm:p-12 ${isDarkMode ? "bg-slate-800" : "bg-slate-50"} flex flex-col gap-8`}>
                    <img src={product?.image} className="w-full aspect-square rounded-3xl object-cover shadow-xl" alt="" />
                    <div className="space-y-4">
                        {
                            product?.service && product?.service?.length > 0 && product?.service?.map((s, i) => (
                                <div key={i} className={`flex items-center gap-3 text-sm font-bold opacity-60`}>
                                    <CircleCheckBig size={24} className={isDarkMode ? color?.text200 : color?.text600} />{s?.title}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="md:w-3/5 p-6 sm:p-12 flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-3xl font-black">{product?.name}</h2>
                                {
                                    product?.is_service ?
                                        <p className={`${color?.text600} font-bold mt-1`}>Layanan Jasa Tersedia</p> :
                                        <p className={`${color?.text600} font-bold mt-1`}>{product?.categori}</p>
                                }
                                <span className="text-1xl font-black mr-4 line-through">{formatIDR(product?.final_price ?? 0)}</span>
                                <span className="text-3xl font-black">{formatIDR(product?.final_price ?? 0)}</span>
                            </div>
                            {
                                product?.percent_discount &&
                                <div className="bg-red-500 text-white px-4 py-2 rounded-2xl font-black italic">-{product?.percent_discount}%</div>
                            }
                        </div>
                        <p className="opacity-50 text-sm">{product?.description}</p>
                        {/* <div className="space-y-4">
                            <span className="text-[10px] font-black uppercase opacity-30 tracking-widest">Pilih Paket Layanan</span>
                            <VariantButtons items={product?.variants} />
                        </div> */}
                        {product?.variants && product?.variants?.length > 0 &&
                            <VariantPicker variants={product?.variants} color={color} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} isDarkMode={isDarkMode} />
                        }
                        {
                            product && product.is_quantity &&
                            <QtySelector quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} />
                        }
                    </div>
                    <div className="sm:flex items-center gap-6 pt-4 " >
                        <div className="flex flex-col mb-4 sm:mb-0">
                            <span className="text-[10px] font-bold opacity-40 uppercase">Total</span>
                            {
                                selectedVariant ? <span className="text-3xl font-black">{formatIDR((selectedVariant?.final_price ?? 0) * quantity)}</span> :
                                    <span className="text-3xl font-black">{formatIDR((product?.final_price ?? 0) * quantity)}</span>
                            }
                        </div>
                        <button disabled={disableButton} onClick={() => setActiveAlert(true)} className={`py-5 w-full ${color?.bg600} disabled:bg-gray-400 text-white rounded-3xl font-black flex items-center justify-center gap-3`}>
                            Order <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="bottom-center">
                <div className={`backdrop-blur-xl ${color?.bg500} border border-emerald-500/20 p-4 rounded-full flex items-center gap-4 px-6 shadow-2xl`}>
                    <Sparkles className={color?.text900} size={20} />
                    <p className="text-sm font-bold">Produk masuk keranjang!</p>
                    <div className="w-px h-4 bg-emerald-500/20" />
                    <button className={`text-[10px] font-black uppercase ${color?.text100}`}>Checkout Now</button>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Three