import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { ChevronRight, MapPin } from 'lucide-react';
import React from 'react'

type Props = {
    color: ThemeColorSet;
    clientQueueNumber?: number;
    currentQueueNumber?: number;

}

const MapTableTwo = ({ color, clientQueueNumber, currentQueueNumber }: Props) => {
    return (
        <section className="mb-8">
            <div className={`p-5 rounded-2xl shadow-xl border-l-4 ${color?.border700} ${color?.bg100} flex justify-between items-center transition-all duration-300`}>
                {/* Kiri: Teks & Informasi */}
                <div className="flex flex-col">
                    <h1 className={`text-xl font-bold ${color?.text700}`}>
                        Antrian saat ini: <b>{currentQueueNumber}</b>
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Anda berada di <b>Meja</b>: <b>08</b>
                    </p>
                    <p className="text-xs text-gray-500">
                        Antrian Anda saat ini: <b>{clientQueueNumber}</b>
                    </p>
                </div>
                {/* Kanan: Ikon & Aksi (Ajakan Memesan) */}
                <div className="flex items-center space-x-2">
                    <span className={`hidden sm:inline-block text-sm font-medium ${color?.text700}`}>
                        Mulai Pesan
                    </span>
                    <ChevronRight size={24} className={`animate-move-right ${color?.text700}`} />
                </div>
            </div>
        </section>
    )
}

export default MapTableTwo