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
    sub_title?: string,
    description?: string,
    cta?: string,
    image?: string,
}
// Fungsi utilitas
export const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

export interface ThemeSection {
    header: number;
    mapTable: number;
    productRecomended: number;
    hero: number;
    typeProduct: number;
    categorie: number;
    cardProduct: number;
    queue: number;
    modalProductDetail: number;
    drawer: number;
    drawerContentRenderer: number;
    dark: boolean,
    isService: boolean
}

