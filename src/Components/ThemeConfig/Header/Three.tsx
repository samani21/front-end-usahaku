import { ThemeColorSet } from '@/lib/Theme/ThemeColor';
import React, { useMemo } from 'react'
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
    logoImage: string | null;
    isBuild?: boolean
}

const Three = ({ color, themeMode, spanOne, spanTwo, setSidebarOpen, toggleTheme, frameType, frameTheme, logoImage, isBuild }: Props) => {
    const isDarkMode = useMemo(() => {
        return themeMode === 'dark' ? true : false;
    }, [themeMode])
    return (
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>
            <div className={`flex flex-col items-center p-6 rounded-2xl border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} className="mb-4" />
                <h2 className="text-2xl font-serif tracking-[0.3em] text-center mb-4">
                    <span className={`${color?.text500} font-bold`}>{spanOne}</span>
                    <span className="text-slate-400 ml-2 font-light">{spanTwo}</span>
                </h2>
                <div className={`w-full h-[1px]  ${isDarkMode ? color?.bg800 : color?.bg300} mb-4`} />
                <NavIcons colorClass={`${color?.text600}`} setSidebarOpen={setSidebarOpen} toggleTheme={toggleTheme} themeMode={themeMode} />
            </div>
        </header>
    )
}

export default Three