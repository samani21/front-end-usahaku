import { Clock, Home, Layers, Package } from "lucide-react";
import { FC } from "react";

export interface Service {
    id: string;
    category: string;
    type: 'Layanan Satuan' | 'Paket Layanan';
    name: string;
    price: number;
    desc: string;
    imageUrl: string;
}

export interface CartItem {
    service: Service;
    quantity: number;
}

export interface OrderMessage {
    show: boolean;
    text: string;
    success: boolean;
}

export interface Theme {
    name: string;
    primary: string;
    colorCode: string;
}

export interface NavLink {
    name: string;
    icon: FC<React.SVGProps<SVGSVGElement>>;
    href: string;
}

// --- DATA DUMMY & KONFIGURASI LOKAL ---

export const THEMES: Theme[] = [
    { name: 'Indigo', primary: 'indigo', colorCode: '#4F46E5' },
    { name: 'Teal', primary: 'teal', colorCode: '#14B8A6' },
    { name: 'Rose', primary: 'rose', colorCode: '#F43F5E' },
    { name: 'Sky', primary: 'sky', colorCode: '#0EA5E9' },
];

export const DUMMY_SERVICES: Service[] = [
    { id: 'lnd1', category: 'Laundry', type: 'Layanan Satuan', name: 'Cuci Kering Lipat Express', price: 15000, desc: 'Pakaian selesai dalam 6 jam. Per KG.', imageUrl: 'https://placehold.co/100x100/4F46E5/FFFFFF?text=LNDRY' },
    { id: 'lnd2', category: 'Laundry', type: 'Layanan Satuan', name: 'Setrika Uap Premium', price: 12000, desc: 'Setrika profesional, bebas kusut. Per KG.', imageUrl: 'https://placehold.co/100x100/4F46E5/FFFFFF?text=STRKA' },
    { id: 'bar1', category: 'Barbershop', type: 'Layanan Satuan', name: 'Potong Rambut Pria', price: 35000, desc: 'Termasuk cuci dan styling.', imageUrl: 'https://placehold.co/100x100/10B981/FFFFFF?text=BARBER' },
    { id: 'bar2', category: 'Barbershop', type: 'Layanan Satuan', name: 'Pewarnaan Rambut', price: 150000, desc: 'Konsultasi warna gratis.', imageUrl: 'https://placehold.co/100x100/10B981/FFFFFF?text=WARNA' },
    { id: 'pkg1', category: 'Laundry', type: 'Paket Layanan', name: 'Paket Hemat Bulanan', price: 250000, desc: 'Gratis 5KG untuk total 50KG.', imageUrl: 'https://placehold.co/100x100/F59E0B/FFFFFF?text=PAKET' },
    { id: 'pkg2', category: 'Barbershop', type: 'Paket Layanan', name: 'Paket Grooming Lengkap', price: 75000, desc: 'Potong, cukur janggut, dan masker.', imageUrl: 'https://placehold.co/100x100/F59E0B/FFFFFF?text=GRMNG' },
];

export const NAV_LINKS: NavLink[] = [
    { name: 'Beranda', icon: Home, href: '#home' },
    { name: 'Layanan Satuan', icon: Layers, href: '#satuan' },
    { name: 'Paket Layanan', icon: Package, href: '#paket' },
    { name: 'No. Antrian', icon: Clock, href: '#antrian' },
];

// ID dummy untuk tampilan
export const MOCK_USER_ID = 'LOCAL-USER-001';
export const MOCK_APP_ID = 'LOCAL-CATALOG-APP';
