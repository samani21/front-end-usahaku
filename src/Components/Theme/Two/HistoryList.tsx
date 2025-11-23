import { DUMMY_HISTORY } from '@/lib/Types/Theme/Two';
import { Clock } from 'lucide-react';
import React from 'react'

const HistoryList: React.FC = () => (
    <div className="space-y-4">
        <div className="flex items-center text-gray-500">
            <Clock size={20} className="mr-2" />
            <p className="font-medium">2 Riwayat Transaksi Terakhir</p>
        </div>
        <ul className="divide-y divide-gray-200 bg-white p-2 rounded-lg shadow-inner border border-gray-100">
            {DUMMY_HISTORY.map(history => (
                <li key={history.id} className="py-3 flex justify-between items-center text-gray-700 px-2">
                    <div>
                        <p className="font-medium text-gray-800">Order #{history.id} - {history.items} Item</p>
                        <p className="text-xs text-gray-500">{history.date}</p>
                    </div>
                    <div className="text-right">
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${history.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                            {history.status}
                        </span>
                        <p className="text-sm font-bold mt-1">Rp{history.total.toLocaleString('id-ID')}</p>
                    </div>
                </li>
            ))}
        </ul>
        <p className="text-sm text-center text-gray-500 mt-6">
            Semua riwayat pemesanan Anda tersimpan di sini.
        </p>
    </div>
);


export default HistoryList