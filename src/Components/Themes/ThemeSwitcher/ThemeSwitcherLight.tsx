import { Theme } from '@/lib/Types/Theme/theme';
import { ThemeColorSet } from '@/lib/Types/Theme/ThemeColor';
import { Palette } from 'lucide-react';
import React from 'react'
interface ThemeSwitcherLightProps {
    themeName: string;
    setThemeName: (val: string) => void;
    listTheme: Theme[];
    color: ThemeColorSet;
}
const ThemeSwitcherLight: React.FC<ThemeSwitcherLightProps> = ({
    themeName,
    setThemeName,
    listTheme,
    color
}) => {

    return (
        <section className="md:flex justify-end items-center space-x-3">
            <Palette size={20} className="text-gray-500 dark:text-gray-400" />
            <span className={`text-sm ${color?.text700} font-medium`}>
                Pilih Tema:
            </span>

            <div className='md:flex overflow-auto p-2  space-x-1 md:space-x-2'>
                {listTheme?.map((t, i) => {
                    const ringClass = `ring-${t.primary}-600`;
                    const borderActive = `border-${color}-900`;

                    return (
                        <button
                            key={i}
                            onClick={() => setThemeName(t.name)}
                            className={`w-6 h-6 rounded-full border-2 transition duration-200 
            ${themeName === t.name ? `${borderActive} dark:border-white ring-2 ring-offset-2 ${ringClass}`
                                    : 'border-gray-300'}
            `}
                            aria-label={`Pilih tema ${t?.name}`}
                            style={{ backgroundColor: t.hex }}   // ← ini aman dan wajib
                        />
                    );
                })}
            </div>
        </section>
    );
};


export default ThemeSwitcherLight