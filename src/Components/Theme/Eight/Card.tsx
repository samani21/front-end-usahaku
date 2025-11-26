import { ColorKey, product } from '@/lib/Types/Theme/Eight'
import React from 'react'
import getColorClass from './getColorClass';

type Props = {
    item: product,
    onClick: (item: product) => void,
    isProduct: boolean,
    primaryColor: ColorKey
}

const Card = ({ item, onClick, isProduct, primaryColor }: Props) => {
    const colorClass = getColorClass(primaryColor);
    const bgColorClass = colorClass.split(' ').find(c => c.startsWith('bg-')) || 'bg-teal-600';
    const hoverBgClass = colorClass.split(' ').find(c => c.startsWith('hover:bg-')) || 'hover:bg-teal-700';
    const shadowClass = colorClass.split(' ').find(c => c.startsWith('shadow-')) || 'shadow-teal-300/50';
    const textClass = colorClass.split(' ').find(c => c.startsWith('text-')) || 'text-teal-600';

    return (
        <div
            className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
            onClick={() => onClick(item)}
        >
            <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-40 object-cover"
            // onError={(e) => e.currentTarget.src = isProduct ? `https://placehold.co/400x160/${colorThemes[primaryColor].hex.replace('#', '')}/FFFFFF?text=PRODUCT` : "https://placehold.co/400x160/CFD8DC/37474F?text=SERVICE"}
            />
            <div className="p-4 flex flex-col h-[calc(100%-10rem)]">
                <p className="text-xs font-medium text-gray-500 mb-1 tracking-wider uppercase">{item.category}</p>
                <h4 className="text-xl font-bold text-slate-800 mb-2 truncate">{item.name}</h4>

                {/* Tambahan badge tipe layanan (Hanya untuk jasa/service) */}
                {!isProduct && item.type && (
                    <p className={`text-xs font-semibold p-1 w-max rounded px-2 mb-2 ${item.type === 'Package' ? 'bg-indigo-100 text-indigo-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {item.type === 'Package' ? 'PAKET' : 'SATUAN'}
                    </p>
                )}

                <div className="mt-auto"> {/* Untuk menempatkan harga dan tombol di bawah */}
                    <p className={`md:text-2xl font-black ${textClass} mb-4`}>
                        {isProduct ? 'Rp' : (item.type === 'Package' ? 'Mulai dari Rp' : 'Rp')} {item.price.toLocaleString('id-ID')}
                    </p>
                    <button
                        className={`w-full py-2 text-md font-semibold text-white rounded-lg transition ${bgColorClass} ${hoverBgClass} shadow-md ${shadowClass}`}
                    >
                        Lihat Detail
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card