// src/Context/AlertContext.tsx

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { CurrentAlert } from '@/lib/alert'; // Pastikan path ke CurrentAlert sudah benar

// 1. Definisikan Tipe Context
interface AlertContextType {
    currentAlert: CurrentAlert | null;
    setCurrentAlert: React.Dispatch<React.SetStateAction<CurrentAlert | null>>;
    showFinalAlert: (type: 'success' | 'error', title: string, message: string) => void;
    simulateProcess: () => void;
}

// 2. Buat Context
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// 3. Buat Provider (Fungsi yang menampung State Logic)
// Kita akan pindahkan semua logika state alert dari MainLayout ke sini.
export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentAlert, setCurrentAlert] = useState<CurrentAlert | null>(null);

    const closeAlert = useCallback(() => setCurrentAlert(null), []);

    const showFinalAlert = useCallback((type: 'success' | 'error', title: string, message: string) => {
        setCurrentAlert({ type, title, message });
        setTimeout(closeAlert, 5000);
    }, [closeAlert]);

    const simulateProcess = useCallback(() => {
        setCurrentAlert({
            type: 'loading',
            title: 'Sedang Memproses Data...',
            message: 'Harap tunggu sebentar, data Anda sedang divalidasi dan disimpan.'
        });

        // setTimeout(() => {
        //     const success = Math.random() > 0.5;

        //     if (success) {
        //         showFinalAlert(
        //             'success',
        //             'Proses Selesai!',
        //             'Data berhasil disimpan di server dan Anda dapat melanjutkan.'
        //         );
        //     } else {
        //         showFinalAlert(
        //             'error',
        //             'Gagal Koneksi!',
        //             'Server tidak merespon dalam waktu yang ditentukan. Coba lagi.'
        //         );
        //     }
        // }, 3000);
    }, [showFinalAlert]);


    const contextValue: AlertContextType = {
        currentAlert,
        setCurrentAlert,
        showFinalAlert,
        simulateProcess,
    };

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
        </AlertContext.Provider>
    );
};

// 4. Buat Hook Kustom untuk Digunakan di Komponen Anak
export const useAlert = () => {
    const context = useContext(AlertContext);
    if (context === undefined) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};