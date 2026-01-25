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

const Fiveteen = ({ color, themeMode, spanOne, spanTwo, setSidebarOpen, toggleTheme, frameType, frameTheme, logoImage, isBuild }: Props) => {
    const isDarkMode = useMemo(() => {
        return themeMode === 'dark' ? true : false;
    }, [themeMode])
    return (
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>
            <div className={`flex items-center justify-between p-4 transition-all ${isDarkMode ? 'bg-transparent' : 'bg-transparent'}`}>
                <div className="flex items-center gap-4">
                    <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                    <div className={`w-[2px] h-8 ${isDarkMode ? 'bg-slate-200' : "bg-slate-800"}`} />
                    <h2 className="text-xl font-light tracking-[0.5em]">
                        <span className={`font-bold ${isDarkMode ? 'text-slate-200' : "text-slate-800"}`}>{spanOne}</span>
                        <span className={`ml-2 ${color?.text600}`}>{spanTwo}</span>
                    </h2>
                </div>
                <NavIcons colorClass={isDarkMode ? 'text-white' : color?.text900} setSidebarOpen={setSidebarOpen} toggleTheme={toggleTheme} themeMode={themeMode} />
            </div>
        </header>
    )
}

export default Fiveteen