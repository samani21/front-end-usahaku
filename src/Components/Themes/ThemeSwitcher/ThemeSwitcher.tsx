import { Theme, THEME_COLORS, ThemeName } from '@/lib/Types/Theme/theme';
import { Palette } from 'lucide-react';
import React from 'react'
interface ThemeSwitcherProps {
    themeName: string;
    setThemeName: (val: string) => void;
    listTheme: Theme[];
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ themeName, setThemeName, listTheme }) => (
    <section className="flex justify-end items-center space-x-3">
        <Palette size={20} className="text-gray-500 dark:text-gray-400" />
        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Pilih Tema:</span>
        {listTheme?.map((t, i) => {
            return (
                <button
                    key={i}
                    onClick={() => setThemeName(t?.name)}
                    className={`w-6 h-6 rounded-full border-2 transition duration-200 ${themeName === t?.name ? `border-gray-900 dark:border-white ring-2 ring-offset-2 ring-${t?.primary}-600` : 'border-gray-300'
                        } bg-${t?.primary}-600`}
                    aria-label={`Pilih tema ${t?.name}`}
                // title={displayName}
                ></button>
            );
        })}
    </section>
);


export default ThemeSwitcher