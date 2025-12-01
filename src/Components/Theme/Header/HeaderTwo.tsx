import { UIState } from '@/lib/Types/Theme/Theme';
import { Clock, Heart, ShoppingBag, Smartphone } from 'lucide-react'
import React from 'react'

type Props = {
    color?: string;
    onIconClick: (drawerName: keyof UIState) => void;
}

const HeaderIcon: React.FC<{ Icon: React.ElementType; label: string; onClick: () => void; color?: string }> = ({
    Icon,
    label,
    onClick,
    color
}) => (
    <button
        onClick={onClick}
        className={`p-2 rounded-full text-gray-600 hover:text-${color}-600 hover:bg-${color}-50 transition duration-150 relative group`}
        aria-label={label}
    >
        <Icon size={24} />
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
            {label}
        </span>
    </button>
);

const HeaderTwo = ({ color, onIconClick }: Props) => {
    return (
        <header className="sticky top-0 z-40 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <h1 className={`text-2xl font-extrabold flex items-center text-${color}-700`}>
                        <Smartphone className={`w-6 h-6 mr-2 text-${color}-500 hidden sm:inline`} /> Katalog Minimalis
                    </h1>
                </div>
                <div className="flex space-x-4">
                    <HeaderIcon
                        Icon={Heart}
                        label="Favorit"
                        onClick={() => onIconClick('showFavoritesDrawer')}
                        color={color}
                    />
                    <HeaderIcon
                        Icon={ShoppingBag}
                        label="Pesanan"
                        onClick={() => onIconClick('showOrdersDrawer')}
                        color={color}
                    />
                    <HeaderIcon
                        Icon={Clock}
                        label="Riwayat"
                        onClick={() => onIconClick('showHistoryDrawer')}
                        color={color}
                    />
                </div>
            </div>
        </header>
    )
}

export default HeaderTwo