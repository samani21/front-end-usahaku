import { Service, THEMES } from '@/lib/Types/Theme/Ten';
import React, { FC } from 'react'


interface ServiceCardProps {
    service: Service;
    themeColor: string;
    getThemeClass: (intensity: number, prefix?: string) => void;
    handleOpenDetailModal: (service: Service) => void;
}
const ServiceCard: FC<ServiceCardProps> = ({ service, themeColor, handleOpenDetailModal, getThemeClass }) => {
    const currentTheme = THEMES.find(t => t.primary === themeColor);

    return (
        <div
            onClick={() => handleOpenDetailModal(service)}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full border border-gray-100"
        >
            <div className="relative h-32 bg-gray-100 flex items-center justify-center">
                <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover rounded-t-xl opacity-80"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = `https://placehold.co/100x100/${currentTheme?.colorCode.replace('#', '')}/FFFFFF?text=JASA`;
                    }}
                />
                <div className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full text-white ${service.type === 'Paket Layanan' ? 'bg-orange-500' : `${getThemeClass(500, 'bg')}`}`}>
                    {service.type}
                </div>
            </div>
            <div className="p-4 flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{service.name}</h3>
                <p className={`text-sm ${getThemeClass(600)} font-bold`}>
                    Rp {service.price.toLocaleString('id-ID')}
                </p>
                {service.desc && (
                    <p className="text-xs text-gray-500 mt-2 line-clamp-3">{service.desc}</p>
                )}
            </div>
            <div className="p-4 pt-0">
                <button
                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleOpenDetailModal(service); }}
                    className={`w-full py-2 ${getThemeClass(50, 'bg')} ${getThemeClass(600, 'text')} text-sm font-medium rounded-lg hover:${getThemeClass(100, 'bg')} transition-colors`}>
                    Lihat Detail
                </button>
            </div>
        </div>
    );
};


export default ServiceCard