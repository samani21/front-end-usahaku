// src/themes.ts

export type ThemeName = 'teal' | 'indigo' | 'rose' | 'orange' | 'slate';

/**
 * Interface untuk kelas warna Tailwind CSS yang digunakan oleh tema.
 */
export interface ColorClasses {
    primary: string; // e.g., 'bg-teal-600'
    primaryHover: string; // e.g., 'hover:bg-teal-700'
    primaryText: string; // e.g., 'text-teal-600'
    primaryTextDark: string; // e.g., 'dark:text-teal-400'
    gradientFrom: string; // e.g., 'from-teal-600'
    gradientTo: string; // e.g., 'to-cyan-500'
    borderAccent: string; // e.g., 'border-teal-500'
    backgroundAccent: string; // e.g., 'bg-teal-50'
    backgroundAccentDark: string; // e.g., 'dark:bg-teal-900'
    textAccent: string; // e.g., 'text-teal-800'
}

/**
 * Objek yang berisi semua definisi tema warna.
 */
export const THEME_COLORS: Record<ThemeName, ColorClasses> = {
    teal: {
        primary: 'bg-teal-600',
        primaryHover: 'hover:bg-teal-700',
        primaryText: 'text-teal-600',
        primaryTextDark: 'dark:text-teal-400',
        gradientFrom: 'from-teal-600',
        gradientTo: 'to-cyan-500',
        borderAccent: 'border-teal-500',
        backgroundAccent: 'bg-teal-50',
        backgroundAccentDark: 'dark:bg-teal-900',
        textAccent: 'text-teal-800',
    },
    indigo: {
        primary: 'bg-indigo-600',
        primaryHover: 'hover:bg-indigo-700',
        primaryText: 'text-indigo-600',
        primaryTextDark: 'dark:text-indigo-400',
        gradientFrom: 'from-indigo-600',
        gradientTo: 'to-violet-500',
        borderAccent: 'border-indigo-500',
        backgroundAccent: 'bg-indigo-50',
        backgroundAccentDark: 'dark:bg-indigo-900',
        textAccent: 'text-indigo-800',
    },
    rose: {
        primary: 'bg-rose-600',
        primaryHover: 'hover:bg-rose-700',
        primaryText: 'text-rose-600',
        primaryTextDark: 'dark:text-rose-400',
        gradientFrom: 'from-rose-600',
        gradientTo: 'to-pink-500',
        borderAccent: 'border-rose-500',
        backgroundAccent: 'bg-rose-50',
        backgroundAccentDark: 'dark:bg-rose-900',
        textAccent: 'text-rose-800',
    },
    orange: {
        primary: 'bg-orange-600',
        primaryHover: 'hover:bg-orange-700',
        primaryText: 'text-orange-600',
        primaryTextDark: 'dark:text-orange-400',
        gradientFrom: 'from-orange-600',
        gradientTo: 'to-amber-500',
        borderAccent: 'border-orange-500',
        backgroundAccent: 'bg-orange-50',
        backgroundAccentDark: 'dark:bg-orange-900',
        textAccent: 'text-orange-800',
    },
    slate: {
        primary: 'bg-slate-700',
        primaryHover: 'hover:bg-slate-800',
        primaryText: 'text-slate-700',
        primaryTextDark: 'dark:text-slate-300',
        gradientFrom: 'from-slate-700',
        gradientTo: 'to-gray-600',
        borderAccent: 'border-slate-500',
        backgroundAccent: 'bg-gray-100',
        backgroundAccentDark: 'dark:bg-slate-900',
        textAccent: 'text-slate-800',
    },
};

export interface Theme {
    id: number;
    name: string;
    primary: string;
    hex: string;
}

// Fungsi utilitas
export const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};