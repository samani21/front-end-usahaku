import React from 'react'
import getColorClass from './getColorClass'
import { ColorKey, colorThemes } from '@/lib/Types/Theme/Eight'

type Props = {
    message: string
    isError: boolean
    primaryColor: ColorKey
}

const showNotification = ({ message, isError, primaryColor }: Props) => {
    const notification = document.getElementById('notification');
    const colorClass = getColorClass(primaryColor).split(' ').find(c => c.startsWith('bg-')) || 'bg-teal-500';

    if (notification) {
        // Membersihkan semua kelas warna yang mungkin ada
        Object.keys(colorThemes).forEach(key => {
            notification.classList.remove(`bg-${key}-500`);
            notification.classList.remove(`bg-${key}-600`);
        });

        notification.innerHTML = isError ? `❌ ${message}` : `✓ ${message}`;
        notification.classList.remove('hidden');
        notification.classList.add(isError ? 'bg-red-500' : colorClass);
        setTimeout(() => notification.classList.add('hidden'), 3000);
    }
};
export default showNotification