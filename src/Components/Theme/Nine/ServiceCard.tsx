import React from 'react'
import { useTheme } from './useTheme';
import { Service } from '@/lib/Types/Theme/Nine';

interface ServiceCardProps {
    service: Service;
    onViewDetails: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onViewDetails }) => {
    const { theme } = useTheme();

    return (
        <div
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden transform hover:scale-[1.02]"
            onClick={() => onViewDetails(service)}
        >
            <img
                src={service.image}
                alt={service.name}
                className="w-full h-32 object-cover"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://placehold.co/400x300/334155/ffffff?text=Image+Not+Found";
                }}
            />
            <div className="p-4 flex flex-col justify-between h-[calc(100%-8rem)]">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 truncate">{service.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2 h-10">{service.description || 'Deskripsi singkat layanan.'}</p>
                </div>
                <div className="mt-3 flex justify-between items-center">
                    <span className={`text-xl font-extrabold text-${theme.text}`}>
                        Rp{service.price.toLocaleString('id-ID')}
                    </span>
                    <button
                        className={`px-3 py-1 text-sm rounded-full font-semibold transition duration-200
              ${service.type === 'Paket'
                                ? 'bg-rose-500 text-white hover:bg-rose-600'
                                : `bg-${theme.primary} text-white hover:bg-${theme.primaryHover}`
                            }
            `}
                    >
                        Lihat Detail
                    </button>
                </div>
            </div>
        </div>
    );
};


export default ServiceCard