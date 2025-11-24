import { Service, ThemeConfig } from '@/lib/Types/Theme/Sevent';
import { ChevronRight } from 'lucide-react';
import React from 'react'
interface ServiceCardProps {
    service: Service;
    onClick: (service: Service) => void;
    theme: ThemeConfig;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick, theme }) => {
    const formatPrice = (price: number): string => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

    const handleDetailClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClick(service);
    };

    return (
        <div
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full"
            onClick={() => onClick(service)}
        >
            <div className="h-40 bg-gray-100 overflow-hidden">
                <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // Mencegah loop tak terbatas
                        target.src = 'https://placehold.co/400x300/94a3b8/ffffff?text=Gagal+Muat'; // Placeholder fallback
                    }}
                />
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                    <span className={`text-xs font-medium ${theme.cardAccentText} ${theme.cardAccentBg} px-2 py-0.5 rounded-full mb-1 inline-block`}>
                        {service.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{service.name}</h3>
                    {service.desc && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-3">{service.desc}</p>
                    )}
                </div>
                <div className="mt-2 flex justify-between items-center">
                    <span className={`text-xl font-extrabold ${theme.mainText}`}>
                        {formatPrice(service.price)}
                    </span>
                    <button
                        className={`text-sm font-semibold ${theme.mainText} hover:opacity-80 transition flex items-center`}
                        onClick={handleDetailClick}
                    >
                        Lihat Detail <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};


export default ServiceCard