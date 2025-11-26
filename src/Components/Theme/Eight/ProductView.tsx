import { ColorKey, mockProducts, product } from '@/lib/Types/Theme/Eight';
import React, { useMemo, useState } from 'react'
import getColorClass from './getColorClass';
import Card from './Card';

type Props = {
    openDetailModal: (item: product) => void,
    primaryColor: ColorKey
}

const ProductView = ({ openDetailModal, primaryColor }: Props) => {
    const categories = useMemo(() => ['Semua', ...new Set(mockProducts.map(p => p.category))], []);
    const [activeCategory, setActiveCategory] = useState('Semua');
    const colorClass = getColorClass(primaryColor);
    const bgColorClass = colorClass.split(' ').find(c => c.startsWith('bg-')) || 'bg-teal-600';
    const hoverBgClass = colorClass.split(' ').find(c => c.startsWith('hover:bg-')) || 'hover:bg-teal-700';
    const shadowClass = colorClass.split(' ').find(c => c.startsWith('shadow-')) || 'shadow-teal-300/50';
    const textClass = colorClass.split(' ').find(c => c.startsWith('text-')) || 'text-teal-600';
    const borderClass = colorClass.split(' ').find(c => c.startsWith('border-')) || 'border-teal-600';
    const hoverColorClass = colorClass.split(' ').find(c => c.includes('hover:bg-'))?.replace('hover:bg-', 'hover:bg-') || 'hover:bg-teal-50';
    const hoverBorderClass = colorClass.split(' ').find(c => c.includes('hover:border-')) || 'hover:border-teal-300';

    const filteredProducts = useMemo(() => {
        if (activeCategory === 'Semua') return mockProducts;
        return mockProducts.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    return (
        <main className="container mx-auto p-4 md:p-8 mb-20"> {/* Ditambah mb-20 untuk memberi ruang footer mobile */}
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-slate-700 to-slate-900 p-8 md:p-12 rounded-2xl mb-12 shadow-2xl">
                <p className={`text-white text-lg font-bold mb-1`}>PRODUK PREMIUM</p>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                    Katalog Koleksi Terbaik Kami
                </h1>
                <p className="text-slate-300 max-w-3xl text-lg">
                    Jelajahi pilihan produk dengan kualitas tanpa kompromi, dirancang untuk melengkapi gaya hidup profesional Anda.
                </p>
                <button className={`mt-6 px-6 py-3 text-white font-semibold rounded-lg transition duration-150 shadow-lg ${shadowClass} ${bgColorClass} ${hoverBgClass}`}>
                    Lihat Penawaran Spesial
                </button>
            </section>

            {/* Kategori */}
            <section className="mb-10">
                <h2 className={`text-2xl font-bold text-slate-800 mb-4 border-b-2 ${borderClass} pb-2`}>Kategori Produk</h2>
                <div className="flex flex-wrap gap-3 overflow-x-auto pb-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 text-sm font-medium rounded-full transition duration-150 whitespace-nowrap border-2 ${activeCategory === cat
                                ? `${bgColorClass} text-white ${borderClass} shadow-md`
                                : `bg-white text-slate-700 ${hoverColorClass} border-gray-300 ${hoverBorderClass}`
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Daftar Produk */}
            <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Produk Pilihan Lainnya</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredProducts.map(product => (
                        <Card key={product.id} item={product} onClick={openDetailModal} isProduct={true} primaryColor={primaryColor} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default ProductView