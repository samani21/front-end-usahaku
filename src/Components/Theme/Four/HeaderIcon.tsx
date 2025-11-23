import { ColorClasses } from '@/lib/Types/Theme/Four';
import React from 'react'


const HeaderIcon: React.FC<{ Icon: React.ElementType; onClick: () => void; count: number; label: string; colors: ColorClasses; }> = ({ Icon, onClick, count, label, colors }) => (
    <button
        onClick={onClick}
        aria-label={label}
        className="p-2 relative rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150"
    >
        <Icon size={24} className="text-gray-700 dark:text-gray-200" />
        {count > 0 && (
            <span className={`absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 ${colors.primary} rounded-full`}>
                {count}
            </span>
        )}
    </button>
);
export default HeaderIcon