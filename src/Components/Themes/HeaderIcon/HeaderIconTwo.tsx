import React from 'react'


const HeaderIconTwo: React.FC<{ Icon: React.ElementType; label: string; onClick: () => void; color?: string }> = ({
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

export default HeaderIconTwo