import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import { ResProduct, Variants } from '@/Types/Product/ProductState';
import { formatIDR } from '@/lib/FormtRupiah';
import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { ArrowRight, ShoppingBag, ShoppingCart } from 'lucide-react';
import AlertWrapper from './AlertWrapper';

type Props = {
    color: ThemeColorSet;
    products: ResProduct[];
    isDarkMode: boolean;
}

const Five = ({ products, isDarkMode, color }: Props) => {
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
    const mockItem = useMemo(() => {
        return {
            name: product?.name,
            price: product?.final_price,
            image: product?.image,
            category: product?.categori,
            quantity: quantity
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
                <div onClick={() => setProduct(p)} key={i} className="bg-white p-4 pb-12 shadow-2xl -rotate-2 hover:rotate-0 transition-transform cursor-pointer">
                    <div className="aspect-square bg-slate-200 mb-6 overflow-hidden"><img src={p?.image} className="w-full h-full object-cover" alt="" /></div>
                    <div className="px-2">
                        <p className="font-serif text-slate-800 text-lg font-black italic tracking-tighter">{p?.name}</p>
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
                <div className="flex flex-col w-full">
                    <div className="relative h-96">
                        <img src={product?.image} className="w-full h-full object-cover" alt="" />
                        <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? "from-slate-900" : "from-white"} to-transparent`} />
                    </div>
                    <div className="px-8 pb-12 -mt-20 relative space-y-6 text-center">
                        <div className={`inline-flex p-4 rounded-3xl ${isDarkMode ? "bg-slate-800 border border-slate-700" : "bg-white"} shadow-xl  `}>
                            <h2 className="text-2xl font-black tracking-tight">{product?.name}</h2>
                        </div>
                        <div className="flex justify-center gap-4 text-sm font-bold opacity-60">
                            <span>{product?.categori}</span>
                            <span>•</span>
                            <span>Tersedia: {product?.stock} Item</span>
                        </div>
                        <div className='flex items-center justify-center gap-4'>
                            {
                                product?.price_discount &&
                                <div className="text-1xl font-black line-through">{formatIDR(product?.price ?? 0)}</div>
                            }
                            <div className="text-3xl font-black" style={{ color: isDarkMode ? '#60a5fa' : '#2563eb' }}>{formatIDR(product?.final_price ?? 0)}</div>
                        </div>
                        <div className="flex flex-col items-center gap-6">
                            {product?.variants && product?.variants?.length > 0 &&
                                <VariantPicker variants={product?.variants} color={color} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} isDarkMode={isDarkMode} />
                            }
                            {
                                product && product.is_quantity &&
                                <QtySelector quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} />
                            }
                            <button disabled={disableButton} onClick={() => setActiveAlert(true)} className={`w-full disabled:bg-gray-600 max-w-md py-4 rounded-2xl text-white ${isDarkMode ? color?.bg500 : color?.bg900} font-bold uppercase tracking-widest flex items-center justify-center gap-3`}>
                                <ShoppingCart size={18} /> Tambah Ke Tas
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="top-center">
                <div className={`${isDarkMode ? "bg-slate-900" : "bg-white"} px-6 py-4 rounded-full shadow-2xl flex items-center gap-4 border-b-4 ${color?.border500}`}>
                    <ShoppingBag size={18} className="text-emerald-500" />
                    <span className="text-sm font-medium">{mockItem?.name} dimasukkan ke keranjang</span>
                    <ArrowRight size={16} />
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Five