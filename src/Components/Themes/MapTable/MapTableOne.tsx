import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { MapPin } from 'lucide-react';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    clientQueueNumber?: number;
    currentQueueNumber?: number;

}

const MapTableOne = ({ color, clientQueueNumber, currentQueueNumber }: Props) => {
    return (
        <div className={`${color?.bg100} p-4 rounded-xl shadow-md mb-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 ${color?.text800}`}>
            <div className='flex items-center space-x-2'>
                <MapPin size={20} />
                <span className="font-bold">Posisi Meja: A-08</span>
            </div>
            <div className='flex space-x-4 text-sm font-medium'>
                <span>Antrian Pesanan: <span className={`font-bold ${color?.text600}`}>{clientQueueNumber}</span></span>
                <span>Antrian Sekarang: <span className={`font-bold ${color?.text600}`}>{(clientQueueNumber || 0) > 0 ? currentQueueNumber : 0}</span></span>
            </div>
        </div>
    )
}

export default MapTableOne