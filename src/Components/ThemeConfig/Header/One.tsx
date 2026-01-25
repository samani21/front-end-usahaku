import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import React from 'react'
import LogoContainer from './LogoContainer';
import NavIcons from './NavIcons';

type Props = {
    color: ThemeColorSet;
    themeMode: string;
    spanOne?: string;
    spanTwo?: string;
    setSidebarOpen: (val: boolean) => void;
    toggleTheme: () => void;
    frameType: "circle" | "square" | "none";
    frameTheme: "dark" | "light";
    logoImage: string | null
    isBuild?: boolean
}

const One = ({ color, themeMode, spanOne, spanTwo, setSidebarOpen, toggleTheme, frameType, frameTheme, logoImage, isBuild }: Props) => {
    return (
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>
            <div className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center gap-3 min-w-0">
                    <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                    <h2 className="text-xl font-bold tracking-tighter truncate">
                        <span className={`${color?.text500}`}>{spanOne}</span>
                        <span className={themeMode === 'dark' ? 'text-white' : 'text-slate-900'}>{spanTwo}</span>
                    </h2>
                </div>
                <NavIcons colorClass={`${color?.text600}`} setSidebarOpen={setSidebarOpen} toggleTheme={toggleTheme} themeMode={themeMode} />
            </div>
        </header>
    )
}

export default One