import React from 'react'
import getColorClass from './getColorClass';
import showNotification from './showNotification';
import { ColorKey, product } from '@/lib/Types/Theme/Eight';
import { Check, X } from 'lucide-react';

type Props = {
    service: product;
    isOpen: boolean;
    onClose: () => void;
    primaryColor: string;
}

const ServiceDetailModal = ({ service, isOpen, onClose, primaryColor }: Props) => {
    const colorClass = getColorClass(primaryColor);
    const bgColorClass = colorClass.split(' ').find(c => c.startsWith('bg-')) || 'bg-teal-600';
    const hoverBgClass = colorClass.split(' ').find(c => c.startsWith('hover:bg-')) || 'hover:bg-teal-700';
    const shadowClass = colorClass.split(' ').find(c => c.startsWith('shadow-')) || 'shadow-teal-300/50';
    const textClass = colorClass.split(' ').find(c => c.startsWith('text-')) || 'text-teal-600';

    if (!isOpen || !service) return null;

    const handleInquiry = () => {
        showNotification({
            message: `Inkuiri untuk jasa ${service.name} berhasil dikirim!`,
            isError: false,
            primaryColor: primaryColor as ColorKey
        });
        onClose();
    };

    let deliverables = [];
    if (service.id === 101) deliverables = ['1 Konsep Logo Utama', '2x Revisi Desain', 'File Source (AI/EPS)', 'PNG Transparan Resolusi Tinggi'];
    else if (service.id === 104) deliverables = ['Desain 1 Sisi Eksklusif', 'File Siap Cetak (PDF & AI)', '1x Revisi Warna & Tipografi'];
    else if (service.id === 105) deliverables = ['1 Set Banner (3 Ukuran Berbeda)', 'File JPG/PNG Optimasi Web', 'Targeting Audiens Dasar'];
    else if (service.id === 102) deliverables = ['Desain UI/UX Kustom', 'Integrasi Payment Gateway', 'Optimasi SEO Dasar', 'Training Penggunaan Admin', 'Responsif untuk Mobile & Desktop'];
    else if (service.id === 103) deliverables = ['Rencana Konten 1 Bulan', '10 Desain Grafis Postingan', 'Analitik Performanya Mingguan', 'Caption Writing Profesional'];
    else if (service.id === 106) deliverables = ['Logo Korporat Premium', 'Desain Kartu Nama & Kop Surat', 'Panduan Merek Lengkap (PDF)', 'Template Media Sosial 3x'];
    else deliverables = ['Detail tidak tersedia.'];


    return (
        // Outer Wrapper: Menggunakan flex items-end untuk bottom sheet di mobile
        <div className="fixed inset-0 bg-gray-900/75 z-50 flex items-end sm:items-center justify-center transition-opacity duration-300 p-0 sm:p-4">

            {/* Modal Content - Mobile Bottom Sheet */}
            <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-xl 
                            h-[95vh] sm:h-auto max-h-[95vh] sm:max-h-[90vh] 
                            overflow-hidden transform transition-all duration-300 scale-100 flex flex-col">

                {/* Close Button Mobile (Header/Pull handle) */}
                <div className="sm:hidden flex justify-center pt-3 pb-1 flex-shrink-0" onClick={onClose} >
                    <button className="w-12 h-1 bg-gray-300 rounded-full"></button> {/* Handle/gagang */}
                </div>

                {/* Content Section - Scrollable */}
                <div className="p-6 pt-4 sm:pt-6 flex-grow overflow-y-auto no-scrollbar">

                    {/* Header/Title */}
                    <div className="flex justify-between items-start border-b border-gray-300 pb-4 mb-4 flex-shrink-0">
                        <h3 className="text-3xl font-extrabold text-slate-800">{service.name}</h3>
                        <button onClick={onClose} className="hidden sm:block p-2 rounded-full text-gray-500 hover:bg-gray-100 transition">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <img
                            src={service.imageUrl}
                            alt={service.name}
                            className="w-full h-48 object-cover rounded-xl mb-4 shadow-md"
                        // onError={(e) => e.currentTarget.src = `https://placehold.co/400x192/${colorThemes[primaryColor].hex.replace('#', '')}/FFFFFF?text=SERVICE+IMAGE`}
                        />
                        <p className={`text-4xl font-black ${textClass}`}>
                            {service.type === 'Package' ? 'Mulai dari Rp' : 'Rp'} {service.price.toLocaleString('id-ID')}
                        </p>
                        <p className={`text-xs font-bold p-1 w-max rounded-full px-3 ${service.type === 'Package' ? 'bg-indigo-100 text-indigo-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {service.type === 'Package' ? 'PAKET LAYANAN' : 'LAYANAN SATUAN'}
                        </p>
                        <p className="text-md text-slate-700 leading-relaxed">{service.desc}</p>

                        {/* Deliverables/Included Features */}
                        <div className="pt-4 border-t border-gray-100">
                            <label className="block text-sm font-semibold text-slate-700 mb-3">Apa yang Anda Dapatkan:</label>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-gray-700">
                                {deliverables.map((item, index) => (
                                    <li key={index} className="flex items-start text-sm">
                                        <Check className={`${textClass} w-4 h-4 mr-2 mt-1 flex-shrink-0`} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sticky Footer Aksi (All screens) */}
                <div className="p-4 sm:p-6 bg-white border-t border-gray-100 flex-shrink-0">
                    <button
                        onClick={handleInquiry}
                        className={`w-full py-3 text-lg font-bold text-white rounded-xl shadow-lg ${shadowClass} ${bgColorClass} ${hoverBgClass} transition duration-150`}
                    >
                        Konsultasi Gratis & Pesan Jasa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailModal