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
    { id: 'lnd1', category: 'Laundry', type: 'Layanan Satuan', name: 'Cuci Kering Lipat Express', price: 15000, desc: 'Pakaian selesai dalam 6 jam. Per KG.', imageUrl: 'https://images.unsplash.com/photo-1574057675080-6cdfd3225424?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEN1Y2klMjBLZXJpbmclMjBMaXBhdCUyMEV4cHJlc3N8ZW58MHx8MHx8fDA%3D' },
    { id: 'lnd2', category: 'Laundry', type: 'Layanan Satuan', name: 'Setrika Uap Premium', price: 12000, desc: 'Setrika profesional, bebas kusut. Per KG.', imageUrl: 'https://media.istockphoto.com/id/2239558195/id/foto/setrika-uap-modern-bertumpu-pada-papan-setrika-di-ruangan-yang-terang-dengan-pencahayaan.webp?a=1&b=1&s=612x612&w=0&k=20&c=f0mFMIBA-ekEb3J5kUcBkZbz-N0-VH3K9HeEXb0Ktuw=' },
    { id: 'bar1', category: 'Barbershop', type: 'Layanan Satuan', name: 'Potong Rambut Pria', price: 35000, desc: 'Termasuk cuci dan styling.', imageUrl: 'https://plus.unsplash.com/premium_photo-1661288502656-7265af3e6b23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG90b25nJTIwUmFtYnV0JTIwUHJpYXxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 'bar2', category: 'Barbershop', type: 'Layanan Satuan', name: 'Pewarnaan Rambut', price: 150000, desc: 'Konsultasi warna gratis.', imageUrl: 'https://media.istockphoto.com/id/1182128730/id/foto/tangan-penata-rambut-dengan-sarung-tangan-hitam-melukis-rambut-wanita-itu-dengan-warna-merah.webp?a=1&b=1&s=612x612&w=0&k=20&c=W83K6VsWtGvtxNQ5vUbNvhjd9zVHDG9mscmrnnkzNwQ=' },
    { id: 'pkg1', category: 'Laundry', type: 'Paket Layanan', name: 'Paket Hemat Bulanan', price: 250000, desc: 'Gratis 5KG untuk total 50KG.', imageUrl: 'https://plus.unsplash.com/premium_photo-1663036970563-99624abc950e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8TGF1bmRyeXxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 'pkg2', category: 'Barbershop', type: 'Paket Layanan', name: 'Paket Grooming Lengkap', price: 75000, desc: 'Potong, cukur janggut, dan masker.', imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8QmFyYmVyfGVufDB8fDB8fHww' },
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
