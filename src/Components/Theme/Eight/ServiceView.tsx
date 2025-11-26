import { ColorKey, colorThemes, mockServices, product } from '@/lib/Types/Theme/Eight';
import React, { useMemo, useState } from 'react'
import getColorClass from './getColorClass';
import { Check, Layers, Package } from 'lucide-react';
import Card from './Card';

type Props = {
    openDetailModal: (item: product) => void;
    primaryColor: ColorKey;
}
const ServiceView = ({ openDetailModal, primaryColor }: Props) => {
    // Kategori Layanan
    const categories = useMemo(() => ['Semua', ...new Set(mockServices.map(s => s.category))], []);
    const [activeCategory, setActiveCategory] = useState('Semua');

    // Tipe Layanan (Satuan atau Paket)
    const [activeType, setActiveType] = useState('All'); // 'All', 'Individual', 'Package'

    const colorClass = getColorClass(primaryColor);
    const bgColorClass = colorClass.split(' ').find(c => c.startsWith('bg-')) || 'bg-teal-600';
    const hoverBgClass = colorClass.split(' ').find(c => c.startsWith('hover:bg-')) || 'hover:bg-teal-700';
    const shadowClass = colorClass.split(' ').find(c => c.startsWith('shadow-')) || 'shadow-teal-300/50';
    const textClass = colorClass.split(' ').find(c => c.startsWith('text-')) || 'text-teal-600';
    const borderClass = colorClass.split(' ').find(c => c.startsWith('border-')) || 'border-teal-600';
    const hoverColorClass = colorClass.split(' ').find(c => c.includes('hover:bg-'))?.replace('hover:bg-', 'hover:bg-') || 'hover:bg-teal-50';
    const hoverBorderClass = colorClass.split(' ').find(c => c.includes('hover:border-')) || 'hover:border-teal-300';


    const filteredServices = useMemo(() => {
        let filtered = mockServices;

        // Filter berdasarkan Tipe Layanan
        if (activeType !== 'All') {
            filtered = filtered.filter(s => s.type === activeType);
        }

        // Filter berdasarkan Kategori
        if (activeCategory !== 'Semua') {
            filtered = filtered.filter(s => s.category === activeCategory);
        }

        return filtered;
    }, [activeType, activeCategory]);

    return (
        <main className="container mx-auto p-4 md:p-8 mb-20"> {/* Ditambah mb-20 untuk memberi ruang footer mobile */}
            {/* Hero Section */}
            <section className={`p-8 md:p-12 rounded-2xl mb-12 shadow-2xl`} style={{
                backgroundImage: `linear-gradient(to right, ${colorThemes[primaryColor].hex}, ${colorThemes[primaryColor].hex.slice(0, 5)}90)`,
                backgroundSize: 'cover'
            }}>
                <p className="text-white text-lg font-medium mb-1">SOLUSI KREATIF & DESAIN</p>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                    Tingkatkan Brand Anda dengan Jasa Profesional
                </h1>
                <p className={`text-white max-w-3xl text-lg opacity-80`}>
                    Kami menyediakan layanan desain dan pengembangan digital yang disesuaikan dengan kebutuhan bisnis Anda.
                </p>
                <button className={`mt-6 px-6 py-3 bg-white ${textClass} font-semibold rounded-lg hover:bg-gray-100 transition duration-150 shadow-lg`}>
                    Mulai Konsultasi
                </button>
            </section>

            {/* Filter Tipe Layanan (Baru) */}
            <section className="mb-8">
                <h2 className={`text-2xl font-bold text-slate-800 mb-4 border-b-2 ${borderClass} pb-2`}>Filter Tipe Layanan</h2>
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={() => setActiveType('All')}
                        className={`px-5 py-2 text-sm font-semibold rounded-full flex items-center transition duration-150 border-2 ${activeType === 'All'
                            ? `${bgColorClass} text-white ${borderClass} shadow-md`
                            : `bg-white text-slate-700 ${hoverColorClass} border-gray-300 ${hoverBorderClass}`
                            }`}
                    >
                        <Layers className="w-4 h-4 mr-2" /> Semua Layanan
                    </button>
                    <button
                        onClick={() => setActiveType('Individual')}
                        className={`px-5 py-2 text-sm font-semibold rounded-full flex items-center transition duration-150 border-2 ${activeType === 'Individual'
                            ? `${bgColorClass} text-white ${borderClass} shadow-md`
                            : `bg-white text-slate-700 ${hoverColorClass} border-gray-300 ${hoverBorderClass}`
                            }`}
                    >
                        <Check className="w-4 h-4 mr-2" /> Layanan Satuan
                    </button>
                    <button
                        onClick={() => setActiveType('Package')}
                        className={`px-5 py-2 text-sm font-semibold rounded-full flex items-center transition duration-150 border-2 ${activeType === 'Package'
                            ? `${bgColorClass} text-white ${borderClass} shadow-md`
                            : `bg-white text-slate-700 ${hoverColorClass} border-gray-300 ${hoverBorderClass}`
                            }`}
                    >
                        <Package className="w-4 h-4 mr-2" /> Paket Layanan
                    </button>
                </div>
            </section>


            {/* Kategori Jasa (Sub-filter) */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-gray-300 pb-2">Kategori ({activeType === 'Individual' ? 'Satuan' : activeType === 'Package' ? 'Paket' : 'Semua'})</h2>
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

            {/* Daftar Jasa */}
            <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Hasil Jasa ({filteredServices.length})</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredServices.map(service => (
                        <Card key={service.id} item={service} onClick={openDetailModal} isProduct={false} primaryColor={primaryColor} />
                    ))}
                </div>
                {filteredServices.length === 0 && (
                    <div className="text-center p-10 bg-white rounded-xl text-gray-500">
                        <p className="text-xl font-semibold">Tidak ada layanan yang cocok.</p>
                        <p className="text-sm">Coba ubah filter Tipe Layanan atau Kategori.</p>
                    </div>
                )}
            </section>
        </main>
    );
};


export default ServiceView