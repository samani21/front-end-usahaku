import { Activity, ActivitySquare, BarChart3, FileText, Gift, Inbox, LayoutDashboard, Wallet } from "lucide-react";
import { ReactElement } from "react";

interface child {
    label: string;
    href: string
}

interface menuSide {
    Icon: any;
    label: string;
    count?: number;
    href: string;
    child?: child[];
    children?: ReactElement<Element>;
}


export const menuSidebar: menuSide[] = [
    {
        Icon: LayoutDashboard,
        label: "Dashboard",
        href: '/dashboard'
    },

    {
        Icon: Gift,
        label: "Produk",
        href: '/product',
        child: [
            {
                label: 'List',
                href: '/list'
            },
        ]
    },
    {
        Icon: Wallet,
        label: "Dompet Saya",
        href: '/wallet'
    },

    {
        Icon: Activity,
        label: "Aktivitas",
        href: '/activity',
        child: [
            {
                label: 'Semua Transaksi',
                href: '/transaksi'
            },
            {
                label: 'Pembayaran Keluar',
                href: '/expended'
            },
            {
                label: 'Setoran Masuk',
                href: '/income'
            },
        ]
    },

    {
        Icon: FileText,
        label: "Faktur",
        href: '/faktur'
    },

    {
        Icon: Inbox,
        label: "Kotak Masuk",
        href: '/inbox'
    },

    {
        Icon: BarChart3,
        label: "Analitik",
        href: '/analis'
    },

    {
        Icon: ActivitySquare,
        label: "Menu",
        href: '/menu',
        child: [
            {
                label: 'Menu 1',
                href: '/menu1'
            },
            {
                label: 'Menu 2',
                href: '/menu2'
            },
            {
                label: 'Menu 3',
                href: '/menu3'
            },
        ]
    },
]
