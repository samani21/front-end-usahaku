import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import React from 'react'

interface HeaderIconProps {
    Icon: React.ElementType;
    onClick: () => void;
    count: number;
    label: string;
    color: ThemeColorSet;
}

const HeaderIconTwo: React.FC<HeaderIconProps> = ({ Icon, onClick, count, label, color }) => (
    <button
        onClick={onClick}
        aria-label={label}
        className={`p-2 rounded-full text-gray-600 ${color?.hoverText600} ${color?.hoverBg50} transition duration-150 relative group`}
    >
        <Icon size={24} />
        {count > 0 && (
            <span className={`absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 ${color?.bg600} rounded-full`}>
                {count > 99 ? '99+' : count}
            </span>
        )}
        <span className="absolute  left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
            {label}
        </span>
    </button>
);
export default HeaderIconTwo