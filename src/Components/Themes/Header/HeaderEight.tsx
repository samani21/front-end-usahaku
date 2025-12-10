import React from 'react'
import HeaderIconOne from '../HeaderIcon/HeaderIconOne'
import { Clock, Coffee, Heart, History, Package, ShoppingBag, ShoppingCart, Smartphone } from 'lucide-react'
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { DrawerType, OrderItem, Product } from '@/hooks/Theme/useProductCatalog';
import HeaderIconTwo from '../HeaderIcon/HeaderIconTwo';

type Props = {
    color: ThemeColorSet;
    openDrawer: (val: DrawerType) => void;
    favoriteProducts: Product[];
    cart: OrderItem[];
    history: OrderItem[];
    isService?: boolean
    handleChangeBusiness?: (val: boolean) => void;
}

const HeaderEight = ({ color, openDrawer, favoriteProducts, cart, history, isService, handleChangeBusiness }: Props) => {
    return (
        // <header className="sticky top-0 z-30 bg-white shadow-md">
        //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        //         <h1 className={`text-2xl font-extrabold ${color?.text600}`}>
        //             Catalog<span className="text-gray-900">Pro</span>
        //         </h1>
        //         <nav className="flex items-center space-x-3">
        //             {/* Icon Favorite */}
        //             <button
        //                 onClick={() => openDrawer('favorite')}
        //                 className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-red-500 transition relative"
        //                 aria-label="Favorite"
        //             >
        //                 <Heart size={24} />
        //                 {favoriteProducts.length > 0 && (
        //                     <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        //                 )}
        //             </button>
        //             {/* Icon Order (Keranjang) */}
        //             <button
        //                 onClick={() => openDrawer('cart')}
        //                 className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-blue-500 transition relative"
        //                 aria-label="Order"
        //             >
        //                 <ShoppingBag size={24} />
        //                 {cart.length > 0 && (
        //                     <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full border-2 border-white"></span>
        //                 )}
        //             </button>
        //             <button
        //                 onClick={() => openDrawer('history')}
        //                 className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-blue-500 transition relative"
        //                 aria-label="Order"
        //             >
        //                 <History size={24} />
        //                 {history.length > 0 && (
        //                     <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full border-2 border-white"></span>
        //                 )}
        //             </button>

        //         </nav>
        //     </div>
        // </header>
        <header className="sticky top-0 bg-white border-b border-gray-200 shadow-lg z-30">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <h1 className={`md:text-3xl font-black ${color?.text600} tracking-wider`}>
                        {isService ? 'SOLUSI KREATIF' : 'CATALOG PRO'}
                    </h1>
                    {/* Tombol Alih Tampilan (Desktop) */}
                    <div className="hidden sm:flex p-1 bg-gray-100 rounded-full border border-gray-200">
                        <button
                            onClick={() => handleChangeBusiness?.(false)}
                            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${!isService ? `${color?.bg600} text-white shadow-md` : 'text-slate-600 hover:bg-white'
                                }`}
                        >
                            Produk Jualan
                        </button>
                        <button
                            onClick={() => handleChangeBusiness?.(true)}
                            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${isService ? `${color?.bg600} text-white shadow-md` : 'text-slate-600 hover:bg-white'
                                }`}
                        >
                            Layanan Jasa Desain
                        </button>
                    </div>
                </div>


                {/* Ikon Aksi (Menggunakan Lucide React) */}
                <div className="flex space-x-3 items-center">
                    {/* Komponen Pilihan Warna */}

                    <button
                        onClick={() => openDrawer('favorite')}
                        className="p-3 rounded-full text-red-500 hover:bg-red-50 transition border border-gray-100"
                        aria-label="Favorite"
                    >
                        <Heart className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => openDrawer('cart')}
                        className={`p-3 rounded-full ${color?.text600} ${color?.hoverBg50} transition border border-gray-100`}
                        aria-label="Order/Keranjang"
                    >
                        <ShoppingCart className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => openDrawer('history')}
                        className="p-3 rounded-full text-slate-600 hover:bg-gray-100 transition border border-gray-100"
                        aria-label="History Order"
                    >
                        <History className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default HeaderEight