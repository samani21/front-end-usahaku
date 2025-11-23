import { THEME_MAP, ThemeName } from '@/lib/Types/Theme/Three';
import { Palette } from 'lucide-react';
import React from 'react'

const ThemeSwitcher: React.FC<{ activeTheme: ThemeName; onSelectTheme: (theme: ThemeName) => void }> = ({ activeTheme, onSelectTheme }) => (
    <div className="mx-4 mt-6 p-4 bg-white rounded-xl shadow-md">
        <h2 className="text-lg font-bold text-gray-800 flex items-center mb-3">
            <Palette className="h-5 w-5 mr-2 text-gray-500" /> Ganti Tampilan Warna
        </h2>
        <div className="flex flex-wrap gap-3">
            {(Object.keys(THEME_MAP) as ThemeName[]).map((theme) => {
                const map = THEME_MAP[theme];
                const isActive = activeTheme === theme;
                return (
                    <button
                        key={theme}
                        onClick={() => onSelectTheme(theme)}
                        className={`px-4 py-2 text-sm font-semibold rounded-lg transition border-2 ${map.primaryText} ${isActive ? `${map.primaryBg} text-white border-transparent shadow-lg` : 'bg-white border-gray-200 hover:bg-gray-100'}`}
                    >
                        {theme}
                    </button>
                );
            })}
        </div>
    </div>
);

export default ThemeSwitcher