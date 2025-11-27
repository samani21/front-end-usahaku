import { Service, THEMES } from '@/lib/Types/Theme/Ten';
import { X } from 'lucide-react';
import React, { FC } from 'react'

interface DetailModalProps {
    service: Service | null;
    isOpen: boolean;
    onClose: () => void;
    themeColor: string;
    handleAddToCart: (services: Service) => void
    getThemeClass: (intensity: number, prefix?: string) => void
}
const DetailModal: FC<DetailModalProps> = ({ service, isOpen, onClose, themeColor, getThemeClass, handleAddToCart }) => {
    if (!isOpen || !service) return null;

    const currentTheme = THEMES.find(t => t.primary === themeColor);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">{service.name}</h2>
                        <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100" onClick={onClose} aria-label="Tutup Detail">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="mb-4">
                        <img
                            src={service.imageUrl}
                            alt={service.name}
                            className="w-full h-48 object-cover rounded-lg mb-3"
                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                (e.target as HTMLImageElement).onerror = null;
                                (e.target as HTMLImageElement).src = `https://placehold.co/400x192/${currentTheme?.colorCode.replace('#', '')}/FFFFFF?text=DETAIL`;
                            }}
                        />
                        <p className={`text-3xl font-extrabold ${getThemeClass(600)} mt-2`}>
                            Rp {service.price.toLocaleString('id-ID')}
                        </p>
                        <p className="text-gray-500 mt-2">{service.desc}</p>
                        <p className="text-sm text-gray-600 mt-1">Kategori: <span className={`font-medium ${getThemeClass(600)}`}>{service.category}</span></p>
                        <p className="text-sm text-gray-600">Jenis: <span className={`font-medium ${getThemeClass(600)}`}>{service.type}</span></p>
                    </div>

                    <button
                        onClick={() => handleAddToCart(service)}
                        className={`w-full py-3 ${getThemeClass(600, 'bg')} text-white text-lg font-semibold rounded-xl shadow-lg hover:${getThemeClass(700, 'bg')} transition duration-300 transform hover:scale-[1.01]`}
                    >
                        Tambah ke Keranjang
                    </button>
                </div>
            </div>
        </div>
    );
};
export default DetailModal