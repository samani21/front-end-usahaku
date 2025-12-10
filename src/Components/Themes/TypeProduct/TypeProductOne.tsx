import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Check, Layers, Package } from 'lucide-react';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    handlePackage: (val: boolean | string) => void;
    isPackage: boolean | string
}

const TypeProductOne = ({ handlePackage, isPackage, color }: Props) => {
    return (
        <section className="mb-8">
            <h2 className={`text-2xl font-bold text-slate-800 mb-4 border-b-2 ${color?.border600} pb-2`}>Filter Tipe Layanan</h2>
            <div className="flex flex-wrap gap-4">
                <button
                    onClick={() => handlePackage?.('All')}
                    className={`px-5 py-2 text-sm font-semibold rounded-full flex items-center transition duration-150 border-2 ${isPackage === 'All'
                        ? `${color?.bg600} text-white ${color?.border600} shadow-md`
                        : `bg-white text-slate-700 ${color?.hoverBg50} border-gray-300 ${color?.hoverBorder300}`
                        }`}
                >
                    <Layers className="w-4 h-4 mr-2" /> Semua Layanan
                </button>
                <button
                    onClick={() => handlePackage?.(false)}
                    className={`px-5 py-2 text-sm font-semibold rounded-full flex items-center transition duration-150 border-2 ${isPackage === false
                        ? `${color?.bg600} text-white ${color?.border600} shadow-md`
                        : `bg-white text-slate-700 ${color?.hoverBg50} border-gray-300 ${color?.hoverBorder300}`
                        }`}
                >
                    <Check className="w-4 h-4 mr-2" /> Layanan Satuan
                </button>
                <button
                    onClick={() => handlePackage?.(true)}
                    className={`px-5 py-2 text-sm font-semibold rounded-full flex items-center transition duration-150 border-2 ${isPackage === true
                        ? `${color?.bg600} text-white ${color?.border600} shadow-md`
                        : `bg-white text-slate-700 ${color?.hoverBg50} border-gray-300 ${color?.hoverBorder300}`
                        }`}
                >
                    <Package className="w-4 h-4 mr-2" /> Paket Layanan
                </button>
            </div>
        </section>
    )
}

export default TypeProductOne