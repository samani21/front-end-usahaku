import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Clock, Plus, Ticket } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    color: ThemeColorSet;
}

const Four = ({ color }: Props) => {
    const clientQueueNumber = 10;
    const [currentQueueNumber, setCurrentQueueNumber] = useState<number>(3);
    return (
        <section id="antrian" className="bg-white py-10 sm:py-16 shadow-xl rounded-2xl mt-8">
            <div className="container mx-auto px-4 text-center">
                <Clock className={`w-10 h-10 ${color?.text500} mx-auto mb-3`} />
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Status Antrian Layanan (Simulasi)</h2>
                {/* --- NO. ANTRIAN SAYA (UPDATE) --- */}
                <div className="max-w-lg mx-auto mb-8">
                    {(clientQueueNumber || 0) > 0 ? (
                        <div className="bg-yellow-50 p-6 rounded-xl shadow-md border-4 border-yellow-400 transform transition-all duration-300 scale-100">
                            <h3 className="text-xl font-bold text-yellow-700 mb-2 flex items-center justify-center">
                                <Ticket className="w-6 h-6 mr-2" /> No. Antrian Saya
                            </h3>
                            <span className="text-6xl font-extrabold text-yellow-600">{clientQueueNumber}</span>
                            <p className="text-sm text-yellow-800 mt-2">Antrian ini berlaku untuk pesanan Anda yang terakhir.</p>
                        </div>
                    ) : (
                        <div className="bg-gray-100 p-6 rounded-xl shadow-md border border-gray-300">
                            <h3 className="text-lg font-semibold text-gray-600 mb-2 flex items-center justify-center">
                                <Ticket className="w-6 h-6 mr-2" /> Anda Belum Memiliki Antrian
                            </h3>
                            <p className="text-sm text-gray-500">Pesan layanan melalui Keranjang untuk mendapatkan nomor antrian.</p>
                        </div>
                    )}
                </div>
                {/* --- AKHIR NO. ANTRIAN SAYA --- */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
                    {/* Antrian Berjalan */}
                    <div className="bg-green-100 p-6 rounded-xl shadow-inner border-4 border-green-500">
                        <h3 className="text-lg font-semibold text-green-700 mb-2">Antrian Sedang Berjalan</h3>
                        <span className="text-5xl font-extrabold text-green-600">{(clientQueueNumber || 0) > 0 ? currentQueueNumber : 0}</span>
                    </div>

                    {/* Total Antrian */}
                    <div className={`${color?.bg50} p-6 rounded-xl shadow-inner border-4 ${color?.border500}`}>
                        <h3 className={`text-lg font-semibold ${color?.text700} mb-2`}>Nomor Antrian Total</h3>
                        <span className={`text-5xl font-extrabold ${color?.text600}`}>{clientQueueNumber}</span>
                    </div>
                </div>

                <div className="mt-8">
                    <p className="text-sm text-gray-600 mb-3">
                        *Tombol ini memajukan antrian hanya simulasi.
                    </p>
                    <button
                        onClick={() => setCurrentQueueNumber(currentQueueNumber + 1)}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-lg text-white bg-red-500 hover:bg-red-600 transition duration-300 transform hover:scale-105 disabled:bg-gray-400"
                        disabled={(currentQueueNumber || 0) >= (clientQueueNumber || 0)}
                    >
                        <Plus className="w-5 h-5 mr-2" /> Panggil Antrian Selanjutnya
                    </button>
                </div>

            </div>
        </section>
    )
}

export default Four