import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { CheckCircle, MapPin, RefreshCw, Settings } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    color: ThemeColorSet;
    span1?: string;
}
const today = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
});

const One = ({ color, span1 }: Props) => {
    const clientQueueNumber = 10;
    const [currentQueueNumber, setCurrentQueueNumber] = useState<number>(3);
    return (

        <>
            {
                currentQueueNumber < clientQueueNumber ?
                    <div className={`${color?.bg100} p-4 rounded-xl shadow-md mb-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 ${color?.text800}`}>
                        <div className='flex items-center space-x-2'>
                            <MapPin size={20} />
                            <span className="font-bold">{span1 ? span1 : "Posisi Meja:"} A-08</span>
                        </div>
                        <div className='flex space-x-4 text-sm font-medium'>
                            <span>Antrian Pesanan: <span className={`font-bold ${color?.text600}`}>{clientQueueNumber}</span></span>
                            <span>Antrian Sekarang: <span className={`font-bold ${color?.text600}`}>{currentQueueNumber}</span></span>
                        </div>

                    </div> :
                    <div className={`bg-green-100 p-4 rounded-xl shadow-md mb-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 text-gray-800`}>
                        <div className='flex items-center space-x-2'>
                            <MapPin size={20} />
                            <span className="font-bold">Posisi Meja: A-08</span>
                        </div>
                        <div className='flex space-x-2 items-center text-sm font-bold text-green-900'>
                            <CheckCircle />
                            <span>Sekarang Antrian Anda</span>
                        </div>

                    </div>
            }
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Settings size={18} /> Simulasi
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                        <input
                            type="text"
                            value={today}
                            readOnly
                            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />

                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Antrian Anda</label>
                        <input
                            type="number"
                            value={currentQueueNumber}
                            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                    <button
                        onClick={() => setCurrentQueueNumber(currentQueueNumber + 1)}
                        className="w-full py-2 bg-gray-800 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
                    >
                        <RefreshCw size={16} />Selanjut nya
                    </button>
                </div>
            </div>
        </>
    )
}

export default One