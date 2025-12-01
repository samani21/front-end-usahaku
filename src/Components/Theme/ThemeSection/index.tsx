import { Theme, THEMES } from '@/lib/Types/Theme/Theme'
import { Palette } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    themeName: string;
    setThemeName: (val: string) => void;
    themeList: Theme[];
}

const ThemeSection = ({ themeName, setThemeName, themeList }: Props) => {

    return (
        <div className="flex justify-start items-center space-x-4 p-4 mb-8 bg-white rounded-xl shadow-md mt-4">
            <Palette size={20} className="text-gray-600 flex-shrink-0" />
            <span className="text-sm font-semibold text-gray-700 flex-shrink-0">Pilih Tema ({themeName}):</span>
            <div className="flex space-x-2 overflow-x-auto pb-0.5">
                {themeList.map((theme) => (
                    <button
                        key={theme.name}
                        onClick={() => setThemeName(theme.name)}
                        className={`w-7 h-7 rounded-full shadow-inner border-2 transition-all duration-200 flex-shrink-0`}
                        style={{ backgroundColor: theme.hex, borderColor: themeName === theme.name ? '#000000' : 'transparent' }}
                        title={theme.name}
                    >
                        {themeName === theme.name && (
                            <div className="w-full h-full rounded-full ring-2 ring-white/70"></div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ThemeSection