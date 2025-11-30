import { NotificationState } from '@/lib/Types/Theme/Theme';
import { CheckCircleIcon, XIcon } from 'lucide-react';
import React from 'react'


// --- Komponen Notification Toast ---
interface NotificationOneProps {
    notification: NotificationState;
}

const NotificationOne: React.FC<NotificationOneProps> = ({ notification }) => {
    const { message, visible, type } = notification;

    // Menggunakan warna fixed (Green/Red) agar pesan fungsional tetap jelas.
    const color = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const icon = type === 'success' ? <CheckCircleIcon className="text-white" /> : <XIcon className="text-white" />;

    return (
        <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl transition-all duration-500 transform ${color} text-white max-w-sm ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
            role="alert"
        >
            <div className="flex items-center space-x-3">
                {icon}
                <p className="font-medium text-sm">{message}</p>
            </div>
        </div>
    );
};


export default NotificationOne