import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { CheckCircle, ChevronRight, RefreshCw, Settings } from 'lucide-react';
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

const Two = ({ color, span1 }: Props) => {
    const clientQueueNumber = 10;
    const [currentQueueNumber, setCurrentQueueNumber] = useState<number>(3);
    return (
        <section className="mb-8 space-y-4">
            {
                currentQueueNumber < clientQueueNumber ? <div className={`p-5 rounded-2xl shadow-xl border-l-4 ${color?.border700} ${color?.bg100} flex justify-between items-center transition-all duration-300`}>
                    {/* Kiri: Teks & Informasi */}
                    <div className="flex flex-col">
                        <h1 className={`text-xl font-bold ${color?.text700}`}>
                            Antrian saat ini: <b>{currentQueueNumber}</b>
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                            {span1 ? span1 : "Anda berada di Meja:"} <b>08</b>
                        </p>
                        <p className="text-xs text-gray-500">
                            Antrian anda saat ini: <b>{clientQueueNumber}</b>
                        </p>
                    </div>
                    {/* Kanan: Ikon & Aksi (Ajakan Memesan) */}
                    <div className="flex items-center space-x-2">
                        <span className={`hidden sm:inline-block text-sm font-medium ${color?.text700}`}>
                            Mulai Pesan
                        </span>
                        <ChevronRight size={24} className={`animate-move-right ${color?.text700}`} />
                    </div>
                </div> :
                    <div className='flex items-center justify-center'>
                        <div className="animate-bounce inline-flex flex-col items-center">
                            <div className="bg-emerald-500 text-white p-3 rounded-full mb-3 shadow-lg shadow-emerald-200">
                                <CheckCircle size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Giliran Anda!</h3>
                            {/* <p className="text-gray-500">Silahkan menuju kasir atau pesan menu.</p> */}
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

        </section>
    )
}

export default Two