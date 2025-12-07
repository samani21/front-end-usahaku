import { ThemeColor } from "./ThemeColor";

type ValidColorKey = keyof typeof ThemeColor;
export interface color {
    id: number;
    name: string;
    primary: ValidColorKey;
}
export interface Theme {
    id: number;
    style_category: string;
    description: string;
    categorie_maps: color[]
}


export interface Hero {
    title?: string,
    sub_title: string,
    description: string,
    cta: string,
    image?: string,
}
// Fungsi utilitas
export const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};
export const THEME_CONFIG = {
    Dark: {
        name: 'Dark',
        primary: 'cyan',
        secondary: 'teal',
        bg: 'gray-900',
        cardBg: 'gray-800',
        text: 'gray-50',
        subtleText: 'gray-400',
        shadow: 'shadow-2xl shadow-black/50',
        headerBg: 'gray-800'
    },
    Light: {
        name: 'Light',
        primary: 'indigo',
        secondary: 'purple',
        bg: 'gray-100',
        cardBg: 'white',
        text: 'gray-900',
        subtleText: 'gray-600',
        shadow: 'shadow-xl shadow-gray-300/70',
        headerBg: 'white'
    }
};