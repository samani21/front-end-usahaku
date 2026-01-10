import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { ChevronRight } from 'lucide-react';
import React, { useMemo, useState } from 'react'

type Props = {
    color: ThemeColorSet;
    span1?: string;
    span2?: string;
}

const Three = ({ color, span1, span2 }: Props) => {
    const clientQueueNumber = 10;
    const [currentQueueNumber, setCurrentQueueNumber] = useState<number>(3);
    const queueStatus = useMemo(() => {
        if (clientQueueNumber === currentQueueNumber) {
            return { text: "Giliran Anda Sekarang!", color: "bg-red-500 text-white" };
        }
        if ((clientQueueNumber || 0) < (currentQueueNumber || 0)) {
            return { text: "Anda Sudah Terlewat", color: "bg-yellow-500 text-gray-800" };
        }
        const diff = (clientQueueNumber || 0) - (currentQueueNumber || 0);
        return { text: `${diff} antrian lagi sebelum Anda.`, color: "bg-white text-gray-700" };
    }, [clientQueueNumber, currentQueueNumber]);
    return (
        <section className="mb-12">
            <div className={`${color?.bg500} p-8 md:p-12 rounded-2xl text-white shadow-xl`}>
                <div className="md:flex md:justify-between md:items-start space-y-6 md:space-y-0">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">
                            {span1 ? span1 : " Temukan Layanan Terbaik Anda"}
                        </h2>
                        <p className="text-white/80 text-lg">
                            {span2 ? span2 : "Potong rambut, laundry, atau lainnya. Semua dalam satu klik!"}
                        </p>
                        {/* Menampilkan Status Antrian */}
                        <div className={`mt-4 inline-block p-2 rounded-lg font-semibold shadow-md ${queueStatus.color}`}>
                            {queueStatus.text}
                        </div>
                    </div>

                    {/* Tampilan Nomor Antrian */}
                    <div className="flex items-center gap-2">

                        {/* Antrian Pelanggan */}
                        <div className={`bg-white ${color?.text600} p-4 rounded-xl shadow-lg flex-1 min-w-[150px]`}>
                            <p className="text-sm font-medium text-gray-500">Nomor Anda</p>
                            <p className="text-4xl font-bold">{clientQueueNumber}</p>
                        </div>
                        <div className={`bg-white ${color?.text600} p-4 rounded-xl shadow-lg flex-1 min-w-[150px]`}>
                            <p className="text-sm font-medium text-gray-500">Sedang Berjalan</p>
                            <p className="text-4xl font-bold text-red-600">{currentQueueNumber}</p>
                        </div>

                    </div>
                </div>

                {/* Tombol Simulasi Maju Antrian (Opsional, untuk demo) */}
                <div className="mt-6 pt-4 border-t border-white/40">
                    <p className="text-sm font-medium mb-2">Simulasi Petugas Antrian:</p>
                    <button
                        onClick={() => setCurrentQueueNumber(currentQueueNumber + 1)}
                        className={`flex items-center px-4 py-2 bg-white ${color?.text600} font-semibold rounded-lg shadow-md hover:bg-gray-100 transition`}
                    >
                        Panggil Antrian Berikutnya ({(currentQueueNumber || 0) + 1})
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Three