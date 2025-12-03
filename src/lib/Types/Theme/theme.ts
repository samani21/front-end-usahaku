
export interface Theme {
    id: number;
    name: string;
    primary: string;
    hex: string;
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