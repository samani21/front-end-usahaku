import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import { ResProduct, Variants } from '@/Types/Product/ProductState';
import { formatIDR } from '@/lib/FormtRupiah';
import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import AlertWrapper from './AlertWrapper';
import { Check, X } from 'lucide-react';

type Props = {
    color: ThemeColorSet;
    products: ResProduct[];
    isDarkMode: boolean;
}

const One = ({ products, isDarkMode, color }: Props) => {
    const [product, setProduct] = useState<ResProduct | null>(null)
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null)
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
    const mockItem = useMemo(() => {
        return {
            name: product?.name,
            price: product?.final_price,
            image: product?.image,
            category: product?.categori
        }
    }, [activeAlert])
    useEffect(() => {
        if (activeAlert) {
            const timer = setTimeout(() => setActiveAlert(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [activeAlert]);

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 h-full'>
            {products?.map((p, i) => (
                <div key={i} onClick={() => setProduct(p)} className={`group cursor-pointer rounded-3xl overflow-hidden border-2 transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
                    <img src={p?.image} className="w-full aspect-square object-cover" alt="" />
                    <div className="p-6">
                        <h3 className="font-bold text-lg mt-1">{p?.name}</h3>
                        <p className={`font-black text-xl mt-2 ${color?.text600}`} >{formatIDR(p?.final_price || 0)}</p>
                    </div>
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
                <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                    <img src={selectedVariant?.image ?? product?.image} className="w-full h-full object-cover" alt={product?.name} />
                </div>
                <div className="md:w-1/2 p-8 md:p-12 space-y-6 flex flex-col justify-center">
                    {
                        product?.categori ?
                            <span className={`px-3 py-1 ${color?.text600} ${color?.bg100} text-[10px] font-black rounded-full w-fit uppercase tracking-widest`}>{product?.categori}</span> : ""
                    }
                    <h2 className="text-4xl font-black tracking-tight">{product?.name}</h2>
                    <div className="flex items-baseline gap-3">
                        <span className={`text-3xl font-black text-blue-600`}>{formatIDR(product?.final_price ?? 0)}</span>
                        {
                            product?.price_discount &&
                            <span className="text-lg opacity-30 line-through">{formatIDR(product?.price ?? 0)}</span>
                        }
                    </div>
                    {product?.variants && product?.variants?.length > 0 &&
                        <VariantPicker variants={product?.variants} color={color} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} isDarkMode={isDarkMode} />
                    }
                    <p className={`${isDarkMode ? "ext-slate-400" : "text-slate-500"} text-sm leading-relaxed`}>{product?.description}</p>
                    <div className={`space-y-4 pt-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-400'}`}>
                        <div className='md:flex justify-between'>
                            {
                                product && product.is_quantity ?
                                    <QtySelector quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} /> : ""
                            }
                            {
                                selectedVariant && product && product.is_quantity ?
                                    <p className={`text-3xl font-black text-right text-blue-600`}>{formatIDR((selectedVariant?.final_price ?? 0) * quantity)}</p> :
                                    product && product.is_quantity ?
                                        <p className={`text-3xl font-black text-right text-blue-600`}>{formatIDR((product?.final_price ?? 0) * quantity)}</p> : ""
                            }
                        </div>
                        <div>
                            <p>Total</p>
                            <p className='font-semibold'>{formatIDR((selectedVariant?.final_price ?? product?.final_price ?? 0) * quantity)}</p>
                        </div>
                        <button disabled={disableButton} onClick={() => setActiveAlert(true)} className={`w-full disabled:bg-gray-600 py-4 ${color?.bg600} text-white rounded-2xl font-black shadow-lg shadow-blue-500/30`}>BELI SEKARANG</button>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="top-right">
                <div className={`${isDarkMode ? "bg-slate-900" : "bg-white"} p-4 rounded-2xl shadow-2xl border border-emerald-500/20 flex items-center gap-4`}>
                    <div className={`w-10 h-10 ${color?.bg500} text-white rounded-xl flex items-center justify-center shrink-0`}>
                        <Check size={20} />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-bold">Berhasil ditambahkan!</p>
                        <p className="text-[10px] opacity-50 truncate w-40">{mockItem?.name}</p>
                    </div>
                    <button onClick={() => setActiveAlert(false)}><X size={16} className="opacity-20" /></button>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default One