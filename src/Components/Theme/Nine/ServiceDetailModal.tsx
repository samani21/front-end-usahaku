import React, { useState } from 'react'
import CenterModal from './CenterModal';
import { useTheme } from './useTheme';
import { Service } from '@/lib/Types/Theme/Nine';


interface ServiceDetailModalProps {
    service: Service | null;
    onClose: () => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const { theme } = useTheme();

    if (!service) return null;

    // Menggunakan konsol.log atau modal kustom sebagai ganti alert()
    const handleOrder = () => {
        console.log(`Memesan ${quantity}x ${service.name} seharga Rp${(service.price * quantity).toLocaleString('id-ID')}. (Fitur pemesanan sesungguhnya ada di backend)`);
        onClose();
        setQuantity(1);
    };

    return (
        <CenterModal isOpen={!!service} onClose={onClose} title={`Detail ${service.name}`}>
            <div className="space-y-4">
                <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-40 object-cover rounded-xl"
                />
                <p className={`text-2xl font-extrabold text-${theme.text}`}>
                    Rp{service.price.toLocaleString('id-ID')}
                    <span className="text-sm font-medium text-gray-500 ml-2">/{service.type === 'Paket' ? 'paket' : 'layanan'}</span>
                </p>
                <p className="text-gray-700 text-sm">{service.description}</p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-300">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                        >
                            -
                        </button>
                        <span className="font-semibold text-lg">{quantity}</span>
                        <button
                            onClick={() => setQuantity(q => q + 1)}
                            className={`p-2 bg-${theme.primary} text-white rounded-full hover:bg-${theme.primaryHover} transition`}
                        >
                            +
                        </button>
                    </div>
                    <button
                        onClick={handleOrder}
                        className={`flex items-center justify-center px-4 py-2 bg-${theme.primary} text-white font-semibold rounded-lg shadow-md hover:bg-${theme.primaryHover} transition`}
                    >
                        Pesan Sekarang ({quantity})
                    </button>
                </div>
            </div>
        </CenterModal>
    );
};

export default ServiceDetailModal