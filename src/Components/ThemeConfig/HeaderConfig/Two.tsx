import { DUMMY_HISTORY_TWO, DUMMY_PRODUCTS_TWO } from '@/hooks/Theme/ProductTwo';
import { OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Heart, History, ShoppingCart } from 'lucide-react';
import React, { useMemo, useState } from 'react'
import DrawerTwo from './Drawer/DrawerTwo';

interface HeaderIconProps {
    Icon: React.ElementType;
    count: number;
    label: string;
    color: ThemeColorSet;
    drawer: string;
    onClik: (val: string, title: string) => void;
}

const HeaderIconTwo: React.FC<HeaderIconProps> = ({ Icon, count, label, color, drawer, onClik }) => (
    <button
        aria-label={label}
        onClick={() => onClik(drawer, label)}
        className={`p-2 rounded-full text-gray-600 ${color?.hoverText600} ${color?.hoverBg50} transition duration-150 relative group`}
    >
        <Icon size={24} />
        {count > 0 && (
            <span className={`absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 ${color?.bg600} rounded-full`}>
                {count > 99 ? '99+' : count}
            </span>
        )}
        <span className="absolute  left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
            {label}
        </span>
    </button>
);

type Props = {
    color: ThemeColorSet;
    bg: string;
    text: string;
    logo: string | null;
    span1: string;
    span2: string;
    frameLogo: string;
}
const Two = ({ color, bg, text, logo, span1, span2, frameLogo }: Props) => {
    const [openDrawer, setOpenDrawer] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');

    const favoriteProducts: Product[] = DUMMY_PRODUCTS_TWO?.filter(p => p?.isFavorite);
    const history: OrderItem[] = DUMMY_HISTORY_TWO;
    /* ===================== Numeric Theme ===================== */
    const cartTotal = useMemo(
        () => history.reduce((t, i) => t + i.finalPrice * i.quantity, 0),
        [history]
    );
    return (
        <div className='relative'>
            <header className="sticky top-0 z-40 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        {
                            logo &&
                            <div className={`${frameLogo === 'Light' ? 'bg-gray-100' : 'bg-gray-900'} p-1 rounded-[8px] max-w-16`}>
                                <img src={logo} className=' rounded-[8px]' />
                            </div>
                        }
                        <h1 className={`text-2xl font-extrabold flex items-center ${color?.text700}`}>
                            {span1}{span2}
                        </h1>
                    </div>
                    <div className="hidden sm:flex space-x-4">
                        <HeaderIconTwo Icon={Heart} count={favoriteProducts?.length} label="Buka Favorit" color={color} drawer='favorite' onClik={(e, t) => {
                            setOpenDrawer(e)
                            setTitle(t)
                        }} />
                        <HeaderIconTwo Icon={ShoppingCart} count={history?.length} label="Buka Keranjang" color={color} drawer='cart' onClik={(e, t) => {
                            setOpenDrawer(e)
                            setTitle(t)
                        }} />
                        <HeaderIconTwo Icon={History} count={history?.length} label="Buka Riwayat Pesanan" color={color} drawer='history' onClik={(e, t) => {
                            setOpenDrawer(e)
                            setTitle(t)
                        }} />
                    </div>
                </div>
            </header>
            <div className="w-full shadow-2xl">
                <div className={`p-20 text-center ${bg} ${text} italic h-[561px] sm:h-[700px]`}>
                    Konten Website...
                </div>
                <nav className="flex sm:hidden ${bg}  justify-between px-8">
                    <HeaderIconTwo Icon={Heart} count={favoriteProducts?.length} label="Buka Favorit" color={color} drawer='favorite' onClik={(e, t) => {
                        setOpenDrawer(e)
                        setTitle(t)
                    }} />
                    <HeaderIconTwo Icon={ShoppingCart} count={history?.length} label="Buka Keranjang" color={color} drawer='cart' onClik={(e, t) => {
                        setOpenDrawer(e)
                        setTitle(t)
                    }} />
                    <HeaderIconTwo Icon={History} count={history?.length} label="Buka Riwayat Pesanan" color={color} drawer='history' onClik={(e, t) => {
                        setOpenDrawer(e)
                        setTitle(t)
                    }} />
                </nav>
            </div>
            {
                openDrawer &&
                <div className='absolute inset-0 z-40  backdrop-blur-[0px] h-[670px]'>
                    <DrawerTwo
                        isOpen={openDrawer ? true : false}
                        onClose={() => setOpenDrawer(null)}
                        title={title}
                        favoriteProducts={favoriteProducts}
                        type={openDrawer ? openDrawer : ''}
                        color={color}
                        cart={history}
                        history={history}
                        cartTotal={cartTotal} />
                </div>
            }
        </div>
    )
}

export default Two