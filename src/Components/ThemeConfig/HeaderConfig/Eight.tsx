import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Heart, History, ShoppingCart, TextAlignJustify } from 'lucide-react';
import React, { useState } from 'react'


type Props = {
    color: ThemeColorSet;
    bg: string;
    text: string;
    logo: string | null;
    span1: string;
    span2: string;
    frameLogo: string;
}
const Eight = ({ color, bg, text, logo, span1, span2, frameLogo }: Props) => {
    const [isService, setIsService] = useState<boolean>(true);
    const [openList, setOpenList] = useState<boolean>(false);
    return (
        <>
            <header className="sticky top-0 bg-white border-b border-gray-200 shadow-lg z-30">
                <div className={`max-w-7xl mx-auto p-4 flex justify-between items-center ${openList && 'shadow-md'}`}>
                    <div className="flex items-center space-x-6">
                        <div className='flex items-center gap-2'>
                            {
                                logo &&
                                <div className={`${frameLogo === 'Light' ? 'bg-gray-100' : 'bg-gray-900'} p-1 rounded-[8px] max-w-16`}>
                                    <img src={logo} className=' rounded-[8px]' />
                                </div>
                            }
                            <h1 className={`md:text-3xl font-black ${color?.text600} tracking-wider`}>
                                {span1}{span2}
                            </h1>
                        </div>
                        {/* Tombol Alih Tampilan (Desktop) */}
                        <div className="hidden sm:flex p-1 bg-gray-100 rounded-full border border-gray-200">
                            <button
                                onClick={() => setIsService(false)}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${!isService ? `${color?.bg600} text-white shadow-md` : 'text-slate-600 hover:bg-white'
                                    }`}
                            >
                                Produk Jualan
                            </button>
                            <button
                                onClick={() => setIsService(true)}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${isService ? `${color?.bg600} text-white shadow-md` : 'text-slate-600 hover:bg-white'
                                    }`}
                            >
                                Layanan Jasa Desain
                            </button>
                        </div>
                    </div>
                    <div className='sm:hidden' onClick={() => setOpenList(!openList)}>
                        <TextAlignJustify className='text-gray-400' />
                    </div>

                    {/* Ikon Aksi (Menggunakan Lucide React) */}
                    <div className="hidden sm:flex space-x-3 items-center">
                        {/* Komponen Pilihan Warna */}

                        <button
                            className="p-3 rounded-full text-red-500 hover:bg-red-50 transition border border-gray-100"
                            aria-label="Favorite"
                        >
                            <Heart className="w-6 h-6" />
                        </button>
                        <button
                            className={`p-3 rounded-full ${color?.text600} ${color?.hoverBg50} transition border border-gray-100`}
                            aria-label="Order/Keranjang"
                        >
                            <ShoppingCart className="w-6 h-6" />
                        </button>
                        <button
                            className="p-3 rounded-full text-slate-600 hover:bg-gray-100 transition border border-gray-100"
                            aria-label="History Order"
                        >
                            <History className="w-6 h-6" />
                        </button>
                    </div>
                </div>
                <div className={openList ? 'sm:hidden grid' : 'hidden'}>
                    <button
                        className="p-3 text-red-500 flex items-center gap-2 hover:bg-red-50 transition border border-gray-100"
                        aria-label="Favorite"
                    >
                        <Heart className="w-6 h-6" />
                        <span className='font-[500]'>Favorit</span>
                    </button>
                    <button
                        className={`p-3 ${color?.text600} ${color?.hoverBg50} flex items-center gap-2 transition border border-gray-100`}
                        aria-label="Order/Keranjang"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        <span className='font-[500]'>Keranjang</span>
                    </button>
                    <button
                        className="p-3 text-slate-600 hover:bg-gray-100 flex items-center gap-2 transition border border-gray-100"
                        aria-label="History Order"
                    >
                        <History className="w-6 h-6" />
                        <span className='font-[500]'>Histori</span>
                    </button>
                </div>
            </header>

            <div className="w-full shadow-2xl overflow-hidden">
                <div className={`p-20 text-center ${bg} ${text} italic`}>
                    Konten Website...
                </div>
                <div className="sm:hidden bg-white border-t border-gray-200 shadow-2xl z-20 p-3">
                    <div className="flex justify-around p-1 bg-gray-100 rounded-xl border border-gray-200">
                        <button
                            onClick={() => setIsService(false)}
                            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${!isService ? `${color?.bg600} text-white shadow-md` : 'text-slate-600'
                                }`}
                        >
                            Produk
                        </button>
                        <button
                            onClick={() => setIsService(true)}
                            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${isService ? `${color?.bg600} text-white shadow-md` : 'text-slate-600'
                                }`}
                        >
                            Layanan Jasa Desain
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Eight